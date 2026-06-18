process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

import('./src/Backend/server.js').catch(err => {
  console.error('SERVER LOAD ERROR:', err.message);
  console.error(err.stack);
  process.exit(1);
});
