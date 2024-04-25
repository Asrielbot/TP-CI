// list to add ESM to ignore
const esModules = ["uuid"].join("|");

module.exports = {
  transform: {}, // Assurez-vous que aucun transform n'est utilisé pour les fichiers JS/MJS
  testEnvironment: "node",
  testMatch: [
    "**/tests/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).c[tj]s?(x)",
    "**/tests/**/?(*.)+(spec|test).cjs", // Ajout pour inclure spécifiquement les fichiers .mjs dans le dossier tests
  ],
  transform: {},
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    // '^uuid$': '<rootDir>/node_modules/uuid/dist/index.js',
    "^uuid$": require.resolve("uuid"),
  },
  reporters: ["default", "jest-junit"],
};
