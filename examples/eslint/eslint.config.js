import nohardtext from "@nohardcoding/eslint-plugin-nohardtext";

export default [
  {
    files: ["**/*.{jsx,tsx}"],
    ...nohardtext.configs.recommended,
  },
];
