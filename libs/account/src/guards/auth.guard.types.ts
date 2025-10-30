import type { SessionUser } from "@meta-1/nest-common";

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}
