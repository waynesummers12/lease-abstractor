from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output/pdf/SaveOnLease-Referral-Partner-Quick-Start.pdf"
LOGO = ROOT / "web/public/logo.png"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")
pdfmetrics.registerFont(TTFont("Arial", str(FONT_DIR / "Arial.ttf")))
pdfmetrics.registerFont(TTFont("ArialBold", str(FONT_DIR / "Arial Bold.ttf")))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="ArialBold")

W, H = 612, 792
DARK = HexColor("#102b25")
GREEN = HexColor("#a8edbf")
PALE = HexColor("#eef6ee")
INK = HexColor("#17392c")
MUTED = HexColor("#4b625a")
LINE = HexColor("#dce5dc")

c = canvas.Canvas(str(OUT), pagesize=(W, H))
c.setTitle("SaveOnLease | Referral partner quick start")
c.setAuthor("SaveOnLease")

def para(txt, x, top, width, size=10, leading=15, color=INK, bold=False):
    style = ParagraphStyle(
        "p", fontName="ArialBold" if bold else "Arial", fontSize=size,
        leading=leading, textColor=color, spaceAfter=0,
    )
    p = Paragraph(txt, style)
    _, h = p.wrap(width, 1000)
    p.drawOn(c, x, top-h)
    return h

def step(n, title, body, y):
    c.setFillColor(PALE)
    c.roundRect(38, y-56, 536, 57, 10, stroke=0, fill=1)
    c.setFillColor(DARK)
    c.circle(64, y-27, 15, stroke=0, fill=1)
    c.setFont("ArialBold", 10)
    c.setFillColor(white)
    c.drawCentredString(64, y-30.5, str(n))
    para(title, 91, y-8, 456, 10.5, 13, INK, True)
    para(body, 91, y-27, 456, 9, 12.5, MUTED)

# Brand header
c.setFillColor(DARK)
c.rect(0, 641, W, 151, stroke=0, fill=1)
c.drawImage(ImageReader(str(LOGO)), 38, 733, width=35, height=35, mask="auto")
c.setFillColor(white)
c.setFont("ArialBold", 18)
c.drawString(80, 744, "SaveOnLease")
c.setFillColor(GREEN)
c.setFont("ArialBold", 8)
c.drawString(39, 714, "PARTNER QUICK START")
c.setFillColor(white)
c.setFont("ArialBold", 24)
c.drawString(38, 681, "Start referring in minutes.")
c.setFillColor(HexColor("#d7e7de"))
c.setFont("Arial", 10)
c.drawString(39, 658, "A simple guide for brokers, advisors, and tenant advocates")

# Main offer
c.setFillColor(GREEN)
c.roundRect(38, 586, 536, 40, 10, stroke=0, fill=1)
para("<b>Free to join.</b> Earn 20% when a referred client buys the $49.99 report.", 54, 615, 508, 10.5, 15, DARK)

c.setFillColor(INK)
c.setFont("ArialBold", 14)
c.drawString(38, 563, "Your four steps")

step(1, "Open the referral page", "Go to <link href='https://www.saveonlease.com/marketing/referral' color='#006b52'><u>saveonlease.com/marketing/referral</u></link> and select <b>Create your referral link</b>.", 546)
step(2, "Sign in and create your link", "Sign in or create an account, then select <b>Create my link</b>. We connect your unique link to your account automatically.", 477)
step(3, "Share with a client", "Select <b>Copy link</b> or <b>Copy intro message</b>. Your client lands at the free lease preview and chooses whether to buy a report.", 408)
step(4, "Set up commission payments", "In <b>Commission payments</b>, select <b>Set up payments with Stripe</b> and complete Stripe's secure payout setup once.", 339)

# Details
c.setFillColor(DARK)
c.roundRect(38, 142, 536, 125, 11, stroke=0, fill=1)
c.setFillColor(GREEN)
c.setFont("ArialBold", 10)
c.drawString(55, 245, "HOW CREDIT AND PAYMENT WORK")
para("Your referral code stays in the client's browser for <b>30 days</b>. A paid report with your code attached earns a <b>20% commission</b>; a free preview alone does not. Eligible commissions transfer after a <b>30-day review period</b> once your Stripe payout details are ready.", 55, 232, 500, 9.1, 13.2, white)
para("Automatic payouts are currently available to <b>U.S.-based partners</b>. You can share your link while completing Stripe setup.", 55, 176, 500, 8.8, 12.5, HexColor("#d7e7de"))

para("<b>Optional monthly update:</b> Turn on <b>Email me a monthly referral summary</b> on the referral page to receive activity and commission totals.", 38, 127, 536, 9, 13, INK)
para("<b>White label:</b> Not currently offered. Tell us how you would use a branded version with your clients.", 38, 93, 536, 9, 13, INK)

c.setStrokeColor(LINE)
c.line(38, 55, 574, 55)
c.setFont("Arial", 8)
c.setFillColor(MUTED)
c.drawString(38, 39, "Questions? audits@saveonlease.com")
c.drawRightString(574, 39, "saveonlease.com/marketing/referral")
c.linkURL("mailto:audits@saveonlease.com", (38, 34, 245, 50), relative=0)
c.linkURL("https://www.saveonlease.com/marketing/referral", (376, 34, 574, 50), relative=0)
c.save()
print(OUT)
