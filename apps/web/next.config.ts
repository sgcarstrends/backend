import type { Redirect } from "next/dist/lib/load-custom-routes";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

let redirects: Redirect[] | PromiseLike<Redirect[]> = [];
if (isProd) {
  redirects = [{ source: "/", destination: "/cars", permanent: false }];
}

// Temporary redirects until features in the respective page is completed
redirects = redirects.concat([
  {
    source: "/cars/fuel-types",
    destination: "/cars",
    permanent: false,
  },
  {
    source: "/cars/vehicle-types",
    destination: "/cars",
    permanent: false,
  },
  {
    source: "/cars/makes",
    destination: "/cars",
    permanent: false,
  },
]);

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
