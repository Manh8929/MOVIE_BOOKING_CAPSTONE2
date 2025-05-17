import { generatePaymentLink } from '../services/paymentService';

export const createPaymentLink = async (req, res) => {
  try {
    const { amount, description } = req.body;

    const orderCode = Date.now(); 

    const checkoutUrl = await generatePaymentLink({ amount, orderCode, description });

    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
