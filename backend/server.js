import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Sample product data matching the image
const products = [
  { id: 1, name: 'Moto G42 128 GB', price: 4299.00 },
  { id: 2, name: 'Laptop HP AMD Ryzen 5', price: 11999.00 },
  { id: 3, name: 'Apple Macbook Air', price: 18599.00 },
  { id: 4, name: 'Pantalla Tcl Led 55 Smart 4k', price: 7999.00 },
  { id: 5, name: 'Cámara Seguridad Wifi 2mp Hd', price: 411.00 },
  { id: 6, name: 'Licuadora Ninja Professional', price: 1799.00 },
  { id: 7, name: 'Ouo Silla Gamer Reclinable', price: 1499.00 },
  { id: 8, name: 'Auriculares In-ear Inalámbricos', price: 334.00 }
]

// Routes
app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  res.json(product)
})

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body
  const product = products.find(p => p.id === productId)
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  
  res.json({
    message: 'Product added to cart',
    item: { ...product, quantity }
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Buen Fin API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📦 Products API available at http://localhost:${PORT}/api/products`)
})
