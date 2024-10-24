import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify the directory where Vitest should look for tests
    dir: './test', // Change this to your custom test directory

    // Optionally specify test file patterns (e.g., look for *.test.ts or *.spec.ts)
    include: ['**/*.test.ts', '**/*.spec.ts'],

    // Other test options you might want to configure
    globals: true, // If you want to use global methods like `describe`, `it`, etc.
    // environment: 'node', // Set environment (e.g., node, jsdom for browser-like)
    setupFiles: './test/setup.ts', // Path to a setup file, if needed
  },
});
