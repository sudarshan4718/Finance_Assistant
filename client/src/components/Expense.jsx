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
      // ✅ GUARD CLAUSE: Skip if item is null, not an expense, or has no date/amount.
      if (!item || item.trans_type !== 'EXPENSE' || !item.date || typeof item.amount !== 'number') {
        return false;
      }

      const itemDate = new Date(item.date);

      // ✅ GUARD CLAUSE: Ensure the date is valid before comparing it.
      return !isNaN(itemDate.getTime()) &&
             itemDate.getMonth() === currentMonth &&
             itemDate.getFullYear() === currentYear;
    });

    const expenseSum = expenseTransactions.reduce((acc, item) => acc + item.amount, 0);
    setTotalExpense(expenseSum);
  }, [data]); // The dependency array is correct

  return (
    <div>
      {/* Using toLocaleString for better number formatting */}
      <h3>Expenses this month: ₹{totalExpense.toLocaleString('en-IN')}</h3>
    </div>
  );
};

export default ExpenseComponent;