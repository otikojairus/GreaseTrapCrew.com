#!/usr/bin/env python3
"""Regenerate grease trap pSEO JSON from the Canada Grease Trap workbook."""

from __future__ import annotations

import json
import re
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
XLSX = Path("/Users/jairusotiko/Downloads/pSEO - Canada Grease Trap.xlsx")
PAGES_OUT = ROOT / "src" / "data" / "greasetrap-pages.json"
SECTIONS_OUT = ROOT / "src" / "data" / "greasetrap-sections.json"
PHONE = "1-888-473-2737"
CTA = f"Click-to-Call {PHONE}"


def section_page_type(section: str) -> str:
    up = section.upper()
    if "CITY" in up or "AREA SERVICE" in up:
        return "City Service Page"
    if "EMERGENCY" in up or "OVERFLOW" in up:
        return "Emergency Landing"
    if "COST" in up or "PRICING" in up:
        return "Cost Guide"
    return "Service Pillar"


def split_secondary(raw: object) -> list[str]:
    if raw is None:
        return []
    return [s.strip() for s in re.split(r"[;,]", str(raw)) if s.strip()]


def parse_pages() -> tuple[list[dict], list[dict]]:
    wb = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)
    ws = wb["pSEO Page Plan"]
    pages: list[dict] = []
    sections: dict[str, list[dict]] = {}
    current_section = "Canada grease trap services"

    for row in ws.iter_rows(values_only=True):
        cells = list(row) + [None] * 13
        c0, title, slug, pk, sk, area, page_type, intent, vol, kd, cpc, priority, cta = cells[:13]

        if isinstance(c0, str) and title is None and slug is None and pk is None:
            label = c0.strip()
            if label and not label.startswith("TOTAL:"):
                current_section = label
            continue

        if not isinstance(c0, (int, float)):
            continue
        if not slug or not str(slug).startswith("/"):
            continue

        area_str = str(area).strip() if area else "Canada (National)"
        inferred = section_page_type(current_section)
        if page_type:
            inferred = str(page_type).strip()
        elif "National" not in area_str:
            inferred = "City Service Page"

        entry = {
            "index": int(c0) if c0 == int(c0) else c0,
            "title": str(title or "").strip(),
            "slug": str(slug).strip().rstrip("/") or "/",
            "primaryKeyword": str(pk or "").strip(),
            "secondaryKeywords": split_secondary(sk),
            "targetArea": area_str,
            "pageType": inferred,
            "searchIntent": str(intent or "Commercial,Transactional,Local").strip(),
            "volume": float(vol) if vol is not None and str(vol).strip() else None,
            "kd": float(kd) if kd is not None and str(kd).strip() else None,
            "cpc": float(cpc) if cpc is not None and str(cpc).strip() else None,
            "priority": str(priority).strip() if priority else "Medium",
            "ctaStrategy": str(cta).strip() if cta else CTA,
        }
        pages.append(entry)
        sections.setdefault(current_section, []).append(entry)

    wb.close()

    section_list = [
        {"heading": heading, "pages": section_pages}
        for heading, section_pages in sections.items()
        if section_pages
    ]
    return pages, section_list


def main() -> None:
    pages, sections = parse_pages()
    PAGES_OUT.write_text(json.dumps(pages, indent=2) + "\n", encoding="utf-8")
    SECTIONS_OUT.write_text(json.dumps(sections, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(pages)} pages and {len(sections)} sections")
    print(f"  → {PAGES_OUT}")
    print(f"  → {SECTIONS_OUT}")


if __name__ == "__main__":
    main()
