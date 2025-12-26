/**
 * @import { KeywordHandler } from "../index.d.ts"
 */

/** @type KeywordHandler */
const patternNormalizationHandler = {
  appliesTo(type) {
    return type === "string";
  }
};

export default patternNormalizationHandler;
