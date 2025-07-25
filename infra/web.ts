import { api } from "./api";
import { router } from "./router";

export const web = new sst.aws.Nextjs("Web", {
  path: "apps/web",
  router: {
    instance: router,
  },
  environment: {
    TZ: "Asia/Singapore",
    SG_CARS_TRENDS_API_TOKEN: process.env.SG_CARS_TRENDS_API_TOKEN!,
    DATABASE_URL: process.env.DATABASE_URL!,
    NEXT_PUBLIC_API_URL: api.url,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
    APP_ENV: $app.stage,
  },
  server: {
    architecture: "arm64",
    runtime: "nodejs22.x",
  },
  warm: 1,
});

export const url = web.url;
