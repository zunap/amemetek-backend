const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())

// 👇 Define /ca first so it's not shadowed by static
app.get('/ca', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'ca.html')
  console.log('🔍 Serving file:', filePath)

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('❌ Failed to send ca.html:', err)
      res.status(500).send('Failed to load /ca page.')
    }
  })
})

// Then serve /coin as a static folder
app.use('/coin', express.static(path.join(__dirname, 'public/coin')))

// Lastly, serve general static files like images/css
app.use(express.static(path.join(__dirname, 'public')))

app.post('/api/create-coin', (req, res) => {
  const { ca, name, ticker, image, apiKey, server } = req.body
  console.log('Coin Creation Request:', req.body)
  res.json({ success: true, message: `Created ${name} (${ticker})` })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`)
})

