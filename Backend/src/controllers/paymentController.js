// controllers/paymentController.js
import { createPaymentLinkService, updatePaymentStatusService } from '../services/paymentService.js';

export const createPaymentLink = async (req, res) => {
  try {
    const { user_id, amount, selectedSeats, showtime_id, description } = req.body;

    const result = await createPaymentLinkService({
      user_id,
      amount,
      selectedSeats,
      showtime_id,
      description,
    });

    return res.status(200).json({
      message: 'Tạo đơn thanh toán thành công',
      ...result,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { payment_id, status } = req.body;

    await updatePaymentStatusService({ payment_id, status });

    return res.status(200).json({ message: 'Cập nhật trạng thái thành công' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
