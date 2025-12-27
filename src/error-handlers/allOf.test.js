import { afterEach, describe, expect, test } from "vitest";
import { registerSchema, unregisterSchema, validate } from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { jsonSchemaErrors } from "../index.js";
import { Localization } from "../localization.js";

describe("allOf error handler", async () => {
  const schemaUri = "https://example.com/main";
  const localization = await Localization.forLocale("en-US");

  afterEach(() => {
    unregisterSchema(schemaUri);
  });

  test("allOf fail", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      allOf: [
        { type: "number" },
        { minimum: 3 }
      ]
    }, schemaUri);

    const instance = 1;
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getMinimumErrorMessage(3),
        instanceLocation: "#",
        schemaLocations: [`${schemaUri}#/allOf/1/minimum`]
      }
    ]);
  });

  test("allOf pass", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      oneOf: [
        { type: "string" },
        { minimum: 3 }
      ]
    }, schemaUri);

    const instance = 42;
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });
});
