export type SeatStatus = "available" | "held" | "sold";

export type Seat = {
  id: string;
  deck: "lower" | "upper";
  row: number;
  col: number;
  status: SeatStatus;
};

export type Trip = {
  id: string;
  operator: string;
  from: string;
  to: string;
  departAt: string;
  arriveAt: string;
  duration: string;
  vehicle: string;
  seatsLeft: number;
  price: number;
  oldPrice?: number;
  amenities: string[];
  policy: string;
  image: string;
  pickup: string[];
  dropoff: string[];
  rating: number;
  reviews: number;
  tags: string[];
};

export const locations = ["TP. Hồ Chí Minh", "Vũng Liêm - Vĩnh Long", "Sài Gòn", "Đà Lạt", "Nha Trang", "Cần Thơ", "Phan Thiết", "Đà Nẵng"];

export const trips: Trip[] = [
  {
    id: "SG-DL-0720",
    operator: "An Tâm Express",
    from: "Sài Gòn",
    to: "Đà Lạt",
    departAt: "2026-09-14T07:20:00+07:00",
    arriveAt: "2026-09-14T13:45:00+07:00",
    duration: "6h 25m",
    vehicle: "Limousine 34 phòng",
    seatsLeft: 12,
    price: 320000,
    oldPrice: 360000,
    amenities: ["Wifi", "Rèm riêng", "Nước uống", "Sạc USB"],
    policy: "Hủy miễn phí trước 24 giờ, hủy hợp lệ tối thiểu 3 giờ trước giờ chạy.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
    pickup: ["Bến xe Miền Đông mới", "Ngã tư Thủ Đức", "Dĩ An"],
    dropoff: ["Bến xe liên tỉnh Đà Lạt", "Chợ Đà Lạt", "Hồ Xuân Hương"],
    rating: 4.8,
    reviews: 1240,
    tags: ["Còn ghế đẹp", "Đón tận điểm"],
  },
  {
    id: "SG-NT-0930",
    operator: "An Tâm Premium",
    from: "Sài Gòn",
    to: "Nha Trang",
    departAt: "2026-09-14T09:30:00+07:00",
    arriveAt: "2026-09-14T18:10:00+07:00",
    duration: "8h 40m",
    vehicle: "Giường nằm 40 chỗ",
    seatsLeft: 19,
    price: 280000,
    oldPrice: 315000,
    amenities: ["Điều hòa", "Chăn mỏng", "Wifi", "Bảo hiểm"],
    policy: "Hủy trước 3 giờ theo báo giá hoàn tiền từ hệ thống.",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=900&q=80",
    pickup: ["Văn phòng Quận 1", "Bến xe An Sương"],
    dropoff: ["Bến xe phía Nam Nha Trang", "Trần Phú"],
    rating: 4.6,
    reviews: 826,
    tags: ["Giá tốt", "Có trung chuyển"],
  },
  {
    id: "SG-CT-1815",
    operator: "An Tâm Shuttle",
    from: "Sài Gòn",
    to: "Cần Thơ",
    departAt: "2026-09-14T18:15:00+07:00",
    arriveAt: "2026-09-14T21:35:00+07:00",
    duration: "3h 20m",
    vehicle: "Ghế ngồi 29 chỗ",
    seatsLeft: 8,
    price: 165000,
    amenities: ["Ghế ngả", "Nước uống", "Xuất hóa đơn"],
    policy: "Đổi/hủy tại quầy hoặc tổng đài theo quyền nhân viên.",
    image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80",
    pickup: ["Bến xe Miền Tây", "Bình Tân"],
    dropoff: ["Bến xe Cần Thơ", "Ninh Kiều"],
    rating: 4.7,
    reviews: 542,
    tags: ["Chuyến tối", "Xuất hóa đơn"],
  },
  {
    id: "DN-SG-2100",
    operator: "An Tâm Night",
    from: "Đà Nẵng",
    to: "Sài Gòn",
    departAt: "2026-09-14T21:00:00+07:00",
    arriveAt: "2026-09-15T13:20:00+07:00",
    duration: "16h 20m",
    vehicle: "Cabin đôi 22 phòng",
    seatsLeft: 6,
    price: 620000,
    oldPrice: 690000,
    amenities: ["Cabin riêng", "Màn hình", "Wifi", "Đồ ăn nhẹ"],
    policy: "Giữ chỗ 10 phút, thanh toán online để nhận vé điện tử.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
    pickup: ["Bến xe Trung tâm Đà Nẵng", "Hòa Cầm"],
    dropoff: ["Bến xe Miền Đông mới", "Quận 1"],
    rating: 4.9,
    reviews: 318,
    tags: ["Cabin riêng", "Chuyến đêm"],
  },
];

export const popularRoutes = [
  { from: "Sài Gòn", to: "Đà Lạt", price: 320000, trips: 46, image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80" },
  { from: "Sài Gòn", to: "Nha Trang", price: 280000, trips: 32, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80" },
  { from: "Sài Gòn", to: "Cần Thơ", price: 165000, trips: 28, image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=700&q=80" },
  { from: "Đà Nẵng", to: "Sài Gòn", price: 620000, trips: 12, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=700&q=80" },
];

export const promotions = [
  { code: "ANTAM50", title: "Giảm 50K cho vé đầu tiên", description: "Áp dụng cho tài khoản mới và thanh toán online.", expires: "30/09/2026" },
  { code: "VNPAYBUS", title: "Hoàn 8% qua VNPAY", description: "Tối đa 60K, kiểm tra điều kiện tại bước thanh toán.", expires: "20/09/2026" },
  { code: "SHIP10", title: "Ưu đãi gửi hàng", description: "Giảm 10% phí vận đơn cùng tuyến xe khách.", expires: "15/10/2026" },
];

export const sampleTickets = [
  { code: "ATB240914A01", route: "Sài Gòn → Đà Lạt", seat: "A01", status: "Hợp lệ", refund: "Chưa yêu cầu", depart: "07:20 · 14/09/2026" },
  { code: "ATB240910B05", route: "Sài Gòn → Cần Thơ", seat: "B05", status: "Đã hủy", refund: "Đang hoàn tiền", depart: "18:15 · 10/09/2026" },
];

export const shipmentTimeline = [
  { label: "Tạo yêu cầu", description: "Khách khai báo hàng và tuyến gửi.", done: true },
  { label: "Nhân viên tiếp nhận", description: "Kiểm tra hàng, cân đo và xác nhận cước.", done: true },
  { label: "Đang vận chuyển", description: "Hàng đi cùng chuyến đã phân công.", done: false },
  { label: "Đã giao hàng", description: "Người nhận xác nhận và đóng vận đơn.", done: false },
];

export const adminTrips = [
  { code: "SG-DL-0720", route: "Sài Gòn → Đà Lạt", vehicle: "51B-12345", driver: "Trần Minh", status: "Sắp khởi hành", tickets: "22/34", revenue: 7040000 },
  { code: "SG-CT-1815", route: "Sài Gòn → Cần Thơ", vehicle: "65A-88991", driver: "Lê Hoàng", status: "Trễ 12 phút", tickets: "18/29", revenue: 2970000 },
  { code: "SG-NT-0930", route: "Sài Gòn → Nha Trang", vehicle: "79B-45678", driver: "Phạm Khoa", status: "Đang bán", tickets: "21/40", revenue: 5880000 },
  { code: "DN-SG-2100", route: "Đà Nẵng → Sài Gòn", vehicle: "43F-22222", driver: "Nguyễn Quốc", status: "Ít ghế", tickets: "16/22", revenue: 9920000 },
];

export const seatMap: Seat[] = Array.from({ length: 28 }, (_, index) => {
  const row = Math.floor(index / 4) + 1;
  const col = (index % 4) + 1;
  const id = `${index < 14 ? "A" : "B"}${String((index % 14) + 1).padStart(2, "0")}`;
  const sold = ["A03", "A08", "B02", "B11"].includes(id);
  const held = ["A12", "B05", "B06"].includes(id);

  return {
    id,
    deck: index < 14 ? "lower" : "upper",
    row,
    col,
    status: sold ? "sold" : held ? "held" : "available",
  };
});

export function getTrip(id: string) {
  return trips.find((trip) => trip.id === id) ?? trips[0];
}
