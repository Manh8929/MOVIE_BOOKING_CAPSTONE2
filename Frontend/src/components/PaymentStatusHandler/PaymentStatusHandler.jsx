import { useEffect } from "react";
import { updatePaymentStatus } from "../../services/paymentService"; 

const PaymentStatusHandler = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderCode = params.get("orderCode");
    const status = params.get("status");

    // Nếu có cả 2 tham số thì gọi API update
    if (orderCode && status) {
      const payload = {
        payment_id: orderCode,
        status: status.toUpperCase(), // PAID / CANCELLED / FAILED
      };

      updatePaymentStatus(payload)
        .then((res) => {
          console.log("Cập nhật trạng thái thành công:", res);
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật trạng thái thanh toán:", err);
        });
    }
  }, []);

  return null; // không render gì cả
};

export default PaymentStatusHandler;
