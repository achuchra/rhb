Bun.serve({
  fetch(req) {
    return new Response("Hey hi hello!");
  },
});

console.log("Server started at http://localhost:3000");
