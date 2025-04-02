import promotion1 from "../../assets/img/promotions/promotion1.jpg";
import promotion2 from "../../assets/img/promotions/promotion2.jpg";
import promotion3 from "../../assets/img/promotions/promotion3.jpg";
import promotion4 from "../../assets/img/promotions/promotion4.jpg";
import promotion5 from "../../assets/img/promotions/promotion5.jpg";
import promotion6 from "../../assets/img/promotions/promotion6.jpg";
import promotion7 from "../../assets/img/promotions/promotion7.jpg";
import promotion8 from "../../assets/img/promotions/promotion8.jpg";

const PromotionsData = [
    {
        id: 1,
        title: "KHUYẾN MÃI HẤP DẪN",
        description:
            "Khám phá ngay hàng trăm lợi ích dành cho bạn trong chuyên mục Khuyến mãi & Ưu đãi hấp dẫn của MVB Cinema. Từ những chương trình giảm giá vé xem phim đến những combo bắp nước siêu tiết kiệm, chúng tôi luôn mang đến những ưu đãi tốt nhất cho bạn. Đừng bỏ lỡ cơ hội nhận những phần quà giá trị và các ưu đãi cực hấp dẫn mỗi ngày!"
        , isMain: true
    },
    {
        id: 2,
        img: promotion1,
        title: "Mua vé Deadpool & Wolverine - Ưu đãi 5%",
        description:
            "Đặt vé xem siêu phẩm Deadpool & Wolverine ngay hôm nay để nhận ngay ưu đãi giảm giá 5% cho lần đặt vé tiếp theo. Bộ phim hành động hoành tráng nhất năm nay đang chờ đón bạn với những cảnh quay mãn nhãn, nội dung hấp dẫn và sự kết hợp bùng nổ giữa hai siêu anh hùng nổi tiếng. Số lượng vé ưu đãi có hạn, hãy nhanh tay đặt ngay!"
    },
    {
        id: 3,
        img: promotion2,
        title: "Mua 1 vé xem phim tặng voucher 20K",
        description:
            "Đừng bỏ lỡ cơ hội nhận ngay một voucher trị giá 20K khi mua bất kỳ một vé xem phim nào tại MVB Cinema. Voucher có thể sử dụng cho lần mua vé tiếp theo hoặc áp dụng để giảm giá cho combo bắp nước, giúp bạn có trải nghiệm xem phim hoàn hảo hơn. Khuyến mãi này áp dụng cho tất cả các suất chiếu trong tuần!"
    },
    {
        id: 4,
        img: promotion3,
        title: "Giảm đến 15K khi thanh toán VNPay",
        description:
            "Nhanh tay tận hưởng ưu đãi giảm ngay 15K khi thanh toán vé xem phim qua VNPay. Chỉ cần thực hiện giao dịch đơn giản trên ứng dụng VNPay, bạn sẽ ngay lập tức nhận được khuyến mãi. Hãy thanh toán thông minh và tiết kiệm hơn mỗi ngày với ưu đãi đặc biệt này!"
    },
    {
        id: 5,
        img: promotion4,
        title: "Tặng bao lì xì Tết vui như ý",
        description:
            "Chào đón năm mới với chương trình khuyến mãi đặc biệt: Tặng bao lì xì may mắn khi đặt vé xem phim trong dịp Tết Nguyên Đán. Mỗi bao lì xì đều chứa những phần quà bất ngờ như voucher giảm giá, vé xem phim miễn phí hoặc quà tặng đặc biệt từ MVB Cinema. Chương trình diễn ra từ mùng 1 đến mùng 10 Tết, nhanh tay đặt vé ngay!"
    },
    {
        id: 6,
        img: promotion5,
        title: "Hạn mức nâng hạng thành viên 2023",
        description:
            "Chương trình tích điểm nâng hạng thành viên đã được cập nhật với nhiều quyền lợi hấp dẫn hơn! Khi đạt đủ số điểm theo từng hạng mức, bạn sẽ nhận ngay những ưu đãi độc quyền như giảm giá vé, miễn phí bắp nước, vé xem phim miễn phí hàng tháng, và nhiều phần quà hấp dẫn khác. Hãy kiểm tra điểm tích lũy của bạn ngay hôm nay!"
    },
    {
        id: 7,
        img: promotion6,
        title: "MUA VÉ XEM SUẤT CHIẾU SỚM CỦA NGƯỜI MẶT TRỜI",
        description:
            "Fan của bộ phim Người Mặt Trời ơi, hãy sẵn sàng! Đặt vé suất chiếu sớm ngay hôm nay để nhận quà tặng độc quyền. Số lượng quà có hạn và chỉ dành cho những khán giả nhanh tay đặt trước. Hãy là một trong những người đầu tiên thưởng thức bộ phim bom tấn này và nhận những phần quà cực kỳ hấp dẫn từ MVB Cinema!"
    },
    {
        id: 8,
        img: promotion7,
        title: "Giảm giá 30% khi mua combo bắp nước",
        description:
            "Xem phim mà không có bắp nước thì còn gì thú vị? Hãy tận hưởng combo bắp nước yêu thích của bạn với ưu đãi giảm giá lên đến 30%! Khuyến mãi áp dụng khi mua combo cùng vé xem phim tại rạp, giúp bạn vừa tiết kiệm vừa thưởng thức trọn vẹn bộ phim một cách hoàn hảo nhất. Nhanh tay đặt ngay vì chương trình chỉ diễn ra trong thời gian ngắn!"
    },
    {
        id: 9,
        img: promotion8,
        title: "Giảm giá 30% khi mua combo bắp nước",
        description:
            "Chương trình ưu đãi đặc biệt cho các tín đồ điện ảnh! Khi mua bất kỳ combo bắp nước nào tại rạp, bạn sẽ được giảm giá ngay 30%. Không có gì tuyệt vời hơn khi vừa nhâm nhi bắp rang bơ thơm ngon, vừa thưởng thức những bộ phim bom tấn với giá ưu đãi. Khuyến mãi chỉ áp dụng trong khung giờ vàng, hãy nhanh tay tận dụng cơ hội này!"
    },
];

export default PromotionsData;
