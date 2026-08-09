import json
import os
from typing import List, Dict, Any

_PROBLEMS_CACHE = None
_DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "problems.json")


def load_problems() -> List[Dict[str, Any]]:
    """Load and cache problem data from the JSON file."""
    global _PROBLEMS_CACHE
    if _PROBLEMS_CACHE is None:
        with open(_DATA_FILE_PATH, "r", encoding="utf-8") as f:
            _PROBLEMS_CACHE = json.load(f)
    return _PROBLEMS_CACHE