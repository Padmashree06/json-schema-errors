import { afterEach, describe, expect, test } from "vitest";
import { registerSchema, unregisterSchema, validate } from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { jsonSchemaErrors } from "../index.js";
import { Localization } from "../localization.js";

describe("propertyNames keyword", async () => {
  const schemaUri = "https://example.com/main";
  const localization = await Localization.forLocale("en-US");

  afterEach(() => {
    unregisterSchema(schemaUri);
  });

  test("propertyNames fail", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      propertyNames: { minLength: 5 }
    }, schemaUri);

    const instance = { foo: 42 };
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getMinLengthErrorMessage(5),
        instanceLocation: "#/foo",
        schemaLocations: [`${schemaUri}#/propertyNames/minLength`]
      }
    ]);
  });

  test("propertyNames without star notation", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      propertyNames: { minLength: 5 }
    }, schemaUri);

    const instance = { foo: 42 };
    const output = {
      valid: false,
      errors: [
        {
          absoluteKeywordLocation: `${schemaUri}#/propertyNames/minLength`,
          instanceLocation: "#/foo"
        }
      ]
    };
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getMinLengthErrorMessage(5),
        instanceLocation: "#/foo",
        schemaLocations: [`${schemaUri}#/propertyNames/minLength`]
      }
    ]);
  });

  test("propertyNames on a non-object", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      propertyNames: { minLength: 5 }
    }, schemaUri);

    const instance = 42;
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });

  test("propertyNames pass", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      propertyNames: { minLength: 5 }
    }, schemaUri);

    const instance = { foobar: 42 };
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });
});
