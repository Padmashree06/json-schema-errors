/**
 * @import { KeywordHandler } from "../index.d.ts"
 */

/** @type KeywordHandler */
const maxLengthNormalizationHandler = {
  appliesTo(type) {
    return type === "string";
  }
};

export default maxLengthNormalizationHandler;
