import { Context } from "./context";
import { executeStep, StepResult } from "./executor";
import { TestFile } from "../interfaces/interface";

export async function runTest(testDef: TestFile) {
  const context = new Context();
  const results: StepResult[] = [];

  console.log(`🧪 Running Test: ${testDef.name}`);

  for (const step of testDef.steps) {
    const result = await executeStep(step, context);
    results.push(result);
    if (!result.success) break;
  }

  console.log(`\n📋 Test Summary for: ${testDef.name}`);

  //   for (const result of results) {
  //     const status = result.success ? "✅ Passed" : "❌ Failed";
  //     console.log(`- ${result.step.name} (${result.step.id}): ${status}`);
  //     if (result.error) console.log(`    Error: ${result.error}`);

  //     console.log("    Request:", JSON.stringify(result.request, null, 2));
  //     if (result.response) {
  //       console.log("    Response:", JSON.stringify(result.response, null, 2));
  //     }
  //   }

  const passedCount = results.filter((r) => r.success).length;
  const failedCount = results.length - passedCount;
  console.log(
    `\n🟩 Passed: ${passedCount}, 🟥 Failed: ${failedCount}, 🔢 Total: ${results.length}`
  );

  if (failedCount > 0) throw new Error("Some steps failed");
}
