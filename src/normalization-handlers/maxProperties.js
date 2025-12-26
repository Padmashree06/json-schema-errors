/**
 * @import { KeywordHandler } from "../index.d.ts"
 */

/** @type KeywordHandler */
const maxPropertiesNormalizationHandler = {
  appliesTo(type) {
    return type === "object";
  }
};

export default maxPropertiesNormalizationHandler;
