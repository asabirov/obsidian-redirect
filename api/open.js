export default function handler(req, res) {
  const { vault = 'vault', file, exact } = req.query;
  if (!file) return res.status(400).send('Missing file');
  // Default: hand Obsidian just the basename (no path, no .md) so wikilink
  // resolution finds the note wherever it lives. Survives vault re-org.
  // Pass `exact=1` to keep the literal path for disambiguation.
  const target = exact
    ? file
    : file.split('/').pop().replace(/\.md$/i, '');
  const obsidianUrl = `obsidian://open?vault=${encodeURIComponent(vault)}&file=${encodeURIComponent(target)}`;
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
