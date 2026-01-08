import http from "http";
import { createBareServer } from "@tomphttp/bare-server-node";

const bare = createBareServer("/bare/");
const server = http.createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Ultraviolet Bare Server Running");
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Bare server listening");
});
