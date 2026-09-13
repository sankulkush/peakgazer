import re
import sys

path = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\Viserion\.local\share\kilo\tool-output\tool_09b8580d8001b0WqqThVVw5Pr3"
with open(path, 'r') as f:
    content = f.read()

print(f"File length: {len(content)}")
print("=" * 80)

# Find all <a tags with hrefs that might be social media
# Search for whatsapp, instagram, tiktok (case insensitive)
for keyword in ['whatsapp', 'instagram', 'tiktok', 'wa\\.',ig\\.',tt\\.']:
    pass

# Find social links by looking for common patterns
patterns = [
    r'<a[^>]*whatsapp[^>]*>.*?</a>',
    r'<a[^>]*instagram[^>]*>.*?</a>',
    r'<a[^>]*tiktok[^>]*>.*?</a>',
    r'<a[^>]*href=["\'][^"\']*(whatsapp|instagram|tiktok)[^"\']*["\'][^>]*>.*?</a>',
]

for p in patterns:
    matches = re.findall(p, content, re.IGNORECASE | re.DOTALL)
    if matches:
        for m in matches:
            print("MATCH:")
            print(m[:3000])
            print("-" * 40)

print("=" * 80)
print("SVG occurrences:")
svg_matches = re.findall(r'<svg[^>]*>.*?</svg>', content, re.DOTALL)
for i, svg in enumerate(svg_matches):
    print(f"SVG #{i+1}:")
    print(svg[:2000])
    print("-" * 40)

print("=" * 80)
print("CSS fill rules:")
fill_matches = re.findall(r'fill[^;}\n]{0,100}', content)
for m in fill_matches[:50]:
    print(m)
