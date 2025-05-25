import PayOS from '@payos/node';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PAYOS_CLIENT_ID', 'PAYOS_API_KEY', 'PAYOS_CHECKSUM_KEY', 'CLIENT_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

export const generatePaymentLink = async ({ amount, orderCode, description }) => {
  try {
    if (!amount || isNaN(amount)) throw new Error('Invalid amount');

    const paymentData = {
      amount: Number(amount),
      orderCode: Number(orderCode), 
      description: description || "Thanh toán vé xem phim",
      items: [{
        name: description || "Thanh toán vé xem phim",
        quantity: 1,
        price: Number(amount),
      }],
      cancelUrl: `${process.env.CLIENT_URL}/`,
      returnUrl: `${process.env.CLIENT_URL}/payment-success`,
    };

    console.log('Payment data:', paymentData);
    const paymentLinkRes = await payos.createPaymentLink(paymentData);
    return paymentLinkRes.checkoutUrl;
  } catch (error) {
    console.error('PayOS Error Details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    throw error;
  }
};
