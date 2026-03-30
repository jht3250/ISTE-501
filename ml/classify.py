#!/usr/bin/env python3
"""
Entry point called by Next.js as a subprocess.
Usage: python ml/classify.py /path/to/image.jpg
Prints a single JSON object to stdout.
"""
import sys
import json
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

try:
    from inference import predict_image, load_model
except ImportError as e:
    print(json.dumps({"error": f"Import failed: {e}"}))
    sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = Path(sys.argv[1])
    if not image_path.exists():
        print(json.dumps({"error": f"File not found: {image_path}"}))
        sys.exit(1)

    try:
        model, device, classes = load_model()
        result = predict_image(image_path, model=model, device=device)
        print(json.dumps({
            "species": result["species"],
            "confidence": round(result["confidence"] * 100, 1),
            "all_probs": {k: round(v * 100, 1) for k, v in result["all_probs"].items()}
        }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
