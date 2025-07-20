import { useEffect, useState } from 'react';

const IncomeComponent = ({ data }) => {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {

    // Check if data is a valid array before proceeding
    if (!Array.isArray(data)) {
      return; 
    }

    const now = new Date();
    
    // Filter data by current month and year
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
