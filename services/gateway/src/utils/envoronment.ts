export const toBool = (env?: string) => {
  if (!env) {
    return false;
  }
  return ["true", "1"].includes(env.toLowerCase());
};

export const isProd = () => process.env.NODE_ENV === "production";

export const isFederationManaged = () => toBool(process.env.ENABLE_MANAGED_FEDERATION);
