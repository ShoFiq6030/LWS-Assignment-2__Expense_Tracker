import { useState } from "react";
import FilterButton from "./FilterButton";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import ExpenseSvg from "./Svgs/ExpenseSvg";
import FilterSvg from "./Svgs/FilterSvg";
import SortSvg from "./Svgs/SortSvg";
import EditSvs from "./Svgs/EditSvs";
import DeleteSvg from "./Svgs/DeleteSvg";

const Expense = ({ data,onEdit,onDelete }) => {
  const [toggleButton, setToggleButton] = useState(false);
  const [toggleButton2, setToggleButton2] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const text = [
    "Health",
    "Food",
    "Education",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ];
  const toggleFunction = () => {
    setToggleButton(!toggleButton);
    setToggleButton2(false);
  };
  const toggleFunction2 = () => {
    setToggleButton2(!toggleButton2);
    setToggleButton(false);
  };
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setToggleButton2(false);
  };

  // filters data
  const filteredData = data.filter((item) => {
    if (item.revenue !== "expense") return false;
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(item.catagory);
  });
  // Sort data based on sortOrder
  if (sortOrder === "lowToHigh") {
    filteredData.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  } else if (sortOrder === "highToLow") {
    filteredData.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  }

  const handleClear = () => {
    setSelectedFilters([]);
  };
  // console.log(selectedFilters);
  return (
    // <!-- Expense -->

    <div className="border rounded-md">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
            <ExpenseSvg />
          </div>

          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Expense
            </h3>
          </div>
        </div>

        {/* <!-- Sorting and Filtering Column --> */}
        <div>
          <div className="relative inline-block text-left">
            <div>
              <FilterButton onSmash={toggleFunction}>
                <FilterSvg />
              </FilterButton>
            </div>
            {toggleButton ? (
              <FilterComponent
                text={text}
                checkBoxChange={handleCheckboxChange}
                selectedFilters={selectedFilters}
                handleClear={handleClear}
              />
            ) : null}
          </div>

          <div className="relative inline-block text-left">
            <div>
              <FilterButton onSmash={toggleFunction2}>
                <SortSvg />
              </FilterButton>
            </div>
            {toggleButton2 ? <SortComponent onSortChange={handleSortChange} /> : null}
          </div>
        </div>
        {/* <!-- Sorting and Filtering Column Ends --> */}
      </div>
      {/* filtered and sorted data  */}
      <div className="p-4 divide-y">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 relative group cursor-pointer"
            >
              <div>
                <h3 className="text-base font-medium leading-7 text-gray-600">
                  {item.catagory}
                </h3>
                <p className="text-xs text-gray-600">{item.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                  BDT {item.amount}
                </p>
                <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                  <button
                    className="hover:text-teal-600"
                    role="button"
                    title="Edit Button"
                    onClick={() => onEdit(item)}
                  >
                    <EditSvs />
                  </button>
                  <button
                    className="hover:text-red-600"
                    role="button"
                    title="Delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <DeleteSvg />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No expense data available</p>
        )}
      </div>
    </div>
  );
};

export default Expense;
