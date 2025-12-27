import { evaluateSchema } from "../json-schema-errors.js";

/**
 * @import { KeywordHandler } from "../index.d.ts"
 */

/** @type KeywordHandler<string> */
const notNormalizationHandler = {
  evaluate(not, instance, context) {
    return [evaluateSchema(not, instance, context)];
  }
};

export default notNormalizationHandler;
