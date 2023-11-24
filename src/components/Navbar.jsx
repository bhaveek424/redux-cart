import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const items = useSelector((state) => state.cart);
  return (
    <div className="flex bg-gray-300 justify-between py-4 px-10 ">
      <Link to="/">TeeRex</Link>
      <div className="flex gap-5">
        <span>Products</span>
        <Link to="/cart">
          <ShoppingCart />
          <span
            className={
              items.length > 0
                ? 'rounded-full justify-center bg-red-400 flex items-center h-4 w-4 text-sm text-white -translate-y-8 translate-x-5'
                : 'hidden'
            }>
            {items.length}
          </span>
        </Link>
      </div>
    </div>
  );
};
