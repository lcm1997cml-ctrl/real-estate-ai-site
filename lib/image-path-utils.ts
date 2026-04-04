export function isValidImagePath(path: string | undefined | null): boolean {
  if (!path) return false;
  return path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://");
}
