const fs = require('fs');
const path = 'C:/Users/Viserion/.local/share/kilo/tool-output/tool_09b8580d8001b0WqqThVVw5Pr3';
const content = fs.readFileSync(path, 'utf8');

console.log('File length:', content.length);

// Find all social links and SVG elements
const patterns = [
  { name: 'WhatsApp <a> links', regex: /<a[^>]*aria-label=["']WhatsApp["'][^>]*>[\s\S]*?<\/a>/g },
  { name: 'Instagram <a> links', regex: /<a[^>]*aria-label=["']Instagram["'][^>]*>[\s\S]*?<\/a>/g },
  { name: 'TikTok <a> links', regex: /<a[^>]*aria-label=["']TikTok["'][^>]*>[\s\S]*?<\/a>/g },
  { name: 'All <svg> elements', regex: /<svg[\s\S]*?<\/svg>/g },
  { name: 'fill rules in CSS', regex: /fill[^;}\s\n]{0,100}(?:;|\}|[^a-zA-Z])/g },
];

for (const { name, regex } of patterns) {
  console.log('\n' + '='.repeat(80));
  console.log(name);
  console.log('='.repeat(80));
  const matches = content.match(regex);
  if (matches) {
    console.log(`Found ${matches.length} match(es):`);
    for (let i = 0; i < matches.length; i++) {
      console.log(`\n--- Match ${i + 1} ---`);
      console.log(matches[i].substring(0, 5000));
    }
  } else {
    console.log('No matches found.');
  }
}

// Also search for fill attribute in SVGs specifically
console.log('\n' + '='.repeat(80));
console.log('SVG fill attributes');
console.log('='.repeat(80));
const fillInSvg = /(<svg[^>]*>)([\s\S]*?)(<\/svg>)/g;
let m;
while ((m = fillInSvg.exec(content)) !== null) {
  const svgContent = m[0];
  const fillMatches = svgContent.match(/fill="[^"]*"/g);
  if (fillMatches) {
    console.log(`SVG at position ${m.index}:`);
    console.log('  fill attributes:', fillMatches);
  }
}

// Search for any CSS <style> blocks
console.log('\n' + '='.repeat(80));
console.log('Style blocks');
console.log('='.repeat(80));
const styleMatches = content.match(/<style[^>]*>[\s\S]*?<\/style>/g);
if (styleMatches) {
  for (let i = 0; i < styleMatches.length; i++) {
    console.log(`\n--- Style block ${i + 1} (first 5000 chars) ---`);
    console.log(styleMatches[i].substring(0, 5000));
  }
} else {
  console.log('No style blocks found.');
}

// Search for CSS in link tags
console.log('\n' + '='.repeat(80));
console.log('CSS link references');
console.log('='.repeat(80));
const cssLinks = content.match(/<link[^>]*css[^>]*>/g);
if (cssLinks) {
  console.log('CSS files referenced:', cssLinks);
}

// Check for social link URLs
console.log('\n' + '='.repeat(80));
console.log('Social URLs in href attributes');
console.log('='.repeat(80));
const socialUrls = content.match(/href=["']https?:\/\/(?:www\.)?(?:whatsapp|instagram|tiktok|wa\.me|tiktok\.com)[^"']*/g);
if (socialUrls) {
  for (const url of socialUrls) {
    console.log(url);
  }
}
