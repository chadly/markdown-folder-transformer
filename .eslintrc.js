// see https://www.npmjs.com/package/@rushstack/eslint-patch
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	extends: ["@growflow"],
	parserOptions: {
		project: "tsconfig.json",
	},
	rules: {
		"no-console": "off",
		"no-continue": "off",
		"guard-for-in": "off",
		"no-await-in-loop": "off",
		"unicorn/no-process-exit": "off",
	},
};
