import "./ShoppingCart.css";

function ShoppingCart({ cart, setCart }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="shopping-cart">
      {cart.length === 0 ? (
        <>
          <h3 className="cart-title">Su carrito está vacío</h3>
          <div className="empty-cart">
            <p>No hay productos en el carrito</p>
          </div>
        </>
      ) : (
        <>
          <div className="cart-header">
            <h3 className="cart-total-title">
              Carrito: {formatPrice(getTotalPrice())}
            </h3>
          </div>

          <div className="cart-table">
            <table className="cart-items-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Importe</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="item-description">{item.name}</td>
                    <td className="item-price">{formatPrice(item.price)}</td>
                    <td className="item-quantity">{item.quantity}</td>
                    <td className="item-total">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="item-actions">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
