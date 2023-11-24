import { Search } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const SearchInput = ({ searchText, handleSearch }) => {
  return (
    <div className="flex items-center justify-center p-5 border rounded py-2 pl-8 pr-4">
      <input
        type="text"
        placeholder="Search by name, color, or type"
        value={searchText}
        onChange={handleSearch}
        className="border rounded py-2 pl-8 pr-4 focus:outline-none focus:border-blue-500"
      />
      <Search className=" inset-y-0 left-0 m-3 text-gray-500" size={20} />
    </div>
  );
};

export default SearchInput;
