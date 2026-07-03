import('./app.js')
  .then(() => {
    console.log('OK - app.js loaded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error('FAILED to load app.js:')
    console.error(err)
    process.exit(1)
  })
