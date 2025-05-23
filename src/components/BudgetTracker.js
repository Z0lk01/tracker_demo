import React, { useState, useEffect } from 'react';

function BudgetTracker({ transactions, dictionary }) {
  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem('budgets');
    return savedBudgets ? JSON.parse(savedBudgets) : {
      Housing: 1000,
      Food: 500,
      Transportation: 300,
      Utilities: 200,
      Entertainment: 150,
      Medical: 200,
      Other: 100
    };
  });
  
  const [editMode, setEditMode] = useState(false);
  const [tempBudgets, setTempBudgets] = useState({});
  
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);
  
  // Calculate spending by category
  const calculateSpending = () => {
    const spending = {};
    
    transactions.forEach(transaction => {
      if (transaction.amount < 0 && transaction.category) {
        if (!spending[transaction.category]) {
          spending[transaction.category] = 0;
        }
        spending[transaction.category] += Math.abs(transaction.amount);
      }
    });
    
    return spending;
  };
  
  const handleEditBudget = () => {
    if (editMode) {
      setBudgets(tempBudgets);
      setEditMode(false);
    } else {
      setTempBudgets({...budgets});
      setEditMode(true);
    }
  };
  
  const handleBudgetChange = (category, value) => {
    setTempBudgets({
      ...tempBudgets,
      [category]: parseFloat(value) || 0
    });
  };
  
  const spending = calculateSpending();
  
  return (
    <div className="budget-tracker" data-testid="budget-tracker">
      <div className="budget-header">
        <h3>{dictionary.budgetTracker}</h3>
        <button 
          className="edit-budget-btn" 
          onClick={handleEditBudget}
          data-testid="edit-budget-button"
        >
          {editMode ? dictionary.save : dictionary.edit}
        </button>
      </div>
      
      <div className="budget-list">
        {Object.keys(budgets).map(category => {
          const spent = spending[category] || 0;
          const budget = budgets[category];
          const percentage = (spent / budget) * 100;
          
          return (
            <div key={category} className="budget-item">
              <div className="budget-category">
                <span>{category}</span>
                {editMode ? (
                  <input
                    type="number"
                    value={tempBudgets[category]}
                    onChange={(e) => handleBudgetChange(category, e.target.value)}
                    className="budget-input"
                    data-testid={`${category.toLowerCase()}-budget-input`}
                  />
                ) : (
                  <span>${budget.toFixed(2)}</span>
                )}
              </div>
              
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: percentage > 100 ? '#e74c3c' : 
                                     percentage > 75 ? '#f39c12' : '#2ecc71'
                  }}
                  data-testid={`${category.toLowerCase()}-progress-bar`}
                ></div>
              </div>
              
              <div className="budget-details">
                <span>${spent.toFixed(2)} / ${budget.toFixed(2)}</span>
                <span>{percentage.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetTracker;