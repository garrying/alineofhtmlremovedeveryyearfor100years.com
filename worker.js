import INDEX_HTML from "./index.html";

const escapeHtml = (str) =>
  str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const renderViewer = (content) => {
  const escaped = content
    .split("\n")
    .map((line) => `<span>${escapeHtml(line)}</span>`)
    .join("\n");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>a line of html removed every year for 100 years</title><style> :root{color-scheme:light dark}body{margin:0;font-family:monospace}pre{counter-reset:line;margin:0;white-space:pre;word-wrap:normal}span::before{counter-increment:line;content:counter(line);user-select:none;font-size:10px;color:grey;margin-right:2ch;text-align:right;display:inline-block;width:3ch} </style></head><body><pre>${escaped}</pre></body></html>`;
};

const HTML_HEADERS = { "Content-Type": "text/html; charset=utf-8" };
const TEXT_HEADERS = { "Content-Type": "text/plain; charset=utf-8" };

const VIEWER_PATHS = new Set(["/", "/index.html", "/index.htm"]);

const ROUTES = new Map([
  ["/view", () => new Response(INDEX_HTML, { headers: HTML_HEADERS })],
  ["/raw", () => new Response(INDEX_HTML, { headers: TEXT_HEADERS })],
]);

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (VIEWER_PATHS.has(pathname))
      return new Response(renderViewer(INDEX_HTML), { headers: HTML_HEADERS });
    return (
      ROUTES.get(pathname)?.() ?? new Response("Not Found", { status: 404 })
    );
  },
};
