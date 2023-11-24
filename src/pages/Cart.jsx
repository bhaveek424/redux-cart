import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(incrementQuantity({ id: productId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decrementQuantity({ id: productId }));
  };

  const totalAmount = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div>
      <h3>Shopping Cart</h3>
      <div className="cartWrapper">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-md p-4 mb-5 max-w-lg">
            <img
              className="w-6 h-6 object-cover"
              src={product.imageURL}
              alt=""
            />

            <div className="flex flex-col">
              <h5>{product.name}</h5>
              <p className="text-sm">
                {product.price} {product.currency}
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="bg-slate-600 text-white px-2 py-1 rounded"
                onClick={() => handleDecreaseQuantity(product.id)}>
                -
              </button>
              <div className="border bg-slate-300 px-2 py-1  border-slate-600 text-slate-800 rounded text-sm">
                qty: {product.quantity}
              </div>
              <button
                className="bg-slate-600 text-white px-2 py-1 rounded"
                disabled={cart.some(
                  (item) =>
                    item.id === product.id && item.quantity >= product.quantity,
                )}
                onClick={() => handleIncreaseQuantity(product.id)}>
                +
              </button>
              <button
                className="border-none outline-none bg-slate-600 px-2 py-1 text-white rounded font-bold cursor-pointer transition duration-300 ease-in-out"
                onClick={() => handleRemove(product.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h4>
          Total Amount: {totalAmount} {/* Add currency symbol if needed */}
        </h4>
      </div>
    </div>
  );
};

export default Cart;
