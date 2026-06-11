"""

Pipeline de imagens IVANAPAM — fiel às fotos originais.

Remove UI de screenshots, melhora com naturalidade e exporta em HD real.

"""



from __future__ import annotations



import numpy as np

from PIL import Image, ImageEnhance, ImageFilter, ImageOps



try:

    import cv2



    HAS_CV2 = True

except ImportError:

    HAS_CV2 = False



TARGET_4K = 1920

TARGET_HD = 1600

TARGET_THUMB = 640





def _to_rgb(img: Image.Image) -> Image.Image:

    img = ImageOps.exif_transpose(img)

    if img.mode != "RGB":

        return img.convert("RGB")

    return img





def strip_screenshot_ui(img: Image.Image) -> Image.Image:

    """Remove barras de status e resposta típicas de screenshots WhatsApp/Instagram."""

    img = _to_rgb(img)

    w, h = img.size



    if h > w * 1.15 and w < 600:

        top = int(h * 0.07)

        bottom = int(h * 0.84)

        if bottom - top > h * 0.45:

            return img.crop((0, top, w, bottom))



    return img





def _gentle_levels(arr: np.ndarray, low: float = 2.0, high: float = 98.0) -> np.ndarray:

    out = arr.astype(np.float32)

    for c in range(3):

        p_lo, p_hi = np.percentile(out[:, :, c], (low, high))

        span = max(p_hi - p_lo, 1.0)

        out[:, :, c] = np.clip((out[:, :, c] - p_lo) / span * 255.0, 0, 255)

    return out





def _subtle_warmth(arr: np.ndarray) -> np.ndarray:

    """Leve calor natural — sem forçar verde artificial."""

    out = arr.copy()

    out[:, :, 0] = np.clip(out[:, :, 0] * 1.02, 0, 255)

    out[:, :, 1] = np.clip(out[:, :, 1] * 1.01, 0, 255)

    return out





def _pil_from_array(arr: np.ndarray) -> Image.Image:

    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")





def _light_denoise(img: Image.Image) -> Image.Image:

    if not HAS_CV2:

        return img.filter(ImageFilter.MedianFilter(size=3))

    bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

    bgr = cv2.fastNlMeansDenoisingColored(bgr, None, 3, 3, 7, 21)

    return Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB))





def _honest_upscale(img: Image.Image, target_long: int) -> Image.Image:

    """Upscale moderado — no máximo 2x para evitar aspecto artificial."""

    w, h = img.size

    long_edge = max(w, h)

    if long_edge >= target_long:

        scale = target_long / long_edge

        return img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)



    max_scale = 2.0

    desired_scale = target_long / long_edge

    scale = min(max_scale, desired_scale)



    nw = int(w * scale)

    nh = int(h * scale)

    out = img.resize((nw, nh), Image.Resampling.LANCZOS)

    out = out.filter(ImageFilter.UnsharpMask(radius=1.0, percent=60, threshold=3))

    return out





def natural_enhance(img: Image.Image, target_long: int = TARGET_HD) -> Image.Image:

    """Melhoria natural para fotos reais — cores fiéis, sem filtro verde forte."""

    img = strip_screenshot_ui(img)

    img = _light_denoise(img)



    arr = np.array(img).astype(np.float32)

    arr = _gentle_levels(arr)

    arr = _subtle_warmth(arr)

    img = _pil_from_array(arr)



    img = ImageEnhance.Brightness(img).enhance(1.06)

    img = ImageEnhance.Contrast(img).enhance(1.08)

    img = ImageEnhance.Color(img).enhance(1.06)

    img = ImageEnhance.Sharpness(img).enhance(1.08)



    return _honest_upscale(img, target_long)





def enhance_hero_poster(img: Image.Image, target_long: int = 2160) -> Image.Image:

    """Poster promocional — preserva texto e cores da marca."""

    img = _to_rgb(img)

    img = _light_denoise(img)



    arr = np.array(img).astype(np.float32)

    arr = _gentle_levels(arr, low=1.5, high=98.5)

    img = _pil_from_array(arr)



    img = ImageEnhance.Brightness(img).enhance(1.04)

    img = ImageEnhance.Contrast(img).enhance(1.10)

    img = ImageEnhance.Color(img).enhance(1.07)

    img = ImageEnhance.Sharpness(img).enhance(1.10)



    w, h = img.size

    long_edge = max(w, h)

    scale = target_long / long_edge

    if scale > 2.5:

        scale = 2.5

    if scale != 1.0:

        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))





def graphic_enhance(img: Image.Image, target_long: int = TARGET_HD) -> Image.Image:

    """Banners e gráficos de parceiros — mínima alteração."""

    img = _to_rgb(img)

    img = ImageEnhance.Contrast(img).enhance(1.04)

    img = ImageEnhance.Sharpness(img).enhance(1.05)

    return _honest_upscale(img, target_long)





def ai_enhance(img: Image.Image, target_long: int = TARGET_HD) -> Image.Image:

    """Alias para fotos — pipeline natural."""

    return natural_enhance(img, target_long)





def resize_cover(img: Image.Image, size: tuple[int, int], centering: tuple[float, float] = (0.5, 0.42)) -> Image.Image:

    return ImageOps.fit(img, size, method=Image.Resampling.LANCZOS, centering=centering)





def resize_contain_pad(img: Image.Image, size: tuple[int, int], bg: tuple[int, int, int] = (248, 250, 249)) -> Image.Image:

    """Encaixa a foto completa com margens suaves — evita cortar pessoas."""

    img = _to_rgb(img)

    tw, th = size

    scale = min(tw / img.width, th / img.height)

    nw = int(img.width * scale)

    nh = int(img.height * scale)

    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", size, bg)

    canvas.paste(resized, ((tw - nw) // 2, (th - nh) // 2))

    return canvas





def save_variants(

    img: Image.Image,

    base_path,

    *,

    jpeg_q: int = 90,

    webp_q: int = 88,

) -> dict:

    from pathlib import Path



    base_path = Path(base_path)

    base_path.parent.mkdir(parents=True, exist_ok=True)

    stem = base_path.with_suffix("")



    jpg_path = stem.with_suffix(".jpg")

    webp_path = stem.with_suffix(".webp")



    img.save(jpg_path, "JPEG", quality=jpeg_q, optimize=True, progressive=True, subsampling=0)

    img.save(webp_path, "WEBP", quality=webp_q, method=6)



    return {

        "jpg": jpg_path.as_posix(),

        "webp": webp_path.as_posix(),

        "width": img.width,

        "height": img.height,

    }


