//Singleton class
export class Context {
  private static instance: Context;
  private stepStore: Record<string, Record<string, any>> = {};
  private currentStep: string = "";

  // constructor() {
  //   // this.stepStore["ENV"] = {
  //   //   TOKEN: "fake-token",
  //   //   BASE_URL: "h ttps://dummyjson.com",
  //   // };
  // }

  private constructor() {}

  // Static method to get the single instance
  public static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  setStep(stepId: string) {
    this.currentStep = stepId;
    if (!this.stepStore[stepId]) {
      this.stepStore[stepId] = {};
    }
  }

  set(key: string, value: unknown) {
    this.stepStore[this.currentStep][key] = value;
  }

  setConfig(key: string, value: any) {
    const obj: Record<string, any> = {};
    obj[key] = value;
    this.stepStore["config"] = obj;
  }

  get(varPath: string): any {
    const parts = varPath.split(".");
    if (parts.length === 2) {
      const [stepId, key] = parts;
      return this.stepStore[stepId]?.[key];
    }
    return this.stepStore[this.currentStep]?.[varPath];
  }

  getValueByPath(path: string): any {
    return path.split(".").reduce((acc, key) => {
      if (acc === undefined || acc === null) return undefined;
      return acc[key];
    }, this.stepStore as any);
  }

  interpolate(input: any): any {
    if (typeof input === "string") {
      return input.replace(/\{\{(.*?)\}\}/g, (_, varName) => {
        const val = this.getValueByPath(varName.trim());
        if (val === undefined) throw new Error(`Missing variable: ${varName}`);
        return val;
      });
    } else if (Array.isArray(input)) {
      return input.map((item) => this.interpolate(item));
    } else if (typeof input === "object" && input !== null) {
      const result: Record<string, any> = {};
      for (const [key, val] of Object.entries(input)) {
        result[key] = this.interpolate(val);
      }
      return result;
    }
    return input;
  }
}
