import { ZodSchema } from "zod";

export class SchemaValidator {
  private schema: ZodSchema;
  constructor(schema: ZodSchema) {
    this.schema = schema;
  }

  public validate(data: unknown) {
    return this.schema.parse(data);
  }
}
