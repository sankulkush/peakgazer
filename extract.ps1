$content = Get-Content 'C:\Users\Viserion\.local\share\kilo\tool-output\tool_09b8580d8001b0WqqThVVw5Pr3' -Raw
$keywords = @('whatsapp', 'instagram', 'tiktok', '<svg', 'fill')
foreach ($kw in $keywords) {
    $pos = $content.ToLower().IndexOf($kw)
    Write-Output "$kw: found at position $pos"
}

$regex = [regex]'<a[^>]*aria-label=["\'](WhatsApp|Instagram|TikTok)["\'][^>]*>[\s\S]*?</a>'
$matches = $regex.Matches($content)
$count = 0
foreach ($m in $matches) {
    $count++
    Write-Output "MATCH $count`: $($m.Value.Substring(0, [Math]::Min(3000, $m.Value.Length)))"
}

$svgRegex = [regex]'<svg[\s\S]*?</svg>'
$svgMatches = $svgRegex.Matches($content)
$svgCount = 0
foreach ($sm in $svgMatches) {
    $svgCount++
    Write-Output "SVG $svgCount`: $($sm.Value.Substring(0, [Math]::Min(2000, $sm.Value.Length)))"
}
