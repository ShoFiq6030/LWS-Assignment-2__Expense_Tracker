/* eslint-disable react/prop-types */

const FilterComponent = ({ text,checkBoxChange,selectedFilters,handleClear}) => {
  // console.log(selectedFilters)
  
  return (
    <div
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="filter-button-2"
      tabIndex="-1"
      id="filter-dropdown2"
    >
      <div className="py-1" role="none">
        {text.map((t,i) => {
          return (
            <label
              key={t}
              className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                id={`filter-option-${i}`}
                value={t}
                onChange={checkBoxChange}
                checked={selectedFilters.includes(t)}
              />
              <span className="ml-2">{t}</span>
            </label>
          );
        })}
        <button onClick={handleClear} className="p-1 ml-4 text-red-600  underline" >clear</button>
      </div>
    </div>
  );
};

export default FilterComponent;
