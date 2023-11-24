import React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../store/cartSlice';
import {
  setGenderFilter,
  setColorFilter,
  setPriceRangeFilter,
  setTypeFilter,
} from '../store/filtersSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const filters = useSelector((state) => state.filters);

  const filteredProducts = products.filter((product) => {
    const filterGender = !filters.gender || product.gender === filters.gender;
    const filterColor = !filters.color || product.color === filters.color;
    const filterType = !filters.type || product.type === filters.type;

    let filterPrice = true; // Initialize to true if no price filter is selected
    if (filters.priceRange) {
      const price = product.price;
      switch (filters.priceRange) {
        case '0-250':
          filterPrice = price >= 0 && price <= 250;
          break;
        case '251-400':
          filterPrice = price > 250 && price <= 400;
          break;
        case '401-600':
          filterPrice = price > 400 && price <= 600;
          break;
        // Add other price ranges as needed
        default:
          break;
      }
    }

    return filterGender && filterColor && filterPrice && filterType;
  });

  const handleAdd = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, don't add a new one, just increase its quantity
      dispatch(incrementQuantity({ id: product.id }));
    } else {
      // Add a new item to the cart with a default quantity of 1
      dispatch(addToCart(product));
    }
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(incrementQuantity({ id: productId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decrementQuantity({ id: productId }));
  };

  const getProductQuantity = (productId) => {
    const cartProduct = cart.find((item) => item.id === productId);
    return cartProduct ? cartProduct.quantity : 0;
  };

  const handleSetGenderFilter = (gender) => {
    if (filters.gender === gender) {
      dispatch(setGenderFilter('')); // Clear the filter value
    } else {
      dispatch(setGenderFilter(gender)); // Apply the selected filter
    }
  };

  const handleSetColorFilter = (color) => {
    if (filters.color === color) {
      dispatch(setColorFilter('')); // Clear the filter value
    } else {
      dispatch(setColorFilter(color)); // Apply the selected filter
    }
  };

  const handleSetTypeFilter = (type) => {
    if (filters.type === type) {
      dispatch(setTypeFilter('')); // Clear the filter value
    } else {
      dispatch(setTypeFilter(type)); // Apply the selected filter
    }
  };

  const handleSetPriceRangeFilter = (priceRange) => {
    if (filters.priceRange === priceRange) {
      dispatch(setPriceRangeFilter('')); // Clear the filter value
    } else {
      dispatch(setPriceRangeFilter(priceRange)); // Apply the selected filter
    }
  };

  return (
    <>
      <div>
        <h2>Filters</h2>
        {/* Gender filter */}
        <div className="flex flex-col">
          <h3 className="font-bold">Gender</h3>
          <label>
            <input
              type="checkbox"
              value="Men"
              onChange={(e) => handleSetGenderFilter(e.target.value)}
            />
            Men
          </label>
          <label>
            <input
              type="checkbox"
              value="Women"
              onChange={(e) => handleSetGenderFilter(e.target.value)}
            />
            Women
          </label>
        </div>
        {/* Color filter */}
        <div className="flex flex-col">
          <h3 className="font-bold">Color</h3>
          <label>
            <input
              type="checkbox"
              value="Red"
              onChange={(e) => handleSetColorFilter(e.target.value)}
            />
            Red
          </label>
          <label>
            <input
              type="checkbox"
              value="Blue"
              onChange={(e) => handleSetColorFilter(e.target.value)}
            />
            Blue
          </label>
          <label>
            <input
              type="checkbox"
              value="Green"
              onChange={(e) => handleSetColorFilter(e.target.value)}
            />
            Green
          </label>
        </div>
        {/* Type filter */}
        <div className="flex flex-col">
          <h3 className="font-bold">Type</h3>
          <label>
            <input
              type="checkbox"
              value="Basic"
              onChange={(e) => handleSetTypeFilter(e.target.value)}
            />
            Basic
          </label>
          <label>
            <input
              type="checkbox"
              value="Polo"
              onChange={(e) => handleSetTypeFilter(e.target.value)}
            />
            Polo
          </label>
          <label>
            <input
              type="checkbox"
              value="Hoodie"
              onChange={(e) => handleSetTypeFilter(e.target.value)}
            />
            Hoodie
          </label>
        </div>
        {/* Price range filter */}
        <div className="flex flex-col">
          <h3 className="font-bold">Price Range</h3>
          <label>
            <input
              type="checkbox"
              value="0-250"
              onChange={(e) => handleSetPriceRangeFilter(e.target.value)}
            />
            0-250
          </label>
          <label>
            <input
              type="checkbox"
              value="251-400"
              onChange={(e) => handleSetPriceRangeFilter(e.target.value)}
            />
            251-400
          </label>
          <label>
            <input
              type="checkbox"
              value="401-600"
              onChange={(e) => handleSetPriceRangeFilter(e.target.value)}
            />
            401-600
          </label>
          {/* Add other price range options */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              src={product.imageURL}
              alt={product.name}
              className=" object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <div className="flex justify-between px-2 place-items-center">
                <p className="text-xl  mb-2">
                  {product.price} {product.currency}
                </p>

                <div className="flex justify-between px-2 place-items-center">
                  <div>
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="border border-gray-400 px-2 py-1 rounded-full bg-gray-200">
                      -
                    </button>
                    <span className="px-2">
                      {getProductQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.id)}
                      className="border border-gray-400 px-2 py-1 rounded-full bg-gray-200">
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={cart.some(
                        (item) =>
                          item.id === product.id &&
                          item.quantity >= product.quantity,
                      )}
                      className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
