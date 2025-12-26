import { afterEach, describe, expect, test } from "vitest";
import { registerSchema, unregisterSchema, validate } from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { jsonSchemaErrors } from "../index.js";
import { Localization } from "../localization.js";

describe("pattern error handler", async () => {
  const schemaUri = "https://example.com/main";
  const localization = await Localization.forLocale("en-US");

  afterEach(() => {
    unregisterSchema(schemaUri);
  });

  test("pattern fail", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      pattern: "^a"
    }, schemaUri);

    const instance = "banana";
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getPatternErrorMessage("^a"),
        instanceLocation: "#",
        schemaLocations: [`${schemaUri}#/pattern`]
      }
    ]);
  });

  test("pattern pass", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      pattern: "^a"
    }, schemaUri);

    const instance = "apple";
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });
});
