# """
# Inference for birdbox monitoring.
# Predicts kestrel, bat, or other (if confidence is too low for either).
# """

from pathlib import Path
from typing import Optional
import sys

import torch
from torchvision import transforms
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))

from config import IMG_SIZE, CLASSES, CONFIDENCE_THRESHOLD
from model import get_model

DEFAULT_CHECKPOINT = Path(__file__).parent / "best_model.pth"
CLASS_NAMES = ["kestrel", "bat"] # DO NOT CHANGE

def load_model(checkpoint_path=None):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = get_model(num_classes=2, pretrained=False).to(device)

    path = Path(checkpoint_path) if checkpoint_path else DEFAULT_CHECKPOINT
    if not path.exists():
        raise FileNotFoundError(f"No checkpoint found at {path}. Has training finished?")

    model.load_state_dict(torch.load(path, map_location=device))
    model.eval()
    return model, device, CLASS_NAMES

def get_inference_transform():
    return transforms.Compose([
        transforms.Resize((240, 240)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ])

def predict_image(
    image: Image.Image | Path | str,
    model=None,
    device: Optional[torch.device] = None,
    transform=None,
    checkpoint_path: Optional[Path] = None,
    confidence_threshold: float = CONFIDENCE_THRESHOLD,
) -> dict:
    """
    Predict species for a single image.
    Returns kestrel, bat, or other (when confidence is below threshold).
    """
    if model is None:
        model, device, classes = load_model(checkpoint_path=checkpoint_path, device=device)
    else:
        classes = CLASSES
        if device is None:
            device = next(model.parameters()).device

    if transform is None:
        transform = get_inference_transform()

    if isinstance(image, (str, Path)):
        image = Image.open(image).convert("RGB")
    elif not isinstance(image, Image.Image):
        raise TypeError("image must be PIL Image, path string, or Path")

    x = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=1).squeeze(0).cpu().numpy()

    pred_idx = int(probs.argmax())
    confidence = float(probs[pred_idx])
    species = classes[pred_idx] if confidence >= confidence_threshold else "other"

    return {
        "species": species,
        "confidence": confidence,
        "all_probs": {c: float(p) for c, p in zip(classes, probs)},
    }