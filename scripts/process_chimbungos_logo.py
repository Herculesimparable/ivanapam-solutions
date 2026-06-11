#!/usr/bin/env python3
"""Processa o logo Chimbungos (retrato + texto) para a secção de parceiros."""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

OUT_DIR = ROOT / "assets" / "img" / "partners"
SOURCE_DIR = ROOT / "assets" / "generated"
SITE_JSON = ROOT / "data" / "site.json"

# Fonte: WhatsApp / upload do utilizador (cópia persistente em assets/generated/)
SRC_CANDIDATES = [
    SOURCE_DIR / "chimbungos-logo.png",
    ROOT / "Ivanapammm" / "chimbungos-logo.png",
    Path(
        r"C:\Users\Usuario\.cursor\projects\c-Users-Usuario-Documents-Proyectos-individuales-Ivanapam\assets"
        r"\c__Users_Usuario_AppData_Roaming_Cursor_User_workspaceStorage_d70834e68db3cd41d6445cff50b35c4f_"
        r"images_WhatsApp_Image_2026-06-11_at_11.47.58_AM-9aa275c0-6347-4dc8-88cf-754410b0283a.png"
    ),
]


def resolve_source() -> Path:
    for path in SRC_CANDIDATES:
        if path.exists():
            return path
    raise SystemExit(
        "Fonte Chimbungos não encontrada. Coloque chimbungos-logo.png em assets/generated/"
    )


def normalize_paper_background(img: Image.Image) -> Image.Image:
    """Fundo texturado off-white -> branco limpo; preserva o traço preto do logo."""
    arr = np.array(img.convert("RGB"), dtype=np.int16)
    lum = arr.mean(axis=2)
    # Pixels claros (papel) ficam brancos puros
    paper = lum > 200
    arr[paper] = 255
    # Suavizar halos cinzentos junto ao traço
    mid = (lum > 175) & (lum <= 200)
    arr[mid] = 255
    return Image.fromarray(arr.astype(np.uint8))


def trim_to_ink(img: Image.Image, pad: int = 14) -> Image.Image:
    arr = np.array(img.convert("RGB"))
    h, w = arr.shape[:2]
    ink = np.any(arr < 238, axis=2)
    ys, xs = np.where(ink)
    if len(xs) < 20:
        return img
    x0 = max(0, int(xs.min()) - pad)
    y0 = max(0, int(ys.min()) - pad)
    x1 = min(w, int(xs.max()) + pad + 1)
    y1 = min(h, int(ys.max()) + pad + 1)
    return img.crop((x0, y0, x1, y1))


def fit_white_canvas(img: Image.Image, size: tuple[int, int], margin: int = 20) -> Image.Image:
    canvas = Image.new("RGB", size, (255, 255, 255))
    img = ImageOps.exif_transpose(img).convert("RGB")
    max_w = size[0] - margin * 2
    max_h = size[1] - margin * 2
    fitted = img.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    x = (size[0] - fitted.width) // 2
    y = (size[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    return canvas


def export_variants(logo: Image.Image) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    card = fit_white_canvas(logo, (640, 280), margin=18)
    hd = fit_white_canvas(logo, (1200, 520), margin=36)
    card.save(OUT_DIR / "chimbungos.webp", "WEBP", quality=92, method=6)
    card.save(OUT_DIR / "chimbungos.jpg", "JPEG", quality=91)
    hd.save(OUT_DIR / "chimbungos-hd.webp", "WEBP", quality=93, method=6)
    hd.save(OUT_DIR / "chimbungos-hd.jpg", "JPEG", quality=92)


def sync_site() -> None:
    site = json.loads(SITE_JSON.read_text(encoding="utf-8"))
    for p in site["partners"]:
        if p["id"] == "chimbungos":
            p["logo"] = "assets/img/partners/chimbungos.webp"
            p["logoJpg"] = "assets/img/partners/chimbungos-hd.jpg"
            p["logoSvg"] = "assets/img/partners/chimbungos.webp"
    SITE_JSON.write_text(json.dumps(site, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    src = resolve_source()
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    persistent = SOURCE_DIR / "chimbungos-logo.png"
    if src != persistent:
        shutil.copy2(src, persistent)
        print(f"  saved source: {persistent.relative_to(ROOT)}")

    raw = Image.open(src)
    clean = normalize_paper_background(raw)
    logo = trim_to_ink(clean)
    export_variants(logo)
    sync_site()
    webp = OUT_DIR / "chimbungos.webp"
    print(f"ok: {webp} ({webp.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
