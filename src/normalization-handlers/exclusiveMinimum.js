/**
 * @import { KeywordHandler } from "../index.d.ts"
 */

/** @type KeywordHandler */
const exclusiveMinimumKeywordHandler = {
  appliesTo(type) {
    return type === "number";
  }
};

export default exclusiveMinimumKeywordHandler;
