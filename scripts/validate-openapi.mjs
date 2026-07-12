import { readFile } from "node:fs/promises";

const path = new URL("../openapi/crowdquest.openapi.json", import.meta.url);
const spec = JSON.parse(await readFile(path, "utf8"));
const expectedOperations = [
  ["/healthz", "get"],
  ["/v1/source", "get"],
  ["/v1/sessions", "post"],
  ["/v1/rooms/{sessionId}", "get"],
  ["/v1/rooms/{sessionId}/answers", "post"],
  ["/v1/rooms/{sessionId}/reset", "post"],
  ["/v1/admin/txline/refresh", "post"],
];

if (spec.openapi !== "3.1.0") throw new Error("OpenAPI version must be 3.1.0");
for (const [route, method] of expectedOperations) {
  if (!spec.paths?.[route]?.[method]) throw new Error(`Missing ${method.toUpperCase()} ${route}`);
}
const publicQuest = spec.components?.schemas?.PublicQuest;
if (!publicQuest || "correctChoice" in (publicQuest.properties ?? {})) {
  throw new Error("PublicQuest must exist and must never expose correctChoice");
}
const answerInput = spec.components?.schemas?.AnswerInput;
for (const required of ["questId", "choiceId"]) {
  if (!answerInput?.required?.includes(required)) throw new Error(`AnswerInput must require ${required}`);
}

process.stdout.write("OpenAPI contract checks passed.\n");
