import React from 'react';

function TransactionList({ transactions, deleteTransaction }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul className="list" data-testid="transactions-list">
        {transactions.length === 0 ? (
          <li className="empty-message">No transactions yet. Add one above!</li>
        ) : (
          transactions.map(transaction => (
            <li 
              key={transaction.id}
              className={transaction.amount < 0 ? 'minus' : 'plus'}
              data-testid={`transaction-${transaction.id}`}
            >
              <div className="transaction-details">
                <div className="transaction-info">
                  <span className="transaction-text">{transaction.text}</span>
                  <span className="transaction-category">{transaction.category}</span>
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                </div>
                <div className="transaction-amount">
                  {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => deleteTransaction(transaction.id)}
                data-testid={`delete-btn-${transaction.id}`}
              >
                x
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TransactionList;