import { afterEach, describe, expect, test } from "vitest";
import { registerSchema, unregisterSchema, validate } from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { jsonSchemaErrors } from "../index.js";
import { Localization } from "../localization.js";

describe("maxLength error handler", async () => {
  const schemaUri = "https://example.com/main";
  const localization = await Localization.forLocale("en-US");

  afterEach(() => {
    unregisterSchema(schemaUri);
  });

  test("maxLength fail", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      maxLength: 3
    }, schemaUri);

    const instance = "abcd";
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getMaxLengthErrorMessage(3),
        instanceLocation: "#",
        schemaLocations: [`${schemaUri}#/maxLength`]
      }
    ]);
  });

  test("maxLength pass", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      maxLength: 3
    }, schemaUri);

    const instance = "ab";
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });
});
