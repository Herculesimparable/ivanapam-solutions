#!/usr/bin/env python3
"""Processa apenas imagens geradas (assets/generated/) para o site IVANAPAM."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install: py -m pip install Pillow numpy opencv-python-headless")

from enhance_ai import (  # noqa: E402
    TARGET_HD,
    enhance_hero_poster,
    natural_enhance,
    resize_cover,
    save_variants,
    HAS_CV2,
)

GENERATED_DIR = ROOT / "assets" / "generated"
OUT_DIR = ROOT / "assets" / "img"
GALLERY_4K = OUT_DIR / "gallery-4k"
GALLERY_HD = OUT_DIR / "gallery-hd"
GALLERY_DIR = OUT_DIR / "gallery"
THUMB_DIR = OUT_DIR / "thumbs"
SITE_JSON = ROOT / "data" / "site.json"

# Ordem da galeria + enquadramento (centering: x, y — y menor mostra mais o topo/pessoas)
# Sem duplicados: parceiros só no marquee; about usa fonte exclusiva.
GALLERY_META = [
    {"id": "desinfestacao-residencial", "captionKey": "desinfestacaoResidencial", "center": (0.5, 0.36)},
    {"id": "fumigacao-termica", "captionKey": "fumigacaoTermica", "center": (0.5, 0.44)},
    {"id": "limpeza-escritorios", "captionKey": "limpezaEscritorios", "center": (0.5, 0.42)},
    {"id": "escadas-equipa", "captionKey": "escadasEquipa", "center": (0.5, 0.46)},
    {"id": "limpeza-patio", "captionKey": "limpezaPatio", "center": (0.5, 0.40)},
    {"id": "aniversario", "captionKey": "aniversario", "center": (0.5, 0.38)},
]

ABOUT_SOURCE = "ppe-desinfeccao"
ABOUT_CENTER = (0.5, 0.36)
OLD_GALLERY_IDS = {
    "servicos-desinfestacao",
    "parceiro-chimbungos",
    "parceiro-gelsadas",
    "parceiro-global",
    "parceiros",
    "resort-qpoint",
    "equipa-exterior",
    "equipa-sala",
    "ppe-desinfeccao",
    "cozinha-profissional",
}


def rel(path: str | Path) -> str:
    p = Path(path)
    if not p.is_absolute():
        return p.as_posix()
    try:
        return p.relative_to(ROOT).as_posix()
    except ValueError:
        return p.as_posix()


def create_logo(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs><linearGradient id="g" x1="0" y1="0" x2="120" y2="120"><stop stop-color="#2a9a52"/><stop offset="1" stop-color="#0d4d24"/></linearGradient></defs>
  <circle cx="60" cy="60" r="56" fill="url(#g)" stroke="#0d4d24" stroke-width="3"/>
  <circle cx="60" cy="60" r="44" fill="none" stroke="#fff" stroke-width="2" opacity="0.35"/>
  <path d="M60 28c-8 0-14 6-14 14v6c0 4 2 7 5 9l-2 18h22l-2-18c3-2 5-5 5-9v-6c0-8-6-14-14-14z" fill="#fff"/>
  <rect x="52" y="48" width="16" height="8" rx="2" fill="#1a7a3a"/>
  <path d="M48 72h24v6c0 3-2 5-5 5H53c-3 0-5-2-5-5v-6z" fill="#c6ff00"/>
</svg>"""
    path.write_text(svg, encoding="utf-8")


def scale_long_edge(img: Image.Image, long: int) -> Image.Image:
    w, h = img.size
    edge = max(w, h)
    if edge == long:
        return img
    scale = long / edge
    return img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)


def generated_source(img_id: str) -> Path | None:
    for ext in (".png", ".jpg", ".jpeg", ".webp"):
        path = GENERATED_DIR / f"{img_id}{ext}"
        if path.exists():
            return path
    return None


def clean_old_outputs() -> None:
    for folder in (GALLERY_4K, GALLERY_HD, GALLERY_DIR, THUMB_DIR):
        if not folder.exists():
            continue
        for f in folder.iterdir():
            if not f.is_file():
                continue
            stem = f.stem
            if stem in OLD_GALLERY_IDS:
                f.unlink(missing_ok=True)


def process_hero(source: Path) -> dict:
    raw = Image.open(source)
    enhanced = enhance_hero_poster(raw, target_long=2160)
    vhd = save_variants(enhanced, OUT_DIR / "hero", jpeg_q=91, webp_q=90)
    v4k = save_variants(scale_long_edge(enhanced, 1920), OUT_DIR / "hero-4k", jpeg_q=92, webp_q=90)
    return {"4k": v4k, "hd": vhd}


def process_about(source: Path) -> None:
    raw = Image.open(source)
    enhanced = natural_enhance(raw, target_long=1600)
    save_variants(
        resize_cover(enhanced, (1920, 1440), centering=ABOUT_CENTER),
        OUT_DIR / "about",
        jpeg_q=88,
        webp_q=86,
    )


def process_gallery_item(item: dict, source: Path) -> dict:
    raw = Image.open(source)
    enhanced = natural_enhance(raw, target_long=TARGET_HD)
    img_id = item["id"]
    center = tuple(item.get("center", (0.5, 0.42)))

    ar_wide = (1920, 1080)
    ar_std = (1600, 1200)
    ar_thumb = (640, 480)

    fit = lambda img, sz: resize_cover(img, sz, centering=center)

    v4k = save_variants(fit(enhanced, ar_wide), GALLERY_4K / img_id, jpeg_q=90, webp_q=88)
    vhd = save_variants(fit(enhanced, ar_wide), GALLERY_HD / img_id, jpeg_q=88, webp_q=86)
    vstd = save_variants(fit(enhanced, ar_std), GALLERY_DIR / img_id, jpeg_q=87, webp_q=85)
    vthumb = save_variants(fit(enhanced, ar_thumb), THUMB_DIR / img_id, jpeg_q=84, webp_q=82)

    return {
        "id": img_id,
        "captionKey": item.get("captionKey", img_id),
        "full4k": rel(v4k["webp"]),
        "full4kJpg": rel(v4k["jpg"]),
        "fullHd": rel(vhd["webp"]),
        "fullHdJpg": rel(vhd["jpg"]),
        "full": rel(vstd["webp"]),
        "fullJpg": rel(vstd["jpg"]),
        "thumb": rel(vthumb["webp"]),
        "thumbJpg": rel(vthumb["jpg"]),
        "width": v4k["width"],
        "height": v4k["height"],
        "source": rel(source),
    }


def sync_site(manifest: list[dict], hero: dict) -> None:
    if not SITE_JSON.exists():
        return
    site = json.loads(SITE_JSON.read_text(encoding="utf-8"))
    site["gallery"] = [{"id": m["id"], "captionKey": m.get("captionKey", m["id"])} for m in manifest]
    about_webp = OUT_DIR / "about.webp"
    site["images"] = {
        "logo": "assets/img/logo.svg",
        "hero": rel(hero["hd"]["webp"]),
        "heroJpg": rel(hero["hd"]["jpg"]),
        "hero4k": rel(hero["4k"]["webp"]),
        "hero4kJpg": rel(hero["4k"]["jpg"]),
        "about": rel(about_webp) if about_webp.exists() else "assets/img/about.webp",
        "aboutJpg": "assets/img/about.jpg",
    }
    SITE_JSON.write_text(json.dumps(site, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"  synced: {SITE_JSON.name}")


def main() -> None:
    print(f"OpenCV: {'ON' if HAS_CV2 else 'OFF'}")
    print(f"Fonte: apenas {GENERATED_DIR.relative_to(ROOT)}\n")

    for d in (OUT_DIR, GALLERY_4K, GALLERY_HD, GALLERY_DIR, THUMB_DIR, GENERATED_DIR):
        d.mkdir(parents=True, exist_ok=True)

    clean_old_outputs()
    create_logo(OUT_DIR / "logo.svg")
    manifest = []

    hero_src = generated_source("hero")
    if not hero_src:
        raise SystemExit("Falta assets/generated/hero.png")
    hero = process_hero(hero_src)
    print(f"  ok: hero ({hero['hd']['width']}x{hero['hd']['height']})")

    about_src = generated_source(ABOUT_SOURCE)
    if about_src:
        process_about(about_src)
        print(f"  ok: about <- {ABOUT_SOURCE}")

    for item in GALLERY_META:
        src = generated_source(item["id"])
        if not src:
            print(f"  skip: {item['id']} (sem ficheiro gerado)")
            continue
        entry = process_gallery_item(item, src)
        manifest.append(entry)
        print(f"  ok: {item['id']} -> {entry['width']}x{entry['height']}")

    (OUT_DIR / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    sync_site(manifest, hero)
    print(f"\nDone: {len(manifest)} fotos geradas no site")


if __name__ == "__main__":
    main()
