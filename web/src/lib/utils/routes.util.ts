// export const isPathMatched = (pathname: string, pattern: string) => {
//   if (pattern.includes("*")) {
//     const baseRoute = pattern.replace("/*", "");
//     const regexPattern = new RegExp(`^${baseRoute}(\\/.*)?$`);
//     return regexPattern.test(pathname);
//   }
//   // For exact matches
//   return pattern === pathname;
// };

export const isPathMatched = (
  locationPathName: string,
  hrefPath: string,
  isExact: boolean = false
) => {
  if (!isExact) {
    const regexPattern = new RegExp(`^${hrefPath}(\\/.*)?$`);
    return regexPattern.test(locationPathName);
  }
  // For exact matches
  return locationPathName === hrefPath;
};
