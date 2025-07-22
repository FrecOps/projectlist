// sync.js (e.g. Netlify Function, or Express route)
// GITHUB_TOKEN is set in your host’s env settings

import fetch from 'node‑fetch';

export async function handler(event) {
  const { projects } = JSON.parse(event.body);
  const content = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');
  const owner  = 'YOUR_USER';
  const repo   = 'YOUR_REPO';
  const path   = 'projects.json';
  const branch = 'main';

  // 1) Get the SHA
  const meta = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
  );
  if (!meta.ok) return { statusCode: meta.status, body: await meta.text() };
  const { sha } = await meta.json();

  // 2) Update the file
  const resp = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'UI sync', content, sha, branch }),
    }
  );
  if (!resp.ok) return { statusCode: resp.status, body: await resp.text() };

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
}
