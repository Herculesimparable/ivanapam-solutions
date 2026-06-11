#!/usr/bin/env python3
"""Processa o logo Global Services Corporation para a secção de parceiros."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "img" / "partners"
SOURCE_DIR = ROOT / "assets" / "generated"
SITE_JSON = ROOT / "data" / "site.json"

SRC_CANDIDATES = [
    SOURCE_DIR / "global-logo.png",
    ROOT / "Ivanapammm" / "global-logo.png",
    Path(
        r"C:\Users\Usuario\.cursor\projects\c-Users-Usuario-Documents-Proyectos-individuales-Ivanapam\assets"
        r"\c__Users_Usuario_AppData_Roaming_Cursor_User_workspaceStorage_d70834e68db3cd41d6445cff50b35c4f_"
        r"images_Global_services-195c2157-14db-4dd4-8739-a6bd08034cdb.png"
    ),
]


def resolve_source() -> Path:
    for path in SRC_CANDIDATES:
        if path.exists():
            return path
    raise SystemExit(
        "Fonte Global não encontrada. Coloque global-logo.png em assets/generated/"
    )


def normalize_background(img: Image.Image) -> Image.Image:
    """Fundo cinza texturado -> branco; preserva o azul do logo."""
    arr = np.array(img.convert("RGB"), dtype=np.int16)
    lum = arr.mean(axis=2)
    paper = lum > 198
    arr[paper] = 255
    mid = (lum > 172) & (lum <= 198)
    arr[mid] = 255
    return Image.fromarray(arr.astype(np.uint8))


def trim_to_content(img: Image.Image, pad: int = 12) -> Image.Image:
    arr = np.array(img.convert("RGB"))
    h, w = arr.shape[:2]
    content = np.any(arr < 242, axis=2)
    ys, xs = np.where(content)
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
    card = fit_white_canvas(logo, (640, 280), margin=16)
    hd = fit_white_canvas(logo, (1200, 520), margin=32)
    card.save(OUT_DIR / "global.webp", "WEBP", quality=92, method=6)
    card.save(OUT_DIR / "global.jpg", "JPEG", quality=91)
    hd.save(OUT_DIR / "global-hd.webp", "WEBP", quality=93, method=6)
    hd.save(OUT_DIR / "global-hd.jpg", "JPEG", quality=92)


def sync_site() -> None:
    site = json.loads(SITE_JSON.read_text(encoding="utf-8"))
    for p in site["partners"]:
        if p["id"] == "global":
            p["logo"] = "assets/img/partners/global.webp"
            p["logoJpg"] = "assets/img/partners-4k/global.jpg"
            p["logoSvg"] = "assets/img/partners/global.webp"
    SITE_JSON.write_text(json.dumps(site, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    src = resolve_source()
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    persistent = SOURCE_DIR / "global-logo.png"
    if src != persistent:
        shutil.copy2(src, persistent)
        print(f"  saved source: {persistent.relative_to(ROOT)}")

    raw = Image.open(src)
    clean = normalize_background(raw)
    logo = trim_to_content(clean)
    export_variants(logo)
    sync_site()
    webp = OUT_DIR / "global.webp"
    print(f"ok: {webp} ({webp.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
