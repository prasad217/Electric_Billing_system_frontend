import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserHomePage = () => {
  const [billData, setBillData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

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
        // Payment successful, redirect to payment success page
        window.location.href = '/payment-success';
      } else {
        console.error('Failed to process payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      {billData ? (
        <div>
          <h3>Electricity Board Number: {billData.userId}</h3>
          <p>Watts Used: {billData.watts_used}</p>
          <p>Bill Amount: ${billData.bill_amount}</p>
          <p>Bill Generated Date: {billData.bill_generated_date}</p>
          <p>Bill Deadline Date: {billData.bill_deadline_date}</p>
          <button onClick={handlePay}>Pay Now</button>
        </div>
      ) : (
        <p>No bill data available</p>
      )}
    </div>
  );
};

export default UserHomePage;
