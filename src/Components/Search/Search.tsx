import { CiSearch } from "react-icons/ci";
const Search = () => {
  return (
    <div className="w-[40%] bg-[#232323] py-[1.2px] pl-4 hover:bg-[#5C5C5C] duration-200 rounded-md flex items-center">
      <CiSearch />

      <input
        className="w-full bg-transparent pl-1 outline-none"
        placeholder="Search for courses"
        type="text"
      />
    </div>
  );
};

export default Search;
