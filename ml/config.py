"""Configuration for the birdbox monitoring system."""

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
MODELS_DIR = PROJECT_ROOT / "models"
LOGS_DIR = PROJECT_ROOT / "logs"

RAW_DATA_DIR = DATA_DIR / "raw"

CLASSES = ["bat", "kestrel"] # if results are coming in backwards, change this order
NUM_CLASSES = len(CLASSES)

IMG_SIZE = 224
BATCH_SIZE = 16
NUM_EPOCHS = 80
LEARNING_RATE = 8e-5
WEIGHT_DECAY = 1e-5

CONFIDENCE_THRESHOLD = 0.70

