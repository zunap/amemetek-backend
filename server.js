const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Serve /coin from /public/coin/coin.html
app.use('/coin', express.static(path.join(__dirname, 'public/coin')))


// Serve /ca from /public/ca.html
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



// Optional API endpoint for coin creation
app.post('/api/create-coin', (req, res) => {
  const { ca, name, ticker, image, apiKey, server } = req.body
  console.log('Coin Creation Request:', req.body)
  res.json({ success: true, message: `Created ${name} (${ticker})` })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Server running on port 3000')
})
