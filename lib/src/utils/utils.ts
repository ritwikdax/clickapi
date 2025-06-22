import { ZodError } from "zod";
import Logger from "./logger";

export function handleError(err: unknown) {
  if (err instanceof ZodError) {
    Logger.error("Schema Validation Error!");
    Logger.error(`Check ${err.issues[0].path} field, ${err.issues[0].message}`);
  }
}
