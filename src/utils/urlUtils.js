export function buildUrl({
  modelName,
  modelIncludes = [],
  baseScope = {},
  url,
}) {
  if (!modelName && !url) {
    return null;
  }
  const [baseUrl, existingQueryString] = url
    ? url.split("?")
    : [`/${modelName}`, ""];
  const params = new URLSearchParams(existingQueryString);

  if (Array.isArray(modelIncludes)) {
    modelIncludes.forEach((include, index) => {
      params.append(`include[${index}]`, include);
    });
  }

  if (typeof baseScope === "object" && baseScope !== null) {
    Object.entries(baseScope).forEach(([key, value]) => {
      params.append(`filter[${key}]`, value);
    });
  }

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}
