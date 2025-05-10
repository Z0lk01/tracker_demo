import React, { useState, useEffect } from 'react';
import './App.css';
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import languageDictionary from './language';

// Component imports
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import BudgetTracker from './components/BudgetTracker';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [language, setLanguage] = useState('en'); // Default to English

  useEffect(() => {
    // Save transactions to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Calculate balance, income, and expenses
    let balance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += Math.abs(transaction.amount);
      }
      balance += transaction.amount;
    });
    
    setCurrentBalance(balance);
    setIncome(totalIncome);
    setExpenses(totalExpenses);
  }, [transactions]);
  
  // Add new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  
  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };
  
  // Start the intro.js tour
  const startTour = () => {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: '.dashboard',
          intro: 'This is your financial dashboard. It gives you an overview of your finances at a glance.'
        },
        {
          element: '.transaction-form',
          intro: 'Add your income and expenses here. Use positive numbers for income and negative for expenses.'
        },
        {
          element: '.transaction-list',
          intro: 'All your transactions are listed here. You can delete any transaction by clicking the X button.'
        },
        {
          element: '.budget-tracker',
          intro: 'Track your spending against your budget goals in different categories.'
        }
      ],
      showProgress: true,
      showBullets: true,
      exitOnOverlayClick: true,
      showStepNumbers: false
    });
    intro.start();
  };
  
  // Run the tour on first visit
  useEffect(() => {
    // Small delay to ensure components are rendered
      const timer = setTimeout(() => {
        startTour();
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'sk' : 'en'));
  };

  const currentLanguage = languageDictionary[language];

  return (
    <div className="App">
      <Header startTour={startTour} />
      <div className="container">
        <Dashboard 
          currentBalance={currentBalance}
          income={income}
          expenses={expenses}
        />
        <div className="content-wrapper">
          <div className="left-panel">
            <AddTransaction addTransaction={addTransaction} />
            <TransactionList 
              transactions={transactions} 
              deleteTransaction={deleteTransaction} 
            />
          </div>
          <div className="right-panel">
            <BudgetTracker transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
