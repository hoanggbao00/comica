export const examplePlanResponse = {
  plan: {
    chapter_number: 1,
    chapter_title: "Ánh Đèn Triển Lãm",
    chapter_summary:
      "Tại buổi triển lãm về Titanic, Conan tình cờ gặp Doraemon và Nobita; một hiện vật chứa mật mã hé lộ dấu vết dẫn đến kho báu 'Giọt Lệ Đại Dương' và bóng dáng tổ chức 'Bóng Đêm' bắt đầu lộ diện.",
    fixed_pages: 3,
    characters: [
      {
        name: "Conan Edogawa",
        role: "Nhân vật chính / Thám tử",
        traits: ["Lý trí sắc bén", "Quan sát tỉ mỉ", "Lạnh lùng nhưng chính trực", "Giọng kể mang màu sắc detective"],
        visual_notes:
          "Hình dạng học sinh nhỏ nhưng mang áo trench coat, cổ áo dựng cao, mắt sáng tinh tường, luôn cầm kính lúp hoặc bút cảm ứng. Tông đen-trắng, bóng đổ sâu.",
        image_prompt_en:
          "Noir anime style portrait of a young detective: small boy in a trench coat and high collar, bright keen eyes, holding a magnifying glass, dramatic high-contrast lighting, deep shadows, rain-soaked museum background, cinematic composition",
        palette: ["#0B0B0B", "#FFFFFF", "#A6A6A6", "#3B3B3B", "#D1D1D1"],
        image_url: "https://v3.fal.media/files/rabbit/2BN4l98WGLuI71h_k7tSm_image.jpg",
      },
      {
        name: "Doraemon",
        role: "Đồng minh / Robot bảo bối",
        traits: ["Thông minh thực dụng", "Hài hước ấm áp", "Bảo bối sáng tạo", "Trái tim nhân hậu"],
        visual_notes:
          "Mèo máy hình tròn, nhìn đơn giản nhưng ánh mắt ấm; xuất hiện với độ tương phản cao, chi tiết bảo bối lóe sáng giữa bóng tối, vẫn giữ đặc trưng màu xanh nhưng trong phong cách noir chuyển sang xám xanh.",
        image_prompt_en:
          "Noir anime robot cat: round robotic cat with warm eyes, subtle blue-gray tones, futuristic gadgets faintly glowing, high-contrast shadows, standing under museum spotlight, cinematic noir atmosphere",
        palette: ["#1F6FBF", "#0B0B0B", "#E6F0FA", "#4A6B8A", "#A6A6A6"],
        image_url: "https://v3.fal.media/files/rabbit/MhDIJCWuIbQzd1Z6y-PF8_image.jpg",
      },
      {
        name: "Nobita",
        role: "Bạn đồng hành / Tâm lý nhân vật",
        traits: ["Nhút nhát nhưng trung thành", "Hay lo lắng", "Dễ xúc động nhưng can đảm khi cần"],
        visual_notes:
          "Học sinh phổ thông điển hình, áo len đơn giản, tóc rối, biểu cảm lo lắng nhưng hướng về phía bạn bè; trình bày trong ánh đèn mờ của phòng trưng bày.",
        image_prompt_en:
          "Noir anime portrait of a timid schoolboy: messy hair, simple sweater, worried expression, soft highlight on face amid dark museum environment, cinematic dramatic lighting",
        palette: ["#3B3B3B", "#FFFFFF", "#B0B0B0", "#7B7B7B"],
        image_url: "https://v3.fal.media/files/panda/p2lfFgoX7XDZNR0Uh2-nv_image.jpg",
      },
      {
        name: "Arata Kurogane",
        role: 'Lãnh đạo tổ chức săn kho báu "Bóng Đêm" (kẻ đối đầu)',
        traits: ["Lạnh lùng, tính toán", "Mưu mô nhưng có chuẩn mực riêng", "Sách lược và bí ẩn"],
        visual_notes:
          "Người lớn trung niên, trang phục tối giản sắc sảo, bóng lưng dài, ánh mắt như dao; không lộ diện bộc lộ cảm xúc, luôn xuất hiện trong khung tối sâu.",
        image_prompt_en:
          "Noir anime antagonist: sharp-featured middle-aged man in sleek dark suit, long shadow, cold calculating eyes, surrounded by ambiguous crew silhouettes, high-contrast dramatic lighting, cinematic tension",
        palette: ["#0B0B0B", "#2E2E2E", "#FFFFFF", "#8A8A8A"],
        image_url: "https://v3.fal.media/files/koala/gsFTA1hfTsd9uH678p7Lu_image.jpg",
      },
      {
        name: "TS. Hứa Minh",
        role: "Giám tuyển / Đồng minh chuyên môn",
        traits: ["Kiến thức sâu rộng về hàng hải", "Tận tâm với di sản văn hóa", "Điềm tĩnh, kiên nhẫn"],
        visual_notes:
          "Người trung niên nhẹ nhàng, đeo kính, mặc áo khoác kaki, mang theo sổ tay và bản đồ cổ; ánh nhìn lo lắng nhưng kiên quyết bảo vệ hiện vật.",
        image_prompt_en:
          "Noir anime marine archaeologist: middle-aged scholar with glasses and weathered notebook, wearing a khaki coat, soft determined expression, museum artifacts and nautical maps in the background, chiaroscuro lighting",
        palette: ["#D9CDBE", "#3B3B3B", "#FFFFFF", "#8C7B6B"],
        image_url: "https://v3.fal.media/files/zebra/luF9Znu1pdQ-uB7v4fwCl_image.jpg",
      },
    ],
    page_plan: [
      {
        page_number: 1,
        goal: "Kể các beat: Mở màn triển lãm, Cuộc gặp bất ngờ",
        panels: [
          {
            panel_number: 1,
            scene_id: "1.1",
            beat: "Mở màn triển lãm",
            details:
              "Buổi triển lãm về Titanic tràn ngập ánh đèn mờ và khung cảnh đen-trắng; Conan đi giữa các tấm biển thông tin, giọng kể như thở dài: lịch sử luôn ẩn giấu những vết bẩn và hi vọng.",
          },
          {
            panel_number: 2,
            scene_id: "1.2",
            beat: "Cuộc gặp bất ngờ",
            details:
              "Doraemon và Nobita tới thăm triển lãm. Cuộc hội ngộ giữa hai nhóm, những câu nói vụng về của Nobita tạo tiếng cười nhỏ, Conan quan sát kỹ những chi tiết nhỏ quanh họ.",
          },
        ],
      },
      {
        page_number: 2,
        goal: "Kể các beat: Phát hiện mật mã, Bóng đêm lướt qua",
        panels: [
          {
            panel_number: 1,
            scene_id: "1.3",
            beat: "Phát hiện mật mã",
            details:
              "Một mảnh kính nằm cạnh hiện vật tàu Titanic hé lộ một dãy ký hiệu lạ khi chiếu đèn soi. Conan ghép nối các ký hiệu thành một mật mã dẫn đến 'Giọt Lệ Đại Dương'—một huyền thoại chưa từng công bố.",
          },
          {
            panel_number: 2,
            scene_id: "1.4",
            beat: "Bóng đêm lướt qua",
            details:
              "TS. Hứa Minh cảnh báo về những kẻ săn kho báu; bóng dáng của một người đàn ông trong bộ suit tối (Arata Kurogane) xuất hiện ở góc phòng, theo dõi. Cuộc chơi bắt đầu.",
          },
        ],
      },
      {
        page_number: 3,
        goal: "Kể các beat: Quyết định hợp tác",
        panels: [
          {
            panel_number: 1,
            scene_id: "1.5",
            beat: "Quyết định hợp tác",
            details:
              "Conan và Doraemon thỏa thuận kết hợp trí tuệ và bảo bối để giải mã mật mã; Nobita run rẩy nhưng quyết tâm tham gia. Họ rời triển lãm mang theo bản sao dấu hiệu và một cảm giác nặng nề về trách nhiệm.",
          },
        ],
      },
    ],
  },
  page_plan: [
    {
      page_number: 1,
      goal: "Kể các beat: Mở màn triển lãm, Cuộc gặp bất ngờ",
      panels: [
        {
          panel_number: 1,
          scene_id: "1.1",
          beat: "Mở màn triển lãm",
          details:
            "Buổi triển lãm về Titanic tràn ngập ánh đèn mờ và khung cảnh đen-trắng; Conan đi giữa các tấm biển thông tin, giọng kể như thở dài: lịch sử luôn ẩn giấu những vết bẩn và hi vọng.",
        },
        {
          panel_number: 2,
          scene_id: "1.2",
          beat: "Cuộc gặp bất ngờ",
          details:
            "Doraemon và Nobita tới thăm triển lãm. Cuộc hội ngộ giữa hai nhóm, những câu nói vụng về của Nobita tạo tiếng cười nhỏ, Conan quan sát kỹ những chi tiết nhỏ quanh họ.",
        },
      ],
    },
    {
      page_number: 2,
      goal: "Kể các beat: Phát hiện mật mã, Bóng đêm lướt qua",
      panels: [
        {
          panel_number: 1,
          scene_id: "1.3",
          beat: "Phát hiện mật mã",
          details:
            "Một mảnh kính nằm cạnh hiện vật tàu Titanic hé lộ một dãy ký hiệu lạ khi chiếu đèn soi. Conan ghép nối các ký hiệu thành một mật mã dẫn đến 'Giọt Lệ Đại Dương'—một huyền thoại chưa từng công bố.",
        },
        {
          panel_number: 2,
          scene_id: "1.4",
          beat: "Bóng đêm lướt qua",
          details:
            "TS. Hứa Minh cảnh báo về những kẻ săn kho báu; bóng dáng của một người đàn ông trong bộ suit tối (Arata Kurogane) xuất hiện ở góc phòng, theo dõi. Cuộc chơi bắt đầu.",
        },
      ],
    },
    {
      page_number: 3,
      goal: "Kể các beat: Quyết định hợp tác",
      panels: [
        {
          panel_number: 1,
          scene_id: "1.5",
          beat: "Quyết định hợp tác",
          details:
            "Conan và Doraemon thỏa thuận kết hợp trí tuệ và bảo bối để giải mã mật mã; Nobita run rẩy nhưng quyết tâm tham gia. Họ rời triển lãm mang theo bản sao dấu hiệu và một cảm giác nặng nề về trách nhiệm.",
        },
      ],
    },
  ],
  chapter: {
    number: 1,
    title: "Ánh Đèn Triển Lãm",
    summary:
      "Tại buổi triển lãm về Titanic, Conan tình cờ gặp Doraemon và Nobita; một hiện vật chứa mật mã hé lộ dấu vết dẫn đến kho báu 'Giọt Lệ Đại Dương' và bóng dáng tổ chức 'Bóng Đêm' bắt đầu lộ diện.",
    scenes: [
      {
        id: "1.1",
        beat: "Mở màn triển lãm",
        details:
          "Buổi triển lãm về Titanic tràn ngập ánh đèn mờ và khung cảnh đen-trắng; Conan đi giữa các tấm biển thông tin, giọng kể như thở dài: lịch sử luôn ẩn giấu những vết bẩn và hi vọng.",
      },
      {
        id: "1.2",
        beat: "Cuộc gặp bất ngờ",
        details:
          "Doraemon và Nobita tới thăm triển lãm. Cuộc hội ngộ giữa hai nhóm, những câu nói vụng về của Nobita tạo tiếng cười nhỏ, Conan quan sát kỹ những chi tiết nhỏ quanh họ.",
      },
      {
        id: "1.3",
        beat: "Phát hiện mật mã",
        details:
          "Một mảnh kính nằm cạnh hiện vật tàu Titanic hé lộ một dãy ký hiệu lạ khi chiếu đèn soi. Conan ghép nối các ký hiệu thành một mật mã dẫn đến 'Giọt Lệ Đại Dương'—một huyền thoại chưa từng công bố.",
      },
      {
        id: "1.4",
        beat: "Bóng đêm lướt qua",
        details:
          "TS. Hứa Minh cảnh báo về những kẻ săn kho báu; bóng dáng của một người đàn ông trong bộ suit tối (Arata Kurogane) xuất hiện ở góc phòng, theo dõi. Cuộc chơi bắt đầu.",
      },
      {
        id: "1.5",
        beat: "Quyết định hợp tác",
        details:
          "Conan và Doraemon thỏa thuận kết hợp trí tuệ và bảo bối để giải mã mật mã; Nobita run rẩy nhưng quyết tâm tham gia. Họ rời triển lãm mang theo bản sao dấu hiệu và một cảm giác nặng nề về trách nhiệm.",
      },
    ],
  },
  panels_flat: [
    {
      chapter_number: 1,
      page_number: 1,
      panel_number: 1,
      beat: "Mở màn triển lãm",
      details:
        "Buổi triển lãm về Titanic tràn ngập ánh đèn mờ và khung cảnh đen-trắng; Conan đi giữa các tấm biển thông tin, giọng kể như thở dài: lịch sử luôn ẩn giấu những vết bẩn và hi vọng.",
      scene_id: "1.1",
    },
    {
      chapter_number: 1,
      page_number: 1,
      panel_number: 2,
      beat: "Cuộc gặp bất ngờ",
      details:
        "Doraemon và Nobita tới thăm triển lãm. Cuộc hội ngộ giữa hai nhóm, những câu nói vụng về của Nobita tạo tiếng cười nhỏ, Conan quan sát kỹ những chi tiết nhỏ quanh họ.",
      scene_id: "1.2",
    },
    {
      chapter_number: 1,
      page_number: 2,
      panel_number: 1,
      beat: "Phát hiện mật mã",
      details:
        "Một mảnh kính nằm cạnh hiện vật tàu Titanic hé lộ một dãy ký hiệu lạ khi chiếu đèn soi. Conan ghép nối các ký hiệu thành một mật mã dẫn đến 'Giọt Lệ Đại Dương'—một huyền thoại chưa từng công bố.",
      scene_id: "1.3",
    },
    {
      chapter_number: 1,
      page_number: 2,
      panel_number: 2,
      beat: "Bóng đêm lướt qua",
      details:
        "TS. Hứa Minh cảnh báo về những kẻ săn kho báu; bóng dáng của một người đàn ông trong bộ suit tối (Arata Kurogane) xuất hiện ở góc phòng, theo dõi. Cuộc chơi bắt đầu.",
      scene_id: "1.4",
    },
    {
      chapter_number: 1,
      page_number: 3,
      panel_number: 1,
      beat: "Quyết định hợp tác",
      details:
        "Conan và Doraemon thỏa thuận kết hợp trí tuệ và bảo bối để giải mã mật mã; Nobita run rẩy nhưng quyết tâm tham gia. Họ rời triển lãm mang theo bản sao dấu hiệu và một cảm giác nặng nề về trách nhiệm.",
      scene_id: "1.5",
    },
  ],
};
