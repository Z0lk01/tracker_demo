import React, { useState } from 'react';

function AddTransaction({ addTransaction, dictionary }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  
  const categories = [
    'Housing', 'Food', 'Transportation', 'Utilities', 
    'Entertainment', 'Medical', 'Savings', 'Income', 'Other'
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!text || !amount) {
      alert('Please add a description and amount');
      return;
    }
    
    const newTransaction = {
      id: Math.floor(Math.random() * 10000000),
      text,
      amount: +amount,
      category,
      date: new Date().toISOString()
    };
    
    addTransaction(newTransaction);
    
    // Clear form
    setText('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="transaction-form">
      <h3>{dictionary.addTransaction}</h3>
      <form onSubmit={onSubmit} data-testid="transaction-form">
        <div className="form-control">
          <label htmlFor="description">{dictionary.description}</label>
          <input
            type="text"
            id="description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={dictionary.enterDescription}
            data-testid="description-input"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            {dictionary.amount} <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={dictionary.enterAmount}
            data-testid="amount-input"
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">{dictionary.category}</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data-testid="category-select"
          >
            <option value="">{dictionary.selectCategory}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button className="btn" data-testid="add-transaction-button">{dictionary.addTransaction}</button>
      </form>
    </div>
  );
}

export default AddTransaction;