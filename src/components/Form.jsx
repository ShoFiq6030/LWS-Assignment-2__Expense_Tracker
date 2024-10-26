/* eslint-disable react/prop-types */
import { useState } from "react";

const Form = ({   onAddOrUpdate,
  selected,
  onSmash,
  selectedCategory,
  setSelectedCategory,
  amount,
  setAmount,
  date,
  setDate,
  selectedItem,
   }) => {
  // console.log(selectedItem)

  const [categoryError, setCategoryError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategoryError(""); 
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError(""); 
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    if (!selectedCategory) {
      setCategoryError("Please select a category.");
      valid = false;
    }
    if (!amount) {
      setAmountError("Please enter an amount.");
      valid = false;
    } else if (Number(amount) <= 0) {
      setAmountError("Amount must be a positive number.");
      valid = false;
    }

    if (!date) {
      setDateError("Please select a date.");
      valid = false;
    }

    if (!valid) return;

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const newItem = {
      id: selectedItem ? selectedItem.id : crypto.randomUUID(),
      revenue: selected,
      catagory: selectedCategory,
      amount,
      date: formattedDate,
    };
    // console.log(newItem);

    onAddOrUpdate(newItem);

  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[13px] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2  ${
              selected === "expense"
                ? "bg-teal-500"
                : "hover:bg-slate-50 hover:text-slate-900"
            }`}
            onClick={() => onSmash("expense")}
            
          >
            Expense
          </div>
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2  ${
              selected === "income"
                ? "bg-teal-500"
                : "hover:bg-slate-50 hover:text-slate-900"
            }`}
            onClick={() => onSmash("income")}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option disabled value="">
                Select
              </option>
              {selected === "expense" ? (
                <>
                  <option value="Education">Education</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Bill">Bill</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Tax">Tax</option>
                  <option value="Transport">Transport</option>
                  <option value="Telephone">Telephone</option>
                </>
              ) : (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Outsourcing">Outsourcing</option>
                  <option value="Bond">Bond</option>
                  <option value="Dividend">Dividend</option>
                </>
              )}
            </select>
            {categoryError && <p className="text-red-500 text-xs">{categoryError}</p>}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={amount}
              onChange={handleAmountChange}
            />
            {amountError && <p className="text-red-500 text-xs">{amountError}</p>}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={date}
              onChange={handleDateChange}
            />
            {dateError && <p className="text-red-500 text-xs">{dateError}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
