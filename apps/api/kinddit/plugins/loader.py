from typing import Optional
from .interface import SafetyPack
def load_safety_pack() -> Optional[SafetyPack]:
    try:
        from safety_pack.entrypoints import pack, pack_api_version  # type: ignore
        if str(pack_api_version).split(".")[0] != "1":
            return None
        return pack
    except Exception:
        return None
