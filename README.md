# Personal Finance Tracker

A comprehensive personal finance management application built with React that allows users to track income, expenses, and manage budgets. This project showcases modern web development techniques, intro.js for interactive tutorials, and Cypress for end-to-end testing.

![Personal Finance Tracker](https://via.placeholder.com/800x400?text=Personal+Finance+Tracker)

## Features

- **Financial Dashboard**: Get a quick overview of your current balance, income, and expenses
- **Transaction Management**: Add and remove income and expense transactions with categories
- **Budget Tracking**: Set budget goals for different spending categories and track your progress
- **Data Persistence**: All your data is saved to your browser's local storage
- **Interactive Tour**: Guided tour using intro.js to help new users understand the application
- **Responsive Design**: Works on both desktop and mobile devices
- **End-to-End Testing**: Comprehensive test coverage with Cypress

## Technologies Used

- **React**: Frontend library for building the user interface
- **intro.js**: For creating step-by-step guided tours
- **Cypress**: For end-to-end testing
- **LocalStorage API**: For data persistence
- **CSS Grid/Flexbox**: For modern responsive layouts

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Running Cypress Tests

This project includes extensive Cypress tests that verify application functionality:

1. Start the application in one terminal:
   ```
   npm start
   ```

2. Open Cypress and run tests in another terminal:
   ```
   npx cypress open
   ```

3. In the Cypress UI, click on "E2E Testing", choose a browser, and run the finance-tracker.cy.js test file.

## Project Structure

- `src/components/` - React components for the application
- `src/App.js` - Main application component with routing and state management
- `cypress/e2e/` - Cypress end-to-end tests

## intro.js Implementation

This project showcases the use of intro.js for creating guided tours:

- First-time users automatically receive a tour of the application
- Users can restart the tour at any time by clicking the "Take a Tour" button
- The tour highlights key features of the application and explains how to use them
- Custom styling has been applied to the intro.js elements to match the application theme

## Cypress Testing

The project includes comprehensive Cypress tests that:

- Verify all main components render correctly
- Test adding and deleting transactions
- Validate financial calculations
- Test budget editing functionality
- Verify intro.js tour functionality
- Test responsive design elements

## License

MIT

## Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- Create React App for the initial project setup
- intro.js for the guided tour functionality
- Cypress team for the excellent testing tools
