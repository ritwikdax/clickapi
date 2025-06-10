import axios, { AxiosError, AxiosResponse } from "axios";
import { Context } from "./context";
import { Step } from "../interfaces/interface";

export interface StepResult {
  step: Step;
  success: boolean;
  error?: string;
  request?: any;
  response?: any;
}

export async function executeStep(
  step: Step,
  context: Context
): Promise<StepResult> {
  context.setStep(step.id);
  context.set("step", step);
  const method = step.method;
  const url = context.interpolate(`{{ ENV.BASE_URL }}${step.url}`);
  const headers = context.interpolate(step.headers || {});
  const data = step.body ? context.interpolate(step.body) : undefined;

  const requestLog = { method, url, headers, body: data };
  try {
    const res = await axios({ method, url, headers, data });
    const response = { data: res.data, headers: res.headers };

    context.set("response", response);

    // if (step.save) {
    //   for (const [key, jsonPath] of Object.entries(step.save)) {
    //     const value = JSONPath({
    //       path: jsonPath as string,
    //       json: responseData,
    //     })[0];
    //     context.set(key, value);
    //   }
    // }

    // if (step.asserts) {
    //   for (const assertion of step.asserts) {
    //     const result = JSONPath({ path: assertion.path, json: responseData });
    //     if (assertion.exists && result.length === 0) {
    //       throw new Error(`Assertion failed: ${assertion.path} does not exist`);
    //     }
    //   }
    // }

    console.log(`✅ Step passed: ${step.name}`);
    return {
      step,
      success: true,
      request: requestLog,
      response: response,
    };
  } catch (error: any) {
    console.error(`❌ Step failed: ${step.name} - ${error.message}`);
    return {
      step,
      success: false,
      error: error.message,
      request: requestLog,
      response: (error as AxiosError).response?.headers,
    };
  }
}
