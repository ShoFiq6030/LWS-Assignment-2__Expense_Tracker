import { useState } from "react";
import Balance from "./Balance";
import Expense from "./Expense";
import Form from "./Form";
import Income from "./Income";

const ExpenseSection = () => {

  const [data, setData] = useState([
    // {
    //   id: crypto.randomUUID(),
    //   amount: "2000",
    //   catagory: "Education",
    //   date: "2024-10-02",
    //   revenue: "expense",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   amount: "2000",
    //   catagory: "Salary",
    //   date: "2024-10-02",
    //   revenue: "income",
    // },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selected, setSelected] = useState('expense');
  // console.log(selected)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleAddOrUpdate = (item) => {
    if (selectedItem) {
     
      setData(data.map((d) => (d.id === item.id ? item : d)));
    } else {
      
      setData([...data, item]);
    }
   
    setSelected("expense");
    setSelectedCategory("");
    setAmount("");
    setDate("");
    setSelectedItem(null);
  };

  const toInputDateFormat = (dateString) => {
    if (dateString.includes("-")) return dateString;
    const [day, monthName, year] = dateString.split(" ");
    const date = new Date(`${monthName} ${day}, ${year}`);
    const yearStr = date.getFullYear();
    const monthStr = String(date.getMonth() + 1).padStart(2, "0"); 
    const dayStr = String(date.getDate()).padStart(2, "0");

    return `${yearStr}-${monthStr}-${dayStr}`;
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setSelected(item.revenue || "expense");
    setSelectedCategory(item.catagory || "");
    setAmount(item.amount || "");
    setDate(  toInputDateFormat(item.date) || "");
    // console.log(toInputDateFormat(item.date))
  };
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      setData(data.filter((item) => item.id !== id));
      handleClearFields()
    }
  };
  const handleClearFields = () => {
    setSelectedCategory("");
    setAmount("");
    setDate("");
    setSelectedItem(null);
};

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Form
          onAddOrUpdate={handleAddOrUpdate}
          selected={selected}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          selectedItem={selectedItem}
          onSmash={(value) => {
            // console.log(value)
            setSelected(value);
            handleClearFields();
        }}
        />
        <div className="lg:col-span-2">
          <div className="lg:col-span-2">
            <Balance data={data} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <Income data={data} onEdit={handleEdit} onDelete={handleDelete} />
              <Expense data={data} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExpenseSection;
