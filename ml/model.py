"""EfficientNet-B1 classifier for kestrel vs bat detection."""

import torch
import torch.nn as nn
from torchvision import models
from typing import Optional

NUM_CLASSES = 2


class BirdboxClassifier(nn.Module):

    def __init__(
        self,
        num_classes: int = NUM_CLASSES,
        pretrained: bool = True,
        dropout: float = 0.4,
    ):
        super().__init__()
        self.num_classes = num_classes
        weights = models.EfficientNet_B1_Weights.IMAGENET1K_V2 if pretrained else None
        self.backbone = models.efficientnet_b1(weights=weights)
        in_features = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=dropout, inplace=True),
            nn.Linear(in_features, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.backbone(x)

    @torch.no_grad()
    def predict(
        self,
        x: torch.Tensor,
        device: Optional[torch.device] = None,
    ) -> tuple[int, float]:
        self.eval()
        if device is None:
            device = next(self.parameters()).device
        x = x.to(device)
        logits = self(x)
        probs = torch.softmax(logits, dim=1)
        conf, pred = probs.max(1)
        return pred.item(), conf.item()


def get_model(num_classes: int = NUM_CLASSES, pretrained: bool = True) -> BirdboxClassifier:
    return BirdboxClassifier(num_classes=num_classes, pretrained=pretrained)
