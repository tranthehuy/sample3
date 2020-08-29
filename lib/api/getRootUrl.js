export default function getRootUrl() {
  const host = process.env.HOST || "http://localhost";
  const port = process.env.PORT || 8000;
  const dev = process.env.NODE_ENV !== "production";
  const ROOT_URL = dev ? `${host}:${port}` : "https://builderbook.org";

  return ROOT_URL;
}
