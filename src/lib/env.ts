import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const sharedEnv = createEnv({
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});

export const dbEnv = createEnv({
  extends: [sharedEnv],
  server: {
    DATABASE_URL: z.string().url().startsWith("postgres"),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

export const googleEnv = createEnv({
  extends: [sharedEnv],
  server: {
    GOOGLE_API_KEY: z.string().optional(),
    GOOGLE_PROJECT_ID: z.string().optional(),
    GOOGLE_ACCESS_TOKEN: z.string().optional(),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

export const env = createEnv({
  extends: [sharedEnv, dbEnv, googleEnv],
  shared: {
    PORT: z.coerce.number().default(3000),
  },
  server: {},
  experimental__runtimeEnv: {
    PORT: process.env.PORT,
  },
  emptyStringAsUndefined: true,
  skipValidation: true,
});
