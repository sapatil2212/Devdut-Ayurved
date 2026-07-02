// Vercel serverless function that bridges Vercel's request into the
// fetch-style handler produced by the Nitro/Vite build at dist/server/server.js.
// The nitro@3-beta plugin does not yet emit a Vercel Build Output API v3
// artifact, so this wrapper is what actually serves SSR on Vercel.

import handler from "../dist/server/server.js";

export const config = {
  supportsResponseStreaming: true,
};

export default async function ssr(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = `${protocol}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) headers.set(key, value.join(", "));
      else headers.set(key, String(value));
    }

    const method = (req.method || "GET").toUpperCase();
    const hasBody = method !== "GET" && method !== "HEAD";

    const webRequest = new Request(url, {
      method,
      headers,
      body: hasBody ? req : undefined,
      duplex: "half",
    });

    const webResponse = await handler.fetch(webRequest, {}, {});

    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
    }

    res.end();
  } catch (error) {
    console.error("[SSR wrapper error]", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "text/plain; charset=utf-8");
    }
    res.end("Internal server error");
  }
}
