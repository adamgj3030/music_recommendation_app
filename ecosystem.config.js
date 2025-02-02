module.exports = {
    apps: [
      {
        name: 'backend',
        script: 'dist/server.js',  // Ensure your TypeScript is built to JavaScript (e.g., using tsc)
        instances: 'max',          // Or set to a specific number
        exec_mode: 'cluster',
        watch: false,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };