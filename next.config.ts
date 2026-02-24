import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true, // Commenting out as it might cause issues with some setups, optional.
};

export default withNextIntl(nextConfig);
