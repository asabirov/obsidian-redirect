export default function handler(req, res) {
  const { vault = 'personal-finance', file } = req.query;
  if (!file) return res.status(400).send('Missing file');
  const obsidianUrl = `obsidian://open?vault=${encodeURIComponent(vault)}&file=${encodeURIComponent(file)}`;
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>Opening in Obsidian...</title>
<meta http-equiv="refresh" content="0;url=${obsidianUrl}">
</head><body>
<p>Opening in Obsidian...</p>
<p>If nothing happened, <a href="${obsidianUrl}">tap here</a>.</p>
</body></html>`);
}
