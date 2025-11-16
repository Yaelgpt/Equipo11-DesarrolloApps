import './ProductTable.css'

function ProductTable({ products, onAddToCart }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className="product-section">
      <h2 className="section-title">Ofertas limitadas</h2>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="product-name">{product.name}</td>
                <td className="product-price">{formatPrice(product.price)}</td>
                <td className="add-button-cell">
                  <button 
                    className="add-button"
                    onClick={() => onAddToCart(product)}
                    aria-label={`Agregar ${product.name} al carrito`}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable
