import { afterEach, describe, expect, test } from "vitest";
import { registerSchema, unregisterSchema, validate } from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { jsonSchemaErrors } from "../index.js";
import { Localization } from "../localization.js";

describe("prefixItems keyword", async () => {
  const schemaUri = "https://example.com/main";
  const localization = await Localization.forLocale("en-US");

  afterEach(() => {
    unregisterSchema(schemaUri);
  });

  test("prefixItems fail", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      prefixItems: [{ type: "number" }]
    }, schemaUri);

    const instance = ["foo"];
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getTypeErrorMessage(["number"]),
        instanceLocation: "#/0",
        schemaLocations: [`${schemaUri}#/prefixItems/0/type`]
      }
    ]);
  });

  test("prefixItems with fewer items than are defined", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      prefixItems: [
        { type: "number" },
        { type: "string" }
      ]
    }, schemaUri);

    const instance = ["foo"];
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([
      {
        message: localization.getTypeErrorMessage(["number"]),
        instanceLocation: "#/0",
        schemaLocations: [`${schemaUri}#/prefixItems/0/type`]
      }
    ]);
  });

  test("prefixItems on an non-object", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      prefixItems: [{ type: "number" }]
    }, schemaUri);

    const instance = 42;
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });

  test("prefixItems pass", async () => {
    registerSchema({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      prefixItems: [{ type: "number" }]
    }, schemaUri);

    const instance = { foo: 42 };
    const output = await validate(schemaUri, instance, BASIC);
    const errors = await jsonSchemaErrors(output, schemaUri, instance);

    expect(errors).to.eql([]);
  });
});
