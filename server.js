const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

console.log('🔥 server.js is running...')

app.use(cors())
app.use(express.json())

app.post('/api/create-coin', (req, res) => {
  const { ca, name, ticker } = req.body
  console.log('👉 Coin Request Received:', req.body)
  res.json({ success: true, message: `Created ${name} (${ticker})` })
})

app.listen(3000, () => console.log('✅ Your API running on http://localhost:3000'))
