import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dash.css';


const Dashboard = () => {
      const [expenses, setExpenses] = useState([]);
      const [balance, setBalance] = useState(0);
  
      const handleAddExpense = (e) => {
          e.preventDefault();
          const category = document.getElementById("expense-category").value;
          let name = document.getElementById("expense-name").value.trim();
          const amount = parseFloat(document.getElementById("expense-amount").value);
          const type = document.getElementById("expense-type").value;
          const date = document.getElementById("expense-date").value;
  
          if (!name) {
              name = category;
          }
  
          if (isNaN(amount) || amount <= 0) {
              alert("Please enter a valid amount.");
              return;
          }
  
          const expense = { id: Date.now(), category, name, amount, type, date };
          setExpenses((prev) => [...prev, expense]);
          updateBalance([...expenses, expense]);
      };
  
      const updateBalance = (expensesList) => {
          const newBalance = expensesList.reduce(
              (acc, expense) => (expense.type === "Credit" ? acc + expense.amount : acc - expense.amount),
              0
          );
          setBalance(newBalance);
      };
  
      const handleGenerateExcel = () => {
          let table = document.querySelector(".expense-table table");
          let wb = XLSX.utils.table_to_book(table, { sheet: "Expenses" });
          XLSX.writeFile(wb, "Expense_Report.xlsx");
      };
  
      return (
          <div className='body'>
              <div className="balance">
                  Your Balance: <span id="currency-symbol">₹</span>
                  <span>{balance.toFixed(2)}</span>
              </div>
  
              <div className="expense-table">
                  <table>
                      <thead>
                          <tr>
                              <th>EXPENSES</th>
                              <th>MONEY IN/OUT</th>
                              <th>AMOUNT</th>
                              <th>TYPE</th>
                              <th>DATE</th>
                          </tr>
                      </thead>
                      <tbody>
                          {expenses.map((expense) => (
                              <tr key={expense.id}>
                                  <td>{expense.category}</td>
                                  <td>{expense.name}</td>
                                  <td>₹{expense.amount.toFixed(2)}</td>
                                  <td>{expense.type}</td>
                                  <td>{expense.date}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
              <br />
              <br />
             
  



              <form onSubmit={handleAddExpense}>
                  <input type="number" id="expense-amount" placeholder="Amount" required />
                  <select id="currency-selector">
                <option value="INR" selected>₹ (INR)</option>
                
            </select>
                  <select id="expense-category" required>
                      <option value="" disabled selected>Select Category</option>
                      <option value="COLLEGE">COLLEGE</option>
                      <option value="Drinks">Drinks</option>
                      <option value="Travel">Travel</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Others">Others</option>
                  </select>
                  <input type="text" id="expense-name" placeholder="In \ Out" />
                  <select id="expense-type" required>
                      <option value="" disabled selected>Select Type</option>
                      <option value="Credit">Credit</option>
                      <option value="Debit">Debit</option>
                  </select>
                  <input type="date" id="expense-date" required />
                  <button type="submit">+ Add Expense</button>
              </form>
  
              
              <button  id="generate-excel"  onClick={handleGenerateExcel}>Generate Excel</button>
          </div>
      );
  };
  

  

export default Dashboard;