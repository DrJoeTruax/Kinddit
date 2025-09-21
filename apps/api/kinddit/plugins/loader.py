"""Attempt to load the optional proprietary safety pack."""

from importlib import import_module
from typing import Any


def load_safety_pack() -> Any | None:
    """Dynamically import the optional safety-pack integration if available."""

    try:
        module = import_module("safety_pack")
    except ModuleNotFoundError:
        return None
    return module


__all__ = ["load_safety_pack"]
