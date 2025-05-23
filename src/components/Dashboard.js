import React from 'react';

function Dashboard({ currentBalance, income, expenses, dictionary }) {
  return (
    <div className="dashboard" data-testid="dashboard">
      <div className="dashboard-container">
        <div className="balance-container">
          <h2>{dictionary.balance}</h2>
          <h1 className={currentBalance >= 0 ? 'money-plus' : 'money-minus'}>
            ${currentBalance.toFixed(2)}
          </h1>
        </div>
        <div className="income-expense-container">
          <div className="income">
            <h3>{dictionary.income}</h3>
            <p className="money-plus" data-testid="income-amount">+${income.toFixed(2)}</p>
          </div>
          <div className="expenses">
            <h3>{dictionary.expense}</h3>
            <p className="money-minus" data-testid="expense-amount">-${expenses.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;