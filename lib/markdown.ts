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

function renderTweet(id: string): string {
  const tweetUrl = `https://x.com/i/status/${id}`;

  return [
    '<div class="journal-tweet">',
    '<blockquote class="twitter-tweet" data-theme="dark">',
    `<a href="${tweetUrl}">View this post on X</a>`,
    "</blockquote>",
    "</div>",
  ].join("");
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

    const tweetMatch = trimmed.match(/^\{\{tweet:(\d+)\}\}$/);
    if (tweetMatch) {
      flushParagraph();
      html.push(renderTweet(tweetMatch[1]));
      continue;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      const alt = escapeHtml(imageMatch[1]);
      const src = escapeHtml(imageMatch[2]);
      html.push(
        `<figure class="journal-image"><img src="${src}" alt="${alt}" loading="lazy" />${alt ? `<figcaption>${alt}</figcaption>` : ""}</figure>`,
      );
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
