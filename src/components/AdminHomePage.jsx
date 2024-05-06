import React, { useState, useEffect } from 'react';
import './AdminHome.css';

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [wattsUsedByUser, setWattsUsedByUser] = useState({});
  const [bills, setBills] = useState({}); // This will hold the bill amounts for users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setUsers(data);
        const initialWatts = {};
        data.forEach(user => {
          initialWatts[user.id] = '';
          // Initialize bills from local storage or set as null if not found or expired
          const storedBill = localStorage.getItem(`bill-${user.id}`);
          const billData = storedBill ? JSON.parse(storedBill) : null;
          if (billData && new Date(billData.expiry) > new Date()) {
            setBills(prev => ({ ...prev, [user.id]: billData.amount }));
          }
        });
        setWattsUsedByUser(initialWatts);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleGenerateBill = async (event, userId) => {
    event.preventDefault();
    const wattsUsed = wattsUsedByUser[userId];
    if (!wattsUsed) {
      alert('Please enter the watts used.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/admin/generate-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          wattsUsed
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Bill Generated: ₹${data.bill.billAmount}`);
        setBills({...bills, [userId]: data.bill.billAmount}); // Update the bill amount for the user
        // Store in local storage with an expiry of 28 days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 28);
        localStorage.setItem(`bill-${userId}`, JSON.stringify({ amount: data.bill.billAmount, expiry: expiryDate }));
      } else {
        alert('Failed to generate bill');
      }
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard: User List</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Electricity Board Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.electricityBoardNumber}</td>
              <td>{user.email}</td>
              <td>
                {bills[user.id] ? (
                  <label>Bill: ₹{bills[user.id]}</label>
                ) : (
                  <form onSubmit={(e) => handleGenerateBill(e, user.id)}>
                    <input type="number" required placeholder="Watts used" value={wattsUsedByUser[user.id] || ''} onChange={(e) => setWattsUsedByUser({...wattsUsedByUser, [user.id]: e.target.value})} />
                    <button type="submit">Generate Bill</button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHomePage;
