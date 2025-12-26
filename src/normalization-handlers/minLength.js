/**
 * @import { KeywordHandler } from "../index.d.ts"
 */

/** @type KeywordHandler */
const minLengthNormalizationHandler = {
  appliesTo(type) {
    return type === "string";
  }
};

export default minLengthNormalizationHandler;
