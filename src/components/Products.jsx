// import React from 'react';
// import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../store/cartSlice';
// import {
//   setGenderFilter,
//   setColorFilter,
//   setPriceRangeFilter,
//   setTypeFilter,
// } from '../store/filtersSlice';
// import { setSearchText } from '../store/productSlice';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Filters from './Filters';

const Products = () => {
  const [searchText, setSearchText] = useState('');
  const [addedToCart, setAddedToCart] = useState([]);
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const filters = useSelector((state) => state.filters);
  // const searchText = useSelector((state) => state.product.searchText);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const applyFilters = (product) => {
    const searchRegex = new RegExp(searchText, 'i');
    const matchesSearch =
      searchRegex.test(product.name) ||
      searchRegex.test(product.color) ||
      searchRegex.test(product.type);

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

    return (
      matchesSearch && filterGender && filterColor && filterType && filterPrice
    );
  };

  const filteredProducts = products.filter(applyFilters);

  const handleAdd = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setAddedToCart([...addedToCart, product.id]);
      dispatch(incrementQuantity({ id: product.id }));
    } else {
      dispatch(addToCart(product));
      setAddedToCart([...addedToCart, product.id]);
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

  // const handleSetGenderFilter = (gender) => {
  //   if (filters.gender === gender) {
  //     dispatch(setGenderFilter('')); // Clear the filter value
  //   } else {
  //     dispatch(setGenderFilter(gender)); // Apply the selected filter
  //   }
  // };

  // const handleSetColorFilter = (color) => {
  //   if (filters.color === color) {
  //     dispatch(setColorFilter('')); // Clear the filter value
  //   } else {
  //     dispatch(setColorFilter(color)); // Apply the selected filter
  //   }
  // };

  // const handleSetTypeFilter = (type) => {
  //   if (filters.type === type) {
  //     dispatch(setTypeFilter('')); // Clear the filter value
  //   } else {
  //     dispatch(setTypeFilter(type)); // Apply the selected filter
  //   }
  // };

  // const handleSetPriceRangeFilter = (priceRange) => {
  //   if (filters.priceRange === priceRange) {
  //     dispatch(setPriceRangeFilter('')); // Clear the filter value
  //   } else {
  //     dispatch(setPriceRangeFilter(priceRange)); // Apply the selected filter
  //   }
  // };

  return (
    <div>
      <div className="flex items-center justify-center p-5 border rounded py-2 pl-8 pr-4">
        {/* Search input */}

        <input
          type="text"
          placeholder="Search by name, color, or type"
          value={searchText}
          onChange={handleSearch}
        />
        <Search className=" inset-y-0 left-0 m-3 text-gray-500" size={20} />
      </div>
      <div className="flex ">
        {/* Filters */}
        <Filters />

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
                    {addedToCart.includes(product.id) ? (
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
                          disabled={cart.some(
                            (item) =>
                              item.id === product.id &&
                              item.quantity >= product.quantity,
                          )}
                          onClick={() => handleIncreaseQuantity(product.id)}
                          className="border border-gray-400 px-2 py-1 rounded-full bg-gray-200">
                          +
                        </button>
                      </div>
                    ) : (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
