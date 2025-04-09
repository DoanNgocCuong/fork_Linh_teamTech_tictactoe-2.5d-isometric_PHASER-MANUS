 GenSpark Lấy nhanh kinh nghiệm Prompt Game của đồng đội - https://www.genspark.ai/agents?id=11d628eb-acde-4bee-bf64-58c4f844679a 

Sau khi Linh (Tech) prompt để tạo game Tic-tac-toe xong. Chui vào và ctrl C để lấy kinh nghiệm Prompt của bạn. 
```
Ctrl C hết. 
tổng hợp các câu prompt của user 
```

# Phân tích Prompts trong Phát triển Game Tic-Tac-Toe với Manus

Dưới đây là tổng hợp các câu prompt chính mà người dùng đã sử dụng để giao tiếp với Manus trong quá trình tạo game Tic-Tac-Toe 2.5D:

## Prompt Ban đầu
```
"Create a code base using phaser and yarn, for a 2.5d tictactoe game, game should be separated into 2 identical screen: home screen and gameplay screen"
```

## Phản hồi Chi tiết về Yêu cầu
Sau khi Manus yêu cầu làm rõ, người dùng đã cung cấp các thông số cụ thể:
```
"1. Isometric view 
2. different size, traditional rules, two-player mode
3. simple graphic, no animation
4. typescript included"
```

## Báo cáo Lỗi và Yêu cầu Sửa chữa
Sau khi nhận được bản build đầu tiên, người dùng phát hiện ra vấn đề:
```
"package.json file is missing all the required library causing the project unable to run, update it thoroughly"
```

## Yêu cầu Tiếp cận Mới với Template và Assets
Sau khi nhận được phiên bản đã sửa, người dùng yêu cầu một phương pháp mới:
```
"- try a fresh approach using project template from https://github.com/phaserjs/template-webpack
- use free assets from https://itch.io/game-assets"
```

## Yêu cầu Cụ thể cho Phiên bản Mới
Khi Manus yêu cầu làm rõ về phiên bản mới, người dùng đã cung cấp hướng dẫn chi tiết:
```
"1. pixelated visual theme is preferred, however not mandatory, create isometric effect programmatically
2. grid size should be 3 units larger than require length for a player to win, show popup when an user wins
3. base on project structure from repo, modify only if needed, use typescript"
```

## Phân tích Chiến lược Prompting

Qua các prompt trên, có thể thấy người dùng đã áp dụng một số chiến lược hiệu quả:

1. **Yêu cầu Ban đầu Ngắn gọn**: Prompt đầu tiên chỉ nêu các yêu cầu cốt lõi.

2. **Phân Chia Thông tin Có Cấu trúc**: Khi cung cấp chi tiết, người dùng đánh số rõ ràng từng phần.

3. **Phản hồi Cụ thể về Lỗi**: Chỉ ra chính xác vấn đề với package.json.

4. **Cung cấp Tài nguyên và Hướng dẫn**: Đưa ra các URL cụ thể cho template và assets.

5. **Linh hoạt trong Yêu cầu**: Cho phép một số tự do trong thiết kế (ví dụ: "pixelated visual theme is preferred, however not mandatory").

6. **Kết hợp Yêu cầu Kỹ thuật và Hướng dẫn Thực hiện**: Cung cấp cả thông số kỹ thuật (TypeScript) và hướng dẫn triển khai (create isometric effect programmatically).

7. **Yêu cầu Dựa trên Rules**: Định nghĩa các quy tắc rõ ràng cho gameplay (grid size should be 3 units larger than require length for a player to win).
