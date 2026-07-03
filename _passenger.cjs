// Plesk / Phusion Passenger cannot require() ESM modules directly.
// Use this file as the Application startup file in Plesk Node.js settings.
async function main() {
  const { default: app } = await import('./app.js')
  const PORT = process.env.PORT || 3000

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ITCS server listening on http://0.0.0.0:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start ITCS app:', err)
  process.exit(1)
})
