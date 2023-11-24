// Filtering logic for the list of products
import { useDispatch, useSelector } from 'react-redux';
import {
  setGenderFilter,
  setColorFilter,
  setPriceRangeFilter,
  setTypeFilter,
} from '../store/filtersSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

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
  );
};

export default Filters;
