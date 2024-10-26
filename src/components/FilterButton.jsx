/* eslint-disable react/prop-types */


const FilterButton = (props) => {
  return (
    <button
    onClick={props.onSmash}
    type="button"
    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    id="filter-button"
    aria-expanded="true"
    aria-haspopup="true"
  >
    {props.children}
  </button>
  )
}

export default FilterButton