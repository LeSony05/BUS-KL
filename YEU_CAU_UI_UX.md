# Thiết kế UI UX và yêu cầu frontend website đặt vé xe

Ngày lập: 12/09/2026. Nguồn nghiệp vụ: **NghiepVu(2).docx** do người dùng cung cấp. Công nghệ yêu cầu: **Next.js App Router, TypeScript (.tsx), Tailwind CSS**.

Tài liệu này chuyển 14 nhóm chức năng người dùng và 6 nhóm chức năng quản trị thành màn hình, hành vi UX, quy tắc triển khai và tiêu chí nghiệm thu. Đây là đặc tả mục tiêu; bộ source đi kèm là nền tảng để phát triển, không phải toàn bộ hệ thống đã hoàn thành.

## 1. Phạm vi và quyết định thiết kế

Thiết kế gồm website khách hàng và khu vực làm việc của nhân viên trong cùng một project Next.js. Hai khu vực dùng layout và điều hướng riêng, chia sẻ các thành phần UI cơ bản. Cấu trúc theo feature giúp mỗi thành viên phát triển một nhóm chức năng mà không dồn mọi logic vào page.tsx.

Tên **An Tâm Bus** là tên minh họa, không phải thương hiệu có trong tài liệu nguồn. Dùng phong cách sáng, xanh dương, thông tin chuyến và giá vé nổi bật. Trên mobile, ưu tiên tìm chuyến, chọn ghế và thanh toán; các dịch vụ phụ nằm sau luồng đặt vé.

### 1.1 Những nội dung giữ nguyên theo file hiện tại

- Đăng ký gồm họ tên, số điện thoại, email, mật khẩu; có OTP qua số điện thoại hoặc email.
- Đăng nhập bằng số điện thoại hoặc email và mật khẩu. Không tự thêm đăng nhập Zalo/Google.
- Khách vãng lai được đặt, tra cứu, hủy vé và nhận thông báo; không tích điểm, không có lịch sử hồ sơ lâu dài.
- Chọn điểm đón và điểm trả là một phần của đặt vé.
- Ghế được tạm giữ 10 phút; quá hạn chưa thanh toán thì mở lại ghế.
- Chỉ hủy khi còn ít nhất 3 giờ trước khởi hành và vé có trạng thái hợp lệ.
- Cổng thanh toán: MoMo, VNPAY, ZaloPay.
- Có gửi hàng, chat bot chuyển nhân viên, VI–EN, đánh giá, thông báo và tích điểm.
- File có đề cập vé khứ hồi trong phần hủy; cần thiết kế hỗ trợ từng lượt nhưng chưa đủ quy tắc để triển khai toàn bộ.
- File có thông tin nhà xe trong tìm kiếm và báo cáo; chưa đủ cơ sở xác định hệ thống một hay nhiều nhà xe.

### 1.2 Điểm cần chốt trước khi triển khai nghiệp vụ thật

| Vấn đề | Nội dung cần chốt | Cách xử lý trong thiết kế |
| --- | --- | --- |
| Một hay nhiều nhà xe | Có nhà xe độc lập và tài khoản quản lý riêng không? | Tạm thiết kế cho một đơn vị vận hành; để model mở rộng operatorId; chưa thêm cổng đối tác |
| Khứ hồi | Có bán khứ hồi không, thanh toán chung hay riêng, hủy một lượt có ảnh hưởng ưu đãi? | Đặc tả tùy chọn khứ hồi; source mẫu chỉ một chiều; không bỏ nội dung nguồn |
| Đổi vé | Hạn đổi, phí, chênh lệch, trạng thái được đổi | Chỉ nhân viên có thao tác theo nguồn; chưa mở tự đổi cho khách |
| Tra cứu | Mục 7 cho phép mã hoặc số điện thoại, mục 3/13 dùng mã + số điện thoại | Đề xuất thống nhất mã + số điện thoại, xác thực bổ sung khi xem dữ liệu nhạy cảm |
| OTP và khóa tạm | Độ dài, thời hạn, số lần gửi/thử, thời gian khóa | Lấy chính sách từ backend; không tự đặt số |
| Phí hủy | Biểu phí, cách làm tròn, hoàn phần giảm giá/điểm | API trả báo giá hủy; UI không tự suy tính |
| Tích điểm | Tỷ lệ, mốc hạng, hết hạn, các quyền lợi | Cấu hình nghiệp vụ; chỉ cộng sau chuyến hoàn tất |
| Gửi hàng | Đơn vị tính, bảng cước, danh mục cấm, hoàn tiền | Chưa tự đặt mức phí; nhân viên tiếp nhận theo quy trình được duyệt |
| Nhân viên vận hành | Ai có quyền đổi xe/hủy chuyến? | Cấp permission cụ thể; không tự tạo vai trò mới |
| Tài xế | Có đăng nhập web hay chỉ hồ sơ phân công? | Chưa có UI tài xế, quét vé hoặc check-in vì nguồn chưa yêu cầu |

Các bổ sung dưới đây có nhãn **đề xuất** khi không phải quy định đã được nguồn xác nhận.

## 2. Actor và phân quyền giao diện

Ma trận dưới đây là **đề xuất triển khai quyền tối thiểu**. Nguồn nêu admin, nhân viên bán vé, CSKH, kế toán; quyền chi tiết cần được admin cấu hình. Ẩn menu không thay thế kiểm tra quyền ở backend.

| Khu vực / thao tác | Vãng lai | Khách có tài khoản | Bán vé | CSKH | Kế toán | Admin |
| --- | --- | --- | --- | --- | --- | --- |
| Tìm chuyến, đặt vé | Có | Có | Thay khách | Chỉ hỗ trợ | Không mặc định | Có |
| Xem và hủy vé | Vé đã xác minh | Vé của mình | Theo quyền | Tra cứu theo quyền | Không mặc định | Có |
| Đổi vé | Không | Không tự đổi | Theo quyền | Chuyển yêu cầu | Không | Có |
| Điểm, hạng, lịch sử | Không | Của mình | Không mặc định | Không mặc định | Không | Theo quyền |
| Gửi hàng | Có | Có | Khi được giao | Hỗ trợ | Không mặc định | Có |
| Chat | Có | Có | Không mặc định | Nhận hội thoại | Không | Có |
| Tuyến, xe, chuyến | Xem thông tin công khai | Xem thông tin công khai | Xem theo quyền | Xem theo quyền | Không mặc định | Quản lý |
| Doanh thu, xuất báo cáo | Không | Không | Không mặc định | Không | Theo quyền | Có |
| Người dùng và phân quyền | Không | Không | Không | Không | Không | Có |

Tài xế là thông tin được gán vào chuyến. Không mặc định mọi hồ sơ nhân viên đều phải có một khu vực đăng nhập.

## 3. Kiến trúc thông tin và điều hướng

### 3.1 Website khách hàng

Header desktop: logo về trang chủ, Đặt vé, Tra cứu vé, Gửi hàng, Hỗ trợ, VI/EN, Đăng nhập hoặc menu tài khoản. Khi đã đăng nhập, bổ sung chuông thông báo và menu hồ sơ. Không đặt toàn bộ 14 chức năng ngang hàng trên header.

Mobile: logo và menu thu gọn; ô tìm chuyến là nội dung ưu tiên. Trong luồng đặt vé, thay header đầy đủ bằng nút quay lại và thanh tiến trình. Thanh tổng tiền cố định đáy chỉ xuất hiện khi cần tiếp tục một bước, có khoảng đệm tránh che nội dung và bàn phím.

Footer: chính sách đặt/hủy/hoàn tiền, hỗ trợ, thông tin đơn vị vận hành; chỉ dùng thông tin liên hệ được cung cấp, không tự bịa hotline.

### 3.2 Danh mục trang và URL mục tiêu

| Nhóm | URL | Nội dung chính |
| --- | --- | --- |
| Công khai | `/` | Tìm chuyến, lối vào tra cứu và gửi hàng |
| Công khai | `/tim-chuyen?from=...&to=...&date=...` | Kết quả, lọc và sắp xếp |
| Công khai | `/chuyen-xe/[tripId]` | Chi tiết, điểm dừng, chính sách, đánh giá, chọn ghế |
| Đặt vé | `/dat-ve/[bookingId]/hanh-khach` | Hành khách và đón/trả |
| Đặt vé | `/dat-ve/[bookingId]/thanh-toan` | Mã giảm giá, tổng tiền, chọn cổng |
| Đặt vé | `/dat-ve/[bookingId]/ket-qua` | Chờ xác nhận hoặc kết quả từ server |
| Công khai | `/tra-cuu-ve` | Xác minh vé của khách vãng lai |
| Công khai | `/gui-hang` | Khai báo hàng, báo giá, gửi yêu cầu |
| Công khai | `/tra-cuu-van-don` | Theo dõi vận đơn |
| Công khai | `/ho-tro` | FAQ và chat |
| Xác thực | `/dang-nhap`, `/dang-ky`, `/xac-thuc-otp` | Luồng xác thực |
| Tài khoản | `/tai-khoan` | Hồ sơ, ngôn ngữ |
| Tài khoản | `/tai-khoan/ve-cua-toi` | Vé sắp đi và lịch sử |
| Tài khoản | `/tai-khoan/ve-cua-toi/[ticketId]` | Vé, hóa đơn, hủy và đánh giá đủ điều kiện |
| Tài khoản | `/tai-khoan/diem-thuong` | Điểm, hạng, lịch sử |
| Tài khoản | `/tai-khoan/thong-bao` | Thông báo và trạng thái đã đọc |
| Nội bộ | `/admin` | Tổng quan vận hành |
| Nội bộ | `/admin/chuyen-xe`, `/admin/tuyen-xe`, `/admin/xe` | Chuyến cụ thể, tuyến mẫu, xe vật lý |
| Nội bộ | `/admin/ve`, `/admin/hang-hoa` | Vé và vận đơn |
| Nội bộ | `/admin/nhan-vien`, `/admin/khach-hang` | Hồ sơ và trạng thái |
| Nội bộ | `/admin/khuyen-mai`, `/admin/danh-gia` | Ưu đãi và kiểm duyệt |
| Nội bộ | `/admin/ho-tro`, `/admin/bao-cao`, `/admin/phan-quyen` | Hội thoại, báo cáo, quyền |

Route group `(public)`, `(auth)`, `(booking)`, `(account)`, `(admin)` chỉ tổ chức code/layout, không xuất hiện trên URL. `/admin` là segment thật để có đường dẫn quản trị.

## 4. Thiết kế màn hình và tiêu chí UX

### 4.1 Trang chủ

Thứ tự khối: header → tiêu đề định hướng → form tìm chuyến → lối tắt tra cứu/gửi hàng → nội dung tuyến/ưu đãi khi có dữ liệu → footer. Không để carousel lớn đẩy form xuống quá sâu.

Form mục tiêu: điểm đi, điểm đến, nút đổi chiều, ngày đi, số vé; thêm một chiều/khứ hồi và ngày về sau khi chốt phạm vi. Điểm đi/đến dùng combobox có tìm kiếm; gợi ý từ danh mục thật, không cho chọn cùng một điểm. Ngày theo múi giờ Việt Nam; không cho tìm ngày đã qua. Khi lỗi giữ lại các giá trị đã nhập và focus vào trường sai đầu tiên. Nhấn Tìm chuyến đưa tiêu chí không nhạy cảm lên query string để refresh và chia sẻ kết quả.

### 4.2 Kết quả tìm chuyến

Desktop: vùng tiêu chí tìm kiếm ở trên, bộ lọc rộng khoảng 240–280px ở trái, danh sách chuyến ở phải. Mobile: bộ lọc trong panel mở theo nút có số bộ lọc đang áp dụng; sắp xếp ngay trên danh sách.

Trip card có nhà xe nếu áp dụng, loại xe, giờ đi/đến, thời lượng dự kiến, bến/điểm đón trả, ghế trống và giá mỗi vé. Hiển thị ngày đến khi qua ngày. CTA chính “Chọn chuyến”; chi tiết chính sách/điểm dừng là hành động phụ. Không ghi “giá cuối” nếu còn phí chưa tính.

Bộ lọc: giá, khung giờ, loại xe. Sắp xếp: giá tăng dần, giờ sớm nhất. Không có kết quả: giữ tiêu chí, cho xóa bộ lọc, gợi ý ngày gần nhất dựa trên dữ liệu thật. Lỗi API có nút thử lại; loading dùng skeleton cùng kích thước card. Không nhầm lỗi tải dữ liệu với “không có chuyến”.

### 4.3 Chi tiết chuyến và sơ đồ ghế

Bố cục desktop 2 cột: thông tin/sơ đồ 2 phần, tóm tắt đơn 1 phần. Mobile xếp dọc, giá và CTA ở đáy. Các tab nếu có: Ghế, Điểm đón trả, Chính sách, Đánh giá.

Ghế lấy từ cấu hình xe: ID, tầng, hàng/cột, trạng thái. Có lối đi và nhãn tầng; không dùng một grid cố định cho tất cả xe. Bốn trạng thái: còn trống, đang chọn, đang được giữ, đã bán. Dùng chữ/ký hiệu và aria-label cùng màu. Ghế không khả dụng phải disabled. Người dùng có thể bỏ chọn và nhìn thấy tổng tiền thay đổi.

Việc click ghế chỉ thay đổi lựa chọn cục bộ. Nhấn “Tiếp tục” mới yêu cầu API tạo giữ chỗ nguyên tử. Nếu xung đột, chỉ rõ ghế hết chỗ, cập nhật sơ đồ và giữ các thông tin còn hợp lệ. Không chuyển bước khi API giữ ghế thất bại.

### 4.4 Thông tin hành khách

Tiến trình: Chọn chuyến/ghế → Hành khách → Thanh toán → Nhận vé. Đề xuất form gồm thông tin người liên hệ và thông tin hành khách từng ghế nếu nhà xe cần; nguồn chưa xác định mỗi ghế có một người riêng hay dùng chung thông tin liên hệ.

Bắt buộc theo luồng vãng lai: họ tên, điện thoại, email nhận vé, điểm đón, điểm trả. Tài khoản đăng nhập được điền sẵn nhưng có thể kiểm tra/sửa thông tin cho lần đặt này. Điểm đón/trả là danh sách thuộc chuyến, hiển thị địa chỉ và giờ dự kiến; không dùng ô nhập tự do gây nhầm địa điểm.

Có link “Đăng nhập để tích điểm”, nhưng không chặn khách đặt nhanh. Không tự tạo tài khoản cho khách vãng lai. Thông báo rõ không tích điểm khi đặt không đăng nhập.

Đồng hồ dùng `expiresAt` do server trả, hiển thị nhất quán giữa các bước. Refresh không cấp thêm 10 phút. Khi hết hạn: ngăn thanh toán mới, thông báo hết giữ chỗ, cho tìm/chọn lại chuyến. Không lấy đồng hồ trình duyệt làm bằng chứng ghế còn được giữ.

### 4.5 Thanh toán và mã giảm giá

Cột chính: thông tin chuyến/hành khách có link sửa, mã khuyến mãi, lựa chọn MoMo/VNPAY/ZaloPay. Cột tóm tắt: số vé × đơn giá, phí nếu có, giảm giá, tổng thanh toán và thời gian còn lại. Số tiền phải khớp báo giá backend.

Mã giảm giá có trạng thái chưa áp dụng, đang kiểm tra, hợp lệ, hết hạn, hết lượt, không đúng điều kiện. Cho bỏ mã. Không trừ lượt ngay khi nhập; chỉ ghi nhận khi thanh toán thành công theo nguồn.

CTA “Thanh toán …đ” hiển thị số tiền rõ ràng; disable khi đang tạo giao dịch để hạn chế bấm lặp. Backend cần idempotency, không chỉ dựa vào disable nút. Chuyển tới cổng hoặc hiển thị QR từ API, không tự tạo QR ngân hàng giả.

Trang kết quả tách: đang xác nhận, thành công, thất bại, hết hạn. Không đọc `?success=true` để cấp vé. Nếu người dùng đóng tab ví hoặc callback chậm, đọc trạng thái backend; chỉ đề nghị đặt lại sau khi trạng thái được đối soát. Giao dịch thất bại/hết hạn mở ghế theo nguồn; thanh toán đến muộn cần backend xử lý xung đột và hoàn/đối soát, không tự cấp lại ghế.

### 4.6 Vé, tra cứu và hóa đơn

Form tra cứu đề xuất: mã vé/mã đơn + điện thoại đặt vé. Dùng POST, không đưa số điện thoại, OTP, email hoặc token tra cứu vào URL. Không cho dò hàng loạt chỉ bằng số điện thoại. Backend giới hạn tần suất; bổ sung OTP hoặc token truy cập ngắn hạn để xem đầy đủ/hủy vé nếu chính sách yêu cầu.

Kết quả có mã vé/QR, trạng thái vé, tuyến, thời gian, ghế, điểm đón/trả, hành khách và số tiền. CTA theo trạng thái: tải hóa đơn, gửi lại vé tới địa chỉ đã xác minh, yêu cầu hủy. Không cho nhập email tùy ý để gửi vé của người khác. QR vé cần dữ liệu do backend cấp.

Không tìm thấy dùng thông báo trung tính; chưa hiển thị tên hoặc điện thoại khi xác minh chưa đạt. Tải PDF/gửi lại email có trạng thái loading, thành công/thất bại riêng, không làm mất màn hình vé.

### 4.7 Hủy vé

Nút “Hủy vé” chỉ khả dụng theo `canCancel` từ API; nếu không đủ điều kiện vẫn giải thích lý do. Điều kiện nguồn: chưa dùng, chưa hủy, còn hiệu lực và còn **ít nhất 3 giờ** trước giờ chạy. Đúng 3 giờ được xét hợp lệ về thời gian; backend kiểm tra lại thời điểm xác nhận.

Trang/panel xác nhận: vé/lượt được hủy, tiền vé, phí hủy, số tiền hoàn, phương thức nhận hoàn và lưu ý thời gian xử lý. CTA “Xác nhận hủy vé”, hành động phụ “Giữ vé”. Đóng panel không được thực hiện hủy. Không dùng thông báo xác nhận mơ hồ chỉ có “OK”.

Sau thành công: vé chuyển đã hủy, ghế được mở và hiển thị hoàn tiền đang xử lý. **Đã hủy không đồng nghĩa đã hoàn tiền.** Tách refundStatus. Nếu lệnh lặp, backend không hoàn tiền lần hai.

Khứ hồi: chọn lượt đi/lượt về riêng; đánh giá hạn 3 giờ theo từng lượt, không lấy giờ lượt đi áp cho cả đơn. Phí/phân bổ giảm giá phải được chốt trước khi triển khai.

### 4.8 Tài khoản và OTP

Đăng ký: mỗi trường có label, lỗi tại chỗ, giữ dữ liệu hợp lệ; có hiển thị/ẩn mật khẩu, hỗ trợ password manager. OTP cho phép dán toàn bộ mã, thông báo thời hạn và gửi lại từ chính sách API; không tự ghi 6 số/5 phút khi nguồn chưa xác định.

Đăng nhập dùng một trường điện thoại/email và mật khẩu; lỗi thông tin xác thực chung, không tiết lộ tài khoản có tồn tại. Khóa tạm hiển thị thời gian thử lại do server cấp. Redirect sau đăng nhập chỉ tới URL nội bộ hợp lệ. Quên mật khẩu là **đề xuất bổ sung**, chưa nằm trong route scaffold để tránh coi là nghiệp vụ đã duyệt.

Tài khoản có hồ sơ, vé, điểm, thông báo. Hồ sơ không tự liên kết vé vãng lai chỉ vì trùng email/điện thoại; cần quy trình xác minh nếu muốn bổ sung sau.

### 4.9 Gửi hàng và vận đơn

Luồng mục tiêu: nhập hàng + tuyến + người gửi/nhận → kiểm tra điều kiện → báo giá → xác nhận/thanh toán → mã vận đơn → tiếp nhận và theo dõi. Các trường khối lượng/kích thước ghi đơn vị; giá trị phải dương. Hàng cấm/hạn chế báo lý do trước bước thanh toán.

Bảng giá chi tiết từ server. Không coi thanh toán thành công là kiện hàng đã được nhân viên nhận. Timeline vận đơn phân biệt tạo đơn, tiếp nhận, vận chuyển, giao hàng; danh sách trạng thái cuối cùng cần nghiệp vụ xác nhận. Tra cứu công khai chỉ trả thông tin cần thiết, che thông tin liên hệ.

### 4.10 Chat hỗ trợ

Nút hỗ trợ không đè CTA thanh toán trên mobile. Panel chat hiển thị đang nói chuyện với bot hay nhân viên, trạng thái kết nối và hàng đợi. Khi chuyển người thật, giữ hội thoại để khách không phải nhập lại câu hỏi. Tin đang gửi/thất bại có trạng thái riêng và nút thử lại; tránh gửi trùng khi reconnect.

Khu vực CSKH: danh sách hội thoại → hội thoại đang chọn → thông tin liên quan trong phạm vi quyền. Khi không có nhân viên online, hiển thị cách để lại yêu cầu; không cam kết thời gian trả lời chưa được quy định.

### 4.11 Ngôn ngữ Việt Anh

Yêu cầu mục tiêu: dịch menu, label, lỗi, trạng thái, chính sách và nội dung giao dịch; email/hóa đơn do backend nhận locale. Cập nhật thuộc tính `lang`, format ngày và tiền bằng Intl; không đổi đơn vị tiền khi chỉ đổi ngôn ngữ.

Đề xuất lưu locale vào cookie và hồ sơ khi đăng nhập để SSR đúng ngôn ngữ. URL giữ ổn định cho phiên bản nội bộ/đồ án; nếu cần SEO song ngữ thì bổ sung `[locale]` và redirect trước khi triển khai, không trộn hai chiến lược nửa chừng. Source hiện chỉ có tiếng Việt, chưa bật nút EN giả.

### 4.12 Đánh giá, thông báo và điểm

Đánh giá chỉ mở sau khi chuyến kết thúc thực tế và vé đủ điều kiện. Form 1–5 sao có nhãn chữ, nhận xét; server kiểm tra quyền và chống gửi trùng. Hiển thị điểm trung bình kèm số đánh giá, không bịa điểm khi chưa có dữ liệu. Admin phản hồi/ẩn bài có lý do, không sửa nội dung của khách.

Thông báo gồm nhắc chuyến trước 1–2 giờ, trễ chuyến, đổi xe và hủy chuyến. Item có nội dung, thời gian, trạng thái đã đọc và link tới vé. Không đưa thông báo khẩn vào banner quảng cáo. Cron/SMS/email chạy backend; mở website không phải điều kiện để gửi nhắc.

Điểm thưởng hiển thị điểm hiện có, hạng, mốc tiếp theo và lịch sử cộng/trừ. Chỉ cộng sau hoàn tất chuyến; khách vãng lai không tích. Tỷ lệ/hạng theo cấu hình, không mã hóa cứng các ví dụ đồng/bạc/vàng/kim cương thành chính sách chính thức.

## 5. Khu vực quản trị và nhân viên

Desktop dùng sidebar khoảng 240px, topbar tiêu đề/người dùng, breadcrumb khi có trang chi tiết. Mobile chuyển sidebar thành menu và chỉ giữ các trường quan trọng của bảng; dữ liệu rộng có vùng cuộn riêng. Một trang một CTA chính; tác vụ phá hủy đặt trong menu phụ và phải xác nhận rõ đối tượng.

| Module | Bố cục và trường chính | Thao tác và ngoại lệ |
| --- | --- | --- |
| Tổng quan | Bộ lọc ngày; doanh thu thuần, vé, chuyến, cảnh báo | Không có dữ liệu hiển thị trạng thái trống, không tạo số mẫu trong production |
| Chuyến | Ngày, tuyến, xe, tài xế, giờ, giá, trạng thái | Tạo/sửa, cảnh báo trùng xe/tài xế, đổi xe/trễ/hủy kèm lý do và số khách bị ảnh hưởng |
| Tuyến | Điểm đầu/cuối, điểm dừng, thời gian/khoảng cách | Không gộp tuyến mẫu với chuyến theo giờ; chặn xóa khi đang được sử dụng theo API |
| Xe | Biển số, loại, ghế, sơ đồ | Kiểm tra sơ đồ phù hợp; đổi xe không được tự làm mất mapping ghế đã bán |
| Vé | Mã, chuyến, người liên hệ đã che bớt, ghế, tiền, trạng thái | Đặt/hủy/đổi thay khách theo quyền; xuất danh sách hành khách; mọi chỉnh sửa có nhật ký |
| Hàng hóa | Mã vận đơn, tuyến, loại hàng, trạng thái | Đây là màn hình đề xuất để phục vụ nhân viên tiếp nhận được nguồn nhắc tới |
| Khách hàng | Tên, liên hệ, trạng thái, ngày tạo | Xem, khóa/mở kèm lý do; không tự xóa lịch sử giao dịch |
| Nhân viên | Tên, liên hệ, vai trò, trạng thái | Thêm/sửa/gán vai trò; hồ sơ tài xế gắn với chuyến |
| Khuyến mãi | Mã, kiểu giảm, giá trị, thời hạn, lượt, phạm vi | Validate ngày và điều kiện; ngừng áp dụng khác với xóa dữ liệu lịch sử |
| Hội thoại | Hàng đợi, trạng thái bot/người, thời gian chờ | Nhận/trả lời/kết thúc hội thoại; xử lý offline |
| Đánh giá | Chuyến, số sao, nội dung, trạng thái | Phản hồi và ẩn nội dung vi phạm, có lịch sử |
| Phân quyền | Vai trò × module × thao tác | Hiển thị thay đổi trước lưu; backend chặn tự nâng quyền trái phép |
| Báo cáo | Ngày/tháng/quý; tuyến, nhà xe nếu có, cổng | Bảng + biểu đồ + Excel/PDF; tách giảm giá/hoàn tiền, timezone và kỳ báo cáo |

Đổi vé nên dùng một quy trình riêng: xác minh vé cũ → chọn chuyến/ghế mới → báo chênh lệch/phí → xác nhận → đối soát. Không sửa trực tiếp tripId trên bảng; cần quy tắc giữ chỗ và giao dịch nguyên tử được backend hỗ trợ. Nguồn chưa định nghĩa chi tiết nên chưa triển khai.

## 6. Design system

| Thành phần | Quy định thiết kế |
| --- | --- |
| Màu chính | Xanh #1D4ED8; hover #1E40AF; nền nhẹ #EFF6FF |
| Chữ/nền | Chữ #0F172A; phụ #475569; nền trang #F8FAFC; card trắng |
| Trạng thái | Thành công xanh lá, chờ hổ phách, lỗi đỏ; luôn có nhãn chữ |
| Typography | Font sans hỗ trợ tiếng Việt; body 16px; label 14px; tiêu đề 24–40px, hero tối đa 60px |
| Spacing | Thang 4/8/12/16/24/32/48px; container max 1152px |
| Card | Bo 16px, border nhẹ; chỉ dùng shadow mạnh ở khối cần ưu tiên |
| Control | Cao tối thiểu 44px, mẫu sử dụng 48px; label ngoài input |
| Button | Primary cho tiếp tục/xác nhận, secondary cho quay lại; destructive cho hủy |
| Breakpoint | Mobile <768px, tablet 768–1023px, desktop ≥1024px; kiểm tra 375/768/1440px |
| Form | Required hiển thị rõ; lỗi sát trường, không chỉ toast; aria-describedby khi có lỗi |
| Dialog | Có tiêu đề, focus trap, Esc để đóng khi an toàn, trả focus về nút mở |
| Table | Header rõ, sorting có nhãn, phân trang server, trạng thái trống và lỗi riêng |

Component dùng chung mục tiêu: Button, Input, Select/Combobox, Badge, Dialog, Toast, Skeleton, EmptyState, Pagination, DataTable. Component nghiệp vụ: SearchForm, TripCard, SeatMap, BookingSummary, HoldCountdown, PassengerForm, VoucherInput, PaymentMethodPicker, TicketCard, CancelTicketDialog, ShipmentTimeline, ChatWindow.

Không trừu tượng hóa mọi thứ ngay từ đầu: scaffold hiện chỉ tạo component đã dùng. Khi có 2–3 màn hình lặp pattern mới tách thêm UI primitive, tránh thư mục trống hàng loạt.

## 7. State, bảo mật dữ liệu và tích hợp backend

### 7.1 Phân loại trạng thái

| Trạng thái | Nơi lưu | Ví dụ |
| --- | --- | --- |
| Tiêu chí tìm kiếm | URL query | Điểm đi/đến, ngày, lọc/sort |
| UI tạm | React useState | Mở panel, ghế đang chọn chưa giữ |
| Form | Form state; cân nhắc React Hook Form + Zod khi mở rộng | Hành khách, OTP |
| Dữ liệu từ server | Server Component hoặc thư viện query nếu cần refetch | Chuyến, vé, hạng điểm |
| Giao dịch | Backend là nguồn sự thật | Ghế giữ, expiresAt, giá, paymentStatus |
| Phiên đăng nhập | Cookie HttpOnly/Secure theo backend | Không đặt access token trong localStorage |

Không giữ điện thoại/email trên URL. Không cache công khai nội dung tài khoản, QR vé hoặc hóa đơn. Kiểm tra quyền ở mọi API theo tài nguyên cụ thể, không chỉ role tổng quát. Tổng tiền, giá vé, phí hủy và quyền nhận điểm đều do server quyết định.

### 7.2 Hợp đồng API đề xuất, chưa có backend triển khai

| API | Input chính | Output / lỗi cần UI xử lý |
| --- | --- | --- |
| `GET /trips` | from, to, date, filters, page | items, total; empty hoặc lỗi tải |
| `GET /trips/:id/seats` | tripId | sơ đồ và trạng thái hiện tại |
| `POST /bookings/hold` | tripId, seatIds, idempotency key | bookingId, expiresAt, serverTime, quote; 409 ghế xung đột |
| `PATCH /bookings/:id/passenger` | người liên hệ, đón/trả | thông tin đã validate; fieldErrors |
| `POST /bookings/:id/voucher` | code | giá sau giảm hoặc lý do từ chối |
| `POST /payments` | bookingId, provider, idempotency key | paymentId, redirectUrl/QR; 410 hết hạn |
| `GET /bookings/:id/status` | phiên/guest token hợp lệ | bookingStatus, paymentStatus, ticket khi đủ điều kiện |
| `POST /tickets/lookup` | mã + điện thoại + xác minh nếu cần | token ngắn hạn hoặc chi tiết được phép |
| `POST /tickets/:id/cancellation-quote` | vé, quyền sở hữu | eligible, reason, amount, fee, refundAmount |
| `POST /tickets/:id/cancel` | quote reference, xác nhận | ticketStatus, refundStatus; kiểm tra lại thời gian |
| `POST /auth/register`, `/auth/verify-otp`, `/auth/login` | form | phiên hoặc yêu cầu OTP; lỗi hợp lệ |
| `POST /shipments/quote`, `/shipments` | hàng, tuyến, liên hệ | cước và vận đơn |
| `GET /me/tickets`, `/me/points`, `/me/notifications` | phiên, phân trang | dữ liệu thuộc user hiện tại |
| `POST /reviews` | ticketId, stars, comment | đánh giá hoặc từ chối điều kiện |
| `GET /admin/reports` | khoảng ngày, nhóm lọc | số liệu có định nghĩa rõ, không tính trùng |

API quản trị còn lại theo module và CRUD được cấp quyền. Chat dùng WebSocket/SSE theo kiến trúc backend. Webhook thanh toán do backend xác minh chữ ký và cập nhật giao dịch; frontend không giữ secret cổng thanh toán.

### 7.3 Các trạng thái không được nhập làm một

- Ghế: available / held / sold; selected là trạng thái UI của người chọn.
- Đơn: holding / pending_payment / paid / expired / cancelled.
- Vé: hợp lệ / đã dùng / đã hủy / hết hiệu lực theo model backend.
- Hoàn tiền: none / pending / refunded / failed.
- Chuyến: scheduled / delayed / cancelled / completed theo model được thống nhất.

Ví dụ: vé cancelled + refund pending vẫn hiển thị “Đã hủy · Đang hoàn tiền”; không hiển thị “Hoàn tiền thành công”.

## 8. Cấu trúc Next.js và quy ước viết code

`src/app` chỉ chịu trách nhiệm routing, layout, metadata và ghép màn hình. `src/features` chứa component, types, service/schema theo nghiệp vụ. `src/components` chứa UI/layout dùng chung. `src/lib` chứa formatter và hợp đồng API. `src/config` chứa cấu hình điều hướng; không lưu secret.

| Vị trí | Trách nhiệm |
| --- | --- |
| `app/(public)` | Website công khai, header/footer khách hàng |
| `app/(auth)` | Layout xác thực tối giản |
| `app/(booking)/dat-ve` | Các bước đặt vé, không có sidebar admin |
| `app/(account)/tai-khoan` | Layout tài khoản; cần server guard khi tích hợp |
| `app/(admin)/admin` | Layout nội bộ; cần permission theo route/action |
| `features/trips` | Tìm chuyến, TripCard, dữ liệu mẫu, types |
| `features/booking` | Chọn ghế, kiểu đơn và trạng thái |
| `features/auth` | Types phiên và vai trò; bổ sung service/schema khi triển khai |
| `components/layout` | SiteHeader; mở rộng footer, menu khi cần |
| `components/ui` | Thành phần trình bày chung |
| `lib/api` | Hợp đồng kết quả/lỗi; thêm client riêng theo server/browser khi có API |
| `docs` | Đặc tả, cây thư mục, kết quả kiểm tra |

Quy ước:

1. Dùng `.tsx` cho JSX và `.ts` cho logic/types/config; component PascalCase, file kebab-case.
2. Mặc định Server Component. Chỉ đặt `"use client"` cho phần dùng state, event hoặc browser API như SeatPicker.
3. Với Next.js hiện tại, `params` và `searchParams` trong page được khai báo Promise và await trước sử dụng.
4. Import alias `@/` trỏ tới `src/`; không dùng chuỗi `../../../` dài giữa các module.
5. Không nhét logic ghế, thanh toán, form vào layout gốc. Không khai báo route group là cơ chế phân quyền.
6. Tailwind CSS 4 dùng `@import "tailwindcss"` và `@tailwindcss/postcss`; token qua `@theme`. Không cần tạo tailwind.config.ts rỗng theo mẫu Tailwind 3.
7. Chưa cần Redux/global store cho toàn bộ app. Form nhỏ dùng state; chỉ thêm thư viện khi có nhu cầu rõ.
8. Service backend phải validate lại, kể cả frontend có schema. TS chỉ kiểm tra kiểu lúc phát triển.
9. Khi bắt đầu dữ liệu thật, thêm kiểm tra session/permission ở server và API. Source khung hiện chưa cung cấp cơ chế bảo vệ đó.
10. Commit package-lock.json sau khi cài dependencies; CI chạy typecheck, lint, build bằng lockfile.

Xem `CAU_TRUC.md` để biết cây file thực tế. Source không tạo hàng loạt service rỗng làm người mới khó theo dõi.

## 9. Đối chiếu đầy đủ với tài liệu nghiệp vụ

| Mục nguồn | ID yêu cầu | Màn hình / phần đặc tả | Ưu tiên đề xuất |
| --- | --- | --- | --- |
| I.1 Đăng ký/đăng nhập | AUTH-01 | 4.8; auth routes | P0 |
| I.2 Đặt vé | BOOK-01 | 4.3–4.5 | P0 |
| I.3 Hủy vé | CANCEL-01 | 4.7 | P0 |
| I.4 Mã giảm giá | PROMO-01 | 4.5; admin khuyến mãi | P1 |
| I.5 Thanh toán | PAY-01 | 4.5 | P0 |
| I.6 Tìm kiếm | SEARCH-01 | 4.1–4.2 | P0 |
| I.7 Tra cứu/hóa đơn | TICKET-01 | 4.6 | P0 |
| I.8 Gửi hàng | SHIP-01 | 4.9 | P1 |
| I.9 Chat realtime | CHAT-01 | 4.10 | P2 |
| I.10 VI–EN | I18N-01 | 4.11 | P1 |
| I.11 Đánh giá | REVIEW-01 | 4.12 | P1 |
| I.12 Thông báo | NOTIFY-01 | 4.12 | P1 |
| I.13 Không đăng nhập | GUEST-01 | 4.4, 4.6 | P0 |
| I.14 Điểm | LOYALTY-01 | 4.12 | P2 |
| II.1 Nhân viên/khách | ADMIN-01 | 5; hồ sơ và khóa/mở | P1 |
| II.2 Xe/chuyến/tuyến | ADMIN-02 | 5; ba module riêng | P0 |
| II.3 Vé | ADMIN-03 | 5; vé và danh sách khách | P0 |
| II.4 Khuyến mãi | ADMIN-04 | 5; phạm vi và hiệu quả | P1 |
| II.5 Phân quyền | ADMIN-05 | 2, 5, 7 | P0 |
| II.6 Báo cáo | ADMIN-06 | 5, 7 | P1 |

P0/P1/P2 là thứ tự làm, không phải loại bỏ yêu cầu khỏi sản phẩm cuối.

## 10. Tiêu chí nghiệm thu mục tiêu

| ID | Tình huống | Kết quả cần đạt |
| --- | --- | --- |
| AC-01 | Điểm đi trùng điểm đến hoặc ngày quá khứ | Chặn submit, lỗi cụ thể, giữ input |
| AC-02 | Không có chuyến / API lỗi | Hai trạng thái khác nhau, có hành động phục hồi |
| AC-03 | Hai khách giữ cùng ghế | Chỉ một giữ chỗ thành công; khách còn lại chọn lại |
| AC-04 | Refresh trong lúc giữ ghế | Còn đúng thời gian server, không reset 10 phút |
| AC-05 | Hết 10 phút | Không tạo thanh toán mới, ghế được backend giải phóng |
| AC-06 | Callback chậm hoặc quay lại từ ví | Chờ/đọc server, không cấp vé từ URL |
| AC-07 | Bấm thanh toán/hủy nhiều lần | Không tạo giao dịch/hoàn tiền trùng |
| AC-08 | Hủy ở mốc 3h và dưới 3h | 3h được xét; dưới 3h từ chối, server kiểm tra lại |
| AC-09 | Hủy xong, hoàn chưa xong | Hai trạng thái hiển thị riêng |
| AC-10 | Khứ hồi nếu bật | Hủy theo từng lượt và chính sách đã chốt |
| AC-11 | Khách vãng lai | Đặt không cần tài khoản; tra cứu xác minh; không cộng điểm |
| AC-12 | Mã giảm hết lượt/hết hạn | Lý do rõ, giá từ API; không trừ lượt trước thành công |
| AC-13 | Nhân viên truy cập URL ngoài quyền | Server/API từ chối, không chỉ ẩn menu |
| AC-14 | Chưa hoàn tất chuyến | Không đánh giá/cộng điểm sớm |
| AC-15 | Chuyển VI/EN | Label/lỗi giao dịch/locale gửi backend nhất quán |
| AC-16 | 375px, 768px, 1440px | Không cuộn ngang cả trang, CTA không che form |
| AC-17 | Chỉ dùng bàn phím | Focus rõ, ghế thao tác được, modal trả focus |
| AC-18 | Admin gán trùng xe/tài xế | Lưu bị chặn, chỉ rõ khoảng trùng |
| AC-19 | Hàng cấm / không có báo cáo | Trạng thái rõ, không tạo đơn hoặc số liệu giả |
| AC-20 | Mất mạng chat / thanh toán | Không báo thành công giả; phục hồi không gửi trùng |

Các tiêu chí trên là checklist cho phiên bản hoàn chỉnh, không phải tuyên bố scaffold đã đạt tất cả.

## 11. Thứ tự triển khai đề xuất

1. Chốt các điểm còn mở ở 1.2 và hợp đồng API.
2. Thiết lập project, design token, layout, route và UI cơ bản.
3. Trang chủ, tìm kiếm, bộ lọc và chi tiết chuyến.
4. Sơ đồ ghế thật, giữ chỗ nguyên tử, đồng hồ server.
5. Hành khách, khách vãng lai, điểm đón/trả.
6. Xác thực/OTP và bảo vệ tài nguyên.
7. Thanh toán sandbox của cổng, callback/backend và kết quả.
8. Tra cứu, hóa đơn, hủy và hoàn tiền.
9. Admin tuyến, xe, chuyến, vé và permission.
10. Khuyến mãi, thông báo và báo cáo.
11. Gửi hàng, đánh giá, điểm, chat và VI–EN.
12. Kiểm tra nghiệp vụ biên, mobile, accessibility và tích hợp.

## 12. Phân biệt tài liệu thiết kế và source bàn giao

**Đã viết source mẫu:** config Next/TS/Tailwind/ESLint; layout các khu vực; trang chủ; form tìm theo điểm; danh sách mẫu; chi tiết; chọn/bỏ ghế và tổng tiền; loading/error/not-found; types; các route khung có mô tả.

**Chưa triển khai:** form tìm đầy đủ bộ lọc/ngày thật; đặt nhiều lượt; giữ ghế, auth, OTP, xác minh tra cứu, thanh toán, hủy/hoàn, admin CRUD, hóa đơn, chat, i18n, điểm và thông báo. Route khung không có nghiệp vụ thật. Không triển khai backend ngoài phạm vi yêu cầu cấu trúc frontend.

## 13. Tài liệu kỹ thuật tham khảo

- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure): quy ước app, route group, layout và tổ chức thư mục.
- [Tailwind CSS với PostCSS](https://tailwindcss.com/docs/installation/using-postcss): cấu hình plugin và import CSS.

Các quyết định nghiệp vụ dựa trên NghiepVu(2).docx; hai nguồn trên chỉ dùng đối chiếu kỹ thuật framework.
