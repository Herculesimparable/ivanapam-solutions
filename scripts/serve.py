#!/usr/bin/env python3
"""Servidor IVANAPAM — sem cache; acessível na rede local (0.0.0.0)."""

from __future__ import annotations

import http.server
import socket
import socketserver
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORT = 8080
HOST = "0.0.0.0"
URLS_FILE = ROOT / "ultimas-urls.txt"


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format: str, *args) -> None:
        print(f"[{self.log_date_time_string()}] {format % args}")


def local_ips() -> list[str]:
    found: set[str] = set()
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            found.add(s.getsockname()[0])
    except OSError:
        pass
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ip = info[4][0]
            if not ip.startswith("127."):
                found.add(ip)
    except OSError:
        pass
    return sorted(found)


def write_urls_file(ips: list[str]) -> None:
    lines = [
        "IVANAPAM Solutions — URLs de acesso",
        "",
        f"Este PC:     http://localhost:{PORT}/?fresh=1",
        f"Rede local:  http://<IP-do-PC>:{PORT}/?fresh=1",
        "",
    ]
    if ips:
        lines.append("IPs detectados neste computador:")
        for ip in ips:
            lines.append(f"  http://{ip}:{PORT}/?fresh=1")
    else:
        lines.append("(Não foi possível detectar o IP local automaticamente.)")
    lines.extend(
        [
            "",
            "Outros dispositivos na mesma Wi-Fi devem usar um dos IPs acima.",
            "Se não abrir: execute liberar-firewall.bat como administrador.",
            "Para internet pública sem deploy: tunnel-externo.bat",
            "Para produção: deploy-vercel.bat",
        ]
    )
    URLS_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    ips = local_ips()
    write_urls_file(ips)

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer((HOST, PORT), NoCacheHandler) as httpd:
        print("=" * 52)
        print("  IVANAPAM Solutions — servidor activo")
        print("=" * 52)
        print(f"  Este PC:  http://localhost:{PORT}/?fresh=1")
        if ips:
            print("  Rede Wi-Fi / LAN (telefone, tablet, outro PC):")
            for ip in ips:
                print(f"            http://{ip}:{PORT}/?fresh=1")
        else:
            print("  Rede local: use o IP deste PC na porta", PORT)
        print()
        print(f"  URLs guardadas em: {URLS_FILE.name}")
        print("  Ctrl+C para parar")
        print("=" * 52)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")


if __name__ == "__main__":
    main()
