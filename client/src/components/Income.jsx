import { useEffect, useState } from 'react';

const IncomeComponent = ({ data }) => {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const now = new Date();

    const incomeTransactions = data.filter(item => {
      const itemDate = new Date(item.date);
      return (
        item.trans_type === 'INCOME' &&
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear()
      );
    });

    const incomeSum = incomeTransactions.reduce((acc, item) => acc + item.amount, 0);
    setTotalIncome(incomeSum);
  }, [data]);

  return (
    <div>
      <h3>Income : ₹{totalIncome}</h3>
    </div>
  );
};

export default IncomeComponent;
