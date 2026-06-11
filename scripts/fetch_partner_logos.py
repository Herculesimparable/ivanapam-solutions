#!/usr/bin/env python3

"""Logotipos dos 3 parceiros IVANAPAM — descarga web + SVG de marca."""



from __future__ import annotations



import json

import sys

import urllib.parse

import urllib.request

from io import BytesIO

from pathlib import Path



ROOT = Path(__file__).resolve().parent.parent

sys.path.insert(0, str(ROOT / "scripts"))



from PIL import Image, ImageOps  # noqa: E402



OUT_DIR = ROOT / "assets" / "img" / "partners"

SITE_JSON = ROOT / "data" / "site.json"



UA = (

    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "

    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

)



PARTNERS = [

    {

        "id": "gelsadas",

        "key": "gelsadas",

        "svg": OUT_DIR / "gelsadas.svg",

        "url": None,

        "referer": None,

    },

    {

        "id": "global",

        "key": "global",

        "svg": OUT_DIR / "global.svg",

        "url": "https://globalsc.ao/wp-content/uploads/2023/02/NOVO-LOGOTIPO_LazulBig-e1676227894139.png",

        "referer": "https://globalsc.ao/",

    },

    {

        "id": "chimbungos",

        "key": "chimbungos",

        "svg": OUT_DIR / "chimbungos.svg",

        "url": None,

        "referer": None,

    },

]





def fetch_bytes(url: str, referer: str | None = None) -> bytes | None:

    try:

        headers = {"User-Agent": UA, "Accept": "image/*,*/*"}

        if referer:

            headers["Referer"] = referer

        req = urllib.request.Request(url, headers=headers)

        with urllib.request.urlopen(req, timeout=25) as resp:

            return resp.read()

    except Exception as exc:

        print(f"    fail: {url} ({exc})")

        return None





def fit_on_canvas(img: Image.Image, size: tuple[int, int] = (560, 240)) -> Image.Image:

    canvas = Image.new("RGB", size, (255, 255, 255))

    img = ImageOps.exif_transpose(img).convert("RGBA")

    bg = Image.new("RGB", img.size, (255, 255, 255))

    bg.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)

    img = bg

    img.thumbnail((size[0] - 40, size[1] - 40), Image.Resampling.LANCZOS)

    x = (size[0] - img.width) // 2

    y = (size[1] - img.height) // 2

    canvas.paste(img, (x, y))

    return canvas





def save_raster(img: Image.Image, partner_id: str) -> dict:

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    webp = OUT_DIR / f"{partner_id}.webp"

    jpg = OUT_DIR / f"{partner_id}.jpg"

    img.save(webp, "WEBP", quality=90, method=6)

    img.save(jpg, "JPEG", quality=92)

    return {

        "logo": f"assets/img/partners/{partner_id}.webp",

        "logoJpg": f"assets/img/partners/{partner_id}.jpg",

        "logoSvg": f"assets/img/partners/{partner_id}.svg",

    }





def svg_assets(partner_id: str) -> dict:

    return {

        "logo": f"assets/img/partners/{partner_id}.svg",

        "logoSvg": f"assets/img/partners/{partner_id}.svg",

        "logoJpg": f"assets/img/partners/{partner_id}.svg",

    }





def process_partner(item: dict) -> dict:

    pid = item["id"]

    print(f"  {pid}")



    if item.get("url"):

        raw = fetch_bytes(item["url"], item.get("referer"))

        if raw and len(raw) > 500:

            try:

                img = fit_on_canvas(Image.open(BytesIO(raw)))

                assets = save_raster(img, pid)

                print(f"    ok: download ({item['url']})")

                return {"id": pid, "key": item["key"], **assets}

            except Exception as exc:

                print(f"    skip download: {exc}")



    svg = item.get("svg")

    if svg and Path(svg).exists():

        print(f"    ok: SVG local ({svg.name})")

        return {"id": pid, "key": item["key"], **svg_assets(pid)}



    raise SystemExit(f"Sem logo para {pid}")





def sync_site(partners: list[dict]) -> None:

    site = json.loads(SITE_JSON.read_text(encoding="utf-8"))

    site["partners"] = [

        {

            "id": p["id"],

            "key": p["key"],

            "logo": p["logo"],

            "logoJpg": p.get("logoJpg", p["logo"]),

            **({"logoSvg": p["logoSvg"]} if p.get("logoSvg") else {}),

        }

        for p in partners

    ]

    SITE_JSON.write_text(json.dumps(site, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"  synced: {SITE_JSON.name}")





def main() -> None:

    print("Parceiros IVANAPAM (3)\n")

    entries = [process_partner(p) for p in PARTNERS]

    sync_site(entries)

    print(f"\nDone: {len(entries)} logos")





if __name__ == "__main__":

    main()

