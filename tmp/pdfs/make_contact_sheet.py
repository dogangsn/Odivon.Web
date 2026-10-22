from PIL import Image, ImageDraw
from pathlib import Path

p = Path("tmp/pdfs/rendered_final")
files = sorted(p.glob("page-*.png"))
thumbs = []
target_width = 180
for index, file in enumerate(files, start=1):
    image = Image.open(file).convert("RGB")
    height = int(image.height * target_width / image.width)
    thumb = image.resize((target_width, height))
    canvas = Image.new("RGB", (target_width + 8, height + 26), "white")
    canvas.paste(thumb, (4, 20))
    ImageDraw.Draw(canvas).text((7, 4), str(index), fill="black")
    thumbs.append(canvas)

columns = 4
rows = (len(thumbs) + columns - 1) // columns
cell_width = max(t.width for t in thumbs)
cell_height = max(t.height for t in thumbs)
sheet = Image.new("RGB", (columns * cell_width, rows * cell_height), (225, 230, 238))
for index, thumb in enumerate(thumbs):
    sheet.paste(thumb, ((index % columns) * cell_width, (index // columns) * cell_height))
sheet.save("tmp/pdfs/contact_sheet.png")
