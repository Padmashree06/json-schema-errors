import { evaluateSchema } from "../json-schema-errors.js";
import * as Instance from "@hyperjump/json-schema/instance/experimental";

/**
 * @import { EvaluationContext, KeywordHandler, NormalizedOutput } from "../index.d.ts"
 */

/**
 * @typedef {{
 *   evaluatedItems: Set<number>;
 *   schemaEvaluatedItems: Set<number>;
 * } & EvaluationContext} EvaluatedItemsContext
 */

/** @type KeywordHandler<string, EvaluatedItemsContext> */
const unevaluatedItemsNormalizationHandler = {
  evaluate(unevaluatedItems, instance, context) {
    /** @type NormalizedOutput[] */
    const outputs = [];

    if (Instance.typeOf(instance) !== "array") {
      return outputs;
    }

    const evaluatedItems = context.schemaEvaluatedItems;

    let index = 0;
    for (const item of Instance.iter(instance)) {
      if (!evaluatedItems.has(index)) {
        outputs.push(evaluateSchema(unevaluatedItems, item, context));
        context.evaluatedItems?.add(index);
      }

      index++;
    }

    return outputs;
  },
  simpleApplicator: true
};

export default unevaluatedItemsNormalizationHandler;
