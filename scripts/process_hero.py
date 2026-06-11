#!/usr/bin/env python3
"""Processa apenas o banner principal a partir de assets/generated/hero.png."""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from process_images import GENERATED_DIR, SITE_JSON, generated_source, process_hero, rel  # noqa: E402


def main() -> None:
    src = generated_source("hero")
    if not src:
        raise SystemExit("Coloque hero.png em assets/generated/")

    hero = process_hero(src)
    print(f"Hero: {hero['hd']['width']}x{hero['hd']['height']}")
    print(f"  -> {hero['hd']['webp']}")

    if SITE_JSON.exists():
        site = json.loads(SITE_JSON.read_text(encoding="utf-8"))
        site["images"] = {
            **(site.get("images") or {}),
            "hero": rel(hero["hd"]["webp"]),
            "heroJpg": rel(hero["hd"]["jpg"]),
            "hero4k": rel(hero["4k"]["webp"]),
            "hero4kJpg": rel(hero["4k"]["jpg"]),
        }
        SITE_JSON.write_text(json.dumps(site, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
