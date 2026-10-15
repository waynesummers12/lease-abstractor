"""Build the public, print-friendly Tenant-First CAM Audit Checklist."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/assets/Tenant-First-CAM-Audit-Checklistv1.pdf"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")
if (FONT_DIR / "Arial.ttf").exists() and (FONT_DIR / "Arial Bold.ttf").exists():
    pdfmetrics.registerFont(TTFont("ArialCustom", str(FONT_DIR / "Arial.ttf")))
    pdfmetrics.registerFont(TTFont("ArialBoldCustom", str(FONT_DIR / "Arial Bold.ttf")))
    REGULAR, BOLD = "ArialCustom", "ArialBoldCustom"
else:
    REGULAR, BOLD = "Helvetica", "Helvetica-Bold"

W, H = 612, 792
FOREST = HexColor("#102C25")
GREEN = HexColor("#0D7459")
MINT = HexColor("#A9E9BE")
PALE = HexColor("#EAF5EC")
INK = HexColor("#152D25")
MUTED = HexColor("#586E65")
LINE = HexColor("#D5E3D7")
WHITE = HexColor("#FFFFFF")

c = canvas.Canvas(str(OUTPUT), pagesize=(W, H), pageCompression=1)
c.setTitle("Tenant-First CAM Audit Checklist | SaveOnLease")
c.setAuthor("SaveOnLease")
c.setSubject("A practical, 25-point CAM reconciliation checklist for commercial tenants")


def label(x, y, value, size=10, color=INK, bold=False):
    c.setFillColor(color)
    c.setFont(BOLD if bold else REGULAR, size)
    c.drawString(x, y, value)


def wrapped(x, y, value, width, size=10, leading=15, color=MUTED, bold=False):
    font = BOLD if bold else REGULAR
    for line in simpleSplit(value, font, size, width):
        label(x, y, line, size, color, bold)
        y -= leading
    return y


def footer(page):
    c.setStrokeColor(LINE)
    c.line(42, 44, W - 42, 44)
    label(42, 27, "SaveOnLease  /  Tenant-first lease review", 8, MUTED)
    c.setFont(REGULAR, 8)
    c.setFillColor(MUTED)
    c.drawRightString(W - 42, 27, f"{page} / 8")


def page(page_num, eyebrow, title, description):
    c.setFillColor(FOREST)
    c.rect(0, H - 10, W, 10, fill=1, stroke=0)
    label(42, 746, eyebrow.upper(), 9, GREEN, True)
    label(42, 706, title, 26, INK, True)
    wrapped(42, 680, description, W - 84, 10.5, 16)
    footer(page_num)


def section_title(y, number, title):
    c.setFillColor(PALE)
    c.roundRect(42, y - 21, W - 84, 35, 10, fill=1, stroke=0)
    label(56, y - 8, number, 9, GREEN, True)
    label(91, y - 8, title, 12, INK, True)
    return y - 49


def check(y, number, title, prompt, compact=False):
    c.setStrokeColor(LINE)
    c.roundRect(43, y - 32, 15, 15, 3, fill=0, stroke=1)
    label(70, y - 10, f"{number:02d}  {title}", 10.1, INK, True)
    end = wrapped(70, y - 25, prompt, W - 125, 8.5, 11, MUTED)
    return min(y - (43 if compact else 52), end - (5 if compact else 14))


def note_box(y, title, body, height=72):
    c.setFillColor(PALE)
    c.roundRect(42, y - height, W - 84, height, 12, fill=1, stroke=0)
    label(57, y - 23, title, 10.5, GREEN, True)
    wrapped(57, y - 42, body, W - 115, 9, 13, INK)


# 1. Cover
c.setFillColor(FOREST)
c.rect(0, 0, W, H, fill=1, stroke=0)
c.setStrokeColor(HexColor("#315248"))
c.circle(595, 700, 220, fill=0, stroke=1)
c.circle(595, 700, 170, fill=0, stroke=1)
label(48, 732, "SAVEONLEASE  /  FREE FIELD GUIDE", 10, MINT, True)
label(48, 624, "THE TENANT-FIRST", 33, WHITE, True)
label(48, 582, "CAM AUDIT", 44, WHITE, True)
label(48, 530, "CHECKLIST", 44, MINT, True)
wrapped(48, 470, "A practical way to compare your lease with the annual CAM or NNN reconciliation.", 440, 15, 22, HexColor("#D8E9DF"))
c.setFillColor(HexColor("#24443A"))
c.roundRect(48, 187, 516, 184, 20, fill=1, stroke=0)
label(72, 326, "25 checks. Six review areas. One clear next step.", 15, WHITE, True)
for y, n, title in [(285, "01", "Collect the right documents"),
                    (249, "02", "Mark questions to verify"),
                    (213, "03", "Request the missing records")]:
    label(72, y, n, 12, MINT, True)
    label(115, y, title, 11, WHITE)
label(48, 103, "Retail + office leases  |  Printable worksheet included", 10, HexColor("#D8E9DF"))
label(48, 47, "Educational guide. Your signed lease and billing records control.", 9, MINT)
c.showPage()

# 2. Start
page(2, "How to use this guide", "Start with the source documents",
     "A flagged question is a reason to request records, not proof of an overcharge.")
for y, n, title, detail in [
    (607, "01", "Read the lease and amendments",
     "Find expense definitions, exclusions, caps, tenant share, audit rights, and notice requirements."),
    (505, "02", "Match the statement to its year",
     "Record each category, the property's cost pool, your share, estimated payments, and credits."),
    (403, "03", "Check each item below",
     "Mark the items you can confirm. Use the worksheet for items needing a source page or invoice."),
]:
    c.setFillColor(PALE)
    c.roundRect(42, y - 69, W - 84, 84, 13, fill=1, stroke=0)
    label(59, y - 13, n, 12, GREEN, True)
    label(100, y - 13, title, 13, INK, True)
    wrapped(100, y - 35, detail, 435, 9.5, 14)
note_box(292, "Gather before you begin",
         "Signed lease + amendments / annual reconciliation / prior-year bill / payment ledger / available invoices and area schedules.", 83)
note_box(190, "Deadline first",
         "Find the review and notice provisions in your own lease. Record the delivery date and confirm the exact method and deadline for a records request or objection.", 98)
c.showPage()

# 3. Fees and capital
page(3, "The 25-point review  /  1 of 3", "Fees and capital costs",
     "For each item, compare the bill with the actual lease wording and request support where needed.")
y = section_title(617, "01", "Administrative and management fees")
for n, title, prompt in [
    (1, "Fee rate", "Does the billed rate match the rate and any cap in your lease?"),
    (2, "Fee base", "Is the percentage applied only to categories the lease includes?"),
    (3, "Duplicate fees", "Are management and administrative amounts charged separately as permitted?"),
    (4, "Credits and offsets", "Were credits applied before the fee base was calculated, if required?"),
]:
    y = check(y, n, title, prompt)
y = section_title(y - 7, "02", "Capital and project costs")
for n, title, prompt in [
    (5, "Capital treatment", "Does the lease allow this project as an operating pass-through?"),
    (6, "Useful life", "If allowed, do amortization terms match the lease and project records?"),
    (7, "Interest and savings", "Are financing or expense-reduction assumptions documented?"),
    (8, "Other exclusions", "Check lease treatment of structural work, leasing costs, and overhead."),
]:
    y = check(y, n, title, prompt)
c.showPage()

# 4. Share and categories
page(4, "The 25-point review  /  2 of 3", "Share and expense categories",
     "A category can be correctly totaled but still allocated on the wrong basis.")
y = section_title(617, "03", "Tenant share and cost pools")
for n, title, prompt in [
    (9, "Your area", "Does the rentable area match the signed lease and amendments?"),
    (10, "Denominator", "Is the property's total area supported by a current area schedule?"),
    (11, "Share calculation", "Recalculate the percentage used on the statement."),
    (12, "Separate pools", "Are building, retail, office, or special-service pools assigned consistently?"),
    (13, "Vacancy and gross-up", "Check the lease method and supporting occupancy schedule."),
]:
    y = check(y, n, title, prompt, compact=True)
y = section_title(y - 5, "04", "Expense categories")
for n, title, prompt in [
    (14, "Insurance", "Match the billed premium and allocation to policy and property records."),
    (15, "Taxes", "Confirm the tax year, parcel, credits, and lease-specific treatment."),
    (16, "Utilities", "Check meters, shared usage, and any separately billed amounts."),
    (17, "Vendor services", "Request detail for material contracts and services charged."),
    (18, "New or excluded items", "Compare every new category with the lease's exclusions."),
]:
    y = check(y, n, title, prompt, compact=True)
c.showPage()

# 5. Trends and deadlines
page(5, "The 25-point review  /  3 of 3", "Trends and review rights",
     "Large changes are questions to investigate. A deadline comes from your lease, not from a standard rule.")
y = section_title(617, "05", "Year-over-year comparison")
for n, title, prompt in [
    (19, "Total change", "Compare the annual totals for the same property and cost pool."),
    (20, "Category change", "Identify items with a material change and request an explanation."),
    (21, "Reclassification", "Track costs moved between capped and uncapped categories."),
    (22, "Payment credits", "Reconcile monthly estimates and other credits to your ledger."),
]:
    y = check(y, n, title, prompt)
y = section_title(y - 5, "06", "Audit window and procedure")
for n, title, prompt in [
    (23, "Delivery date", "Record when the statement was delivered or received."),
    (24, "Deadline", "Find the exact review, objection, and records-request periods."),
    (25, "Notice method", "Check recipient, address, delivery method, and required wording."),
]:
    y = check(y, n, title, prompt)
note_box(y - 3, "Do not wait for perfect information",
         "If a contractual deadline may be close, review the notice clause promptly and seek qualified advice about preserving your rights.", 70)
c.showPage()

# 6. Working worksheet
page(6, "Working worksheet", "Turn a flag into a question",
     "Use one row for each item you want to verify. Record source pages before discussing an amount.")
for y, title in [(610, "Property / suite"), (575, "Statement year"), (540, "Statement delivery date"), (505, "Lease notice deadline")]:
    label(43, y, title, 9, MUTED, True)
    c.setStrokeColor(LINE)
    c.line(175, y - 3, 568, y - 3)
headers = [("Item / category", 48), ("Billed amount", 214), ("Lease page", 315), ("Record to request", 407)]
c.setFillColor(FOREST)
c.roundRect(42, 423, 528, 43, 9, fill=1, stroke=0)
for title, x in headers:
    label(x, 439, title, 8, WHITE, True)
for i in range(5):
    y = 423 - (i + 1) * 52
    c.setStrokeColor(LINE)
    c.roundRect(42, y, 528, 52, 0, fill=0, stroke=1)
    for x in [207, 308, 400]:
        c.line(x, y, x, y + 52)
note_box(119, "A dollar figure needs a basis",
         "An illustrative difference is not a verified refund. Confirm the lease rule, billing records, allocation, payments, and any applicable deadline.", 58)
c.showPage()

# 7. Records request
page(7, "Copy and adapt", "Request the records you need",
     "Use your lease's notice procedure for any formal request or objection. This draft is a starting point only.")
c.setFillColor(PALE)
c.roundRect(42, 209, 528, 399, 16, fill=1, stroke=0)
for y, title in [(577, "To:"), (544, "Property / suite:"), (511, "Reconciliation year:")]:
    label(61, y, title, 9, GREEN, True)
    c.setStrokeColor(LINE)
    c.line(185, y - 3, 548, y - 3)
body = [
    "Hello,",
    "We are reviewing the annual CAM/NNN reconciliation for the property above against our signed lease and amendments.",
    "Please provide the category ledger and supporting invoices, tenant-share and rentable-area calculations, fee calculations, and any capital cost amortization schedules relevant to the items we identify.",
    "Please also confirm the statement delivery date and the procedure for reviewing supporting records under the lease.",
    "Thank you,",
]
y = 472
for paragraph in body:
    y = wrapped(61, y, paragraph, 480, 10, 16, INK) - 14
    if paragraph == "Hello,":
        y -= 5
c.setStrokeColor(LINE)
c.line(61, 235, 548, 235)
label(61, 219, "Name / contact", 8, MUTED)
note_box(186, "Before sending",
         "Confirm the correct recipient and delivery method in your lease. If a deadline is near, seek advice about the required notice.", 86)
c.showPage()

# 8. Finish
page(8, "Your next steps", "Leave with a clear plan",
     "The checklist helps organize questions. A determination requires the signed documents and supporting records.")
for y, n, title, description in [
    (611, "01", "Mark what is supported", "Keep the lease pages, statement pages, and arithmetic together."),
    (501, "02", "Request what is missing", "Ask for the underlying ledger, invoices, area schedule, fee basis, and payment credits."),
    (391, "03", "Check the clock", "Follow the review and notice provisions in your own lease."),
]:
    c.setFillColor(PALE)
    c.roundRect(42, y - 84, 528, 96, 14, fill=1, stroke=0)
    label(59, y - 15, n, 12, GREEN, True)
    label(103, y - 15, title, 13, INK, True)
    wrapped(103, y - 39, description, 435, 9.5, 14)
label(42, 253, "QUICK GLOSSARY", 9, GREEN, True)
wrapped(42, 230, "CAM: common area maintenance. NNN: taxes, insurance, and operating expenses passed through under a triple net lease. Pro rata share: the percentage allocated to a tenant. Gross-up: an occupancy adjustment, if the lease allows one.", 522, 9.5, 15, INK)
c.setFillColor(FOREST)
c.roundRect(42, 69, 528, 91, 14, fill=1, stroke=0)
label(59, 127, "Ready to review your own lease?", 14, WHITE, True)
label(59, 104, "Start with a free lease preview at saveonlease.com", 10, MINT)
wrapped(42, 60, "Educational material only. Terms, recoverability, and notice rights depend on your lease and applicable law.", 520, 8, 11, MUTED)
c.showPage()

c.save()
print(OUTPUT)
