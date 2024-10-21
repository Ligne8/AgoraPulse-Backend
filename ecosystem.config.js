module.exports = {
  apps: [
    {
      name: 'agorapulse',
      script: './dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '3G',
    },
  ],
};
