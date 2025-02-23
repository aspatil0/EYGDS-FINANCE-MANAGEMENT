import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: "", amount: "" });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async () => {
    try {
      const response = await axios.post("http://localhost:5000/expenses", newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({ title: "", amount: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Expense Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addExpense} className="bg-blue-500 text-white p-2">Add Expense</button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} className="border p-2 mb-2 flex justify-between">
            <span>{expense.title} - ${expense.amount}</span>
            <button onClick={() => deleteExpense(expense._id)} className="bg-red-500 text-white p-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
