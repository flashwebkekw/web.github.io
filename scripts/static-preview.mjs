import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("../site", import.meta.url)));
const port = Number(process.env.PORT || 8080);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".json": "application/json",
};

function send(res, status, headers, stream) {
  res.writeHead(status, headers);
  if (stream) stream.pipe(res);
  else res.end();
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let rel = decodeURIComponent(url.pathname);
  if (rel === "/") rel = "/index.html";
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root)) {
    send(res, 403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      send(res, 404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(file).toLowerCase();
    const type = types[ext] || "application/octet-stream";
    const size = stat.size;
    const range = req.headers.range;
    const base = {
      "Content-Type": type,
      "Accept-Ranges": "bytes",
      "Cache-Control": ext === ".mp4" ? "public, max-age=3600" : "no-cache",
    };

    if (req.method === "HEAD") {
      send(res, 200, { ...base, "Content-Length": size });
      res.end();
      return;
    }

    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!m) {
        send(res, 416, { ...base, "Content-Range": `bytes */${size}` });
        res.end();
        return;
      }
      let start = m[1] ? Number(m[1]) : 0;
      let end = m[2] ? Number(m[2]) : size - 1;
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
        send(res, 416, { ...base, "Content-Range": `bytes */${size}` });
        res.end();
        return;
      }
      end = Math.min(end, size - 1);
      const stream = fs.createReadStream(file, { start, end });
      send(res, 206, {
        ...base,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": end - start + 1,
      }, stream);
      return;
    }

    send(res, 200, { ...base, "Content-Length": size }, fs.createReadStream(file));
  });
});

server.listen(port, "0.0.0.0", () => {
  process.stdout.write(`static ${root} on :${port}\n`);
});
