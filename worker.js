import INDEX_HTML from "./index.html";

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderViewer(content) {
  const escaped = content
    .split("\n")
    .map((line, i) => `<span>${escapeHtml(line)}</span>`)
    .join("\n");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>a line of html removed every year for 100 years</title><style> :root{color-scheme:light dark}body{margin:0;font-family:monospace}pre{counter-reset:line;margin:0;white-space:pre;word-wrap:normal}span::before{counter-increment:line;content:counter(line);user-select:none;font-size:10px;color:grey;margin-right:2ch;text-align:right;display:inline-block;width:3ch} </style></head><body><pre>${escaped}</pre></body></html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/index.html":
      case "/index.htm":
      case "/":
        return new Response(renderViewer(INDEX_HTML), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      case "/view":
        return new Response(INDEX_HTML, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      case "/raw":
        return new Response(INDEX_HTML, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      default:
        return new Response("Not Found", { status: 404 });
    }
  },
};
