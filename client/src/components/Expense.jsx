import React, { useState, useEffect } from 'react';

const ExpenseComponent = ({ data }) => {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Check if data is a valid array before proceeding
    if (!Array.isArray(data)) {
      return; 
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const expenseTransactions = data.filter(item => {
      // If item is not defined or not available, skip it
      if (!item || item.trans_type !== 'EXPENSE' || !item.date || typeof item.amount !== 'number') {
        return false;
      }

      const itemDate = new Date(item.date);

      // Check if itemDate is valid and matches the current month and year for monthly expenses
      return !isNaN(itemDate.getTime()) &&
             itemDate.getMonth() === currentMonth &&
             itemDate.getFullYear() === currentYear;
    });

    const expenseSum = expenseTransactions.reduce((acc, item) => acc + item.amount, 0);
    setTotalExpense(expenseSum);
  }, [data]); 

  return (
    <div>
      <h3>Expenses: ₹{totalExpense.toLocaleString('en-IN')}</h3>
    </div>
  );
};

export default ExpenseComponent;