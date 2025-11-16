import { useState, useEffect } from 'react'
import Header from './components/Header'
import ProductTable from './components/ProductTable'
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([
        { id: 1, name: 'Moto G42 128 GB', price: 4299.00 },
        { id: 2, name: 'Laptop HP AMD Ryzen 5', price: 11999.00 },
        { id: 3, name: 'Apple Macbook Air', price: 18599.00 },
        { id: 4, name: 'Pantalla Tcl Led 55 Smart 4k', price: 7999.00 },
        { id: 5, name: 'Cámara Seguridad Wifi 2mp Hd', price: 411.00 },
        { id: 6, name: 'Licuadora Ninja Professional', price: 1799.00 },
        { id: 7, name: 'Ouo Silla Gamer Reclinable', price: 1499.00 },
        { id: 8, name: 'Auriculares In-ear Inalámbricos', price: 334.00 }
      ])
    }
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <ProductTable products={products} onAddToCart={addToCart} />
          <ShoppingCart cart={cart} setCart={setCart} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
