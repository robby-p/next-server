import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();
const port = process.env.PORT || 3000;
const host = "localhost";

(async () => {
  try {
    await nextServer.prepare();
    const app = express();
    app.get("/ping", (req, res) => res.json({ pong: true }));
    app.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    app.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(
        `> Ready on http://${host}:${port} - env ${process.env.NODE_ENV}`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
