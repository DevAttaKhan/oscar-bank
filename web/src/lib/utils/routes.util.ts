export const isPathMatched = (pathname: string, pattern: string) => {
  if (pattern.includes("*")) {
    const baseRoute = pattern.replace("/*", "");
    const regexPattern = new RegExp(`^${baseRoute}(\\/.*)?$`); // Matches '/public' or '/public/*'
    return regexPattern.test(pathname);
  }
  // For exact matches
  return pattern === pathname;
};
