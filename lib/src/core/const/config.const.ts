export const defaultConfig = {
  name: "Project Name",
  description: "Project Description",
  headers: {
    authorization: "Bearer {{env.token}}",
    "Content-Type": "application/json",
  },
  testDir: "./tests",
  reportDir: "./report",
};
