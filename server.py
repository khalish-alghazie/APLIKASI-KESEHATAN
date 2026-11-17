#!/usr/bin/env python3
"""
Selaras Mobile App — Local Server Runner
Jalankan server lokal instan tanpa instalasi dependensi tambahan.
"""

import http.server
import socketserver
import os
import socket

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Format log yang bersih
        print(f"[Selaras Server] {args[0]} - {args[1]} {args[2]}")

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

if __name__ == "__main__":
    local_ip = get_local_ip()
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print("🌿 SELARAS — RITME SEHAT TANPA BEBAN (MOBILE APPS)")
        print("=" * 60)
        print(f"▶ Buka di Komputer/Laptop : http://localhost:{PORT}")
        print(f"▶ Buka di Smartphone (HP) : http://{local_ip}:{PORT}")
        print("=" * 60)
        print("Tekan Ctrl+C untuk menghentikan server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer dihentikan.")
