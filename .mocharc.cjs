module.exports = {
  'check-leaks': true,
  recursive: true,
  ui: 'bdd',
  reporter: 'nyan',
  timeout: 2000,
  exclude: [
    'node_modules/**',
  ],
  extension: ['ts'],
  spec: [
    "**/*.test.ts"
  ],
  require: 'ts-node/register'
};
