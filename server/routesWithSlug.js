function routesWithSlug({ server, app }) {
  server.get("/admin/edit-post/:slug", (req, res) => {
    const { slug } = req.params;
    app.render(req, res, "/admin/edit-post", { slug });
  });

  server.get("/admin/post-detail/:slug", (req, res) => {
    const { slug } = req.params;
    app.render(req, res, "/admin/post-detail", { slug });
  });

  server.get("/posts/:slug", (req, res) => {
    const { slug } = req.params;
    app.render(req, res, "/post-detail", { slug });
  });
}

module.exports = routesWithSlug;
