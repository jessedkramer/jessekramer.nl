function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

/** Lightweight Markdown renderer for journal articles. */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.trim().split("\n");
  const html: string[] = [];
  let inParagraph: string[] = [];

  const flushParagraph = () => {
    if (inParagraph.length === 0) return;
    html.push(`<p>${formatInline(inParagraph.join(" "))}</p>`);
    inParagraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      html.push(`<h2>${formatInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      html.push(`<h1>${formatInline(trimmed.slice(2))}</h1>`);
      continue;
    }

    inParagraph.push(trimmed);
  }

  flushParagraph();
  return html.join("\n");
}
