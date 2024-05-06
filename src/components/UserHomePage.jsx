import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UserHomePage.css';

const UserHomePage = () => {
  const [billData, setBillData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  console.log('User ID:', userId);

  useEffect(() => {
    if (userId) {
      fetchBill(userId);
    }
  }, [userId]);

  const fetchBill = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}/bill`);
      if (response.ok) {
        const billData = await response.json();
        console.log('Bill data:', billData);
        setBillData(billData);
      } else {
        console.error('Failed to fetch bill data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching bill data:', error);
    }
  };

  const handlePay = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        // Payment successful, update bill status
        setBillData(prevBillData => ({ ...prevBillData, payment_status: 'paid' }));
        // Redirect to payment success page
        window.location.href = '/payment-success';
      } else {
        console.error('Failed to process payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Home Page</h2>
      {billData ? (
        <div className="bill-container">
          <h3>Bill Details</h3>
          <p>Electricity Board Number: {billData.electricityBoardNumber}</p>
          <p>Watts Used: {billData.watts_used}</p>
          <p>Bill Amount: ${billData.bill_amount}</p>
          <p>Bill Generated Date: {billData.bill_generated_date.split('T')[0]}</p>
          <p>Bill Deadline Date: {billData.bill_deadline_date.split('T')[0]}</p>
          {billData.payment_status === 'paid' ? (
            <p>Payment Status: Paid</p>
          ) : (
            <button onClick={handlePay}>Pay Now</button>
          )}
        </div>
      ) : (
        <p>No bill data available</p>
      )}
    </div>
  );
};

export default UserHomePage;
