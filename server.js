const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Pesapal credentials
const CONSUMER_KEY = 'Q1ATkaBSW3eFROseiWV3vvynprNVT9s9';
const CONSUMER_SECRET = 'Lz3CKXB+GndwF4IQ8yvE5/O+m+Q=';
const ENVIRONMENT = 'testing'; // Change to 'live' for production

// Base URLs
const BASE_URL = ENVIRONMENT === 'live'
  ? 'https://pay.pesapal.com/v3'
  : 'https://cybqa.pesapal.com/v3';

// Get access token
async function getAccessToken() {
  try {
    const response = await axios.post(`${BASE_URL}/api/Auth/RequestToken`, {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET
    });
    return response.data.token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Submit order
async function submitOrder(orderData, token) {
  try {
    const response = await axios.post(`${BASE_URL}/api/Transactions/SubmitOrderRequest`, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}

// Initiate payment endpoint
app.post('/api/donate', async (req, res) => {
  try {
    const { name, email, phone, amount, message } = req.body;

    // Get access token
    const token = await getAccessToken();

    // Prepare order data
    const orderData = {
      id: `DON-${Date.now()}`,
      currency: 'UGX',
      amount: parseFloat(amount),
      description: `Donation to New Grace JS${message ? ' - ' + message : ''}`,
      callback_url: `${req.protocol}://${req.get('host')}/api/callback`,
      notification_id: `NOT-${Date.now()}`,
      billing_address: {
        email_address: email,
        phone_number: phone,
        country_code: 'UG',
        first_name: name.split(' ')[0],
        middle_name: '',
        last_name: name.split(' ').slice(1).join(' ') || '',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        zip_code: ''
      }
    };

    // Submit order
    const orderResponse = await submitOrder(orderData, token);

    res.json({
      success: true,
      redirect_url: orderResponse.redirect_url,
      order_tracking_id: orderResponse.order_tracking_id
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment initiation failed'
    });
  }
});

// Payment callback endpoint
app.get('/api/callback', (req, res) => {
  const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.query;

  // Here you would verify the payment status
  // For now, redirect to success page
  res.redirect(`/donate.html?status=success&tracking=${OrderTrackingId}`);
});

// IPN (Instant Payment Notification) endpoint
app.post('/api/ipn', (req, res) => {
  // Handle IPN notifications from Pesapal
  console.log('IPN received:', req.body);
  res.sendStatus(200);
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/donate.html to test donations`);
});