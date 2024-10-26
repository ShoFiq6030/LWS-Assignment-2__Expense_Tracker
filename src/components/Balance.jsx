const Balance = ({ data }) => {
  const totalIncome = data
    .filter((item) => item.revenue === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalExpense = data
    .filter((item) => item.revenue === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;
  return (
    // <!-- Total Balance Stat-->
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
          <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
            <dt className="text-base leading-7 text-gray-600"> Balance</dt>

            {balance >= 0 ? (
              <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
                BDT {balance}
              </dd>
            ) : (
              <dd className="order-first text-xl font-semibold tracking-tight text-red-700 sm:text-3xl">
                BDT {balance}
              </dd>
            )}
          </div>
          <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
            <dt className="text-base leading-7 text-gray-600">Total Income</dt>
            <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
              BDT {totalIncome}
            </dd>
          </div>
          <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
            <dt className="text-base leading-7 text-gray-600">Total Expense</dt>
            <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">
              BDT {totalExpense}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Balance;
