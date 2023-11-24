import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setGenderFilter,
  setColorFilter,
  setPriceRangeFilter,
  setTypeFilter,
} from '../store/filtersSlice';
const Sidebar = () => {
  const dispatch = useDispatch();

  const handleGenderChange = (event) => {
    dispatch(setGenderFilter(event.target.value));
  };

  const handleColorChange = (event) => {
    dispatch(setColorFilter(event.target.value));
  };

  const handlePriceRangeChange = (event) => {
    dispatch(setPriceRangeFilter(event.target.value));
  };

  const handleTypeChange = (event) => {
    dispatch(setTypeFilter(event.target.value));
  };

  return (
    <div>
      <h2>Filters</h2>
      {/* Gender filter */}
      <div className="flex flex-col">
        <h3>Gender</h3>
        <label>
          <input type="checkbox" value="Men" onChange={handleGenderChange} />
          Men
        </label>
        <label>
          <input type="checkbox" value="Women" onChange={handleGenderChange} />
          Women
        </label>
      </div>
      {/* Color filter */}
      <label>
        <input type="checkbox" value="Red" onChange={handleColorChange} />
        Red
      </label>
      <label>
        <input type="checkbox" value="Blue" onChange={handleColorChange} />
        Blue
      </label>
      {/* Price range filter */}
      <label>
        <input
          type="checkbox"
          value="Under $50"
          onChange={handlePriceRangeChange}
        />
        Under $50
      </label>
      <label>
        <input
          type="checkbox"
          value="$50 - $100"
          onChange={handlePriceRangeChange}
        />
        $50 - $100
      </label>
      {/* Type filter */}
      <label>
        <input type="checkbox" value="T-Shirt" onChange={handleTypeChange} />
        T-Shirt
      </label>
      <label>
        <input type="checkbox" value="Pants" onChange={handleTypeChange} />
        Pants
      </label>
      {/* Add other filter options */}
    </div>
  );
};

export default Sidebar;
