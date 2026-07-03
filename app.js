import app from './src/Backend/server.js'

const isPassenger = Boolean(
  process.env.PASSENGER_APP_ENV ||
  process.env.PHUSION_PASSENGER ||
  process.env.PASSENGER_BASE_URI,
)

if (!isPassenger) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ITCS server listening on http://0.0.0.0:${PORT}`)
  })
} else {
  console.log('Running under Phusion Passenger')
}

export default app
