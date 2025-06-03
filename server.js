const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Serve /coin from /public/coin/coin.html
app.get('/coin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/coin/coin.html'))
})

// Serve /ca from /public/ca.html
app.get('/ca', (req, res) => {
  console.log("➡️ /ca route hit with:", req.query.ca)
  res.sendFile(path.join(__dirname, 'public', 'ca.html'), (err) => {
    if (err) {
      console.error("❌ Error sending ca.html:", err)
      res.status(500).send("Server error loading CA page")
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
