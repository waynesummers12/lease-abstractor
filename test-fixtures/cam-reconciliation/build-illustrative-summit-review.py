"""Build a manually authored concept report from the fictional Summit test pair."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


HERE = Path(__file__).resolve().parent
OUTPUT = HERE / "illustrative-summit-reconciliation-review.pdf"
W, H = letter
M = 46
NAVY = HexColor("#102533")
TEAL = HexColor("#087675")
MUTED = HexColor("#566575")
PALE = HexColor("#eaf1f4")
AMBER = HexColor("#fff3dd")
LINE = HexColor("#bfd0d9")
WHITE = HexColor("#ffffff")


def draw_text(c, x, y, value, size=10, font="Helvetica", color=NAVY):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def draw_right(c, x, y, value, size=10, font="Helvetica", color=NAVY):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawRightString(x, y, value)


def wrap(value, width, size=10, font="Helvetica"):
    words = value.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and stringWidth(candidate, font, size) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def paragraph(c, x, y, value, width, size=10, leading=15, font="Helvetica", color=NAVY):
    for line in wrap(value, width, size, font):
        draw_text(c, x, y, line, size, font, color)
        y -= leading
    return y


def page_frame(c, number):
    c.setFillColor(TEAL)
    c.rect(0, H - 12, W, 12, fill=1, stroke=0)
    draw_text(c, M, H - 43, "SAVEONLEASE  /  ILLUSTRATIVE STATEMENT REVIEW", 8.5, "Helvetica-Bold", TEAL)
    draw_right(c, W - M, H - 43, "FICTIONAL TEST CASE", 8.5, "Helvetica-Bold", MUTED)
    c.setStrokeColor(LINE)
    c.line(M, 49, W - M, 49)
    draw_text(c, M, 34, "Manual concept output - statement review is not yet a live SaveOnLease feature", 7.5, color=MUTED)
    draw_right(c, W - M, 34, f"{number} / 3", 7.5, color=MUTED)


def label(c, x, y, value):
    draw_text(c, x, y, value.upper(), 8, "Helvetica-Bold", TEAL)


def build():
    c = canvas.Canvas(str(OUTPUT), pagesize=letter)
    c.setTitle("Illustrative Summit CAM NNN reconciliation review")
    c.setAuthor("SaveOnLease concept fixture")
    c.setSubject("Manually authored example output using a fictional statement")

    # Page 1: a decision-ready brief.
    page_frame(c, 1)
    draw_text(c, M, 697, "The first questions to resolve", 25, "Helvetica-Bold")
    paragraph(c, M, 675, "Summit Fitness Studio | 2025 CAM / NNN statement | Lease pages 1-3 and fictional statement page 1", W - 2 * M, 9.5, 14, color=MUTED)

    c.setFillColor(PALE)
    c.roundRect(M, 545, W - 2 * M, 99, 8, fill=1, stroke=0)
    label(c, M + 16, 621, "Conditional allocation difference")
    draw_text(c, M + 16, 584, "$2,225.00", 27, "Helvetica-Bold")
    paragraph(c, M + 199, 611, "The statement bills a 6.75% tenant share; the lease states 6.25%. This figure assumes the same $445,000 expense base and no signed amendment changes the share.", W - 2 * M - 217, 9.5, 14)
    draw_text(c, M + 16, 560, "A question to verify, not a confirmed refund.", 9, "Helvetica-Bold", TEAL)

    label(c, M, 516, "01  Verify the tenant share")
    paragraph(c, M, 498, "The lease states 4,800 rentable square feet and a 6.25% share (lease pp. 1-2). The statement uses 5,184 / 76,800 = 6.75% (statement p. 1). Ask for the area schedule and any signed amendment.", W - 2 * M, 10, 15)

    label(c, M, 438, "02  Obtain capital-cost support")
    paragraph(c, M, 420, "The statement includes $60,000 for a roof project and $20,000 for HVAC. The lease permits capital charges with amortization as determined by the landlord (lease p. 2). No project invoices or amortization calculations were attached.", W - 2 * M, 10, 15)

    label(c, M, 359, "03  Confirm the review clock")
    paragraph(c, M, 341, "The lease gives 60 days after receipt of the reconciliation to dispute charges and includes waiver language (lease pp. 2-3). The statement shows an issue date, but no receipt date. An exact calendar deadline is therefore unknown.", W - 2 * M, 10, 15)

    c.setFillColor(AMBER)
    c.roundRect(M, 157, W - 2 * M, 125, 8, fill=1, stroke=0)
    label(c, M + 16, 256, "Request first")
    for i, item in enumerate([
        "Executed amendments and the rentable-area allocation schedule",
        "Roof and HVAC invoices, useful lives, and amortization worksheets",
        "Management-fee calculation and category-level general ledger",
        "Statement delivery date and proof of receipt",
    ]):
        draw_text(c, M + 17, 236 - i * 21, f"{i + 1}.  {item}", 9.2)
    paragraph(c, M, 127, "The statement's arithmetic is internally consistent. Whether any expense is permitted or recoverable requires the underlying records and the complete executed lease.", W - 2 * M, 9.2, 14, color=MUTED)
    c.showPage()

    # Page 2: calculation and traceable findings.
    page_frame(c, 2)
    draw_text(c, M, 697, "The math behind the question", 24, "Helvetica-Bold")
    paragraph(c, M, 674, "Same property charges and payment credit in both columns; only the tenant-share percentage changes.", W - 2 * M, 9.5, 14, color=MUTED)

    x1, x2, x3 = M + 12, 372, 552
    y = 630
    c.setFillColor(NAVY)
    c.rect(M, y - 9, W - 2 * M, 31, fill=1, stroke=0)
    draw_text(c, x1, y + 2, "MEASURE", 8, "Helvetica-Bold", WHITE)
    draw_right(c, x2, y + 2, "STATEMENT", 8, "Helvetica-Bold", WHITE)
    draw_right(c, x3, y + 2, "LEASE-SHARE SCENARIO", 8, "Helvetica-Bold", WHITE)
    rows = [
        ("Property expenses", "$445,000.00", "$445,000.00"),
        ("Tenant share", "6.75%", "6.25%"),
        ("Allocated tenant charge", "$30,037.50", "$27,812.50"),
        ("Estimated payments credited", "($28,800.00)", "($28,800.00)"),
        ("Result", "$1,237.50 due", "$987.50 credit"),
    ]
    y -= 31
    for index, row in enumerate(rows):
        if index % 2 == 0:
            c.setFillColor(PALE)
            c.rect(M, y - 11, W - 2 * M, 31, fill=1, stroke=0)
        face = "Helvetica-Bold" if index in (2, 4) else "Helvetica"
        draw_text(c, x1, y + 1, row[0], 9, face)
        draw_right(c, x2, y + 1, row[1], 9, face)
        draw_right(c, x3, y + 1, row[2], 9, face)
        y -= 31
    label(c, M, 419, "Why the result changes")
    paragraph(c, M, 400, "The $2,225 difference equals $445,000 x (6.75% - 6.25%). At the lease percentage, the same $28,800 payment credit changes the statement from $1,237.50 due to a $987.50 credit. This remains conditional on the actual expense base and any valid amendment.", W - 2 * M, 10, 15)

    c.setStrokeColor(LINE)
    c.line(M, 336, W - M, 336)
    label(c, M, 316, "What the documents support")
    evidence = [
        ("Share mismatch", "Lease pp. 1-2; statement p. 1", "Conditional variance"),
        ("Roof / HVAC support", "Lease p. 2; statement p. 1", "Records missing"),
        ("Management fee", "Lease p. 2; statement p. 1", "Permitted category; verify basis"),
        ("Review window", "Lease pp. 2-3; statement p. 1", "Receipt date missing"),
    ]
    y = 289
    for title, sources, status in evidence:
        draw_text(c, M, y, title, 9.4, "Helvetica-Bold")
        draw_text(c, M + 167, y, sources, 8.5, color=MUTED)
        draw_right(c, W - M, y, status, 8.5, "Helvetica-Bold", TEAL)
        c.setStrokeColor(LINE)
        c.line(M, y - 12, W - M, y - 12)
        y -= 39
    c.setFillColor(AMBER)
    c.roundRect(M, 75, W - 2 * M, 48, 8, fill=1, stroke=0)
    paragraph(c, M + 14, 103, "No express CAM / NNN increase cap appears in this lease. Tax and insurance increases and the management-fee category are not automatic overcharge findings.", W - 2 * M - 28, 9.3, 14)
    c.showPage()

    # Page 3: a neutral, usable records request.
    page_frame(c, 3)
    draw_text(c, M, 697, "A ready-to-review records request", 23, "Helvetica-Bold")
    paragraph(c, M, 673, "This is a factual inquiry draft. Check the executed lease and timing requirements before sending a formal dispute.", W - 2 * M, 9.5, 14, color=MUTED)
    c.setFillColor(PALE)
    c.roundRect(M, 312, W - 2 * M, 322, 8, fill=1, stroke=0)
    x = M + 17
    label(c, x, 609, "Suggested message")
    draw_text(c, x, 582, "Subject: 2025 CAM / NNN reconciliation records", 10, "Helvetica-Bold")
    paragraphs = [
        "Hello,",
        "We are reviewing the 2025 CAM / NNN reconciliation for Summit Fitness Studio. The statement calculates our share at 6.75% using 5,184 rentable square feet, while our lease states 6.25% and describes approximately 4,800 rentable square feet.",
        "Please provide the rentable-area schedule and any signed amendment supporting the billed percentage; the invoices, useful-life assumptions, and amortization schedules for the roof and HVAC charges; the management-fee calculation and expense base; and the category-level ledger and supporting invoices.",
        "Please also confirm when the reconciliation statement was delivered to us. We would appreciate the records and an explanation of the allocation calculation.",
        "Thank you.",
    ]
    y = 555
    for text in paragraphs:
        y = paragraph(c, x, y, text, W - 2 * M - 34, 9.4, 14)
        y -= 12

    label(c, M, 278, "Before acting on the numbers")
    for i, item in enumerate([
        "Confirm whether the statement was received and record the date.",
        "Check any signed amendment for a revised share or area definition.",
        "Recalculate again after reviewing the actual category ledger and schedules.",
        "Have a professional review any formal dispute or waiver question.",
    ]):
        draw_text(c, M + 4, 254 - i * 27, f"{i + 1}.  {item}", 9.3)
    c.setFillColor(AMBER)
    c.roundRect(M, 82, W - 2 * M, 48, 8, fill=1, stroke=0)
    paragraph(c, M + 14, 110, "This example was manually prepared from a fictional statement and a supplied agreement. SaveOnLease does not yet accept or reconcile annual statements in its live paid workflow.", W - 2 * M - 28, 9.1, 14)
    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
