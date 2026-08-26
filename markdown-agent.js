/**
 * Markdown Negotiation Helper for AI Agents & Answer Engines
 * Exposes client-side markdown extraction and URL query format handling (?format=markdown).
 */
(function() {
  if (typeof window === 'undefined') return;

  function htmlToMarkdown() {
    const title = document.title || "ATTC — Advance Training & Testing Center";
    const mainContent = document.querySelector('main') || document.body;
    let textContent = mainContent.innerText || mainContent.textContent || "";
    
    // Clean up excessive whitespace
    textContent = textContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    return `# ${title}\n\n${textContent}`;
  }

  // Handle client-side markdown request via URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('format') === 'markdown') {
    document.open();
    document.write(`<pre style="word-wrap: break-word; white-space: pre-wrap; font-family: monospace; padding: 20px; line-height: 1.5;">${htmlToMarkdown()}</pre>`);
    document.close();
  }

  window.__getMarkdownContent = htmlToMarkdown;
})();
