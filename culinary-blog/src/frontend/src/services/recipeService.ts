import { RecipeSummaryDto, RecipeDetailDto, RecipeSearchParams, PagedResult, CategoryDto } from '../types';

export interface CategoryOption extends CategoryDto {
  icon?: string;
}

/**
 * 12 Chuyên mục ẩm thực Việt Nam thực tế (tham khảo Điện Máy Xanh - Vào Bếp)
 */
export const CATEGORIES: CategoryOption[] = [
  {
    "id": "all",
    "name": "Tất Cả Danh Mục",
    "slug": "all",
    "description": "Toàn bộ kho tàng công thức nấu ăn chuẩn vị Việt Nam trên hệ thống Culinary Blog.",
    "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 0,
    "recipeCount": 55,
    "icon": "✨"
  },
  {
    "id": "11111111-1111-4111-8111-000000000001",
    "name": "Món Nước & Bún Phở",
    "slug": "mon-nuoc-bun-pho",
    "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
    "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 1,
    "icon": "🍜",
    "recipeCount": 6
  },
  {
    "id": "11111111-1111-4111-8111-000000000002",
    "name": "Món Cơm & Xôi",
    "slug": "mon-com-xoi",
    "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
    "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 2,
    "icon": "🍚",
    "recipeCount": 5
  },
  {
    "id": "11111111-1111-4111-8111-000000000003",
    "name": "Món Kho & Rim",
    "slug": "mon-kho-rim",
    "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
    "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 3,
    "icon": "🍲",
    "recipeCount": 5
  },
  {
    "id": "11111111-1111-4111-8111-000000000004",
    "name": "Món Canh & Súp",
    "slug": "mon-canh-sup",
    "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
    "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 4,
    "icon": "🥣",
    "recipeCount": 5
  },
  {
    "id": "11111111-1111-4111-8111-000000000005",
    "name": "Món Xào & Áp Chảo",
    "slug": "mon-xao-ap-chao",
    "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 5,
    "icon": "🥘",
    "recipeCount": 5
  },
  {
    "id": "11111111-1111-4111-8111-000000000006",
    "name": "Món Nướng & Quay",
    "slug": "mon-nuong-quay",
    "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
    "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 6,
    "icon": "🍖",
    "recipeCount": 5
  },
  {
    "id": "11111111-1111-4111-8111-000000000007",
    "name": "Món Chiên & Rán",
    "slug": "mon-chien-ran",
    "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
    "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 7,
    "icon": "🍤",
    "recipeCount": 4
  },
  {
    "id": "11111111-1111-4111-8111-000000000008",
    "name": "Món Gỏi, Nộm & Cuốn",
    "slug": "mon-goi-nom-cuon",
    "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 8,
    "icon": "🥗",
    "recipeCount": 4
  },
  {
    "id": "11111111-1111-4111-8111-000000000009",
    "name": "Món Lẩu & Hấp",
    "slug": "mon-lau-hap",
    "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
    "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 9,
    "icon": "🫕",
    "recipeCount": 4
  },
  {
    "id": "11111111-1111-4111-8111-000000000010",
    "name": "Món Chay Thanh Đạm",
    "slug": "mon-chay-thanh-dam",
    "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
    "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 10,
    "icon": "🥬",
    "recipeCount": 4
  },
  {
    "id": "11111111-1111-4111-8111-000000000011",
    "name": "Bánh Ngọt & Tráng Miệng",
    "slug": "banh-ngot-trang-mieng",
    "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
    "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 11,
    "icon": "🍰",
    "recipeCount": 4
  },
  {
    "id": "11111111-1111-4111-8111-000000000012",
    "name": "Thức Uống & Sinh Tố",
    "slug": "thuc-uong-sinh-to",
    "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
    "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
    "orderIndex": 12,
    "icon": "🍹",
    "recipeCount": 4
  }
];

/**
 * Danh sách 12 Category chuẩn (không bao gồm mục 'all') dùng cho trang /categories và quản trị
 */
export const REAL_CATEGORIES: CategoryDto[] = CATEGORIES.filter((c) => c.id !== 'all');

/**
 * 55 Công thức món ăn Việt Nam thực tế có đầy đủ nguyên liệu, bước nấu, hình ảnh và dinh dưỡng
 */
export const INITIAL_RECIPES: RecipeSummaryDto[] = [
  {
    "id": "22222222-2222-4222-8222-000000000001",
    "title": "Phở Bò Tái Nạm Truyền Thống Hà Nội",
    "slug": "pho-bo-tai-nam-ha-noi",
    "description": "Hương vị phở bò chuẩn Hà Thành với nước dùng ninh xương ống trong vắt, thơm dịu thảo quả, hoa hồi, quế chi hòa quyện cùng thịt bò tái mềm ngọt và nạm bò giòn béo.",
    "prepTime": 30,
    "cookTime": 120,
    "totalTime": 150,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-01T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 12,
    "nutrition": {
      "calories": 485,
      "protein": 34,
      "carbohydrates": 52,
      "fat": 14,
      "fiber": 3,
      "sodium": 820
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000002",
    "title": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô",
    "slug": "bun-bo-hue-gio-heo-co-do",
    "description": "Tô bún bò chuẩn vị xứ Huế với nước dùng đỏ cam bắt mắt từ dầu điều, dậy mùi sả tươi và mắm ruốc Huế đặc trưng, ăn kèm bắp bò hoa, giò heo mềm rục và chả cua thơm béo.",
    "prepTime": 40,
    "cookTime": 90,
    "totalTime": 130,
    "servings": 6,
    "difficulty": "Hard",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-02T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 15,
    "nutrition": {
      "calories": 560,
      "protein": 38,
      "carbohydrates": 56,
      "fat": 19,
      "fiber": 4,
      "sodium": 950
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000003",
    "title": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ",
    "slug": "bun-rieu-cua-dong-bap-bo",
    "description": "Tô bún riêu cua đồng dân dã với gạch cua đóng tảng béo ngậy, vị chua dịu thanh thoát từ giấm bỗng và cà chua chín mọng, kết hợp đậu hũ chiên vàng và bắp bò tươi.",
    "prepTime": 35,
    "cookTime": 45,
    "totalTime": 80,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-03T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 18,
    "nutrition": {
      "calories": 440,
      "protein": 29,
      "carbohydrates": 48,
      "fat": 13,
      "fiber": 4,
      "sodium": 780
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000004",
    "title": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong",
    "slug": "hu-tieu-nam-vang-tom-thit",
    "description": "Sợi hủ tiếu dai mềm kết hợp nước lèo hầm xương heo cùng mực khô, tôm khô ngọt lịm tự nhiên, đầy đặn topping tôm sú tươi, thịt bằm, trứng cút và tỏi phi vàng giòn.",
    "prepTime": 30,
    "cookTime": 75,
    "totalTime": 105,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-04T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 21,
    "nutrition": {
      "calories": 470,
      "protein": 32,
      "carbohydrates": 54,
      "fat": 12,
      "fiber": 3,
      "sodium": 760
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000005",
    "title": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng",
    "slug": "mi-quang-tom-thit-trung-cut",
    "description": "Món mì trứ danh miền Trung với sợi mì nghệ vàng ươm, phần nước nhân tôm thịt rim dầu điều sánh đậm chan xâm xấp, ăn kèm bánh đa nướng giòn rụm và đậu phộng rang.",
    "prepTime": 25,
    "cookTime": 40,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-05T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 24,
    "nutrition": {
      "calories": 510,
      "protein": 31,
      "carbohydrates": 55,
      "fat": 17,
      "fiber": 4,
      "sodium": 790
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000006",
    "title": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm",
    "slug": "banh-canh-cua-gio-heo",
    "description": "Sợi bánh canh bột lọc dai trong hòa quyện trong làn nước dùng sánh mịn tự nhiên, ngập tràn thịt cua biển tươi bóc múi, khoanh giò heo, tôm sú và chả cá thu.",
    "prepTime": 35,
    "cookTime": 50,
    "totalTime": 85,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-06T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 27,
    "nutrition": {
      "calories": 530,
      "protein": 36,
      "carbohydrates": 58,
      "fat": 16,
      "fiber": 2,
      "sodium": 840
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000007",
    "title": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn",
    "slug": "com-tam-suon-bi-cha-sai-gon",
    "description": "Đĩa cơm tấm trứ danh Sài Thành với hạt cơm tấm dẻo tơi, miếng sườn cốt lết nướng mật ong vàng óng mềm mọng, bì thính giòn dai, chả trứng hấp béo ngậy và nước mắm kẹo chua ngọt.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-07T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 30,
    "nutrition": {
      "calories": 640,
      "protein": 38,
      "carbohydrates": 68,
      "fat": 22,
      "fiber": 3,
      "sodium": 890
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000008",
    "title": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi",
    "slug": "com-ga-xoi-mo-da-gion",
    "description": "Đùi gà góc tư được luộc chín mềm bên trong rồi xối dầu sôi cho lớp da nổ giòn tan vàng rụm, dùng kèm cơm rang săn hạt màu đỏ cam đẹp mắt và sốt mắm tỏi đậm đà.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-08T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 33,
    "nutrition": {
      "calories": 615,
      "protein": 36,
      "carbohydrates": 62,
      "fat": 23,
      "fiber": 2,
      "sodium": 810
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000009",
    "title": "Cơm Chiên Dương Châu Tôm Lạp Xưởng",
    "slug": "com-chien-duong-chau-tom-lap-xuong",
    "description": "Món cơm chiên ngũ sắc bắt mắt với từng hạt cơm áo trứng vàng ươm săn tơi, hòa quyện vị ngọt của tôm tươi, lạp xưởng Mai Quế Lộ, đậu Hà Lan, cà rốt và bắp ngọt.",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-09T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 36,
    "nutrition": {
      "calories": 520,
      "protein": 24,
      "carbohydrates": 64,
      "fat": 18,
      "fiber": 4,
      "sodium": 720
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000010",
    "title": "Xôi Gà Xé Phay Hành Phi Trứng Non",
    "slug": "xoi-ga-xe-phay-trung-non",
    "description": "Xôi nếp cái hoa vàng đồ dẻo thơm bóng bẩy kết hợp thịt gà ta xé phay trộn hành tây chua ngọt, trứng gà non rim mặn ngọt và lớp hành phi mỡ gà giòn rụm.",
    "prepTime": 35,
    "cookTime": 40,
    "totalTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-10T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 39,
    "nutrition": {
      "calories": 550,
      "protein": 30,
      "carbohydrates": 68,
      "fat": 16,
      "fiber": 3,
      "sodium": 690
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000011",
    "title": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành",
    "slug": "xoi-xeo-dau-xanh-mo-hanh",
    "description": "Thức quà sáng kinh điển của Hà Nội với hạt xôi vàng óng dẻo thơm màu nghệ, những lát đậu xanh nắm mịn màng cắt xéo, quyện cùng mỡ gà béo ngậy và hành phi thơm nức.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-11T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 13,
    "nutrition": {
      "calories": 480,
      "protein": 14,
      "carbohydrates": 74,
      "fat": 13,
      "fiber": 5,
      "sodium": 420
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000012",
    "title": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi",
    "slug": "thit-kho-tau-trung-vit-nuoc-dua",
    "description": "Món thịt kho tàu truyền thống với những khối thịt ba chỉ vuông vắn mềm rục, lớp mỡ trong veo không ngấy, trứng vịt thấm vị nâu cánh gián nhờ kho chậm với nước dừa xiêm tươi.",
    "prepTime": 25,
    "cookTime": 75,
    "totalTime": 100,
    "servings": 6,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-12T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 16,
    "nutrition": {
      "calories": 580,
      "protein": 32,
      "carbohydrates": 18,
      "fat": 41,
      "fiber": 1,
      "sodium": 920
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000013",
    "title": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây",
    "slug": "ca-loc-kho-to-tieu-xanh",
    "description": "Khúc cá lóc đồng kho trong nồi đất săn chắc, thấm đẫm nước sốt kẹo sánh màu hổ phách, thơm nồng mùi tiêu xanh, hành lá và tóp mỡ giòn béo chuẩn vị dân dã miền Tây.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-13T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 19,
    "nutrition": {
      "calories": 390,
      "protein": 34,
      "carbohydrates": 16,
      "fat": 20,
      "fiber": 2,
      "sodium": 860
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000014",
    "title": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa",
    "slug": "ga-kho-gung-sa-ot",
    "description": "Thịt gà ta săn chắc được kho thấm đẫm hương thơm ấm nồng của gừng tươi thái sợi và sả ớt băm nhuyễn, nước kho sánh vàng cực kỳ bắt cơm trong những ngày se lạnh.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-14T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 22,
    "nutrition": {
      "calories": 420,
      "protein": 35,
      "carbohydrates": 14,
      "fat": 24,
      "fiber": 2,
      "sodium": 780
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000015",
    "title": "Sườn Non Rim Mặn Ngọt Nước Dừa",
    "slug": "suon-non-rim-man-ngot",
    "description": "Những dẻ sườn non nhiều sụn được rim chậm trong nước dừa tươi và sốt mắm tỏi ớt cho đến khi mềm róc xương, áo lớp sốt nâu đỏ bóng mượt mặn ngọt hài hòa.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-15T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 25,
    "nutrition": {
      "calories": 490,
      "protein": 31,
      "carbohydrates": 19,
      "fat": 32,
      "fiber": 1,
      "sodium": 830
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000016",
    "title": "Cá Bống Sông Kho Tiêu Nồi Đất",
    "slug": "ca-bong-song-kho-tieu-noi-dat",
    "description": "Con cá bống sông kho khô săn chắc đến tận xương, ngấm vị mặn ngọt của nước mắm truyền thống và vị cay thơm của tiêu đen đập dập, ăn cùng cháo trắng hay cơm nóng đều tuyệt hảo.",
    "prepTime": 15,
    "cookTime": 40,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-16T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 28,
    "nutrition": {
      "calories": 340,
      "protein": 32,
      "carbohydrates": 15,
      "fat": 16,
      "fiber": 1,
      "sodium": 880
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000017",
    "title": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ",
    "slug": "canh-chua-ca-loc-nam-bo",
    "description": "Tô canh chua chuẩn vị miền sông nước Nam Bộ với vị chua thanh từ nước cốt me chín, vị ngọt của dứa, cà chua, bạc hà, đậu bắp, giá đỗ và hương thơm nức mũi của ngò ôm, ngò gai, tỏi phi.",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-17T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 31,
    "nutrition": {
      "calories": 285,
      "protein": 27,
      "carbohydrates": 22,
      "fat": 9,
      "fiber": 5,
      "sodium": 680
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000018",
    "title": "Canh Sườn Non Hầm Củ Sen Táo Đỏ",
    "slug": "canh-suon-non-ham-cu-sen",
    "description": "Món canh hầm dưỡng sinh thanh ngọt tự nhiên từ sườn non heo, củ sen bùi bở, táo đỏ và kỷ tử, giúp bồi bổ sức khỏe và an thần giấc ngủ cho cả gia đình.",
    "prepTime": 20,
    "cookTime": 50,
    "totalTime": 70,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-18T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 34,
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbohydrates": 28,
      "fat": 14,
      "fiber": 4,
      "sodium": 540
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000019",
    "title": "Canh Cua Rau Đay Mồng Tơi Cà Pháo",
    "slug": "canh-cua-rau-day-mong-toi",
    "description": "Bát canh cua đồng nấu rau đay, mồng tơi và mướp hương thơm mát với lớp thịt cua đóng tảng dày dặn, dùng kèm đĩa cà pháo muối giòn tan gợi nhớ hương vị quê nhà.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-19T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 37,
    "nutrition": {
      "calories": 210,
      "protein": 19,
      "carbohydrates": 15,
      "fat": 7,
      "fiber": 5,
      "sodium": 590
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000020",
    "title": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác",
    "slug": "canh-kho-qua-nhoi-thit",
    "description": "Khổ qua xanh mướt được hầm vừa chín tới giữ vị đắng thanh mát dịu nhẹ, bên trong là phần nhân thịt heo quết cùng chả cá thác lác dai giòn ngọt đậm đà.",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-20T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 40,
    "nutrition": {
      "calories": 310,
      "protein": 26,
      "carbohydrates": 16,
      "fat": 15,
      "fiber": 4,
      "sodium": 650
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000021",
    "title": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô",
    "slug": "sup-cua-trung-bac-thao",
    "description": "Chén súp cua nóng hổi sánh mịn thơm lừng dầu mè, đầy ắp thịt cua biển tươi, nấm đông cô, bắp Mỹ ngọt, trứng cút và trứng bắc thảo bùi béo giàu dinh dưỡng.",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-21T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 14,
    "nutrition": {
      "calories": 295,
      "protein": 24,
      "carbohydrates": 26,
      "fat": 10,
      "fiber": 2,
      "sodium": 620
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000022",
    "title": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi",
    "slug": "bo-luc-lac-khoai-tay-bo-toi",
    "description": "Những khối thịt thăn bò vuông vức được áp chảo lửa lớn xém cạnh thơm lừng bơ tỏi nhưng bên trong vẫn mềm mọng hồng đào, xóc đều cùng ớt chuông giòn ngọt và khoai tây chiên.",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-22T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 17,
    "nutrition": {
      "calories": 540,
      "protein": 37,
      "carbohydrates": 38,
      "fat": 26,
      "fiber": 4,
      "sodium": 740
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000023",
    "title": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây",
    "slug": "muc-xao-chua-ngot-dua-ca-chua",
    "description": "Mực ống tươi khía vảy rồng trắng giòn sần sật được xào lửa lớn cùng dứa chín, cà chua, dưa leo và cần tây tạo nên món xào đầy màu sắc, chua ngọt kích thích vị giác.",
    "prepTime": 20,
    "cookTime": 12,
    "totalTime": 32,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-23T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 20,
    "nutrition": {
      "calories": 320,
      "protein": 28,
      "carbohydrates": 24,
      "fat": 11,
      "fiber": 3,
      "sodium": 690
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000024",
    "title": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán",
    "slug": "rau-muong-xao-toi-xanh-gion",
    "description": "Đĩa rau muống xào tỏi xanh mướt bóng bẩy, cọng rau giòn sần sật ngập tràn hương tỏi đập dập phi thơm vàng, bí quyết nằm ở bước chần sơ và sốc nhiệt nước đá.",
    "prepTime": 15,
    "cookTime": 8,
    "totalTime": 23,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-24T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 23,
    "nutrition": {
      "calories": 180,
      "protein": 5,
      "carbohydrates": 12,
      "fat": 12,
      "fiber": 6,
      "sodium": 520
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000025",
    "title": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon",
    "slug": "mien-xao-cua-bien-gia-he",
    "description": "Sợi miến dong dai bóng không hề bị dính cục hay đứt gãy, thấm đẫm vị ngọt đậm đà từ thịt cua biển gỡ múi, nấm hương, cà rốt, giá đỗ và lá hẹ xanh tươi.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-25T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 26,
    "nutrition": {
      "calories": 430,
      "protein": 28,
      "carbohydrates": 50,
      "fat": 13,
      "fiber": 4,
      "sodium": 710
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000026",
    "title": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt",
    "slug": "thit-bo-xao-bong-thien-ly",
    "description": "Sự kết hợp hoàn hảo giữa thịt thăn bò mềm ngọt ướp dầu hào tỏi và những chùm bông thiên lý xanh non giòn mát, mang lại món xào thanh nhiệt giàu dưỡng chất cho bữa cơm chiều.",
    "prepTime": 15,
    "cookTime": 10,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-26T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 29,
    "nutrition": {
      "calories": 340,
      "protein": 30,
      "carbohydrates": 14,
      "fat": 18,
      "fiber": 4,
      "sodium": 640
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000027",
    "title": "Bún Chả Hà Nội Thịt Nướng Than Hoa",
    "slug": "bun-cha-ha-noi-thit-nuong",
    "description": "Đệ nhất ẩm thực Hà Thành với chả viên và chả miếng ba chỉ nướng vỉ than hoa xém vàng thơm lừng, ngâm trong bát nước chấm chua ngọt ấm nóng điểm xuyết đu đủ xanh giòn.",
    "prepTime": 35,
    "cookTime": 25,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-27T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 32,
    "nutrition": {
      "calories": 580,
      "protein": 35,
      "carbohydrates": 58,
      "fat": 22,
      "fiber": 4,
      "sodium": 850
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000028",
    "title": "Gà Nướng Mật Ong Lá Chanh Da Giòn",
    "slug": "ga-nuong-mat-ong-la-chanh",
    "description": "Gà ta nguyên con hoặc đùi gà được ướp thấm sốt mật ong, nghệ và sả tỏi rồi nướng chín vàng óng ả, lớp da căng bóng giòn thơm hương lá chanh thái chỉ.",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-28T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 35,
    "nutrition": {
      "calories": 510,
      "protein": 42,
      "carbohydrates": 18,
      "fat": 28,
      "fiber": 1,
      "sodium": 760
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000029",
    "title": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong",
    "slug": "suon-cay-nuong-ngu-vi-bbq",
    "description": "Những dẻ sườn heo bản dài được ướp ngũ vị hương, mật ong và sốt BBQ đậm đà, nướng chậm đến khi thịt mềm mọng róc xương và bề mặt cháy cạnh hấp dẫn.",
    "prepTime": 30,
    "cookTime": 40,
    "totalTime": 70,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-01T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 38,
    "nutrition": {
      "calories": 590,
      "protein": 39,
      "carbohydrates": 22,
      "fat": 37,
      "fiber": 2,
      "sodium": 870
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000030",
    "title": "Nem Nướng Nha Trang Cuốn Bánh Tráng",
    "slug": "nem-nuong-nha-trang",
    "description": "Lụi nem thịt heo quết dẻo nướng vàng thơm lừng trên than hồng, cuốn cùng bánh tráng chiên giòn, xoài xanh, dưa leo, rau thơm và chấm sốt tương nếp thịt bằm béo bùi đặc trưng Nha Trang.",
    "prepTime": 35,
    "cookTime": 25,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Hard",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-02T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 12,
    "nutrition": {
      "calories": 530,
      "protein": 31,
      "carbohydrates": 49,
      "fat": 22,
      "fiber": 4,
      "sodium": 810
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000031",
    "title": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi",
    "slug": "tom-cang-xanh-nuong-pho-mai",
    "description": "Tôm càng xanh tươi sống chẻ đôi lưng được phủ lớp sốt bơ tỏi ngò tây và phô mai Mozzarella kéo sợi béo ngậy, nướng chín đỏ au giữ trọn vị ngọt chắc của thịt tôm.",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-03T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 15,
    "nutrition": {
      "calories": 460,
      "protein": 38,
      "carbohydrates": 8,
      "fat": 30,
      "fiber": 1,
      "sodium": 780
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000032",
    "title": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm",
    "slug": "cha-gio-re-tom-thit-khoai-mon",
    "description": "Từng cuốn chả giò (nem rán) vàng ươm với lớp vỏ bánh tráng rế giòn tan lâu ỉu, bao bọc phần nhân tôm tươi, thịt nạc vai, khoai môn bùi béo và mộc nhĩ thơm giòn.",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-04T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 18,
    "nutrition": {
      "calories": 490,
      "protein": 24,
      "carbohydrates": 42,
      "fat": 25,
      "fiber": 3,
      "sodium": 680
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000033",
    "title": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà",
    "slug": "canh-ga-chien-nuoc-mam-toi-ot",
    "description": "Cánh gà chiên lớp vỏ ngoài giòn nhẹ, bên trong thịt vẫn mềm ngọt, được xóc đều trong lớp sốt nước mắm đường tỏi ớt phi vàng thơm phức, mặn ngọt quyến rũ.",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-05T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 21,
    "nutrition": {
      "calories": 520,
      "protein": 33,
      "carbohydrates": 20,
      "fat": 34,
      "fiber": 1,
      "sodium": 840
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000034",
    "title": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt",
    "slug": "banh-xeo-mien-tay-tom-thit",
    "description": "Chiếc bánh xèo vàng nghệ vành mỏng giòn rụm thơm béo nước cốt dừa, bên trong đầy đặn nhân tôm đất, thịt ba chỉ, đậu xanh, củ hủ dừa và giá đỗ, cuốn cùng rau rừng tươi mát.",
    "prepTime": 25,
    "cookTime": 25,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-06T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 24,
    "nutrition": {
      "calories": 540,
      "protein": 26,
      "carbohydrates": 56,
      "fat": 23,
      "fiber": 5,
      "sodium": 750
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000035",
    "title": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội",
    "slug": "cha-ca-la-vong-thi-la",
    "description": "Đặc sản trứ danh đất Kinh Kỳ với những miếng cá lăng ướp riềng mẻ nghệ vàng ươm, nướng thơm rồi đảo trên chảo nóng cùng thật nhiều thì là, hành hoa, ăn kèm bún rối và lạc rang.",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-07T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 27,
    "nutrition": {
      "calories": 480,
      "protein": 36,
      "carbohydrates": 38,
      "fat": 20,
      "fiber": 3,
      "sodium": 770
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000036",
    "title": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen",
    "slug": "goi-cuon-tom-thit-cham-tuong",
    "description": "Những cuốn gỏi trong trẻo thấy rõ con tôm sú đỏ au bên cạnh lát thịt ba chỉ luộc mềm, bún tươi, hẹ xanh và rau thơm, chấm cùng chén tương đen xay bơ đậu phộng béo bùi.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-08T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 30,
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbohydrates": 42,
      "fat": 9,
      "fiber": 4,
      "sodium": 580
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000037",
    "title": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật",
    "slug": "goi-ngo-sen-tom-thit",
    "description": "Món khai vị tiệc cưới quốc dân với cọng ngó sen trắng ngần giòn sần sật, trộn thấm nước mắm cốt chanh chua ngọt cùng tôm sú, tai heo thái mỏng, cà rốt, rau răm và phồng tôm.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-09T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 33,
    "nutrition": {
      "calories": 330,
      "protein": 26,
      "carbohydrates": 28,
      "fat": 12,
      "fiber": 5,
      "sodium": 670
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000038",
    "title": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới",
    "slug": "nom-bo-kho-du-du-xanh",
    "description": "Món ăn vặt trứ danh phố cổ với sợi đu đủ xanh và cà rốt bào giòn sần sật, thịt bò khô xé sợi cay ngọt, lạc rang bùi béo và nước nộm chua thanh thơm nức rau kinh giới.",
    "prepTime": 20,
    "cookTime": 5,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-10T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 36,
    "nutrition": {
      "calories": 290,
      "protein": 18,
      "carbohydrates": 32,
      "fat": 10,
      "fiber": 5,
      "sodium": 640
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000039",
    "title": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành",
    "slug": "pho-cuon-thit-bo-ha-thanh",
    "description": "Đặc sản hồ Trúc Bạch với lá bánh phở vuông trắng mềm ôm trọn phần thịt bò xào tỏi nóng hổi, trứng chiên, cà rốt, dưa leo và các loại rau thơm chấm nước mắm đu đủ xanh.",
    "prepTime": 20,
    "cookTime": 10,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-11T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 39,
    "nutrition": {
      "calories": 380,
      "protein": 27,
      "carbohydrates": 44,
      "fat": 11,
      "fiber": 3,
      "sodium": 630
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000040",
    "title": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa",
    "slug": "lau-thai-hai-san-chua-cay",
    "description": "Nồi lẩu Thái Tomyum chua cay nồng nàn hương sả, riềng, lá chanh Kaffir và vị béo nhẹ của nước cốt dừa, nhúng kèm tôm sú, mực tươi, nghêu, thịt bò Mỹ và nấm kim châm.",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 6,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-12T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 13,
    "nutrition": {
      "calories": 510,
      "protein": 40,
      "carbohydrates": 45,
      "fat": 18,
      "fiber": 5,
      "sodium": 890
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000041",
    "title": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt",
    "slug": "lau-ga-la-e-phu-yen",
    "description": "Đặc sản trứ danh Phú Yên - Đà Lạt với thịt gà ta chặt miếng nấu cùng măng củ tươi giòn ngọt, ớt xiêm xanh cay the và lá é thơm mát hương sả chanh độc đáo.",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-13T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 16,
    "nutrition": {
      "calories": 470,
      "protein": 39,
      "carbohydrates": 36,
      "fat": 18,
      "fiber": 4,
      "sodium": 780
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000042",
    "title": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi",
    "slug": "ca-dieu-hong-hap-hong-kong",
    "description": "Cá diêu hồng tươi nguyên con được hấp cách thủy giữ trọn thớ thịt trắng ngần ngọt lịm, phủ đầy gừng tươi, hành lá, ớt thái chỉ và rưới sốt xì dầu Hồng Kông nóng hổi.",
    "prepTime": 20,
    "cookTime": 20,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-14T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 19,
    "nutrition": {
      "calories": 360,
      "protein": 38,
      "carbohydrates": 12,
      "fat": 16,
      "fiber": 2,
      "sodium": 750
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000043",
    "title": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng",
    "slug": "ngheu-hap-sa-ot-la-chanh",
    "description": "Thố nghêu hấp nóng hổi mở miệng đều tăm tắp, phần nước hấp chua cay ngọt lịm vị nghêu tự nhiên hòa quyện hương sả tươi, gừng, ớt hiểm và lá chanh xanh ngát.",
    "prepTime": 20,
    "cookTime": 10,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-15T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 22,
    "nutrition": {
      "calories": 240,
      "protein": 26,
      "carbohydrates": 14,
      "fat": 6,
      "fiber": 2,
      "sodium": 680
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000044",
    "title": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen",
    "slug": "dau-hu-kho-nam-rom-chay",
    "description": "Món kho chay thanh đạm nhưng cực kỳ đậm đà với những miếng đậu hũ chiên vàng thấm nước sốt tương tỏi hành boa-rô sánh kẹo cùng nấm rơm búp tròn ngọt giòn tự nhiên.",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-16T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 25,
    "nutrition": {
      "calories": 280,
      "protein": 18,
      "carbohydrates": 22,
      "fat": 14,
      "fiber": 4,
      "sodium": 610
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000045",
    "title": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát",
    "slug": "canh-nam-hat-sen-tao-do-chay",
    "description": "Tô canh chay dưỡng sinh trong vắt, kết hợp vị ngọt thanh từ bắp Mỹ, củ cải, hạt sen tươi bùi bở, táo đỏ, kỷ tử cùng các loại nấm đùi gà, nấm hương tươi giòn ngọt.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-17T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 28,
    "nutrition": {
      "calories": 220,
      "protein": 10,
      "carbohydrates": 36,
      "fat": 4,
      "fiber": 6,
      "sodium": 480
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000046",
    "title": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky",
    "slug": "bun-hue-chay-nam-dui-ga",
    "description": "Tô bún Huế chay thơm nức mùi sả và sa tế màu điều, nước dùng ngọt tự nhiên từ mía lau, củ đậu, táo, bắp ngọt cùng topping nấm đùi gà, chả chay, đậu hũ và tàu hũ ky chiên giòn.",
    "prepTime": 30,
    "cookTime": 45,
    "totalTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-18T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 31,
    "nutrition": {
      "calories": 420,
      "protein": 17,
      "carbohydrates": 58,
      "fat": 13,
      "fiber": 6,
      "sodium": 690
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000047",
    "title": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng",
    "slug": "goi-cuon-chay-sot-bo-dau-phong",
    "description": "Những cuốn gỏi chay tươi mát đầy màu sắc từ bắp cải tím, cà rốt, dưa leo, bơ sáp, đậu hũ chiên sả và bún tươi, chấm cùng sốt bơ đậu phộng tương đen béo ngậy.",
    "prepTime": 25,
    "cookTime": 10,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-19T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 34,
    "nutrition": {
      "calories": 320,
      "protein": 13,
      "carbohydrates": 40,
      "fat": 12,
      "fiber": 6,
      "sodium": 490
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000048",
    "title": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên",
    "slug": "che-hat-sen-long-nhan-hung-yen",
    "description": "Món chè cung đình thanh tao với từng hạt sen bở tơi bùi ngậy được lồng khéo léo trong cùi nhãn lồng Hưng Yên dày giòn ngọt lịm, ướp hương hoa nhài và đường phèn mát lành.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-20T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 37,
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbohydrates": 56,
      "fat": 2,
      "fiber": 4,
      "sodium": 45
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000049",
    "title": "Bánh Flan Trứng Sữa Caramel Mềm Mịn",
    "slug": "banh-flan-trung-sua-caramel",
    "description": "Chiếc bánh flan vàng óng núng nính, mặt cắt láng mịn không một vết rỗ tổ ong, béo thơm mùi trứng gà tươi và sữa tươi hòa quyện lớp sốt caramel hổ phách đắng nhẹ.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 6,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-21T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 40,
    "nutrition": {
      "calories": 245,
      "protein": 8,
      "carbohydrates": 32,
      "fat": 9,
      "fiber": 0,
      "sodium": 95
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000050",
    "title": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh",
    "slug": "che-khuc-bach-hanh-nhan",
    "description": "Những viên thạch khúc bạch phô mai kem tươi mềm tan nơi đầu lưỡi với 3 sắc màu tự nhiên (trắng sữa, xanh trà xanh, hồng dâu), dùng kèm nước đường phèn, nhãn tươi và hạnh nhân lát nướng giòn.",
    "prepTime": 25,
    "cookTime": 20,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-22T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 14,
    "nutrition": {
      "calories": 310,
      "protein": 7,
      "carbohydrates": 38,
      "fat": 15,
      "fiber": 2,
      "sodium": 80
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000051",
    "title": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa",
    "slug": "sua-chua-nep-cam-nuoc-cot-dua",
    "description": "Sự hòa quyện tuyệt vời giữa phần xôi nếp cẩm tím than dẻo bùi nấu lá dứa, nước cốt dừa béo thơm và sữa chua trắng mịn chua dịu mát lạnh tốt cho hệ tiêu hóa.",
    "prepTime": 20,
    "cookTime": 40,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-23T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 17,
    "nutrition": {
      "calories": 290,
      "protein": 8,
      "carbohydrates": 46,
      "fat": 9,
      "fiber": 4,
      "sodium": 65
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000052",
    "title": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt",
    "slug": "tra-dao-cam-sa-mat-ong",
    "description": "Ly trà đào cam sả mát lạnh chuẩn vị quán cà phê với nền hồng trà ủ sả tươi thơm dịu, vị chua ngọt thanh mát của cam vàng, mật ong và những miếng đào ngâm giòn ngọt.",
    "prepTime": 15,
    "cookTime": 10,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-24T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 20,
    "nutrition": {
      "calories": 145,
      "protein": 1,
      "carbohydrates": 35,
      "fat": 0,
      "fiber": 2,
      "sodium": 15
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000053",
    "title": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế",
    "slug": "ca-phe-muoi-kem-beo-hue",
    "description": "Thức uống gây thương nhớ từ cố đô Huế với cốt cà phê Robusta pha phin đậm đặc, hòa quyện lớp kem sữa mặn béo mịn màng làm tôn lên vị ngọt hậu và hương thơm nồng nàn của cà phê.",
    "prepTime": 10,
    "cookTime": 5,
    "totalTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-25T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 23,
    "nutrition": {
      "calories": 210,
      "protein": 3,
      "carbohydrates": 22,
      "fat": 12,
      "fiber": 0,
      "sodium": 380
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000054",
    "title": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô",
    "slug": "sinh-to-bo-sap-sua-dac",
    "description": "Ly sinh tố bơ sáp Đắk Lắk xanh mướt, sánh đặc mịn màng, béo ngậy hương sữa đặc và sữa tươi, điểm xuyết lớp dừa sấy giòn rụm và cơm dừa non hấp dẫn.",
    "prepTime": 10,
    "cookTime": 0,
    "totalTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-26T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 26,
    "nutrition": {
      "calories": 340,
      "protein": 6,
      "carbohydrates": 34,
      "fat": 21,
      "fiber": 7,
      "sodium": 65
    }
  },
  {
    "id": "22222222-2222-4222-8222-000000000055",
    "title": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox",
    "slug": "nuoc-ep-can-tay-tao-xanh-detox",
    "description": "Thức uống xanh thanh lọc cơ thể (Detox) giàu vitamin và chất chống oxy hóa, kết hợp cần tây tươi mát với vị ngọt dịu của táo xanh, dứa mật và hương gừng ấm nhẹ rất dễ uống.",
    "prepTime": 15,
    "cookTime": 0,
    "totalTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-27T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 29,
    "nutrition": {
      "calories": 115,
      "protein": 2,
      "carbohydrates": 27,
      "fat": 0,
      "fiber": 3,
      "sodium": 85
    }
  }
];

/**
 * Bản đồ chi tiết toàn bộ 55 công thức (tra cứu nhanh theo ID hoặc Slug)
 */
export const INITIAL_RECIPE_DETAILS: Record<string, RecipeDetailDto> = {
  "22222222-2222-4222-8222-000000000001": {
    "id": "22222222-2222-4222-8222-000000000001",
    "title": "Phở Bò Tái Nạm Truyền Thống Hà Nội",
    "slug": "pho-bo-tai-nam-ha-noi",
    "description": "Hương vị phở bò chuẩn Hà Thành với nước dùng ninh xương ống trong vắt, thơm dịu thảo quả, hoa hồi, quế chi hòa quyện cùng thịt bò tái mềm ngọt và nạm bò giòn béo.",
    "prepTime": 30,
    "cookTime": 120,
    "totalTime": 150,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-01T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 12,
    "nutrition": {
      "calories": 485,
      "protein": 34,
      "carbohydrates": 52,
      "fat": 14,
      "fiber": 3,
      "sodium": 820
    },
    "instructions": "Bước 1 (Sơ chế và chần xương bò): Rửa sạch xương ống bò và nạm bò với nước muối gừng. Cho xương vào nồi nước sôi chần kỹ 7 phút để loại bỏ hoàn toàn bọt bẩn và mùi gây, sau đó rửa lại bằng nước ấm.\nBước 2 (Nướng gia vị và ninh nước dùng): Nướng xém vỏ gừng, hành tím, hành tây rồi cạo rửa sạch. Rang thơm hoa hồi, thảo quả, thanh quế cho vào túi vải. Cho xương bò, nạm bò cùng nguyên liệu nướng vào nồi hầm lửa nhỏ trong 90 phút, thường xuyên hớt bọt để nước trong.\nBước 3 (Chế biến thịt bò và nêm nước phở): Vớt phần nạm bò đã chín mềm ra ngâm nước đá 5 phút rồi thái lát mỏng. Nêm nước mắm cốt, đường phèn và muối hạt vào nồi nước dùng cho vừa miệng. Thịt thăn bò thái lát mỏng, đập dập nhẹ cho mềm.\nBước 4 (Trình bày tô phở và thưởng thức): Trụng bánh phở qua nước sôi rồi xếp vào tô. Xếp nạm bò và thịt bò tái lên trên, rắc hành lá, hành tây thái mỏng và ngò gai. Chan nước dùng đang sôi thật ngập để làm chín tái thịt bò, thưởng thức nóng cùng quẩy giòn và tương ớt.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000001000001",
        "name": "Xương ống bò",
        "quantity": 1500,
        "unit": "g",
        "notes": "Chặt khúc, ngâm nước muối loãng khử mùi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000001000002",
        "name": "Thịt thăn bò tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Thái lát mỏng ngang thớ làm bò tái",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000001000003",
        "name": "Nạm bò ngon",
        "quantity": 400,
        "unit": "g",
        "notes": "Để nguyên khối luộc chín cùng nước phở",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000001000004",
        "name": "Bánh phở tươi",
        "quantity": 800,
        "unit": "g",
        "notes": "Trụng sơ nước sôi trước khi dùng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000001000005",
        "name": "Hành tây, gừng tươi, hành tím",
        "quantity": 200,
        "unit": "g",
        "notes": "Để nguyên vỏ nướng xém thơm",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000001000006",
        "name": "Quế chi, hoa hồi, thảo quả",
        "quantity": 25,
        "unit": "g",
        "notes": "Rang thơm, bọc trong túi vải lọc",
        "orderIndex": 6
      },
      {
        "id": "33333333-3333-4333-8333-000001000007",
        "name": "Hành lá, ngò gai, giá đỗ, chanh ớt",
        "quantity": 150,
        "unit": "g",
        "notes": "Rửa sạch, thái nhỏ ăn kèm",
        "orderIndex": 7
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000001000001",
        "stepNumber": 1,
        "title": "Sơ chế và chần xương bò",
        "description": "Rửa sạch xương ống bò và nạm bò với nước muối gừng. Cho xương vào nồi nước sôi chần kỹ 7 phút để loại bỏ hoàn toàn bọt bẩn và mùi gây, sau đó rửa lại bằng nước ấm.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000001000002",
        "stepNumber": 2,
        "title": "Nướng gia vị và ninh nước dùng",
        "description": "Nướng xém vỏ gừng, hành tím, hành tây rồi cạo rửa sạch. Rang thơm hoa hồi, thảo quả, thanh quế cho vào túi vải. Cho xương bò, nạm bò cùng nguyên liệu nướng vào nồi hầm lửa nhỏ trong 90 phút, thường xuyên hớt bọt để nước trong.",
        "timerMinutes": 90,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000001000003",
        "stepNumber": 3,
        "title": "Chế biến thịt bò và nêm nước phở",
        "description": "Vớt phần nạm bò đã chín mềm ra ngâm nước đá 5 phút rồi thái lát mỏng. Nêm nước mắm cốt, đường phèn và muối hạt vào nồi nước dùng cho vừa miệng. Thịt thăn bò thái lát mỏng, đập dập nhẹ cho mềm.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000001000004",
        "stepNumber": 4,
        "title": "Trình bày tô phở và thưởng thức",
        "description": "Trụng bánh phở qua nước sôi rồi xếp vào tô. Xếp nạm bò và thịt bò tái lên trên, rắc hành lá, hành tây thái mỏng và ngò gai. Chan nước dùng đang sôi thật ngập để làm chín tái thịt bò, thưởng thức nóng cùng quẩy giòn và tương ớt.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000001000001",
        "originalUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
        "altText": "Phở Bò Tái Nạm Truyền Thống Hà Nội",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000001000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Bò Tái Nạm Truyền Thống Hà Nội - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000001000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Bò Tái Nạm Truyền Thống Hà Nội - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "pho-bo-tai-nam-ha-noi": {
    "id": "22222222-2222-4222-8222-000000000001",
    "title": "Phở Bò Tái Nạm Truyền Thống Hà Nội",
    "slug": "pho-bo-tai-nam-ha-noi",
    "description": "Hương vị phở bò chuẩn Hà Thành với nước dùng ninh xương ống trong vắt, thơm dịu thảo quả, hoa hồi, quế chi hòa quyện cùng thịt bò tái mềm ngọt và nạm bò giòn béo.",
    "prepTime": 30,
    "cookTime": 120,
    "totalTime": 150,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-01T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 12,
    "nutrition": {
      "calories": 485,
      "protein": 34,
      "carbohydrates": 52,
      "fat": 14,
      "fiber": 3,
      "sodium": 820
    },
    "instructions": "Bước 1 (Sơ chế và chần xương bò): Rửa sạch xương ống bò và nạm bò với nước muối gừng. Cho xương vào nồi nước sôi chần kỹ 7 phút để loại bỏ hoàn toàn bọt bẩn và mùi gây, sau đó rửa lại bằng nước ấm.\nBước 2 (Nướng gia vị và ninh nước dùng): Nướng xém vỏ gừng, hành tím, hành tây rồi cạo rửa sạch. Rang thơm hoa hồi, thảo quả, thanh quế cho vào túi vải. Cho xương bò, nạm bò cùng nguyên liệu nướng vào nồi hầm lửa nhỏ trong 90 phút, thường xuyên hớt bọt để nước trong.\nBước 3 (Chế biến thịt bò và nêm nước phở): Vớt phần nạm bò đã chín mềm ra ngâm nước đá 5 phút rồi thái lát mỏng. Nêm nước mắm cốt, đường phèn và muối hạt vào nồi nước dùng cho vừa miệng. Thịt thăn bò thái lát mỏng, đập dập nhẹ cho mềm.\nBước 4 (Trình bày tô phở và thưởng thức): Trụng bánh phở qua nước sôi rồi xếp vào tô. Xếp nạm bò và thịt bò tái lên trên, rắc hành lá, hành tây thái mỏng và ngò gai. Chan nước dùng đang sôi thật ngập để làm chín tái thịt bò, thưởng thức nóng cùng quẩy giòn và tương ớt.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000001000001",
        "name": "Xương ống bò",
        "quantity": 1500,
        "unit": "g",
        "notes": "Chặt khúc, ngâm nước muối loãng khử mùi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000001000002",
        "name": "Thịt thăn bò tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Thái lát mỏng ngang thớ làm bò tái",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000001000003",
        "name": "Nạm bò ngon",
        "quantity": 400,
        "unit": "g",
        "notes": "Để nguyên khối luộc chín cùng nước phở",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000001000004",
        "name": "Bánh phở tươi",
        "quantity": 800,
        "unit": "g",
        "notes": "Trụng sơ nước sôi trước khi dùng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000001000005",
        "name": "Hành tây, gừng tươi, hành tím",
        "quantity": 200,
        "unit": "g",
        "notes": "Để nguyên vỏ nướng xém thơm",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000001000006",
        "name": "Quế chi, hoa hồi, thảo quả",
        "quantity": 25,
        "unit": "g",
        "notes": "Rang thơm, bọc trong túi vải lọc",
        "orderIndex": 6
      },
      {
        "id": "33333333-3333-4333-8333-000001000007",
        "name": "Hành lá, ngò gai, giá đỗ, chanh ớt",
        "quantity": 150,
        "unit": "g",
        "notes": "Rửa sạch, thái nhỏ ăn kèm",
        "orderIndex": 7
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000001000001",
        "stepNumber": 1,
        "title": "Sơ chế và chần xương bò",
        "description": "Rửa sạch xương ống bò và nạm bò với nước muối gừng. Cho xương vào nồi nước sôi chần kỹ 7 phút để loại bỏ hoàn toàn bọt bẩn và mùi gây, sau đó rửa lại bằng nước ấm.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000001000002",
        "stepNumber": 2,
        "title": "Nướng gia vị và ninh nước dùng",
        "description": "Nướng xém vỏ gừng, hành tím, hành tây rồi cạo rửa sạch. Rang thơm hoa hồi, thảo quả, thanh quế cho vào túi vải. Cho xương bò, nạm bò cùng nguyên liệu nướng vào nồi hầm lửa nhỏ trong 90 phút, thường xuyên hớt bọt để nước trong.",
        "timerMinutes": 90,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000001000003",
        "stepNumber": 3,
        "title": "Chế biến thịt bò và nêm nước phở",
        "description": "Vớt phần nạm bò đã chín mềm ra ngâm nước đá 5 phút rồi thái lát mỏng. Nêm nước mắm cốt, đường phèn và muối hạt vào nồi nước dùng cho vừa miệng. Thịt thăn bò thái lát mỏng, đập dập nhẹ cho mềm.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000001000004",
        "stepNumber": 4,
        "title": "Trình bày tô phở và thưởng thức",
        "description": "Trụng bánh phở qua nước sôi rồi xếp vào tô. Xếp nạm bò và thịt bò tái lên trên, rắc hành lá, hành tây thái mỏng và ngò gai. Chan nước dùng đang sôi thật ngập để làm chín tái thịt bò, thưởng thức nóng cùng quẩy giòn và tương ớt.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000001000001",
        "originalUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
        "altText": "Phở Bò Tái Nạm Truyền Thống Hà Nội",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000001000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Bò Tái Nạm Truyền Thống Hà Nội - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000001000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Bò Tái Nạm Truyền Thống Hà Nội - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000002": {
    "id": "22222222-2222-4222-8222-000000000002",
    "title": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô",
    "slug": "bun-bo-hue-gio-heo-co-do",
    "description": "Tô bún bò chuẩn vị xứ Huế với nước dùng đỏ cam bắt mắt từ dầu điều, dậy mùi sả tươi và mắm ruốc Huế đặc trưng, ăn kèm bắp bò hoa, giò heo mềm rục và chả cua thơm béo.",
    "prepTime": 40,
    "cookTime": 90,
    "totalTime": 130,
    "servings": 6,
    "difficulty": "Hard",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-02T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 15,
    "nutrition": {
      "calories": 560,
      "protein": 38,
      "carbohydrates": 56,
      "fat": 19,
      "fiber": 4,
      "sodium": 950
    },
    "instructions": "Bước 1 (Sơ chế giò heo và bắp bò): Chần sơ giò heo và bắp bò với nước sôi cùng chút muối và sả đập dập trong 5 phút để khử mùi hôi, sau đó vớt ra rửa sạch lại với nước lạnh.\nBước 2 (Hầm thịt và pha mắm ruốc Huế): Xếp sả cây đập dập dưới đáy nồi, cho bắp bò và giò heo vào hầm lửa vừa 60 phút. Hòa mắm ruốc Huế với 200ml nước lạnh, khuấy đều rồi để lắng, chỉ gạn lấy phần nước trong cho vào nồi hầm.\nBước 3 (Thắng sa tế màu điều và nêm nếm): Phi thơm hành tỏi băm và sả băm với dầu hạt điều màu, thêm ớt bột tạo màu đỏ cam óng ánh rồi đổ vào nồi nước dùng. Thả viên chả cua vào nấu chín nổi lên, nêm nước mắm, đường phèn cho đậm vị.\nBước 4 (Hoàn thiện tô bún bò Huế): Trụng bún sợi to cho vào tô, xếp lát bắp bò hoa, khoanh giò heo, chả cua, rắc hành tây và rau răm. Chan nước dùng sôi ngập bún và thưởng thức cùng rau chuối bào, chanh tươi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000002000001",
        "name": "Bắp bò hoa",
        "quantity": 600,
        "unit": "g",
        "notes": "Cuộn chỉ chặt để khi thái lát đẹp mắt",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000002000002",
        "name": "Chân giò heo trước",
        "quantity": 700,
        "unit": "g",
        "notes": "Chặt khoanh tròn vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000002000003",
        "name": "Chả cua Huế & chả lụa",
        "quantity": 300,
        "unit": "g",
        "notes": "Nặn viên tròn hoặc cắt lát",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000002000004",
        "name": "Bún sợi to truyền thống",
        "quantity": 1000,
        "unit": "g",
        "notes": "Trụng nước ấm để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000002000005",
        "name": "Mắm ruốc Huế nguyên chất",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Hòa tan với nước lạnh, lắng lấy nước trong",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000002000006",
        "name": "Sả cây, gừng, tỏi, ớt, hạt điều màu",
        "quantity": 150,
        "unit": "g",
        "notes": "Đập dập sả, thắng dầu màu điều",
        "orderIndex": 6
      },
      {
        "id": "33333333-3333-4333-8333-000002000007",
        "name": "Bắp chuối bào, rau muống chẻ, giá, rau răm",
        "quantity": 250,
        "unit": "g",
        "notes": "Ngâm nước chanh loãng cho trắng giòn",
        "orderIndex": 7
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000002000001",
        "stepNumber": 1,
        "title": "Sơ chế giò heo và bắp bò",
        "description": "Chần sơ giò heo và bắp bò với nước sôi cùng chút muối và sả đập dập trong 5 phút để khử mùi hôi, sau đó vớt ra rửa sạch lại với nước lạnh.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000002000002",
        "stepNumber": 2,
        "title": "Hầm thịt và pha mắm ruốc Huế",
        "description": "Xếp sả cây đập dập dưới đáy nồi, cho bắp bò và giò heo vào hầm lửa vừa 60 phút. Hòa mắm ruốc Huế với 200ml nước lạnh, khuấy đều rồi để lắng, chỉ gạn lấy phần nước trong cho vào nồi hầm.",
        "timerMinutes": 60,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000002000003",
        "stepNumber": 3,
        "title": "Thắng sa tế màu điều và nêm nếm",
        "description": "Phi thơm hành tỏi băm và sả băm với dầu hạt điều màu, thêm ớt bột tạo màu đỏ cam óng ánh rồi đổ vào nồi nước dùng. Thả viên chả cua vào nấu chín nổi lên, nêm nước mắm, đường phèn cho đậm vị.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000002000004",
        "stepNumber": 4,
        "title": "Hoàn thiện tô bún bò Huế",
        "description": "Trụng bún sợi to cho vào tô, xếp lát bắp bò hoa, khoanh giò heo, chả cua, rắc hành tây và rau răm. Chan nước dùng sôi ngập bún và thưởng thức cùng rau chuối bào, chanh tươi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000002000001",
        "originalUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000002000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000002000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "bun-bo-hue-gio-heo-co-do": {
    "id": "22222222-2222-4222-8222-000000000002",
    "title": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô",
    "slug": "bun-bo-hue-gio-heo-co-do",
    "description": "Tô bún bò chuẩn vị xứ Huế với nước dùng đỏ cam bắt mắt từ dầu điều, dậy mùi sả tươi và mắm ruốc Huế đặc trưng, ăn kèm bắp bò hoa, giò heo mềm rục và chả cua thơm béo.",
    "prepTime": 40,
    "cookTime": 90,
    "totalTime": 130,
    "servings": 6,
    "difficulty": "Hard",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-02T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 15,
    "nutrition": {
      "calories": 560,
      "protein": 38,
      "carbohydrates": 56,
      "fat": 19,
      "fiber": 4,
      "sodium": 950
    },
    "instructions": "Bước 1 (Sơ chế giò heo và bắp bò): Chần sơ giò heo và bắp bò với nước sôi cùng chút muối và sả đập dập trong 5 phút để khử mùi hôi, sau đó vớt ra rửa sạch lại với nước lạnh.\nBước 2 (Hầm thịt và pha mắm ruốc Huế): Xếp sả cây đập dập dưới đáy nồi, cho bắp bò và giò heo vào hầm lửa vừa 60 phút. Hòa mắm ruốc Huế với 200ml nước lạnh, khuấy đều rồi để lắng, chỉ gạn lấy phần nước trong cho vào nồi hầm.\nBước 3 (Thắng sa tế màu điều và nêm nếm): Phi thơm hành tỏi băm và sả băm với dầu hạt điều màu, thêm ớt bột tạo màu đỏ cam óng ánh rồi đổ vào nồi nước dùng. Thả viên chả cua vào nấu chín nổi lên, nêm nước mắm, đường phèn cho đậm vị.\nBước 4 (Hoàn thiện tô bún bò Huế): Trụng bún sợi to cho vào tô, xếp lát bắp bò hoa, khoanh giò heo, chả cua, rắc hành tây và rau răm. Chan nước dùng sôi ngập bún và thưởng thức cùng rau chuối bào, chanh tươi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000002000001",
        "name": "Bắp bò hoa",
        "quantity": 600,
        "unit": "g",
        "notes": "Cuộn chỉ chặt để khi thái lát đẹp mắt",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000002000002",
        "name": "Chân giò heo trước",
        "quantity": 700,
        "unit": "g",
        "notes": "Chặt khoanh tròn vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000002000003",
        "name": "Chả cua Huế & chả lụa",
        "quantity": 300,
        "unit": "g",
        "notes": "Nặn viên tròn hoặc cắt lát",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000002000004",
        "name": "Bún sợi to truyền thống",
        "quantity": 1000,
        "unit": "g",
        "notes": "Trụng nước ấm để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000002000005",
        "name": "Mắm ruốc Huế nguyên chất",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Hòa tan với nước lạnh, lắng lấy nước trong",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000002000006",
        "name": "Sả cây, gừng, tỏi, ớt, hạt điều màu",
        "quantity": 150,
        "unit": "g",
        "notes": "Đập dập sả, thắng dầu màu điều",
        "orderIndex": 6
      },
      {
        "id": "33333333-3333-4333-8333-000002000007",
        "name": "Bắp chuối bào, rau muống chẻ, giá, rau răm",
        "quantity": 250,
        "unit": "g",
        "notes": "Ngâm nước chanh loãng cho trắng giòn",
        "orderIndex": 7
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000002000001",
        "stepNumber": 1,
        "title": "Sơ chế giò heo và bắp bò",
        "description": "Chần sơ giò heo và bắp bò với nước sôi cùng chút muối và sả đập dập trong 5 phút để khử mùi hôi, sau đó vớt ra rửa sạch lại với nước lạnh.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000002000002",
        "stepNumber": 2,
        "title": "Hầm thịt và pha mắm ruốc Huế",
        "description": "Xếp sả cây đập dập dưới đáy nồi, cho bắp bò và giò heo vào hầm lửa vừa 60 phút. Hòa mắm ruốc Huế với 200ml nước lạnh, khuấy đều rồi để lắng, chỉ gạn lấy phần nước trong cho vào nồi hầm.",
        "timerMinutes": 60,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000002000003",
        "stepNumber": 3,
        "title": "Thắng sa tế màu điều và nêm nếm",
        "description": "Phi thơm hành tỏi băm và sả băm với dầu hạt điều màu, thêm ớt bột tạo màu đỏ cam óng ánh rồi đổ vào nồi nước dùng. Thả viên chả cua vào nấu chín nổi lên, nêm nước mắm, đường phèn cho đậm vị.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000002000004",
        "stepNumber": 4,
        "title": "Hoàn thiện tô bún bò Huế",
        "description": "Trụng bún sợi to cho vào tô, xếp lát bắp bò hoa, khoanh giò heo, chả cua, rắc hành tây và rau răm. Chan nước dùng sôi ngập bún và thưởng thức cùng rau chuối bào, chanh tươi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000002000001",
        "originalUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000002000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000002000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Bò Huế Giò Heo Đậm Đà Cố Đô - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000003": {
    "id": "22222222-2222-4222-8222-000000000003",
    "title": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ",
    "slug": "bun-rieu-cua-dong-bap-bo",
    "description": "Tô bún riêu cua đồng dân dã với gạch cua đóng tảng béo ngậy, vị chua dịu thanh thoát từ giấm bỗng và cà chua chín mọng, kết hợp đậu hũ chiên vàng và bắp bò tươi.",
    "prepTime": 35,
    "cookTime": 45,
    "totalTime": 80,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-03T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 18,
    "nutrition": {
      "calories": 440,
      "protein": 29,
      "carbohydrates": 48,
      "fat": 13,
      "fiber": 4,
      "sodium": 780
    },
    "instructions": "Bước 1 (Lọc cua đồng và chưng gạch cua): Hòa thịt cua đồng xay với 1.5 lít nước và 1 muỗng cà phê muối, bóp nhẹ rồi lọc qua rây 2 lần để loại bỏ hoàn toàn mảnh vỏ. Phi thơm hành tím băm, cho phần gạch cua vào xào nhanh tay rồi múc ra bát riêng.\nBước 2 (Nấu đông tảng riêu cua): Bắc nồi nước lọc cua lên bếp đun lửa vừa, khuấy nhẹ theo một chiều. Khi nước ấm dần và thịt cua kết tủa nổi lên thành tảng riêu dày thì hạ nhỏ lửa, dùng muôi vớt riêu cua ra đĩa để không bị vỡ.\nBước 3 (Xào cà chua và hoàn thiện nước dùng): Xào mềm cà chua bổ múi cau với chút dầu màu điều, trút vào nồi nước riêu. Nêm giấm bỗng, nước mắm, chút mắm tôm và đường phèn, thả đậu hũ chiên vào đun sôi nhẹ 10 phút.\nBước 4 (Trình bày bún riêu cua đồng): Cho bún tươi vào tô, trụng chín bắp bò xếp lên cùng tảng riêu cua, đậu hũ, cà chua và rưới gạch cua chưng hành phi lên mặt. Chan nước dùng nóng hổi, ăn kèm rau kinh giới và tía tô.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000003000001",
        "name": "Cua đồng xay nhuyễn",
        "quantity": 500,
        "unit": "g",
        "notes": "Tách riêng gạch cua và lọc kỹ lấy nước thịt cua",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000003000002",
        "name": "Bắp bò tươi thái mỏng",
        "quantity": 250,
        "unit": "g",
        "notes": "Ướp chút tiêu và gừng băm",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000003000003",
        "name": "Đậu hũ trắng chiên phồng",
        "quantity": 3,
        "unit": "miếng",
        "notes": "Cắt khối vuông vừa ăn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000003000004",
        "name": "Cà chua chín đỏ",
        "quantity": 4,
        "unit": "quả",
        "notes": "Bổ múi cau xào tạo màu",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000003000005",
        "name": "Giấm bỗng nếp & mắm tôm",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo vị chua thanh và hương thơm đặc trưng",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000003000006",
        "name": "Bún rối tươi",
        "quantity": 800,
        "unit": "g",
        "notes": "Trụng sơ nước sôi",
        "orderIndex": 6
      },
      {
        "id": "33333333-3333-4333-8333-000003000007",
        "name": "Rau sống kinh giới, tía tô, xà lách, hoa chuối",
        "quantity": 200,
        "unit": "g",
        "notes": "Rửa sạch để ráo ăn kèm",
        "orderIndex": 7
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000003000001",
        "stepNumber": 1,
        "title": "Lọc cua đồng và chưng gạch cua",
        "description": "Hòa thịt cua đồng xay với 1.5 lít nước và 1 muỗng cà phê muối, bóp nhẹ rồi lọc qua rây 2 lần để loại bỏ hoàn toàn mảnh vỏ. Phi thơm hành tím băm, cho phần gạch cua vào xào nhanh tay rồi múc ra bát riêng.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000003000002",
        "stepNumber": 2,
        "title": "Nấu đông tảng riêu cua",
        "description": "Bắc nồi nước lọc cua lên bếp đun lửa vừa, khuấy nhẹ theo một chiều. Khi nước ấm dần và thịt cua kết tủa nổi lên thành tảng riêu dày thì hạ nhỏ lửa, dùng muôi vớt riêu cua ra đĩa để không bị vỡ.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000003000003",
        "stepNumber": 3,
        "title": "Xào cà chua và hoàn thiện nước dùng",
        "description": "Xào mềm cà chua bổ múi cau với chút dầu màu điều, trút vào nồi nước riêu. Nêm giấm bỗng, nước mắm, chút mắm tôm và đường phèn, thả đậu hũ chiên vào đun sôi nhẹ 10 phút.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000003000004",
        "stepNumber": 4,
        "title": "Trình bày bún riêu cua đồng",
        "description": "Cho bún tươi vào tô, trụng chín bắp bò xếp lên cùng tảng riêu cua, đậu hũ, cà chua và rưới gạch cua chưng hành phi lên mặt. Chan nước dùng nóng hổi, ăn kèm rau kinh giới và tía tô.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000003000001",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000003000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000003000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "bun-rieu-cua-dong-bap-bo": {
    "id": "22222222-2222-4222-8222-000000000003",
    "title": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ",
    "slug": "bun-rieu-cua-dong-bap-bo",
    "description": "Tô bún riêu cua đồng dân dã với gạch cua đóng tảng béo ngậy, vị chua dịu thanh thoát từ giấm bỗng và cà chua chín mọng, kết hợp đậu hũ chiên vàng và bắp bò tươi.",
    "prepTime": 35,
    "cookTime": 45,
    "totalTime": 80,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-03T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 18,
    "nutrition": {
      "calories": 440,
      "protein": 29,
      "carbohydrates": 48,
      "fat": 13,
      "fiber": 4,
      "sodium": 780
    },
    "instructions": "Bước 1 (Lọc cua đồng và chưng gạch cua): Hòa thịt cua đồng xay với 1.5 lít nước và 1 muỗng cà phê muối, bóp nhẹ rồi lọc qua rây 2 lần để loại bỏ hoàn toàn mảnh vỏ. Phi thơm hành tím băm, cho phần gạch cua vào xào nhanh tay rồi múc ra bát riêng.\nBước 2 (Nấu đông tảng riêu cua): Bắc nồi nước lọc cua lên bếp đun lửa vừa, khuấy nhẹ theo một chiều. Khi nước ấm dần và thịt cua kết tủa nổi lên thành tảng riêu dày thì hạ nhỏ lửa, dùng muôi vớt riêu cua ra đĩa để không bị vỡ.\nBước 3 (Xào cà chua và hoàn thiện nước dùng): Xào mềm cà chua bổ múi cau với chút dầu màu điều, trút vào nồi nước riêu. Nêm giấm bỗng, nước mắm, chút mắm tôm và đường phèn, thả đậu hũ chiên vào đun sôi nhẹ 10 phút.\nBước 4 (Trình bày bún riêu cua đồng): Cho bún tươi vào tô, trụng chín bắp bò xếp lên cùng tảng riêu cua, đậu hũ, cà chua và rưới gạch cua chưng hành phi lên mặt. Chan nước dùng nóng hổi, ăn kèm rau kinh giới và tía tô.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000003000001",
        "name": "Cua đồng xay nhuyễn",
        "quantity": 500,
        "unit": "g",
        "notes": "Tách riêng gạch cua và lọc kỹ lấy nước thịt cua",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000003000002",
        "name": "Bắp bò tươi thái mỏng",
        "quantity": 250,
        "unit": "g",
        "notes": "Ướp chút tiêu và gừng băm",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000003000003",
        "name": "Đậu hũ trắng chiên phồng",
        "quantity": 3,
        "unit": "miếng",
        "notes": "Cắt khối vuông vừa ăn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000003000004",
        "name": "Cà chua chín đỏ",
        "quantity": 4,
        "unit": "quả",
        "notes": "Bổ múi cau xào tạo màu",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000003000005",
        "name": "Giấm bỗng nếp & mắm tôm",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo vị chua thanh và hương thơm đặc trưng",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000003000006",
        "name": "Bún rối tươi",
        "quantity": 800,
        "unit": "g",
        "notes": "Trụng sơ nước sôi",
        "orderIndex": 6
      },
      {
        "id": "33333333-3333-4333-8333-000003000007",
        "name": "Rau sống kinh giới, tía tô, xà lách, hoa chuối",
        "quantity": 200,
        "unit": "g",
        "notes": "Rửa sạch để ráo ăn kèm",
        "orderIndex": 7
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000003000001",
        "stepNumber": 1,
        "title": "Lọc cua đồng và chưng gạch cua",
        "description": "Hòa thịt cua đồng xay với 1.5 lít nước và 1 muỗng cà phê muối, bóp nhẹ rồi lọc qua rây 2 lần để loại bỏ hoàn toàn mảnh vỏ. Phi thơm hành tím băm, cho phần gạch cua vào xào nhanh tay rồi múc ra bát riêng.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000003000002",
        "stepNumber": 2,
        "title": "Nấu đông tảng riêu cua",
        "description": "Bắc nồi nước lọc cua lên bếp đun lửa vừa, khuấy nhẹ theo một chiều. Khi nước ấm dần và thịt cua kết tủa nổi lên thành tảng riêu dày thì hạ nhỏ lửa, dùng muôi vớt riêu cua ra đĩa để không bị vỡ.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000003000003",
        "stepNumber": 3,
        "title": "Xào cà chua và hoàn thiện nước dùng",
        "description": "Xào mềm cà chua bổ múi cau với chút dầu màu điều, trút vào nồi nước riêu. Nêm giấm bỗng, nước mắm, chút mắm tôm và đường phèn, thả đậu hũ chiên vào đun sôi nhẹ 10 phút.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000003000004",
        "stepNumber": 4,
        "title": "Trình bày bún riêu cua đồng",
        "description": "Cho bún tươi vào tô, trụng chín bắp bò xếp lên cùng tảng riêu cua, đậu hũ, cà chua và rưới gạch cua chưng hành phi lên mặt. Chan nước dùng nóng hổi, ăn kèm rau kinh giới và tía tô.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000003000001",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000003000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000003000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000004": {
    "id": "22222222-2222-4222-8222-000000000004",
    "title": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong",
    "slug": "hu-tieu-nam-vang-tom-thit",
    "description": "Sợi hủ tiếu dai mềm kết hợp nước lèo hầm xương heo cùng mực khô, tôm khô ngọt lịm tự nhiên, đầy đặn topping tôm sú tươi, thịt bằm, trứng cút và tỏi phi vàng giòn.",
    "prepTime": 30,
    "cookTime": 75,
    "totalTime": 105,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-04T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 21,
    "nutrition": {
      "calories": 470,
      "protein": 32,
      "carbohydrates": 54,
      "fat": 12,
      "fiber": 3,
      "sodium": 760
    },
    "instructions": "Bước 1 (Ninh xương cùng mực khô và củ cải): Chần sạch xương ống heo rồi cho vào nồi hầm cùng củ cải trắng, mực khô nướng và tôm khô trên lửa nhỏ 60 phút. Thả miếng thịt nạc thăn vào luộc chín khoảng 20 phút rồi vớt ra thái lát.\nBước 2 (Xào thịt bằm và luộc tôm sú): Phi thơm tỏi băm với dầu ăn, vớt 1 phần tỏi vàng ra để riêng, phần còn lại cho thịt heo xay vào đảo chín tơi với chút nước mắm và tiêu. Tôm sú luộc chín đỏ trong nồi nước dùng rồi vớt ra.\nBước 3 (Trụng sợi hủ tiếu trộn dầu tỏi): Đun sôi nồi nước riêng, trụng nhanh sợi hủ tiếu khoảng 20 giây cho mềm dai rồi vớt ra tô, rưới nửa muỗng dầu tỏi phi trộn đều để sợi hủ tiếu bóng mượt không bị dính.\nBước 4 (Trình bày và chan nước lèo): Xếp tôm sú, thịt nạc thái lát, thịt bằm, trứng cút, hẹ cắt khúc và cần tàu lên mặt tô hủ tiếu. Rắc nhiều tỏi phi vàng giòn rồi chan nước lèo trong vắt đang sôi vào thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000004000001",
        "name": "Xương ống heo & thịt nạc thăn",
        "quantity": 1000,
        "unit": "g",
        "notes": "Xương hầm nước lèo, nạc thăn luộc thái lát",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000004000002",
        "name": "Tôm sú tươi & thịt heo xay",
        "quantity": 400,
        "unit": "g",
        "notes": "Tôm bóc vỏ chừa đuôi, thịt xay xào săn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000004000003",
        "name": "Trứng cút luộc bóc vỏ",
        "quantity": 12,
        "unit": "quả",
        "notes": "Luộc chín bóc sạch vỏ",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000004000004",
        "name": "Mực khô nướng & tôm khô",
        "quantity": 50,
        "unit": "g",
        "notes": "Nướng thơm mực khô giúp nước dùng ngọt thanh",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000004000005",
        "name": "Sợi hủ tiếu dai Nam Vang",
        "quantity": 600,
        "unit": "g",
        "notes": "Trụng nhanh rồi trộn chút dầu tỏi phi",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000004000006",
        "name": "Củ cải trắng, cà rốt, cần tàu, hẹ",
        "quantity": 250,
        "unit": "g",
        "notes": "Hầm lấy vị ngọt tự nhiên cho nước dùng",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000004000001",
        "stepNumber": 1,
        "title": "Ninh xương cùng mực khô và củ cải",
        "description": "Chần sạch xương ống heo rồi cho vào nồi hầm cùng củ cải trắng, mực khô nướng và tôm khô trên lửa nhỏ 60 phút. Thả miếng thịt nạc thăn vào luộc chín khoảng 20 phút rồi vớt ra thái lát.",
        "timerMinutes": 60,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000004000002",
        "stepNumber": 2,
        "title": "Xào thịt bằm và luộc tôm sú",
        "description": "Phi thơm tỏi băm với dầu ăn, vớt 1 phần tỏi vàng ra để riêng, phần còn lại cho thịt heo xay vào đảo chín tơi với chút nước mắm và tiêu. Tôm sú luộc chín đỏ trong nồi nước dùng rồi vớt ra.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000004000003",
        "stepNumber": 3,
        "title": "Trụng sợi hủ tiếu trộn dầu tỏi",
        "description": "Đun sôi nồi nước riêng, trụng nhanh sợi hủ tiếu khoảng 20 giây cho mềm dai rồi vớt ra tô, rưới nửa muỗng dầu tỏi phi trộn đều để sợi hủ tiếu bóng mượt không bị dính.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000004000004",
        "stepNumber": 4,
        "title": "Trình bày và chan nước lèo",
        "description": "Xếp tôm sú, thịt nạc thái lát, thịt bằm, trứng cút, hẹ cắt khúc và cần tàu lên mặt tô hủ tiếu. Rắc nhiều tỏi phi vàng giòn rồi chan nước lèo trong vắt đang sôi vào thưởng thức.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000004000001",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "altText": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000004000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000004000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "hu-tieu-nam-vang-tom-thit": {
    "id": "22222222-2222-4222-8222-000000000004",
    "title": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong",
    "slug": "hu-tieu-nam-vang-tom-thit",
    "description": "Sợi hủ tiếu dai mềm kết hợp nước lèo hầm xương heo cùng mực khô, tôm khô ngọt lịm tự nhiên, đầy đặn topping tôm sú tươi, thịt bằm, trứng cút và tỏi phi vàng giòn.",
    "prepTime": 30,
    "cookTime": 75,
    "totalTime": 105,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-04T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 21,
    "nutrition": {
      "calories": 470,
      "protein": 32,
      "carbohydrates": 54,
      "fat": 12,
      "fiber": 3,
      "sodium": 760
    },
    "instructions": "Bước 1 (Ninh xương cùng mực khô và củ cải): Chần sạch xương ống heo rồi cho vào nồi hầm cùng củ cải trắng, mực khô nướng và tôm khô trên lửa nhỏ 60 phút. Thả miếng thịt nạc thăn vào luộc chín khoảng 20 phút rồi vớt ra thái lát.\nBước 2 (Xào thịt bằm và luộc tôm sú): Phi thơm tỏi băm với dầu ăn, vớt 1 phần tỏi vàng ra để riêng, phần còn lại cho thịt heo xay vào đảo chín tơi với chút nước mắm và tiêu. Tôm sú luộc chín đỏ trong nồi nước dùng rồi vớt ra.\nBước 3 (Trụng sợi hủ tiếu trộn dầu tỏi): Đun sôi nồi nước riêng, trụng nhanh sợi hủ tiếu khoảng 20 giây cho mềm dai rồi vớt ra tô, rưới nửa muỗng dầu tỏi phi trộn đều để sợi hủ tiếu bóng mượt không bị dính.\nBước 4 (Trình bày và chan nước lèo): Xếp tôm sú, thịt nạc thái lát, thịt bằm, trứng cút, hẹ cắt khúc và cần tàu lên mặt tô hủ tiếu. Rắc nhiều tỏi phi vàng giòn rồi chan nước lèo trong vắt đang sôi vào thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000004000001",
        "name": "Xương ống heo & thịt nạc thăn",
        "quantity": 1000,
        "unit": "g",
        "notes": "Xương hầm nước lèo, nạc thăn luộc thái lát",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000004000002",
        "name": "Tôm sú tươi & thịt heo xay",
        "quantity": 400,
        "unit": "g",
        "notes": "Tôm bóc vỏ chừa đuôi, thịt xay xào săn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000004000003",
        "name": "Trứng cút luộc bóc vỏ",
        "quantity": 12,
        "unit": "quả",
        "notes": "Luộc chín bóc sạch vỏ",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000004000004",
        "name": "Mực khô nướng & tôm khô",
        "quantity": 50,
        "unit": "g",
        "notes": "Nướng thơm mực khô giúp nước dùng ngọt thanh",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000004000005",
        "name": "Sợi hủ tiếu dai Nam Vang",
        "quantity": 600,
        "unit": "g",
        "notes": "Trụng nhanh rồi trộn chút dầu tỏi phi",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000004000006",
        "name": "Củ cải trắng, cà rốt, cần tàu, hẹ",
        "quantity": 250,
        "unit": "g",
        "notes": "Hầm lấy vị ngọt tự nhiên cho nước dùng",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000004000001",
        "stepNumber": 1,
        "title": "Ninh xương cùng mực khô và củ cải",
        "description": "Chần sạch xương ống heo rồi cho vào nồi hầm cùng củ cải trắng, mực khô nướng và tôm khô trên lửa nhỏ 60 phút. Thả miếng thịt nạc thăn vào luộc chín khoảng 20 phút rồi vớt ra thái lát.",
        "timerMinutes": 60,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000004000002",
        "stepNumber": 2,
        "title": "Xào thịt bằm và luộc tôm sú",
        "description": "Phi thơm tỏi băm với dầu ăn, vớt 1 phần tỏi vàng ra để riêng, phần còn lại cho thịt heo xay vào đảo chín tơi với chút nước mắm và tiêu. Tôm sú luộc chín đỏ trong nồi nước dùng rồi vớt ra.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000004000003",
        "stepNumber": 3,
        "title": "Trụng sợi hủ tiếu trộn dầu tỏi",
        "description": "Đun sôi nồi nước riêng, trụng nhanh sợi hủ tiếu khoảng 20 giây cho mềm dai rồi vớt ra tô, rưới nửa muỗng dầu tỏi phi trộn đều để sợi hủ tiếu bóng mượt không bị dính.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000004000004",
        "stepNumber": 4,
        "title": "Trình bày và chan nước lèo",
        "description": "Xếp tôm sú, thịt nạc thái lát, thịt bằm, trứng cút, hẹ cắt khúc và cần tàu lên mặt tô hủ tiếu. Rắc nhiều tỏi phi vàng giòn rồi chan nước lèo trong vắt đang sôi vào thưởng thức.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000004000001",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "altText": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000004000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000004000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000005": {
    "id": "22222222-2222-4222-8222-000000000005",
    "title": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng",
    "slug": "mi-quang-tom-thit-trung-cut",
    "description": "Món mì trứ danh miền Trung với sợi mì nghệ vàng ươm, phần nước nhân tôm thịt rim dầu điều sánh đậm chan xâm xấp, ăn kèm bánh đa nướng giòn rụm và đậu phộng rang.",
    "prepTime": 25,
    "cookTime": 40,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-05T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 24,
    "nutrition": {
      "calories": 510,
      "protein": 31,
      "carbohydrates": 55,
      "fat": 17,
      "fiber": 4,
      "sodium": 790
    },
    "instructions": "Bước 1 (Ướp tôm thịt với củ nén và nghệ): Ướp thịt ba chỉ và tôm tươi với củ nén giã dập, nước cốt nghệ tươi, nước mắm, tiêu và chút đường trong 20 phút cho thấm vị đặc trưng xứ Quảng.\nBước 2 (Rim nhân tôm thịt và nước nhưn): Phi thơm củ nén với dầu hạt điều màu, cho thịt ba chỉ vào xào săn trước rồi cho tôm và trứng cút vào đảo đều. Chế 600ml nước dùng xương hoặc nước dừa tươi vào rim lửa vừa 25 phút cho nước sánh đậm.\nBước 3 (Chuẩn bị rau sống và sợi mì): Xếp lớp rau sống tươi (cải con, xà lách, bắp chuối bào) dưới đáy tô, sau đó rải sợi mì Quảng lên trên.\nBước 4 (Chan nước nhưn xâm xấp và thưởng thức): Xếp tôm, thịt ba chỉ, trứng cút lên mặt mì, chan nước nhưn đậm đà vừa xâm xấp sợi mì. Rắc đậu phộng rang, hành lá và bẻ bánh tráng mè nướng giòn ăn kèm ớt xanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000005000001",
        "name": "Sợi mì Quảng tươi",
        "quantity": 800,
        "unit": "g",
        "notes": "Tơi sợi mì trước khi bày ra tô",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000005000002",
        "name": "Thịt ba chỉ heo & tôm đất tươi",
        "quantity": 600,
        "unit": "g",
        "notes": "Thịt thái miếng mỏng, tôm cắt râu rửa sạch",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000005000003",
        "name": "Trứng cút luộc",
        "quantity": 12,
        "unit": "quả",
        "notes": "Bóc vỏ kho cùng thịt tôm",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000005000004",
        "name": "Củ nén (hành tăm), nghệ tươi, dầu điều",
        "quantity": 60,
        "unit": "g",
        "notes": "Giã nhuyễn ướp thịt và phi thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000005000005",
        "name": "Đậu phộng rang & bánh tráng mè nướng",
        "quantity": 150,
        "unit": "g",
        "notes": "Đập dập đậu phộng, bẻ miếng bánh đa",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000005000006",
        "name": "Bắp chuối bào, cải con, rau húng, ớt xanh",
        "quantity": 200,
        "unit": "g",
        "notes": "Rửa sạch để ráo lót đáy tô",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000005000001",
        "stepNumber": 1,
        "title": "Ướp tôm thịt với củ nén và nghệ",
        "description": "Ướp thịt ba chỉ và tôm tươi với củ nén giã dập, nước cốt nghệ tươi, nước mắm, tiêu và chút đường trong 20 phút cho thấm vị đặc trưng xứ Quảng.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000005000002",
        "stepNumber": 2,
        "title": "Rim nhân tôm thịt và nước nhưn",
        "description": "Phi thơm củ nén với dầu hạt điều màu, cho thịt ba chỉ vào xào săn trước rồi cho tôm và trứng cút vào đảo đều. Chế 600ml nước dùng xương hoặc nước dừa tươi vào rim lửa vừa 25 phút cho nước sánh đậm.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000005000003",
        "stepNumber": 3,
        "title": "Chuẩn bị rau sống và sợi mì",
        "description": "Xếp lớp rau sống tươi (cải con, xà lách, bắp chuối bào) dưới đáy tô, sau đó rải sợi mì Quảng lên trên.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000005000004",
        "stepNumber": 4,
        "title": "Chan nước nhưn xâm xấp và thưởng thức",
        "description": "Xếp tôm, thịt ba chỉ, trứng cút lên mặt mì, chan nước nhưn đậm đà vừa xâm xấp sợi mì. Rắc đậu phộng rang, hành lá và bẻ bánh tráng mè nướng giòn ăn kèm ớt xanh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000005000001",
        "originalUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "altText": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000005000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000005000003",
        "originalUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
        "altText": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "mi-quang-tom-thit-trung-cut": {
    "id": "22222222-2222-4222-8222-000000000005",
    "title": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng",
    "slug": "mi-quang-tom-thit-trung-cut",
    "description": "Món mì trứ danh miền Trung với sợi mì nghệ vàng ươm, phần nước nhân tôm thịt rim dầu điều sánh đậm chan xâm xấp, ăn kèm bánh đa nướng giòn rụm và đậu phộng rang.",
    "prepTime": 25,
    "cookTime": 40,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-05T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 24,
    "nutrition": {
      "calories": 510,
      "protein": 31,
      "carbohydrates": 55,
      "fat": 17,
      "fiber": 4,
      "sodium": 790
    },
    "instructions": "Bước 1 (Ướp tôm thịt với củ nén và nghệ): Ướp thịt ba chỉ và tôm tươi với củ nén giã dập, nước cốt nghệ tươi, nước mắm, tiêu và chút đường trong 20 phút cho thấm vị đặc trưng xứ Quảng.\nBước 2 (Rim nhân tôm thịt và nước nhưn): Phi thơm củ nén với dầu hạt điều màu, cho thịt ba chỉ vào xào săn trước rồi cho tôm và trứng cút vào đảo đều. Chế 600ml nước dùng xương hoặc nước dừa tươi vào rim lửa vừa 25 phút cho nước sánh đậm.\nBước 3 (Chuẩn bị rau sống và sợi mì): Xếp lớp rau sống tươi (cải con, xà lách, bắp chuối bào) dưới đáy tô, sau đó rải sợi mì Quảng lên trên.\nBước 4 (Chan nước nhưn xâm xấp và thưởng thức): Xếp tôm, thịt ba chỉ, trứng cút lên mặt mì, chan nước nhưn đậm đà vừa xâm xấp sợi mì. Rắc đậu phộng rang, hành lá và bẻ bánh tráng mè nướng giòn ăn kèm ớt xanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000005000001",
        "name": "Sợi mì Quảng tươi",
        "quantity": 800,
        "unit": "g",
        "notes": "Tơi sợi mì trước khi bày ra tô",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000005000002",
        "name": "Thịt ba chỉ heo & tôm đất tươi",
        "quantity": 600,
        "unit": "g",
        "notes": "Thịt thái miếng mỏng, tôm cắt râu rửa sạch",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000005000003",
        "name": "Trứng cút luộc",
        "quantity": 12,
        "unit": "quả",
        "notes": "Bóc vỏ kho cùng thịt tôm",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000005000004",
        "name": "Củ nén (hành tăm), nghệ tươi, dầu điều",
        "quantity": 60,
        "unit": "g",
        "notes": "Giã nhuyễn ướp thịt và phi thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000005000005",
        "name": "Đậu phộng rang & bánh tráng mè nướng",
        "quantity": 150,
        "unit": "g",
        "notes": "Đập dập đậu phộng, bẻ miếng bánh đa",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000005000006",
        "name": "Bắp chuối bào, cải con, rau húng, ớt xanh",
        "quantity": 200,
        "unit": "g",
        "notes": "Rửa sạch để ráo lót đáy tô",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000005000001",
        "stepNumber": 1,
        "title": "Ướp tôm thịt với củ nén và nghệ",
        "description": "Ướp thịt ba chỉ và tôm tươi với củ nén giã dập, nước cốt nghệ tươi, nước mắm, tiêu và chút đường trong 20 phút cho thấm vị đặc trưng xứ Quảng.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000005000002",
        "stepNumber": 2,
        "title": "Rim nhân tôm thịt và nước nhưn",
        "description": "Phi thơm củ nén với dầu hạt điều màu, cho thịt ba chỉ vào xào săn trước rồi cho tôm và trứng cút vào đảo đều. Chế 600ml nước dùng xương hoặc nước dừa tươi vào rim lửa vừa 25 phút cho nước sánh đậm.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000005000003",
        "stepNumber": 3,
        "title": "Chuẩn bị rau sống và sợi mì",
        "description": "Xếp lớp rau sống tươi (cải con, xà lách, bắp chuối bào) dưới đáy tô, sau đó rải sợi mì Quảng lên trên.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000005000004",
        "stepNumber": 4,
        "title": "Chan nước nhưn xâm xấp và thưởng thức",
        "description": "Xếp tôm, thịt ba chỉ, trứng cút lên mặt mì, chan nước nhưn đậm đà vừa xâm xấp sợi mì. Rắc đậu phộng rang, hành lá và bẻ bánh tráng mè nướng giòn ăn kèm ớt xanh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000005000001",
        "originalUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "altText": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000005000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000005000003",
        "originalUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
        "altText": "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000006": {
    "id": "22222222-2222-4222-8222-000000000006",
    "title": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm",
    "slug": "banh-canh-cua-gio-heo",
    "description": "Sợi bánh canh bột lọc dai trong hòa quyện trong làn nước dùng sánh mịn tự nhiên, ngập tràn thịt cua biển tươi bóc múi, khoanh giò heo, tôm sú và chả cá thu.",
    "prepTime": 35,
    "cookTime": 50,
    "totalTime": 85,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-06T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 27,
    "nutrition": {
      "calories": 530,
      "protein": 36,
      "carbohydrates": 58,
      "fat": 16,
      "fiber": 2,
      "sodium": 840
    },
    "instructions": "Bước 1 (Hầm giò heo và nấu nước dùng): Chần sạch giò heo rồi hầm với 2 lít nước và củ cải trắng trong 40 phút cho giò mềm và nước ngọt. Vớt giò heo ra ngâm nước mát.\nBước 2 (Xào thịt cua với dầu màu điều): Phi thơm hành tím và tỏi băm với 2 muỗng dầu màu điều, cho thịt cua biển vào đảo nhẹ tay trên lửa vừa cùng chút nước mắm và tiêu để thịt cua săn thơm mà không bị nát.\nBước 3 (Nấu nấm rơm, tôm và tạo độ sánh): Thả nấm rơm và tôm sú vào nồi nước dùng nấu sôi 5 phút. Cho sợi bánh canh đã trụng vào đun sôi lại, từ từ rót nước bột năng vào khuấy nhẹ cho nước dùng sánh bóng và lên màu cam nhẹ.\nBước 4 (Múc bánh canh cua ra tô): Múc bánh canh ra tô, xếp thịt cua biển, khoanh giò heo, tôm sú lên trên, rắc hành ngò, hành phi và tiêu xay, dùng nóng với nước mắm ớt cắt lát.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000006000001",
        "name": "Thịt cua biển gỡ sẵn",
        "quantity": 300,
        "unit": "g",
        "notes": "Phi thơm với hành tỏi và dầu màu điều",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000006000002",
        "name": "Giò heo rút xương hoặc chặt khoanh",
        "quantity": 500,
        "unit": "g",
        "notes": "Chần sạch và hầm mềm",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000006000003",
        "name": "Tôm sú tươi & nấm rơm",
        "quantity": 300,
        "unit": "g",
        "notes": "Tôm bóc vỏ, nấm rơm cắt đôi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000006000004",
        "name": "Sợi bánh canh bột gạo pha bột năng",
        "quantity": 700,
        "unit": "g",
        "notes": "Luộc sơ nước sôi cho hết bột chua",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000006000005",
        "name": "Bột năng tạo độ sánh",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Hòa tan với nước lọc",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000006000006",
        "name": "Hành lá, ngò rí, tiêu xay, dầu điều",
        "quantity": 50,
        "unit": "g",
        "notes": "Rắc lên bề mặt tô bánh canh",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000006000001",
        "stepNumber": 1,
        "title": "Hầm giò heo và nấu nước dùng",
        "description": "Chần sạch giò heo rồi hầm với 2 lít nước và củ cải trắng trong 40 phút cho giò mềm và nước ngọt. Vớt giò heo ra ngâm nước mát.",
        "timerMinutes": 40,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000006000002",
        "stepNumber": 2,
        "title": "Xào thịt cua với dầu màu điều",
        "description": "Phi thơm hành tím và tỏi băm với 2 muỗng dầu màu điều, cho thịt cua biển vào đảo nhẹ tay trên lửa vừa cùng chút nước mắm và tiêu để thịt cua săn thơm mà không bị nát.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000006000003",
        "stepNumber": 3,
        "title": "Nấu nấm rơm, tôm và tạo độ sánh",
        "description": "Thả nấm rơm và tôm sú vào nồi nước dùng nấu sôi 5 phút. Cho sợi bánh canh đã trụng vào đun sôi lại, từ từ rót nước bột năng vào khuấy nhẹ cho nước dùng sánh bóng và lên màu cam nhẹ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000006000004",
        "stepNumber": 4,
        "title": "Múc bánh canh cua ra tô",
        "description": "Múc bánh canh ra tô, xếp thịt cua biển, khoanh giò heo, tôm sú lên trên, rắc hành ngò, hành phi và tiêu xay, dùng nóng với nước mắm ớt cắt lát.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000006000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000006000002",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000006000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "banh-canh-cua-gio-heo": {
    "id": "22222222-2222-4222-8222-000000000006",
    "title": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm",
    "slug": "banh-canh-cua-gio-heo",
    "description": "Sợi bánh canh bột lọc dai trong hòa quyện trong làn nước dùng sánh mịn tự nhiên, ngập tràn thịt cua biển tươi bóc múi, khoanh giò heo, tôm sú và chả cá thu.",
    "prepTime": 35,
    "cookTime": 50,
    "totalTime": 85,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000001",
    "categoryName": "Món Nước & Bún Phở",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-06T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 27,
    "nutrition": {
      "calories": 530,
      "protein": 36,
      "carbohydrates": 58,
      "fat": 16,
      "fiber": 2,
      "sodium": 840
    },
    "instructions": "Bước 1 (Hầm giò heo và nấu nước dùng): Chần sạch giò heo rồi hầm với 2 lít nước và củ cải trắng trong 40 phút cho giò mềm và nước ngọt. Vớt giò heo ra ngâm nước mát.\nBước 2 (Xào thịt cua với dầu màu điều): Phi thơm hành tím và tỏi băm với 2 muỗng dầu màu điều, cho thịt cua biển vào đảo nhẹ tay trên lửa vừa cùng chút nước mắm và tiêu để thịt cua săn thơm mà không bị nát.\nBước 3 (Nấu nấm rơm, tôm và tạo độ sánh): Thả nấm rơm và tôm sú vào nồi nước dùng nấu sôi 5 phút. Cho sợi bánh canh đã trụng vào đun sôi lại, từ từ rót nước bột năng vào khuấy nhẹ cho nước dùng sánh bóng và lên màu cam nhẹ.\nBước 4 (Múc bánh canh cua ra tô): Múc bánh canh ra tô, xếp thịt cua biển, khoanh giò heo, tôm sú lên trên, rắc hành ngò, hành phi và tiêu xay, dùng nóng với nước mắm ớt cắt lát.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000001",
      "name": "Món Nước & Bún Phở",
      "slug": "mon-nuoc-bun-pho",
      "description": "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.",
      "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 1,
      "recipeCount": 6
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000006000001",
        "name": "Thịt cua biển gỡ sẵn",
        "quantity": 300,
        "unit": "g",
        "notes": "Phi thơm với hành tỏi và dầu màu điều",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000006000002",
        "name": "Giò heo rút xương hoặc chặt khoanh",
        "quantity": 500,
        "unit": "g",
        "notes": "Chần sạch và hầm mềm",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000006000003",
        "name": "Tôm sú tươi & nấm rơm",
        "quantity": 300,
        "unit": "g",
        "notes": "Tôm bóc vỏ, nấm rơm cắt đôi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000006000004",
        "name": "Sợi bánh canh bột gạo pha bột năng",
        "quantity": 700,
        "unit": "g",
        "notes": "Luộc sơ nước sôi cho hết bột chua",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000006000005",
        "name": "Bột năng tạo độ sánh",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Hòa tan với nước lọc",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000006000006",
        "name": "Hành lá, ngò rí, tiêu xay, dầu điều",
        "quantity": 50,
        "unit": "g",
        "notes": "Rắc lên bề mặt tô bánh canh",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000006000001",
        "stepNumber": 1,
        "title": "Hầm giò heo và nấu nước dùng",
        "description": "Chần sạch giò heo rồi hầm với 2 lít nước và củ cải trắng trong 40 phút cho giò mềm và nước ngọt. Vớt giò heo ra ngâm nước mát.",
        "timerMinutes": 40,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000006000002",
        "stepNumber": 2,
        "title": "Xào thịt cua với dầu màu điều",
        "description": "Phi thơm hành tím và tỏi băm với 2 muỗng dầu màu điều, cho thịt cua biển vào đảo nhẹ tay trên lửa vừa cùng chút nước mắm và tiêu để thịt cua săn thơm mà không bị nát.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000006000003",
        "stepNumber": 3,
        "title": "Nấu nấm rơm, tôm và tạo độ sánh",
        "description": "Thả nấm rơm và tôm sú vào nồi nước dùng nấu sôi 5 phút. Cho sợi bánh canh đã trụng vào đun sôi lại, từ từ rót nước bột năng vào khuấy nhẹ cho nước dùng sánh bóng và lên màu cam nhẹ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000006000004",
        "stepNumber": 4,
        "title": "Múc bánh canh cua ra tô",
        "description": "Múc bánh canh ra tô, xếp thịt cua biển, khoanh giò heo, tôm sú lên trên, rắc hành ngò, hành phi và tiêu xay, dùng nóng với nước mắm ớt cắt lát.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000006000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000006000002",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000006000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000007": {
    "id": "22222222-2222-4222-8222-000000000007",
    "title": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn",
    "slug": "com-tam-suon-bi-cha-sai-gon",
    "description": "Đĩa cơm tấm trứ danh Sài Thành với hạt cơm tấm dẻo tơi, miếng sườn cốt lết nướng mật ong vàng óng mềm mọng, bì thính giòn dai, chả trứng hấp béo ngậy và nước mắm kẹo chua ngọt.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-07T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 30,
    "nutrition": {
      "calories": 640,
      "protein": 38,
      "carbohydrates": 68,
      "fat": 22,
      "fiber": 3,
      "sodium": 890
    },
    "instructions": "Bước 1 (Ướp sườn cốt lết mềm mọng): Dần nhẹ hai mặt miếng sườn cốt lết rồi ướp với nước cốt hành tỏi sả, mật ong, sữa đặc, nước mắm, dầu hào và chút dầu ăn tối thiểu 30 phút để thớ thịt thấm vị và mềm ngọt.\nBước 2 (Hấp chả trứng và nấu cơm tấm): Trộn thịt heo xay với nấm mèo băm, bún tàu, hành tím, trứng vịt rồi đem hấp 20 phút, sau đó phết lòng đỏ trứng gà lên mặt hấp mở nắp thêm 5 phút. Nấu gạo tấm chín dẻo tơi.\nBước 3 (Nướng sườn và thắng nước mắm kẹo): Nướng sườn trên bếp than hoa hoặc nồi chiên không dầu ở 190 độ C mỗi mặt 8 phút, phết nước ướp để sườn vàng óng. Nấu sôi nước mắm, đường và nước lọc theo tỉ lệ 1:1:1 để nguội rồi pha chanh tỏi ớt.\nBước 4 (Trình bày đĩa cơm tấm Sài Gòn): Đơm cơm tấm ra đĩa, rưới mỡ hành tóp mỡ lên cơm, xếp miếng sườn nướng, bì thính, miếng chả trứng, dưa leo, đồ chua và chén nước mắm kẹo chua ngọt bên cạnh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000007000001",
        "name": "Sườn cốt lết heo bản to",
        "quantity": 600,
        "unit": "g",
        "notes": "Dùng búa dần mềm thớ thịt để sườn không khô",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000007000002",
        "name": "Gạo tấm thơm",
        "quantity": 500,
        "unit": "g",
        "notes": "Vo sạch, nấu ít nước cho hạt cơm tơi dẻo",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000007000003",
        "name": "Bì heo trộn thính & thịt xay làm chả",
        "quantity": 300,
        "unit": "g",
        "notes": "Chả hấp cùng bún tàu, mộc nhĩ và lòng đỏ trứng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000007000004",
        "name": "Mật ong, sữa đặc, dầu hào, nước mắm",
        "quantity": 80,
        "unit": "ml",
        "notes": "Hỗn hợp ướp sườn mềm bóng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000007000005",
        "name": "Đồ chua cà rốt củ cải, dưa leo, cà chua",
        "quantity": 200,
        "unit": "g",
        "notes": "Ăn kèm chống ngán",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000007000006",
        "name": "Hành lá làm mỡ hành & tóp mỡ",
        "quantity": 100,
        "unit": "g",
        "notes": "Cắt nhỏ đổ dầu nóng vào tạo màu xanh",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000007000001",
        "stepNumber": 1,
        "title": "Ướp sườn cốt lết mềm mọng",
        "description": "Dần nhẹ hai mặt miếng sườn cốt lết rồi ướp với nước cốt hành tỏi sả, mật ong, sữa đặc, nước mắm, dầu hào và chút dầu ăn tối thiểu 30 phút để thớ thịt thấm vị và mềm ngọt.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000007000002",
        "stepNumber": 2,
        "title": "Hấp chả trứng và nấu cơm tấm",
        "description": "Trộn thịt heo xay với nấm mèo băm, bún tàu, hành tím, trứng vịt rồi đem hấp 20 phút, sau đó phết lòng đỏ trứng gà lên mặt hấp mở nắp thêm 5 phút. Nấu gạo tấm chín dẻo tơi.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000007000003",
        "stepNumber": 3,
        "title": "Nướng sườn và thắng nước mắm kẹo",
        "description": "Nướng sườn trên bếp than hoa hoặc nồi chiên không dầu ở 190 độ C mỗi mặt 8 phút, phết nước ướp để sườn vàng óng. Nấu sôi nước mắm, đường và nước lọc theo tỉ lệ 1:1:1 để nguội rồi pha chanh tỏi ớt.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000007000004",
        "stepNumber": 4,
        "title": "Trình bày đĩa cơm tấm Sài Gòn",
        "description": "Đơm cơm tấm ra đĩa, rưới mỡ hành tóp mỡ lên cơm, xếp miếng sườn nướng, bì thính, miếng chả trứng, dưa leo, đồ chua và chén nước mắm kẹo chua ngọt bên cạnh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000007000001",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
        "altText": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000007000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000007000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "com-tam-suon-bi-cha-sai-gon": {
    "id": "22222222-2222-4222-8222-000000000007",
    "title": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn",
    "slug": "com-tam-suon-bi-cha-sai-gon",
    "description": "Đĩa cơm tấm trứ danh Sài Thành với hạt cơm tấm dẻo tơi, miếng sườn cốt lết nướng mật ong vàng óng mềm mọng, bì thính giòn dai, chả trứng hấp béo ngậy và nước mắm kẹo chua ngọt.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-07T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 30,
    "nutrition": {
      "calories": 640,
      "protein": 38,
      "carbohydrates": 68,
      "fat": 22,
      "fiber": 3,
      "sodium": 890
    },
    "instructions": "Bước 1 (Ướp sườn cốt lết mềm mọng): Dần nhẹ hai mặt miếng sườn cốt lết rồi ướp với nước cốt hành tỏi sả, mật ong, sữa đặc, nước mắm, dầu hào và chút dầu ăn tối thiểu 30 phút để thớ thịt thấm vị và mềm ngọt.\nBước 2 (Hấp chả trứng và nấu cơm tấm): Trộn thịt heo xay với nấm mèo băm, bún tàu, hành tím, trứng vịt rồi đem hấp 20 phút, sau đó phết lòng đỏ trứng gà lên mặt hấp mở nắp thêm 5 phút. Nấu gạo tấm chín dẻo tơi.\nBước 3 (Nướng sườn và thắng nước mắm kẹo): Nướng sườn trên bếp than hoa hoặc nồi chiên không dầu ở 190 độ C mỗi mặt 8 phút, phết nước ướp để sườn vàng óng. Nấu sôi nước mắm, đường và nước lọc theo tỉ lệ 1:1:1 để nguội rồi pha chanh tỏi ớt.\nBước 4 (Trình bày đĩa cơm tấm Sài Gòn): Đơm cơm tấm ra đĩa, rưới mỡ hành tóp mỡ lên cơm, xếp miếng sườn nướng, bì thính, miếng chả trứng, dưa leo, đồ chua và chén nước mắm kẹo chua ngọt bên cạnh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000007000001",
        "name": "Sườn cốt lết heo bản to",
        "quantity": 600,
        "unit": "g",
        "notes": "Dùng búa dần mềm thớ thịt để sườn không khô",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000007000002",
        "name": "Gạo tấm thơm",
        "quantity": 500,
        "unit": "g",
        "notes": "Vo sạch, nấu ít nước cho hạt cơm tơi dẻo",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000007000003",
        "name": "Bì heo trộn thính & thịt xay làm chả",
        "quantity": 300,
        "unit": "g",
        "notes": "Chả hấp cùng bún tàu, mộc nhĩ và lòng đỏ trứng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000007000004",
        "name": "Mật ong, sữa đặc, dầu hào, nước mắm",
        "quantity": 80,
        "unit": "ml",
        "notes": "Hỗn hợp ướp sườn mềm bóng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000007000005",
        "name": "Đồ chua cà rốt củ cải, dưa leo, cà chua",
        "quantity": 200,
        "unit": "g",
        "notes": "Ăn kèm chống ngán",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000007000006",
        "name": "Hành lá làm mỡ hành & tóp mỡ",
        "quantity": 100,
        "unit": "g",
        "notes": "Cắt nhỏ đổ dầu nóng vào tạo màu xanh",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000007000001",
        "stepNumber": 1,
        "title": "Ướp sườn cốt lết mềm mọng",
        "description": "Dần nhẹ hai mặt miếng sườn cốt lết rồi ướp với nước cốt hành tỏi sả, mật ong, sữa đặc, nước mắm, dầu hào và chút dầu ăn tối thiểu 30 phút để thớ thịt thấm vị và mềm ngọt.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000007000002",
        "stepNumber": 2,
        "title": "Hấp chả trứng và nấu cơm tấm",
        "description": "Trộn thịt heo xay với nấm mèo băm, bún tàu, hành tím, trứng vịt rồi đem hấp 20 phút, sau đó phết lòng đỏ trứng gà lên mặt hấp mở nắp thêm 5 phút. Nấu gạo tấm chín dẻo tơi.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000007000003",
        "stepNumber": 3,
        "title": "Nướng sườn và thắng nước mắm kẹo",
        "description": "Nướng sườn trên bếp than hoa hoặc nồi chiên không dầu ở 190 độ C mỗi mặt 8 phút, phết nước ướp để sườn vàng óng. Nấu sôi nước mắm, đường và nước lọc theo tỉ lệ 1:1:1 để nguội rồi pha chanh tỏi ớt.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000007000004",
        "stepNumber": 4,
        "title": "Trình bày đĩa cơm tấm Sài Gòn",
        "description": "Đơm cơm tấm ra đĩa, rưới mỡ hành tóp mỡ lên cơm, xếp miếng sườn nướng, bì thính, miếng chả trứng, dưa leo, đồ chua và chén nước mắm kẹo chua ngọt bên cạnh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000007000001",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
        "altText": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000007000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000007000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000008": {
    "id": "22222222-2222-4222-8222-000000000008",
    "title": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi",
    "slug": "com-ga-xoi-mo-da-gion",
    "description": "Đùi gà góc tư được luộc chín mềm bên trong rồi xối dầu sôi cho lớp da nổ giòn tan vàng rụm, dùng kèm cơm rang săn hạt màu đỏ cam đẹp mắt và sốt mắm tỏi đậm đà.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-08T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 33,
    "nutrition": {
      "calories": 615,
      "protein": 36,
      "carbohydrates": 62,
      "fat": 23,
      "fiber": 2,
      "sodium": 810
    },
    "instructions": "Bước 1 (Hấp chín đùi gà và làm khô da): Ướp đùi gà với chút muối, ngũ vị hương và gừng rồi hấp chín 15 phút. Lấy gà ra để thật ráo và quét một lớp giấm mạch nha mỏng lên da để khi xối mỡ da giòn rụm.\nBước 2 (Chiên cơm đảo lửa lớn): Phi thơm tỏi băm với dầu điều, cho cơm nấu nước luộc gà vào đảo đều trên lửa lớn cùng 1 quả trứng gà và chút tương cà cho hạt cơm săn tơi và lên màu cam đẹp mắt.\nBước 3 (Xối mỡ nóng giòn da gà): Đun nóng dầu trong chảo sâu lòng, đặt đùi gà lên vợt rồi liên tục múc dầu sôi dội đều lên mặt da gà cho đến khi lớp da phồng giòn vàng óng.\nBước 4 (Rưới sốt mắm tỏi và bày đĩa): Chặt đùi gà xối mỡ xếp cạnh phần cơm chiên, rưới một muỗng sốt nước mắm tỏi ớt kẹo lên da gà, dùng nóng cùng dưa leo, cà chua và chén canh nước luộc gà.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000008000001",
        "name": "Đùi gà góc tư",
        "quantity": 4,
        "unit": "cái",
        "notes": "Chà xát muối gừng rửa sạch, để ráo",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000008000002",
        "name": "Cơm trắng nấu bằng nước luộc gà",
        "quantity": 600,
        "unit": "g",
        "notes": "Để nguội bớt trước khi chiên",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000008000003",
        "name": "Tỏi băm, gừng, hoa hồi, ngũ vị hương",
        "quantity": 40,
        "unit": "g",
        "notes": "Ướp và tạo hương thơm cho gà",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000008000004",
        "name": "Tương cà, dầu màu điều, trứng gà",
        "quantity": 50,
        "unit": "g",
        "notes": "Tạo màu vàng cam óng cho hạt cơm chiên",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000008000005",
        "name": "Xà lách, dưa leo, cà chua, ngò rí",
        "quantity": 200,
        "unit": "g",
        "notes": "Trang trí và ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000008000001",
        "stepNumber": 1,
        "title": "Hấp chín đùi gà và làm khô da",
        "description": "Ướp đùi gà với chút muối, ngũ vị hương và gừng rồi hấp chín 15 phút. Lấy gà ra để thật ráo và quét một lớp giấm mạch nha mỏng lên da để khi xối mỡ da giòn rụm.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000008000002",
        "stepNumber": 2,
        "title": "Chiên cơm đảo lửa lớn",
        "description": "Phi thơm tỏi băm với dầu điều, cho cơm nấu nước luộc gà vào đảo đều trên lửa lớn cùng 1 quả trứng gà và chút tương cà cho hạt cơm săn tơi và lên màu cam đẹp mắt.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000008000003",
        "stepNumber": 3,
        "title": "Xối mỡ nóng giòn da gà",
        "description": "Đun nóng dầu trong chảo sâu lòng, đặt đùi gà lên vợt rồi liên tục múc dầu sôi dội đều lên mặt da gà cho đến khi lớp da phồng giòn vàng óng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000008000004",
        "stepNumber": 4,
        "title": "Rưới sốt mắm tỏi và bày đĩa",
        "description": "Chặt đùi gà xối mỡ xếp cạnh phần cơm chiên, rưới một muỗng sốt nước mắm tỏi ớt kẹo lên da gà, dùng nóng cùng dưa leo, cà chua và chén canh nước luộc gà.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000008000001",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "altText": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000008000002",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000008000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "com-ga-xoi-mo-da-gion": {
    "id": "22222222-2222-4222-8222-000000000008",
    "title": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi",
    "slug": "com-ga-xoi-mo-da-gion",
    "description": "Đùi gà góc tư được luộc chín mềm bên trong rồi xối dầu sôi cho lớp da nổ giòn tan vàng rụm, dùng kèm cơm rang săn hạt màu đỏ cam đẹp mắt và sốt mắm tỏi đậm đà.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-08T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 33,
    "nutrition": {
      "calories": 615,
      "protein": 36,
      "carbohydrates": 62,
      "fat": 23,
      "fiber": 2,
      "sodium": 810
    },
    "instructions": "Bước 1 (Hấp chín đùi gà và làm khô da): Ướp đùi gà với chút muối, ngũ vị hương và gừng rồi hấp chín 15 phút. Lấy gà ra để thật ráo và quét một lớp giấm mạch nha mỏng lên da để khi xối mỡ da giòn rụm.\nBước 2 (Chiên cơm đảo lửa lớn): Phi thơm tỏi băm với dầu điều, cho cơm nấu nước luộc gà vào đảo đều trên lửa lớn cùng 1 quả trứng gà và chút tương cà cho hạt cơm săn tơi và lên màu cam đẹp mắt.\nBước 3 (Xối mỡ nóng giòn da gà): Đun nóng dầu trong chảo sâu lòng, đặt đùi gà lên vợt rồi liên tục múc dầu sôi dội đều lên mặt da gà cho đến khi lớp da phồng giòn vàng óng.\nBước 4 (Rưới sốt mắm tỏi và bày đĩa): Chặt đùi gà xối mỡ xếp cạnh phần cơm chiên, rưới một muỗng sốt nước mắm tỏi ớt kẹo lên da gà, dùng nóng cùng dưa leo, cà chua và chén canh nước luộc gà.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000008000001",
        "name": "Đùi gà góc tư",
        "quantity": 4,
        "unit": "cái",
        "notes": "Chà xát muối gừng rửa sạch, để ráo",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000008000002",
        "name": "Cơm trắng nấu bằng nước luộc gà",
        "quantity": 600,
        "unit": "g",
        "notes": "Để nguội bớt trước khi chiên",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000008000003",
        "name": "Tỏi băm, gừng, hoa hồi, ngũ vị hương",
        "quantity": 40,
        "unit": "g",
        "notes": "Ướp và tạo hương thơm cho gà",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000008000004",
        "name": "Tương cà, dầu màu điều, trứng gà",
        "quantity": 50,
        "unit": "g",
        "notes": "Tạo màu vàng cam óng cho hạt cơm chiên",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000008000005",
        "name": "Xà lách, dưa leo, cà chua, ngò rí",
        "quantity": 200,
        "unit": "g",
        "notes": "Trang trí và ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000008000001",
        "stepNumber": 1,
        "title": "Hấp chín đùi gà và làm khô da",
        "description": "Ướp đùi gà với chút muối, ngũ vị hương và gừng rồi hấp chín 15 phút. Lấy gà ra để thật ráo và quét một lớp giấm mạch nha mỏng lên da để khi xối mỡ da giòn rụm.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000008000002",
        "stepNumber": 2,
        "title": "Chiên cơm đảo lửa lớn",
        "description": "Phi thơm tỏi băm với dầu điều, cho cơm nấu nước luộc gà vào đảo đều trên lửa lớn cùng 1 quả trứng gà và chút tương cà cho hạt cơm săn tơi và lên màu cam đẹp mắt.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000008000003",
        "stepNumber": 3,
        "title": "Xối mỡ nóng giòn da gà",
        "description": "Đun nóng dầu trong chảo sâu lòng, đặt đùi gà lên vợt rồi liên tục múc dầu sôi dội đều lên mặt da gà cho đến khi lớp da phồng giòn vàng óng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000008000004",
        "stepNumber": 4,
        "title": "Rưới sốt mắm tỏi và bày đĩa",
        "description": "Chặt đùi gà xối mỡ xếp cạnh phần cơm chiên, rưới một muỗng sốt nước mắm tỏi ớt kẹo lên da gà, dùng nóng cùng dưa leo, cà chua và chén canh nước luộc gà.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000008000001",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "altText": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000008000002",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000008000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000009": {
    "id": "22222222-2222-4222-8222-000000000009",
    "title": "Cơm Chiên Dương Châu Tôm Lạp Xưởng",
    "slug": "com-chien-duong-chau-tom-lap-xuong",
    "description": "Món cơm chiên ngũ sắc bắt mắt với từng hạt cơm áo trứng vàng ươm săn tơi, hòa quyện vị ngọt của tôm tươi, lạp xưởng Mai Quế Lộ, đậu Hà Lan, cà rốt và bắp ngọt.",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-09T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 36,
    "nutrition": {
      "calories": 520,
      "protein": 24,
      "carbohydrates": 64,
      "fat": 18,
      "fiber": 4,
      "sodium": 720
    },
    "instructions": "Bước 1 (Trộn cơm với lòng đỏ trứng gà): Đánh tan 2 lòng đỏ trứng gà với 1 muỗng dầu ăn rồi trộn thật đều vào tô cơm nguội để từng hạt cơm đều được áo lớp trứng vàng óng.\nBước 2 (Xào nhân tôm, lạp xưởng và rau củ): Phi thơm tỏi băm, cho lạp xưởng và tôm cắt hạt lựu vào xào săn, tiếp tục cho cà rốt, đậu Hà Lan, bắp ngọt đã chần sơ vào đảo 3 phút rồi trút ra đĩa.\nBước 3 (Chiên cơm săn hạt trên lửa lớn): Làm nóng chảo với chút dầu ăn, cho cơm đã trộn trứng vào đảo nhanh tay liên tục trên lửa lớn khoảng 6 phút cho đến khi hạt cơm khô ráo và nhảy tơi trên mặt chảo.\nBước 4 (Kết hợp nhân và hoàn tất): Trút toàn bộ phần nhân tôm, lạp xưởng, rau củ vào chảo cơm, nêm hạt nêm, nước tương, dầu mè và hành lá cắt nhỏ, đảo đều 2 phút rồi múc ra đĩa thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000009000001",
        "name": "Cơm trắng để nguội",
        "quantity": 600,
        "unit": "g",
        "notes": "Nên dùng cơm nấu hơi khô để hạt cơm tơi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000009000002",
        "name": "Tôm tươi bóc vỏ & lạp xưởng",
        "quantity": 250,
        "unit": "g",
        "notes": "Thái hạt lựu đều nhau",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000009000003",
        "name": "Trứng gà tươi",
        "quantity": 3,
        "unit": "quả",
        "notes": "Đánh tan 2 lòng đỏ trộn cơm, 1 quả chiên cắt sợi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000009000004",
        "name": "Đậu Hà Lan, cà rốt, bắp ngọt",
        "quantity": 150,
        "unit": "g",
        "notes": "Cắt hạt lựu, chần sơ nước sôi 2 phút",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000009000005",
        "name": "Hành lá, tỏi băm, dầu mè, nước tương",
        "quantity": 40,
        "unit": "g",
        "notes": "Tạo hương thơm dậy vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000009000001",
        "stepNumber": 1,
        "title": "Trộn cơm với lòng đỏ trứng gà",
        "description": "Đánh tan 2 lòng đỏ trứng gà với 1 muỗng dầu ăn rồi trộn thật đều vào tô cơm nguội để từng hạt cơm đều được áo lớp trứng vàng óng.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000009000002",
        "stepNumber": 2,
        "title": "Xào nhân tôm, lạp xưởng và rau củ",
        "description": "Phi thơm tỏi băm, cho lạp xưởng và tôm cắt hạt lựu vào xào săn, tiếp tục cho cà rốt, đậu Hà Lan, bắp ngọt đã chần sơ vào đảo 3 phút rồi trút ra đĩa.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000009000003",
        "stepNumber": 3,
        "title": "Chiên cơm săn hạt trên lửa lớn",
        "description": "Làm nóng chảo với chút dầu ăn, cho cơm đã trộn trứng vào đảo nhanh tay liên tục trên lửa lớn khoảng 6 phút cho đến khi hạt cơm khô ráo và nhảy tơi trên mặt chảo.",
        "timerMinutes": 6,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000009000004",
        "stepNumber": 4,
        "title": "Kết hợp nhân và hoàn tất",
        "description": "Trút toàn bộ phần nhân tôm, lạp xưởng, rau củ vào chảo cơm, nêm hạt nêm, nước tương, dầu mè và hành lá cắt nhỏ, đảo đều 2 phút rồi múc ra đĩa thưởng thức.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000009000001",
        "originalUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
        "altText": "Cơm Chiên Dương Châu Tôm Lạp Xưởng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000009000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Chiên Dương Châu Tôm Lạp Xưởng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000009000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Chiên Dương Châu Tôm Lạp Xưởng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "com-chien-duong-chau-tom-lap-xuong": {
    "id": "22222222-2222-4222-8222-000000000009",
    "title": "Cơm Chiên Dương Châu Tôm Lạp Xưởng",
    "slug": "com-chien-duong-chau-tom-lap-xuong",
    "description": "Món cơm chiên ngũ sắc bắt mắt với từng hạt cơm áo trứng vàng ươm săn tơi, hòa quyện vị ngọt của tôm tươi, lạp xưởng Mai Quế Lộ, đậu Hà Lan, cà rốt và bắp ngọt.",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-09T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 36,
    "nutrition": {
      "calories": 520,
      "protein": 24,
      "carbohydrates": 64,
      "fat": 18,
      "fiber": 4,
      "sodium": 720
    },
    "instructions": "Bước 1 (Trộn cơm với lòng đỏ trứng gà): Đánh tan 2 lòng đỏ trứng gà với 1 muỗng dầu ăn rồi trộn thật đều vào tô cơm nguội để từng hạt cơm đều được áo lớp trứng vàng óng.\nBước 2 (Xào nhân tôm, lạp xưởng và rau củ): Phi thơm tỏi băm, cho lạp xưởng và tôm cắt hạt lựu vào xào săn, tiếp tục cho cà rốt, đậu Hà Lan, bắp ngọt đã chần sơ vào đảo 3 phút rồi trút ra đĩa.\nBước 3 (Chiên cơm săn hạt trên lửa lớn): Làm nóng chảo với chút dầu ăn, cho cơm đã trộn trứng vào đảo nhanh tay liên tục trên lửa lớn khoảng 6 phút cho đến khi hạt cơm khô ráo và nhảy tơi trên mặt chảo.\nBước 4 (Kết hợp nhân và hoàn tất): Trút toàn bộ phần nhân tôm, lạp xưởng, rau củ vào chảo cơm, nêm hạt nêm, nước tương, dầu mè và hành lá cắt nhỏ, đảo đều 2 phút rồi múc ra đĩa thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000009000001",
        "name": "Cơm trắng để nguội",
        "quantity": 600,
        "unit": "g",
        "notes": "Nên dùng cơm nấu hơi khô để hạt cơm tơi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000009000002",
        "name": "Tôm tươi bóc vỏ & lạp xưởng",
        "quantity": 250,
        "unit": "g",
        "notes": "Thái hạt lựu đều nhau",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000009000003",
        "name": "Trứng gà tươi",
        "quantity": 3,
        "unit": "quả",
        "notes": "Đánh tan 2 lòng đỏ trộn cơm, 1 quả chiên cắt sợi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000009000004",
        "name": "Đậu Hà Lan, cà rốt, bắp ngọt",
        "quantity": 150,
        "unit": "g",
        "notes": "Cắt hạt lựu, chần sơ nước sôi 2 phút",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000009000005",
        "name": "Hành lá, tỏi băm, dầu mè, nước tương",
        "quantity": 40,
        "unit": "g",
        "notes": "Tạo hương thơm dậy vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000009000001",
        "stepNumber": 1,
        "title": "Trộn cơm với lòng đỏ trứng gà",
        "description": "Đánh tan 2 lòng đỏ trứng gà với 1 muỗng dầu ăn rồi trộn thật đều vào tô cơm nguội để từng hạt cơm đều được áo lớp trứng vàng óng.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000009000002",
        "stepNumber": 2,
        "title": "Xào nhân tôm, lạp xưởng và rau củ",
        "description": "Phi thơm tỏi băm, cho lạp xưởng và tôm cắt hạt lựu vào xào săn, tiếp tục cho cà rốt, đậu Hà Lan, bắp ngọt đã chần sơ vào đảo 3 phút rồi trút ra đĩa.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000009000003",
        "stepNumber": 3,
        "title": "Chiên cơm săn hạt trên lửa lớn",
        "description": "Làm nóng chảo với chút dầu ăn, cho cơm đã trộn trứng vào đảo nhanh tay liên tục trên lửa lớn khoảng 6 phút cho đến khi hạt cơm khô ráo và nhảy tơi trên mặt chảo.",
        "timerMinutes": 6,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000009000004",
        "stepNumber": 4,
        "title": "Kết hợp nhân và hoàn tất",
        "description": "Trút toàn bộ phần nhân tôm, lạp xưởng, rau củ vào chảo cơm, nêm hạt nêm, nước tương, dầu mè và hành lá cắt nhỏ, đảo đều 2 phút rồi múc ra đĩa thưởng thức.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000009000001",
        "originalUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
        "altText": "Cơm Chiên Dương Châu Tôm Lạp Xưởng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000009000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Chiên Dương Châu Tôm Lạp Xưởng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000009000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Cơm Chiên Dương Châu Tôm Lạp Xưởng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000010": {
    "id": "22222222-2222-4222-8222-000000000010",
    "title": "Xôi Gà Xé Phay Hành Phi Trứng Non",
    "slug": "xoi-ga-xe-phay-trung-non",
    "description": "Xôi nếp cái hoa vàng đồ dẻo thơm bóng bẩy kết hợp thịt gà ta xé phay trộn hành tây chua ngọt, trứng gà non rim mặn ngọt và lớp hành phi mỡ gà giòn rụm.",
    "prepTime": 35,
    "cookTime": 40,
    "totalTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-10T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 39,
    "nutrition": {
      "calories": 550,
      "protein": 30,
      "carbohydrates": 68,
      "fat": 16,
      "fiber": 3,
      "sodium": 690
    },
    "instructions": "Bước 1 (Đồ xôi nếp dẻo bóng): Gạo nếp sau khi ngâm vớt ra để ráo, xóc với nửa muỗng cà phê muối và 1 muỗng mỡ gà. Cho vào xửng hấp chín dẻo trong 30 phút, thỉnh thoảng xới đều để hạt xôi chín tơi.\nBước 2 (Luộc gà và trộn gà xé phay): Luộc chín thịt gà ta với gừng và hành tím, để nguội rồi xé miếng vừa ăn. Trộn thịt gà với muối tiêu chanh, hành tây thái mỏng ngâm đá và rau răm cắt nhỏ.\nBước 3 (Rim trứng non và làm mỡ hành): Phi thơm hành tỏi, cho trứng gà non vào rim với nước tương, dầu hào, đường và chút nước luộc gà trong 10 phút cho thấm màu nâu bóng.\nBước 4 (Trình bày xôi gà trứng non): Đơm xôi nóng ra bát hoặc lá chuối, xếp gà xé phay và trứng non rim lên trên, rưới mỡ hành và rắc thật nhiều hành tím phi giòn rụm.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000010000001",
        "name": "Gạo nếp cái hoa vàng",
        "quantity": 500,
        "unit": "g",
        "notes": "Ngâm nước ấm 4 giờ cùng chút bột nghệ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000010000002",
        "name": "Thịt đùi và ức gà ta",
        "quantity": 500,
        "unit": "g",
        "notes": "Luộc chín rồi xé phay vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000010000003",
        "name": "Trứng gà non",
        "quantity": 200,
        "unit": "g",
        "notes": "Rim nước tương, dầu hào đậm đà",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000010000004",
        "name": "Hành tím thái lát & mỡ gà",
        "quantity": 100,
        "unit": "g",
        "notes": "Phi vàng giòn tạo hương thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000010000005",
        "name": "Rau răm, hành lá, chanh, tiêu",
        "quantity": 50,
        "unit": "g",
        "notes": "Trộn gỏi gà xé phay",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000010000001",
        "stepNumber": 1,
        "title": "Đồ xôi nếp dẻo bóng",
        "description": "Gạo nếp sau khi ngâm vớt ra để ráo, xóc với nửa muỗng cà phê muối và 1 muỗng mỡ gà. Cho vào xửng hấp chín dẻo trong 30 phút, thỉnh thoảng xới đều để hạt xôi chín tơi.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000010000002",
        "stepNumber": 2,
        "title": "Luộc gà và trộn gà xé phay",
        "description": "Luộc chín thịt gà ta với gừng và hành tím, để nguội rồi xé miếng vừa ăn. Trộn thịt gà với muối tiêu chanh, hành tây thái mỏng ngâm đá và rau răm cắt nhỏ.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000010000003",
        "stepNumber": 3,
        "title": "Rim trứng non và làm mỡ hành",
        "description": "Phi thơm hành tỏi, cho trứng gà non vào rim với nước tương, dầu hào, đường và chút nước luộc gà trong 10 phút cho thấm màu nâu bóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000010000004",
        "stepNumber": 4,
        "title": "Trình bày xôi gà trứng non",
        "description": "Đơm xôi nóng ra bát hoặc lá chuối, xếp gà xé phay và trứng non rim lên trên, rưới mỡ hành và rắc thật nhiều hành tím phi giòn rụm.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000010000001",
        "originalUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "altText": "Xôi Gà Xé Phay Hành Phi Trứng Non",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000010000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Gà Xé Phay Hành Phi Trứng Non - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000010000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Gà Xé Phay Hành Phi Trứng Non - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "xoi-ga-xe-phay-trung-non": {
    "id": "22222222-2222-4222-8222-000000000010",
    "title": "Xôi Gà Xé Phay Hành Phi Trứng Non",
    "slug": "xoi-ga-xe-phay-trung-non",
    "description": "Xôi nếp cái hoa vàng đồ dẻo thơm bóng bẩy kết hợp thịt gà ta xé phay trộn hành tây chua ngọt, trứng gà non rim mặn ngọt và lớp hành phi mỡ gà giòn rụm.",
    "prepTime": 35,
    "cookTime": 40,
    "totalTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-10T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 39,
    "nutrition": {
      "calories": 550,
      "protein": 30,
      "carbohydrates": 68,
      "fat": 16,
      "fiber": 3,
      "sodium": 690
    },
    "instructions": "Bước 1 (Đồ xôi nếp dẻo bóng): Gạo nếp sau khi ngâm vớt ra để ráo, xóc với nửa muỗng cà phê muối và 1 muỗng mỡ gà. Cho vào xửng hấp chín dẻo trong 30 phút, thỉnh thoảng xới đều để hạt xôi chín tơi.\nBước 2 (Luộc gà và trộn gà xé phay): Luộc chín thịt gà ta với gừng và hành tím, để nguội rồi xé miếng vừa ăn. Trộn thịt gà với muối tiêu chanh, hành tây thái mỏng ngâm đá và rau răm cắt nhỏ.\nBước 3 (Rim trứng non và làm mỡ hành): Phi thơm hành tỏi, cho trứng gà non vào rim với nước tương, dầu hào, đường và chút nước luộc gà trong 10 phút cho thấm màu nâu bóng.\nBước 4 (Trình bày xôi gà trứng non): Đơm xôi nóng ra bát hoặc lá chuối, xếp gà xé phay và trứng non rim lên trên, rưới mỡ hành và rắc thật nhiều hành tím phi giòn rụm.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000010000001",
        "name": "Gạo nếp cái hoa vàng",
        "quantity": 500,
        "unit": "g",
        "notes": "Ngâm nước ấm 4 giờ cùng chút bột nghệ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000010000002",
        "name": "Thịt đùi và ức gà ta",
        "quantity": 500,
        "unit": "g",
        "notes": "Luộc chín rồi xé phay vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000010000003",
        "name": "Trứng gà non",
        "quantity": 200,
        "unit": "g",
        "notes": "Rim nước tương, dầu hào đậm đà",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000010000004",
        "name": "Hành tím thái lát & mỡ gà",
        "quantity": 100,
        "unit": "g",
        "notes": "Phi vàng giòn tạo hương thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000010000005",
        "name": "Rau răm, hành lá, chanh, tiêu",
        "quantity": 50,
        "unit": "g",
        "notes": "Trộn gỏi gà xé phay",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000010000001",
        "stepNumber": 1,
        "title": "Đồ xôi nếp dẻo bóng",
        "description": "Gạo nếp sau khi ngâm vớt ra để ráo, xóc với nửa muỗng cà phê muối và 1 muỗng mỡ gà. Cho vào xửng hấp chín dẻo trong 30 phút, thỉnh thoảng xới đều để hạt xôi chín tơi.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000010000002",
        "stepNumber": 2,
        "title": "Luộc gà và trộn gà xé phay",
        "description": "Luộc chín thịt gà ta với gừng và hành tím, để nguội rồi xé miếng vừa ăn. Trộn thịt gà với muối tiêu chanh, hành tây thái mỏng ngâm đá và rau răm cắt nhỏ.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000010000003",
        "stepNumber": 3,
        "title": "Rim trứng non và làm mỡ hành",
        "description": "Phi thơm hành tỏi, cho trứng gà non vào rim với nước tương, dầu hào, đường và chút nước luộc gà trong 10 phút cho thấm màu nâu bóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000010000004",
        "stepNumber": 4,
        "title": "Trình bày xôi gà trứng non",
        "description": "Đơm xôi nóng ra bát hoặc lá chuối, xếp gà xé phay và trứng non rim lên trên, rưới mỡ hành và rắc thật nhiều hành tím phi giòn rụm.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000010000001",
        "originalUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "altText": "Xôi Gà Xé Phay Hành Phi Trứng Non",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000010000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Gà Xé Phay Hành Phi Trứng Non - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000010000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Gà Xé Phay Hành Phi Trứng Non - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000011": {
    "id": "22222222-2222-4222-8222-000000000011",
    "title": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành",
    "slug": "xoi-xeo-dau-xanh-mo-hanh",
    "description": "Thức quà sáng kinh điển của Hà Nội với hạt xôi vàng óng dẻo thơm màu nghệ, những lát đậu xanh nắm mịn màng cắt xéo, quyện cùng mỡ gà béo ngậy và hành phi thơm nức.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-11T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 13,
    "nutrition": {
      "calories": 480,
      "protein": 14,
      "carbohydrates": 74,
      "fat": 13,
      "fiber": 5,
      "sodium": 420
    },
    "instructions": "Bước 1 (Ngâm gạo nếp với nước nghệ và đồ xôi): Gạo nếp ngâm cùng 2 muỗng nước cốt nghệ tươi trong 4 tiếng cho hạt nếp ngậm màu vàng tươi. Vớt ra để ráo, xóc chút muối rồi đồ trong xửng 30 phút cho xôi chín dẻo.\nBước 2 (Hấp đậu xanh và nắm quả đậu): Đậu xanh hấp chín bở với chút muối,趁 lúc còn nóng đem giã thật mịn cùng 1 muỗng mỡ gà rồi nắm chặt lại thành những nắm tròn chắc tay.\nBước 3 (Phi hành tím với mỡ gà): Đun nóng mỡ gà trên lửa vừa, thả hành tím thái lát vào đảo đều tay. Khi hành chuyển màu vàng tươi thì tắt bếp ngay và vớt hành ra giấy thấm dầu để hành giòn tan.\nBước 4 (Xéo đậu xanh và thưởng thức): Xới xôi vàng ra đĩa, dùng dao sắc thái xéo những lát đậu xanh mỏng phủ lên mặt xôi. Rưới 2 muỗng mỡ gà nóng hổi, rắc hành phi giòn và dùng kèm chả quế.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000011000001",
        "name": "Gạo nếp nhung hạt tròn",
        "quantity": 500,
        "unit": "g",
        "notes": "Ngâm với nước nghệ tươi tạo màu vàng tự nhiên",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000011000002",
        "name": "Đậu xanh cà vỏ",
        "quantity": 250,
        "unit": "g",
        "notes": "Ngâm mềm, hấp chín rồi giã nhuyễn nắm tròn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000011000003",
        "name": "Hành tím ta thái lát đều",
        "quantity": 150,
        "unit": "g",
        "notes": "Phơi hơi héo trước khi phi để giòn lâu",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000011000004",
        "name": "Mỡ gà hoặc dầu ăn, muối hạt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Dùng phi hành và rưới lên xôi",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000011000005",
        "name": "Chả quế hoặc ruốc thịt heo",
        "quantity": 150,
        "unit": "g",
        "notes": "Ăn kèm tăng hương vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000011000001",
        "stepNumber": 1,
        "title": "Ngâm gạo nếp với nước nghệ và đồ xôi",
        "description": "Gạo nếp ngâm cùng 2 muỗng nước cốt nghệ tươi trong 4 tiếng cho hạt nếp ngậm màu vàng tươi. Vớt ra để ráo, xóc chút muối rồi đồ trong xửng 30 phút cho xôi chín dẻo.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000011000002",
        "stepNumber": 2,
        "title": "Hấp đậu xanh và nắm quả đậu",
        "description": "Đậu xanh hấp chín bở với chút muối,趁 lúc còn nóng đem giã thật mịn cùng 1 muỗng mỡ gà rồi nắm chặt lại thành những nắm tròn chắc tay.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000011000003",
        "stepNumber": 3,
        "title": "Phi hành tím với mỡ gà",
        "description": "Đun nóng mỡ gà trên lửa vừa, thả hành tím thái lát vào đảo đều tay. Khi hành chuyển màu vàng tươi thì tắt bếp ngay và vớt hành ra giấy thấm dầu để hành giòn tan.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000011000004",
        "stepNumber": 4,
        "title": "Xéo đậu xanh và thưởng thức",
        "description": "Xới xôi vàng ra đĩa, dùng dao sắc thái xéo những lát đậu xanh mỏng phủ lên mặt xôi. Rưới 2 muỗng mỡ gà nóng hổi, rắc hành phi giòn và dùng kèm chả quế.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000011000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000011000002",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000011000003",
        "originalUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "xoi-xeo-dau-xanh-mo-hanh": {
    "id": "22222222-2222-4222-8222-000000000011",
    "title": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành",
    "slug": "xoi-xeo-dau-xanh-mo-hanh",
    "description": "Thức quà sáng kinh điển của Hà Nội với hạt xôi vàng óng dẻo thơm màu nghệ, những lát đậu xanh nắm mịn màng cắt xéo, quyện cùng mỡ gà béo ngậy và hành phi thơm nức.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000002",
    "categoryName": "Món Cơm & Xôi",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-11T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 13,
    "nutrition": {
      "calories": 480,
      "protein": 14,
      "carbohydrates": 74,
      "fat": 13,
      "fiber": 5,
      "sodium": 420
    },
    "instructions": "Bước 1 (Ngâm gạo nếp với nước nghệ và đồ xôi): Gạo nếp ngâm cùng 2 muỗng nước cốt nghệ tươi trong 4 tiếng cho hạt nếp ngậm màu vàng tươi. Vớt ra để ráo, xóc chút muối rồi đồ trong xửng 30 phút cho xôi chín dẻo.\nBước 2 (Hấp đậu xanh và nắm quả đậu): Đậu xanh hấp chín bở với chút muối,趁 lúc còn nóng đem giã thật mịn cùng 1 muỗng mỡ gà rồi nắm chặt lại thành những nắm tròn chắc tay.\nBước 3 (Phi hành tím với mỡ gà): Đun nóng mỡ gà trên lửa vừa, thả hành tím thái lát vào đảo đều tay. Khi hành chuyển màu vàng tươi thì tắt bếp ngay và vớt hành ra giấy thấm dầu để hành giòn tan.\nBước 4 (Xéo đậu xanh và thưởng thức): Xới xôi vàng ra đĩa, dùng dao sắc thái xéo những lát đậu xanh mỏng phủ lên mặt xôi. Rưới 2 muỗng mỡ gà nóng hổi, rắc hành phi giòn và dùng kèm chả quế.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000002",
      "name": "Món Cơm & Xôi",
      "slug": "mon-com-xoi",
      "description": "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 2,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000011000001",
        "name": "Gạo nếp nhung hạt tròn",
        "quantity": 500,
        "unit": "g",
        "notes": "Ngâm với nước nghệ tươi tạo màu vàng tự nhiên",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000011000002",
        "name": "Đậu xanh cà vỏ",
        "quantity": 250,
        "unit": "g",
        "notes": "Ngâm mềm, hấp chín rồi giã nhuyễn nắm tròn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000011000003",
        "name": "Hành tím ta thái lát đều",
        "quantity": 150,
        "unit": "g",
        "notes": "Phơi hơi héo trước khi phi để giòn lâu",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000011000004",
        "name": "Mỡ gà hoặc dầu ăn, muối hạt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Dùng phi hành và rưới lên xôi",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000011000005",
        "name": "Chả quế hoặc ruốc thịt heo",
        "quantity": 150,
        "unit": "g",
        "notes": "Ăn kèm tăng hương vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000011000001",
        "stepNumber": 1,
        "title": "Ngâm gạo nếp với nước nghệ và đồ xôi",
        "description": "Gạo nếp ngâm cùng 2 muỗng nước cốt nghệ tươi trong 4 tiếng cho hạt nếp ngậm màu vàng tươi. Vớt ra để ráo, xóc chút muối rồi đồ trong xửng 30 phút cho xôi chín dẻo.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000011000002",
        "stepNumber": 2,
        "title": "Hấp đậu xanh và nắm quả đậu",
        "description": "Đậu xanh hấp chín bở với chút muối,趁 lúc còn nóng đem giã thật mịn cùng 1 muỗng mỡ gà rồi nắm chặt lại thành những nắm tròn chắc tay.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000011000003",
        "stepNumber": 3,
        "title": "Phi hành tím với mỡ gà",
        "description": "Đun nóng mỡ gà trên lửa vừa, thả hành tím thái lát vào đảo đều tay. Khi hành chuyển màu vàng tươi thì tắt bếp ngay và vớt hành ra giấy thấm dầu để hành giòn tan.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000011000004",
        "stepNumber": 4,
        "title": "Xéo đậu xanh và thưởng thức",
        "description": "Xới xôi vàng ra đĩa, dùng dao sắc thái xéo những lát đậu xanh mỏng phủ lên mặt xôi. Rưới 2 muỗng mỡ gà nóng hổi, rắc hành phi giòn và dùng kèm chả quế.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000011000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000011000002",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000011000003",
        "originalUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
        "altText": "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000012": {
    "id": "22222222-2222-4222-8222-000000000012",
    "title": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi",
    "slug": "thit-kho-tau-trung-vit-nuoc-dua",
    "description": "Món thịt kho tàu truyền thống với những khối thịt ba chỉ vuông vắn mềm rục, lớp mỡ trong veo không ngấy, trứng vịt thấm vị nâu cánh gián nhờ kho chậm với nước dừa xiêm tươi.",
    "prepTime": 25,
    "cookTime": 75,
    "totalTime": 100,
    "servings": 6,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-12T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 16,
    "nutrition": {
      "calories": 580,
      "protein": 32,
      "carbohydrates": 18,
      "fat": 41,
      "fiber": 1,
      "sodium": 920
    },
    "instructions": "Bước 1 (Chần sơ và ướp thịt ba chỉ): Chần khối thịt ba chỉ trong nước sôi có gừng 3 phút rồi rửa sạch để lớp da trong. Ướp thịt với hành tỏi băm, nước mắm cốt, đường vàng, tiêu và 1 muỗng nước màu dừa trong 30 phút.\nBước 2 (Xào săn thịt và đổ nước dừa tươi): Bắc nồi lên bếp, cho thịt đã ướp vào đảo lửa vừa cho các mặt thịt săn lại. Đổ nước dừa xiêm tươi ngập mặt thịt, đun sôi rồi hớt sạch bọt.\nBước 3 (Kho nhỏ lửa cho thịt mềm rục): Hạ lửa nhỏ liu riu, đậy lá chuối hoặc mở hé nắp kho trong 50 phút cho thịt mềm trong và nước kho sánh màu cánh gián đẹp mắt.\nBước 4 (Cho trứng vịt vào kho thấm vị): Thả trứng vịt luộc và vài quả ớt nguyên trái vào kho thêm 15 phút để trứng ngấm đều màu nâu bóng. Múc ra tô dùng nóng với cơm trắng và dưa giá chua.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000012000001",
        "name": "Thịt ba chỉ heo rút sườn",
        "quantity": 800,
        "unit": "g",
        "notes": "Cắt khối vuông dày 4cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000012000002",
        "name": "Trứng vịt luộc bóc vỏ",
        "quantity": 6,
        "unit": "quả",
        "notes": "Luộc chín tới bóc vỏ khéo léo",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000012000003",
        "name": "Nước dừa xiêm tươi",
        "quantity": 800,
        "unit": "ml",
        "notes": "Tạo màu nâu đỏ tự nhiên và vị ngọt thanh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000012000004",
        "name": "Nước mắm cốt nhĩ 40 độ đạm",
        "quantity": 5,
        "unit": "muỗng canh",
        "notes": "Gia vị chính tạo hương thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000012000005",
        "name": "Đường vàng, hành tím, tỏi, ớt trái",
        "quantity": 60,
        "unit": "g",
        "notes": "Thắng nước màu và ướp thịt",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000012000001",
        "stepNumber": 1,
        "title": "Chần sơ và ướp thịt ba chỉ",
        "description": "Chần khối thịt ba chỉ trong nước sôi có gừng 3 phút rồi rửa sạch để lớp da trong. Ướp thịt với hành tỏi băm, nước mắm cốt, đường vàng, tiêu và 1 muỗng nước màu dừa trong 30 phút.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000012000002",
        "stepNumber": 2,
        "title": "Xào săn thịt và đổ nước dừa tươi",
        "description": "Bắc nồi lên bếp, cho thịt đã ướp vào đảo lửa vừa cho các mặt thịt săn lại. Đổ nước dừa xiêm tươi ngập mặt thịt, đun sôi rồi hớt sạch bọt.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000012000003",
        "stepNumber": 3,
        "title": "Kho nhỏ lửa cho thịt mềm rục",
        "description": "Hạ lửa nhỏ liu riu, đậy lá chuối hoặc mở hé nắp kho trong 50 phút cho thịt mềm trong và nước kho sánh màu cánh gián đẹp mắt.",
        "timerMinutes": 50,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000012000004",
        "stepNumber": 4,
        "title": "Cho trứng vịt vào kho thấm vị",
        "description": "Thả trứng vịt luộc và vài quả ớt nguyên trái vào kho thêm 15 phút để trứng ngấm đều màu nâu bóng. Múc ra tô dùng nóng với cơm trắng và dưa giá chua.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000012000001",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "altText": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000012000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000012000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "thit-kho-tau-trung-vit-nuoc-dua": {
    "id": "22222222-2222-4222-8222-000000000012",
    "title": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi",
    "slug": "thit-kho-tau-trung-vit-nuoc-dua",
    "description": "Món thịt kho tàu truyền thống với những khối thịt ba chỉ vuông vắn mềm rục, lớp mỡ trong veo không ngấy, trứng vịt thấm vị nâu cánh gián nhờ kho chậm với nước dừa xiêm tươi.",
    "prepTime": 25,
    "cookTime": 75,
    "totalTime": 100,
    "servings": 6,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-12T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 16,
    "nutrition": {
      "calories": 580,
      "protein": 32,
      "carbohydrates": 18,
      "fat": 41,
      "fiber": 1,
      "sodium": 920
    },
    "instructions": "Bước 1 (Chần sơ và ướp thịt ba chỉ): Chần khối thịt ba chỉ trong nước sôi có gừng 3 phút rồi rửa sạch để lớp da trong. Ướp thịt với hành tỏi băm, nước mắm cốt, đường vàng, tiêu và 1 muỗng nước màu dừa trong 30 phút.\nBước 2 (Xào săn thịt và đổ nước dừa tươi): Bắc nồi lên bếp, cho thịt đã ướp vào đảo lửa vừa cho các mặt thịt săn lại. Đổ nước dừa xiêm tươi ngập mặt thịt, đun sôi rồi hớt sạch bọt.\nBước 3 (Kho nhỏ lửa cho thịt mềm rục): Hạ lửa nhỏ liu riu, đậy lá chuối hoặc mở hé nắp kho trong 50 phút cho thịt mềm trong và nước kho sánh màu cánh gián đẹp mắt.\nBước 4 (Cho trứng vịt vào kho thấm vị): Thả trứng vịt luộc và vài quả ớt nguyên trái vào kho thêm 15 phút để trứng ngấm đều màu nâu bóng. Múc ra tô dùng nóng với cơm trắng và dưa giá chua.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000012000001",
        "name": "Thịt ba chỉ heo rút sườn",
        "quantity": 800,
        "unit": "g",
        "notes": "Cắt khối vuông dày 4cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000012000002",
        "name": "Trứng vịt luộc bóc vỏ",
        "quantity": 6,
        "unit": "quả",
        "notes": "Luộc chín tới bóc vỏ khéo léo",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000012000003",
        "name": "Nước dừa xiêm tươi",
        "quantity": 800,
        "unit": "ml",
        "notes": "Tạo màu nâu đỏ tự nhiên và vị ngọt thanh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000012000004",
        "name": "Nước mắm cốt nhĩ 40 độ đạm",
        "quantity": 5,
        "unit": "muỗng canh",
        "notes": "Gia vị chính tạo hương thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000012000005",
        "name": "Đường vàng, hành tím, tỏi, ớt trái",
        "quantity": 60,
        "unit": "g",
        "notes": "Thắng nước màu và ướp thịt",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000012000001",
        "stepNumber": 1,
        "title": "Chần sơ và ướp thịt ba chỉ",
        "description": "Chần khối thịt ba chỉ trong nước sôi có gừng 3 phút rồi rửa sạch để lớp da trong. Ướp thịt với hành tỏi băm, nước mắm cốt, đường vàng, tiêu và 1 muỗng nước màu dừa trong 30 phút.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000012000002",
        "stepNumber": 2,
        "title": "Xào săn thịt và đổ nước dừa tươi",
        "description": "Bắc nồi lên bếp, cho thịt đã ướp vào đảo lửa vừa cho các mặt thịt săn lại. Đổ nước dừa xiêm tươi ngập mặt thịt, đun sôi rồi hớt sạch bọt.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000012000003",
        "stepNumber": 3,
        "title": "Kho nhỏ lửa cho thịt mềm rục",
        "description": "Hạ lửa nhỏ liu riu, đậy lá chuối hoặc mở hé nắp kho trong 50 phút cho thịt mềm trong và nước kho sánh màu cánh gián đẹp mắt.",
        "timerMinutes": 50,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000012000004",
        "stepNumber": 4,
        "title": "Cho trứng vịt vào kho thấm vị",
        "description": "Thả trứng vịt luộc và vài quả ớt nguyên trái vào kho thêm 15 phút để trứng ngấm đều màu nâu bóng. Múc ra tô dùng nóng với cơm trắng và dưa giá chua.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000012000001",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "altText": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000012000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000012000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000013": {
    "id": "22222222-2222-4222-8222-000000000013",
    "title": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây",
    "slug": "ca-loc-kho-to-tieu-xanh",
    "description": "Khúc cá lóc đồng kho trong nồi đất săn chắc, thấm đẫm nước sốt kẹo sánh màu hổ phách, thơm nồng mùi tiêu xanh, hành lá và tóp mỡ giòn béo chuẩn vị dân dã miền Tây.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-13T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 19,
    "nutrition": {
      "calories": 390,
      "protein": 34,
      "carbohydrates": 16,
      "fat": 20,
      "fiber": 2,
      "sodium": 860
    },
    "instructions": "Bước 1 (Sơ chế khử tanh và ướp cá lóc): Rửa sạch cá lóc với nước muối và chanh tươi để hết sạch nhớt, để ráo. Ướp cá trong nồi đất với nước mắm, đường thốt nốt, hành tỏi băm và tiêu xay trong 20 phút.\nBước 2 (Thắng tóp mỡ và nước màu caramel): Cho mỡ heo vào chảo thắng vàng giòn lấy tóp mỡ. Dùng 2 muỗng mỡ nước thắng đường thốt nốt lên màu nâu cánh gián rồi phi thơm hành tỏi, rưới đều vào nồi cá.\nBước 3 (Kho cá lóc trong tộ đất): Bắc tộ cá lên bếp đun lửa vừa cho cá săn hai mặt, thêm 150ml nước sôi và nhánh tiêu xanh, ớt hiểm vào. Hạ lửa nhỏ kho liu riu 25 phút cho nước kho sánh kẹo.\nBước 4 (Rắc tóp mỡ và hành lá): Khi nước kho sệt lại bám đều từng khoanh cá, rắc tóp mỡ giòn, hành lá cắt khúc và tiêu xay lên trên, bắc nguyên tộ đất đang sôi lăn tăn ra bàn ăn cùng cơm nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000013000001",
        "name": "Cá lóc đồng làm sạch",
        "quantity": 700,
        "unit": "g",
        "notes": "Chà muối chanh sạch nhớt, cắt khoanh dày 2cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000013000002",
        "name": "Thịt mỡ heo thái hạt lựu",
        "quantity": 100,
        "unit": "g",
        "notes": "Thắng lấy tóp mỡ và mỡ nước kho cá",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000013000003",
        "name": "Tiêu xanh nguyên nhánh & ớt hiểm",
        "quantity": 30,
        "unit": "g",
        "notes": "Tạo vị cay thơm nồng nàn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000013000004",
        "name": "Nước mắm ngon, đường thốt nốt",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo màu caramel và vị mặn ngọt hài hòa",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000013000005",
        "name": "Hành tím, tỏi băm, hành lá",
        "quantity": 50,
        "unit": "g",
        "notes": "Phi thơm và rắc mặt nồi cá",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000013000001",
        "stepNumber": 1,
        "title": "Sơ chế khử tanh và ướp cá lóc",
        "description": "Rửa sạch cá lóc với nước muối và chanh tươi để hết sạch nhớt, để ráo. Ướp cá trong nồi đất với nước mắm, đường thốt nốt, hành tỏi băm và tiêu xay trong 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000013000002",
        "stepNumber": 2,
        "title": "Thắng tóp mỡ và nước màu caramel",
        "description": "Cho mỡ heo vào chảo thắng vàng giòn lấy tóp mỡ. Dùng 2 muỗng mỡ nước thắng đường thốt nốt lên màu nâu cánh gián rồi phi thơm hành tỏi, rưới đều vào nồi cá.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000013000003",
        "stepNumber": 3,
        "title": "Kho cá lóc trong tộ đất",
        "description": "Bắc tộ cá lên bếp đun lửa vừa cho cá săn hai mặt, thêm 150ml nước sôi và nhánh tiêu xanh, ớt hiểm vào. Hạ lửa nhỏ kho liu riu 25 phút cho nước kho sánh kẹo.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000013000004",
        "stepNumber": 4,
        "title": "Rắc tóp mỡ và hành lá",
        "description": "Khi nước kho sệt lại bám đều từng khoanh cá, rắc tóp mỡ giòn, hành lá cắt khúc và tiêu xay lên trên, bắc nguyên tộ đất đang sôi lăn tăn ra bàn ăn cùng cơm nóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000013000001",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "altText": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000013000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000013000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ca-loc-kho-to-tieu-xanh": {
    "id": "22222222-2222-4222-8222-000000000013",
    "title": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây",
    "slug": "ca-loc-kho-to-tieu-xanh",
    "description": "Khúc cá lóc đồng kho trong nồi đất săn chắc, thấm đẫm nước sốt kẹo sánh màu hổ phách, thơm nồng mùi tiêu xanh, hành lá và tóp mỡ giòn béo chuẩn vị dân dã miền Tây.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-13T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 19,
    "nutrition": {
      "calories": 390,
      "protein": 34,
      "carbohydrates": 16,
      "fat": 20,
      "fiber": 2,
      "sodium": 860
    },
    "instructions": "Bước 1 (Sơ chế khử tanh và ướp cá lóc): Rửa sạch cá lóc với nước muối và chanh tươi để hết sạch nhớt, để ráo. Ướp cá trong nồi đất với nước mắm, đường thốt nốt, hành tỏi băm và tiêu xay trong 20 phút.\nBước 2 (Thắng tóp mỡ và nước màu caramel): Cho mỡ heo vào chảo thắng vàng giòn lấy tóp mỡ. Dùng 2 muỗng mỡ nước thắng đường thốt nốt lên màu nâu cánh gián rồi phi thơm hành tỏi, rưới đều vào nồi cá.\nBước 3 (Kho cá lóc trong tộ đất): Bắc tộ cá lên bếp đun lửa vừa cho cá săn hai mặt, thêm 150ml nước sôi và nhánh tiêu xanh, ớt hiểm vào. Hạ lửa nhỏ kho liu riu 25 phút cho nước kho sánh kẹo.\nBước 4 (Rắc tóp mỡ và hành lá): Khi nước kho sệt lại bám đều từng khoanh cá, rắc tóp mỡ giòn, hành lá cắt khúc và tiêu xay lên trên, bắc nguyên tộ đất đang sôi lăn tăn ra bàn ăn cùng cơm nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000013000001",
        "name": "Cá lóc đồng làm sạch",
        "quantity": 700,
        "unit": "g",
        "notes": "Chà muối chanh sạch nhớt, cắt khoanh dày 2cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000013000002",
        "name": "Thịt mỡ heo thái hạt lựu",
        "quantity": 100,
        "unit": "g",
        "notes": "Thắng lấy tóp mỡ và mỡ nước kho cá",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000013000003",
        "name": "Tiêu xanh nguyên nhánh & ớt hiểm",
        "quantity": 30,
        "unit": "g",
        "notes": "Tạo vị cay thơm nồng nàn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000013000004",
        "name": "Nước mắm ngon, đường thốt nốt",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo màu caramel và vị mặn ngọt hài hòa",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000013000005",
        "name": "Hành tím, tỏi băm, hành lá",
        "quantity": 50,
        "unit": "g",
        "notes": "Phi thơm và rắc mặt nồi cá",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000013000001",
        "stepNumber": 1,
        "title": "Sơ chế khử tanh và ướp cá lóc",
        "description": "Rửa sạch cá lóc với nước muối và chanh tươi để hết sạch nhớt, để ráo. Ướp cá trong nồi đất với nước mắm, đường thốt nốt, hành tỏi băm và tiêu xay trong 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000013000002",
        "stepNumber": 2,
        "title": "Thắng tóp mỡ và nước màu caramel",
        "description": "Cho mỡ heo vào chảo thắng vàng giòn lấy tóp mỡ. Dùng 2 muỗng mỡ nước thắng đường thốt nốt lên màu nâu cánh gián rồi phi thơm hành tỏi, rưới đều vào nồi cá.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000013000003",
        "stepNumber": 3,
        "title": "Kho cá lóc trong tộ đất",
        "description": "Bắc tộ cá lên bếp đun lửa vừa cho cá săn hai mặt, thêm 150ml nước sôi và nhánh tiêu xanh, ớt hiểm vào. Hạ lửa nhỏ kho liu riu 25 phút cho nước kho sánh kẹo.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000013000004",
        "stepNumber": 4,
        "title": "Rắc tóp mỡ và hành lá",
        "description": "Khi nước kho sệt lại bám đều từng khoanh cá, rắc tóp mỡ giòn, hành lá cắt khúc và tiêu xay lên trên, bắc nguyên tộ đất đang sôi lăn tăn ra bàn ăn cùng cơm nóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000013000001",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "altText": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000013000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000013000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000014": {
    "id": "22222222-2222-4222-8222-000000000014",
    "title": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa",
    "slug": "ga-kho-gung-sa-ot",
    "description": "Thịt gà ta săn chắc được kho thấm đẫm hương thơm ấm nồng của gừng tươi thái sợi và sả ớt băm nhuyễn, nước kho sánh vàng cực kỳ bắt cơm trong những ngày se lạnh.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-14T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 22,
    "nutrition": {
      "calories": 420,
      "protein": 35,
      "carbohydrates": 14,
      "fat": 24,
      "fiber": 2,
      "sodium": 780
    },
    "instructions": "Bước 1 (Ướp thịt gà với gừng và bột nghệ): Chặt thịt gà thành miếng vuông vừa ăn, ướp với gừng băm, nửa phần sả ớt, nước mắm, đường nâu, bột nghệ và tiêu trong 20 phút.\nBước 2 (Phi thơm sả gừng và xào săn gà): Đun nóng dầu ăn, phi thơm hành tỏi, phần sả băm và gừng thái sợi cho dậy mùi. Trút thịt gà vào đảo đều trên lửa lớn cho miếng gà săn chắc và da gà vàng bóng.\nBước 3 (Kho gà thấm vị trên lửa nhỏ): Chế thêm 150ml nước dừa hoặc nước ấm vào nồi, đậy nắp kho lửa nhỏ 20 phút cho thịt gà chín mềm và nước sốt cạn sệt lại.\nBước 4 (Nêm lại và trình bày): Cho ớt thái lát và một ít gừng sợi tươi lên trên, đảo đều 1 phút rồi tắt bếp. Dọn món gà kho gừng sả ớt ra đĩa sâu lòng ăn kèm cơm trắng nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000014000001",
        "name": "Thịt gà ta chặt miếng vừa ăn",
        "quantity": 700,
        "unit": "g",
        "notes": "Chà muối gừng rửa sạch để ráo",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000014000002",
        "name": "Gừng già tươi",
        "quantity": 60,
        "unit": "g",
        "notes": "Một nửa băm nhỏ ướp gà, một nửa thái sợi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000014000003",
        "name": "Sả cây & ớt sừng đỏ",
        "quantity": 4,
        "unit": "cây",
        "notes": "Băm nhuyễn sả và ớt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000014000004",
        "name": "Nước mắm, đường nâu, bột nghệ",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Ướp gà lên màu vàng đẹp",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000014000005",
        "name": "Hành tím, tỏi, tiêu đen",
        "quantity": 30,
        "unit": "g",
        "notes": "Phi thơm dạy mùi",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000014000001",
        "stepNumber": 1,
        "title": "Ướp thịt gà với gừng và bột nghệ",
        "description": "Chặt thịt gà thành miếng vuông vừa ăn, ướp với gừng băm, nửa phần sả ớt, nước mắm, đường nâu, bột nghệ và tiêu trong 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000014000002",
        "stepNumber": 2,
        "title": "Phi thơm sả gừng và xào săn gà",
        "description": "Đun nóng dầu ăn, phi thơm hành tỏi, phần sả băm và gừng thái sợi cho dậy mùi. Trút thịt gà vào đảo đều trên lửa lớn cho miếng gà săn chắc và da gà vàng bóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000014000003",
        "stepNumber": 3,
        "title": "Kho gà thấm vị trên lửa nhỏ",
        "description": "Chế thêm 150ml nước dừa hoặc nước ấm vào nồi, đậy nắp kho lửa nhỏ 20 phút cho thịt gà chín mềm và nước sốt cạn sệt lại.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000014000004",
        "stepNumber": 4,
        "title": "Nêm lại và trình bày",
        "description": "Cho ớt thái lát và một ít gừng sợi tươi lên trên, đảo đều 1 phút rồi tắt bếp. Dọn món gà kho gừng sả ớt ra đĩa sâu lòng ăn kèm cơm trắng nóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000014000001",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "altText": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000014000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000014000003",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ga-kho-gung-sa-ot": {
    "id": "22222222-2222-4222-8222-000000000014",
    "title": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa",
    "slug": "ga-kho-gung-sa-ot",
    "description": "Thịt gà ta săn chắc được kho thấm đẫm hương thơm ấm nồng của gừng tươi thái sợi và sả ớt băm nhuyễn, nước kho sánh vàng cực kỳ bắt cơm trong những ngày se lạnh.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-14T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 22,
    "nutrition": {
      "calories": 420,
      "protein": 35,
      "carbohydrates": 14,
      "fat": 24,
      "fiber": 2,
      "sodium": 780
    },
    "instructions": "Bước 1 (Ướp thịt gà với gừng và bột nghệ): Chặt thịt gà thành miếng vuông vừa ăn, ướp với gừng băm, nửa phần sả ớt, nước mắm, đường nâu, bột nghệ và tiêu trong 20 phút.\nBước 2 (Phi thơm sả gừng và xào săn gà): Đun nóng dầu ăn, phi thơm hành tỏi, phần sả băm và gừng thái sợi cho dậy mùi. Trút thịt gà vào đảo đều trên lửa lớn cho miếng gà săn chắc và da gà vàng bóng.\nBước 3 (Kho gà thấm vị trên lửa nhỏ): Chế thêm 150ml nước dừa hoặc nước ấm vào nồi, đậy nắp kho lửa nhỏ 20 phút cho thịt gà chín mềm và nước sốt cạn sệt lại.\nBước 4 (Nêm lại và trình bày): Cho ớt thái lát và một ít gừng sợi tươi lên trên, đảo đều 1 phút rồi tắt bếp. Dọn món gà kho gừng sả ớt ra đĩa sâu lòng ăn kèm cơm trắng nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000014000001",
        "name": "Thịt gà ta chặt miếng vừa ăn",
        "quantity": 700,
        "unit": "g",
        "notes": "Chà muối gừng rửa sạch để ráo",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000014000002",
        "name": "Gừng già tươi",
        "quantity": 60,
        "unit": "g",
        "notes": "Một nửa băm nhỏ ướp gà, một nửa thái sợi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000014000003",
        "name": "Sả cây & ớt sừng đỏ",
        "quantity": 4,
        "unit": "cây",
        "notes": "Băm nhuyễn sả và ớt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000014000004",
        "name": "Nước mắm, đường nâu, bột nghệ",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Ướp gà lên màu vàng đẹp",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000014000005",
        "name": "Hành tím, tỏi, tiêu đen",
        "quantity": 30,
        "unit": "g",
        "notes": "Phi thơm dạy mùi",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000014000001",
        "stepNumber": 1,
        "title": "Ướp thịt gà với gừng và bột nghệ",
        "description": "Chặt thịt gà thành miếng vuông vừa ăn, ướp với gừng băm, nửa phần sả ớt, nước mắm, đường nâu, bột nghệ và tiêu trong 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000014000002",
        "stepNumber": 2,
        "title": "Phi thơm sả gừng và xào săn gà",
        "description": "Đun nóng dầu ăn, phi thơm hành tỏi, phần sả băm và gừng thái sợi cho dậy mùi. Trút thịt gà vào đảo đều trên lửa lớn cho miếng gà săn chắc và da gà vàng bóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000014000003",
        "stepNumber": 3,
        "title": "Kho gà thấm vị trên lửa nhỏ",
        "description": "Chế thêm 150ml nước dừa hoặc nước ấm vào nồi, đậy nắp kho lửa nhỏ 20 phút cho thịt gà chín mềm và nước sốt cạn sệt lại.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000014000004",
        "stepNumber": 4,
        "title": "Nêm lại và trình bày",
        "description": "Cho ớt thái lát và một ít gừng sợi tươi lên trên, đảo đều 1 phút rồi tắt bếp. Dọn món gà kho gừng sả ớt ra đĩa sâu lòng ăn kèm cơm trắng nóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000014000001",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
        "altText": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000014000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000014000003",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000015": {
    "id": "22222222-2222-4222-8222-000000000015",
    "title": "Sườn Non Rim Mặn Ngọt Nước Dừa",
    "slug": "suon-non-rim-man-ngot",
    "description": "Những dẻ sườn non nhiều sụn được rim chậm trong nước dừa tươi và sốt mắm tỏi ớt cho đến khi mềm róc xương, áo lớp sốt nâu đỏ bóng mượt mặn ngọt hài hòa.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-15T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 25,
    "nutrition": {
      "calories": 490,
      "protein": 31,
      "carbohydrates": 19,
      "fat": 32,
      "fiber": 1,
      "sodium": 830
    },
    "instructions": "Bước 1 (Chần sườn non và ướp gia vị): Chần sườn non qua nước sôi có chút muối trong 3 phút rồi rửa sạch để ráo. Ướp sườn với hành tỏi băm, nước mắm, dầu hào và mật ong trong 15 phút.\nBước 2 (Áp chảo vàng hai mặt sườn): Làm nóng chảo với 1 muỗng dầu ăn, cho sườn vào áp chảo lửa vừa đến khi các cạnh sườn xém vàng thơm lừng.\nBước 3 (Rim sườn với nước dừa tươi): Đổ 300ml nước dừa tươi cùng phần nước ướp vào chảo, đậy nắp rim lửa nhỏ trong 25 phút cho sườn chín mềm và nước dừa rút cạn thành sốt kẹo.\nBước 4 (Đảo sốt áo đều và rắc mè rang): Mở nắp, tăng lửa vừa đảo đều 2 phút để lớp sốt nâu đỏ bóng mượt bám chặt quanh từng miếng sườn. Rắc hành lá và mè trắng rang lên trên rồi bày ra đĩa.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000015000001",
        "name": "Sườn non heo nhiều sụn",
        "quantity": 600,
        "unit": "g",
        "notes": "Chặt miếng dài 4cm vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000015000002",
        "name": "Nước dừa tươi",
        "quantity": 300,
        "unit": "ml",
        "notes": "Giúp sườn mềm ngọt và lên màu tự nhiên",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000015000003",
        "name": "Nước mắm, dầu hào, mật ong",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo lớp sốt bóng mượt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000015000004",
        "name": "Tỏi băm, hành tím băm, ớt",
        "quantity": 40,
        "unit": "g",
        "notes": "Phi thơm tạo hương vị đậm đà",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000015000005",
        "name": "Hành lá, mè trắng rang",
        "quantity": 15,
        "unit": "g",
        "notes": "Rắc trang trí khi hoàn tất",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000015000001",
        "stepNumber": 1,
        "title": "Chần sườn non và ướp gia vị",
        "description": "Chần sườn non qua nước sôi có chút muối trong 3 phút rồi rửa sạch để ráo. Ướp sườn với hành tỏi băm, nước mắm, dầu hào và mật ong trong 15 phút.",
        "timerMinutes": 18,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000015000002",
        "stepNumber": 2,
        "title": "Áp chảo vàng hai mặt sườn",
        "description": "Làm nóng chảo với 1 muỗng dầu ăn, cho sườn vào áp chảo lửa vừa đến khi các cạnh sườn xém vàng thơm lừng.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000015000003",
        "stepNumber": 3,
        "title": "Rim sườn với nước dừa tươi",
        "description": "Đổ 300ml nước dừa tươi cùng phần nước ướp vào chảo, đậy nắp rim lửa nhỏ trong 25 phút cho sườn chín mềm và nước dừa rút cạn thành sốt kẹo.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000015000004",
        "stepNumber": 4,
        "title": "Đảo sốt áo đều và rắc mè rang",
        "description": "Mở nắp, tăng lửa vừa đảo đều 2 phút để lớp sốt nâu đỏ bóng mượt bám chặt quanh từng miếng sườn. Rắc hành lá và mè trắng rang lên trên rồi bày ra đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000015000001",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "altText": "Sườn Non Rim Mặn Ngọt Nước Dừa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000015000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Non Rim Mặn Ngọt Nước Dừa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000015000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Non Rim Mặn Ngọt Nước Dừa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "suon-non-rim-man-ngot": {
    "id": "22222222-2222-4222-8222-000000000015",
    "title": "Sườn Non Rim Mặn Ngọt Nước Dừa",
    "slug": "suon-non-rim-man-ngot",
    "description": "Những dẻ sườn non nhiều sụn được rim chậm trong nước dừa tươi và sốt mắm tỏi ớt cho đến khi mềm róc xương, áo lớp sốt nâu đỏ bóng mượt mặn ngọt hài hòa.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-15T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 25,
    "nutrition": {
      "calories": 490,
      "protein": 31,
      "carbohydrates": 19,
      "fat": 32,
      "fiber": 1,
      "sodium": 830
    },
    "instructions": "Bước 1 (Chần sườn non và ướp gia vị): Chần sườn non qua nước sôi có chút muối trong 3 phút rồi rửa sạch để ráo. Ướp sườn với hành tỏi băm, nước mắm, dầu hào và mật ong trong 15 phút.\nBước 2 (Áp chảo vàng hai mặt sườn): Làm nóng chảo với 1 muỗng dầu ăn, cho sườn vào áp chảo lửa vừa đến khi các cạnh sườn xém vàng thơm lừng.\nBước 3 (Rim sườn với nước dừa tươi): Đổ 300ml nước dừa tươi cùng phần nước ướp vào chảo, đậy nắp rim lửa nhỏ trong 25 phút cho sườn chín mềm và nước dừa rút cạn thành sốt kẹo.\nBước 4 (Đảo sốt áo đều và rắc mè rang): Mở nắp, tăng lửa vừa đảo đều 2 phút để lớp sốt nâu đỏ bóng mượt bám chặt quanh từng miếng sườn. Rắc hành lá và mè trắng rang lên trên rồi bày ra đĩa.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000015000001",
        "name": "Sườn non heo nhiều sụn",
        "quantity": 600,
        "unit": "g",
        "notes": "Chặt miếng dài 4cm vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000015000002",
        "name": "Nước dừa tươi",
        "quantity": 300,
        "unit": "ml",
        "notes": "Giúp sườn mềm ngọt và lên màu tự nhiên",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000015000003",
        "name": "Nước mắm, dầu hào, mật ong",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo lớp sốt bóng mượt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000015000004",
        "name": "Tỏi băm, hành tím băm, ớt",
        "quantity": 40,
        "unit": "g",
        "notes": "Phi thơm tạo hương vị đậm đà",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000015000005",
        "name": "Hành lá, mè trắng rang",
        "quantity": 15,
        "unit": "g",
        "notes": "Rắc trang trí khi hoàn tất",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000015000001",
        "stepNumber": 1,
        "title": "Chần sườn non và ướp gia vị",
        "description": "Chần sườn non qua nước sôi có chút muối trong 3 phút rồi rửa sạch để ráo. Ướp sườn với hành tỏi băm, nước mắm, dầu hào và mật ong trong 15 phút.",
        "timerMinutes": 18,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000015000002",
        "stepNumber": 2,
        "title": "Áp chảo vàng hai mặt sườn",
        "description": "Làm nóng chảo với 1 muỗng dầu ăn, cho sườn vào áp chảo lửa vừa đến khi các cạnh sườn xém vàng thơm lừng.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000015000003",
        "stepNumber": 3,
        "title": "Rim sườn với nước dừa tươi",
        "description": "Đổ 300ml nước dừa tươi cùng phần nước ướp vào chảo, đậy nắp rim lửa nhỏ trong 25 phút cho sườn chín mềm và nước dừa rút cạn thành sốt kẹo.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000015000004",
        "stepNumber": 4,
        "title": "Đảo sốt áo đều và rắc mè rang",
        "description": "Mở nắp, tăng lửa vừa đảo đều 2 phút để lớp sốt nâu đỏ bóng mượt bám chặt quanh từng miếng sườn. Rắc hành lá và mè trắng rang lên trên rồi bày ra đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000015000001",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "altText": "Sườn Non Rim Mặn Ngọt Nước Dừa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000015000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Non Rim Mặn Ngọt Nước Dừa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000015000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Non Rim Mặn Ngọt Nước Dừa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000016": {
    "id": "22222222-2222-4222-8222-000000000016",
    "title": "Cá Bống Sông Kho Tiêu Nồi Đất",
    "slug": "ca-bong-song-kho-tieu-noi-dat",
    "description": "Con cá bống sông kho khô săn chắc đến tận xương, ngấm vị mặn ngọt của nước mắm truyền thống và vị cay thơm của tiêu đen đập dập, ăn cùng cháo trắng hay cơm nóng đều tuyệt hảo.",
    "prepTime": 15,
    "cookTime": 40,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-16T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 28,
    "nutrition": {
      "calories": 340,
      "protein": 32,
      "carbohydrates": 15,
      "fat": 16,
      "fiber": 1,
      "sodium": 880
    },
    "instructions": "Bước 1 (Xóc muối làm săn cá bống): Cá bống làm sạch ruột và vảy, rửa qua nước trà xanh hoặc muối loãng rồi để ráo. Ướp cá với đường, nước mắm, tiêu sọ đập dập trong 20 phút cho thân cá săn cứng lại.\nBước 2 (Xào thịt ba chỉ và xếp cá vào nồi đất): Thắng chút đường làm nước màu trong nồi đất, cho thịt ba chỉ thái nhỏ và hành tỏi vào đảo săn rồi xếp từng con cá bống lên trên.\nBước 3 (Kho cá bống hai lửa cho săn chắc): Đun sôi nồi cá trên lửa nhỏ 15 phút rồi tắt bếp để nguội cho cá dẻo thịt. Sau đó bật bếp kho lửa thật nhỏ lần 2 thêm 20 phút cho đến khi nước kho cạn sánh.\nBước 4 (Rắc tiêu sọ và thưởng thức): Rưới thêm 1 muỗng dầu ăn hoặc mỡ nước để con cá bóng đẹp, rắc tiêu sọ đập dập và ớt hiểm lên mặt, dùng ngay với cơm trắng hoặc cơm cháy.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000016000001",
        "name": "Cá bống sông tươi",
        "quantity": 500,
        "unit": "g",
        "notes": "Làm sạch vảy, xóc muối cho thân cá săn cứng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000016000002",
        "name": "Thịt ba chỉ thái con chì",
        "quantity": 100,
        "unit": "g",
        "notes": "Kho cùng cá bống giúp cá bóng béo không khô",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000016000003",
        "name": "Nước mắm nhĩ, đường cát vàng",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Ướp cá lên màu cánh gián",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000016000004",
        "name": "Tiêu sọ đập dập & ớt trái",
        "quantity": 20,
        "unit": "g",
        "notes": "Tạo hương cay nồng đặc trưng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000016000005",
        "name": "Hành tím, tỏi, dầu ăn",
        "quantity": 30,
        "unit": "g",
        "notes": "Phi thơm lót đáy nồi đất",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000016000001",
        "stepNumber": 1,
        "title": "Xóc muối làm săn cá bống",
        "description": "Cá bống làm sạch ruột và vảy, rửa qua nước trà xanh hoặc muối loãng rồi để ráo. Ướp cá với đường, nước mắm, tiêu sọ đập dập trong 20 phút cho thân cá săn cứng lại.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000016000002",
        "stepNumber": 2,
        "title": "Xào thịt ba chỉ và xếp cá vào nồi đất",
        "description": "Thắng chút đường làm nước màu trong nồi đất, cho thịt ba chỉ thái nhỏ và hành tỏi vào đảo săn rồi xếp từng con cá bống lên trên.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000016000003",
        "stepNumber": 3,
        "title": "Kho cá bống hai lửa cho săn chắc",
        "description": "Đun sôi nồi cá trên lửa nhỏ 15 phút rồi tắt bếp để nguội cho cá dẻo thịt. Sau đó bật bếp kho lửa thật nhỏ lần 2 thêm 20 phút cho đến khi nước kho cạn sánh.",
        "timerMinutes": 35,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000016000004",
        "stepNumber": 4,
        "title": "Rắc tiêu sọ và thưởng thức",
        "description": "Rưới thêm 1 muỗng dầu ăn hoặc mỡ nước để con cá bóng đẹp, rắc tiêu sọ đập dập và ớt hiểm lên mặt, dùng ngay với cơm trắng hoặc cơm cháy.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000016000001",
        "originalUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
        "altText": "Cá Bống Sông Kho Tiêu Nồi Đất",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000016000002",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Bống Sông Kho Tiêu Nồi Đất - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000016000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Bống Sông Kho Tiêu Nồi Đất - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ca-bong-song-kho-tieu-noi-dat": {
    "id": "22222222-2222-4222-8222-000000000016",
    "title": "Cá Bống Sông Kho Tiêu Nồi Đất",
    "slug": "ca-bong-song-kho-tieu-noi-dat",
    "description": "Con cá bống sông kho khô săn chắc đến tận xương, ngấm vị mặn ngọt của nước mắm truyền thống và vị cay thơm của tiêu đen đập dập, ăn cùng cháo trắng hay cơm nóng đều tuyệt hảo.",
    "prepTime": 15,
    "cookTime": 40,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000003",
    "categoryName": "Món Kho & Rim",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-16T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 28,
    "nutrition": {
      "calories": 340,
      "protein": 32,
      "carbohydrates": 15,
      "fat": 16,
      "fiber": 1,
      "sodium": 880
    },
    "instructions": "Bước 1 (Xóc muối làm săn cá bống): Cá bống làm sạch ruột và vảy, rửa qua nước trà xanh hoặc muối loãng rồi để ráo. Ướp cá với đường, nước mắm, tiêu sọ đập dập trong 20 phút cho thân cá săn cứng lại.\nBước 2 (Xào thịt ba chỉ và xếp cá vào nồi đất): Thắng chút đường làm nước màu trong nồi đất, cho thịt ba chỉ thái nhỏ và hành tỏi vào đảo săn rồi xếp từng con cá bống lên trên.\nBước 3 (Kho cá bống hai lửa cho săn chắc): Đun sôi nồi cá trên lửa nhỏ 15 phút rồi tắt bếp để nguội cho cá dẻo thịt. Sau đó bật bếp kho lửa thật nhỏ lần 2 thêm 20 phút cho đến khi nước kho cạn sánh.\nBước 4 (Rắc tiêu sọ và thưởng thức): Rưới thêm 1 muỗng dầu ăn hoặc mỡ nước để con cá bóng đẹp, rắc tiêu sọ đập dập và ớt hiểm lên mặt, dùng ngay với cơm trắng hoặc cơm cháy.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000003",
      "name": "Món Kho & Rim",
      "slug": "mon-kho-rim",
      "description": "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.",
      "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 3,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000016000001",
        "name": "Cá bống sông tươi",
        "quantity": 500,
        "unit": "g",
        "notes": "Làm sạch vảy, xóc muối cho thân cá săn cứng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000016000002",
        "name": "Thịt ba chỉ thái con chì",
        "quantity": 100,
        "unit": "g",
        "notes": "Kho cùng cá bống giúp cá bóng béo không khô",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000016000003",
        "name": "Nước mắm nhĩ, đường cát vàng",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Ướp cá lên màu cánh gián",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000016000004",
        "name": "Tiêu sọ đập dập & ớt trái",
        "quantity": 20,
        "unit": "g",
        "notes": "Tạo hương cay nồng đặc trưng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000016000005",
        "name": "Hành tím, tỏi, dầu ăn",
        "quantity": 30,
        "unit": "g",
        "notes": "Phi thơm lót đáy nồi đất",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000016000001",
        "stepNumber": 1,
        "title": "Xóc muối làm săn cá bống",
        "description": "Cá bống làm sạch ruột và vảy, rửa qua nước trà xanh hoặc muối loãng rồi để ráo. Ướp cá với đường, nước mắm, tiêu sọ đập dập trong 20 phút cho thân cá săn cứng lại.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000016000002",
        "stepNumber": 2,
        "title": "Xào thịt ba chỉ và xếp cá vào nồi đất",
        "description": "Thắng chút đường làm nước màu trong nồi đất, cho thịt ba chỉ thái nhỏ và hành tỏi vào đảo săn rồi xếp từng con cá bống lên trên.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000016000003",
        "stepNumber": 3,
        "title": "Kho cá bống hai lửa cho săn chắc",
        "description": "Đun sôi nồi cá trên lửa nhỏ 15 phút rồi tắt bếp để nguội cho cá dẻo thịt. Sau đó bật bếp kho lửa thật nhỏ lần 2 thêm 20 phút cho đến khi nước kho cạn sánh.",
        "timerMinutes": 35,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000016000004",
        "stepNumber": 4,
        "title": "Rắc tiêu sọ và thưởng thức",
        "description": "Rưới thêm 1 muỗng dầu ăn hoặc mỡ nước để con cá bóng đẹp, rắc tiêu sọ đập dập và ớt hiểm lên mặt, dùng ngay với cơm trắng hoặc cơm cháy.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000016000001",
        "originalUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
        "altText": "Cá Bống Sông Kho Tiêu Nồi Đất",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000016000002",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Bống Sông Kho Tiêu Nồi Đất - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000016000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Bống Sông Kho Tiêu Nồi Đất - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000017": {
    "id": "22222222-2222-4222-8222-000000000017",
    "title": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ",
    "slug": "canh-chua-ca-loc-nam-bo",
    "description": "Tô canh chua chuẩn vị miền sông nước Nam Bộ với vị chua thanh từ nước cốt me chín, vị ngọt của dứa, cà chua, bạc hà, đậu bắp, giá đỗ và hương thơm nức mũi của ngò ôm, ngò gai, tỏi phi.",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-17T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 31,
    "nutrition": {
      "calories": 285,
      "protein": 27,
      "carbohydrates": 22,
      "fat": 9,
      "fiber": 5,
      "sodium": 680
    },
    "instructions": "Bước 1 (Sơ chế cá lóc và các loại rau canh chua): Cá lóc rửa sạch với muối chanh, cắt khoanh rồi ướp nhẹ chút nước mắm và tiêu. Bạc hà tước vỏ cắt xéo, đậu bắp cắt xéo, thơm cắt miếng quạt, cà chua bổ múi cau.\nBước 2 (Phi tỏi và nấu nước canh me): Phi vàng tỏi băm với dầu ăn, vớt phân nửa tỏi phi ra chén. Phần còn lại cho cà chua và thơm vào xào 3 phút rồi chế 1.2 lít nước sôi cùng nước cốt me vào đun sôi.\nBước 3 (Nấu chín cá lóc và nêm gia vị): Khi nước canh sôi mạnh, thả cá lóc vào nấu khoảng 10 phút trên lửa vừa, hớt bọt kỹ. Nêm đường, muối và nước mắm cho đạt vị chua thanh ngọt dịu đặc trưng Nam Bộ.\nBước 4 (Cho rau vào và rắc ngò ôm tỏi phi): Cho đậu bắp vào nấu 2 phút, tiếp tục cho bạc hà và giá đỗ vào đảo nhẹ rồi tắt bếp ngay để rau giữ độ giòn. Múc ra tô, rắc ngò ôm, ngò gai, ớt lát và tỏi phi vàng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000017000001",
        "name": "Cá lóc đồng tươi",
        "quantity": 600,
        "unit": "g",
        "notes": "Làm sạch, cắt khoanh vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000017000002",
        "name": "Me vắt chín",
        "quantity": 50,
        "unit": "g",
        "notes": "Dầm với nước ấm lọc lấy nước cốt me",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000017000003",
        "name": "Thơm (dứa), cà chua, đậu bắp, bạc hà",
        "quantity": 400,
        "unit": "g",
        "notes": "Thái lát xéo vừa ăn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000017000004",
        "name": "Giá đỗ tươi",
        "quantity": 100,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000017000005",
        "name": "Ngò ôm (rau ngổ), ngò gai, tỏi phi, ớt",
        "quantity": 50,
        "unit": "g",
        "notes": "Thái nhỏ rắc lên mặt canh",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000017000006",
        "name": "Nước mắm, đường phèn, muối",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Cân bằng vị chua ngọt",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000017000001",
        "stepNumber": 1,
        "title": "Sơ chế cá lóc và các loại rau canh chua",
        "description": "Cá lóc rửa sạch với muối chanh, cắt khoanh rồi ướp nhẹ chút nước mắm và tiêu. Bạc hà tước vỏ cắt xéo, đậu bắp cắt xéo, thơm cắt miếng quạt, cà chua bổ múi cau.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000017000002",
        "stepNumber": 2,
        "title": "Phi tỏi và nấu nước canh me",
        "description": "Phi vàng tỏi băm với dầu ăn, vớt phân nửa tỏi phi ra chén. Phần còn lại cho cà chua và thơm vào xào 3 phút rồi chế 1.2 lít nước sôi cùng nước cốt me vào đun sôi.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000017000003",
        "stepNumber": 3,
        "title": "Nấu chín cá lóc và nêm gia vị",
        "description": "Khi nước canh sôi mạnh, thả cá lóc vào nấu khoảng 10 phút trên lửa vừa, hớt bọt kỹ. Nêm đường, muối và nước mắm cho đạt vị chua thanh ngọt dịu đặc trưng Nam Bộ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000017000004",
        "stepNumber": 4,
        "title": "Cho rau vào và rắc ngò ôm tỏi phi",
        "description": "Cho đậu bắp vào nấu 2 phút, tiếp tục cho bạc hà và giá đỗ vào đảo nhẹ rồi tắt bếp ngay để rau giữ độ giòn. Múc ra tô, rắc ngò ôm, ngò gai, ớt lát và tỏi phi vàng.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000017000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000017000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000017000003",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "canh-chua-ca-loc-nam-bo": {
    "id": "22222222-2222-4222-8222-000000000017",
    "title": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ",
    "slug": "canh-chua-ca-loc-nam-bo",
    "description": "Tô canh chua chuẩn vị miền sông nước Nam Bộ với vị chua thanh từ nước cốt me chín, vị ngọt của dứa, cà chua, bạc hà, đậu bắp, giá đỗ và hương thơm nức mũi của ngò ôm, ngò gai, tỏi phi.",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-17T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 31,
    "nutrition": {
      "calories": 285,
      "protein": 27,
      "carbohydrates": 22,
      "fat": 9,
      "fiber": 5,
      "sodium": 680
    },
    "instructions": "Bước 1 (Sơ chế cá lóc và các loại rau canh chua): Cá lóc rửa sạch với muối chanh, cắt khoanh rồi ướp nhẹ chút nước mắm và tiêu. Bạc hà tước vỏ cắt xéo, đậu bắp cắt xéo, thơm cắt miếng quạt, cà chua bổ múi cau.\nBước 2 (Phi tỏi và nấu nước canh me): Phi vàng tỏi băm với dầu ăn, vớt phân nửa tỏi phi ra chén. Phần còn lại cho cà chua và thơm vào xào 3 phút rồi chế 1.2 lít nước sôi cùng nước cốt me vào đun sôi.\nBước 3 (Nấu chín cá lóc và nêm gia vị): Khi nước canh sôi mạnh, thả cá lóc vào nấu khoảng 10 phút trên lửa vừa, hớt bọt kỹ. Nêm đường, muối và nước mắm cho đạt vị chua thanh ngọt dịu đặc trưng Nam Bộ.\nBước 4 (Cho rau vào và rắc ngò ôm tỏi phi): Cho đậu bắp vào nấu 2 phút, tiếp tục cho bạc hà và giá đỗ vào đảo nhẹ rồi tắt bếp ngay để rau giữ độ giòn. Múc ra tô, rắc ngò ôm, ngò gai, ớt lát và tỏi phi vàng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000017000001",
        "name": "Cá lóc đồng tươi",
        "quantity": 600,
        "unit": "g",
        "notes": "Làm sạch, cắt khoanh vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000017000002",
        "name": "Me vắt chín",
        "quantity": 50,
        "unit": "g",
        "notes": "Dầm với nước ấm lọc lấy nước cốt me",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000017000003",
        "name": "Thơm (dứa), cà chua, đậu bắp, bạc hà",
        "quantity": 400,
        "unit": "g",
        "notes": "Thái lát xéo vừa ăn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000017000004",
        "name": "Giá đỗ tươi",
        "quantity": 100,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000017000005",
        "name": "Ngò ôm (rau ngổ), ngò gai, tỏi phi, ớt",
        "quantity": 50,
        "unit": "g",
        "notes": "Thái nhỏ rắc lên mặt canh",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000017000006",
        "name": "Nước mắm, đường phèn, muối",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Cân bằng vị chua ngọt",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000017000001",
        "stepNumber": 1,
        "title": "Sơ chế cá lóc và các loại rau canh chua",
        "description": "Cá lóc rửa sạch với muối chanh, cắt khoanh rồi ướp nhẹ chút nước mắm và tiêu. Bạc hà tước vỏ cắt xéo, đậu bắp cắt xéo, thơm cắt miếng quạt, cà chua bổ múi cau.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000017000002",
        "stepNumber": 2,
        "title": "Phi tỏi và nấu nước canh me",
        "description": "Phi vàng tỏi băm với dầu ăn, vớt phân nửa tỏi phi ra chén. Phần còn lại cho cà chua và thơm vào xào 3 phút rồi chế 1.2 lít nước sôi cùng nước cốt me vào đun sôi.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000017000003",
        "stepNumber": 3,
        "title": "Nấu chín cá lóc và nêm gia vị",
        "description": "Khi nước canh sôi mạnh, thả cá lóc vào nấu khoảng 10 phút trên lửa vừa, hớt bọt kỹ. Nêm đường, muối và nước mắm cho đạt vị chua thanh ngọt dịu đặc trưng Nam Bộ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000017000004",
        "stepNumber": 4,
        "title": "Cho rau vào và rắc ngò ôm tỏi phi",
        "description": "Cho đậu bắp vào nấu 2 phút, tiếp tục cho bạc hà và giá đỗ vào đảo nhẹ rồi tắt bếp ngay để rau giữ độ giòn. Múc ra tô, rắc ngò ôm, ngò gai, ớt lát và tỏi phi vàng.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000017000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000017000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000017000003",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000018": {
    "id": "22222222-2222-4222-8222-000000000018",
    "title": "Canh Sườn Non Hầm Củ Sen Táo Đỏ",
    "slug": "canh-suon-non-ham-cu-sen",
    "description": "Món canh hầm dưỡng sinh thanh ngọt tự nhiên từ sườn non heo, củ sen bùi bở, táo đỏ và kỷ tử, giúp bồi bổ sức khỏe và an thần giấc ngủ cho cả gia đình.",
    "prepTime": 20,
    "cookTime": 50,
    "totalTime": 70,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-18T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 34,
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbohydrates": 28,
      "fat": 14,
      "fiber": 4,
      "sodium": 540
    },
    "instructions": "Bước 1 (Chần sườn non và sơ chế củ sen): Chần sườn non trong nước sôi có vài lát gừng khoảng 4 phút rồi rửa sạch. Củ sen gọt vỏ, thái khoanh tròn, ngâm qua nước pha chút giấm để củ sen trắng đẹp.\nBước 2 (Hầm sườn non và củ sen): Cho sườn non và củ sen vào nồi cùng 1.5 lít nước, đun sôi rồi hạ lửa nhỏ hầm trong 30 phút cho sườn mềm và củ sen bở bùi.\nBước 3 (Thêm hạt sen, táo đỏ và cà rốt): Cho hạt sen tươi, cà rốt và táo đỏ vào hầm tiếp 15 phút. Nêm muối, hạt nêm và nửa muỗng nước mắm ngon cho nước canh ngọt dịu.\nBước 4 (Múc canh ra tô thưởng thức nóng): Rắc hành lá, ngò rí và chút tiêu xay lên mặt tô canh, dùng nóng trong bữa cơm gia đình.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000018000001",
        "name": "Sườn non heo",
        "quantity": 500,
        "unit": "g",
        "notes": "Chặt miếng vừa ăn, chần sạch bọt",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000018000002",
        "name": "Củ sen tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Gọt vỏ, thái lát tròn dày 0.7cm, ngâm nước muối",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000018000003",
        "name": "Táo đỏ Hàn Quốc & hạt sen tươi",
        "quantity": 120,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000018000004",
        "name": "Cà rốt tỉa hoa",
        "quantity": 1,
        "unit": "củ",
        "notes": "Cắt khoanh vừa ăn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000018000005",
        "name": "Hành lá, ngò rí, gừng tươi, hạt nêm",
        "quantity": 30,
        "unit": "g",
        "notes": "Nêm thanh vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000018000001",
        "stepNumber": 1,
        "title": "Chần sườn non và sơ chế củ sen",
        "description": "Chần sườn non trong nước sôi có vài lát gừng khoảng 4 phút rồi rửa sạch. Củ sen gọt vỏ, thái khoanh tròn, ngâm qua nước pha chút giấm để củ sen trắng đẹp.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000018000002",
        "stepNumber": 2,
        "title": "Hầm sườn non và củ sen",
        "description": "Cho sườn non và củ sen vào nồi cùng 1.5 lít nước, đun sôi rồi hạ lửa nhỏ hầm trong 30 phút cho sườn mềm và củ sen bở bùi.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000018000003",
        "stepNumber": 3,
        "title": "Thêm hạt sen, táo đỏ và cà rốt",
        "description": "Cho hạt sen tươi, cà rốt và táo đỏ vào hầm tiếp 15 phút. Nêm muối, hạt nêm và nửa muỗng nước mắm ngon cho nước canh ngọt dịu.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000018000004",
        "stepNumber": 4,
        "title": "Múc canh ra tô thưởng thức nóng",
        "description": "Rắc hành lá, ngò rí và chút tiêu xay lên mặt tô canh, dùng nóng trong bữa cơm gia đình.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000018000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Sườn Non Hầm Củ Sen Táo Đỏ",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000018000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Sườn Non Hầm Củ Sen Táo Đỏ - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000018000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Sườn Non Hầm Củ Sen Táo Đỏ - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "canh-suon-non-ham-cu-sen": {
    "id": "22222222-2222-4222-8222-000000000018",
    "title": "Canh Sườn Non Hầm Củ Sen Táo Đỏ",
    "slug": "canh-suon-non-ham-cu-sen",
    "description": "Món canh hầm dưỡng sinh thanh ngọt tự nhiên từ sườn non heo, củ sen bùi bở, táo đỏ và kỷ tử, giúp bồi bổ sức khỏe và an thần giấc ngủ cho cả gia đình.",
    "prepTime": 20,
    "cookTime": 50,
    "totalTime": 70,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-18T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 34,
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbohydrates": 28,
      "fat": 14,
      "fiber": 4,
      "sodium": 540
    },
    "instructions": "Bước 1 (Chần sườn non và sơ chế củ sen): Chần sườn non trong nước sôi có vài lát gừng khoảng 4 phút rồi rửa sạch. Củ sen gọt vỏ, thái khoanh tròn, ngâm qua nước pha chút giấm để củ sen trắng đẹp.\nBước 2 (Hầm sườn non và củ sen): Cho sườn non và củ sen vào nồi cùng 1.5 lít nước, đun sôi rồi hạ lửa nhỏ hầm trong 30 phút cho sườn mềm và củ sen bở bùi.\nBước 3 (Thêm hạt sen, táo đỏ và cà rốt): Cho hạt sen tươi, cà rốt và táo đỏ vào hầm tiếp 15 phút. Nêm muối, hạt nêm và nửa muỗng nước mắm ngon cho nước canh ngọt dịu.\nBước 4 (Múc canh ra tô thưởng thức nóng): Rắc hành lá, ngò rí và chút tiêu xay lên mặt tô canh, dùng nóng trong bữa cơm gia đình.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000018000001",
        "name": "Sườn non heo",
        "quantity": 500,
        "unit": "g",
        "notes": "Chặt miếng vừa ăn, chần sạch bọt",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000018000002",
        "name": "Củ sen tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Gọt vỏ, thái lát tròn dày 0.7cm, ngâm nước muối",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000018000003",
        "name": "Táo đỏ Hàn Quốc & hạt sen tươi",
        "quantity": 120,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000018000004",
        "name": "Cà rốt tỉa hoa",
        "quantity": 1,
        "unit": "củ",
        "notes": "Cắt khoanh vừa ăn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000018000005",
        "name": "Hành lá, ngò rí, gừng tươi, hạt nêm",
        "quantity": 30,
        "unit": "g",
        "notes": "Nêm thanh vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000018000001",
        "stepNumber": 1,
        "title": "Chần sườn non và sơ chế củ sen",
        "description": "Chần sườn non trong nước sôi có vài lát gừng khoảng 4 phút rồi rửa sạch. Củ sen gọt vỏ, thái khoanh tròn, ngâm qua nước pha chút giấm để củ sen trắng đẹp.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000018000002",
        "stepNumber": 2,
        "title": "Hầm sườn non và củ sen",
        "description": "Cho sườn non và củ sen vào nồi cùng 1.5 lít nước, đun sôi rồi hạ lửa nhỏ hầm trong 30 phút cho sườn mềm và củ sen bở bùi.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000018000003",
        "stepNumber": 3,
        "title": "Thêm hạt sen, táo đỏ và cà rốt",
        "description": "Cho hạt sen tươi, cà rốt và táo đỏ vào hầm tiếp 15 phút. Nêm muối, hạt nêm và nửa muỗng nước mắm ngon cho nước canh ngọt dịu.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000018000004",
        "stepNumber": 4,
        "title": "Múc canh ra tô thưởng thức nóng",
        "description": "Rắc hành lá, ngò rí và chút tiêu xay lên mặt tô canh, dùng nóng trong bữa cơm gia đình.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000018000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Sườn Non Hầm Củ Sen Táo Đỏ",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000018000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Sườn Non Hầm Củ Sen Táo Đỏ - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000018000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Sườn Non Hầm Củ Sen Táo Đỏ - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000019": {
    "id": "22222222-2222-4222-8222-000000000019",
    "title": "Canh Cua Rau Đay Mồng Tơi Cà Pháo",
    "slug": "canh-cua-rau-day-mong-toi",
    "description": "Bát canh cua đồng nấu rau đay, mồng tơi và mướp hương thơm mát với lớp thịt cua đóng tảng dày dặn, dùng kèm đĩa cà pháo muối giòn tan gợi nhớ hương vị quê nhà.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-19T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 37,
    "nutrition": {
      "calories": 210,
      "protein": 19,
      "carbohydrates": 15,
      "fat": 7,
      "fiber": 5,
      "sodium": 590
    },
    "instructions": "Bước 1 (Lọc nước cua đồng và sơ chế rau): Hòa cua xay với 1.2 lít nước và nửa muỗng muối, bóp đều rồi lọc qua rây 2 lần lấy nước cua mịn. Rau đay, mồng tơi thái nhỏ; mướp hương thái miếng vừa ăn.\nBước 2 (Đun kết tảng gạch cua): Bắc nồi nước cua lên bếp đun lửa vừa, khuấy nhẹ đều tay. Khi thịt cua bắt đầu đóng tảng nổi lên mặt nước thì hạ nhỏ lửa và gạt tảng riêu cua sang một bên nồi.\nBước 3 (Cho mướp và rau đay mồng tơi vào nấu): Thả mướp hương, rau đay và mồng tơi vào phần nước sôi bên cạnh tảng cua, ấn nhẹ cho rau ngập nước rồi đun sôi 3 phút đến khi rau chín xanh mềm.\nBước 4 (Rưới gạch cua chưng và thưởng thức): Phi thơm hành tím với gạch cua rồi rưới lên mặt nồi canh, nêm lại vừa ăn. Múc canh ra tô dùng nóng với cơm trắng và cà pháo muối giòn.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000019000001",
        "name": "Cua đồng làm sạch xay nhuyễn",
        "quantity": 400,
        "unit": "g",
        "notes": "Lọc lấy nước thịt cua và khêu gạch riêng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000019000002",
        "name": "Rau đay & rau mồng tơi tươi",
        "quantity": 300,
        "unit": "g",
        "notes": "Nhặt lá non, rửa sạch thái nhỏ",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000019000003",
        "name": "Mướp hương non",
        "quantity": 1,
        "unit": "quả",
        "notes": "Gọt vỏ, bổ đôi thái lát xéo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000019000004",
        "name": "Hành tím phi & chút mắm tôm",
        "quantity": 20,
        "unit": "g",
        "notes": "Tạo mùi thơm dậy vị",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000019000005",
        "name": "Gia vị muối, bột ngọt, nước mắm",
        "quantity": 2,
        "unit": "muỗng canh",
        "notes": "Nêm vừa khẩu vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000019000001",
        "stepNumber": 1,
        "title": "Lọc nước cua đồng và sơ chế rau",
        "description": "Hòa cua xay với 1.2 lít nước và nửa muỗng muối, bóp đều rồi lọc qua rây 2 lần lấy nước cua mịn. Rau đay, mồng tơi thái nhỏ; mướp hương thái miếng vừa ăn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000019000002",
        "stepNumber": 2,
        "title": "Đun kết tảng gạch cua",
        "description": "Bắc nồi nước cua lên bếp đun lửa vừa, khuấy nhẹ đều tay. Khi thịt cua bắt đầu đóng tảng nổi lên mặt nước thì hạ nhỏ lửa và gạt tảng riêu cua sang một bên nồi.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000019000003",
        "stepNumber": 3,
        "title": "Cho mướp và rau đay mồng tơi vào nấu",
        "description": "Thả mướp hương, rau đay và mồng tơi vào phần nước sôi bên cạnh tảng cua, ấn nhẹ cho rau ngập nước rồi đun sôi 3 phút đến khi rau chín xanh mềm.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000019000004",
        "stepNumber": 4,
        "title": "Rưới gạch cua chưng và thưởng thức",
        "description": "Phi thơm hành tím với gạch cua rồi rưới lên mặt nồi canh, nêm lại vừa ăn. Múc canh ra tô dùng nóng với cơm trắng và cà pháo muối giòn.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000019000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Cua Rau Đay Mồng Tơi Cà Pháo",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000019000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Cua Rau Đay Mồng Tơi Cà Pháo - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000019000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Cua Rau Đay Mồng Tơi Cà Pháo - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "canh-cua-rau-day-mong-toi": {
    "id": "22222222-2222-4222-8222-000000000019",
    "title": "Canh Cua Rau Đay Mồng Tơi Cà Pháo",
    "slug": "canh-cua-rau-day-mong-toi",
    "description": "Bát canh cua đồng nấu rau đay, mồng tơi và mướp hương thơm mát với lớp thịt cua đóng tảng dày dặn, dùng kèm đĩa cà pháo muối giòn tan gợi nhớ hương vị quê nhà.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-19T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 37,
    "nutrition": {
      "calories": 210,
      "protein": 19,
      "carbohydrates": 15,
      "fat": 7,
      "fiber": 5,
      "sodium": 590
    },
    "instructions": "Bước 1 (Lọc nước cua đồng và sơ chế rau): Hòa cua xay với 1.2 lít nước và nửa muỗng muối, bóp đều rồi lọc qua rây 2 lần lấy nước cua mịn. Rau đay, mồng tơi thái nhỏ; mướp hương thái miếng vừa ăn.\nBước 2 (Đun kết tảng gạch cua): Bắc nồi nước cua lên bếp đun lửa vừa, khuấy nhẹ đều tay. Khi thịt cua bắt đầu đóng tảng nổi lên mặt nước thì hạ nhỏ lửa và gạt tảng riêu cua sang một bên nồi.\nBước 3 (Cho mướp và rau đay mồng tơi vào nấu): Thả mướp hương, rau đay và mồng tơi vào phần nước sôi bên cạnh tảng cua, ấn nhẹ cho rau ngập nước rồi đun sôi 3 phút đến khi rau chín xanh mềm.\nBước 4 (Rưới gạch cua chưng và thưởng thức): Phi thơm hành tím với gạch cua rồi rưới lên mặt nồi canh, nêm lại vừa ăn. Múc canh ra tô dùng nóng với cơm trắng và cà pháo muối giòn.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000019000001",
        "name": "Cua đồng làm sạch xay nhuyễn",
        "quantity": 400,
        "unit": "g",
        "notes": "Lọc lấy nước thịt cua và khêu gạch riêng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000019000002",
        "name": "Rau đay & rau mồng tơi tươi",
        "quantity": 300,
        "unit": "g",
        "notes": "Nhặt lá non, rửa sạch thái nhỏ",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000019000003",
        "name": "Mướp hương non",
        "quantity": 1,
        "unit": "quả",
        "notes": "Gọt vỏ, bổ đôi thái lát xéo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000019000004",
        "name": "Hành tím phi & chút mắm tôm",
        "quantity": 20,
        "unit": "g",
        "notes": "Tạo mùi thơm dậy vị",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000019000005",
        "name": "Gia vị muối, bột ngọt, nước mắm",
        "quantity": 2,
        "unit": "muỗng canh",
        "notes": "Nêm vừa khẩu vị",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000019000001",
        "stepNumber": 1,
        "title": "Lọc nước cua đồng và sơ chế rau",
        "description": "Hòa cua xay với 1.2 lít nước và nửa muỗng muối, bóp đều rồi lọc qua rây 2 lần lấy nước cua mịn. Rau đay, mồng tơi thái nhỏ; mướp hương thái miếng vừa ăn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000019000002",
        "stepNumber": 2,
        "title": "Đun kết tảng gạch cua",
        "description": "Bắc nồi nước cua lên bếp đun lửa vừa, khuấy nhẹ đều tay. Khi thịt cua bắt đầu đóng tảng nổi lên mặt nước thì hạ nhỏ lửa và gạt tảng riêu cua sang một bên nồi.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000019000003",
        "stepNumber": 3,
        "title": "Cho mướp và rau đay mồng tơi vào nấu",
        "description": "Thả mướp hương, rau đay và mồng tơi vào phần nước sôi bên cạnh tảng cua, ấn nhẹ cho rau ngập nước rồi đun sôi 3 phút đến khi rau chín xanh mềm.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000019000004",
        "stepNumber": 4,
        "title": "Rưới gạch cua chưng và thưởng thức",
        "description": "Phi thơm hành tím với gạch cua rồi rưới lên mặt nồi canh, nêm lại vừa ăn. Múc canh ra tô dùng nóng với cơm trắng và cà pháo muối giòn.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000019000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Cua Rau Đay Mồng Tơi Cà Pháo",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000019000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Cua Rau Đay Mồng Tơi Cà Pháo - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000019000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Cua Rau Đay Mồng Tơi Cà Pháo - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000020": {
    "id": "22222222-2222-4222-8222-000000000020",
    "title": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác",
    "slug": "canh-kho-qua-nhoi-thit",
    "description": "Khổ qua xanh mướt được hầm vừa chín tới giữ vị đắng thanh mát dịu nhẹ, bên trong là phần nhân thịt heo quết cùng chả cá thác lác dai giòn ngọt đậm đà.",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-20T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 40,
    "nutrition": {
      "calories": 310,
      "protein": 26,
      "carbohydrates": 16,
      "fat": 15,
      "fiber": 4,
      "sodium": 650
    },
    "instructions": "Bước 1 (Quết nhân thịt và cá thác lác): Trộn đều thịt nạc xay, cá thác lác nạo, nấm mèo, bún tàu băm nhỏ cùng đầu hành băm, tiêu, hạt nêm và 1 muỗng nước mắm. Dùng muỗng quết mạnh 5 phút cho nhân dẻo dai.\nBước 2 (Sơ chế khổ qua giảm đắng và nhồi nhân): Khổ qua cắt khúc 4cm, bỏ sạch ruột và lớp màng trắng bên trong để giảm vị đắng gắt. Nhồi chặt phần nhân thịt cá thác lác vào lòng từng khúc khổ qua.\nBước 3 (Hầm khổ qua trong nước dùng sôi): Đun sôi nồi nước dùng xương, thả nhẹ các khúc khổ qua nhồi thịt vào hầm trên lửa vừa không đậy kín nắp khoảng 25 phút để khổ qua chín mềm mà vẫn giữ màu xanh.\nBước 4 (Nêm nếm và rắc hành ngò tiêu xay): Hớt sạch bọt, nêm lại chút nước mắm cốt cho dậy hương rồi tắt bếp. Múc canh ra tô, rắc nhiều hành ngò và tiêu xay thưởng thức nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000020000001",
        "name": "Khổ qua (mướp đắng) trái gai nở",
        "quantity": 4,
        "unit": "quả",
        "notes": "Cắt khúc hoặc bổ dọc móc sạch ruột",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000020000002",
        "name": "Thịt nạc vai xay & cá thác lác nạo",
        "quantity": 350,
        "unit": "g",
        "notes": "Quết dẻo tạo độ dai giòn cho nhân",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000020000003",
        "name": "Nấm mèo (mộc nhĩ) & bún tàu",
        "quantity": 30,
        "unit": "g",
        "notes": "Ngâm nở, băm nhỏ trộn vào nhân",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000020000004",
        "name": "Nước dùng xương heo",
        "quantity": 1200,
        "unit": "ml",
        "notes": "Giúp nước canh ngọt đậm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000020000005",
        "name": "Hành lá, ngò rí, tiêu sọ, nước mắm",
        "quantity": 30,
        "unit": "g",
        "notes": "Ướp nhân và rắc mặt canh",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000020000001",
        "stepNumber": 1,
        "title": "Quết nhân thịt và cá thác lác",
        "description": "Trộn đều thịt nạc xay, cá thác lác nạo, nấm mèo, bún tàu băm nhỏ cùng đầu hành băm, tiêu, hạt nêm và 1 muỗng nước mắm. Dùng muỗng quết mạnh 5 phút cho nhân dẻo dai.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000020000002",
        "stepNumber": 2,
        "title": "Sơ chế khổ qua giảm đắng và nhồi nhân",
        "description": "Khổ qua cắt khúc 4cm, bỏ sạch ruột và lớp màng trắng bên trong để giảm vị đắng gắt. Nhồi chặt phần nhân thịt cá thác lác vào lòng từng khúc khổ qua.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000020000003",
        "stepNumber": 3,
        "title": "Hầm khổ qua trong nước dùng sôi",
        "description": "Đun sôi nồi nước dùng xương, thả nhẹ các khúc khổ qua nhồi thịt vào hầm trên lửa vừa không đậy kín nắp khoảng 25 phút để khổ qua chín mềm mà vẫn giữ màu xanh.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000020000004",
        "stepNumber": 4,
        "title": "Nêm nếm và rắc hành ngò tiêu xay",
        "description": "Hớt sạch bọt, nêm lại chút nước mắm cốt cho dậy hương rồi tắt bếp. Múc canh ra tô, rắc nhiều hành ngò và tiêu xay thưởng thức nóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000020000001",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000020000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000020000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "canh-kho-qua-nhoi-thit": {
    "id": "22222222-2222-4222-8222-000000000020",
    "title": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác",
    "slug": "canh-kho-qua-nhoi-thit",
    "description": "Khổ qua xanh mướt được hầm vừa chín tới giữ vị đắng thanh mát dịu nhẹ, bên trong là phần nhân thịt heo quết cùng chả cá thác lác dai giòn ngọt đậm đà.",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-20T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 40,
    "nutrition": {
      "calories": 310,
      "protein": 26,
      "carbohydrates": 16,
      "fat": 15,
      "fiber": 4,
      "sodium": 650
    },
    "instructions": "Bước 1 (Quết nhân thịt và cá thác lác): Trộn đều thịt nạc xay, cá thác lác nạo, nấm mèo, bún tàu băm nhỏ cùng đầu hành băm, tiêu, hạt nêm và 1 muỗng nước mắm. Dùng muỗng quết mạnh 5 phút cho nhân dẻo dai.\nBước 2 (Sơ chế khổ qua giảm đắng và nhồi nhân): Khổ qua cắt khúc 4cm, bỏ sạch ruột và lớp màng trắng bên trong để giảm vị đắng gắt. Nhồi chặt phần nhân thịt cá thác lác vào lòng từng khúc khổ qua.\nBước 3 (Hầm khổ qua trong nước dùng sôi): Đun sôi nồi nước dùng xương, thả nhẹ các khúc khổ qua nhồi thịt vào hầm trên lửa vừa không đậy kín nắp khoảng 25 phút để khổ qua chín mềm mà vẫn giữ màu xanh.\nBước 4 (Nêm nếm và rắc hành ngò tiêu xay): Hớt sạch bọt, nêm lại chút nước mắm cốt cho dậy hương rồi tắt bếp. Múc canh ra tô, rắc nhiều hành ngò và tiêu xay thưởng thức nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000020000001",
        "name": "Khổ qua (mướp đắng) trái gai nở",
        "quantity": 4,
        "unit": "quả",
        "notes": "Cắt khúc hoặc bổ dọc móc sạch ruột",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000020000002",
        "name": "Thịt nạc vai xay & cá thác lác nạo",
        "quantity": 350,
        "unit": "g",
        "notes": "Quết dẻo tạo độ dai giòn cho nhân",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000020000003",
        "name": "Nấm mèo (mộc nhĩ) & bún tàu",
        "quantity": 30,
        "unit": "g",
        "notes": "Ngâm nở, băm nhỏ trộn vào nhân",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000020000004",
        "name": "Nước dùng xương heo",
        "quantity": 1200,
        "unit": "ml",
        "notes": "Giúp nước canh ngọt đậm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000020000005",
        "name": "Hành lá, ngò rí, tiêu sọ, nước mắm",
        "quantity": 30,
        "unit": "g",
        "notes": "Ướp nhân và rắc mặt canh",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000020000001",
        "stepNumber": 1,
        "title": "Quết nhân thịt và cá thác lác",
        "description": "Trộn đều thịt nạc xay, cá thác lác nạo, nấm mèo, bún tàu băm nhỏ cùng đầu hành băm, tiêu, hạt nêm và 1 muỗng nước mắm. Dùng muỗng quết mạnh 5 phút cho nhân dẻo dai.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000020000002",
        "stepNumber": 2,
        "title": "Sơ chế khổ qua giảm đắng và nhồi nhân",
        "description": "Khổ qua cắt khúc 4cm, bỏ sạch ruột và lớp màng trắng bên trong để giảm vị đắng gắt. Nhồi chặt phần nhân thịt cá thác lác vào lòng từng khúc khổ qua.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000020000003",
        "stepNumber": 3,
        "title": "Hầm khổ qua trong nước dùng sôi",
        "description": "Đun sôi nồi nước dùng xương, thả nhẹ các khúc khổ qua nhồi thịt vào hầm trên lửa vừa không đậy kín nắp khoảng 25 phút để khổ qua chín mềm mà vẫn giữ màu xanh.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000020000004",
        "stepNumber": 4,
        "title": "Nêm nếm và rắc hành ngò tiêu xay",
        "description": "Hớt sạch bọt, nêm lại chút nước mắm cốt cho dậy hương rồi tắt bếp. Múc canh ra tô, rắc nhiều hành ngò và tiêu xay thưởng thức nóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000020000001",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000020000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000020000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Khổ Qua Nhồi Thịt Cá Thác Lác - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000021": {
    "id": "22222222-2222-4222-8222-000000000021",
    "title": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô",
    "slug": "sup-cua-trung-bac-thao",
    "description": "Chén súp cua nóng hổi sánh mịn thơm lừng dầu mè, đầy ắp thịt cua biển tươi, nấm đông cô, bắp Mỹ ngọt, trứng cút và trứng bắc thảo bùi béo giàu dinh dưỡng.",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-21T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 14,
    "nutrition": {
      "calories": 295,
      "protein": 24,
      "carbohydrates": 26,
      "fat": 10,
      "fiber": 2,
      "sodium": 620
    },
    "instructions": "Bước 1 (Nấu nước dùng gà với bắp ngọt và nấm): Đun sôi 1.2 lít nước luộc gà, cho hạt bắp ngọt và nấm đông cô thái lát vào nấu 10 phút cho tiết vị ngọt tự nhiên.\nBước 2 (Cho thịt cua và gà xé sợi vào nồi): Thêm thịt ức gà xé sợi, thịt cua biển đã xào thơm và trứng cút luộc vào nồi, nêm muối, hạt nêm và chút đường phèn vừa ăn.\nBước 3 (Xuống bột năng và kéo vân trứng): Từ từ rót nước bột năng vào khuấy đều đến khi súp đạt độ sánh mượt. Tiếp tục rót chậm trứng gà đánh tan qua rây đồng thời khuấy một chiều để tạo vân trứng đẹp mắt.\nBước 4 (Bày trứng bắc thảo và dầu mè): Múc súp cua nóng ra chén, đặt miếng trứng bắc thảo lên trên, rưới vài giọt dầu mè thơm, ngò rí, tiêu xay và chút sa tế.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000021000001",
        "name": "Thịt cua biển tươi gỡ múi",
        "quantity": 250,
        "unit": "g",
        "notes": "Xào sơ với hành tím cho thơm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000021000002",
        "name": "Ức gà luộc xé sợi & nước luộc gà",
        "quantity": 1200,
        "unit": "ml",
        "notes": "Làm nền nước súp ngọt thanh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000021000003",
        "name": "Trứng bắc thảo & trứng cút luộc",
        "quantity": 10,
        "unit": "quả",
        "notes": "Trứng bắc thảo bổ múi cau",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000021000004",
        "name": "Nấm đông cô tươi & hạt bắp ngọt",
        "quantity": 150,
        "unit": "g",
        "notes": "Nấm thái lát mỏng, bắp tách hạt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000021000005",
        "name": "Trứng gà đánh tan & bột năng",
        "quantity": 80,
        "unit": "g",
        "notes": "Tạo vân trứng và độ sánh mịn",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000021000006",
        "name": "Dầu mè thơm, ngò rí, tiêu, sa tế",
        "quantity": 25,
        "unit": "g",
        "notes": "Ăn kèm khi múc ra chén",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000021000001",
        "stepNumber": 1,
        "title": "Nấu nước dùng gà với bắp ngọt và nấm",
        "description": "Đun sôi 1.2 lít nước luộc gà, cho hạt bắp ngọt và nấm đông cô thái lát vào nấu 10 phút cho tiết vị ngọt tự nhiên.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000021000002",
        "stepNumber": 2,
        "title": "Cho thịt cua và gà xé sợi vào nồi",
        "description": "Thêm thịt ức gà xé sợi, thịt cua biển đã xào thơm và trứng cút luộc vào nồi, nêm muối, hạt nêm và chút đường phèn vừa ăn.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000021000003",
        "stepNumber": 3,
        "title": "Xuống bột năng và kéo vân trứng",
        "description": "Từ từ rót nước bột năng vào khuấy đều đến khi súp đạt độ sánh mượt. Tiếp tục rót chậm trứng gà đánh tan qua rây đồng thời khuấy một chiều để tạo vân trứng đẹp mắt.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000021000004",
        "stepNumber": 4,
        "title": "Bày trứng bắc thảo và dầu mè",
        "description": "Múc súp cua nóng ra chén, đặt miếng trứng bắc thảo lên trên, rưới vài giọt dầu mè thơm, ngò rí, tiêu xay và chút sa tế.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000021000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "altText": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000021000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000021000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "sup-cua-trung-bac-thao": {
    "id": "22222222-2222-4222-8222-000000000021",
    "title": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô",
    "slug": "sup-cua-trung-bac-thao",
    "description": "Chén súp cua nóng hổi sánh mịn thơm lừng dầu mè, đầy ắp thịt cua biển tươi, nấm đông cô, bắp Mỹ ngọt, trứng cút và trứng bắc thảo bùi béo giàu dinh dưỡng.",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000004",
    "categoryName": "Món Canh & Súp",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-21T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 14,
    "nutrition": {
      "calories": 295,
      "protein": 24,
      "carbohydrates": 26,
      "fat": 10,
      "fiber": 2,
      "sodium": 620
    },
    "instructions": "Bước 1 (Nấu nước dùng gà với bắp ngọt và nấm): Đun sôi 1.2 lít nước luộc gà, cho hạt bắp ngọt và nấm đông cô thái lát vào nấu 10 phút cho tiết vị ngọt tự nhiên.\nBước 2 (Cho thịt cua và gà xé sợi vào nồi): Thêm thịt ức gà xé sợi, thịt cua biển đã xào thơm và trứng cút luộc vào nồi, nêm muối, hạt nêm và chút đường phèn vừa ăn.\nBước 3 (Xuống bột năng và kéo vân trứng): Từ từ rót nước bột năng vào khuấy đều đến khi súp đạt độ sánh mượt. Tiếp tục rót chậm trứng gà đánh tan qua rây đồng thời khuấy một chiều để tạo vân trứng đẹp mắt.\nBước 4 (Bày trứng bắc thảo và dầu mè): Múc súp cua nóng ra chén, đặt miếng trứng bắc thảo lên trên, rưới vài giọt dầu mè thơm, ngò rí, tiêu xay và chút sa tế.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000004",
      "name": "Món Canh & Súp",
      "slug": "mon-canh-sup",
      "description": "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.",
      "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 4,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000021000001",
        "name": "Thịt cua biển tươi gỡ múi",
        "quantity": 250,
        "unit": "g",
        "notes": "Xào sơ với hành tím cho thơm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000021000002",
        "name": "Ức gà luộc xé sợi & nước luộc gà",
        "quantity": 1200,
        "unit": "ml",
        "notes": "Làm nền nước súp ngọt thanh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000021000003",
        "name": "Trứng bắc thảo & trứng cút luộc",
        "quantity": 10,
        "unit": "quả",
        "notes": "Trứng bắc thảo bổ múi cau",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000021000004",
        "name": "Nấm đông cô tươi & hạt bắp ngọt",
        "quantity": 150,
        "unit": "g",
        "notes": "Nấm thái lát mỏng, bắp tách hạt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000021000005",
        "name": "Trứng gà đánh tan & bột năng",
        "quantity": 80,
        "unit": "g",
        "notes": "Tạo vân trứng và độ sánh mịn",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000021000006",
        "name": "Dầu mè thơm, ngò rí, tiêu, sa tế",
        "quantity": 25,
        "unit": "g",
        "notes": "Ăn kèm khi múc ra chén",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000021000001",
        "stepNumber": 1,
        "title": "Nấu nước dùng gà với bắp ngọt và nấm",
        "description": "Đun sôi 1.2 lít nước luộc gà, cho hạt bắp ngọt và nấm đông cô thái lát vào nấu 10 phút cho tiết vị ngọt tự nhiên.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000021000002",
        "stepNumber": 2,
        "title": "Cho thịt cua và gà xé sợi vào nồi",
        "description": "Thêm thịt ức gà xé sợi, thịt cua biển đã xào thơm và trứng cút luộc vào nồi, nêm muối, hạt nêm và chút đường phèn vừa ăn.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000021000003",
        "stepNumber": 3,
        "title": "Xuống bột năng và kéo vân trứng",
        "description": "Từ từ rót nước bột năng vào khuấy đều đến khi súp đạt độ sánh mượt. Tiếp tục rót chậm trứng gà đánh tan qua rây đồng thời khuấy một chiều để tạo vân trứng đẹp mắt.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000021000004",
        "stepNumber": 4,
        "title": "Bày trứng bắc thảo và dầu mè",
        "description": "Múc súp cua nóng ra chén, đặt miếng trứng bắc thảo lên trên, rưới vài giọt dầu mè thơm, ngò rí, tiêu xay và chút sa tế.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000021000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
        "altText": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000021000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000021000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Súp Cua Trứng Bắc Thảo Nấm Đông Cô - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000022": {
    "id": "22222222-2222-4222-8222-000000000022",
    "title": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi",
    "slug": "bo-luc-lac-khoai-tay-bo-toi",
    "description": "Những khối thịt thăn bò vuông vức được áp chảo lửa lớn xém cạnh thơm lừng bơ tỏi nhưng bên trong vẫn mềm mọng hồng đào, xóc đều cùng ớt chuông giòn ngọt và khoai tây chiên.",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-22T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 17,
    "nutrition": {
      "calories": 540,
      "protein": 37,
      "carbohydrates": 38,
      "fat": 26,
      "fiber": 4,
      "sodium": 740
    },
    "instructions": "Bước 1 (Ướp thịt thăn bò mềm ngọt): Thịt bò thấm khô nước, cắt khối vuông 2.5cm. Ướp với tỏi băm, dầu hào, nước tương, tiêu đen và 1 muỗng dầu ô liu trong 15 phút (không ướp muối sớm để thịt không ra nước).\nBước 2 (Chiên vàng khoai tây và xào ớt chuông): Chiên khoai tây vàng giòn rồi vớt ra giấy thấm dầu. Dùng chảo nóng xào nhanh hành tây và ớt chuông trên lửa lớn trong 90 giây để rau củ chín tới mà vẫn giòn bóng.\nBước 3 (Áp chảo bò lúc lắc lửa lớn với bơ tỏi): Đun chảo gang thật nóng, cho thịt bò vào áp chảo mỗi mặt 1 phút cho xém cạnh. Cho 20g bơ lạt và tỏi đập dập vào lắc đều chảo để bơ tỏi áo quanh miếng bò.\nBước 4 (Kết hợp rau củ và trình bày): Trút ớt chuông, hành tây vào chảo bò đảo nhanh 30 giây rồi tắt bếp. Bày xà lách xoăn, khoai tây chiên và bò lúc lắc ra đĩa, chấm kèm muối tiêu chanh hoặc tương ớt.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000022000001",
        "name": "Thịt thăn nội bò (Tenderloin)",
        "quantity": 500,
        "unit": "g",
        "notes": "Thái khối vuông quân cờ 2.5cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000022000002",
        "name": "Khoai tây vàng",
        "quantity": 400,
        "unit": "g",
        "notes": "Cắt thanh dài, chiên vàng giòn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000022000003",
        "name": "Ớt chuông xanh đỏ & hành tây",
        "quantity": 300,
        "unit": "g",
        "notes": "Cắt miếng vuông tương đương miếng thịt bò",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000022000004",
        "name": "Bơ lạt, tỏi đập dập, dầu hào, nước tương",
        "quantity": 60,
        "unit": "g",
        "notes": "Ướp bò và tạo sốt bơ tỏi bóng mượt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000022000005",
        "name": "Xà lách xoăn & cà chua bi",
        "quantity": 150,
        "unit": "g",
        "notes": "Lót đĩa ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000022000001",
        "stepNumber": 1,
        "title": "Ướp thịt thăn bò mềm ngọt",
        "description": "Thịt bò thấm khô nước, cắt khối vuông 2.5cm. Ướp với tỏi băm, dầu hào, nước tương, tiêu đen và 1 muỗng dầu ô liu trong 15 phút (không ướp muối sớm để thịt không ra nước).",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000022000002",
        "stepNumber": 2,
        "title": "Chiên vàng khoai tây và xào ớt chuông",
        "description": "Chiên khoai tây vàng giòn rồi vớt ra giấy thấm dầu. Dùng chảo nóng xào nhanh hành tây và ớt chuông trên lửa lớn trong 90 giây để rau củ chín tới mà vẫn giòn bóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000022000003",
        "stepNumber": 3,
        "title": "Áp chảo bò lúc lắc lửa lớn với bơ tỏi",
        "description": "Đun chảo gang thật nóng, cho thịt bò vào áp chảo mỗi mặt 1 phút cho xém cạnh. Cho 20g bơ lạt và tỏi đập dập vào lắc đều chảo để bơ tỏi áo quanh miếng bò.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000022000004",
        "stepNumber": 4,
        "title": "Kết hợp rau củ và trình bày",
        "description": "Trút ớt chuông, hành tây vào chảo bò đảo nhanh 30 giây rồi tắt bếp. Bày xà lách xoăn, khoai tây chiên và bò lúc lắc ra đĩa, chấm kèm muối tiêu chanh hoặc tương ớt.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000022000001",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "altText": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000022000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000022000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "bo-luc-lac-khoai-tay-bo-toi": {
    "id": "22222222-2222-4222-8222-000000000022",
    "title": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi",
    "slug": "bo-luc-lac-khoai-tay-bo-toi",
    "description": "Những khối thịt thăn bò vuông vức được áp chảo lửa lớn xém cạnh thơm lừng bơ tỏi nhưng bên trong vẫn mềm mọng hồng đào, xóc đều cùng ớt chuông giòn ngọt và khoai tây chiên.",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-22T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 17,
    "nutrition": {
      "calories": 540,
      "protein": 37,
      "carbohydrates": 38,
      "fat": 26,
      "fiber": 4,
      "sodium": 740
    },
    "instructions": "Bước 1 (Ướp thịt thăn bò mềm ngọt): Thịt bò thấm khô nước, cắt khối vuông 2.5cm. Ướp với tỏi băm, dầu hào, nước tương, tiêu đen và 1 muỗng dầu ô liu trong 15 phút (không ướp muối sớm để thịt không ra nước).\nBước 2 (Chiên vàng khoai tây và xào ớt chuông): Chiên khoai tây vàng giòn rồi vớt ra giấy thấm dầu. Dùng chảo nóng xào nhanh hành tây và ớt chuông trên lửa lớn trong 90 giây để rau củ chín tới mà vẫn giòn bóng.\nBước 3 (Áp chảo bò lúc lắc lửa lớn với bơ tỏi): Đun chảo gang thật nóng, cho thịt bò vào áp chảo mỗi mặt 1 phút cho xém cạnh. Cho 20g bơ lạt và tỏi đập dập vào lắc đều chảo để bơ tỏi áo quanh miếng bò.\nBước 4 (Kết hợp rau củ và trình bày): Trút ớt chuông, hành tây vào chảo bò đảo nhanh 30 giây rồi tắt bếp. Bày xà lách xoăn, khoai tây chiên và bò lúc lắc ra đĩa, chấm kèm muối tiêu chanh hoặc tương ớt.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000022000001",
        "name": "Thịt thăn nội bò (Tenderloin)",
        "quantity": 500,
        "unit": "g",
        "notes": "Thái khối vuông quân cờ 2.5cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000022000002",
        "name": "Khoai tây vàng",
        "quantity": 400,
        "unit": "g",
        "notes": "Cắt thanh dài, chiên vàng giòn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000022000003",
        "name": "Ớt chuông xanh đỏ & hành tây",
        "quantity": 300,
        "unit": "g",
        "notes": "Cắt miếng vuông tương đương miếng thịt bò",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000022000004",
        "name": "Bơ lạt, tỏi đập dập, dầu hào, nước tương",
        "quantity": 60,
        "unit": "g",
        "notes": "Ướp bò và tạo sốt bơ tỏi bóng mượt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000022000005",
        "name": "Xà lách xoăn & cà chua bi",
        "quantity": 150,
        "unit": "g",
        "notes": "Lót đĩa ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000022000001",
        "stepNumber": 1,
        "title": "Ướp thịt thăn bò mềm ngọt",
        "description": "Thịt bò thấm khô nước, cắt khối vuông 2.5cm. Ướp với tỏi băm, dầu hào, nước tương, tiêu đen và 1 muỗng dầu ô liu trong 15 phút (không ướp muối sớm để thịt không ra nước).",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000022000002",
        "stepNumber": 2,
        "title": "Chiên vàng khoai tây và xào ớt chuông",
        "description": "Chiên khoai tây vàng giòn rồi vớt ra giấy thấm dầu. Dùng chảo nóng xào nhanh hành tây và ớt chuông trên lửa lớn trong 90 giây để rau củ chín tới mà vẫn giòn bóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000022000003",
        "stepNumber": 3,
        "title": "Áp chảo bò lúc lắc lửa lớn với bơ tỏi",
        "description": "Đun chảo gang thật nóng, cho thịt bò vào áp chảo mỗi mặt 1 phút cho xém cạnh. Cho 20g bơ lạt và tỏi đập dập vào lắc đều chảo để bơ tỏi áo quanh miếng bò.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000022000004",
        "stepNumber": 4,
        "title": "Kết hợp rau củ và trình bày",
        "description": "Trút ớt chuông, hành tây vào chảo bò đảo nhanh 30 giây rồi tắt bếp. Bày xà lách xoăn, khoai tây chiên và bò lúc lắc ra đĩa, chấm kèm muối tiêu chanh hoặc tương ớt.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000022000001",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "altText": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000022000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000022000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000023": {
    "id": "22222222-2222-4222-8222-000000000023",
    "title": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây",
    "slug": "muc-xao-chua-ngot-dua-ca-chua",
    "description": "Mực ống tươi khía vảy rồng trắng giòn sần sật được xào lửa lớn cùng dứa chín, cà chua, dưa leo và cần tây tạo nên món xào đầy màu sắc, chua ngọt kích thích vị giác.",
    "prepTime": 20,
    "cookTime": 12,
    "totalTime": 32,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-23T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 20,
    "nutrition": {
      "calories": 320,
      "protein": 28,
      "carbohydrates": 24,
      "fat": 11,
      "fiber": 3,
      "sodium": 690
    },
    "instructions": "Bước 1 (Khía vảy rồng và chần nhanh mực tươi): Mực ống rửa với rượu gừng khử tanh, khía caro nhẹ mặt trong rồi cắt miếng vừa ăn. Chần nhanh mực qua nước sôi có gừng trong 30 giây rồi vớt ngay vào tô nước đá để mực giòn và không ra nước khi xào.\nBước 2 (Xào nhanh mực với tỏi gừng): Phi thơm tỏi và gừng trên lửa lớn, cho mực đã ráo nước vào đảo nhanh 1 phút với 1 muỗng nước mắm rồi trút ra đĩa riêng.\nBước 3 (Xào thơm, cà chua và rau củ): Cho thơm, cà chua vào chảo xào 2 phút với sốt dầu hào, tương ớt và đường, sau đó cho dưa leo và hành tây vào đảo trên lửa lớn thêm 2 phút.\nBước 4 (Kết hợp mực và cần tây): Trút mực và cần tây, hành lá cắt khúc vào chảo, đảo đều tay 1 phút cho sốt chua ngọt áo đều miếng mực rồi tắt bếp, rắc tiêu xay dùng nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000023000001",
        "name": "Mực ống tươi dày mình",
        "quantity": 500,
        "unit": "g",
        "notes": "Làm sạch, khía vảy rồng chéo và cắt miếng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000023000002",
        "name": "Thơm (dứa) & cà chua chín",
        "quantity": 250,
        "unit": "g",
        "notes": "Thơm cắt lát, cà chua bổ múi cau",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000023000003",
        "name": "Dưa leo & hành tây",
        "quantity": 200,
        "unit": "g",
        "notes": "Dưa leo bỏ ruột cắt xéo, hành tây bổ múi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000023000004",
        "name": "Cần tây, hành lá, gừng, tỏi",
        "quantity": 80,
        "unit": "g",
        "notes": "Cắt khúc vừa ăn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000023000005",
        "name": "Nước mắm, dầu hào, tương ớt, đường",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Pha sốt xào chua ngọt",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000023000001",
        "stepNumber": 1,
        "title": "Khía vảy rồng và chần nhanh mực tươi",
        "description": "Mực ống rửa với rượu gừng khử tanh, khía caro nhẹ mặt trong rồi cắt miếng vừa ăn. Chần nhanh mực qua nước sôi có gừng trong 30 giây rồi vớt ngay vào tô nước đá để mực giòn và không ra nước khi xào.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000023000002",
        "stepNumber": 2,
        "title": "Xào nhanh mực với tỏi gừng",
        "description": "Phi thơm tỏi và gừng trên lửa lớn, cho mực đã ráo nước vào đảo nhanh 1 phút với 1 muỗng nước mắm rồi trút ra đĩa riêng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000023000003",
        "stepNumber": 3,
        "title": "Xào thơm, cà chua và rau củ",
        "description": "Cho thơm, cà chua vào chảo xào 2 phút với sốt dầu hào, tương ớt và đường, sau đó cho dưa leo và hành tây vào đảo trên lửa lớn thêm 2 phút.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000023000004",
        "stepNumber": 4,
        "title": "Kết hợp mực và cần tây",
        "description": "Trút mực và cần tây, hành lá cắt khúc vào chảo, đảo đều tay 1 phút cho sốt chua ngọt áo đều miếng mực rồi tắt bếp, rắc tiêu xay dùng nóng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000023000001",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "altText": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000023000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000023000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "muc-xao-chua-ngot-dua-ca-chua": {
    "id": "22222222-2222-4222-8222-000000000023",
    "title": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây",
    "slug": "muc-xao-chua-ngot-dua-ca-chua",
    "description": "Mực ống tươi khía vảy rồng trắng giòn sần sật được xào lửa lớn cùng dứa chín, cà chua, dưa leo và cần tây tạo nên món xào đầy màu sắc, chua ngọt kích thích vị giác.",
    "prepTime": 20,
    "cookTime": 12,
    "totalTime": 32,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-23T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 20,
    "nutrition": {
      "calories": 320,
      "protein": 28,
      "carbohydrates": 24,
      "fat": 11,
      "fiber": 3,
      "sodium": 690
    },
    "instructions": "Bước 1 (Khía vảy rồng và chần nhanh mực tươi): Mực ống rửa với rượu gừng khử tanh, khía caro nhẹ mặt trong rồi cắt miếng vừa ăn. Chần nhanh mực qua nước sôi có gừng trong 30 giây rồi vớt ngay vào tô nước đá để mực giòn và không ra nước khi xào.\nBước 2 (Xào nhanh mực với tỏi gừng): Phi thơm tỏi và gừng trên lửa lớn, cho mực đã ráo nước vào đảo nhanh 1 phút với 1 muỗng nước mắm rồi trút ra đĩa riêng.\nBước 3 (Xào thơm, cà chua và rau củ): Cho thơm, cà chua vào chảo xào 2 phút với sốt dầu hào, tương ớt và đường, sau đó cho dưa leo và hành tây vào đảo trên lửa lớn thêm 2 phút.\nBước 4 (Kết hợp mực và cần tây): Trút mực và cần tây, hành lá cắt khúc vào chảo, đảo đều tay 1 phút cho sốt chua ngọt áo đều miếng mực rồi tắt bếp, rắc tiêu xay dùng nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000023000001",
        "name": "Mực ống tươi dày mình",
        "quantity": 500,
        "unit": "g",
        "notes": "Làm sạch, khía vảy rồng chéo và cắt miếng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000023000002",
        "name": "Thơm (dứa) & cà chua chín",
        "quantity": 250,
        "unit": "g",
        "notes": "Thơm cắt lát, cà chua bổ múi cau",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000023000003",
        "name": "Dưa leo & hành tây",
        "quantity": 200,
        "unit": "g",
        "notes": "Dưa leo bỏ ruột cắt xéo, hành tây bổ múi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000023000004",
        "name": "Cần tây, hành lá, gừng, tỏi",
        "quantity": 80,
        "unit": "g",
        "notes": "Cắt khúc vừa ăn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000023000005",
        "name": "Nước mắm, dầu hào, tương ớt, đường",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Pha sốt xào chua ngọt",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000023000001",
        "stepNumber": 1,
        "title": "Khía vảy rồng và chần nhanh mực tươi",
        "description": "Mực ống rửa với rượu gừng khử tanh, khía caro nhẹ mặt trong rồi cắt miếng vừa ăn. Chần nhanh mực qua nước sôi có gừng trong 30 giây rồi vớt ngay vào tô nước đá để mực giòn và không ra nước khi xào.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000023000002",
        "stepNumber": 2,
        "title": "Xào nhanh mực với tỏi gừng",
        "description": "Phi thơm tỏi và gừng trên lửa lớn, cho mực đã ráo nước vào đảo nhanh 1 phút với 1 muỗng nước mắm rồi trút ra đĩa riêng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000023000003",
        "stepNumber": 3,
        "title": "Xào thơm, cà chua và rau củ",
        "description": "Cho thơm, cà chua vào chảo xào 2 phút với sốt dầu hào, tương ớt và đường, sau đó cho dưa leo và hành tây vào đảo trên lửa lớn thêm 2 phút.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000023000004",
        "stepNumber": 4,
        "title": "Kết hợp mực và cần tây",
        "description": "Trút mực và cần tây, hành lá cắt khúc vào chảo, đảo đều tay 1 phút cho sốt chua ngọt áo đều miếng mực rồi tắt bếp, rắc tiêu xay dùng nóng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000023000001",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "altText": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000023000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000023000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000024": {
    "id": "22222222-2222-4222-8222-000000000024",
    "title": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán",
    "slug": "rau-muong-xao-toi-xanh-gion",
    "description": "Đĩa rau muống xào tỏi xanh mướt bóng bẩy, cọng rau giòn sần sật ngập tràn hương tỏi đập dập phi thơm vàng, bí quyết nằm ở bước chần sơ và sốc nhiệt nước đá.",
    "prepTime": 15,
    "cookTime": 8,
    "totalTime": 23,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-24T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 23,
    "nutrition": {
      "calories": 180,
      "protein": 5,
      "carbohydrates": 12,
      "fat": 12,
      "fiber": 6,
      "sodium": 520
    },
    "instructions": "Bước 1 (Chần rau muống và ngâm nước đá): Đun thật sôi nồi nước với 1 muỗng cà phê muối, thả rau muống vào chần đúng 1 phút rồi vớt ngay ra thau nước đá lạnh ngâm 3 phút, sau đó vớt ra để thật ráo nước.\nBước 2 (Phi thơm một nửa lượng tỏi đập dập): Đun nóng chảo gang với 2 muỗng mỡ heo trên lửa lớn nhất, cho phân nửa lượng tỏi đập dập vào phi dậy mùi thơm vàng.\nBước 3 (Xào rau muống trên lửa lớn): Thả rau muống đã ráo nước vào chảo, nêm dầu hào, hạt nêm và 1 muỗng nước mắm cốt, dùng đũa đảo nhanh tay liên tục trên lửa lớn trong 2 phút.\nBước 4 (Thêm tỏi tươi lần hai và bày ra đĩa): Cho nốt phần tỏi đập dập còn lại vào đảo đều 20 giây để hương tỏi bốc lên nồng nàn rồi tắt bếp, gắp ra đĩa thưởng thức ngay khi còn nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000024000001",
        "name": "Rau muống cọng non",
        "quantity": 600,
        "unit": "g",
        "notes": "Nhặt bớt lá, ngắt khúc vừa ăn rửa sạch",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000024000002",
        "name": "Tỏi ta củ nhỏ thơm",
        "quantity": 2,
        "unit": "củ",
        "notes": "Bóc vỏ, đập dập không băm quá vụn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000024000003",
        "name": "Dầu hào, nước mắm cốt, hạt nêm",
        "quantity": 2,
        "unit": "muỗng canh",
        "notes": "Nêm đậm đà vừa miệng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000024000004",
        "name": "Mỡ heo hoặc dầu ăn",
        "quantity": 2,
        "unit": "muỗng canh",
        "notes": "Giúp cọng rau bóng mượt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000024000005",
        "name": "Chanh tươi hoặc sấu luộc",
        "quantity": 1,
        "unit": "quả",
        "notes": "Vắt vào nước luộc rau làm canh chua",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000024000001",
        "stepNumber": 1,
        "title": "Chần rau muống và ngâm nước đá",
        "description": "Đun thật sôi nồi nước với 1 muỗng cà phê muối, thả rau muống vào chần đúng 1 phút rồi vớt ngay ra thau nước đá lạnh ngâm 3 phút, sau đó vớt ra để thật ráo nước.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000024000002",
        "stepNumber": 2,
        "title": "Phi thơm một nửa lượng tỏi đập dập",
        "description": "Đun nóng chảo gang với 2 muỗng mỡ heo trên lửa lớn nhất, cho phân nửa lượng tỏi đập dập vào phi dậy mùi thơm vàng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000024000003",
        "stepNumber": 3,
        "title": "Xào rau muống trên lửa lớn",
        "description": "Thả rau muống đã ráo nước vào chảo, nêm dầu hào, hạt nêm và 1 muỗng nước mắm cốt, dùng đũa đảo nhanh tay liên tục trên lửa lớn trong 2 phút.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000024000004",
        "stepNumber": 4,
        "title": "Thêm tỏi tươi lần hai và bày ra đĩa",
        "description": "Cho nốt phần tỏi đập dập còn lại vào đảo đều 20 giây để hương tỏi bốc lên nồng nàn rồi tắt bếp, gắp ra đĩa thưởng thức ngay khi còn nóng.",
        "timerMinutes": 1,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000024000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000024000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000024000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "rau-muong-xao-toi-xanh-gion": {
    "id": "22222222-2222-4222-8222-000000000024",
    "title": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán",
    "slug": "rau-muong-xao-toi-xanh-gion",
    "description": "Đĩa rau muống xào tỏi xanh mướt bóng bẩy, cọng rau giòn sần sật ngập tràn hương tỏi đập dập phi thơm vàng, bí quyết nằm ở bước chần sơ và sốc nhiệt nước đá.",
    "prepTime": 15,
    "cookTime": 8,
    "totalTime": 23,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-24T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 23,
    "nutrition": {
      "calories": 180,
      "protein": 5,
      "carbohydrates": 12,
      "fat": 12,
      "fiber": 6,
      "sodium": 520
    },
    "instructions": "Bước 1 (Chần rau muống và ngâm nước đá): Đun thật sôi nồi nước với 1 muỗng cà phê muối, thả rau muống vào chần đúng 1 phút rồi vớt ngay ra thau nước đá lạnh ngâm 3 phút, sau đó vớt ra để thật ráo nước.\nBước 2 (Phi thơm một nửa lượng tỏi đập dập): Đun nóng chảo gang với 2 muỗng mỡ heo trên lửa lớn nhất, cho phân nửa lượng tỏi đập dập vào phi dậy mùi thơm vàng.\nBước 3 (Xào rau muống trên lửa lớn): Thả rau muống đã ráo nước vào chảo, nêm dầu hào, hạt nêm và 1 muỗng nước mắm cốt, dùng đũa đảo nhanh tay liên tục trên lửa lớn trong 2 phút.\nBước 4 (Thêm tỏi tươi lần hai và bày ra đĩa): Cho nốt phần tỏi đập dập còn lại vào đảo đều 20 giây để hương tỏi bốc lên nồng nàn rồi tắt bếp, gắp ra đĩa thưởng thức ngay khi còn nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000024000001",
        "name": "Rau muống cọng non",
        "quantity": 600,
        "unit": "g",
        "notes": "Nhặt bớt lá, ngắt khúc vừa ăn rửa sạch",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000024000002",
        "name": "Tỏi ta củ nhỏ thơm",
        "quantity": 2,
        "unit": "củ",
        "notes": "Bóc vỏ, đập dập không băm quá vụn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000024000003",
        "name": "Dầu hào, nước mắm cốt, hạt nêm",
        "quantity": 2,
        "unit": "muỗng canh",
        "notes": "Nêm đậm đà vừa miệng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000024000004",
        "name": "Mỡ heo hoặc dầu ăn",
        "quantity": 2,
        "unit": "muỗng canh",
        "notes": "Giúp cọng rau bóng mượt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000024000005",
        "name": "Chanh tươi hoặc sấu luộc",
        "quantity": 1,
        "unit": "quả",
        "notes": "Vắt vào nước luộc rau làm canh chua",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000024000001",
        "stepNumber": 1,
        "title": "Chần rau muống và ngâm nước đá",
        "description": "Đun thật sôi nồi nước với 1 muỗng cà phê muối, thả rau muống vào chần đúng 1 phút rồi vớt ngay ra thau nước đá lạnh ngâm 3 phút, sau đó vớt ra để thật ráo nước.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000024000002",
        "stepNumber": 2,
        "title": "Phi thơm một nửa lượng tỏi đập dập",
        "description": "Đun nóng chảo gang với 2 muỗng mỡ heo trên lửa lớn nhất, cho phân nửa lượng tỏi đập dập vào phi dậy mùi thơm vàng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000024000003",
        "stepNumber": 3,
        "title": "Xào rau muống trên lửa lớn",
        "description": "Thả rau muống đã ráo nước vào chảo, nêm dầu hào, hạt nêm và 1 muỗng nước mắm cốt, dùng đũa đảo nhanh tay liên tục trên lửa lớn trong 2 phút.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000024000004",
        "stepNumber": 4,
        "title": "Thêm tỏi tươi lần hai và bày ra đĩa",
        "description": "Cho nốt phần tỏi đập dập còn lại vào đảo đều 20 giây để hương tỏi bốc lên nồng nàn rồi tắt bếp, gắp ra đĩa thưởng thức ngay khi còn nóng.",
        "timerMinutes": 1,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000024000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000024000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000024000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000025": {
    "id": "22222222-2222-4222-8222-000000000025",
    "title": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon",
    "slug": "mien-xao-cua-bien-gia-he",
    "description": "Sợi miến dong dai bóng không hề bị dính cục hay đứt gãy, thấm đẫm vị ngọt đậm đà từ thịt cua biển gỡ múi, nấm hương, cà rốt, giá đỗ và lá hẹ xanh tươi.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-25T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 26,
    "nutrition": {
      "calories": 430,
      "protein": 28,
      "carbohydrates": 50,
      "fat": 13,
      "fiber": 4,
      "sodium": 710
    },
    "instructions": "Bước 1 (Bí quyết xử lý sợi miến tơi không dính): Ngâm miến dong trong nước ấm 10 phút cho mềm rồi vớt ra để thật ráo. Trộn miến với 1 muỗng dầu mè, 1 muỗng nước tương và nửa lòng trắng trứng gà để sợi miến dai bóng khi xào.\nBước 2 (Xào săn thịt cua biển và rau củ): Phi thơm hành tỏi, cho thịt cua biển vào xào săn 2 phút rồi trút ra bát. Tiếp tục xào nấm hương, mộc nhĩ và cà rốt thái sợi với chút dầu hào.\nBước 3 (Áp chảo xào miến dong): Cho miến vào chảo lớn đảo đều trên lửa vừa, rưới từ từ 4 muỗng nước dùng gà để sợi miến chín mềm trong suốt mà vẫn tơi rời từng sợi.\nBước 4 (Trộn thịt cua, giá hẹ và thưởng thức): Cho phần thịt cua, nấm, cà rốt cùng giá đỗ và lá hẹ cắt khúc vào chảo miến, đảo nhanh trên lửa lớn 2 phút. Rắc tiêu xay và hành phi lên mặt đĩa.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000025000001",
        "name": "Miến dong nguyên chất",
        "quantity": 300,
        "unit": "g",
        "notes": "Ngâm nước ấm 10 phút, cắt khúc vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000025000002",
        "name": "Thịt cua biển tươi gỡ sẵn",
        "quantity": 250,
        "unit": "g",
        "notes": "Ướp chút tiêu và hành tím băm",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000025000003",
        "name": "Nấm hương, mộc nhĩ, cà rốt thái sợi",
        "quantity": 150,
        "unit": "g",
        "notes": "Tạo độ giòn và màu sắc bắt mắt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000025000004",
        "name": "Giá đỗ, lá hẹ, hành tây",
        "quantity": 150,
        "unit": "g",
        "notes": "Cho vào sau cùng giữ độ tươi giòn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000025000005",
        "name": "Dầu hào, nước tương, dầu mè, lòng trắng trứng",
        "quantity": 40,
        "unit": "ml",
        "notes": "Trộn miến giúp sợi tơi bóng",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000025000001",
        "stepNumber": 1,
        "title": "Bí quyết xử lý sợi miến tơi không dính",
        "description": "Ngâm miến dong trong nước ấm 10 phút cho mềm rồi vớt ra để thật ráo. Trộn miến với 1 muỗng dầu mè, 1 muỗng nước tương và nửa lòng trắng trứng gà để sợi miến dai bóng khi xào.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000025000002",
        "stepNumber": 2,
        "title": "Xào săn thịt cua biển và rau củ",
        "description": "Phi thơm hành tỏi, cho thịt cua biển vào xào săn 2 phút rồi trút ra bát. Tiếp tục xào nấm hương, mộc nhĩ và cà rốt thái sợi với chút dầu hào.",
        "timerMinutes": 6,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000025000003",
        "stepNumber": 3,
        "title": "Áp chảo xào miến dong",
        "description": "Cho miến vào chảo lớn đảo đều trên lửa vừa, rưới từ từ 4 muỗng nước dùng gà để sợi miến chín mềm trong suốt mà vẫn tơi rời từng sợi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000025000004",
        "stepNumber": 4,
        "title": "Trộn thịt cua, giá hẹ và thưởng thức",
        "description": "Cho phần thịt cua, nấm, cà rốt cùng giá đỗ và lá hẹ cắt khúc vào chảo miến, đảo nhanh trên lửa lớn 2 phút. Rắc tiêu xay và hành phi lên mặt đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000025000001",
        "originalUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "altText": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000025000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000025000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "mien-xao-cua-bien-gia-he": {
    "id": "22222222-2222-4222-8222-000000000025",
    "title": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon",
    "slug": "mien-xao-cua-bien-gia-he",
    "description": "Sợi miến dong dai bóng không hề bị dính cục hay đứt gãy, thấm đẫm vị ngọt đậm đà từ thịt cua biển gỡ múi, nấm hương, cà rốt, giá đỗ và lá hẹ xanh tươi.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "seeder-user-id",
    "authorName": "Chef Nguyễn Nhất Minh",
    "coverImageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-25T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 26,
    "nutrition": {
      "calories": 430,
      "protein": 28,
      "carbohydrates": 50,
      "fat": 13,
      "fiber": 4,
      "sodium": 710
    },
    "instructions": "Bước 1 (Bí quyết xử lý sợi miến tơi không dính): Ngâm miến dong trong nước ấm 10 phút cho mềm rồi vớt ra để thật ráo. Trộn miến với 1 muỗng dầu mè, 1 muỗng nước tương và nửa lòng trắng trứng gà để sợi miến dai bóng khi xào.\nBước 2 (Xào săn thịt cua biển và rau củ): Phi thơm hành tỏi, cho thịt cua biển vào xào săn 2 phút rồi trút ra bát. Tiếp tục xào nấm hương, mộc nhĩ và cà rốt thái sợi với chút dầu hào.\nBước 3 (Áp chảo xào miến dong): Cho miến vào chảo lớn đảo đều trên lửa vừa, rưới từ từ 4 muỗng nước dùng gà để sợi miến chín mềm trong suốt mà vẫn tơi rời từng sợi.\nBước 4 (Trộn thịt cua, giá hẹ và thưởng thức): Cho phần thịt cua, nấm, cà rốt cùng giá đỗ và lá hẹ cắt khúc vào chảo miến, đảo nhanh trên lửa lớn 2 phút. Rắc tiêu xay và hành phi lên mặt đĩa.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000025000001",
        "name": "Miến dong nguyên chất",
        "quantity": 300,
        "unit": "g",
        "notes": "Ngâm nước ấm 10 phút, cắt khúc vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000025000002",
        "name": "Thịt cua biển tươi gỡ sẵn",
        "quantity": 250,
        "unit": "g",
        "notes": "Ướp chút tiêu và hành tím băm",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000025000003",
        "name": "Nấm hương, mộc nhĩ, cà rốt thái sợi",
        "quantity": 150,
        "unit": "g",
        "notes": "Tạo độ giòn và màu sắc bắt mắt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000025000004",
        "name": "Giá đỗ, lá hẹ, hành tây",
        "quantity": 150,
        "unit": "g",
        "notes": "Cho vào sau cùng giữ độ tươi giòn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000025000005",
        "name": "Dầu hào, nước tương, dầu mè, lòng trắng trứng",
        "quantity": 40,
        "unit": "ml",
        "notes": "Trộn miến giúp sợi tơi bóng",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000025000001",
        "stepNumber": 1,
        "title": "Bí quyết xử lý sợi miến tơi không dính",
        "description": "Ngâm miến dong trong nước ấm 10 phút cho mềm rồi vớt ra để thật ráo. Trộn miến với 1 muỗng dầu mè, 1 muỗng nước tương và nửa lòng trắng trứng gà để sợi miến dai bóng khi xào.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000025000002",
        "stepNumber": 2,
        "title": "Xào săn thịt cua biển và rau củ",
        "description": "Phi thơm hành tỏi, cho thịt cua biển vào xào săn 2 phút rồi trút ra bát. Tiếp tục xào nấm hương, mộc nhĩ và cà rốt thái sợi với chút dầu hào.",
        "timerMinutes": 6,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000025000003",
        "stepNumber": 3,
        "title": "Áp chảo xào miến dong",
        "description": "Cho miến vào chảo lớn đảo đều trên lửa vừa, rưới từ từ 4 muỗng nước dùng gà để sợi miến chín mềm trong suốt mà vẫn tơi rời từng sợi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000025000004",
        "stepNumber": 4,
        "title": "Trộn thịt cua, giá hẹ và thưởng thức",
        "description": "Cho phần thịt cua, nấm, cà rốt cùng giá đỗ và lá hẹ cắt khúc vào chảo miến, đảo nhanh trên lửa lớn 2 phút. Rắc tiêu xay và hành phi lên mặt đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000025000001",
        "originalUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
        "altText": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000025000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000025000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Miến Xào Cua Biển Giá Hẹ Tơi Ngon - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000026": {
    "id": "22222222-2222-4222-8222-000000000026",
    "title": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt",
    "slug": "thit-bo-xao-bong-thien-ly",
    "description": "Sự kết hợp hoàn hảo giữa thịt thăn bò mềm ngọt ướp dầu hào tỏi và những chùm bông thiên lý xanh non giòn mát, mang lại món xào thanh nhiệt giàu dưỡng chất cho bữa cơm chiều.",
    "prepTime": 15,
    "cookTime": 10,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-26T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 29,
    "nutrition": {
      "calories": 340,
      "protein": 30,
      "carbohydrates": 14,
      "fat": 18,
      "fiber": 4,
      "sodium": 640
    },
    "instructions": "Bước 1 (Sơ chế bông thiên lý và ướp thịt bò): Bông thiên lý ngâm nước muối loãng 5 phút rồi xả nhẹ dưới vòi nước để không bị dập. Ướp thịt bò thái mỏng với tỏi băm, 1 muỗng dầu hào, chút tiêu và 1 muỗng dầu ăn trong 15 phút.\nBước 2 (Xào tái thịt bò trên lửa lớn): Đun chảo thật nóng với dầu ăn, phi thơm tỏi rồi trút thịt bò vào đảo nhanh tay 90 giây đến khi thịt vừa chín tái thì trút ngay ra đĩa.\nBước 3 (Xào bông thiên lý xanh giòn): Thêm chút dầu vào chảo, cho bông thiên lý vào xào lửa lớn cùng 1 muỗng dầu hào và 2 muỗng nước lọc trong 2 phút cho bông chín xanh bóng.\nBước 4 (Đảo chung với thịt bò và bày đĩa): Đổ thịt bò tái trở lại chảo bông thiên lý, đảo đều 30 giây rồi tắt bếp ngay để thịt bò mềm ngọt không bị dai. Bày ra đĩa rắc tiêu xay.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000026000001",
        "name": "Thịt thăn bò mềm",
        "quantity": 350,
        "unit": "g",
        "notes": "Thái lát mỏng ngang thớ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000026000002",
        "name": "Bông thiên lý tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Nhặt bỏ cuống già, rửa nhẹ với nước muối loãng",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000026000003",
        "name": "Tỏi băm & hành tím",
        "quantity": 30,
        "unit": "g",
        "notes": "Phi thơm dạy vị",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000026000004",
        "name": "Dầu hào, hạt nêm, tiêu xay, dầu ăn",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Ướp bò và nêm khi xào",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000026000001",
        "stepNumber": 1,
        "title": "Sơ chế bông thiên lý và ướp thịt bò",
        "description": "Bông thiên lý ngâm nước muối loãng 5 phút rồi xả nhẹ dưới vòi nước để không bị dập. Ướp thịt bò thái mỏng với tỏi băm, 1 muỗng dầu hào, chút tiêu và 1 muỗng dầu ăn trong 15 phút.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000026000002",
        "stepNumber": 2,
        "title": "Xào tái thịt bò trên lửa lớn",
        "description": "Đun chảo thật nóng với dầu ăn, phi thơm tỏi rồi trút thịt bò vào đảo nhanh tay 90 giây đến khi thịt vừa chín tái thì trút ngay ra đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000026000003",
        "stepNumber": 3,
        "title": "Xào bông thiên lý xanh giòn",
        "description": "Thêm chút dầu vào chảo, cho bông thiên lý vào xào lửa lớn cùng 1 muỗng dầu hào và 2 muỗng nước lọc trong 2 phút cho bông chín xanh bóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000026000004",
        "stepNumber": 4,
        "title": "Đảo chung với thịt bò và bày đĩa",
        "description": "Đổ thịt bò tái trở lại chảo bông thiên lý, đảo đều 30 giây rồi tắt bếp ngay để thịt bò mềm ngọt không bị dai. Bày ra đĩa rắc tiêu xay.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000026000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000026000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000026000003",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "thit-bo-xao-bong-thien-ly": {
    "id": "22222222-2222-4222-8222-000000000026",
    "title": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt",
    "slug": "thit-bo-xao-bong-thien-ly",
    "description": "Sự kết hợp hoàn hảo giữa thịt thăn bò mềm ngọt ướp dầu hào tỏi và những chùm bông thiên lý xanh non giòn mát, mang lại món xào thanh nhiệt giàu dưỡng chất cho bữa cơm chiều.",
    "prepTime": 15,
    "cookTime": 10,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000005",
    "categoryName": "Món Xào & Áp Chảo",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-26T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 29,
    "nutrition": {
      "calories": 340,
      "protein": 30,
      "carbohydrates": 14,
      "fat": 18,
      "fiber": 4,
      "sodium": 640
    },
    "instructions": "Bước 1 (Sơ chế bông thiên lý và ướp thịt bò): Bông thiên lý ngâm nước muối loãng 5 phút rồi xả nhẹ dưới vòi nước để không bị dập. Ướp thịt bò thái mỏng với tỏi băm, 1 muỗng dầu hào, chút tiêu và 1 muỗng dầu ăn trong 15 phút.\nBước 2 (Xào tái thịt bò trên lửa lớn): Đun chảo thật nóng với dầu ăn, phi thơm tỏi rồi trút thịt bò vào đảo nhanh tay 90 giây đến khi thịt vừa chín tái thì trút ngay ra đĩa.\nBước 3 (Xào bông thiên lý xanh giòn): Thêm chút dầu vào chảo, cho bông thiên lý vào xào lửa lớn cùng 1 muỗng dầu hào và 2 muỗng nước lọc trong 2 phút cho bông chín xanh bóng.\nBước 4 (Đảo chung với thịt bò và bày đĩa): Đổ thịt bò tái trở lại chảo bông thiên lý, đảo đều 30 giây rồi tắt bếp ngay để thịt bò mềm ngọt không bị dai. Bày ra đĩa rắc tiêu xay.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000005",
      "name": "Món Xào & Áp Chảo",
      "slug": "mon-xao-ap-chao",
      "description": "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.",
      "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 5,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000026000001",
        "name": "Thịt thăn bò mềm",
        "quantity": 350,
        "unit": "g",
        "notes": "Thái lát mỏng ngang thớ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000026000002",
        "name": "Bông thiên lý tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Nhặt bỏ cuống già, rửa nhẹ với nước muối loãng",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000026000003",
        "name": "Tỏi băm & hành tím",
        "quantity": 30,
        "unit": "g",
        "notes": "Phi thơm dạy vị",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000026000004",
        "name": "Dầu hào, hạt nêm, tiêu xay, dầu ăn",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Ướp bò và nêm khi xào",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000026000001",
        "stepNumber": 1,
        "title": "Sơ chế bông thiên lý và ướp thịt bò",
        "description": "Bông thiên lý ngâm nước muối loãng 5 phút rồi xả nhẹ dưới vòi nước để không bị dập. Ướp thịt bò thái mỏng với tỏi băm, 1 muỗng dầu hào, chút tiêu và 1 muỗng dầu ăn trong 15 phút.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000026000002",
        "stepNumber": 2,
        "title": "Xào tái thịt bò trên lửa lớn",
        "description": "Đun chảo thật nóng với dầu ăn, phi thơm tỏi rồi trút thịt bò vào đảo nhanh tay 90 giây đến khi thịt vừa chín tái thì trút ngay ra đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000026000003",
        "stepNumber": 3,
        "title": "Xào bông thiên lý xanh giòn",
        "description": "Thêm chút dầu vào chảo, cho bông thiên lý vào xào lửa lớn cùng 1 muỗng dầu hào và 2 muỗng nước lọc trong 2 phút cho bông chín xanh bóng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000026000004",
        "stepNumber": 4,
        "title": "Đảo chung với thịt bò và bày đĩa",
        "description": "Đổ thịt bò tái trở lại chảo bông thiên lý, đảo đều 30 giây rồi tắt bếp ngay để thịt bò mềm ngọt không bị dai. Bày ra đĩa rắc tiêu xay.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000026000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000026000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000026000003",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000027": {
    "id": "22222222-2222-4222-8222-000000000027",
    "title": "Bún Chả Hà Nội Thịt Nướng Than Hoa",
    "slug": "bun-cha-ha-noi-thit-nuong",
    "description": "Đệ nhất ẩm thực Hà Thành với chả viên và chả miếng ba chỉ nướng vỉ than hoa xém vàng thơm lừng, ngâm trong bát nước chấm chua ngọt ấm nóng điểm xuyết đu đủ xanh giòn.",
    "prepTime": 35,
    "cookTime": 25,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-27T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 32,
    "nutrition": {
      "calories": 580,
      "protein": 35,
      "carbohydrates": 58,
      "fat": 22,
      "fiber": 4,
      "sodium": 850
    },
    "instructions": "Bước 1 (Ướp chả miếng và nặn chả viên): Ướp riêng thịt ba chỉ thái lát và thịt nạc vai xay với nước cốt hành tỏi, nước mắm, mật ong, dầu hào, chút nước hàng và tiêu trong 30 phút. Nặn thịt xay thành các viên tròn dẹt đều nhau.\nBước 2 (Làm dưa góp đu đủ cà rốt và pha nước chấm): Đu đủ xanh và cà rốt tỉa hoa bóp muối rửa sạch, ngâm với giấm đường cho giòn. Nấu ấm hỗn hợp nước lọc, nước mắm, đường và giấm theo tỉ lệ 5:1:1:1 cho vị thanh dịu.\nBước 3 (Nướng chả trên than hoa hoặc nồi chiên): Xếp chả viên và chả miếng lên vỉ nướng trên than hoa (hoặc nồi chiên không dầu 195 độ C trong 15 phút), lật đều hai mặt cho đến khi thịt xém vàng dậy mùi thơm.\nBước 4 (Trình bày mẹt bún chả Hà Nội): Múc nước chấm ấm ra bát tô, thả dưa góp đu đủ cà rốt cùng chả viên, chả miếng nóng hổi vào bát, thêm tỏi ớt băm và dùng kèm bún rối, rau sống.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000027000001",
        "name": "Thịt ba chỉ heo & nạc vai xay",
        "quantity": 700,
        "unit": "g",
        "notes": "350g ba chỉ thái lát làm chả miếng, 350g nạc vai làm chả viên",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000027000002",
        "name": "Bún rối sợi nhỏ Hà Nội",
        "quantity": 800,
        "unit": "g",
        "notes": "Bày ra mẹt hoặc đĩa",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000027000003",
        "name": "Đu đủ xanh & cà rốt",
        "quantity": 200,
        "unit": "g",
        "notes": "Tỉa hoa thái mỏng, bóp muối rồi ngâm giấm đường",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000027000004",
        "name": "Nước mắm, mật ong, dầu hào, nước hàng",
        "quantity": 80,
        "unit": "ml",
        "notes": "Ướp thịt nướng lên màu cánh gián thơm lừng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000027000005",
        "name": "Rau sống tía tô, kinh giới, xà lách, tỏi ớt",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch để ráo ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000027000001",
        "stepNumber": 1,
        "title": "Ướp chả miếng và nặn chả viên",
        "description": "Ướp riêng thịt ba chỉ thái lát và thịt nạc vai xay với nước cốt hành tỏi, nước mắm, mật ong, dầu hào, chút nước hàng và tiêu trong 30 phút. Nặn thịt xay thành các viên tròn dẹt đều nhau.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000027000002",
        "stepNumber": 2,
        "title": "Làm dưa góp đu đủ cà rốt và pha nước chấm",
        "description": "Đu đủ xanh và cà rốt tỉa hoa bóp muối rửa sạch, ngâm với giấm đường cho giòn. Nấu ấm hỗn hợp nước lọc, nước mắm, đường và giấm theo tỉ lệ 5:1:1:1 cho vị thanh dịu.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000027000003",
        "stepNumber": 3,
        "title": "Nướng chả trên than hoa hoặc nồi chiên",
        "description": "Xếp chả viên và chả miếng lên vỉ nướng trên than hoa (hoặc nồi chiên không dầu 195 độ C trong 15 phút), lật đều hai mặt cho đến khi thịt xém vàng dậy mùi thơm.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000027000004",
        "stepNumber": 4,
        "title": "Trình bày mẹt bún chả Hà Nội",
        "description": "Múc nước chấm ấm ra bát tô, thả dưa góp đu đủ cà rốt cùng chả viên, chả miếng nóng hổi vào bát, thêm tỏi ớt băm và dùng kèm bún rối, rau sống.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000027000001",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Chả Hà Nội Thịt Nướng Than Hoa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000027000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Chả Hà Nội Thịt Nướng Than Hoa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000027000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Chả Hà Nội Thịt Nướng Than Hoa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "bun-cha-ha-noi-thit-nuong": {
    "id": "22222222-2222-4222-8222-000000000027",
    "title": "Bún Chả Hà Nội Thịt Nướng Than Hoa",
    "slug": "bun-cha-ha-noi-thit-nuong",
    "description": "Đệ nhất ẩm thực Hà Thành với chả viên và chả miếng ba chỉ nướng vỉ than hoa xém vàng thơm lừng, ngâm trong bát nước chấm chua ngọt ấm nóng điểm xuyết đu đủ xanh giòn.",
    "prepTime": 35,
    "cookTime": 25,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-27T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 32,
    "nutrition": {
      "calories": 580,
      "protein": 35,
      "carbohydrates": 58,
      "fat": 22,
      "fiber": 4,
      "sodium": 850
    },
    "instructions": "Bước 1 (Ướp chả miếng và nặn chả viên): Ướp riêng thịt ba chỉ thái lát và thịt nạc vai xay với nước cốt hành tỏi, nước mắm, mật ong, dầu hào, chút nước hàng và tiêu trong 30 phút. Nặn thịt xay thành các viên tròn dẹt đều nhau.\nBước 2 (Làm dưa góp đu đủ cà rốt và pha nước chấm): Đu đủ xanh và cà rốt tỉa hoa bóp muối rửa sạch, ngâm với giấm đường cho giòn. Nấu ấm hỗn hợp nước lọc, nước mắm, đường và giấm theo tỉ lệ 5:1:1:1 cho vị thanh dịu.\nBước 3 (Nướng chả trên than hoa hoặc nồi chiên): Xếp chả viên và chả miếng lên vỉ nướng trên than hoa (hoặc nồi chiên không dầu 195 độ C trong 15 phút), lật đều hai mặt cho đến khi thịt xém vàng dậy mùi thơm.\nBước 4 (Trình bày mẹt bún chả Hà Nội): Múc nước chấm ấm ra bát tô, thả dưa góp đu đủ cà rốt cùng chả viên, chả miếng nóng hổi vào bát, thêm tỏi ớt băm và dùng kèm bún rối, rau sống.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000027000001",
        "name": "Thịt ba chỉ heo & nạc vai xay",
        "quantity": 700,
        "unit": "g",
        "notes": "350g ba chỉ thái lát làm chả miếng, 350g nạc vai làm chả viên",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000027000002",
        "name": "Bún rối sợi nhỏ Hà Nội",
        "quantity": 800,
        "unit": "g",
        "notes": "Bày ra mẹt hoặc đĩa",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000027000003",
        "name": "Đu đủ xanh & cà rốt",
        "quantity": 200,
        "unit": "g",
        "notes": "Tỉa hoa thái mỏng, bóp muối rồi ngâm giấm đường",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000027000004",
        "name": "Nước mắm, mật ong, dầu hào, nước hàng",
        "quantity": 80,
        "unit": "ml",
        "notes": "Ướp thịt nướng lên màu cánh gián thơm lừng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000027000005",
        "name": "Rau sống tía tô, kinh giới, xà lách, tỏi ớt",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch để ráo ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000027000001",
        "stepNumber": 1,
        "title": "Ướp chả miếng và nặn chả viên",
        "description": "Ướp riêng thịt ba chỉ thái lát và thịt nạc vai xay với nước cốt hành tỏi, nước mắm, mật ong, dầu hào, chút nước hàng và tiêu trong 30 phút. Nặn thịt xay thành các viên tròn dẹt đều nhau.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000027000002",
        "stepNumber": 2,
        "title": "Làm dưa góp đu đủ cà rốt và pha nước chấm",
        "description": "Đu đủ xanh và cà rốt tỉa hoa bóp muối rửa sạch, ngâm với giấm đường cho giòn. Nấu ấm hỗn hợp nước lọc, nước mắm, đường và giấm theo tỉ lệ 5:1:1:1 cho vị thanh dịu.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000027000003",
        "stepNumber": 3,
        "title": "Nướng chả trên than hoa hoặc nồi chiên",
        "description": "Xếp chả viên và chả miếng lên vỉ nướng trên than hoa (hoặc nồi chiên không dầu 195 độ C trong 15 phút), lật đều hai mặt cho đến khi thịt xém vàng dậy mùi thơm.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000027000004",
        "stepNumber": 4,
        "title": "Trình bày mẹt bún chả Hà Nội",
        "description": "Múc nước chấm ấm ra bát tô, thả dưa góp đu đủ cà rốt cùng chả viên, chả miếng nóng hổi vào bát, thêm tỏi ớt băm và dùng kèm bún rối, rau sống.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000027000001",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Chả Hà Nội Thịt Nướng Than Hoa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000027000002",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Chả Hà Nội Thịt Nướng Than Hoa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000027000003",
        "originalUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Chả Hà Nội Thịt Nướng Than Hoa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000028": {
    "id": "22222222-2222-4222-8222-000000000028",
    "title": "Gà Nướng Mật Ong Lá Chanh Da Giòn",
    "slug": "ga-nuong-mat-ong-la-chanh",
    "description": "Gà ta nguyên con hoặc đùi gà được ướp thấm sốt mật ong, nghệ và sả tỏi rồi nướng chín vàng óng ả, lớp da căng bóng giòn thơm hương lá chanh thái chỉ.",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-28T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 35,
    "nutrition": {
      "calories": 510,
      "protein": 42,
      "carbohydrates": 18,
      "fat": 28,
      "fiber": 1,
      "sodium": 760
    },
    "instructions": "Bước 1 (Pha sốt ướp mật ong thảo mộc): Xay nhuyễn sả, hành tím, tỏi cùng 2 muỗng dầu hào, 2 muỗng mật ong, 1 muỗng nước mắm, nửa muỗng ngũ vị hương và 1 muỗng dầu điều.\nBước 2 (Massage gia vị ướp gà): Xát đều hỗn hợp sốt ướp lên toàn bộ mặt trong và ngoài thân gà, ướp tối thiểu 30 phút cho gia vị ngấm sâu vào từng thớ thịt.\nBước 3 (Nướng gà và phết mật ong): Nướng gà ở nhiệt độ 185 độ C trong 25 phút cho gà chín đều từ bên trong. Sau đó phết hỗn hợp mật ong pha chút nước cốt chanh lên da gà, tăng nhiệt 200 độ C nướng thêm 8 phút cho da vàng giòn.\nBước 4 (Rắc lá chanh thái chỉ và thưởng thức): Chặt gà nướng thành miếng vừa ăn bày ra đĩa, rắc lá chanh non thái chỉ lên trên và chấm cùng muối ớt xanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000028000001",
        "name": "Gà ta làm sạch (hoặc 4 đùi gà lớn)",
        "quantity": 1200,
        "unit": "g",
        "notes": "Khứa nhẹ phần đùi để thấm gia vị",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000028000002",
        "name": "Mật ong rừng nguyên chất",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo màu vàng óng và vị ngọt dịu",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000028000003",
        "name": "Sả, tỏi, hành tím, ngũ vị hương, dầu hào",
        "quantity": 60,
        "unit": "g",
        "notes": "Xay nhuyễn làm sốt ướp",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000028000004",
        "name": "Lá chanh non & ớt sừng",
        "quantity": 20,
        "unit": "g",
        "notes": "Thái chỉ mịn rắc lên gà nướng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000028000005",
        "name": "Muối ớt chanh xanh",
        "quantity": 50,
        "unit": "g",
        "notes": "Nước chấm đi kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000028000001",
        "stepNumber": 1,
        "title": "Pha sốt ướp mật ong thảo mộc",
        "description": "Xay nhuyễn sả, hành tím, tỏi cùng 2 muỗng dầu hào, 2 muỗng mật ong, 1 muỗng nước mắm, nửa muỗng ngũ vị hương và 1 muỗng dầu điều.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000028000002",
        "stepNumber": 2,
        "title": "Massage gia vị ướp gà",
        "description": "Xát đều hỗn hợp sốt ướp lên toàn bộ mặt trong và ngoài thân gà, ướp tối thiểu 30 phút cho gia vị ngấm sâu vào từng thớ thịt.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000028000003",
        "stepNumber": 3,
        "title": "Nướng gà và phết mật ong",
        "description": "Nướng gà ở nhiệt độ 185 độ C trong 25 phút cho gà chín đều từ bên trong. Sau đó phết hỗn hợp mật ong pha chút nước cốt chanh lên da gà, tăng nhiệt 200 độ C nướng thêm 8 phút cho da vàng giòn.",
        "timerMinutes": 33,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000028000004",
        "stepNumber": 4,
        "title": "Rắc lá chanh thái chỉ và thưởng thức",
        "description": "Chặt gà nướng thành miếng vừa ăn bày ra đĩa, rắc lá chanh non thái chỉ lên trên và chấm cùng muối ớt xanh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000028000001",
        "originalUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
        "altText": "Gà Nướng Mật Ong Lá Chanh Da Giòn",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000028000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Nướng Mật Ong Lá Chanh Da Giòn - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000028000003",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Nướng Mật Ong Lá Chanh Da Giòn - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ga-nuong-mat-ong-la-chanh": {
    "id": "22222222-2222-4222-8222-000000000028",
    "title": "Gà Nướng Mật Ong Lá Chanh Da Giòn",
    "slug": "ga-nuong-mat-ong-la-chanh",
    "description": "Gà ta nguyên con hoặc đùi gà được ướp thấm sốt mật ong, nghệ và sả tỏi rồi nướng chín vàng óng ả, lớp da căng bóng giòn thơm hương lá chanh thái chỉ.",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-03-28T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 35,
    "nutrition": {
      "calories": 510,
      "protein": 42,
      "carbohydrates": 18,
      "fat": 28,
      "fiber": 1,
      "sodium": 760
    },
    "instructions": "Bước 1 (Pha sốt ướp mật ong thảo mộc): Xay nhuyễn sả, hành tím, tỏi cùng 2 muỗng dầu hào, 2 muỗng mật ong, 1 muỗng nước mắm, nửa muỗng ngũ vị hương và 1 muỗng dầu điều.\nBước 2 (Massage gia vị ướp gà): Xát đều hỗn hợp sốt ướp lên toàn bộ mặt trong và ngoài thân gà, ướp tối thiểu 30 phút cho gia vị ngấm sâu vào từng thớ thịt.\nBước 3 (Nướng gà và phết mật ong): Nướng gà ở nhiệt độ 185 độ C trong 25 phút cho gà chín đều từ bên trong. Sau đó phết hỗn hợp mật ong pha chút nước cốt chanh lên da gà, tăng nhiệt 200 độ C nướng thêm 8 phút cho da vàng giòn.\nBước 4 (Rắc lá chanh thái chỉ và thưởng thức): Chặt gà nướng thành miếng vừa ăn bày ra đĩa, rắc lá chanh non thái chỉ lên trên và chấm cùng muối ớt xanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000028000001",
        "name": "Gà ta làm sạch (hoặc 4 đùi gà lớn)",
        "quantity": 1200,
        "unit": "g",
        "notes": "Khứa nhẹ phần đùi để thấm gia vị",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000028000002",
        "name": "Mật ong rừng nguyên chất",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Tạo màu vàng óng và vị ngọt dịu",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000028000003",
        "name": "Sả, tỏi, hành tím, ngũ vị hương, dầu hào",
        "quantity": 60,
        "unit": "g",
        "notes": "Xay nhuyễn làm sốt ướp",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000028000004",
        "name": "Lá chanh non & ớt sừng",
        "quantity": 20,
        "unit": "g",
        "notes": "Thái chỉ mịn rắc lên gà nướng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000028000005",
        "name": "Muối ớt chanh xanh",
        "quantity": 50,
        "unit": "g",
        "notes": "Nước chấm đi kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000028000001",
        "stepNumber": 1,
        "title": "Pha sốt ướp mật ong thảo mộc",
        "description": "Xay nhuyễn sả, hành tím, tỏi cùng 2 muỗng dầu hào, 2 muỗng mật ong, 1 muỗng nước mắm, nửa muỗng ngũ vị hương và 1 muỗng dầu điều.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000028000002",
        "stepNumber": 2,
        "title": "Massage gia vị ướp gà",
        "description": "Xát đều hỗn hợp sốt ướp lên toàn bộ mặt trong và ngoài thân gà, ướp tối thiểu 30 phút cho gia vị ngấm sâu vào từng thớ thịt.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000028000003",
        "stepNumber": 3,
        "title": "Nướng gà và phết mật ong",
        "description": "Nướng gà ở nhiệt độ 185 độ C trong 25 phút cho gà chín đều từ bên trong. Sau đó phết hỗn hợp mật ong pha chút nước cốt chanh lên da gà, tăng nhiệt 200 độ C nướng thêm 8 phút cho da vàng giòn.",
        "timerMinutes": 33,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000028000004",
        "stepNumber": 4,
        "title": "Rắc lá chanh thái chỉ và thưởng thức",
        "description": "Chặt gà nướng thành miếng vừa ăn bày ra đĩa, rắc lá chanh non thái chỉ lên trên và chấm cùng muối ớt xanh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000028000001",
        "originalUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
        "altText": "Gà Nướng Mật Ong Lá Chanh Da Giòn",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000028000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Nướng Mật Ong Lá Chanh Da Giòn - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000028000003",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Gà Nướng Mật Ong Lá Chanh Da Giòn - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000029": {
    "id": "22222222-2222-4222-8222-000000000029",
    "title": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong",
    "slug": "suon-cay-nuong-ngu-vi-bbq",
    "description": "Những dẻ sườn heo bản dài được ướp ngũ vị hương, mật ong và sốt BBQ đậm đà, nướng chậm đến khi thịt mềm mọng róc xương và bề mặt cháy cạnh hấp dẫn.",
    "prepTime": 30,
    "cookTime": 40,
    "totalTime": 70,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-01T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 38,
    "nutrition": {
      "calories": 590,
      "protein": 39,
      "carbohydrates": 22,
      "fat": 37,
      "fiber": 2,
      "sodium": 870
    },
    "instructions": "Bước 1 (Sơ chế và ướp sườn cây): Rửa sạch sườn cây, lột bỏ lớp màng trắng mặt dưới xương rồi thấm khô. Xát đều bột tỏi, ngũ vị hương và một nửa lượng sốt BBQ mật ong lên sườn, ướp 30 phút.\nBước 2 (Bọc giấy bạc nướng mềm sườn): Bọc kín tảng sườn trong giấy bạc, cho vào lò nướng hoặc nồi chiên không dầu ở 175 độ C trong 25 phút để thịt sườn chín mềm mọng nước từ bên trong.\nBước 3 (Phết sốt BBQ nướng xém mặt): Mở lớp giấy bạc, phết đều phần sốt BBQ mật ong còn lại lên hai mặt sườn, tăng nhiệt 200 độ C nướng thêm 12 phút cho sốt keo lại và xém cạnh thơm phức.\nBước 4 (Cắt dẻ sườn và bày đĩa): Để sườn nghỉ 5 phút rồi cắt rời từng dẻ sườn, bày ra đĩa gỗ cùng bắp ngọt nướng bơ và salad rau tươi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000029000001",
        "name": "Sườn cây heo tươi",
        "quantity": 900,
        "unit": "g",
        "notes": "Lột bỏ lớp màng gân mặt sau để sườn mềm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000029000002",
        "name": "Sốt BBQ, tương cà, mật ong, dầu hào",
        "quantity": 100,
        "unit": "g",
        "notes": "Pha hỗn hợp sốt nướng bóng mượt",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000029000003",
        "name": "Ngũ vị hương, bột tỏi, bột hành, tiêu",
        "quantity": 20,
        "unit": "g",
        "notes": "Gia vị khô xát lên sườn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000029000004",
        "name": "Bắp ngọt nướng & xà lách",
        "quantity": 250,
        "unit": "g",
        "notes": "Nướng kèm ăn đỡ ngấy",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000029000001",
        "stepNumber": 1,
        "title": "Sơ chế và ướp sườn cây",
        "description": "Rửa sạch sườn cây, lột bỏ lớp màng trắng mặt dưới xương rồi thấm khô. Xát đều bột tỏi, ngũ vị hương và một nửa lượng sốt BBQ mật ong lên sườn, ướp 30 phút.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000029000002",
        "stepNumber": 2,
        "title": "Bọc giấy bạc nướng mềm sườn",
        "description": "Bọc kín tảng sườn trong giấy bạc, cho vào lò nướng hoặc nồi chiên không dầu ở 175 độ C trong 25 phút để thịt sườn chín mềm mọng nước từ bên trong.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000029000003",
        "stepNumber": 3,
        "title": "Phết sốt BBQ nướng xém mặt",
        "description": "Mở lớp giấy bạc, phết đều phần sốt BBQ mật ong còn lại lên hai mặt sườn, tăng nhiệt 200 độ C nướng thêm 12 phút cho sốt keo lại và xém cạnh thơm phức.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000029000004",
        "stepNumber": 4,
        "title": "Cắt dẻ sườn và bày đĩa",
        "description": "Để sườn nghỉ 5 phút rồi cắt rời từng dẻ sườn, bày ra đĩa gỗ cùng bắp ngọt nướng bơ và salad rau tươi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000029000001",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "altText": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000029000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000029000003",
        "originalUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "suon-cay-nuong-ngu-vi-bbq": {
    "id": "22222222-2222-4222-8222-000000000029",
    "title": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong",
    "slug": "suon-cay-nuong-ngu-vi-bbq",
    "description": "Những dẻ sườn heo bản dài được ướp ngũ vị hương, mật ong và sốt BBQ đậm đà, nướng chậm đến khi thịt mềm mọng róc xương và bề mặt cháy cạnh hấp dẫn.",
    "prepTime": 30,
    "cookTime": 40,
    "totalTime": 70,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-01T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 38,
    "nutrition": {
      "calories": 590,
      "protein": 39,
      "carbohydrates": 22,
      "fat": 37,
      "fiber": 2,
      "sodium": 870
    },
    "instructions": "Bước 1 (Sơ chế và ướp sườn cây): Rửa sạch sườn cây, lột bỏ lớp màng trắng mặt dưới xương rồi thấm khô. Xát đều bột tỏi, ngũ vị hương và một nửa lượng sốt BBQ mật ong lên sườn, ướp 30 phút.\nBước 2 (Bọc giấy bạc nướng mềm sườn): Bọc kín tảng sườn trong giấy bạc, cho vào lò nướng hoặc nồi chiên không dầu ở 175 độ C trong 25 phút để thịt sườn chín mềm mọng nước từ bên trong.\nBước 3 (Phết sốt BBQ nướng xém mặt): Mở lớp giấy bạc, phết đều phần sốt BBQ mật ong còn lại lên hai mặt sườn, tăng nhiệt 200 độ C nướng thêm 12 phút cho sốt keo lại và xém cạnh thơm phức.\nBước 4 (Cắt dẻ sườn và bày đĩa): Để sườn nghỉ 5 phút rồi cắt rời từng dẻ sườn, bày ra đĩa gỗ cùng bắp ngọt nướng bơ và salad rau tươi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000029000001",
        "name": "Sườn cây heo tươi",
        "quantity": 900,
        "unit": "g",
        "notes": "Lột bỏ lớp màng gân mặt sau để sườn mềm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000029000002",
        "name": "Sốt BBQ, tương cà, mật ong, dầu hào",
        "quantity": 100,
        "unit": "g",
        "notes": "Pha hỗn hợp sốt nướng bóng mượt",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000029000003",
        "name": "Ngũ vị hương, bột tỏi, bột hành, tiêu",
        "quantity": 20,
        "unit": "g",
        "notes": "Gia vị khô xát lên sườn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000029000004",
        "name": "Bắp ngọt nướng & xà lách",
        "quantity": 250,
        "unit": "g",
        "notes": "Nướng kèm ăn đỡ ngấy",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000029000001",
        "stepNumber": 1,
        "title": "Sơ chế và ướp sườn cây",
        "description": "Rửa sạch sườn cây, lột bỏ lớp màng trắng mặt dưới xương rồi thấm khô. Xát đều bột tỏi, ngũ vị hương và một nửa lượng sốt BBQ mật ong lên sườn, ướp 30 phút.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000029000002",
        "stepNumber": 2,
        "title": "Bọc giấy bạc nướng mềm sườn",
        "description": "Bọc kín tảng sườn trong giấy bạc, cho vào lò nướng hoặc nồi chiên không dầu ở 175 độ C trong 25 phút để thịt sườn chín mềm mọng nước từ bên trong.",
        "timerMinutes": 25,
        "imageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000029000003",
        "stepNumber": 3,
        "title": "Phết sốt BBQ nướng xém mặt",
        "description": "Mở lớp giấy bạc, phết đều phần sốt BBQ mật ong còn lại lên hai mặt sườn, tăng nhiệt 200 độ C nướng thêm 12 phút cho sốt keo lại và xém cạnh thơm phức.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000029000004",
        "stepNumber": 4,
        "title": "Cắt dẻ sườn và bày đĩa",
        "description": "Để sườn nghỉ 5 phút rồi cắt rời từng dẻ sườn, bày ra đĩa gỗ cùng bắp ngọt nướng bơ và salad rau tươi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000029000001",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
        "altText": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000029000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000029000003",
        "originalUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80",
        "altText": "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000030": {
    "id": "22222222-2222-4222-8222-000000000030",
    "title": "Nem Nướng Nha Trang Cuốn Bánh Tráng",
    "slug": "nem-nuong-nha-trang",
    "description": "Lụi nem thịt heo quết dẻo nướng vàng thơm lừng trên than hồng, cuốn cùng bánh tráng chiên giòn, xoài xanh, dưa leo, rau thơm và chấm sốt tương nếp thịt bằm béo bùi đặc trưng Nha Trang.",
    "prepTime": 35,
    "cookTime": 25,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Hard",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-02T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 12,
    "nutrition": {
      "calories": 530,
      "protein": 31,
      "carbohydrates": 49,
      "fat": 22,
      "fiber": 4,
      "sodium": 810
    },
    "instructions": "Bước 1 (Quết giò nem và bọc cây sả): Trộn giò sống, thịt nạc vai xay, mỡ hạt lựu với tỏi băm, đường, nước mắm và tiêu, để ngăn đá 30 phút rồi quết thật dẻo. Bọc hỗn hợp thịt quanh đầu từng cây sả thành lụi nem.\nBước 2 (Nấu nước chấm tương nếp Nha Trang): Nấu cháo gạo nếp thật nhừ rồi xay mịn cùng tương hột. Phi thơm hành tỏi với dầu điều, xào săn tôm thịt bằm rồi đổ hỗn hợp cháo nếp tương vào đun sánh, rắc đậu phộng giã dập.\nBước 3 (Nướng vàng lụi nem sả): Nướng các cây nem trên bếp than hoặc nồi chiên không dầu ở 185 độ C trong 15 phút, trở đều tay và phết dầu điều cho lụi nem vàng bóng thơm mùi sả.\nBước 4 (Trình bày mẹt nem nướng Nha Trang): Xếp nem nướng, bánh tráng chiên giòn (ram), bún tươi, xoài xanh, dưa leo, rau thơm ra mẹt lớn cùng bát sốt chấm tương nếp nóng hổi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000030000001",
        "name": "Giò sống & thịt nạc vai xay có mỡ",
        "quantity": 600,
        "unit": "g",
        "notes": "Quết lạnh cùng tỏi băm và nước mắm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000030000002",
        "name": "Sả cây làm que xiên nướng",
        "quantity": 12,
        "unit": "cây",
        "notes": "Rửa sạch để bọc nem quanh thân sả",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000030000003",
        "name": "Gạo nếp, tương hột, tôm thịt bằm, đậu phộng",
        "quantity": 200,
        "unit": "g",
        "notes": "Nấu sốt chấm nem nướng đặc trưng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000030000004",
        "name": "Bánh tráng cuốn & ram chiên giòn",
        "quantity": 200,
        "unit": "g",
        "notes": "Tạo độ giòn rụm trong mỗi cuốn nem",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000030000005",
        "name": "Xoài xanh, dưa leo, khế, chuối chát, rau sống",
        "quantity": 300,
        "unit": "g",
        "notes": "Thái thanh dài để cuốn",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000030000001",
        "stepNumber": 1,
        "title": "Quết giò nem và bọc cây sả",
        "description": "Trộn giò sống, thịt nạc vai xay, mỡ hạt lựu với tỏi băm, đường, nước mắm và tiêu, để ngăn đá 30 phút rồi quết thật dẻo. Bọc hỗn hợp thịt quanh đầu từng cây sả thành lụi nem.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000030000002",
        "stepNumber": 2,
        "title": "Nấu nước chấm tương nếp Nha Trang",
        "description": "Nấu cháo gạo nếp thật nhừ rồi xay mịn cùng tương hột. Phi thơm hành tỏi với dầu điều, xào săn tôm thịt bằm rồi đổ hỗn hợp cháo nếp tương vào đun sánh, rắc đậu phộng giã dập.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000030000003",
        "stepNumber": 3,
        "title": "Nướng vàng lụi nem sả",
        "description": "Nướng các cây nem trên bếp than hoặc nồi chiên không dầu ở 185 độ C trong 15 phút, trở đều tay và phết dầu điều cho lụi nem vàng bóng thơm mùi sả.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000030000004",
        "stepNumber": 4,
        "title": "Trình bày mẹt nem nướng Nha Trang",
        "description": "Xếp nem nướng, bánh tráng chiên giòn (ram), bún tươi, xoài xanh, dưa leo, rau thơm ra mẹt lớn cùng bát sốt chấm tương nếp nóng hổi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000030000001",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "altText": "Nem Nướng Nha Trang Cuốn Bánh Tráng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000030000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Nem Nướng Nha Trang Cuốn Bánh Tráng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000030000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Nem Nướng Nha Trang Cuốn Bánh Tráng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "nem-nuong-nha-trang": {
    "id": "22222222-2222-4222-8222-000000000030",
    "title": "Nem Nướng Nha Trang Cuốn Bánh Tráng",
    "slug": "nem-nuong-nha-trang",
    "description": "Lụi nem thịt heo quết dẻo nướng vàng thơm lừng trên than hồng, cuốn cùng bánh tráng chiên giòn, xoài xanh, dưa leo, rau thơm và chấm sốt tương nếp thịt bằm béo bùi đặc trưng Nha Trang.",
    "prepTime": 35,
    "cookTime": 25,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Hard",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-02T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 12,
    "nutrition": {
      "calories": 530,
      "protein": 31,
      "carbohydrates": 49,
      "fat": 22,
      "fiber": 4,
      "sodium": 810
    },
    "instructions": "Bước 1 (Quết giò nem và bọc cây sả): Trộn giò sống, thịt nạc vai xay, mỡ hạt lựu với tỏi băm, đường, nước mắm và tiêu, để ngăn đá 30 phút rồi quết thật dẻo. Bọc hỗn hợp thịt quanh đầu từng cây sả thành lụi nem.\nBước 2 (Nấu nước chấm tương nếp Nha Trang): Nấu cháo gạo nếp thật nhừ rồi xay mịn cùng tương hột. Phi thơm hành tỏi với dầu điều, xào săn tôm thịt bằm rồi đổ hỗn hợp cháo nếp tương vào đun sánh, rắc đậu phộng giã dập.\nBước 3 (Nướng vàng lụi nem sả): Nướng các cây nem trên bếp than hoặc nồi chiên không dầu ở 185 độ C trong 15 phút, trở đều tay và phết dầu điều cho lụi nem vàng bóng thơm mùi sả.\nBước 4 (Trình bày mẹt nem nướng Nha Trang): Xếp nem nướng, bánh tráng chiên giòn (ram), bún tươi, xoài xanh, dưa leo, rau thơm ra mẹt lớn cùng bát sốt chấm tương nếp nóng hổi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000030000001",
        "name": "Giò sống & thịt nạc vai xay có mỡ",
        "quantity": 600,
        "unit": "g",
        "notes": "Quết lạnh cùng tỏi băm và nước mắm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000030000002",
        "name": "Sả cây làm que xiên nướng",
        "quantity": 12,
        "unit": "cây",
        "notes": "Rửa sạch để bọc nem quanh thân sả",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000030000003",
        "name": "Gạo nếp, tương hột, tôm thịt bằm, đậu phộng",
        "quantity": 200,
        "unit": "g",
        "notes": "Nấu sốt chấm nem nướng đặc trưng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000030000004",
        "name": "Bánh tráng cuốn & ram chiên giòn",
        "quantity": 200,
        "unit": "g",
        "notes": "Tạo độ giòn rụm trong mỗi cuốn nem",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000030000005",
        "name": "Xoài xanh, dưa leo, khế, chuối chát, rau sống",
        "quantity": 300,
        "unit": "g",
        "notes": "Thái thanh dài để cuốn",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000030000001",
        "stepNumber": 1,
        "title": "Quết giò nem và bọc cây sả",
        "description": "Trộn giò sống, thịt nạc vai xay, mỡ hạt lựu với tỏi băm, đường, nước mắm và tiêu, để ngăn đá 30 phút rồi quết thật dẻo. Bọc hỗn hợp thịt quanh đầu từng cây sả thành lụi nem.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000030000002",
        "stepNumber": 2,
        "title": "Nấu nước chấm tương nếp Nha Trang",
        "description": "Nấu cháo gạo nếp thật nhừ rồi xay mịn cùng tương hột. Phi thơm hành tỏi với dầu điều, xào săn tôm thịt bằm rồi đổ hỗn hợp cháo nếp tương vào đun sánh, rắc đậu phộng giã dập.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000030000003",
        "stepNumber": 3,
        "title": "Nướng vàng lụi nem sả",
        "description": "Nướng các cây nem trên bếp than hoặc nồi chiên không dầu ở 185 độ C trong 15 phút, trở đều tay và phết dầu điều cho lụi nem vàng bóng thơm mùi sả.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000030000004",
        "stepNumber": 4,
        "title": "Trình bày mẹt nem nướng Nha Trang",
        "description": "Xếp nem nướng, bánh tráng chiên giòn (ram), bún tươi, xoài xanh, dưa leo, rau thơm ra mẹt lớn cùng bát sốt chấm tương nếp nóng hổi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000030000001",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
        "altText": "Nem Nướng Nha Trang Cuốn Bánh Tráng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000030000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Nem Nướng Nha Trang Cuốn Bánh Tráng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000030000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Nem Nướng Nha Trang Cuốn Bánh Tráng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000031": {
    "id": "22222222-2222-4222-8222-000000000031",
    "title": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi",
    "slug": "tom-cang-xanh-nuong-pho-mai",
    "description": "Tôm càng xanh tươi sống chẻ đôi lưng được phủ lớp sốt bơ tỏi ngò tây và phô mai Mozzarella kéo sợi béo ngậy, nướng chín đỏ au giữ trọn vị ngọt chắc của thịt tôm.",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-03T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 15,
    "nutrition": {
      "calories": 460,
      "protein": 38,
      "carbohydrates": 8,
      "fat": 30,
      "fiber": 1,
      "sodium": 780
    },
    "instructions": "Bước 1 (Sơ chế và chẻ đôi lưng tôm càng xanh): Rửa sạch tôm càng xanh, dùng dao sắc chẻ dọc phần lưng tôm từ đầu xuống đuôi nhưng không đứt rời, rút bỏ chỉ đen rồi mở phẳng phần thịt tôm lên trên.\nBước 2 (Làm sốt bơ tỏi thảo mộc): Đun chảy bơ lạt trên lửa nhỏ, cho tỏi băm vào phi thơm vàng dịu, nêm chút muối, tiêu và ngò tây băm nhỏ rồi tắt bếp.\nBước 3 (Phủ sốt bơ tỏi và phô mai Mozzarella): Xếp tôm càng xanh lên khay nướng, rưới đều sốt bơ tỏi thấm vào thịt và gạch tôm, sau đó phủ đầy phô mai Mozzarella bào sợi lên mặt.\nBước 4 (Nướng tôm chảy phô mai vàng óng): Đưa khay tôm vào lò nướng hoặc nồi chiên ở 200 độ C trong 10 phút cho đến khi vỏ tôm đỏ au và lớp phô mai tan chảy xém vàng thơm lừng. Thưởng thức ngay khi còn nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000031000001",
        "name": "Tôm càng xanh loại lớn",
        "quantity": 800,
        "unit": "g",
        "notes": "Cắt râu, chẻ dọc sống lưng lấy chỉ đen",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000031000002",
        "name": "Phô mai Mozzarella bào sợi",
        "quantity": 200,
        "unit": "g",
        "notes": "Phủ lên lưng tôm tạo độ kéo sợi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000031000003",
        "name": "Bơ lạt & tỏi băm nhuyễn",
        "quantity": 80,
        "unit": "g",
        "notes": "Đun chảy làm sốt bơ tỏi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000031000004",
        "name": "Ngò rí hoặc mùi tây (Parsley) băm, tiêu",
        "quantity": 20,
        "unit": "g",
        "notes": "Trộn vào sốt bơ tỏi",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000031000005",
        "name": "Chanh tươi & muối tiêu xanh",
        "quantity": 30,
        "unit": "g",
        "notes": "Chấm kèm hải sản",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000031000001",
        "stepNumber": 1,
        "title": "Sơ chế và chẻ đôi lưng tôm càng xanh",
        "description": "Rửa sạch tôm càng xanh, dùng dao sắc chẻ dọc phần lưng tôm từ đầu xuống đuôi nhưng không đứt rời, rút bỏ chỉ đen rồi mở phẳng phần thịt tôm lên trên.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000031000002",
        "stepNumber": 2,
        "title": "Làm sốt bơ tỏi thảo mộc",
        "description": "Đun chảy bơ lạt trên lửa nhỏ, cho tỏi băm vào phi thơm vàng dịu, nêm chút muối, tiêu và ngò tây băm nhỏ rồi tắt bếp.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000031000003",
        "stepNumber": 3,
        "title": "Phủ sốt bơ tỏi và phô mai Mozzarella",
        "description": "Xếp tôm càng xanh lên khay nướng, rưới đều sốt bơ tỏi thấm vào thịt và gạch tôm, sau đó phủ đầy phô mai Mozzarella bào sợi lên mặt.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000031000004",
        "stepNumber": 4,
        "title": "Nướng tôm chảy phô mai vàng óng",
        "description": "Đưa khay tôm vào lò nướng hoặc nồi chiên ở 200 độ C trong 10 phút cho đến khi vỏ tôm đỏ au và lớp phô mai tan chảy xém vàng thơm lừng. Thưởng thức ngay khi còn nóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000031000001",
        "originalUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "altText": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000031000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000031000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "tom-cang-xanh-nuong-pho-mai": {
    "id": "22222222-2222-4222-8222-000000000031",
    "title": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi",
    "slug": "tom-cang-xanh-nuong-pho-mai",
    "description": "Tôm càng xanh tươi sống chẻ đôi lưng được phủ lớp sốt bơ tỏi ngò tây và phô mai Mozzarella kéo sợi béo ngậy, nướng chín đỏ au giữ trọn vị ngọt chắc của thịt tôm.",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000006",
    "categoryName": "Món Nướng & Quay",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-03T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 15,
    "nutrition": {
      "calories": 460,
      "protein": 38,
      "carbohydrates": 8,
      "fat": 30,
      "fiber": 1,
      "sodium": 780
    },
    "instructions": "Bước 1 (Sơ chế và chẻ đôi lưng tôm càng xanh): Rửa sạch tôm càng xanh, dùng dao sắc chẻ dọc phần lưng tôm từ đầu xuống đuôi nhưng không đứt rời, rút bỏ chỉ đen rồi mở phẳng phần thịt tôm lên trên.\nBước 2 (Làm sốt bơ tỏi thảo mộc): Đun chảy bơ lạt trên lửa nhỏ, cho tỏi băm vào phi thơm vàng dịu, nêm chút muối, tiêu và ngò tây băm nhỏ rồi tắt bếp.\nBước 3 (Phủ sốt bơ tỏi và phô mai Mozzarella): Xếp tôm càng xanh lên khay nướng, rưới đều sốt bơ tỏi thấm vào thịt và gạch tôm, sau đó phủ đầy phô mai Mozzarella bào sợi lên mặt.\nBước 4 (Nướng tôm chảy phô mai vàng óng): Đưa khay tôm vào lò nướng hoặc nồi chiên ở 200 độ C trong 10 phút cho đến khi vỏ tôm đỏ au và lớp phô mai tan chảy xém vàng thơm lừng. Thưởng thức ngay khi còn nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000006",
      "name": "Món Nướng & Quay",
      "slug": "mon-nuong-quay",
      "description": "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 6,
      "recipeCount": 5
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000031000001",
        "name": "Tôm càng xanh loại lớn",
        "quantity": 800,
        "unit": "g",
        "notes": "Cắt râu, chẻ dọc sống lưng lấy chỉ đen",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000031000002",
        "name": "Phô mai Mozzarella bào sợi",
        "quantity": 200,
        "unit": "g",
        "notes": "Phủ lên lưng tôm tạo độ kéo sợi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000031000003",
        "name": "Bơ lạt & tỏi băm nhuyễn",
        "quantity": 80,
        "unit": "g",
        "notes": "Đun chảy làm sốt bơ tỏi",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000031000004",
        "name": "Ngò rí hoặc mùi tây (Parsley) băm, tiêu",
        "quantity": 20,
        "unit": "g",
        "notes": "Trộn vào sốt bơ tỏi",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000031000005",
        "name": "Chanh tươi & muối tiêu xanh",
        "quantity": 30,
        "unit": "g",
        "notes": "Chấm kèm hải sản",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000031000001",
        "stepNumber": 1,
        "title": "Sơ chế và chẻ đôi lưng tôm càng xanh",
        "description": "Rửa sạch tôm càng xanh, dùng dao sắc chẻ dọc phần lưng tôm từ đầu xuống đuôi nhưng không đứt rời, rút bỏ chỉ đen rồi mở phẳng phần thịt tôm lên trên.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000031000002",
        "stepNumber": 2,
        "title": "Làm sốt bơ tỏi thảo mộc",
        "description": "Đun chảy bơ lạt trên lửa nhỏ, cho tỏi băm vào phi thơm vàng dịu, nêm chút muối, tiêu và ngò tây băm nhỏ rồi tắt bếp.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000031000003",
        "stepNumber": 3,
        "title": "Phủ sốt bơ tỏi và phô mai Mozzarella",
        "description": "Xếp tôm càng xanh lên khay nướng, rưới đều sốt bơ tỏi thấm vào thịt và gạch tôm, sau đó phủ đầy phô mai Mozzarella bào sợi lên mặt.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000031000004",
        "stepNumber": 4,
        "title": "Nướng tôm chảy phô mai vàng óng",
        "description": "Đưa khay tôm vào lò nướng hoặc nồi chiên ở 200 độ C trong 10 phút cho đến khi vỏ tôm đỏ au và lớp phô mai tan chảy xém vàng thơm lừng. Thưởng thức ngay khi còn nóng.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000031000001",
        "originalUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "altText": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000031000002",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000031000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000032": {
    "id": "22222222-2222-4222-8222-000000000032",
    "title": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm",
    "slug": "cha-gio-re-tom-thit-khoai-mon",
    "description": "Từng cuốn chả giò (nem rán) vàng ươm với lớp vỏ bánh tráng rế giòn tan lâu ỉu, bao bọc phần nhân tôm tươi, thịt nạc vai, khoai môn bùi béo và mộc nhĩ thơm giòn.",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-04T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 18,
    "nutrition": {
      "calories": 490,
      "protein": 24,
      "carbohydrates": 42,
      "fat": 25,
      "fiber": 3,
      "sodium": 680
    },
    "instructions": "Bước 1 (Trộn nhân tôm thịt khoai môn): Trộn đều thịt nạc vai xay, tôm băm, khoai môn bào sợi, cà rốt, mộc nhĩ, miến cắt ngắn cùng 1 lòng đỏ trứng gà, hành tím băm, hạt nêm và tiêu xay.\nBước 2 (Cuốn chả giò đều tay): Trải bánh tráng rế ra thớt, múc 1 muỗng nhân đặt vào góc, gấp hai mép bên rồi cuộn tròn vừa tay (không cuốn quá chặt để tránh vỡ vỏ khi chiên).\nBước 3 (Chiên chả giò hai lửa cho giòn lâu): Chiên chả giò ngập dầu ở lửa vừa 7 phút cho nhân chín tới rồi vớt ra để nguội bớt. Trước khi ăn chiên lại lửa hơi cao 3 phút cho vỏ vàng giòn rụm.\nBước 4 (Pha nước mắm chua ngọt và trình bày): Xếp chả giò vàng ươm ra đĩa có giấy thấm dầu, dùng nóng cùng rau xà lách, rau thơm và nước mắm chua ngọt pha đồ chua.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000032000001",
        "name": "Bánh tráng rế hoặc bánh đa nem",
        "quantity": 25,
        "unit": "lá",
        "notes": "Giúp cuốn chả giò có lớp vỏ lưới giòn rụm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000032000002",
        "name": "Thịt nạc vai xay & tôm tươi băm",
        "quantity": 400,
        "unit": "g",
        "notes": "Trộn theo tỉ lệ 1:1",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000032000003",
        "name": "Khoai môn & cà rốt bào sợi",
        "quantity": 200,
        "unit": "g",
        "notes": "Giúp nhân chả giò bùi ngọt và khô ráo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000032000004",
        "name": "Miến dong, mộc nhĩ, lòng đỏ trứng gà",
        "quantity": 80,
        "unit": "g",
        "notes": "Kết dính phần nhân",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000032000005",
        "name": "Rau sống, bún tươi, nước mắm chua ngọt",
        "quantity": 200,
        "unit": "g",
        "notes": "Ăn kèm chả giò",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000032000001",
        "stepNumber": 1,
        "title": "Trộn nhân tôm thịt khoai môn",
        "description": "Trộn đều thịt nạc vai xay, tôm băm, khoai môn bào sợi, cà rốt, mộc nhĩ, miến cắt ngắn cùng 1 lòng đỏ trứng gà, hành tím băm, hạt nêm và tiêu xay.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000032000002",
        "stepNumber": 2,
        "title": "Cuốn chả giò đều tay",
        "description": "Trải bánh tráng rế ra thớt, múc 1 muỗng nhân đặt vào góc, gấp hai mép bên rồi cuộn tròn vừa tay (không cuốn quá chặt để tránh vỡ vỏ khi chiên).",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000032000003",
        "stepNumber": 3,
        "title": "Chiên chả giò hai lửa cho giòn lâu",
        "description": "Chiên chả giò ngập dầu ở lửa vừa 7 phút cho nhân chín tới rồi vớt ra để nguội bớt. Trước khi ăn chiên lại lửa hơi cao 3 phút cho vỏ vàng giòn rụm.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000032000004",
        "stepNumber": 4,
        "title": "Pha nước mắm chua ngọt và trình bày",
        "description": "Xếp chả giò vàng ươm ra đĩa có giấy thấm dầu, dùng nóng cùng rau xà lách, rau thơm và nước mắm chua ngọt pha đồ chua.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000032000001",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "altText": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000032000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000032000003",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "cha-gio-re-tom-thit-khoai-mon": {
    "id": "22222222-2222-4222-8222-000000000032",
    "title": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm",
    "slug": "cha-gio-re-tom-thit-khoai-mon",
    "description": "Từng cuốn chả giò (nem rán) vàng ươm với lớp vỏ bánh tráng rế giòn tan lâu ỉu, bao bọc phần nhân tôm tươi, thịt nạc vai, khoai môn bùi béo và mộc nhĩ thơm giòn.",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-04T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 18,
    "nutrition": {
      "calories": 490,
      "protein": 24,
      "carbohydrates": 42,
      "fat": 25,
      "fiber": 3,
      "sodium": 680
    },
    "instructions": "Bước 1 (Trộn nhân tôm thịt khoai môn): Trộn đều thịt nạc vai xay, tôm băm, khoai môn bào sợi, cà rốt, mộc nhĩ, miến cắt ngắn cùng 1 lòng đỏ trứng gà, hành tím băm, hạt nêm và tiêu xay.\nBước 2 (Cuốn chả giò đều tay): Trải bánh tráng rế ra thớt, múc 1 muỗng nhân đặt vào góc, gấp hai mép bên rồi cuộn tròn vừa tay (không cuốn quá chặt để tránh vỡ vỏ khi chiên).\nBước 3 (Chiên chả giò hai lửa cho giòn lâu): Chiên chả giò ngập dầu ở lửa vừa 7 phút cho nhân chín tới rồi vớt ra để nguội bớt. Trước khi ăn chiên lại lửa hơi cao 3 phút cho vỏ vàng giòn rụm.\nBước 4 (Pha nước mắm chua ngọt và trình bày): Xếp chả giò vàng ươm ra đĩa có giấy thấm dầu, dùng nóng cùng rau xà lách, rau thơm và nước mắm chua ngọt pha đồ chua.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000032000001",
        "name": "Bánh tráng rế hoặc bánh đa nem",
        "quantity": 25,
        "unit": "lá",
        "notes": "Giúp cuốn chả giò có lớp vỏ lưới giòn rụm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000032000002",
        "name": "Thịt nạc vai xay & tôm tươi băm",
        "quantity": 400,
        "unit": "g",
        "notes": "Trộn theo tỉ lệ 1:1",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000032000003",
        "name": "Khoai môn & cà rốt bào sợi",
        "quantity": 200,
        "unit": "g",
        "notes": "Giúp nhân chả giò bùi ngọt và khô ráo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000032000004",
        "name": "Miến dong, mộc nhĩ, lòng đỏ trứng gà",
        "quantity": 80,
        "unit": "g",
        "notes": "Kết dính phần nhân",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000032000005",
        "name": "Rau sống, bún tươi, nước mắm chua ngọt",
        "quantity": 200,
        "unit": "g",
        "notes": "Ăn kèm chả giò",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000032000001",
        "stepNumber": 1,
        "title": "Trộn nhân tôm thịt khoai môn",
        "description": "Trộn đều thịt nạc vai xay, tôm băm, khoai môn bào sợi, cà rốt, mộc nhĩ, miến cắt ngắn cùng 1 lòng đỏ trứng gà, hành tím băm, hạt nêm và tiêu xay.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000032000002",
        "stepNumber": 2,
        "title": "Cuốn chả giò đều tay",
        "description": "Trải bánh tráng rế ra thớt, múc 1 muỗng nhân đặt vào góc, gấp hai mép bên rồi cuộn tròn vừa tay (không cuốn quá chặt để tránh vỡ vỏ khi chiên).",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000032000003",
        "stepNumber": 3,
        "title": "Chiên chả giò hai lửa cho giòn lâu",
        "description": "Chiên chả giò ngập dầu ở lửa vừa 7 phút cho nhân chín tới rồi vớt ra để nguội bớt. Trước khi ăn chiên lại lửa hơi cao 3 phút cho vỏ vàng giòn rụm.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000032000004",
        "stepNumber": 4,
        "title": "Pha nước mắm chua ngọt và trình bày",
        "description": "Xếp chả giò vàng ươm ra đĩa có giấy thấm dầu, dùng nóng cùng rau xà lách, rau thơm và nước mắm chua ngọt pha đồ chua.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000032000001",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "altText": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000032000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000032000003",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000033": {
    "id": "22222222-2222-4222-8222-000000000033",
    "title": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà",
    "slug": "canh-ga-chien-nuoc-mam-toi-ot",
    "description": "Cánh gà chiên lớp vỏ ngoài giòn nhẹ, bên trong thịt vẫn mềm ngọt, được xóc đều trong lớp sốt nước mắm đường tỏi ớt phi vàng thơm phức, mặn ngọt quyến rũ.",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-05T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 21,
    "nutrition": {
      "calories": 520,
      "protein": 33,
      "carbohydrates": 20,
      "fat": 34,
      "fiber": 1,
      "sodium": 840
    },
    "instructions": "Bước 1 (Sơ chế và áo bột mỏng cánh gà): Rửa sạch cánh gà với nước muối gừng, dùng khăn giấy thấm thật khô rồi xóc đều với 2 muỗng bột bắp mỏng để khi chiên da gà giòn mà không bắn dầu.\nBước 2 (Chiên vàng giòn cánh gà): Đun nóng dầu ăn trên lửa vừa, thả cánh gà vào chiên khoảng 12 phút đến khi chín vàng đều hai mặt thì vớt ra để ráo dầu.\nBước 3 (Phi tỏi ớt và nấu sốt nước mắm kẹo): Phi vàng thơm tỏi băm và ớt băm với 1 muỗng dầu, vớt một nửa tỏi phi ra riêng. Đổ hỗn hợp 2 muỗng nước mắm, 2 muỗng đường và 1 muỗng tương ớt vào đun sôi sệt.\nBước 4 (Xóc cánh gà áo đều sốt): Trút cánh gà chiên vào chảo sốt nước mắm, đảo nhanh trên lửa vừa 1 phút cho sốt bám bóng đều từng chiếc cánh gà, rắc tỏi phi vàng lên trên rồi bày ra đĩa.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000033000001",
        "name": "Cánh gà tươi khúc giữa",
        "quantity": 600,
        "unit": "g",
        "notes": "Rửa muối gừng, khứa nhẹ để nhanh chín",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000033000002",
        "name": "Bột chiên giòn hoặc bột bắp",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Áo lớp mỏng giúp da gà giòn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000033000003",
        "name": "Nước mắm nhĩ, đường, tương ớt",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Khuấy tan làm sốt nước mắm",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000033000004",
        "name": "Tỏi băm, ớt sừng băm, hành lá",
        "quantity": 40,
        "unit": "g",
        "notes": "Phi vàng thơm xóc cùng cánh gà",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000033000005",
        "name": "Xà lách, dưa leo, cà chua",
        "quantity": 150,
        "unit": "g",
        "notes": "Lót đĩa trang trí",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000033000001",
        "stepNumber": 1,
        "title": "Sơ chế và áo bột mỏng cánh gà",
        "description": "Rửa sạch cánh gà với nước muối gừng, dùng khăn giấy thấm thật khô rồi xóc đều với 2 muỗng bột bắp mỏng để khi chiên da gà giòn mà không bắn dầu.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000033000002",
        "stepNumber": 2,
        "title": "Chiên vàng giòn cánh gà",
        "description": "Đun nóng dầu ăn trên lửa vừa, thả cánh gà vào chiên khoảng 12 phút đến khi chín vàng đều hai mặt thì vớt ra để ráo dầu.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000033000003",
        "stepNumber": 3,
        "title": "Phi tỏi ớt và nấu sốt nước mắm kẹo",
        "description": "Phi vàng thơm tỏi băm và ớt băm với 1 muỗng dầu, vớt một nửa tỏi phi ra riêng. Đổ hỗn hợp 2 muỗng nước mắm, 2 muỗng đường và 1 muỗng tương ớt vào đun sôi sệt.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000033000004",
        "stepNumber": 4,
        "title": "Xóc cánh gà áo đều sốt",
        "description": "Trút cánh gà chiên vào chảo sốt nước mắm, đảo nhanh trên lửa vừa 1 phút cho sốt bám bóng đều từng chiếc cánh gà, rắc tỏi phi vàng lên trên rồi bày ra đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000033000001",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "altText": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000033000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000033000003",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "canh-ga-chien-nuoc-mam-toi-ot": {
    "id": "22222222-2222-4222-8222-000000000033",
    "title": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà",
    "slug": "canh-ga-chien-nuoc-mam-toi-ot",
    "description": "Cánh gà chiên lớp vỏ ngoài giòn nhẹ, bên trong thịt vẫn mềm ngọt, được xóc đều trong lớp sốt nước mắm đường tỏi ớt phi vàng thơm phức, mặn ngọt quyến rũ.",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-05T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 21,
    "nutrition": {
      "calories": 520,
      "protein": 33,
      "carbohydrates": 20,
      "fat": 34,
      "fiber": 1,
      "sodium": 840
    },
    "instructions": "Bước 1 (Sơ chế và áo bột mỏng cánh gà): Rửa sạch cánh gà với nước muối gừng, dùng khăn giấy thấm thật khô rồi xóc đều với 2 muỗng bột bắp mỏng để khi chiên da gà giòn mà không bắn dầu.\nBước 2 (Chiên vàng giòn cánh gà): Đun nóng dầu ăn trên lửa vừa, thả cánh gà vào chiên khoảng 12 phút đến khi chín vàng đều hai mặt thì vớt ra để ráo dầu.\nBước 3 (Phi tỏi ớt và nấu sốt nước mắm kẹo): Phi vàng thơm tỏi băm và ớt băm với 1 muỗng dầu, vớt một nửa tỏi phi ra riêng. Đổ hỗn hợp 2 muỗng nước mắm, 2 muỗng đường và 1 muỗng tương ớt vào đun sôi sệt.\nBước 4 (Xóc cánh gà áo đều sốt): Trút cánh gà chiên vào chảo sốt nước mắm, đảo nhanh trên lửa vừa 1 phút cho sốt bám bóng đều từng chiếc cánh gà, rắc tỏi phi vàng lên trên rồi bày ra đĩa.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000033000001",
        "name": "Cánh gà tươi khúc giữa",
        "quantity": 600,
        "unit": "g",
        "notes": "Rửa muối gừng, khứa nhẹ để nhanh chín",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000033000002",
        "name": "Bột chiên giòn hoặc bột bắp",
        "quantity": 3,
        "unit": "muỗng canh",
        "notes": "Áo lớp mỏng giúp da gà giòn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000033000003",
        "name": "Nước mắm nhĩ, đường, tương ớt",
        "quantity": 4,
        "unit": "muỗng canh",
        "notes": "Khuấy tan làm sốt nước mắm",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000033000004",
        "name": "Tỏi băm, ớt sừng băm, hành lá",
        "quantity": 40,
        "unit": "g",
        "notes": "Phi vàng thơm xóc cùng cánh gà",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000033000005",
        "name": "Xà lách, dưa leo, cà chua",
        "quantity": 150,
        "unit": "g",
        "notes": "Lót đĩa trang trí",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000033000001",
        "stepNumber": 1,
        "title": "Sơ chế và áo bột mỏng cánh gà",
        "description": "Rửa sạch cánh gà với nước muối gừng, dùng khăn giấy thấm thật khô rồi xóc đều với 2 muỗng bột bắp mỏng để khi chiên da gà giòn mà không bắn dầu.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000033000002",
        "stepNumber": 2,
        "title": "Chiên vàng giòn cánh gà",
        "description": "Đun nóng dầu ăn trên lửa vừa, thả cánh gà vào chiên khoảng 12 phút đến khi chín vàng đều hai mặt thì vớt ra để ráo dầu.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000033000003",
        "stepNumber": 3,
        "title": "Phi tỏi ớt và nấu sốt nước mắm kẹo",
        "description": "Phi vàng thơm tỏi băm và ớt băm với 1 muỗng dầu, vớt một nửa tỏi phi ra riêng. Đổ hỗn hợp 2 muỗng nước mắm, 2 muỗng đường và 1 muỗng tương ớt vào đun sôi sệt.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000033000004",
        "stepNumber": 4,
        "title": "Xóc cánh gà áo đều sốt",
        "description": "Trút cánh gà chiên vào chảo sốt nước mắm, đảo nhanh trên lửa vừa 1 phút cho sốt bám bóng đều từng chiếc cánh gà, rắc tỏi phi vàng lên trên rồi bày ra đĩa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000033000001",
        "originalUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
        "altText": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000033000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000033000003",
        "originalUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
        "altText": "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000034": {
    "id": "22222222-2222-4222-8222-000000000034",
    "title": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt",
    "slug": "banh-xeo-mien-tay-tom-thit",
    "description": "Chiếc bánh xèo vàng nghệ vành mỏng giòn rụm thơm béo nước cốt dừa, bên trong đầy đặn nhân tôm đất, thịt ba chỉ, đậu xanh, củ hủ dừa và giá đỗ, cuốn cùng rau rừng tươi mát.",
    "prepTime": 25,
    "cookTime": 25,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-06T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 24,
    "nutrition": {
      "calories": 540,
      "protein": 26,
      "carbohydrates": 56,
      "fat": 23,
      "fiber": 5,
      "sodium": 750
    },
    "instructions": "Bước 1 (Pha bột bánh xèo giòn lâu): Hòa bột bánh xèo với nước cốt dừa, nước lọc, bột nghệ, hành lá cắt nhỏ và 50ml bia (bí quyết giúp vành bánh xèo giòn rụm), để bột nghỉ 20 phút.\nBước 2 (Xào sơ nhân tôm thịt): Phi thơm hành tím, cho thịt ba chỉ thái mỏng và tôm đất vào xào săn với chút hạt nêm và tiêu rồi múc ra bát.\nBước 3 (Tráng bánh xèo vành mỏng giòn): Đun thật nóng chảo rộng với chút mỡ heo, xếp vài miếng tôm thịt vào rồi múc 1 vá bột láng xoay tròn thật mỏng khắp lòng chảo. Rải đậu xanh, giá đỗ vào giữa, đậy nắp 2 phút rồi mở nắp chiên lửa vừa cho vành bánh tróc giòn.\nBước 4 (Gấp đôi bánh và cuốn rau rừng): Gấp đôi chiếc bánh xèo vàng giòn bày ra đĩa, cuốn trong lá cải bẹ xanh cùng rau thơm và chấm nước mắm chua ngọt pha đồ chua.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000034000001",
        "name": "Bột bánh xèo & bột nghệ",
        "quantity": 400,
        "unit": "g",
        "notes": "Pha cùng nước cốt dừa và chút bia cho vỏ giòn lâu",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000034000002",
        "name": "Nước cốt dừa tươi",
        "quantity": 200,
        "unit": "ml",
        "notes": "Tạo độ béo thơm cho vỏ bánh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000034000003",
        "name": "Tôm đất tươi & thịt ba chỉ thái mỏng",
        "quantity": 400,
        "unit": "g",
        "notes": "Xào săn sơ trước khi đổ bánh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000034000004",
        "name": "Đậu xanh hấp chín, giá đỗ, hành lá",
        "quantity": 250,
        "unit": "g",
        "notes": "Nhân bánh xèo truyền thống",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000034000005",
        "name": "Cải bẹ xanh, xà lách, lá cách, rau thơm",
        "quantity": 300,
        "unit": "g",
        "notes": "Cuốn bánh xèo chấm nước mắm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000034000001",
        "stepNumber": 1,
        "title": "Pha bột bánh xèo giòn lâu",
        "description": "Hòa bột bánh xèo với nước cốt dừa, nước lọc, bột nghệ, hành lá cắt nhỏ và 50ml bia (bí quyết giúp vành bánh xèo giòn rụm), để bột nghỉ 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000034000002",
        "stepNumber": 2,
        "title": "Xào sơ nhân tôm thịt",
        "description": "Phi thơm hành tím, cho thịt ba chỉ thái mỏng và tôm đất vào xào săn với chút hạt nêm và tiêu rồi múc ra bát.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000034000003",
        "stepNumber": 3,
        "title": "Tráng bánh xèo vành mỏng giòn",
        "description": "Đun thật nóng chảo rộng với chút mỡ heo, xếp vài miếng tôm thịt vào rồi múc 1 vá bột láng xoay tròn thật mỏng khắp lòng chảo. Rải đậu xanh, giá đỗ vào giữa, đậy nắp 2 phút rồi mở nắp chiên lửa vừa cho vành bánh tróc giòn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000034000004",
        "stepNumber": 4,
        "title": "Gấp đôi bánh và cuốn rau rừng",
        "description": "Gấp đôi chiếc bánh xèo vàng giòn bày ra đĩa, cuốn trong lá cải bẹ xanh cùng rau thơm và chấm nước mắm chua ngọt pha đồ chua.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000034000001",
        "originalUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "altText": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000034000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000034000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "banh-xeo-mien-tay-tom-thit": {
    "id": "22222222-2222-4222-8222-000000000034",
    "title": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt",
    "slug": "banh-xeo-mien-tay-tom-thit",
    "description": "Chiếc bánh xèo vàng nghệ vành mỏng giòn rụm thơm béo nước cốt dừa, bên trong đầy đặn nhân tôm đất, thịt ba chỉ, đậu xanh, củ hủ dừa và giá đỗ, cuốn cùng rau rừng tươi mát.",
    "prepTime": 25,
    "cookTime": 25,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-06T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 24,
    "nutrition": {
      "calories": 540,
      "protein": 26,
      "carbohydrates": 56,
      "fat": 23,
      "fiber": 5,
      "sodium": 750
    },
    "instructions": "Bước 1 (Pha bột bánh xèo giòn lâu): Hòa bột bánh xèo với nước cốt dừa, nước lọc, bột nghệ, hành lá cắt nhỏ và 50ml bia (bí quyết giúp vành bánh xèo giòn rụm), để bột nghỉ 20 phút.\nBước 2 (Xào sơ nhân tôm thịt): Phi thơm hành tím, cho thịt ba chỉ thái mỏng và tôm đất vào xào săn với chút hạt nêm và tiêu rồi múc ra bát.\nBước 3 (Tráng bánh xèo vành mỏng giòn): Đun thật nóng chảo rộng với chút mỡ heo, xếp vài miếng tôm thịt vào rồi múc 1 vá bột láng xoay tròn thật mỏng khắp lòng chảo. Rải đậu xanh, giá đỗ vào giữa, đậy nắp 2 phút rồi mở nắp chiên lửa vừa cho vành bánh tróc giòn.\nBước 4 (Gấp đôi bánh và cuốn rau rừng): Gấp đôi chiếc bánh xèo vàng giòn bày ra đĩa, cuốn trong lá cải bẹ xanh cùng rau thơm và chấm nước mắm chua ngọt pha đồ chua.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000034000001",
        "name": "Bột bánh xèo & bột nghệ",
        "quantity": 400,
        "unit": "g",
        "notes": "Pha cùng nước cốt dừa và chút bia cho vỏ giòn lâu",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000034000002",
        "name": "Nước cốt dừa tươi",
        "quantity": 200,
        "unit": "ml",
        "notes": "Tạo độ béo thơm cho vỏ bánh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000034000003",
        "name": "Tôm đất tươi & thịt ba chỉ thái mỏng",
        "quantity": 400,
        "unit": "g",
        "notes": "Xào săn sơ trước khi đổ bánh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000034000004",
        "name": "Đậu xanh hấp chín, giá đỗ, hành lá",
        "quantity": 250,
        "unit": "g",
        "notes": "Nhân bánh xèo truyền thống",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000034000005",
        "name": "Cải bẹ xanh, xà lách, lá cách, rau thơm",
        "quantity": 300,
        "unit": "g",
        "notes": "Cuốn bánh xèo chấm nước mắm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000034000001",
        "stepNumber": 1,
        "title": "Pha bột bánh xèo giòn lâu",
        "description": "Hòa bột bánh xèo với nước cốt dừa, nước lọc, bột nghệ, hành lá cắt nhỏ và 50ml bia (bí quyết giúp vành bánh xèo giòn rụm), để bột nghỉ 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000034000002",
        "stepNumber": 2,
        "title": "Xào sơ nhân tôm thịt",
        "description": "Phi thơm hành tím, cho thịt ba chỉ thái mỏng và tôm đất vào xào săn với chút hạt nêm và tiêu rồi múc ra bát.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000034000003",
        "stepNumber": 3,
        "title": "Tráng bánh xèo vành mỏng giòn",
        "description": "Đun thật nóng chảo rộng với chút mỡ heo, xếp vài miếng tôm thịt vào rồi múc 1 vá bột láng xoay tròn thật mỏng khắp lòng chảo. Rải đậu xanh, giá đỗ vào giữa, đậy nắp 2 phút rồi mở nắp chiên lửa vừa cho vành bánh tróc giòn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000034000004",
        "stepNumber": 4,
        "title": "Gấp đôi bánh và cuốn rau rừng",
        "description": "Gấp đôi chiếc bánh xèo vàng giòn bày ra đĩa, cuốn trong lá cải bẹ xanh cùng rau thơm và chấm nước mắm chua ngọt pha đồ chua.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000034000001",
        "originalUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
        "altText": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000034000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000034000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000035": {
    "id": "22222222-2222-4222-8222-000000000035",
    "title": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội",
    "slug": "cha-ca-la-vong-thi-la",
    "description": "Đặc sản trứ danh đất Kinh Kỳ với những miếng cá lăng ướp riềng mẻ nghệ vàng ươm, nướng thơm rồi đảo trên chảo nóng cùng thật nhiều thì là, hành hoa, ăn kèm bún rối và lạc rang.",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-07T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 27,
    "nutrition": {
      "calories": 480,
      "protein": 36,
      "carbohydrates": 38,
      "fat": 20,
      "fiber": 3,
      "sodium": 770
    },
    "instructions": "Bước 1 (Ướp cá lăng với riềng, mẻ, nghệ): Cắt phi lê cá lăng thành miếng vuông 3cm. Ướp cá với nước cốt riềng, mẻ lọc mịn, nước nghệ tươi, 1 muỗng mắm tôm và chút đường trong 30 phút.\nBước 2 (Nướng sơ cá cho săn vàng): Xếp cá lên vỉ nướng ở 190 độ C trong 10 phút cho miếng cá săn chắc và xém vàng thơm lừng mùi riềng mẻ.\nBước 3 (Đảo cá trên chảo nóng cùng thì là hành hoa): Đặt chảo gang lên bếp với 3 muỗng mỡ/dầu nóng, cho cá đã nướng vào đảo vàng rồi phủ đầy hành hoa, đầu hành trắng và rau thì là lên trên cho rau vừa chín tái dậy hương.\nBước 4 (Đánh mắm tôm sủi bọt và thưởng thức): Pha mắm tôm với nước cốt chanh, đường, chút rượu trắng và mỡ nóng đánh sủi bọt. Cho bún vào bát, gắp cá lăng, thì là, rắc lạc rang và rưới mắm tôm thưởng thức ngay.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000035000001",
        "name": "Phi lê cá lăng tươi",
        "quantity": 600,
        "unit": "g",
        "notes": "Cắt miếng vuông dày vừa ăn, thịt chắc không xương dăm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000035000002",
        "name": "Riềng giã, mẻ ngấu, nước cốt nghệ, mắm tôm",
        "quantity": 80,
        "unit": "g",
        "notes": "Lọc lấy nước ướp cá chuẩn vị cổ truyền",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000035000003",
        "name": "Rau thì là & hành hoa (hành lá)",
        "quantity": 250,
        "unit": "g",
        "notes": "Cắt khúc dài 5cm, chẻ trắng đầu hành",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000035000004",
        "name": "Bún rối tươi & đậu phộng rang",
        "quantity": 500,
        "unit": "g",
        "notes": "Ăn kèm chả cá nóng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000035000005",
        "name": "Mắm tôm ngon, chanh, rượu trắng, ớt",
        "quantity": 50,
        "unit": "g",
        "notes": "Đánh sủi bọt làm nước chấm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000035000001",
        "stepNumber": 1,
        "title": "Ướp cá lăng với riềng, mẻ, nghệ",
        "description": "Cắt phi lê cá lăng thành miếng vuông 3cm. Ướp cá với nước cốt riềng, mẻ lọc mịn, nước nghệ tươi, 1 muỗng mắm tôm và chút đường trong 30 phút.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000035000002",
        "stepNumber": 2,
        "title": "Nướng sơ cá cho săn vàng",
        "description": "Xếp cá lên vỉ nướng ở 190 độ C trong 10 phút cho miếng cá săn chắc và xém vàng thơm lừng mùi riềng mẻ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000035000003",
        "stepNumber": 3,
        "title": "Đảo cá trên chảo nóng cùng thì là hành hoa",
        "description": "Đặt chảo gang lên bếp với 3 muỗng mỡ/dầu nóng, cho cá đã nướng vào đảo vàng rồi phủ đầy hành hoa, đầu hành trắng và rau thì là lên trên cho rau vừa chín tái dậy hương.",
        "timerMinutes": 6,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000035000004",
        "stepNumber": 4,
        "title": "Đánh mắm tôm sủi bọt và thưởng thức",
        "description": "Pha mắm tôm với nước cốt chanh, đường, chút rượu trắng và mỡ nóng đánh sủi bọt. Cho bún vào bát, gắp cá lăng, thì là, rắc lạc rang và rưới mắm tôm thưởng thức ngay.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000035000001",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "altText": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000035000002",
        "originalUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000035000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "cha-ca-la-vong-thi-la": {
    "id": "22222222-2222-4222-8222-000000000035",
    "title": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội",
    "slug": "cha-ca-la-vong-thi-la",
    "description": "Đặc sản trứ danh đất Kinh Kỳ với những miếng cá lăng ướp riềng mẻ nghệ vàng ươm, nướng thơm rồi đảo trên chảo nóng cùng thật nhiều thì là, hành hoa, ăn kèm bún rối và lạc rang.",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000007",
    "categoryName": "Món Chiên & Rán",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-07T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 27,
    "nutrition": {
      "calories": 480,
      "protein": 36,
      "carbohydrates": 38,
      "fat": 20,
      "fiber": 3,
      "sodium": 770
    },
    "instructions": "Bước 1 (Ướp cá lăng với riềng, mẻ, nghệ): Cắt phi lê cá lăng thành miếng vuông 3cm. Ướp cá với nước cốt riềng, mẻ lọc mịn, nước nghệ tươi, 1 muỗng mắm tôm và chút đường trong 30 phút.\nBước 2 (Nướng sơ cá cho săn vàng): Xếp cá lên vỉ nướng ở 190 độ C trong 10 phút cho miếng cá săn chắc và xém vàng thơm lừng mùi riềng mẻ.\nBước 3 (Đảo cá trên chảo nóng cùng thì là hành hoa): Đặt chảo gang lên bếp với 3 muỗng mỡ/dầu nóng, cho cá đã nướng vào đảo vàng rồi phủ đầy hành hoa, đầu hành trắng và rau thì là lên trên cho rau vừa chín tái dậy hương.\nBước 4 (Đánh mắm tôm sủi bọt và thưởng thức): Pha mắm tôm với nước cốt chanh, đường, chút rượu trắng và mỡ nóng đánh sủi bọt. Cho bún vào bát, gắp cá lăng, thì là, rắc lạc rang và rưới mắm tôm thưởng thức ngay.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000007",
      "name": "Món Chiên & Rán",
      "slug": "mon-chien-ran",
      "description": "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.",
      "imageUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 7,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000035000001",
        "name": "Phi lê cá lăng tươi",
        "quantity": 600,
        "unit": "g",
        "notes": "Cắt miếng vuông dày vừa ăn, thịt chắc không xương dăm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000035000002",
        "name": "Riềng giã, mẻ ngấu, nước cốt nghệ, mắm tôm",
        "quantity": 80,
        "unit": "g",
        "notes": "Lọc lấy nước ướp cá chuẩn vị cổ truyền",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000035000003",
        "name": "Rau thì là & hành hoa (hành lá)",
        "quantity": 250,
        "unit": "g",
        "notes": "Cắt khúc dài 5cm, chẻ trắng đầu hành",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000035000004",
        "name": "Bún rối tươi & đậu phộng rang",
        "quantity": 500,
        "unit": "g",
        "notes": "Ăn kèm chả cá nóng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000035000005",
        "name": "Mắm tôm ngon, chanh, rượu trắng, ớt",
        "quantity": 50,
        "unit": "g",
        "notes": "Đánh sủi bọt làm nước chấm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000035000001",
        "stepNumber": 1,
        "title": "Ướp cá lăng với riềng, mẻ, nghệ",
        "description": "Cắt phi lê cá lăng thành miếng vuông 3cm. Ướp cá với nước cốt riềng, mẻ lọc mịn, nước nghệ tươi, 1 muỗng mắm tôm và chút đường trong 30 phút.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000035000002",
        "stepNumber": 2,
        "title": "Nướng sơ cá cho săn vàng",
        "description": "Xếp cá lên vỉ nướng ở 190 độ C trong 10 phút cho miếng cá săn chắc và xém vàng thơm lừng mùi riềng mẻ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000035000003",
        "stepNumber": 3,
        "title": "Đảo cá trên chảo nóng cùng thì là hành hoa",
        "description": "Đặt chảo gang lên bếp với 3 muỗng mỡ/dầu nóng, cho cá đã nướng vào đảo vàng rồi phủ đầy hành hoa, đầu hành trắng và rau thì là lên trên cho rau vừa chín tái dậy hương.",
        "timerMinutes": 6,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000035000004",
        "stepNumber": 4,
        "title": "Đánh mắm tôm sủi bọt và thưởng thức",
        "description": "Pha mắm tôm với nước cốt chanh, đường, chút rượu trắng và mỡ nóng đánh sủi bọt. Cho bún vào bát, gắp cá lăng, thì là, rắc lạc rang và rưới mắm tôm thưởng thức ngay.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000035000001",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "altText": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000035000002",
        "originalUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000035000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000036": {
    "id": "22222222-2222-4222-8222-000000000036",
    "title": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen",
    "slug": "goi-cuon-tom-thit-cham-tuong",
    "description": "Những cuốn gỏi trong trẻo thấy rõ con tôm sú đỏ au bên cạnh lát thịt ba chỉ luộc mềm, bún tươi, hẹ xanh và rau thơm, chấm cùng chén tương đen xay bơ đậu phộng béo bùi.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-08T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 30,
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbohydrates": 42,
      "fat": 9,
      "fiber": 4,
      "sodium": 580
    },
    "instructions": "Bước 1 (Luộc tôm sú và thịt ba chỉ): Luộc thịt ba chỉ với hành tím và chút muối trong 20 phút cho chín mềm, ngâm nước đá rồi thái lát mỏng. Tôm sú hấp cùng chút sả cho đỏ đẹp, bóc vỏ và chẻ đôi dọc sống lưng.\nBước 2 (Cuốn gỏi cuốn chắc tay): Thấm ướt nhẹ bánh tráng, xếp xà lách, rau thơm, dưa leo và bún tươi vào góc dưới, cuộn 1 vòng rồi xếp thịt ba chỉ, cọng hẹ và mặt đỏ của tôm úp xuống, gấp hai đầu cuốn chặt tay.\nBước 3 (Nấu sốt tương đen bơ đậu phộng): Phi thơm tỏi băm, cho 3 muỗng tương đen, 1 muỗng bơ đậu phộng và 100ml nước luộc thịt vào khuấy đều trên lửa nhỏ đến khi sốt sánh mịn.\nBước 4 (Bày đĩa và thưởng thức): Cắt đôi hoặc để nguyên các cuốn gỏi xếp ra đĩa, múc tương đen ra chén, rắc đậu phộng rang, đồ chua và ớt xay lên trên.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000036000001",
        "name": "Tôm sú tươi & thịt ba chỉ heo",
        "quantity": 500,
        "unit": "g",
        "notes": "Luộc chín, tôm chẻ đôi, thịt thái lát mỏng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000036000002",
        "name": "Bánh tráng dẻo cuốn gỏi & bún tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Thấm nhẹ nước ấm trước khi cuốn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000036000003",
        "name": "Xà lách, húng lủi, tía tô, lá hẹ, dưa leo",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch để thật ráo nước",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000036000004",
        "name": "Tương đen (Hoisin), bơ đậu phộng, tỏi phi",
        "quantity": 100,
        "unit": "g",
        "notes": "Nấu sốt tương chấm gỏi cuốn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000036000005",
        "name": "Đậu phộng rang giã dập & đồ chua",
        "quantity": 50,
        "unit": "g",
        "notes": "Rắc lên mặt chén sốt tương",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000036000001",
        "stepNumber": 1,
        "title": "Luộc tôm sú và thịt ba chỉ",
        "description": "Luộc thịt ba chỉ với hành tím và chút muối trong 20 phút cho chín mềm, ngâm nước đá rồi thái lát mỏng. Tôm sú hấp cùng chút sả cho đỏ đẹp, bóc vỏ và chẻ đôi dọc sống lưng.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000036000002",
        "stepNumber": 2,
        "title": "Cuốn gỏi cuốn chắc tay",
        "description": "Thấm ướt nhẹ bánh tráng, xếp xà lách, rau thơm, dưa leo và bún tươi vào góc dưới, cuộn 1 vòng rồi xếp thịt ba chỉ, cọng hẹ và mặt đỏ của tôm úp xuống, gấp hai đầu cuốn chặt tay.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000036000003",
        "stepNumber": 3,
        "title": "Nấu sốt tương đen bơ đậu phộng",
        "description": "Phi thơm tỏi băm, cho 3 muỗng tương đen, 1 muỗng bơ đậu phộng và 100ml nước luộc thịt vào khuấy đều trên lửa nhỏ đến khi sốt sánh mịn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000036000004",
        "stepNumber": 4,
        "title": "Bày đĩa và thưởng thức",
        "description": "Cắt đôi hoặc để nguyên các cuốn gỏi xếp ra đĩa, múc tương đen ra chén, rắc đậu phộng rang, đồ chua và ớt xay lên trên.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000036000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000036000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000036000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "goi-cuon-tom-thit-cham-tuong": {
    "id": "22222222-2222-4222-8222-000000000036",
    "title": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen",
    "slug": "goi-cuon-tom-thit-cham-tuong",
    "description": "Những cuốn gỏi trong trẻo thấy rõ con tôm sú đỏ au bên cạnh lát thịt ba chỉ luộc mềm, bún tươi, hẹ xanh và rau thơm, chấm cùng chén tương đen xay bơ đậu phộng béo bùi.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-08T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 30,
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbohydrates": 42,
      "fat": 9,
      "fiber": 4,
      "sodium": 580
    },
    "instructions": "Bước 1 (Luộc tôm sú và thịt ba chỉ): Luộc thịt ba chỉ với hành tím và chút muối trong 20 phút cho chín mềm, ngâm nước đá rồi thái lát mỏng. Tôm sú hấp cùng chút sả cho đỏ đẹp, bóc vỏ và chẻ đôi dọc sống lưng.\nBước 2 (Cuốn gỏi cuốn chắc tay): Thấm ướt nhẹ bánh tráng, xếp xà lách, rau thơm, dưa leo và bún tươi vào góc dưới, cuộn 1 vòng rồi xếp thịt ba chỉ, cọng hẹ và mặt đỏ của tôm úp xuống, gấp hai đầu cuốn chặt tay.\nBước 3 (Nấu sốt tương đen bơ đậu phộng): Phi thơm tỏi băm, cho 3 muỗng tương đen, 1 muỗng bơ đậu phộng và 100ml nước luộc thịt vào khuấy đều trên lửa nhỏ đến khi sốt sánh mịn.\nBước 4 (Bày đĩa và thưởng thức): Cắt đôi hoặc để nguyên các cuốn gỏi xếp ra đĩa, múc tương đen ra chén, rắc đậu phộng rang, đồ chua và ớt xay lên trên.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000036000001",
        "name": "Tôm sú tươi & thịt ba chỉ heo",
        "quantity": 500,
        "unit": "g",
        "notes": "Luộc chín, tôm chẻ đôi, thịt thái lát mỏng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000036000002",
        "name": "Bánh tráng dẻo cuốn gỏi & bún tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Thấm nhẹ nước ấm trước khi cuốn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000036000003",
        "name": "Xà lách, húng lủi, tía tô, lá hẹ, dưa leo",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch để thật ráo nước",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000036000004",
        "name": "Tương đen (Hoisin), bơ đậu phộng, tỏi phi",
        "quantity": 100,
        "unit": "g",
        "notes": "Nấu sốt tương chấm gỏi cuốn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000036000005",
        "name": "Đậu phộng rang giã dập & đồ chua",
        "quantity": 50,
        "unit": "g",
        "notes": "Rắc lên mặt chén sốt tương",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000036000001",
        "stepNumber": 1,
        "title": "Luộc tôm sú và thịt ba chỉ",
        "description": "Luộc thịt ba chỉ với hành tím và chút muối trong 20 phút cho chín mềm, ngâm nước đá rồi thái lát mỏng. Tôm sú hấp cùng chút sả cho đỏ đẹp, bóc vỏ và chẻ đôi dọc sống lưng.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000036000002",
        "stepNumber": 2,
        "title": "Cuốn gỏi cuốn chắc tay",
        "description": "Thấm ướt nhẹ bánh tráng, xếp xà lách, rau thơm, dưa leo và bún tươi vào góc dưới, cuộn 1 vòng rồi xếp thịt ba chỉ, cọng hẹ và mặt đỏ của tôm úp xuống, gấp hai đầu cuốn chặt tay.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000036000003",
        "stepNumber": 3,
        "title": "Nấu sốt tương đen bơ đậu phộng",
        "description": "Phi thơm tỏi băm, cho 3 muỗng tương đen, 1 muỗng bơ đậu phộng và 100ml nước luộc thịt vào khuấy đều trên lửa nhỏ đến khi sốt sánh mịn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000036000004",
        "stepNumber": 4,
        "title": "Bày đĩa và thưởng thức",
        "description": "Cắt đôi hoặc để nguyên các cuốn gỏi xếp ra đĩa, múc tương đen ra chén, rắc đậu phộng rang, đồ chua và ớt xay lên trên.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000036000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000036000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000036000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000037": {
    "id": "22222222-2222-4222-8222-000000000037",
    "title": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật",
    "slug": "goi-ngo-sen-tom-thit",
    "description": "Món khai vị tiệc cưới quốc dân với cọng ngó sen trắng ngần giòn sần sật, trộn thấm nước mắm cốt chanh chua ngọt cùng tôm sú, tai heo thái mỏng, cà rốt, rau răm và phồng tôm.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-09T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 33,
    "nutrition": {
      "calories": 330,
      "protein": 26,
      "carbohydrates": 28,
      "fat": 12,
      "fiber": 5,
      "sodium": 670
    },
    "instructions": "Bước 1 (Sơ chế ngó sen trắng giòn): Ngó sen rửa sạch bùn, cắt khúc 5cm, chẻ làm đôi hoặc làm tư rồi ngâm ngay vào thau nước đá có pha nước cốt chanh và 1 muỗng đường trong 15 phút để ngó sen trắng muốt và giòn.\nBước 2 (Luộc tôm và tai heo): Tai heo luộc chín cùng gừng và sả, vớt ra ngâm nước đá lạnh cho giòn rồi thái lát thật mỏng. Tôm sú luộc chín, bóc vỏ, chẻ đôi.\nBước 3 (Pha nước sốt trộn gỏi chuẩn vị): Khuấy tan 3 muỗng đường với 3 muỗng nước mắm cốt và 3 muỗng nước cốt chanh, thêm tỏi băm và ớt sừng băm tạo hỗn hợp sốt sánh kẹo.\nBước 4 (Trộn gỏi ngó sen và bày cùng phồng tôm): Vắt ráo ngó sen, cà rốt, hành tây rồi trộn đều với tôm, tai heo và nước sốt gỏi. Thêm rau răm, hành phi, đậu phộng rang lên trên và dùng kèm bánh phồng tôm chiên giòn.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000037000001",
        "name": "Ngó sen tươi non",
        "quantity": 400,
        "unit": "g",
        "notes": "Cắt khúc, chẻ đôi ngâm nước đá chanh cho trắng giòn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000037000002",
        "name": "Tôm sú tươi & tai heo (hoặc thịt ba chỉ)",
        "quantity": 350,
        "unit": "g",
        "notes": "Luộc chín, ngâm đá rồi thái mỏng",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000037000003",
        "name": "Cà rốt, hành tây, cần tàu, rau răm",
        "quantity": 200,
        "unit": "g",
        "notes": "Thái sợi mỏng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000037000004",
        "name": "Nước mắm cốt, nước cốt chanh, đường, tỏi ớt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Pha sốt trộn gỏi chua cay mặn ngọt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000037000005",
        "name": "Đậu phộng rang, hành phi, bánh phồng tôm",
        "quantity": 120,
        "unit": "g",
        "notes": "Ăn kèm gỏi ngó sen",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000037000001",
        "stepNumber": 1,
        "title": "Sơ chế ngó sen trắng giòn",
        "description": "Ngó sen rửa sạch bùn, cắt khúc 5cm, chẻ làm đôi hoặc làm tư rồi ngâm ngay vào thau nước đá có pha nước cốt chanh và 1 muỗng đường trong 15 phút để ngó sen trắng muốt và giòn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000037000002",
        "stepNumber": 2,
        "title": "Luộc tôm và tai heo",
        "description": "Tai heo luộc chín cùng gừng và sả, vớt ra ngâm nước đá lạnh cho giòn rồi thái lát thật mỏng. Tôm sú luộc chín, bóc vỏ, chẻ đôi.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000037000003",
        "stepNumber": 3,
        "title": "Pha nước sốt trộn gỏi chuẩn vị",
        "description": "Khuấy tan 3 muỗng đường với 3 muỗng nước mắm cốt và 3 muỗng nước cốt chanh, thêm tỏi băm và ớt sừng băm tạo hỗn hợp sốt sánh kẹo.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000037000004",
        "stepNumber": 4,
        "title": "Trộn gỏi ngó sen và bày cùng phồng tôm",
        "description": "Vắt ráo ngó sen, cà rốt, hành tây rồi trộn đều với tôm, tai heo và nước sốt gỏi. Thêm rau răm, hành phi, đậu phộng rang lên trên và dùng kèm bánh phồng tôm chiên giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000037000001",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "altText": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000037000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000037000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "goi-ngo-sen-tom-thit": {
    "id": "22222222-2222-4222-8222-000000000037",
    "title": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật",
    "slug": "goi-ngo-sen-tom-thit",
    "description": "Món khai vị tiệc cưới quốc dân với cọng ngó sen trắng ngần giòn sần sật, trộn thấm nước mắm cốt chanh chua ngọt cùng tôm sú, tai heo thái mỏng, cà rốt, rau răm và phồng tôm.",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-09T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 33,
    "nutrition": {
      "calories": 330,
      "protein": 26,
      "carbohydrates": 28,
      "fat": 12,
      "fiber": 5,
      "sodium": 670
    },
    "instructions": "Bước 1 (Sơ chế ngó sen trắng giòn): Ngó sen rửa sạch bùn, cắt khúc 5cm, chẻ làm đôi hoặc làm tư rồi ngâm ngay vào thau nước đá có pha nước cốt chanh và 1 muỗng đường trong 15 phút để ngó sen trắng muốt và giòn.\nBước 2 (Luộc tôm và tai heo): Tai heo luộc chín cùng gừng và sả, vớt ra ngâm nước đá lạnh cho giòn rồi thái lát thật mỏng. Tôm sú luộc chín, bóc vỏ, chẻ đôi.\nBước 3 (Pha nước sốt trộn gỏi chuẩn vị): Khuấy tan 3 muỗng đường với 3 muỗng nước mắm cốt và 3 muỗng nước cốt chanh, thêm tỏi băm và ớt sừng băm tạo hỗn hợp sốt sánh kẹo.\nBước 4 (Trộn gỏi ngó sen và bày cùng phồng tôm): Vắt ráo ngó sen, cà rốt, hành tây rồi trộn đều với tôm, tai heo và nước sốt gỏi. Thêm rau răm, hành phi, đậu phộng rang lên trên và dùng kèm bánh phồng tôm chiên giòn.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000037000001",
        "name": "Ngó sen tươi non",
        "quantity": 400,
        "unit": "g",
        "notes": "Cắt khúc, chẻ đôi ngâm nước đá chanh cho trắng giòn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000037000002",
        "name": "Tôm sú tươi & tai heo (hoặc thịt ba chỉ)",
        "quantity": 350,
        "unit": "g",
        "notes": "Luộc chín, ngâm đá rồi thái mỏng",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000037000003",
        "name": "Cà rốt, hành tây, cần tàu, rau răm",
        "quantity": 200,
        "unit": "g",
        "notes": "Thái sợi mỏng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000037000004",
        "name": "Nước mắm cốt, nước cốt chanh, đường, tỏi ớt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Pha sốt trộn gỏi chua cay mặn ngọt",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000037000005",
        "name": "Đậu phộng rang, hành phi, bánh phồng tôm",
        "quantity": 120,
        "unit": "g",
        "notes": "Ăn kèm gỏi ngó sen",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000037000001",
        "stepNumber": 1,
        "title": "Sơ chế ngó sen trắng giòn",
        "description": "Ngó sen rửa sạch bùn, cắt khúc 5cm, chẻ làm đôi hoặc làm tư rồi ngâm ngay vào thau nước đá có pha nước cốt chanh và 1 muỗng đường trong 15 phút để ngó sen trắng muốt và giòn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000037000002",
        "stepNumber": 2,
        "title": "Luộc tôm và tai heo",
        "description": "Tai heo luộc chín cùng gừng và sả, vớt ra ngâm nước đá lạnh cho giòn rồi thái lát thật mỏng. Tôm sú luộc chín, bóc vỏ, chẻ đôi.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000037000003",
        "stepNumber": 3,
        "title": "Pha nước sốt trộn gỏi chuẩn vị",
        "description": "Khuấy tan 3 muỗng đường với 3 muỗng nước mắm cốt và 3 muỗng nước cốt chanh, thêm tỏi băm và ớt sừng băm tạo hỗn hợp sốt sánh kẹo.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000037000004",
        "stepNumber": 4,
        "title": "Trộn gỏi ngó sen và bày cùng phồng tôm",
        "description": "Vắt ráo ngó sen, cà rốt, hành tây rồi trộn đều với tôm, tai heo và nước sốt gỏi. Thêm rau răm, hành phi, đậu phộng rang lên trên và dùng kèm bánh phồng tôm chiên giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000037000001",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
        "altText": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000037000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000037000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000038": {
    "id": "22222222-2222-4222-8222-000000000038",
    "title": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới",
    "slug": "nom-bo-kho-du-du-xanh",
    "description": "Món ăn vặt trứ danh phố cổ với sợi đu đủ xanh và cà rốt bào giòn sần sật, thịt bò khô xé sợi cay ngọt, lạc rang bùi béo và nước nộm chua thanh thơm nức rau kinh giới.",
    "prepTime": 20,
    "cookTime": 5,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-10T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 36,
    "nutrition": {
      "calories": 290,
      "protein": 18,
      "carbohydrates": 32,
      "fat": 10,
      "fiber": 5,
      "sodium": 640
    },
    "instructions": "Bước 1 (Bào sợi đu đủ xanh và ngâm đá): Đu đủ xanh gọt vỏ, bỏ hạt, bào sợi dài cùng cà rốt. Ngâm vào thau nước đá lạnh có vài hạt muối trong 15 phút rồi vớt ra vắt thật khô ráo để sợi đu đủ giòn tan.\nBước 2 (Pha nước trộn nộm phố cổ): Hòa tan 3 muỗng đường, 2 muỗng nước mắm, 3 muỗng giấm gạo, 4 muỗng nước đun sôi để nguội cùng tỏi băm và ớt tươi thái lát.\nBước 3 (Trộn đu đủ với rau thơm): Cho đu đủ, cà rốt vào âu lớn, rưới một nửa nước nộm vào đảo đều 3 phút, sau đó cho rau kinh giới và rau húng thái rối vào trộn nhẹ.\nBước 4 (Bày bò khô và lạc rang thưởng thức): Gắp nộm đu đủ ra đĩa, xếp đầy thịt bò khô xé sợi và lạc rang lên trên, chan thêm nước nộm chua ngọt tùy khẩu vị.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000038000001",
        "name": "Đu đủ xanh & cà rốt",
        "quantity": 500,
        "unit": "g",
        "notes": "Gọt vỏ, bào sợi dài giòn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000038000002",
        "name": "Thịt bò khô sợi hoặc miếng",
        "quantity": 150,
        "unit": "g",
        "notes": "Xé sợi vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000038000003",
        "name": "Đậu phộng (lạc) rang chín",
        "quantity": 80,
        "unit": "g",
        "notes": "Xát vỏ, để nguyên hạt hoặc đập dập nhẹ",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000038000004",
        "name": "Rau kinh giới, húng bạc hà, ngò gai",
        "quantity": 60,
        "unit": "g",
        "notes": "Thái rối tạo hương thơm đặc trưng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000038000005",
        "name": "Giấm gạo, đường, nước mắm, tỏi ớt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Pha nước nộm chua ngọt thanh mát",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000038000001",
        "stepNumber": 1,
        "title": "Bào sợi đu đủ xanh và ngâm đá",
        "description": "Đu đủ xanh gọt vỏ, bỏ hạt, bào sợi dài cùng cà rốt. Ngâm vào thau nước đá lạnh có vài hạt muối trong 15 phút rồi vớt ra vắt thật khô ráo để sợi đu đủ giòn tan.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000038000002",
        "stepNumber": 2,
        "title": "Pha nước trộn nộm phố cổ",
        "description": "Hòa tan 3 muỗng đường, 2 muỗng nước mắm, 3 muỗng giấm gạo, 4 muỗng nước đun sôi để nguội cùng tỏi băm và ớt tươi thái lát.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000038000003",
        "stepNumber": 3,
        "title": "Trộn đu đủ với rau thơm",
        "description": "Cho đu đủ, cà rốt vào âu lớn, rưới một nửa nước nộm vào đảo đều 3 phút, sau đó cho rau kinh giới và rau húng thái rối vào trộn nhẹ.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000038000004",
        "stepNumber": 4,
        "title": "Bày bò khô và lạc rang thưởng thức",
        "description": "Gắp nộm đu đủ ra đĩa, xếp đầy thịt bò khô xé sợi và lạc rang lên trên, chan thêm nước nộm chua ngọt tùy khẩu vị.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000038000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000038000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000038000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "nom-bo-kho-du-du-xanh": {
    "id": "22222222-2222-4222-8222-000000000038",
    "title": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới",
    "slug": "nom-bo-kho-du-du-xanh",
    "description": "Món ăn vặt trứ danh phố cổ với sợi đu đủ xanh và cà rốt bào giòn sần sật, thịt bò khô xé sợi cay ngọt, lạc rang bùi béo và nước nộm chua thanh thơm nức rau kinh giới.",
    "prepTime": 20,
    "cookTime": 5,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-10T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 36,
    "nutrition": {
      "calories": 290,
      "protein": 18,
      "carbohydrates": 32,
      "fat": 10,
      "fiber": 5,
      "sodium": 640
    },
    "instructions": "Bước 1 (Bào sợi đu đủ xanh và ngâm đá): Đu đủ xanh gọt vỏ, bỏ hạt, bào sợi dài cùng cà rốt. Ngâm vào thau nước đá lạnh có vài hạt muối trong 15 phút rồi vớt ra vắt thật khô ráo để sợi đu đủ giòn tan.\nBước 2 (Pha nước trộn nộm phố cổ): Hòa tan 3 muỗng đường, 2 muỗng nước mắm, 3 muỗng giấm gạo, 4 muỗng nước đun sôi để nguội cùng tỏi băm và ớt tươi thái lát.\nBước 3 (Trộn đu đủ với rau thơm): Cho đu đủ, cà rốt vào âu lớn, rưới một nửa nước nộm vào đảo đều 3 phút, sau đó cho rau kinh giới và rau húng thái rối vào trộn nhẹ.\nBước 4 (Bày bò khô và lạc rang thưởng thức): Gắp nộm đu đủ ra đĩa, xếp đầy thịt bò khô xé sợi và lạc rang lên trên, chan thêm nước nộm chua ngọt tùy khẩu vị.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000038000001",
        "name": "Đu đủ xanh & cà rốt",
        "quantity": 500,
        "unit": "g",
        "notes": "Gọt vỏ, bào sợi dài giòn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000038000002",
        "name": "Thịt bò khô sợi hoặc miếng",
        "quantity": 150,
        "unit": "g",
        "notes": "Xé sợi vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000038000003",
        "name": "Đậu phộng (lạc) rang chín",
        "quantity": 80,
        "unit": "g",
        "notes": "Xát vỏ, để nguyên hạt hoặc đập dập nhẹ",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000038000004",
        "name": "Rau kinh giới, húng bạc hà, ngò gai",
        "quantity": 60,
        "unit": "g",
        "notes": "Thái rối tạo hương thơm đặc trưng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000038000005",
        "name": "Giấm gạo, đường, nước mắm, tỏi ớt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Pha nước nộm chua ngọt thanh mát",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000038000001",
        "stepNumber": 1,
        "title": "Bào sợi đu đủ xanh và ngâm đá",
        "description": "Đu đủ xanh gọt vỏ, bỏ hạt, bào sợi dài cùng cà rốt. Ngâm vào thau nước đá lạnh có vài hạt muối trong 15 phút rồi vớt ra vắt thật khô ráo để sợi đu đủ giòn tan.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000038000002",
        "stepNumber": 2,
        "title": "Pha nước trộn nộm phố cổ",
        "description": "Hòa tan 3 muỗng đường, 2 muỗng nước mắm, 3 muỗng giấm gạo, 4 muỗng nước đun sôi để nguội cùng tỏi băm và ớt tươi thái lát.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000038000003",
        "stepNumber": 3,
        "title": "Trộn đu đủ với rau thơm",
        "description": "Cho đu đủ, cà rốt vào âu lớn, rưới một nửa nước nộm vào đảo đều 3 phút, sau đó cho rau kinh giới và rau húng thái rối vào trộn nhẹ.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000038000004",
        "stepNumber": 4,
        "title": "Bày bò khô và lạc rang thưởng thức",
        "description": "Gắp nộm đu đủ ra đĩa, xếp đầy thịt bò khô xé sợi và lạc rang lên trên, chan thêm nước nộm chua ngọt tùy khẩu vị.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000038000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000038000002",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000038000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000039": {
    "id": "22222222-2222-4222-8222-000000000039",
    "title": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành",
    "slug": "pho-cuon-thit-bo-ha-thanh",
    "description": "Đặc sản hồ Trúc Bạch với lá bánh phở vuông trắng mềm ôm trọn phần thịt bò xào tỏi nóng hổi, trứng chiên, cà rốt, dưa leo và các loại rau thơm chấm nước mắm đu đủ xanh.",
    "prepTime": 20,
    "cookTime": 10,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-11T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 39,
    "nutrition": {
      "calories": 380,
      "protein": 27,
      "carbohydrates": 44,
      "fat": 11,
      "fiber": 3,
      "sodium": 630
    },
    "instructions": "Bước 1 (Ướp và xào thịt bò lửa lớn): Ướp thịt bò với tỏi băm, dầu hào, hạt nêm và chút dầu ăn 10 phút. Đun chảo thật nóng, phi thơm tỏi rồi xào thịt bò trên lửa lớn trong 2 phút cho thịt chín mềm không ra nước.\nBước 2 (Chuẩn bị rau củ và trứng thái sợi): Tráng mỏng 2 quả trứng gà rồi thái sợi dài. Dưa leo và cà rốt thái thanh dài bằng chiều rộng lá phở.\nBước 3 (Cuốn bánh phở mềm dẻo): Trải lá bánh phở lên đĩa phẳng, đặt lá xà lách, rau thơm, dưa leo, cà rốt, trứng sợi và thịt bò xào vào giữa rồi cuộn tròn vừa tay.\nBước 4 (Pha nước chấm chua ngọt và thưởng thức): Pha nước mắm, đường, nước cốt chanh, nước ấm và tỏi ớt băm, xếp phở cuốn ra đĩa và thưởng thức ngay.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000039000001",
        "name": "Bánh phở cuốn bản vuông",
        "quantity": 500,
        "unit": "g",
        "notes": "Gỡ từng lá bánh phở mềm dẻo",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000039000002",
        "name": "Thịt thăn bò thái mỏng",
        "quantity": 350,
        "unit": "g",
        "notes": "Ướp tỏi băm, dầu hào và tiêu",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000039000003",
        "name": "Trứng gà, dưa leo, cà rốt",
        "quantity": 200,
        "unit": "g",
        "notes": "Trứng tráng mỏng thái sợi, dưa leo cà rốt thái thanh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000039000004",
        "name": "Xà lách, ngò rí, húng lủi, kinh giới",
        "quantity": 150,
        "unit": "g",
        "notes": "Rửa sạch vẩy ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000039000005",
        "name": "Nước mắm, giấm, đường, tỏi ớt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Pha nước chấm phở cuốn",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000039000001",
        "stepNumber": 1,
        "title": "Ướp và xào thịt bò lửa lớn",
        "description": "Ướp thịt bò với tỏi băm, dầu hào, hạt nêm và chút dầu ăn 10 phút. Đun chảo thật nóng, phi thơm tỏi rồi xào thịt bò trên lửa lớn trong 2 phút cho thịt chín mềm không ra nước.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000039000002",
        "stepNumber": 2,
        "title": "Chuẩn bị rau củ và trứng thái sợi",
        "description": "Tráng mỏng 2 quả trứng gà rồi thái sợi dài. Dưa leo và cà rốt thái thanh dài bằng chiều rộng lá phở.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000039000003",
        "stepNumber": 3,
        "title": "Cuốn bánh phở mềm dẻo",
        "description": "Trải lá bánh phở lên đĩa phẳng, đặt lá xà lách, rau thơm, dưa leo, cà rốt, trứng sợi và thịt bò xào vào giữa rồi cuộn tròn vừa tay.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000039000004",
        "stepNumber": 4,
        "title": "Pha nước chấm chua ngọt và thưởng thức",
        "description": "Pha nước mắm, đường, nước cốt chanh, nước ấm và tỏi ớt băm, xếp phở cuốn ra đĩa và thưởng thức ngay.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000039000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000039000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000039000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "pho-cuon-thit-bo-ha-thanh": {
    "id": "22222222-2222-4222-8222-000000000039",
    "title": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành",
    "slug": "pho-cuon-thit-bo-ha-thanh",
    "description": "Đặc sản hồ Trúc Bạch với lá bánh phở vuông trắng mềm ôm trọn phần thịt bò xào tỏi nóng hổi, trứng chiên, cà rốt, dưa leo và các loại rau thơm chấm nước mắm đu đủ xanh.",
    "prepTime": 20,
    "cookTime": 10,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000008",
    "categoryName": "Món Gỏi, Nộm & Cuốn",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-11T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 39,
    "nutrition": {
      "calories": 380,
      "protein": 27,
      "carbohydrates": 44,
      "fat": 11,
      "fiber": 3,
      "sodium": 630
    },
    "instructions": "Bước 1 (Ướp và xào thịt bò lửa lớn): Ướp thịt bò với tỏi băm, dầu hào, hạt nêm và chút dầu ăn 10 phút. Đun chảo thật nóng, phi thơm tỏi rồi xào thịt bò trên lửa lớn trong 2 phút cho thịt chín mềm không ra nước.\nBước 2 (Chuẩn bị rau củ và trứng thái sợi): Tráng mỏng 2 quả trứng gà rồi thái sợi dài. Dưa leo và cà rốt thái thanh dài bằng chiều rộng lá phở.\nBước 3 (Cuốn bánh phở mềm dẻo): Trải lá bánh phở lên đĩa phẳng, đặt lá xà lách, rau thơm, dưa leo, cà rốt, trứng sợi và thịt bò xào vào giữa rồi cuộn tròn vừa tay.\nBước 4 (Pha nước chấm chua ngọt và thưởng thức): Pha nước mắm, đường, nước cốt chanh, nước ấm và tỏi ớt băm, xếp phở cuốn ra đĩa và thưởng thức ngay.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000008",
      "name": "Món Gỏi, Nộm & Cuốn",
      "slug": "mon-goi-nom-cuon",
      "description": "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.",
      "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 8,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000039000001",
        "name": "Bánh phở cuốn bản vuông",
        "quantity": 500,
        "unit": "g",
        "notes": "Gỡ từng lá bánh phở mềm dẻo",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000039000002",
        "name": "Thịt thăn bò thái mỏng",
        "quantity": 350,
        "unit": "g",
        "notes": "Ướp tỏi băm, dầu hào và tiêu",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000039000003",
        "name": "Trứng gà, dưa leo, cà rốt",
        "quantity": 200,
        "unit": "g",
        "notes": "Trứng tráng mỏng thái sợi, dưa leo cà rốt thái thanh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000039000004",
        "name": "Xà lách, ngò rí, húng lủi, kinh giới",
        "quantity": 150,
        "unit": "g",
        "notes": "Rửa sạch vẩy ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000039000005",
        "name": "Nước mắm, giấm, đường, tỏi ớt",
        "quantity": 80,
        "unit": "ml",
        "notes": "Pha nước chấm phở cuốn",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000039000001",
        "stepNumber": 1,
        "title": "Ướp và xào thịt bò lửa lớn",
        "description": "Ướp thịt bò với tỏi băm, dầu hào, hạt nêm và chút dầu ăn 10 phút. Đun chảo thật nóng, phi thơm tỏi rồi xào thịt bò trên lửa lớn trong 2 phút cho thịt chín mềm không ra nước.",
        "timerMinutes": 12,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000039000002",
        "stepNumber": 2,
        "title": "Chuẩn bị rau củ và trứng thái sợi",
        "description": "Tráng mỏng 2 quả trứng gà rồi thái sợi dài. Dưa leo và cà rốt thái thanh dài bằng chiều rộng lá phở.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000039000003",
        "stepNumber": 3,
        "title": "Cuốn bánh phở mềm dẻo",
        "description": "Trải lá bánh phở lên đĩa phẳng, đặt lá xà lách, rau thơm, dưa leo, cà rốt, trứng sợi và thịt bò xào vào giữa rồi cuộn tròn vừa tay.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000039000004",
        "stepNumber": 4,
        "title": "Pha nước chấm chua ngọt và thưởng thức",
        "description": "Pha nước mắm, đường, nước cốt chanh, nước ấm và tỏi ớt băm, xếp phở cuốn ra đĩa và thưởng thức ngay.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000039000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000039000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000039000003",
        "originalUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        "altText": "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000040": {
    "id": "22222222-2222-4222-8222-000000000040",
    "title": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa",
    "slug": "lau-thai-hai-san-chua-cay",
    "description": "Nồi lẩu Thái Tomyum chua cay nồng nàn hương sả, riềng, lá chanh Kaffir và vị béo nhẹ của nước cốt dừa, nhúng kèm tôm sú, mực tươi, nghêu, thịt bò Mỹ và nấm kim châm.",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 6,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-12T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 13,
    "nutrition": {
      "calories": 510,
      "protein": 40,
      "carbohydrates": 45,
      "fat": 18,
      "fiber": 5,
      "sodium": 890
    },
    "instructions": "Bước 1 (Sơ chế hải sản và rau nấm): Tôm cắt râu, mực cắt khoanh tròn, nghêu ngâm nhả sạch cát. Các loại nấm cắt gốc rửa sạch, rau muống và cải thảo cắt khúc vừa ăn.\nBước 2 (Phi thơm sả riềng lá chanh): Phi thơm sả đập dập, riềng thái lát, hành tím và cà chua bổ múi cau với 2 muỗng dầu điều, thêm 3 muỗng sốt Tomyum xào dậy mùi.\nBước 3 (Nấu nước dùng lẩu Thái chua cay): Chế 2 lít nước hầm xương vào nồi đun sôi, thả lá chanh vò nhẹ, ớt hiểm, nước cốt me/chanh, đường phèn và 100ml nước cốt dừa vào để nước lẩu có độ béo dịu.\nBước 4 (Bày bàn lẩu và nhúng hải sản): Đặt nồi lẩu lên bếp từ tại bàn, lần lượt nhúng tôm, mực, nghêu, bò Mỹ và nấm rau, ăn kèm bún tươi và muối ớt hải sản.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000040000001",
        "name": "Tôm sú, mực ống, nghêu sạch",
        "quantity": 800,
        "unit": "g",
        "notes": "Sơ chế sạch, bày ra đĩa đá",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000040000002",
        "name": "Thịt ba chỉ bò Mỹ thái cuộn",
        "quantity": 400,
        "unit": "g",
        "notes": "Nhúng tái trong nước lẩu sôi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000040000003",
        "name": "Sả cây, củ riềng, lá chanh, ớt hiểm",
        "quantity": 120,
        "unit": "g",
        "notes": "Đập dập tạo hương thơm Tomyum đặc trưng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000040000004",
        "name": "Sốt Tomyum Thái & nước cốt dừa",
        "quantity": 150,
        "unit": "ml",
        "notes": "Tạo vị chua cay béo hài hòa",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000040000005",
        "name": "Nấm kim châm, nấm đùi gà, rau muống, bắp thảo, bún",
        "quantity": 600,
        "unit": "g",
        "notes": "Nhúng lẩu ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000040000001",
        "stepNumber": 1,
        "title": "Sơ chế hải sản và rau nấm",
        "description": "Tôm cắt râu, mực cắt khoanh tròn, nghêu ngâm nhả sạch cát. Các loại nấm cắt gốc rửa sạch, rau muống và cải thảo cắt khúc vừa ăn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000040000002",
        "stepNumber": 2,
        "title": "Phi thơm sả riềng lá chanh",
        "description": "Phi thơm sả đập dập, riềng thái lát, hành tím và cà chua bổ múi cau với 2 muỗng dầu điều, thêm 3 muỗng sốt Tomyum xào dậy mùi.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000040000003",
        "stepNumber": 3,
        "title": "Nấu nước dùng lẩu Thái chua cay",
        "description": "Chế 2 lít nước hầm xương vào nồi đun sôi, thả lá chanh vò nhẹ, ớt hiểm, nước cốt me/chanh, đường phèn và 100ml nước cốt dừa vào để nước lẩu có độ béo dịu.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000040000004",
        "stepNumber": 4,
        "title": "Bày bàn lẩu và nhúng hải sản",
        "description": "Đặt nồi lẩu lên bếp từ tại bàn, lần lượt nhúng tôm, mực, nghêu, bò Mỹ và nấm rau, ăn kèm bún tươi và muối ớt hải sản.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000040000001",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "altText": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000040000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000040000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "lau-thai-hai-san-chua-cay": {
    "id": "22222222-2222-4222-8222-000000000040",
    "title": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa",
    "slug": "lau-thai-hai-san-chua-cay",
    "description": "Nồi lẩu Thái Tomyum chua cay nồng nàn hương sả, riềng, lá chanh Kaffir và vị béo nhẹ của nước cốt dừa, nhúng kèm tôm sú, mực tươi, nghêu, thịt bò Mỹ và nấm kim châm.",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 6,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-hieu-id",
    "authorName": "Chef Bùi Trung Hiếu",
    "coverImageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-12T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 13,
    "nutrition": {
      "calories": 510,
      "protein": 40,
      "carbohydrates": 45,
      "fat": 18,
      "fiber": 5,
      "sodium": 890
    },
    "instructions": "Bước 1 (Sơ chế hải sản và rau nấm): Tôm cắt râu, mực cắt khoanh tròn, nghêu ngâm nhả sạch cát. Các loại nấm cắt gốc rửa sạch, rau muống và cải thảo cắt khúc vừa ăn.\nBước 2 (Phi thơm sả riềng lá chanh): Phi thơm sả đập dập, riềng thái lát, hành tím và cà chua bổ múi cau với 2 muỗng dầu điều, thêm 3 muỗng sốt Tomyum xào dậy mùi.\nBước 3 (Nấu nước dùng lẩu Thái chua cay): Chế 2 lít nước hầm xương vào nồi đun sôi, thả lá chanh vò nhẹ, ớt hiểm, nước cốt me/chanh, đường phèn và 100ml nước cốt dừa vào để nước lẩu có độ béo dịu.\nBước 4 (Bày bàn lẩu và nhúng hải sản): Đặt nồi lẩu lên bếp từ tại bàn, lần lượt nhúng tôm, mực, nghêu, bò Mỹ và nấm rau, ăn kèm bún tươi và muối ớt hải sản.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000040000001",
        "name": "Tôm sú, mực ống, nghêu sạch",
        "quantity": 800,
        "unit": "g",
        "notes": "Sơ chế sạch, bày ra đĩa đá",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000040000002",
        "name": "Thịt ba chỉ bò Mỹ thái cuộn",
        "quantity": 400,
        "unit": "g",
        "notes": "Nhúng tái trong nước lẩu sôi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000040000003",
        "name": "Sả cây, củ riềng, lá chanh, ớt hiểm",
        "quantity": 120,
        "unit": "g",
        "notes": "Đập dập tạo hương thơm Tomyum đặc trưng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000040000004",
        "name": "Sốt Tomyum Thái & nước cốt dừa",
        "quantity": 150,
        "unit": "ml",
        "notes": "Tạo vị chua cay béo hài hòa",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000040000005",
        "name": "Nấm kim châm, nấm đùi gà, rau muống, bắp thảo, bún",
        "quantity": 600,
        "unit": "g",
        "notes": "Nhúng lẩu ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000040000001",
        "stepNumber": 1,
        "title": "Sơ chế hải sản và rau nấm",
        "description": "Tôm cắt râu, mực cắt khoanh tròn, nghêu ngâm nhả sạch cát. Các loại nấm cắt gốc rửa sạch, rau muống và cải thảo cắt khúc vừa ăn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000040000002",
        "stepNumber": 2,
        "title": "Phi thơm sả riềng lá chanh",
        "description": "Phi thơm sả đập dập, riềng thái lát, hành tím và cà chua bổ múi cau với 2 muỗng dầu điều, thêm 3 muỗng sốt Tomyum xào dậy mùi.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000040000003",
        "stepNumber": 3,
        "title": "Nấu nước dùng lẩu Thái chua cay",
        "description": "Chế 2 lít nước hầm xương vào nồi đun sôi, thả lá chanh vò nhẹ, ớt hiểm, nước cốt me/chanh, đường phèn và 100ml nước cốt dừa vào để nước lẩu có độ béo dịu.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000040000004",
        "stepNumber": 4,
        "title": "Bày bàn lẩu và nhúng hải sản",
        "description": "Đặt nồi lẩu lên bếp từ tại bàn, lần lượt nhúng tôm, mực, nghêu, bò Mỹ và nấm rau, ăn kèm bún tươi và muối ớt hải sản.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000040000001",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
        "altText": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000040000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000040000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000041": {
    "id": "22222222-2222-4222-8222-000000000041",
    "title": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt",
    "slug": "lau-ga-la-e-phu-yen",
    "description": "Đặc sản trứ danh Phú Yên - Đà Lạt với thịt gà ta chặt miếng nấu cùng măng củ tươi giòn ngọt, ớt xiêm xanh cay the và lá é thơm mát hương sả chanh độc đáo.",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-13T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 16,
    "nutrition": {
      "calories": 470,
      "protein": 39,
      "carbohydrates": 36,
      "fat": 18,
      "fiber": 4,
      "sodium": 780
    },
    "instructions": "Bước 1 (Ướp thịt gà với lá é và ớt xiêm xanh): Giã dập một nắm nhỏ gốc lá é với tỏi, hành tím và 5 quả ớt xiêm xanh, đem ướp với thịt gà cùng nước mắm, hạt nêm trong 20 phút.\nBước 2 (Xào săn gà và măng tươi): Phi thơm sả cây đập dập, cho thịt gà vào xào săn, tiếp tục cho măng tươi đã luộc sơ vào đảo 5 phút cho thấm gia vị.\nBước 3 (Nấu nước lẩu ngọt thanh): Chế 1.8 lít nước dừa tươi pha nước lọc vào nồi đun sôi 20 phút cho gà chín mềm, thả nấm bào ngư vào và nêm lại cho vừa miệng.\nBước 4 (Nhúng lá é tươi và chấm muối ớt xiêm): Khi ăn mới nhúng lá é tươi vào nồi lẩu đang sôi khoảng 15 giây cho lá chín tái thơm lừng. Dùng kèm bún tươi và muối ớt xiêm xanh vắt chanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000041000001",
        "name": "Gà ta thả vườn làm sạch",
        "quantity": 1200,
        "unit": "g",
        "notes": "Chặt miếng vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000041000002",
        "name": "Lá é trắng tươi",
        "quantity": 300,
        "unit": "g",
        "notes": "Nhặt lấy ngọn và lá non, giã 1 ít ướp gà",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000041000003",
        "name": "Măng củ tươi hoặc măng búp",
        "quantity": 300,
        "unit": "g",
        "notes": "Thái khối, luộc sơ khử độc",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000041000004",
        "name": "Nấm bào ngư trắng & سả cây",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000041000005",
        "name": "Ớt xiêm xanh Phú Yên & bún tươi",
        "quantity": 500,
        "unit": "g",
        "notes": "Giã dập ớt xiêm tạo vị cay the thanh",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000041000001",
        "stepNumber": 1,
        "title": "Ướp thịt gà với lá é và ớt xiêm xanh",
        "description": "Giã dập một nắm nhỏ gốc lá é với tỏi, hành tím và 5 quả ớt xiêm xanh, đem ướp với thịt gà cùng nước mắm, hạt nêm trong 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000041000002",
        "stepNumber": 2,
        "title": "Xào săn gà và măng tươi",
        "description": "Phi thơm sả cây đập dập, cho thịt gà vào xào săn, tiếp tục cho măng tươi đã luộc sơ vào đảo 5 phút cho thấm gia vị.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000041000003",
        "stepNumber": 3,
        "title": "Nấu nước lẩu ngọt thanh",
        "description": "Chế 1.8 lít nước dừa tươi pha nước lọc vào nồi đun sôi 20 phút cho gà chín mềm, thả nấm bào ngư vào và nêm lại cho vừa miệng.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000041000004",
        "stepNumber": 4,
        "title": "Nhúng lá é tươi và chấm muối ớt xiêm",
        "description": "Khi ăn mới nhúng lá é tươi vào nồi lẩu đang sôi khoảng 15 giây cho lá chín tái thơm lừng. Dùng kèm bún tươi và muối ớt xiêm xanh vắt chanh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000041000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000041000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000041000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "lau-ga-la-e-phu-yen": {
    "id": "22222222-2222-4222-8222-000000000041",
    "title": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt",
    "slug": "lau-ga-la-e-phu-yen",
    "description": "Đặc sản trứ danh Phú Yên - Đà Lạt với thịt gà ta chặt miếng nấu cùng măng củ tươi giòn ngọt, ớt xiêm xanh cay the và lá é thơm mát hương sả chanh độc đáo.",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-13T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 16,
    "nutrition": {
      "calories": 470,
      "protein": 39,
      "carbohydrates": 36,
      "fat": 18,
      "fiber": 4,
      "sodium": 780
    },
    "instructions": "Bước 1 (Ướp thịt gà với lá é và ớt xiêm xanh): Giã dập một nắm nhỏ gốc lá é với tỏi, hành tím và 5 quả ớt xiêm xanh, đem ướp với thịt gà cùng nước mắm, hạt nêm trong 20 phút.\nBước 2 (Xào săn gà và măng tươi): Phi thơm sả cây đập dập, cho thịt gà vào xào săn, tiếp tục cho măng tươi đã luộc sơ vào đảo 5 phút cho thấm gia vị.\nBước 3 (Nấu nước lẩu ngọt thanh): Chế 1.8 lít nước dừa tươi pha nước lọc vào nồi đun sôi 20 phút cho gà chín mềm, thả nấm bào ngư vào và nêm lại cho vừa miệng.\nBước 4 (Nhúng lá é tươi và chấm muối ớt xiêm): Khi ăn mới nhúng lá é tươi vào nồi lẩu đang sôi khoảng 15 giây cho lá chín tái thơm lừng. Dùng kèm bún tươi và muối ớt xiêm xanh vắt chanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000041000001",
        "name": "Gà ta thả vườn làm sạch",
        "quantity": 1200,
        "unit": "g",
        "notes": "Chặt miếng vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000041000002",
        "name": "Lá é trắng tươi",
        "quantity": 300,
        "unit": "g",
        "notes": "Nhặt lấy ngọn và lá non, giã 1 ít ướp gà",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000041000003",
        "name": "Măng củ tươi hoặc măng búp",
        "quantity": 300,
        "unit": "g",
        "notes": "Thái khối, luộc sơ khử độc",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000041000004",
        "name": "Nấm bào ngư trắng & سả cây",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000041000005",
        "name": "Ớt xiêm xanh Phú Yên & bún tươi",
        "quantity": 500,
        "unit": "g",
        "notes": "Giã dập ớt xiêm tạo vị cay the thanh",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000041000001",
        "stepNumber": 1,
        "title": "Ướp thịt gà với lá é và ớt xiêm xanh",
        "description": "Giã dập một nắm nhỏ gốc lá é với tỏi, hành tím và 5 quả ớt xiêm xanh, đem ướp với thịt gà cùng nước mắm, hạt nêm trong 20 phút.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000041000002",
        "stepNumber": 2,
        "title": "Xào săn gà và măng tươi",
        "description": "Phi thơm sả cây đập dập, cho thịt gà vào xào săn, tiếp tục cho măng tươi đã luộc sơ vào đảo 5 phút cho thấm gia vị.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000041000003",
        "stepNumber": 3,
        "title": "Nấu nước lẩu ngọt thanh",
        "description": "Chế 1.8 lít nước dừa tươi pha nước lọc vào nồi đun sôi 20 phút cho gà chín mềm, thả nấm bào ngư vào và nêm lại cho vừa miệng.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000041000004",
        "stepNumber": 4,
        "title": "Nhúng lá é tươi và chấm muối ớt xiêm",
        "description": "Khi ăn mới nhúng lá é tươi vào nồi lẩu đang sôi khoảng 15 giây cho lá chín tái thơm lừng. Dùng kèm bún tươi và muối ớt xiêm xanh vắt chanh.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000041000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000041000002",
        "originalUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000041000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000042": {
    "id": "22222222-2222-4222-8222-000000000042",
    "title": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi",
    "slug": "ca-dieu-hong-hap-hong-kong",
    "description": "Cá diêu hồng tươi nguyên con được hấp cách thủy giữ trọn thớ thịt trắng ngần ngọt lịm, phủ đầy gừng tươi, hành lá, ớt thái chỉ và rưới sốt xì dầu Hồng Kông nóng hổi.",
    "prepTime": 20,
    "cookTime": 20,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-14T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 19,
    "nutrition": {
      "calories": 360,
      "protein": 38,
      "carbohydrates": 12,
      "fat": 16,
      "fiber": 2,
      "sodium": 750
    },
    "instructions": "Bước 1 (Sơ chế khử tanh cá diêu hồng): Rửa sạch cá với muối và gừng, cạo sạch lớp màng đen trong bụng. Khứa 3 đường chéo mỗi bên thân cá, nhét vài lát gừng và gốc hành vào bụng cá.\nBước 2 (Hấp cá cách thủy chín tới): Đặt cá lên đĩa sâu lòng cùng nấm đông cô, cho vào xửng nước đang sôi mạnh hấp lửa lớn trong 15 phút để thịt cá chín mềm mọng mà không bị bở.\nBước 3 (Nấu sốt xì dầu Hồng Kông): Đun sôi nhẹ hỗn hợp 4 muỗng nước tương, 2 muỗng dầu hào, 1 muỗng đường, 1 muỗng dầu mè và 60ml nước dùng gà cho tan đều.\nBước 4 (Dội dầu nóng lên hành gừng thái chỉ): Chắt bỏ bớt nước tanh tiết ra trên đĩa cá, phủ gừng sợi, hành lá và ớt thái chỉ lên thân cá. Đun thật sôi 2 muỗng dầu ăn dội trực tiếp lên hành gừng cho xèo thơm rồi rưới sốt xì dầu nóng xung quanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000042000001",
        "name": "Cá diêu hồng tươi sống",
        "quantity": 900,
        "unit": "g",
        "notes": "Đánh vảy, làm sạch màng đen trong bụng, khứa chéo thân",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000042000002",
        "name": "Nước tương (xì dầu), dầu hào, dầu mè, rượu nấu ăn",
        "quantity": 80,
        "unit": "ml",
        "notes": "Nấu sốt hấp kiểu Hồng Kông",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000042000003",
        "name": "Gừng tươi, hành lá, ngò rí, ớt sừng",
        "quantity": 150,
        "unit": "g",
        "notes": "Thái sợi mảnh ngâm nước đá cho cong đẹp",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000042000004",
        "name": "Nấm đông cô tươi",
        "quantity": 100,
        "unit": "g",
        "notes": "Thái lát xếp dọc thân cá",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000042000001",
        "stepNumber": 1,
        "title": "Sơ chế khử tanh cá diêu hồng",
        "description": "Rửa sạch cá với muối và gừng, cạo sạch lớp màng đen trong bụng. Khứa 3 đường chéo mỗi bên thân cá, nhét vài lát gừng và gốc hành vào bụng cá.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000042000002",
        "stepNumber": 2,
        "title": "Hấp cá cách thủy chín tới",
        "description": "Đặt cá lên đĩa sâu lòng cùng nấm đông cô, cho vào xửng nước đang sôi mạnh hấp lửa lớn trong 15 phút để thịt cá chín mềm mọng mà không bị bở.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000042000003",
        "stepNumber": 3,
        "title": "Nấu sốt xì dầu Hồng Kông",
        "description": "Đun sôi nhẹ hỗn hợp 4 muỗng nước tương, 2 muỗng dầu hào, 1 muỗng đường, 1 muỗng dầu mè và 60ml nước dùng gà cho tan đều.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000042000004",
        "stepNumber": 4,
        "title": "Dội dầu nóng lên hành gừng thái chỉ",
        "description": "Chắt bỏ bớt nước tanh tiết ra trên đĩa cá, phủ gừng sợi, hành lá và ớt thái chỉ lên thân cá. Đun thật sôi 2 muỗng dầu ăn dội trực tiếp lên hành gừng cho xèo thơm rồi rưới sốt xì dầu nóng xung quanh.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000042000001",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "altText": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000042000002",
        "originalUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000042000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ca-dieu-hong-hap-hong-kong": {
    "id": "22222222-2222-4222-8222-000000000042",
    "title": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi",
    "slug": "ca-dieu-hong-hap-hong-kong",
    "description": "Cá diêu hồng tươi nguyên con được hấp cách thủy giữ trọn thớ thịt trắng ngần ngọt lịm, phủ đầy gừng tươi, hành lá, ớt thái chỉ và rưới sốt xì dầu Hồng Kông nóng hổi.",
    "prepTime": 20,
    "cookTime": 20,
    "totalTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-14T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 19,
    "nutrition": {
      "calories": 360,
      "protein": 38,
      "carbohydrates": 12,
      "fat": 16,
      "fiber": 2,
      "sodium": 750
    },
    "instructions": "Bước 1 (Sơ chế khử tanh cá diêu hồng): Rửa sạch cá với muối và gừng, cạo sạch lớp màng đen trong bụng. Khứa 3 đường chéo mỗi bên thân cá, nhét vài lát gừng và gốc hành vào bụng cá.\nBước 2 (Hấp cá cách thủy chín tới): Đặt cá lên đĩa sâu lòng cùng nấm đông cô, cho vào xửng nước đang sôi mạnh hấp lửa lớn trong 15 phút để thịt cá chín mềm mọng mà không bị bở.\nBước 3 (Nấu sốt xì dầu Hồng Kông): Đun sôi nhẹ hỗn hợp 4 muỗng nước tương, 2 muỗng dầu hào, 1 muỗng đường, 1 muỗng dầu mè và 60ml nước dùng gà cho tan đều.\nBước 4 (Dội dầu nóng lên hành gừng thái chỉ): Chắt bỏ bớt nước tanh tiết ra trên đĩa cá, phủ gừng sợi, hành lá và ớt thái chỉ lên thân cá. Đun thật sôi 2 muỗng dầu ăn dội trực tiếp lên hành gừng cho xèo thơm rồi rưới sốt xì dầu nóng xung quanh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000042000001",
        "name": "Cá diêu hồng tươi sống",
        "quantity": 900,
        "unit": "g",
        "notes": "Đánh vảy, làm sạch màng đen trong bụng, khứa chéo thân",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000042000002",
        "name": "Nước tương (xì dầu), dầu hào, dầu mè, rượu nấu ăn",
        "quantity": 80,
        "unit": "ml",
        "notes": "Nấu sốt hấp kiểu Hồng Kông",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000042000003",
        "name": "Gừng tươi, hành lá, ngò rí, ớt sừng",
        "quantity": 150,
        "unit": "g",
        "notes": "Thái sợi mảnh ngâm nước đá cho cong đẹp",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000042000004",
        "name": "Nấm đông cô tươi",
        "quantity": 100,
        "unit": "g",
        "notes": "Thái lát xếp dọc thân cá",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000042000001",
        "stepNumber": 1,
        "title": "Sơ chế khử tanh cá diêu hồng",
        "description": "Rửa sạch cá với muối và gừng, cạo sạch lớp màng đen trong bụng. Khứa 3 đường chéo mỗi bên thân cá, nhét vài lát gừng và gốc hành vào bụng cá.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000042000002",
        "stepNumber": 2,
        "title": "Hấp cá cách thủy chín tới",
        "description": "Đặt cá lên đĩa sâu lòng cùng nấm đông cô, cho vào xửng nước đang sôi mạnh hấp lửa lớn trong 15 phút để thịt cá chín mềm mọng mà không bị bở.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000042000003",
        "stepNumber": 3,
        "title": "Nấu sốt xì dầu Hồng Kông",
        "description": "Đun sôi nhẹ hỗn hợp 4 muỗng nước tương, 2 muỗng dầu hào, 1 muỗng đường, 1 muỗng dầu mè và 60ml nước dùng gà cho tan đều.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000042000004",
        "stepNumber": 4,
        "title": "Dội dầu nóng lên hành gừng thái chỉ",
        "description": "Chắt bỏ bớt nước tanh tiết ra trên đĩa cá, phủ gừng sợi, hành lá và ớt thái chỉ lên thân cá. Đun thật sôi 2 muỗng dầu ăn dội trực tiếp lên hành gừng cho xèo thơm rồi rưới sốt xì dầu nóng xung quanh.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000042000001",
        "originalUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
        "altText": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000042000002",
        "originalUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000042000003",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000043": {
    "id": "22222222-2222-4222-8222-000000000043",
    "title": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng",
    "slug": "ngheu-hap-sa-ot-la-chanh",
    "description": "Thố nghêu hấp nóng hổi mở miệng đều tăm tắp, phần nước hấp chua cay ngọt lịm vị nghêu tự nhiên hòa quyện hương sả tươi, gừng, ớt hiểm và lá chanh xanh ngát.",
    "prepTime": 20,
    "cookTime": 10,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-15T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 22,
    "nutrition": {
      "calories": 240,
      "protein": 26,
      "carbohydrates": 14,
      "fat": 6,
      "fiber": 2,
      "sodium": 680
    },
    "instructions": "Bước 1 (Ngâm nghêu nhả sạch cát): Ngâm nghêu trong thau nước muối pha 2 quả ớt cắt lát khoảng 1 tiếng để nghêu nhả hết cát bẩn, sau đó chà rửa sạch vỏ và để ráo.\nBước 2 (Đun sôi nước dừa cùng sả gừng): Lót sả cây đập dập và gừng thái lát dưới đáy nồi, đổ 200ml nước dừa tươi cùng 1 muỗng đường, 1 muỗng nước mắm và ớt đập dập vào đun sôi.\nBước 3 (Hấp nghêu vừa mở miệng): Trút nghêu và lá chanh vò nhẹ vào nồi, đậy kín nắp đun lửa lớn khoảng 4 phút. Ngay khi nghêu vừa mở miệng đều thì tắt bếp ngay để thịt nghêu căng mọng không bị teo.\nBước 4 (Múc ra thố và chấm muối tiêu chanh): Múc nghêu cùng nước hấp sả ớt nóng hổi ra thố đất, rắc thêm rau răm hoặc lá chanh thái sợi, thưởng thức nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000043000001",
        "name": "Nghêu (ngao) tươi sống",
        "quantity": 1000,
        "unit": "g",
        "notes": "Ngâm nước muối ớt nhả sạch cát",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000043000002",
        "name": "Sả cây tươi & gừng",
        "quantity": 100,
        "unit": "g",
        "notes": "Đập dập cắt khúc lót đáy nồi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000043000003",
        "name": "Lá chanh tươi & ớt hiểm đỏ",
        "quantity": 30,
        "unit": "g",
        "notes": "Xé nhỏ lá chanh cho dậy tinh dầu",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000043000004",
        "name": "Nước dừa tươi hoặc nước cốt me, đường, mắm",
        "quantity": 200,
        "unit": "ml",
        "notes": "Tạo nước hấp chua cay ngọt thanh",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000043000001",
        "stepNumber": 1,
        "title": "Ngâm nghêu nhả sạch cát",
        "description": "Ngâm nghêu trong thau nước muối pha 2 quả ớt cắt lát khoảng 1 tiếng để nghêu nhả hết cát bẩn, sau đó chà rửa sạch vỏ và để ráo.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000043000002",
        "stepNumber": 2,
        "title": "Đun sôi nước dừa cùng sả gừng",
        "description": "Lót sả cây đập dập và gừng thái lát dưới đáy nồi, đổ 200ml nước dừa tươi cùng 1 muỗng đường, 1 muỗng nước mắm và ớt đập dập vào đun sôi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000043000003",
        "stepNumber": 3,
        "title": "Hấp nghêu vừa mở miệng",
        "description": "Trút nghêu và lá chanh vò nhẹ vào nồi, đậy kín nắp đun lửa lớn khoảng 4 phút. Ngay khi nghêu vừa mở miệng đều thì tắt bếp ngay để thịt nghêu căng mọng không bị teo.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000043000004",
        "stepNumber": 4,
        "title": "Múc ra thố và chấm muối tiêu chanh",
        "description": "Múc nghêu cùng nước hấp sả ớt nóng hổi ra thố đất, rắc thêm rau răm hoặc lá chanh thái sợi, thưởng thức nóng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000043000001",
        "originalUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "altText": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000043000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000043000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ngheu-hap-sa-ot-la-chanh": {
    "id": "22222222-2222-4222-8222-000000000043",
    "title": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng",
    "slug": "ngheu-hap-sa-ot-la-chanh",
    "description": "Thố nghêu hấp nóng hổi mở miệng đều tăm tắp, phần nước hấp chua cay ngọt lịm vị nghêu tự nhiên hòa quyện hương sả tươi, gừng, ớt hiểm và lá chanh xanh ngát.",
    "prepTime": 20,
    "cookTime": 10,
    "totalTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000009",
    "categoryName": "Món Lẩu & Hấp",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-15T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 22,
    "nutrition": {
      "calories": 240,
      "protein": 26,
      "carbohydrates": 14,
      "fat": 6,
      "fiber": 2,
      "sodium": 680
    },
    "instructions": "Bước 1 (Ngâm nghêu nhả sạch cát): Ngâm nghêu trong thau nước muối pha 2 quả ớt cắt lát khoảng 1 tiếng để nghêu nhả hết cát bẩn, sau đó chà rửa sạch vỏ và để ráo.\nBước 2 (Đun sôi nước dừa cùng sả gừng): Lót sả cây đập dập và gừng thái lát dưới đáy nồi, đổ 200ml nước dừa tươi cùng 1 muỗng đường, 1 muỗng nước mắm và ớt đập dập vào đun sôi.\nBước 3 (Hấp nghêu vừa mở miệng): Trút nghêu và lá chanh vò nhẹ vào nồi, đậy kín nắp đun lửa lớn khoảng 4 phút. Ngay khi nghêu vừa mở miệng đều thì tắt bếp ngay để thịt nghêu căng mọng không bị teo.\nBước 4 (Múc ra thố và chấm muối tiêu chanh): Múc nghêu cùng nước hấp sả ớt nóng hổi ra thố đất, rắc thêm rau răm hoặc lá chanh thái sợi, thưởng thức nóng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000009",
      "name": "Món Lẩu & Hấp",
      "slug": "mon-lau-hap",
      "description": "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.",
      "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 9,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000043000001",
        "name": "Nghêu (ngao) tươi sống",
        "quantity": 1000,
        "unit": "g",
        "notes": "Ngâm nước muối ớt nhả sạch cát",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000043000002",
        "name": "Sả cây tươi & gừng",
        "quantity": 100,
        "unit": "g",
        "notes": "Đập dập cắt khúc lót đáy nồi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000043000003",
        "name": "Lá chanh tươi & ớt hiểm đỏ",
        "quantity": 30,
        "unit": "g",
        "notes": "Xé nhỏ lá chanh cho dậy tinh dầu",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000043000004",
        "name": "Nước dừa tươi hoặc nước cốt me, đường, mắm",
        "quantity": 200,
        "unit": "ml",
        "notes": "Tạo nước hấp chua cay ngọt thanh",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000043000001",
        "stepNumber": 1,
        "title": "Ngâm nghêu nhả sạch cát",
        "description": "Ngâm nghêu trong thau nước muối pha 2 quả ớt cắt lát khoảng 1 tiếng để nghêu nhả hết cát bẩn, sau đó chà rửa sạch vỏ và để ráo.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000043000002",
        "stepNumber": 2,
        "title": "Đun sôi nước dừa cùng sả gừng",
        "description": "Lót sả cây đập dập và gừng thái lát dưới đáy nồi, đổ 200ml nước dừa tươi cùng 1 muỗng đường, 1 muỗng nước mắm và ớt đập dập vào đun sôi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000043000003",
        "stepNumber": 3,
        "title": "Hấp nghêu vừa mở miệng",
        "description": "Trút nghêu và lá chanh vò nhẹ vào nồi, đậy kín nắp đun lửa lớn khoảng 4 phút. Ngay khi nghêu vừa mở miệng đều thì tắt bếp ngay để thịt nghêu căng mọng không bị teo.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000043000004",
        "stepNumber": 4,
        "title": "Múc ra thố và chấm muối tiêu chanh",
        "description": "Múc nghêu cùng nước hấp sả ớt nóng hổi ra thố đất, rắc thêm rau răm hoặc lá chanh thái sợi, thưởng thức nóng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000043000001",
        "originalUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
        "altText": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000043000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000043000003",
        "originalUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
        "altText": "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000044": {
    "id": "22222222-2222-4222-8222-000000000044",
    "title": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen",
    "slug": "dau-hu-kho-nam-rom-chay",
    "description": "Món kho chay thanh đạm nhưng cực kỳ đậm đà với những miếng đậu hũ chiên vàng thấm nước sốt tương tỏi hành boa-rô sánh kẹo cùng nấm rơm búp tròn ngọt giòn tự nhiên.",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-16T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 25,
    "nutrition": {
      "calories": 280,
      "protein": 18,
      "carbohydrates": 22,
      "fat": 14,
      "fiber": 4,
      "sodium": 610
    },
    "instructions": "Bước 1 (Chiên vàng đều các mặt đậu hũ): Cắt đậu hũ thành khối vuông 2.5cm, chiên vàng nhẹ các mặt để khi kho miếng đậu dai ngon và dễ ngấm nước sốt, vớt ra giấy thấm dầu.\nBước 2 (Sơ chế nấm rơm và phi thơm boa-rô): Nấm rơm gọt sạch gốc, rửa qua nước muối loãng, quả lớn khứa nhẹ hình chữ thập trên đỉnh. Phi thơm phần gốc trắng hành boa-rô với 1 muỗng dầu ăn.\nBước 3 (Kho đậu hũ và nấm rơm trong nồi đất): Cho nấm rơm vào đảo săn 2 phút, tiếp tục cho đậu hũ chiên cùng hỗn hợp nước tương, dầu hào chay, đường và 100ml nước dừa tươi vào kho lửa nhỏ 12 phút.\nBước 4 (Rắc tiêu đen và boa-rô xanh): Khi nước kho sánh lại áo bóng quanh nấm và đậu hũ, rắc phần lá xanh boa-rô, ớt lát và nhiều tiêu đen xay lên mặt, dùng nóng với cơm trắng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000044000001",
        "name": "Đậu hũ trắng non hoặc đậu hũ chiên",
        "quantity": 4,
        "unit": "bìa",
        "notes": "Cắt khối vuông vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000044000002",
        "name": "Nấm rơm búp tươi",
        "quantity": 300,
        "unit": "g",
        "notes": "Gọt gốc, ngâm nước muối loãng rửa sạch",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000044000003",
        "name": "Hành boa-rô (tỏi tây) & ớt trái",
        "quantity": 40,
        "unit": "g",
        "notes": "Thái lát phi thơm chuẩn chay",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000044000004",
        "name": "Nước tương đậm đặc, dầu hào chay, đường",
        "quantity": 5,
        "unit": "muỗng canh",
        "notes": "Pha sốt kho chay sánh đậm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000044000005",
        "name": "Tiêu đen xay & dầu mè",
        "quantity": 10,
        "unit": "g",
        "notes": "Tạo hương thơm ấm áp",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000044000001",
        "stepNumber": 1,
        "title": "Chiên vàng đều các mặt đậu hũ",
        "description": "Cắt đậu hũ thành khối vuông 2.5cm, chiên vàng nhẹ các mặt để khi kho miếng đậu dai ngon và dễ ngấm nước sốt, vớt ra giấy thấm dầu.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000044000002",
        "stepNumber": 2,
        "title": "Sơ chế nấm rơm và phi thơm boa-rô",
        "description": "Nấm rơm gọt sạch gốc, rửa qua nước muối loãng, quả lớn khứa nhẹ hình chữ thập trên đỉnh. Phi thơm phần gốc trắng hành boa-rô với 1 muỗng dầu ăn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000044000003",
        "stepNumber": 3,
        "title": "Kho đậu hũ và nấm rơm trong nồi đất",
        "description": "Cho nấm rơm vào đảo săn 2 phút, tiếp tục cho đậu hũ chiên cùng hỗn hợp nước tương, dầu hào chay, đường và 100ml nước dừa tươi vào kho lửa nhỏ 12 phút.",
        "timerMinutes": 14,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000044000004",
        "stepNumber": 4,
        "title": "Rắc tiêu đen và boa-rô xanh",
        "description": "Khi nước kho sánh lại áo bóng quanh nấm và đậu hũ, rắc phần lá xanh boa-rô, ớt lát và nhiều tiêu đen xay lên mặt, dùng nóng với cơm trắng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000044000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000044000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000044000003",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "dau-hu-kho-nam-rom-chay": {
    "id": "22222222-2222-4222-8222-000000000044",
    "title": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen",
    "slug": "dau-hu-kho-nam-rom-chay",
    "description": "Món kho chay thanh đạm nhưng cực kỳ đậm đà với những miếng đậu hũ chiên vàng thấm nước sốt tương tỏi hành boa-rô sánh kẹo cùng nấm rơm búp tròn ngọt giòn tự nhiên.",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-16T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 25,
    "nutrition": {
      "calories": 280,
      "protein": 18,
      "carbohydrates": 22,
      "fat": 14,
      "fiber": 4,
      "sodium": 610
    },
    "instructions": "Bước 1 (Chiên vàng đều các mặt đậu hũ): Cắt đậu hũ thành khối vuông 2.5cm, chiên vàng nhẹ các mặt để khi kho miếng đậu dai ngon và dễ ngấm nước sốt, vớt ra giấy thấm dầu.\nBước 2 (Sơ chế nấm rơm và phi thơm boa-rô): Nấm rơm gọt sạch gốc, rửa qua nước muối loãng, quả lớn khứa nhẹ hình chữ thập trên đỉnh. Phi thơm phần gốc trắng hành boa-rô với 1 muỗng dầu ăn.\nBước 3 (Kho đậu hũ và nấm rơm trong nồi đất): Cho nấm rơm vào đảo săn 2 phút, tiếp tục cho đậu hũ chiên cùng hỗn hợp nước tương, dầu hào chay, đường và 100ml nước dừa tươi vào kho lửa nhỏ 12 phút.\nBước 4 (Rắc tiêu đen và boa-rô xanh): Khi nước kho sánh lại áo bóng quanh nấm và đậu hũ, rắc phần lá xanh boa-rô, ớt lát và nhiều tiêu đen xay lên mặt, dùng nóng với cơm trắng.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000044000001",
        "name": "Đậu hũ trắng non hoặc đậu hũ chiên",
        "quantity": 4,
        "unit": "bìa",
        "notes": "Cắt khối vuông vừa ăn",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000044000002",
        "name": "Nấm rơm búp tươi",
        "quantity": 300,
        "unit": "g",
        "notes": "Gọt gốc, ngâm nước muối loãng rửa sạch",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000044000003",
        "name": "Hành boa-rô (tỏi tây) & ớt trái",
        "quantity": 40,
        "unit": "g",
        "notes": "Thái lát phi thơm chuẩn chay",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000044000004",
        "name": "Nước tương đậm đặc, dầu hào chay, đường",
        "quantity": 5,
        "unit": "muỗng canh",
        "notes": "Pha sốt kho chay sánh đậm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000044000005",
        "name": "Tiêu đen xay & dầu mè",
        "quantity": 10,
        "unit": "g",
        "notes": "Tạo hương thơm ấm áp",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000044000001",
        "stepNumber": 1,
        "title": "Chiên vàng đều các mặt đậu hũ",
        "description": "Cắt đậu hũ thành khối vuông 2.5cm, chiên vàng nhẹ các mặt để khi kho miếng đậu dai ngon và dễ ngấm nước sốt, vớt ra giấy thấm dầu.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000044000002",
        "stepNumber": 2,
        "title": "Sơ chế nấm rơm và phi thơm boa-rô",
        "description": "Nấm rơm gọt sạch gốc, rửa qua nước muối loãng, quả lớn khứa nhẹ hình chữ thập trên đỉnh. Phi thơm phần gốc trắng hành boa-rô với 1 muỗng dầu ăn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000044000003",
        "stepNumber": 3,
        "title": "Kho đậu hũ và nấm rơm trong nồi đất",
        "description": "Cho nấm rơm vào đảo săn 2 phút, tiếp tục cho đậu hũ chiên cùng hỗn hợp nước tương, dầu hào chay, đường và 100ml nước dừa tươi vào kho lửa nhỏ 12 phút.",
        "timerMinutes": 14,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000044000004",
        "stepNumber": 4,
        "title": "Rắc tiêu đen và boa-rô xanh",
        "description": "Khi nước kho sánh lại áo bóng quanh nấm và đậu hũ, rắc phần lá xanh boa-rô, ớt lát và nhiều tiêu đen xay lên mặt, dùng nóng với cơm trắng.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000044000001",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
        "altText": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000044000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000044000003",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000045": {
    "id": "22222222-2222-4222-8222-000000000045",
    "title": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát",
    "slug": "canh-nam-hat-sen-tao-do-chay",
    "description": "Tô canh chay dưỡng sinh trong vắt, kết hợp vị ngọt thanh từ bắp Mỹ, củ cải, hạt sen tươi bùi bở, táo đỏ, kỷ tử cùng các loại nấm đùi gà, nấm hương tươi giòn ngọt.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-17T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 28,
    "nutrition": {
      "calories": 220,
      "protein": 10,
      "carbohydrates": 36,
      "fat": 4,
      "fiber": 6,
      "sodium": 480
    },
    "instructions": "Bước 1 (Ninh nước dùng rau củ và hạt sen): Cho bắp ngọt cắt khúc, củ sen và hạt sen tươi vào nồi cùng 1.4 lít nước, ninh lửa vừa 20 phút cho hạt sen mềm bùi và nước dùng ngọt thanh.\nBước 2 (Thêm cà rốt, táo đỏ và nấm tươi): Cho cà rốt tỉa hoa, táo đỏ, nấm hương và nấm đùi gà vào nấu tiếp 8 phút trên lửa vừa.\nBước 3 (Cho đậu hũ non và kỷ tử): Nhẹ nhàng thả đậu hũ non cắt khối vuông, nấm kim châm và kỷ tử vào đun sôi nhẹ 2 phút, nêm hạt nêm nấm và chút muối hồng.\nBước 4 (Múc ra tô và rắc ngò rí): Múc canh hạt sen nấm ra tô lớn, rắc ngò rí và chút tiêu xay lên trên, thưởng thức khi còn nóng ấm.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000045000001",
        "name": "Hạt sen tươi Huế",
        "quantity": 150,
        "unit": "g",
        "notes": "Thông tâm sen để không bị đắng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000045000002",
        "name": "Nấm hương tươi, nấm đùi gà, nấm kim châm",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch cắt vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000045000003",
        "name": "Bắp ngọt, cà rốt, củ sen",
        "quantity": 300,
        "unit": "g",
        "notes": "Cắt khoanh ninh lấy nước ngọt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000045000004",
        "name": "Táo đỏ, kỷ tử, đậu hũ non",
        "quantity": 150,
        "unit": "g",
        "notes": "Tăng hương vị thanh bổ",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000045000005",
        "name": "Ngò rí, hạt nêm nấm hương, muối hồng",
        "quantity": 20,
        "unit": "g",
        "notes": "Nêm thanh đạm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000045000001",
        "stepNumber": 1,
        "title": "Ninh nước dùng rau củ và hạt sen",
        "description": "Cho bắp ngọt cắt khúc, củ sen và hạt sen tươi vào nồi cùng 1.4 lít nước, ninh lửa vừa 20 phút cho hạt sen mềm bùi và nước dùng ngọt thanh.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000045000002",
        "stepNumber": 2,
        "title": "Thêm cà rốt, táo đỏ và nấm tươi",
        "description": "Cho cà rốt tỉa hoa, táo đỏ, nấm hương và nấm đùi gà vào nấu tiếp 8 phút trên lửa vừa.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000045000003",
        "stepNumber": 3,
        "title": "Cho đậu hũ non và kỷ tử",
        "description": "Nhẹ nhàng thả đậu hũ non cắt khối vuông, nấm kim châm và kỷ tử vào đun sôi nhẹ 2 phút, nêm hạt nêm nấm và chút muối hồng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000045000004",
        "stepNumber": 4,
        "title": "Múc ra tô và rắc ngò rí",
        "description": "Múc canh hạt sen nấm ra tô lớn, rắc ngò rí và chút tiêu xay lên trên, thưởng thức khi còn nóng ấm.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000045000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000045000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000045000003",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "canh-nam-hat-sen-tao-do-chay": {
    "id": "22222222-2222-4222-8222-000000000045",
    "title": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát",
    "slug": "canh-nam-hat-sen-tao-do-chay",
    "description": "Tô canh chay dưỡng sinh trong vắt, kết hợp vị ngọt thanh từ bắp Mỹ, củ cải, hạt sen tươi bùi bở, táo đỏ, kỷ tử cùng các loại nấm đùi gà, nấm hương tươi giòn ngọt.",
    "prepTime": 20,
    "cookTime": 30,
    "totalTime": 50,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-17T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 28,
    "nutrition": {
      "calories": 220,
      "protein": 10,
      "carbohydrates": 36,
      "fat": 4,
      "fiber": 6,
      "sodium": 480
    },
    "instructions": "Bước 1 (Ninh nước dùng rau củ và hạt sen): Cho bắp ngọt cắt khúc, củ sen và hạt sen tươi vào nồi cùng 1.4 lít nước, ninh lửa vừa 20 phút cho hạt sen mềm bùi và nước dùng ngọt thanh.\nBước 2 (Thêm cà rốt, táo đỏ và nấm tươi): Cho cà rốt tỉa hoa, táo đỏ, nấm hương và nấm đùi gà vào nấu tiếp 8 phút trên lửa vừa.\nBước 3 (Cho đậu hũ non và kỷ tử): Nhẹ nhàng thả đậu hũ non cắt khối vuông, nấm kim châm và kỷ tử vào đun sôi nhẹ 2 phút, nêm hạt nêm nấm và chút muối hồng.\nBước 4 (Múc ra tô và rắc ngò rí): Múc canh hạt sen nấm ra tô lớn, rắc ngò rí và chút tiêu xay lên trên, thưởng thức khi còn nóng ấm.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000045000001",
        "name": "Hạt sen tươi Huế",
        "quantity": 150,
        "unit": "g",
        "notes": "Thông tâm sen để không bị đắng",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000045000002",
        "name": "Nấm hương tươi, nấm đùi gà, nấm kim châm",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch cắt vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000045000003",
        "name": "Bắp ngọt, cà rốt, củ sen",
        "quantity": 300,
        "unit": "g",
        "notes": "Cắt khoanh ninh lấy nước ngọt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000045000004",
        "name": "Táo đỏ, kỷ tử, đậu hũ non",
        "quantity": 150,
        "unit": "g",
        "notes": "Tăng hương vị thanh bổ",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000045000005",
        "name": "Ngò rí, hạt nêm nấm hương, muối hồng",
        "quantity": 20,
        "unit": "g",
        "notes": "Nêm thanh đạm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000045000001",
        "stepNumber": 1,
        "title": "Ninh nước dùng rau củ và hạt sen",
        "description": "Cho bắp ngọt cắt khúc, củ sen và hạt sen tươi vào nồi cùng 1.4 lít nước, ninh lửa vừa 20 phút cho hạt sen mềm bùi và nước dùng ngọt thanh.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000045000002",
        "stepNumber": 2,
        "title": "Thêm cà rốt, táo đỏ và nấm tươi",
        "description": "Cho cà rốt tỉa hoa, táo đỏ, nấm hương và nấm đùi gà vào nấu tiếp 8 phút trên lửa vừa.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000045000003",
        "stepNumber": 3,
        "title": "Cho đậu hũ non và kỷ tử",
        "description": "Nhẹ nhàng thả đậu hũ non cắt khối vuông, nấm kim châm và kỷ tử vào đun sôi nhẹ 2 phút, nêm hạt nêm nấm và chút muối hồng.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000045000004",
        "stepNumber": 4,
        "title": "Múc ra tô và rắc ngò rí",
        "description": "Múc canh hạt sen nấm ra tô lớn, rắc ngò rí và chút tiêu xay lên trên, thưởng thức khi còn nóng ấm.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000045000001",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
        "altText": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000045000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000045000003",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
        "altText": "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000046": {
    "id": "22222222-2222-4222-8222-000000000046",
    "title": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky",
    "slug": "bun-hue-chay-nam-dui-ga",
    "description": "Tô bún Huế chay thơm nức mùi sả và sa tế màu điều, nước dùng ngọt tự nhiên từ mía lau, củ đậu, táo, bắp ngọt cùng topping nấm đùi gà, chả chay, đậu hũ và tàu hũ ky chiên giòn.",
    "prepTime": 30,
    "cookTime": 45,
    "totalTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-18T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 31,
    "nutrition": {
      "calories": 420,
      "protein": 17,
      "carbohydrates": 58,
      "fat": 13,
      "fiber": 6,
      "sodium": 690
    },
    "instructions": "Bước 1 (Ninh nước dùng rau củ mía lau): Cho mía lau chẻ đôi, củ sắn, cà rốt, bắp ngọt, nửa quả thơm và 3 cây sả đập dập vào 2 lít nước hầm trong 35 phút rồi vớt bỏ xác rau củ để lấy nước dùng trong ngọt.\nBước 2 (Xào nấm với sả và dầu màu điều): Phi thơm sả băm và hành boa-rô với dầu màu điều, cho nấm đùi gà và nấm rơm vào xào săn cùng 1 muỗng nước tương và 1 muỗng sa tế chay.\nBước 3 (Hoàn thiện nồi nước lèo bún Huế chay): Trút phần nấm xào và đậu hũ chiên vào nồi nước dùng rau củ, nêm hạt nêm nấm, muối, đường phèn và 1 muỗng nước tương cho đậm vị, đun sôi nhẹ 5 phút.\nBước 4 (Trình bày tô bún Huế chay): Cho bún vào tô, xếp chả chay, nấm đùi gà, đậu hũ, tàu hũ ky chiên giòn và rau răm lên mặt. Chan nước dùng nóng hổi, ăn kèm rau chuối bào và chanh tươi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000046000001",
        "name": "Bún sợi to",
        "quantity": 800,
        "unit": "g",
        "notes": "Trụng sơ nước sôi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000046000002",
        "name": "Củ sắn (củ đậu), bắp ngọt, cà rốt, mía lau, thơm",
        "quantity": 600,
        "unit": "g",
        "notes": "Hầm lấy nước dùng chay ngọt tự nhiên",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000046000003",
        "name": "Nấm đùi gà, nấm rơm, đậu hũ chiên, chả lụa chay",
        "quantity": 400,
        "unit": "g",
        "notes": "Cắt miếng vừa ăn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000046000004",
        "name": "Tàu hũ ky (váng đậu) chiên giòn",
        "quantity": 100,
        "unit": "g",
        "notes": "Ăn kèm trên mặt tô bún",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000046000005",
        "name": "Sả cây, sa tế chay, dầu màu điều, tương Bần/chao",
        "quantity": 60,
        "unit": "g",
        "notes": "Tạo hương vị Huế chay đặc trưng",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000046000006",
        "name": "Bắp chuối bào, giá, rau răm, chanh",
        "quantity": 200,
        "unit": "g",
        "notes": "Rau sống ăn kèm",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000046000001",
        "stepNumber": 1,
        "title": "Ninh nước dùng rau củ mía lau",
        "description": "Cho mía lau chẻ đôi, củ sắn, cà rốt, bắp ngọt, nửa quả thơm và 3 cây sả đập dập vào 2 lít nước hầm trong 35 phút rồi vớt bỏ xác rau củ để lấy nước dùng trong ngọt.",
        "timerMinutes": 35,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000046000002",
        "stepNumber": 2,
        "title": "Xào nấm với sả và dầu màu điều",
        "description": "Phi thơm sả băm và hành boa-rô với dầu màu điều, cho nấm đùi gà và nấm rơm vào xào săn cùng 1 muỗng nước tương và 1 muỗng sa tế chay.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000046000003",
        "stepNumber": 3,
        "title": "Hoàn thiện nồi nước lèo bún Huế chay",
        "description": "Trút phần nấm xào và đậu hũ chiên vào nồi nước dùng rau củ, nêm hạt nêm nấm, muối, đường phèn và 1 muỗng nước tương cho đậm vị, đun sôi nhẹ 5 phút.",
        "timerMinutes": 7,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000046000004",
        "stepNumber": 4,
        "title": "Trình bày tô bún Huế chay",
        "description": "Cho bún vào tô, xếp chả chay, nấm đùi gà, đậu hũ, tàu hũ ky chiên giòn và rau răm lên mặt. Chan nước dùng nóng hổi, ăn kèm rau chuối bào và chanh tươi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000046000001",
        "originalUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000046000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000046000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "bun-hue-chay-nam-dui-ga": {
    "id": "22222222-2222-4222-8222-000000000046",
    "title": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky",
    "slug": "bun-hue-chay-nam-dui-ga",
    "description": "Tô bún Huế chay thơm nức mùi sả và sa tế màu điều, nước dùng ngọt tự nhiên từ mía lau, củ đậu, táo, bắp ngọt cùng topping nấm đùi gà, chả chay, đậu hũ và tàu hũ ky chiên giòn.",
    "prepTime": 30,
    "cookTime": 45,
    "totalTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-18T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 31,
    "nutrition": {
      "calories": 420,
      "protein": 17,
      "carbohydrates": 58,
      "fat": 13,
      "fiber": 6,
      "sodium": 690
    },
    "instructions": "Bước 1 (Ninh nước dùng rau củ mía lau): Cho mía lau chẻ đôi, củ sắn, cà rốt, bắp ngọt, nửa quả thơm và 3 cây sả đập dập vào 2 lít nước hầm trong 35 phút rồi vớt bỏ xác rau củ để lấy nước dùng trong ngọt.\nBước 2 (Xào nấm với sả và dầu màu điều): Phi thơm sả băm và hành boa-rô với dầu màu điều, cho nấm đùi gà và nấm rơm vào xào săn cùng 1 muỗng nước tương và 1 muỗng sa tế chay.\nBước 3 (Hoàn thiện nồi nước lèo bún Huế chay): Trút phần nấm xào và đậu hũ chiên vào nồi nước dùng rau củ, nêm hạt nêm nấm, muối, đường phèn và 1 muỗng nước tương cho đậm vị, đun sôi nhẹ 5 phút.\nBước 4 (Trình bày tô bún Huế chay): Cho bún vào tô, xếp chả chay, nấm đùi gà, đậu hũ, tàu hũ ky chiên giòn và rau răm lên mặt. Chan nước dùng nóng hổi, ăn kèm rau chuối bào và chanh tươi.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000046000001",
        "name": "Bún sợi to",
        "quantity": 800,
        "unit": "g",
        "notes": "Trụng sơ nước sôi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000046000002",
        "name": "Củ sắn (củ đậu), bắp ngọt, cà rốt, mía lau, thơm",
        "quantity": 600,
        "unit": "g",
        "notes": "Hầm lấy nước dùng chay ngọt tự nhiên",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000046000003",
        "name": "Nấm đùi gà, nấm rơm, đậu hũ chiên, chả lụa chay",
        "quantity": 400,
        "unit": "g",
        "notes": "Cắt miếng vừa ăn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000046000004",
        "name": "Tàu hũ ky (váng đậu) chiên giòn",
        "quantity": 100,
        "unit": "g",
        "notes": "Ăn kèm trên mặt tô bún",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000046000005",
        "name": "Sả cây, sa tế chay, dầu màu điều, tương Bần/chao",
        "quantity": 60,
        "unit": "g",
        "notes": "Tạo hương vị Huế chay đặc trưng",
        "orderIndex": 5
      },
      {
        "id": "33333333-3333-4333-8333-000046000006",
        "name": "Bắp chuối bào, giá, rau răm, chanh",
        "quantity": 200,
        "unit": "g",
        "notes": "Rau sống ăn kèm",
        "orderIndex": 6
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000046000001",
        "stepNumber": 1,
        "title": "Ninh nước dùng rau củ mía lau",
        "description": "Cho mía lau chẻ đôi, củ sắn, cà rốt, bắp ngọt, nửa quả thơm và 3 cây sả đập dập vào 2 lít nước hầm trong 35 phút rồi vớt bỏ xác rau củ để lấy nước dùng trong ngọt.",
        "timerMinutes": 35,
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000046000002",
        "stepNumber": 2,
        "title": "Xào nấm với sả và dầu màu điều",
        "description": "Phi thơm sả băm và hành boa-rô với dầu màu điều, cho nấm đùi gà và nấm rơm vào xào săn cùng 1 muỗng nước tương và 1 muỗng sa tế chay.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000046000003",
        "stepNumber": 3,
        "title": "Hoàn thiện nồi nước lèo bún Huế chay",
        "description": "Trút phần nấm xào và đậu hũ chiên vào nồi nước dùng rau củ, nêm hạt nêm nấm, muối, đường phèn và 1 muỗng nước tương cho đậm vị, đun sôi nhẹ 5 phút.",
        "timerMinutes": 7,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000046000004",
        "stepNumber": 4,
        "title": "Trình bày tô bún Huế chay",
        "description": "Cho bún vào tô, xếp chả chay, nấm đùi gà, đậu hũ, tàu hũ ky chiên giòn và rau răm lên mặt. Chan nước dùng nóng hổi, ăn kèm rau chuối bào và chanh tươi.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000046000001",
        "originalUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
        "altText": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000046000002",
        "originalUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000046000003",
        "originalUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
        "altText": "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000047": {
    "id": "22222222-2222-4222-8222-000000000047",
    "title": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng",
    "slug": "goi-cuon-chay-sot-bo-dau-phong",
    "description": "Những cuốn gỏi chay tươi mát đầy màu sắc từ bắp cải tím, cà rốt, dưa leo, bơ sáp, đậu hũ chiên sả và bún tươi, chấm cùng sốt bơ đậu phộng tương đen béo ngậy.",
    "prepTime": 25,
    "cookTime": 10,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-19T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 34,
    "nutrition": {
      "calories": 320,
      "protein": 13,
      "carbohydrates": 40,
      "fat": 12,
      "fiber": 6,
      "sodium": 490
    },
    "instructions": "Bước 1 (Áp chảo đậu hũ và nấm đùi gà): Cắt đậu hũ và nấm đùi gà thành thanh dài, áp chảo với chút dầu ăn, sả băm và nước tương cho vàng thơm hai mặt.\nBước 2 (Thái sợi ngũ sắc các loại rau củ): Bào sợi bắp cải tím và cà rốt, dưa leo và ớt chuông vàng thái thanh dài bằng nhau.\nBước 3 (Cuốn gỏi chay ngũ sắc): Làm mềm bánh tráng, xếp xà lách, rau thơm, bún tươi, các loại rau củ ngũ sắc, đậu hũ và nấm đùi gà vào rồi cuốn tròn chắc tay.\nBước 4 (Pha sốt bơ đậu phộng và thưởng thức): Đun ấm bơ đậu phộng, tương đen chay, chút nước cốt dừa và đường cho sánh mịn, rắc mè rang và đậu phộng giã dập lên mặt chén sốt.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000047000001",
        "name": "Bánh tráng dẻo & bún tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Cuốn gỏi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000047000002",
        "name": "Đậu hũ chiên vàng & nấm đùi gà áp chảo",
        "quantity": 250,
        "unit": "g",
        "notes": "Thái thanh dài vừa cuốn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000047000003",
        "name": "Bắp cải tím, cà rốt, dưa leo, ớt chuông vàng",
        "quantity": 300,
        "unit": "g",
        "notes": "Thái sợi dài đều đẹp mắt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000047000004",
        "name": "Xà lách, húng lủi, tía tô, rau mùi",
        "quantity": 150,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000047000005",
        "name": "Bơ đậu phộng, tương đen chay, nước cốt dừa",
        "quantity": 100,
        "unit": "g",
        "notes": "Khuấy sốt chấm béo bùi",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000047000001",
        "stepNumber": 1,
        "title": "Áp chảo đậu hũ và nấm đùi gà",
        "description": "Cắt đậu hũ và nấm đùi gà thành thanh dài, áp chảo với chút dầu ăn, sả băm và nước tương cho vàng thơm hai mặt.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000047000002",
        "stepNumber": 2,
        "title": "Thái sợi ngũ sắc các loại rau củ",
        "description": "Bào sợi bắp cải tím và cà rốt, dưa leo và ớt chuông vàng thái thanh dài bằng nhau.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000047000003",
        "stepNumber": 3,
        "title": "Cuốn gỏi chay ngũ sắc",
        "description": "Làm mềm bánh tráng, xếp xà lách, rau thơm, bún tươi, các loại rau củ ngũ sắc, đậu hũ và nấm đùi gà vào rồi cuốn tròn chắc tay.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000047000004",
        "stepNumber": 4,
        "title": "Pha sốt bơ đậu phộng và thưởng thức",
        "description": "Đun ấm bơ đậu phộng, tương đen chay, chút nước cốt dừa và đường cho sánh mịn, rắc mè rang và đậu phộng giã dập lên mặt chén sốt.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000047000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000047000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000047000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "goi-cuon-chay-sot-bo-dau-phong": {
    "id": "22222222-2222-4222-8222-000000000047",
    "title": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng",
    "slug": "goi-cuon-chay-sot-bo-dau-phong",
    "description": "Những cuốn gỏi chay tươi mát đầy màu sắc từ bắp cải tím, cà rốt, dưa leo, bơ sáp, đậu hũ chiên sả và bún tươi, chấm cùng sốt bơ đậu phộng tương đen béo ngậy.",
    "prepTime": 25,
    "cookTime": 10,
    "totalTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000010",
    "categoryName": "Món Chay Thanh Đạm",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-19T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 34,
    "nutrition": {
      "calories": 320,
      "protein": 13,
      "carbohydrates": 40,
      "fat": 12,
      "fiber": 6,
      "sodium": 490
    },
    "instructions": "Bước 1 (Áp chảo đậu hũ và nấm đùi gà): Cắt đậu hũ và nấm đùi gà thành thanh dài, áp chảo với chút dầu ăn, sả băm và nước tương cho vàng thơm hai mặt.\nBước 2 (Thái sợi ngũ sắc các loại rau củ): Bào sợi bắp cải tím và cà rốt, dưa leo và ớt chuông vàng thái thanh dài bằng nhau.\nBước 3 (Cuốn gỏi chay ngũ sắc): Làm mềm bánh tráng, xếp xà lách, rau thơm, bún tươi, các loại rau củ ngũ sắc, đậu hũ và nấm đùi gà vào rồi cuốn tròn chắc tay.\nBước 4 (Pha sốt bơ đậu phộng và thưởng thức): Đun ấm bơ đậu phộng, tương đen chay, chút nước cốt dừa và đường cho sánh mịn, rắc mè rang và đậu phộng giã dập lên mặt chén sốt.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000010",
      "name": "Món Chay Thanh Đạm",
      "slug": "mon-chay-thanh-dam",
      "description": "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.",
      "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 10,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000047000001",
        "name": "Bánh tráng dẻo & bún tươi",
        "quantity": 400,
        "unit": "g",
        "notes": "Cuốn gỏi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000047000002",
        "name": "Đậu hũ chiên vàng & nấm đùi gà áp chảo",
        "quantity": 250,
        "unit": "g",
        "notes": "Thái thanh dài vừa cuốn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000047000003",
        "name": "Bắp cải tím, cà rốt, dưa leo, ớt chuông vàng",
        "quantity": 300,
        "unit": "g",
        "notes": "Thái sợi dài đều đẹp mắt",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000047000004",
        "name": "Xà lách, húng lủi, tía tô, rau mùi",
        "quantity": 150,
        "unit": "g",
        "notes": "Rửa sạch để ráo",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000047000005",
        "name": "Bơ đậu phộng, tương đen chay, nước cốt dừa",
        "quantity": 100,
        "unit": "g",
        "notes": "Khuấy sốt chấm béo bùi",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000047000001",
        "stepNumber": 1,
        "title": "Áp chảo đậu hũ và nấm đùi gà",
        "description": "Cắt đậu hũ và nấm đùi gà thành thanh dài, áp chảo với chút dầu ăn, sả băm và nước tương cho vàng thơm hai mặt.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000047000002",
        "stepNumber": 2,
        "title": "Thái sợi ngũ sắc các loại rau củ",
        "description": "Bào sợi bắp cải tím và cà rốt, dưa leo và ớt chuông vàng thái thanh dài bằng nhau.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000047000003",
        "stepNumber": 3,
        "title": "Cuốn gỏi chay ngũ sắc",
        "description": "Làm mềm bánh tráng, xếp xà lách, rau thơm, bún tươi, các loại rau củ ngũ sắc, đậu hũ và nấm đùi gà vào rồi cuốn tròn chắc tay.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000047000004",
        "stepNumber": 4,
        "title": "Pha sốt bơ đậu phộng và thưởng thức",
        "description": "Đun ấm bơ đậu phộng, tương đen chay, chút nước cốt dừa và đường cho sánh mịn, rắc mè rang và đậu phộng giã dập lên mặt chén sốt.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000047000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000047000002",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000047000003",
        "originalUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
        "altText": "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000048": {
    "id": "22222222-2222-4222-8222-000000000048",
    "title": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên",
    "slug": "che-hat-sen-long-nhan-hung-yen",
    "description": "Món chè cung đình thanh tao với từng hạt sen bở tơi bùi ngậy được lồng khéo léo trong cùi nhãn lồng Hưng Yên dày giòn ngọt lịm, ướp hương hoa nhài và đường phèn mát lành.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-20T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 37,
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbohydrates": 56,
      "fat": 2,
      "fiber": 4,
      "sodium": 45
    },
    "instructions": "Bước 1 (Ninh hạt sen chín bở mà không nát): Cho hạt sen tươi vào nồi nước cùng bó lá dứa, đun sôi rồi hạ lửa nhỏ ninh 25 phút cho đến khi hạt sen chín bở mềm nhưng vẫn nguyên hạt. Thêm đường phèn đun thêm 5 phút cho hạt sen ngấm ngọt.\nBước 2 (Tách hạt nhãn và lồng hạt sen): Dùng đầu mũi dao nhọn khéo léo lách quanh cuống nhãn để lấy hạt ra mà cùi nhãn không bị rách. Vớt hạt sen đã nguội nhồi vào bên trong từng cùi nhãn.\nBước 3 (Chần long nhãn bọc sen trong nước đường phèn): Đun sôi lại nồi nước đường phèn trong vắt, thả các viên nhãn bọc hạt sen vào đun đúng 2 phút rồi tắt bếp ngay để cùi nhãn giữ độ giòn.\nBước 4 (Ướp lạnh và thưởng thức): Để chè nguội, thả vài bông hoa nhài rửa sạch hoặc ướp lạnh trong ngăn mát tủ lạnh, múc ra bát sứ rắc sợi dừa non thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000048000001",
        "name": "Hạt sen tươi Huế hoặc Đồng Tháp",
        "quantity": 300,
        "unit": "g",
        "notes": "Bóc vỏ, thông sạch tâm sen",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000048000002",
        "name": "Nhãn lồng cùi dày tươi",
        "quantity": 500,
        "unit": "g",
        "notes": "Bóc vỏ, khéo léo xoáy bỏ hạt giữ nguyên cùi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000048000003",
        "name": "Đường phèn kết tinh",
        "quantity": 150,
        "unit": "g",
        "notes": "Tạo vị ngọt thanh không gắt cổ",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000048000004",
        "name": "Lá dứa (lá nếp) & hoa nhài tươi",
        "quantity": 30,
        "unit": "g",
        "notes": "Ướp hương thơm thanh khiết",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000048000005",
        "name": "Cơm dừa non thái sợi",
        "quantity": 50,
        "unit": "g",
        "notes": "Trang trí và ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000048000001",
        "stepNumber": 1,
        "title": "Ninh hạt sen chín bở mà không nát",
        "description": "Cho hạt sen tươi vào nồi nước cùng bó lá dứa, đun sôi rồi hạ lửa nhỏ ninh 25 phút cho đến khi hạt sen chín bở mềm nhưng vẫn nguyên hạt. Thêm đường phèn đun thêm 5 phút cho hạt sen ngấm ngọt.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000048000002",
        "stepNumber": 2,
        "title": "Tách hạt nhãn và lồng hạt sen",
        "description": "Dùng đầu mũi dao nhọn khéo léo lách quanh cuống nhãn để lấy hạt ra mà cùi nhãn không bị rách. Vớt hạt sen đã nguội nhồi vào bên trong từng cùi nhãn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000048000003",
        "stepNumber": 3,
        "title": "Chần long nhãn bọc sen trong nước đường phèn",
        "description": "Đun sôi lại nồi nước đường phèn trong vắt, thả các viên nhãn bọc hạt sen vào đun đúng 2 phút rồi tắt bếp ngay để cùi nhãn giữ độ giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000048000004",
        "stepNumber": 4,
        "title": "Ướp lạnh và thưởng thức",
        "description": "Để chè nguội, thả vài bông hoa nhài rửa sạch hoặc ướp lạnh trong ngăn mát tủ lạnh, múc ra bát sứ rắc sợi dừa non thưởng thức.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000048000001",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
        "altText": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000048000002",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000048000003",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "che-hat-sen-long-nhan-hung-yen": {
    "id": "22222222-2222-4222-8222-000000000048",
    "title": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên",
    "slug": "che-hat-sen-long-nhan-hung-yen",
    "description": "Món chè cung đình thanh tao với từng hạt sen bở tơi bùi ngậy được lồng khéo léo trong cùi nhãn lồng Hưng Yên dày giòn ngọt lịm, ướp hương hoa nhài và đường phèn mát lành.",
    "prepTime": 30,
    "cookTime": 35,
    "totalTime": 65,
    "servings": 4,
    "difficulty": "Medium",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-20T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 37,
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbohydrates": 56,
      "fat": 2,
      "fiber": 4,
      "sodium": 45
    },
    "instructions": "Bước 1 (Ninh hạt sen chín bở mà không nát): Cho hạt sen tươi vào nồi nước cùng bó lá dứa, đun sôi rồi hạ lửa nhỏ ninh 25 phút cho đến khi hạt sen chín bở mềm nhưng vẫn nguyên hạt. Thêm đường phèn đun thêm 5 phút cho hạt sen ngấm ngọt.\nBước 2 (Tách hạt nhãn và lồng hạt sen): Dùng đầu mũi dao nhọn khéo léo lách quanh cuống nhãn để lấy hạt ra mà cùi nhãn không bị rách. Vớt hạt sen đã nguội nhồi vào bên trong từng cùi nhãn.\nBước 3 (Chần long nhãn bọc sen trong nước đường phèn): Đun sôi lại nồi nước đường phèn trong vắt, thả các viên nhãn bọc hạt sen vào đun đúng 2 phút rồi tắt bếp ngay để cùi nhãn giữ độ giòn.\nBước 4 (Ướp lạnh và thưởng thức): Để chè nguội, thả vài bông hoa nhài rửa sạch hoặc ướp lạnh trong ngăn mát tủ lạnh, múc ra bát sứ rắc sợi dừa non thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000048000001",
        "name": "Hạt sen tươi Huế hoặc Đồng Tháp",
        "quantity": 300,
        "unit": "g",
        "notes": "Bóc vỏ, thông sạch tâm sen",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000048000002",
        "name": "Nhãn lồng cùi dày tươi",
        "quantity": 500,
        "unit": "g",
        "notes": "Bóc vỏ, khéo léo xoáy bỏ hạt giữ nguyên cùi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000048000003",
        "name": "Đường phèn kết tinh",
        "quantity": 150,
        "unit": "g",
        "notes": "Tạo vị ngọt thanh không gắt cổ",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000048000004",
        "name": "Lá dứa (lá nếp) & hoa nhài tươi",
        "quantity": 30,
        "unit": "g",
        "notes": "Ướp hương thơm thanh khiết",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000048000005",
        "name": "Cơm dừa non thái sợi",
        "quantity": 50,
        "unit": "g",
        "notes": "Trang trí và ăn kèm",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000048000001",
        "stepNumber": 1,
        "title": "Ninh hạt sen chín bở mà không nát",
        "description": "Cho hạt sen tươi vào nồi nước cùng bó lá dứa, đun sôi rồi hạ lửa nhỏ ninh 25 phút cho đến khi hạt sen chín bở mềm nhưng vẫn nguyên hạt. Thêm đường phèn đun thêm 5 phút cho hạt sen ngấm ngọt.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000048000002",
        "stepNumber": 2,
        "title": "Tách hạt nhãn và lồng hạt sen",
        "description": "Dùng đầu mũi dao nhọn khéo léo lách quanh cuống nhãn để lấy hạt ra mà cùi nhãn không bị rách. Vớt hạt sen đã nguội nhồi vào bên trong từng cùi nhãn.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000048000003",
        "stepNumber": 3,
        "title": "Chần long nhãn bọc sen trong nước đường phèn",
        "description": "Đun sôi lại nồi nước đường phèn trong vắt, thả các viên nhãn bọc hạt sen vào đun đúng 2 phút rồi tắt bếp ngay để cùi nhãn giữ độ giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000048000004",
        "stepNumber": 4,
        "title": "Ướp lạnh và thưởng thức",
        "description": "Để chè nguội, thả vài bông hoa nhài rửa sạch hoặc ướp lạnh trong ngăn mát tủ lạnh, múc ra bát sứ rắc sợi dừa non thưởng thức.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000048000001",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
        "altText": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000048000002",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000048000003",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000049": {
    "id": "22222222-2222-4222-8222-000000000049",
    "title": "Bánh Flan Trứng Sữa Caramel Mềm Mịn",
    "slug": "banh-flan-trung-sua-caramel",
    "description": "Chiếc bánh flan vàng óng núng nính, mặt cắt láng mịn không một vết rỗ tổ ong, béo thơm mùi trứng gà tươi và sữa tươi hòa quyện lớp sốt caramel hổ phách đắng nhẹ.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 6,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-21T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 40,
    "nutrition": {
      "calories": 245,
      "protein": 8,
      "carbohydrates": 32,
      "fat": 9,
      "fiber": 0,
      "sodium": 95
    },
    "instructions": "Bước 1 (Thắng caramel màu hổ phách): Đun đường cát với 40ml nước trên lửa nhỏ không khuấy cho đến khi chuyển màu cánh gián đẹp mắt, vắt 1/2 muỗng nước cốt chanh vào rồi rót nhanh láng đều đáy các khuôn bánh.\nBước 2 (Khuấy hỗn hợp trứng sữa và lọc qua rây): Khuấy nhẹ trứng gà với vani theo một chiều (không đánh bông bọt). Đun ấm sữa tươi với sữa đặc ở 60 độ C rồi rót từ từ vào tô trứng, lọc hỗn hợp qua rây mịn 2 lần để bánh không bị rỗ.\nBước 3 (Hấp bánh flan lửa nhỏ phủ khăn): Rót hỗn hợp vào khuôn, phủ một chiếc khăn xô lên miệng xửng hấp để hơi nước không nhỏ xuống mặt bánh. Hấp ở lửa nhỏ nhất trong 30 phút đến khi xiên tăm vào bánh không dính.\nBước 4 (Làm lạnh và úp bánh ra đĩa): Để bánh nguội rồi bảo quản ngăn mát tủ lạnh 3 tiếng. Dùng mũi dao lách nhẹ quanh thành khuôn, úp bánh ra đĩa và rưới chút cà phê đen cùng đá bào.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000049000001",
        "name": "Trứng gà tươi",
        "quantity": 6,
        "unit": "quả",
        "notes": "Dùng 4 quả nguyên và 2 lòng đỏ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000049000002",
        "name": "Sữa tươi không đường & sữa đặc có đường",
        "quantity": 600,
        "unit": "ml",
        "notes": "500ml sữa tươi và 100ml sữa đặc",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000049000003",
        "name": "Đường cát trắng & nước cốt chanh",
        "quantity": 100,
        "unit": "g",
        "notes": "Thắng caramel láng đáy khuôn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000049000004",
        "name": "Tinh chất vani nguyên chất",
        "quantity": 1,
        "unit": "muỗng cà phê",
        "notes": "Khử mùi tanh trứng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000049000005",
        "name": "Cà phê đen pha phin & đá bào",
        "quantity": 50,
        "unit": "ml",
        "notes": "Rưới ăn kèm bánh flan",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000049000001",
        "stepNumber": 1,
        "title": "Thắng caramel màu hổ phách",
        "description": "Đun đường cát với 40ml nước trên lửa nhỏ không khuấy cho đến khi chuyển màu cánh gián đẹp mắt, vắt 1/2 muỗng nước cốt chanh vào rồi rót nhanh láng đều đáy các khuôn bánh.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000049000002",
        "stepNumber": 2,
        "title": "Khuấy hỗn hợp trứng sữa và lọc qua rây",
        "description": "Khuấy nhẹ trứng gà với vani theo một chiều (không đánh bông bọt). Đun ấm sữa tươi với sữa đặc ở 60 độ C rồi rót từ từ vào tô trứng, lọc hỗn hợp qua rây mịn 2 lần để bánh không bị rỗ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000049000003",
        "stepNumber": 3,
        "title": "Hấp bánh flan lửa nhỏ phủ khăn",
        "description": "Rót hỗn hợp vào khuôn, phủ một chiếc khăn xô lên miệng xửng hấp để hơi nước không nhỏ xuống mặt bánh. Hấp ở lửa nhỏ nhất trong 30 phút đến khi xiên tăm vào bánh không dính.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000049000004",
        "stepNumber": 4,
        "title": "Làm lạnh và úp bánh ra đĩa",
        "description": "Để bánh nguội rồi bảo quản ngăn mát tủ lạnh 3 tiếng. Dùng mũi dao lách nhẹ quanh thành khuôn, úp bánh ra đĩa và rưới chút cà phê đen cùng đá bào.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000049000001",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "altText": "Bánh Flan Trứng Sữa Caramel Mềm Mịn",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000049000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Flan Trứng Sữa Caramel Mềm Mịn - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000049000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Flan Trứng Sữa Caramel Mềm Mịn - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "banh-flan-trung-sua-caramel": {
    "id": "22222222-2222-4222-8222-000000000049",
    "title": "Bánh Flan Trứng Sữa Caramel Mềm Mịn",
    "slug": "banh-flan-trung-sua-caramel",
    "description": "Chiếc bánh flan vàng óng núng nính, mặt cắt láng mịn không một vết rỗ tổ ong, béo thơm mùi trứng gà tươi và sữa tươi hòa quyện lớp sốt caramel hổ phách đắng nhẹ.",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 6,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-21T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 40,
    "nutrition": {
      "calories": 245,
      "protein": 8,
      "carbohydrates": 32,
      "fat": 9,
      "fiber": 0,
      "sodium": 95
    },
    "instructions": "Bước 1 (Thắng caramel màu hổ phách): Đun đường cát với 40ml nước trên lửa nhỏ không khuấy cho đến khi chuyển màu cánh gián đẹp mắt, vắt 1/2 muỗng nước cốt chanh vào rồi rót nhanh láng đều đáy các khuôn bánh.\nBước 2 (Khuấy hỗn hợp trứng sữa và lọc qua rây): Khuấy nhẹ trứng gà với vani theo một chiều (không đánh bông bọt). Đun ấm sữa tươi với sữa đặc ở 60 độ C rồi rót từ từ vào tô trứng, lọc hỗn hợp qua rây mịn 2 lần để bánh không bị rỗ.\nBước 3 (Hấp bánh flan lửa nhỏ phủ khăn): Rót hỗn hợp vào khuôn, phủ một chiếc khăn xô lên miệng xửng hấp để hơi nước không nhỏ xuống mặt bánh. Hấp ở lửa nhỏ nhất trong 30 phút đến khi xiên tăm vào bánh không dính.\nBước 4 (Làm lạnh và úp bánh ra đĩa): Để bánh nguội rồi bảo quản ngăn mát tủ lạnh 3 tiếng. Dùng mũi dao lách nhẹ quanh thành khuôn, úp bánh ra đĩa và rưới chút cà phê đen cùng đá bào.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000049000001",
        "name": "Trứng gà tươi",
        "quantity": 6,
        "unit": "quả",
        "notes": "Dùng 4 quả nguyên và 2 lòng đỏ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000049000002",
        "name": "Sữa tươi không đường & sữa đặc có đường",
        "quantity": 600,
        "unit": "ml",
        "notes": "500ml sữa tươi và 100ml sữa đặc",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000049000003",
        "name": "Đường cát trắng & nước cốt chanh",
        "quantity": 100,
        "unit": "g",
        "notes": "Thắng caramel láng đáy khuôn",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000049000004",
        "name": "Tinh chất vani nguyên chất",
        "quantity": 1,
        "unit": "muỗng cà phê",
        "notes": "Khử mùi tanh trứng",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000049000005",
        "name": "Cà phê đen pha phin & đá bào",
        "quantity": 50,
        "unit": "ml",
        "notes": "Rưới ăn kèm bánh flan",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000049000001",
        "stepNumber": 1,
        "title": "Thắng caramel màu hổ phách",
        "description": "Đun đường cát với 40ml nước trên lửa nhỏ không khuấy cho đến khi chuyển màu cánh gián đẹp mắt, vắt 1/2 muỗng nước cốt chanh vào rồi rót nhanh láng đều đáy các khuôn bánh.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000049000002",
        "stepNumber": 2,
        "title": "Khuấy hỗn hợp trứng sữa và lọc qua rây",
        "description": "Khuấy nhẹ trứng gà với vani theo một chiều (không đánh bông bọt). Đun ấm sữa tươi với sữa đặc ở 60 độ C rồi rót từ từ vào tô trứng, lọc hỗn hợp qua rây mịn 2 lần để bánh không bị rỗ.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000049000003",
        "stepNumber": 3,
        "title": "Hấp bánh flan lửa nhỏ phủ khăn",
        "description": "Rót hỗn hợp vào khuôn, phủ một chiếc khăn xô lên miệng xửng hấp để hơi nước không nhỏ xuống mặt bánh. Hấp ở lửa nhỏ nhất trong 30 phút đến khi xiên tăm vào bánh không dính.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000049000004",
        "stepNumber": 4,
        "title": "Làm lạnh và úp bánh ra đĩa",
        "description": "Để bánh nguội rồi bảo quản ngăn mát tủ lạnh 3 tiếng. Dùng mũi dao lách nhẹ quanh thành khuôn, úp bánh ra đĩa và rưới chút cà phê đen cùng đá bào.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000049000001",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "altText": "Bánh Flan Trứng Sữa Caramel Mềm Mịn",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000049000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Flan Trứng Sữa Caramel Mềm Mịn - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000049000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Bánh Flan Trứng Sữa Caramel Mềm Mịn - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000050": {
    "id": "22222222-2222-4222-8222-000000000050",
    "title": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh",
    "slug": "che-khuc-bach-hanh-nhan",
    "description": "Những viên thạch khúc bạch phô mai kem tươi mềm tan nơi đầu lưỡi với 3 sắc màu tự nhiên (trắng sữa, xanh trà xanh, hồng dâu), dùng kèm nước đường phèn, nhãn tươi và hạnh nhân lát nướng giòn.",
    "prepTime": 25,
    "cookTime": 20,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-22T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 14,
    "nutrition": {
      "calories": 310,
      "protein": 7,
      "carbohydrates": 38,
      "fat": 15,
      "fiber": 2,
      "sodium": 80
    },
    "instructions": "Bước 1 (Nấu hỗn hợp thạch khúc bạch kem sữa): Ngâm nở gelatin trong 15 phút. Đun ấm sữa tươi, whipping cream và 60g đường trên lửa nhỏ, cho gelatin vào khuấy tan hoàn toàn rồi chia làm 2 khuôn (1 khuôn trắng sữa, 1 khuôn pha bột matcha). Để tủ lạnh 3 giờ cho đông.\nBước 2 (Nấu nước đường phèn lá dứa và nhãn): Đun sôi 1 lít nước với đường phèn và lá dứa cho tan hết, thả cùi nhãn tươi vào đun 2 phút rồi tắt bếp để thật nguội.\nBước 3 (Rang vàng lát hạnh nhân): Rang hạnh nhân thái lát trên chảo khô lửa nhỏ khoảng 3 phút cho đến khi dậy mùi thơm bùi và ngả màu vàng nhẹ.\nBước 4 (Cắt khúc bạch và trình bày bát chè): Dùng dao lượn sóng cắt thạch khúc bạch thành từng viên vừa ăn, xếp vào bát cùng nhãn tươi, chan nước đường phèn lạnh, rắc hạt chia và hạnh nhân lát rang giòn.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000050000001",
        "name": "Kem tươi (Whipping Cream) & sữa tươi",
        "quantity": 500,
        "unit": "ml",
        "notes": "250ml whipping cream và 250ml sữa tươi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000050000002",
        "name": "Bột Gelatin & đường cát",
        "quantity": 80,
        "unit": "g",
        "notes": "20g gelatin ngâm nở với nước lạnh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000050000003",
        "name": "Bột trà xanh Matcha",
        "quantity": 1,
        "unit": "muỗng cà phê",
        "notes": "Tạo viên khúc bạch vị trà xanh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000050000004",
        "name": "Nhãn tươi hoặc vải thiều tách hạt",
        "quantity": 300,
        "unit": "g",
        "notes": "Nấu cùng nước đường phèn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000050000005",
        "name": "Hạnh nhân lát rang vàng & hạt chia",
        "quantity": 60,
        "unit": "g",
        "notes": "Rắc lên trên bát chè",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000050000001",
        "stepNumber": 1,
        "title": "Nấu hỗn hợp thạch khúc bạch kem sữa",
        "description": "Ngâm nở gelatin trong 15 phút. Đun ấm sữa tươi, whipping cream và 60g đường trên lửa nhỏ, cho gelatin vào khuấy tan hoàn toàn rồi chia làm 2 khuôn (1 khuôn trắng sữa, 1 khuôn pha bột matcha). Để tủ lạnh 3 giờ cho đông.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000050000002",
        "stepNumber": 2,
        "title": "Nấu nước đường phèn lá dứa và nhãn",
        "description": "Đun sôi 1 lít nước với đường phèn và lá dứa cho tan hết, thả cùi nhãn tươi vào đun 2 phút rồi tắt bếp để thật nguội.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000050000003",
        "stepNumber": 3,
        "title": "Rang vàng lát hạnh nhân",
        "description": "Rang hạnh nhân thái lát trên chảo khô lửa nhỏ khoảng 3 phút cho đến khi dậy mùi thơm bùi và ngả màu vàng nhẹ.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000050000004",
        "stepNumber": 4,
        "title": "Cắt khúc bạch và trình bày bát chè",
        "description": "Dùng dao lượn sóng cắt thạch khúc bạch thành từng viên vừa ăn, xếp vào bát cùng nhãn tươi, chan nước đường phèn lạnh, rắc hạt chia và hạnh nhân lát rang giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000050000001",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
        "altText": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000050000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000050000003",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "che-khuc-bach-hanh-nhan": {
    "id": "22222222-2222-4222-8222-000000000050",
    "title": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh",
    "slug": "che-khuc-bach-hanh-nhan",
    "description": "Những viên thạch khúc bạch phô mai kem tươi mềm tan nơi đầu lưỡi với 3 sắc màu tự nhiên (trắng sữa, xanh trà xanh, hồng dâu), dùng kèm nước đường phèn, nhãn tươi và hạnh nhân lát nướng giòn.",
    "prepTime": 25,
    "cookTime": 20,
    "totalTime": 45,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "chef-khai-id",
    "authorName": "Chef Nguyễn Thế Khải",
    "coverImageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-22T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 14,
    "nutrition": {
      "calories": 310,
      "protein": 7,
      "carbohydrates": 38,
      "fat": 15,
      "fiber": 2,
      "sodium": 80
    },
    "instructions": "Bước 1 (Nấu hỗn hợp thạch khúc bạch kem sữa): Ngâm nở gelatin trong 15 phút. Đun ấm sữa tươi, whipping cream và 60g đường trên lửa nhỏ, cho gelatin vào khuấy tan hoàn toàn rồi chia làm 2 khuôn (1 khuôn trắng sữa, 1 khuôn pha bột matcha). Để tủ lạnh 3 giờ cho đông.\nBước 2 (Nấu nước đường phèn lá dứa và nhãn): Đun sôi 1 lít nước với đường phèn và lá dứa cho tan hết, thả cùi nhãn tươi vào đun 2 phút rồi tắt bếp để thật nguội.\nBước 3 (Rang vàng lát hạnh nhân): Rang hạnh nhân thái lát trên chảo khô lửa nhỏ khoảng 3 phút cho đến khi dậy mùi thơm bùi và ngả màu vàng nhẹ.\nBước 4 (Cắt khúc bạch và trình bày bát chè): Dùng dao lượn sóng cắt thạch khúc bạch thành từng viên vừa ăn, xếp vào bát cùng nhãn tươi, chan nước đường phèn lạnh, rắc hạt chia và hạnh nhân lát rang giòn.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000050000001",
        "name": "Kem tươi (Whipping Cream) & sữa tươi",
        "quantity": 500,
        "unit": "ml",
        "notes": "250ml whipping cream và 250ml sữa tươi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000050000002",
        "name": "Bột Gelatin & đường cát",
        "quantity": 80,
        "unit": "g",
        "notes": "20g gelatin ngâm nở với nước lạnh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000050000003",
        "name": "Bột trà xanh Matcha",
        "quantity": 1,
        "unit": "muỗng cà phê",
        "notes": "Tạo viên khúc bạch vị trà xanh",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000050000004",
        "name": "Nhãn tươi hoặc vải thiều tách hạt",
        "quantity": 300,
        "unit": "g",
        "notes": "Nấu cùng nước đường phèn",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000050000005",
        "name": "Hạnh nhân lát rang vàng & hạt chia",
        "quantity": 60,
        "unit": "g",
        "notes": "Rắc lên trên bát chè",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000050000001",
        "stepNumber": 1,
        "title": "Nấu hỗn hợp thạch khúc bạch kem sữa",
        "description": "Ngâm nở gelatin trong 15 phút. Đun ấm sữa tươi, whipping cream và 60g đường trên lửa nhỏ, cho gelatin vào khuấy tan hoàn toàn rồi chia làm 2 khuôn (1 khuôn trắng sữa, 1 khuôn pha bột matcha). Để tủ lạnh 3 giờ cho đông.",
        "timerMinutes": 20,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000050000002",
        "stepNumber": 2,
        "title": "Nấu nước đường phèn lá dứa và nhãn",
        "description": "Đun sôi 1 lít nước với đường phèn và lá dứa cho tan hết, thả cùi nhãn tươi vào đun 2 phút rồi tắt bếp để thật nguội.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000050000003",
        "stepNumber": 3,
        "title": "Rang vàng lát hạnh nhân",
        "description": "Rang hạnh nhân thái lát trên chảo khô lửa nhỏ khoảng 3 phút cho đến khi dậy mùi thơm bùi và ngả màu vàng nhẹ.",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000050000004",
        "stepNumber": 4,
        "title": "Cắt khúc bạch và trình bày bát chè",
        "description": "Dùng dao lượn sóng cắt thạch khúc bạch thành từng viên vừa ăn, xếp vào bát cùng nhãn tươi, chan nước đường phèn lạnh, rắc hạt chia và hạnh nhân lát rang giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000050000001",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
        "altText": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000050000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000050000003",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
        "altText": "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000051": {
    "id": "22222222-2222-4222-8222-000000000051",
    "title": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa",
    "slug": "sua-chua-nep-cam-nuoc-cot-dua",
    "description": "Sự hòa quyện tuyệt vời giữa phần xôi nếp cẩm tím than dẻo bùi nấu lá dứa, nước cốt dừa béo thơm và sữa chua trắng mịn chua dịu mát lạnh tốt cho hệ tiêu hóa.",
    "prepTime": 20,
    "cookTime": 40,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-23T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 17,
    "nutrition": {
      "calories": 290,
      "protein": 8,
      "carbohydrates": 46,
      "fat": 9,
      "fiber": 4,
      "sodium": 65
    },
    "instructions": "Bước 1 (Nấu chín mềm nếp cẩm với lá dứa): Cho gạo nếp cẩm đã ngâm cùng nước ngâm và bó lá dứa vào nồi, đun sôi rồi hạ lửa nhỏ ninh trong 30 phút cho hạt nếp cẩm nở mềm sánh dẻo.\nBước 2 (Rim nếp cẩm với đường và nước cốt dừa): Vớt bỏ lá dứa, cho đường nâu và 100ml nước cốt dừa vào nồi nếp cẩm, khuấy đều trên lửa nhỏ thêm 10 phút cho hạt nếp bóng mượt rồi để nguội.\nBước 3 (Chuẩn bị sữa chua và đá bào): Cho một lớp đá bào mịn xuống đáy ly thủy tinh, múc 3 muỗng nếp cẩm dẻo thơm lên trên.\nBước 4 (Rót sữa chua và thưởng thức): Đổ 1 hộp sữa chua mát lạnh và rưới thêm 1 muỗng nước cốt dừa, rắc dừa khô và trân châu trắng lên mặt ly.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000051000001",
        "name": "Gạo nếp cẩm (nếp than) Điện Biên",
        "quantity": 250,
        "unit": "g",
        "notes": "Vo sạch, ngâm nước ấm 3 giờ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000051000002",
        "name": "Sữa chua sánh mịn",
        "quantity": 4,
        "unit": "hộp",
        "notes": "Để ngăn mát tủ lạnh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000051000003",
        "name": "Nước cốt dừa & lá dứa tươi",
        "quantity": 150,
        "unit": "ml",
        "notes": "Nấu cùng nếp cẩm tạo độ béo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000051000004",
        "name": "Đường thốt nốt hoặc đường nâu",
        "quantity": 80,
        "unit": "g",
        "notes": "Tạo vị ngọt trầm ấm cho nếp cẩm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000051000005",
        "name": "Dừa khô hoặc trân châu trắng",
        "quantity": 50,
        "unit": "g",
        "notes": "Topping giòn vui miệng",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000051000001",
        "stepNumber": 1,
        "title": "Nấu chín mềm nếp cẩm với lá dứa",
        "description": "Cho gạo nếp cẩm đã ngâm cùng nước ngâm và bó lá dứa vào nồi, đun sôi rồi hạ lửa nhỏ ninh trong 30 phút cho hạt nếp cẩm nở mềm sánh dẻo.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000051000002",
        "stepNumber": 2,
        "title": "Rim nếp cẩm với đường và nước cốt dừa",
        "description": "Vớt bỏ lá dứa, cho đường nâu và 100ml nước cốt dừa vào nồi nếp cẩm, khuấy đều trên lửa nhỏ thêm 10 phút cho hạt nếp bóng mượt rồi để nguội.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000051000003",
        "stepNumber": 3,
        "title": "Chuẩn bị sữa chua và đá bào",
        "description": "Cho một lớp đá bào mịn xuống đáy ly thủy tinh, múc 3 muỗng nếp cẩm dẻo thơm lên trên.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000051000004",
        "stepNumber": 4,
        "title": "Rót sữa chua và thưởng thức",
        "description": "Đổ 1 hộp sữa chua mát lạnh và rưới thêm 1 muỗng nước cốt dừa, rắc dừa khô và trân châu trắng lên mặt ly.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000051000001",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "altText": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000051000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000051000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "sua-chua-nep-cam-nuoc-cot-dua": {
    "id": "22222222-2222-4222-8222-000000000051",
    "title": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa",
    "slug": "sua-chua-nep-cam-nuoc-cot-dua",
    "description": "Sự hòa quyện tuyệt vời giữa phần xôi nếp cẩm tím than dẻo bùi nấu lá dứa, nước cốt dừa béo thơm và sữa chua trắng mịn chua dịu mát lạnh tốt cho hệ tiêu hóa.",
    "prepTime": 20,
    "cookTime": 40,
    "totalTime": 60,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000011",
    "categoryName": "Bánh Ngọt & Tráng Miệng",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-23T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 17,
    "nutrition": {
      "calories": 290,
      "protein": 8,
      "carbohydrates": 46,
      "fat": 9,
      "fiber": 4,
      "sodium": 65
    },
    "instructions": "Bước 1 (Nấu chín mềm nếp cẩm với lá dứa): Cho gạo nếp cẩm đã ngâm cùng nước ngâm và bó lá dứa vào nồi, đun sôi rồi hạ lửa nhỏ ninh trong 30 phút cho hạt nếp cẩm nở mềm sánh dẻo.\nBước 2 (Rim nếp cẩm với đường và nước cốt dừa): Vớt bỏ lá dứa, cho đường nâu và 100ml nước cốt dừa vào nồi nếp cẩm, khuấy đều trên lửa nhỏ thêm 10 phút cho hạt nếp bóng mượt rồi để nguội.\nBước 3 (Chuẩn bị sữa chua và đá bào): Cho một lớp đá bào mịn xuống đáy ly thủy tinh, múc 3 muỗng nếp cẩm dẻo thơm lên trên.\nBước 4 (Rót sữa chua và thưởng thức): Đổ 1 hộp sữa chua mát lạnh và rưới thêm 1 muỗng nước cốt dừa, rắc dừa khô và trân châu trắng lên mặt ly.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000011",
      "name": "Bánh Ngọt & Tráng Miệng",
      "slug": "banh-ngot-trang-mieng",
      "description": "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.",
      "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 11,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000051000001",
        "name": "Gạo nếp cẩm (nếp than) Điện Biên",
        "quantity": 250,
        "unit": "g",
        "notes": "Vo sạch, ngâm nước ấm 3 giờ",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000051000002",
        "name": "Sữa chua sánh mịn",
        "quantity": 4,
        "unit": "hộp",
        "notes": "Để ngăn mát tủ lạnh",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000051000003",
        "name": "Nước cốt dừa & lá dứa tươi",
        "quantity": 150,
        "unit": "ml",
        "notes": "Nấu cùng nếp cẩm tạo độ béo",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000051000004",
        "name": "Đường thốt nốt hoặc đường nâu",
        "quantity": 80,
        "unit": "g",
        "notes": "Tạo vị ngọt trầm ấm cho nếp cẩm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000051000005",
        "name": "Dừa khô hoặc trân châu trắng",
        "quantity": 50,
        "unit": "g",
        "notes": "Topping giòn vui miệng",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000051000001",
        "stepNumber": 1,
        "title": "Nấu chín mềm nếp cẩm với lá dứa",
        "description": "Cho gạo nếp cẩm đã ngâm cùng nước ngâm và bó lá dứa vào nồi, đun sôi rồi hạ lửa nhỏ ninh trong 30 phút cho hạt nếp cẩm nở mềm sánh dẻo.",
        "timerMinutes": 30,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000051000002",
        "stepNumber": 2,
        "title": "Rim nếp cẩm với đường và nước cốt dừa",
        "description": "Vớt bỏ lá dứa, cho đường nâu và 100ml nước cốt dừa vào nồi nếp cẩm, khuấy đều trên lửa nhỏ thêm 10 phút cho hạt nếp bóng mượt rồi để nguội.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000051000003",
        "stepNumber": 3,
        "title": "Chuẩn bị sữa chua và đá bào",
        "description": "Cho một lớp đá bào mịn xuống đáy ly thủy tinh, múc 3 muỗng nếp cẩm dẻo thơm lên trên.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000051000004",
        "stepNumber": 4,
        "title": "Rót sữa chua và thưởng thức",
        "description": "Đổ 1 hộp sữa chua mát lạnh và rưới thêm 1 muỗng nước cốt dừa, rắc dừa khô và trân châu trắng lên mặt ly.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000051000001",
        "originalUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
        "altText": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000051000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000051000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000052": {
    "id": "22222222-2222-4222-8222-000000000052",
    "title": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt",
    "slug": "tra-dao-cam-sa-mat-ong",
    "description": "Ly trà đào cam sả mát lạnh chuẩn vị quán cà phê với nền hồng trà ủ sả tươi thơm dịu, vị chua ngọt thanh mát của cam vàng, mật ong và những miếng đào ngâm giòn ngọt.",
    "prepTime": 15,
    "cookTime": 10,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-24T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 20,
    "nutrition": {
      "calories": 145,
      "protein": 1,
      "carbohydrates": 35,
      "fat": 0,
      "fiber": 2,
      "sodium": 15
    },
    "instructions": "Bước 1 (Nấu nước sả tươi và ủ hồng trà): Đập dập 4 cây sả, đun sôi với 600ml nước trong 8 phút để chiết xuất tinh dầu sả. Tắt bếp, thả 4 gói hồng trà vào ủ 7 phút rồi vớt bỏ túi trà để nguội.\nBước 2 (Vắt cam vàng và cắt miếng đào ngâm): Vắt lấy nước cốt 1 quả cam vàng, quả còn lại thái lát mỏng. Đào ngâm cắt thành những múi cau dày giòn.\nBước 3 (Lắc hỗn hợp trà đào cam sả): Cho nước cốt hồng trà sả, nước cam tươi, nước đào ngâm, mật ong và đá viên vào bình shaker lắc mạnh 15 giây cho trà lên lớp bọt mịn mát lạnh.\nBước 4 (Trang trí ly trà và thưởng thức): Rót trà ra ly cao, xếp 3-4 miếng đào ngâm, lát cam vàng, nhánh sả tươi và lá bạc hà lên miệng ly.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000052000001",
        "name": "Hồng trà hoặc trà đen túi lọc",
        "quantity": 4,
        "unit": "gói",
        "notes": "Ủ với nước sả sôi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000052000002",
        "name": "Đào ngâm đóng hộp & nước ngâm đào",
        "quantity": 300,
        "unit": "g",
        "notes": "Cắt múi cau vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000052000003",
        "name": "Cam vàng tươi",
        "quantity": 2,
        "unit": "quả",
        "notes": "1 quả vắt lấy nước, 1 quả cắt lát trang trí",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000052000004",
        "name": "Sả cây tươi đập dập",
        "quantity": 4,
        "unit": "cây",
        "notes": "Nấu lấy nước thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000052000005",
        "name": "Mật ong rừng & siro đào",
        "quantity": 60,
        "unit": "ml",
        "notes": "Tạo độ ngọt thanh và hương đào",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000052000001",
        "stepNumber": 1,
        "title": "Nấu nước sả tươi và ủ hồng trà",
        "description": "Đập dập 4 cây sả, đun sôi với 600ml nước trong 8 phút để chiết xuất tinh dầu sả. Tắt bếp, thả 4 gói hồng trà vào ủ 7 phút rồi vớt bỏ túi trà để nguội.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000052000002",
        "stepNumber": 2,
        "title": "Vắt cam vàng và cắt miếng đào ngâm",
        "description": "Vắt lấy nước cốt 1 quả cam vàng, quả còn lại thái lát mỏng. Đào ngâm cắt thành những múi cau dày giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000052000003",
        "stepNumber": 3,
        "title": "Lắc hỗn hợp trà đào cam sả",
        "description": "Cho nước cốt hồng trà sả, nước cam tươi, nước đào ngâm, mật ong và đá viên vào bình shaker lắc mạnh 15 giây cho trà lên lớp bọt mịn mát lạnh.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000052000004",
        "stepNumber": 4,
        "title": "Trang trí ly trà và thưởng thức",
        "description": "Rót trà ra ly cao, xếp 3-4 miếng đào ngâm, lát cam vàng, nhánh sả tươi và lá bạc hà lên miệng ly.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000052000001",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "altText": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000052000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000052000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "tra-dao-cam-sa-mat-ong": {
    "id": "22222222-2222-4222-8222-000000000052",
    "title": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt",
    "slug": "tra-dao-cam-sa-mat-ong",
    "description": "Ly trà đào cam sả mát lạnh chuẩn vị quán cà phê với nền hồng trà ủ sả tươi thơm dịu, vị chua ngọt thanh mát của cam vàng, mật ong và những miếng đào ngâm giòn ngọt.",
    "prepTime": 15,
    "cookTime": 10,
    "totalTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-24T08:30:00Z",
    "averageRating": 5.0,
    "reviewCount": 20,
    "nutrition": {
      "calories": 145,
      "protein": 1,
      "carbohydrates": 35,
      "fat": 0,
      "fiber": 2,
      "sodium": 15
    },
    "instructions": "Bước 1 (Nấu nước sả tươi và ủ hồng trà): Đập dập 4 cây sả, đun sôi với 600ml nước trong 8 phút để chiết xuất tinh dầu sả. Tắt bếp, thả 4 gói hồng trà vào ủ 7 phút rồi vớt bỏ túi trà để nguội.\nBước 2 (Vắt cam vàng và cắt miếng đào ngâm): Vắt lấy nước cốt 1 quả cam vàng, quả còn lại thái lát mỏng. Đào ngâm cắt thành những múi cau dày giòn.\nBước 3 (Lắc hỗn hợp trà đào cam sả): Cho nước cốt hồng trà sả, nước cam tươi, nước đào ngâm, mật ong và đá viên vào bình shaker lắc mạnh 15 giây cho trà lên lớp bọt mịn mát lạnh.\nBước 4 (Trang trí ly trà và thưởng thức): Rót trà ra ly cao, xếp 3-4 miếng đào ngâm, lát cam vàng, nhánh sả tươi và lá bạc hà lên miệng ly.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000052000001",
        "name": "Hồng trà hoặc trà đen túi lọc",
        "quantity": 4,
        "unit": "gói",
        "notes": "Ủ với nước sả sôi",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000052000002",
        "name": "Đào ngâm đóng hộp & nước ngâm đào",
        "quantity": 300,
        "unit": "g",
        "notes": "Cắt múi cau vừa ăn",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000052000003",
        "name": "Cam vàng tươi",
        "quantity": 2,
        "unit": "quả",
        "notes": "1 quả vắt lấy nước, 1 quả cắt lát trang trí",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000052000004",
        "name": "Sả cây tươi đập dập",
        "quantity": 4,
        "unit": "cây",
        "notes": "Nấu lấy nước thơm",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000052000005",
        "name": "Mật ong rừng & siro đào",
        "quantity": 60,
        "unit": "ml",
        "notes": "Tạo độ ngọt thanh và hương đào",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000052000001",
        "stepNumber": 1,
        "title": "Nấu nước sả tươi và ủ hồng trà",
        "description": "Đập dập 4 cây sả, đun sôi với 600ml nước trong 8 phút để chiết xuất tinh dầu sả. Tắt bếp, thả 4 gói hồng trà vào ủ 7 phút rồi vớt bỏ túi trà để nguội.",
        "timerMinutes": 15,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000052000002",
        "stepNumber": 2,
        "title": "Vắt cam vàng và cắt miếng đào ngâm",
        "description": "Vắt lấy nước cốt 1 quả cam vàng, quả còn lại thái lát mỏng. Đào ngâm cắt thành những múi cau dày giòn.",
        "timerMinutes": 5,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000052000003",
        "stepNumber": 3,
        "title": "Lắc hỗn hợp trà đào cam sả",
        "description": "Cho nước cốt hồng trà sả, nước cam tươi, nước đào ngâm, mật ong và đá viên vào bình shaker lắc mạnh 15 giây cho trà lên lớp bọt mịn mát lạnh.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000052000004",
        "stepNumber": 4,
        "title": "Trang trí ly trà và thưởng thức",
        "description": "Rót trà ra ly cao, xếp 3-4 miếng đào ngâm, lát cam vàng, nhánh sả tươi và lá bạc hà lên miệng ly.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000052000001",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "altText": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000052000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000052000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Trà Đào Cam Sả Mật Ong Thanh Nhiệt - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000053": {
    "id": "22222222-2222-4222-8222-000000000053",
    "title": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế",
    "slug": "ca-phe-muoi-kem-beo-hue",
    "description": "Thức uống gây thương nhớ từ cố đô Huế với cốt cà phê Robusta pha phin đậm đặc, hòa quyện lớp kem sữa mặn béo mịn màng làm tôn lên vị ngọt hậu và hương thơm nồng nàn của cà phê.",
    "prepTime": 10,
    "cookTime": 5,
    "totalTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-25T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 23,
    "nutrition": {
      "calories": 210,
      "protein": 3,
      "carbohydrates": 22,
      "fat": 12,
      "fiber": 0,
      "sodium": 380
    },
    "instructions": "Bước 1 (Ủ cà phê phin truyền thống): Tráng nóng phin cà phê, cho 50g bột cà phê vào nén vừa tay. Chế 30ml nước sôi ủ nở 2 phút, sau đó rót thêm 100ml nước sôi chờ cà phê nhỏ giọt hết.\nBước 2 (Đánh bông lớp kem muối mặn béo): Cho kem béo, whipping cream và 3g muối mịn vào tô lạnh, dùng máy đánh trứng đánh ở tốc độ vừa khoảng 2 phút đến khi kem bông sánh mịn có độ chảy nhẹ.\nBước 3 (Tạo tầng sữa đặc và cà phê): Cho 20ml sữa đặc vào đáy mỗi ly, thêm đá viên rồi rót nước cốt cà phê phin đã đánh tạo bọt lên trên.\nBước 4 (Phủ kem muối và rắc bột cacao): Nhẹ nhàng rót lớp kem muối trắng mịn phủ đầy mặt ly cà phê, rắc một lớp mỏng bột cacao nguyên chất lên trên và thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000053000001",
        "name": "Bột cà phê nguyên chất pha phin",
        "quantity": 50,
        "unit": "g",
        "notes": "Ủ nước sôi 95 độ C lấy nước cốt đậm đặc",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000053000002",
        "name": "Sữa đặc có đường",
        "quantity": 40,
        "unit": "ml",
        "notes": "Đặt dưới đáy ly tạo vị ngọt",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000053000003",
        "name": "Kem béo thực vật (Rich's) & Whipping Cream",
        "quantity": 100,
        "unit": "ml",
        "notes": "Đánh bông sệt vừa phải",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000053000004",
        "name": "Muối hồng Himalaya hoặc muối biển mịn",
        "quantity": 3,
        "unit": "g",
        "notes": "Tạo vị mặn dịu hài hòa trong lớp kem",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000053000005",
        "name": "Bột cacao & đá viên",
        "quantity": 10,
        "unit": "g",
        "notes": "Rắc trang trí mặt kem",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000053000001",
        "stepNumber": 1,
        "title": "Ủ cà phê phin truyền thống",
        "description": "Tráng nóng phin cà phê, cho 50g bột cà phê vào nén vừa tay. Chế 30ml nước sôi ủ nở 2 phút, sau đó rót thêm 100ml nước sôi chờ cà phê nhỏ giọt hết.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000053000002",
        "stepNumber": 2,
        "title": "Đánh bông lớp kem muối mặn béo",
        "description": "Cho kem béo, whipping cream và 3g muối mịn vào tô lạnh, dùng máy đánh trứng đánh ở tốc độ vừa khoảng 2 phút đến khi kem bông sánh mịn có độ chảy nhẹ.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000053000003",
        "stepNumber": 3,
        "title": "Tạo tầng sữa đặc và cà phê",
        "description": "Cho 20ml sữa đặc vào đáy mỗi ly, thêm đá viên rồi rót nước cốt cà phê phin đã đánh tạo bọt lên trên.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000053000004",
        "stepNumber": 4,
        "title": "Phủ kem muối và rắc bột cacao",
        "description": "Nhẹ nhàng rót lớp kem muối trắng mịn phủ đầy mặt ly cà phê, rắc một lớp mỏng bột cacao nguyên chất lên trên và thưởng thức.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000053000001",
        "originalUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
        "altText": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000053000002",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "altText": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000053000003",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "ca-phe-muoi-kem-beo-hue": {
    "id": "22222222-2222-4222-8222-000000000053",
    "title": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế",
    "slug": "ca-phe-muoi-kem-beo-hue",
    "description": "Thức uống gây thương nhớ từ cố đô Huế với cốt cà phê Robusta pha phin đậm đặc, hòa quyện lớp kem sữa mặn béo mịn màng làm tôn lên vị ngọt hậu và hương thơm nồng nàn của cà phê.",
    "prepTime": 10,
    "cookTime": 5,
    "totalTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-25T08:30:00Z",
    "averageRating": 4.7,
    "reviewCount": 23,
    "nutrition": {
      "calories": 210,
      "protein": 3,
      "carbohydrates": 22,
      "fat": 12,
      "fiber": 0,
      "sodium": 380
    },
    "instructions": "Bước 1 (Ủ cà phê phin truyền thống): Tráng nóng phin cà phê, cho 50g bột cà phê vào nén vừa tay. Chế 30ml nước sôi ủ nở 2 phút, sau đó rót thêm 100ml nước sôi chờ cà phê nhỏ giọt hết.\nBước 2 (Đánh bông lớp kem muối mặn béo): Cho kem béo, whipping cream và 3g muối mịn vào tô lạnh, dùng máy đánh trứng đánh ở tốc độ vừa khoảng 2 phút đến khi kem bông sánh mịn có độ chảy nhẹ.\nBước 3 (Tạo tầng sữa đặc và cà phê): Cho 20ml sữa đặc vào đáy mỗi ly, thêm đá viên rồi rót nước cốt cà phê phin đã đánh tạo bọt lên trên.\nBước 4 (Phủ kem muối và rắc bột cacao): Nhẹ nhàng rót lớp kem muối trắng mịn phủ đầy mặt ly cà phê, rắc một lớp mỏng bột cacao nguyên chất lên trên và thưởng thức.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000053000001",
        "name": "Bột cà phê nguyên chất pha phin",
        "quantity": 50,
        "unit": "g",
        "notes": "Ủ nước sôi 95 độ C lấy nước cốt đậm đặc",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000053000002",
        "name": "Sữa đặc có đường",
        "quantity": 40,
        "unit": "ml",
        "notes": "Đặt dưới đáy ly tạo vị ngọt",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000053000003",
        "name": "Kem béo thực vật (Rich's) & Whipping Cream",
        "quantity": 100,
        "unit": "ml",
        "notes": "Đánh bông sệt vừa phải",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000053000004",
        "name": "Muối hồng Himalaya hoặc muối biển mịn",
        "quantity": 3,
        "unit": "g",
        "notes": "Tạo vị mặn dịu hài hòa trong lớp kem",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000053000005",
        "name": "Bột cacao & đá viên",
        "quantity": 10,
        "unit": "g",
        "notes": "Rắc trang trí mặt kem",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000053000001",
        "stepNumber": 1,
        "title": "Ủ cà phê phin truyền thống",
        "description": "Tráng nóng phin cà phê, cho 50g bột cà phê vào nén vừa tay. Chế 30ml nước sôi ủ nở 2 phút, sau đó rót thêm 100ml nước sôi chờ cà phê nhỏ giọt hết.",
        "timerMinutes": 8,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000053000002",
        "stepNumber": 2,
        "title": "Đánh bông lớp kem muối mặn béo",
        "description": "Cho kem béo, whipping cream và 3g muối mịn vào tô lạnh, dùng máy đánh trứng đánh ở tốc độ vừa khoảng 2 phút đến khi kem bông sánh mịn có độ chảy nhẹ.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000053000003",
        "stepNumber": 3,
        "title": "Tạo tầng sữa đặc và cà phê",
        "description": "Cho 20ml sữa đặc vào đáy mỗi ly, thêm đá viên rồi rót nước cốt cà phê phin đã đánh tạo bọt lên trên.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000053000004",
        "stepNumber": 4,
        "title": "Phủ kem muối và rắc bột cacao",
        "description": "Nhẹ nhàng rót lớp kem muối trắng mịn phủ đầy mặt ly cà phê, rắc một lớp mỏng bột cacao nguyên chất lên trên và thưởng thức.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000053000001",
        "originalUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
        "altText": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000053000002",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "altText": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000053000003",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000054": {
    "id": "22222222-2222-4222-8222-000000000054",
    "title": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô",
    "slug": "sinh-to-bo-sap-sua-dac",
    "description": "Ly sinh tố bơ sáp Đắk Lắk xanh mướt, sánh đặc mịn màng, béo ngậy hương sữa đặc và sữa tươi, điểm xuyết lớp dừa sấy giòn rụm và cơm dừa non hấp dẫn.",
    "prepTime": 10,
    "cookTime": 0,
    "totalTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-26T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 26,
    "nutrition": {
      "calories": 340,
      "protein": 6,
      "carbohydrates": 34,
      "fat": 21,
      "fiber": 7,
      "sodium": 65
    },
    "instructions": "Bước 1 (Bổ bơ sáp và tách lấy thịt bơ): Chọn bơ sáp chín mềm đều, bổ dọc bỏ hạt, lột vỏ và cắt thịt bơ thành miếng vuông (lưu ý không nạo sát vỏ xanh đậm để bơ không bị đắng).\nBước 2 (Xay nhuyễn bơ cùng sữa và đá bào): Cho thịt bơ, sữa tươi lạnh, sữa đặc và đá bào vào máy xay sinh tố, xay tốc độ cao trong 45 giây cho đến khi hỗn hợp sánh mịn hoàn toàn.\nBước 3 (Tạo vân sữa cốt dừa trên thành ly): Rưới nhẹ một vòng sữa đặc và nước cốt dừa quanh thành ly thủy tinh rồi rót sinh tố bơ xanh mướt vào đầy ly.\nBước 4 (Rắc dừa sấy giòn và thưởng thức): Phủ một lớp dừa khô sấy giòn hoặc vài hạt hạnh nhân lên mặt ly sinh tố bơ, dùng ngay khi còn lạnh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000054000001",
        "name": "Bơ sáp Đắk Lắk chín dẻo",
        "quantity": 2,
        "unit": "quả",
        "notes": "Bổ đôi bỏ hạt, nạo lấy phần thịt bơ vàng xanh",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000054000002",
        "name": "Sữa đặc có đường & sữa tươi lạnh",
        "quantity": 160,
        "unit": "ml",
        "notes": "60ml sữa đặc và 100ml sữa tươi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000054000003",
        "name": "Nước cốt dừa sánh",
        "quantity": 30,
        "unit": "ml",
        "notes": "Tăng hương thơm béo ngậy",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000054000004",
        "name": "Đá bào mịn & dừa sấy giòn",
        "quantity": 150,
        "unit": "g",
        "notes": "Xay nhuyễn và rắc mặt ly",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000054000001",
        "stepNumber": 1,
        "title": "Bổ bơ sáp và tách lấy thịt bơ",
        "description": "Chọn bơ sáp chín mềm đều, bổ dọc bỏ hạt, lột vỏ và cắt thịt bơ thành miếng vuông (lưu ý không nạo sát vỏ xanh đậm để bơ không bị đắng).",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000054000002",
        "stepNumber": 2,
        "title": "Xay nhuyễn bơ cùng sữa và đá bào",
        "description": "Cho thịt bơ, sữa tươi lạnh, sữa đặc và đá bào vào máy xay sinh tố, xay tốc độ cao trong 45 giây cho đến khi hỗn hợp sánh mịn hoàn toàn.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000054000003",
        "stepNumber": 3,
        "title": "Tạo vân sữa cốt dừa trên thành ly",
        "description": "Rưới nhẹ một vòng sữa đặc và nước cốt dừa quanh thành ly thủy tinh rồi rót sinh tố bơ xanh mướt vào đầy ly.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000054000004",
        "stepNumber": 4,
        "title": "Rắc dừa sấy giòn và thưởng thức",
        "description": "Phủ một lớp dừa khô sấy giòn hoặc vài hạt hạnh nhân lên mặt ly sinh tố bơ, dùng ngay khi còn lạnh.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000054000001",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "altText": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000054000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000054000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "sinh-to-bo-sap-sua-dac": {
    "id": "22222222-2222-4222-8222-000000000054",
    "title": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô",
    "slug": "sinh-to-bo-sap-sua-dac",
    "description": "Ly sinh tố bơ sáp Đắk Lắk xanh mướt, sánh đặc mịn màng, béo ngậy hương sữa đặc và sữa tươi, điểm xuyết lớp dừa sấy giòn rụm và cơm dừa non hấp dẫn.",
    "prepTime": 10,
    "cookTime": 0,
    "totalTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-26T08:30:00Z",
    "averageRating": 4.8,
    "reviewCount": 26,
    "nutrition": {
      "calories": 340,
      "protein": 6,
      "carbohydrates": 34,
      "fat": 21,
      "fiber": 7,
      "sodium": 65
    },
    "instructions": "Bước 1 (Bổ bơ sáp và tách lấy thịt bơ): Chọn bơ sáp chín mềm đều, bổ dọc bỏ hạt, lột vỏ và cắt thịt bơ thành miếng vuông (lưu ý không nạo sát vỏ xanh đậm để bơ không bị đắng).\nBước 2 (Xay nhuyễn bơ cùng sữa và đá bào): Cho thịt bơ, sữa tươi lạnh, sữa đặc và đá bào vào máy xay sinh tố, xay tốc độ cao trong 45 giây cho đến khi hỗn hợp sánh mịn hoàn toàn.\nBước 3 (Tạo vân sữa cốt dừa trên thành ly): Rưới nhẹ một vòng sữa đặc và nước cốt dừa quanh thành ly thủy tinh rồi rót sinh tố bơ xanh mướt vào đầy ly.\nBước 4 (Rắc dừa sấy giòn và thưởng thức): Phủ một lớp dừa khô sấy giòn hoặc vài hạt hạnh nhân lên mặt ly sinh tố bơ, dùng ngay khi còn lạnh.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000054000001",
        "name": "Bơ sáp Đắk Lắk chín dẻo",
        "quantity": 2,
        "unit": "quả",
        "notes": "Bổ đôi bỏ hạt, nạo lấy phần thịt bơ vàng xanh",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000054000002",
        "name": "Sữa đặc có đường & sữa tươi lạnh",
        "quantity": 160,
        "unit": "ml",
        "notes": "60ml sữa đặc và 100ml sữa tươi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000054000003",
        "name": "Nước cốt dừa sánh",
        "quantity": 30,
        "unit": "ml",
        "notes": "Tăng hương thơm béo ngậy",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000054000004",
        "name": "Đá bào mịn & dừa sấy giòn",
        "quantity": 150,
        "unit": "g",
        "notes": "Xay nhuyễn và rắc mặt ly",
        "orderIndex": 4
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000054000001",
        "stepNumber": 1,
        "title": "Bổ bơ sáp và tách lấy thịt bơ",
        "description": "Chọn bơ sáp chín mềm đều, bổ dọc bỏ hạt, lột vỏ và cắt thịt bơ thành miếng vuông (lưu ý không nạo sát vỏ xanh đậm để bơ không bị đắng).",
        "timerMinutes": 4,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000054000002",
        "stepNumber": 2,
        "title": "Xay nhuyễn bơ cùng sữa và đá bào",
        "description": "Cho thịt bơ, sữa tươi lạnh, sữa đặc và đá bào vào máy xay sinh tố, xay tốc độ cao trong 45 giây cho đến khi hỗn hợp sánh mịn hoàn toàn.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000054000003",
        "stepNumber": 3,
        "title": "Tạo vân sữa cốt dừa trên thành ly",
        "description": "Rưới nhẹ một vòng sữa đặc và nước cốt dừa quanh thành ly thủy tinh rồi rót sinh tố bơ xanh mướt vào đầy ly.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000054000004",
        "stepNumber": 4,
        "title": "Rắc dừa sấy giòn và thưởng thức",
        "description": "Phủ một lớp dừa khô sấy giòn hoặc vài hạt hạnh nhân lên mặt ly sinh tố bơ, dùng ngay khi còn lạnh.",
        "timerMinutes": 2,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000054000001",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
        "altText": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000054000002",
        "originalUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
        "altText": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000054000003",
        "originalUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
        "altText": "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "22222222-2222-4222-8222-000000000055": {
    "id": "22222222-2222-4222-8222-000000000055",
    "title": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox",
    "slug": "nuoc-ep-can-tay-tao-xanh-detox",
    "description": "Thức uống xanh thanh lọc cơ thể (Detox) giàu vitamin và chất chống oxy hóa, kết hợp cần tây tươi mát với vị ngọt dịu của táo xanh, dứa mật và hương gừng ấm nhẹ rất dễ uống.",
    "prepTime": 15,
    "cookTime": 0,
    "totalTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-27T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 29,
    "nutrition": {
      "calories": 115,
      "protein": 2,
      "carbohydrates": 27,
      "fat": 0,
      "fiber": 3,
      "sodium": 85
    },
    "instructions": "Bước 1 (Ngâm rửa sạch cần tây và trái cây): Ngâm cần tây và táo xanh trong nước muối loãng 10 phút rồi rửa sạch để ráo. Cắt khúc cần tây, táo xanh bỏ lõi hạt, dứa mật cắt miếng vừa miệng máy ép.\nBước 2 (Ép chậm giữ trọn enzyme và vitamin): Lần lượt cho cần tây xen kẽ với táo xanh, dứa mật và lát gừng mỏng vào máy ép chậm để bã được đẩy ra hết và thu được lượng nước ép xanh ngọc tối đa.\nBước 3 (Pha nước cốt chanh và mật ong): Thêm 1 muỗng cà phê nước cốt chanh vàng và chút mật ong vào bình nước ép, khuấy đều để giữ màu xanh tươi không bị oxy hóa.\nBước 4 (Rót ra ly đá lạnh thưởng thức): Rót nước ép cần tây táo dứa ra ly có đá viên, trang trí với lát táo xanh và cọng cần tây non, uống ngay trong ngày.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000055000001",
        "name": "Bẹ cần tây Đà Lạt tươi non",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch, cắt khúc 4cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000055000002",
        "name": "Táo xanh (Granny Smith)",
        "quantity": 2,
        "unit": "quả",
        "notes": "Rửa muối, bỏ hạt cắt múi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000055000003",
        "name": "Dứa mật (thơm) chín",
        "quantity": 150,
        "unit": "g",
        "notes": "Gọt vỏ bỏ mắt, cắt miếng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000055000004",
        "name": "Gừng tươi & cốt chanh vàng",
        "quantity": 15,
        "unit": "g",
        "notes": "Khử mùi hăng của cần tây",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000055000005",
        "name": "Mật ong nguyên chất & đá viên",
        "quantity": 20,
        "unit": "ml",
        "notes": "Tùy chọn thêm vị ngọt tự nhiên",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000055000001",
        "stepNumber": 1,
        "title": "Ngâm rửa sạch cần tây và trái cây",
        "description": "Ngâm cần tây và táo xanh trong nước muối loãng 10 phút rồi rửa sạch để ráo. Cắt khúc cần tây, táo xanh bỏ lõi hạt, dứa mật cắt miếng vừa miệng máy ép.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000055000002",
        "stepNumber": 2,
        "title": "Ép chậm giữ trọn enzyme và vitamin",
        "description": "Lần lượt cho cần tây xen kẽ với táo xanh, dứa mật và lát gừng mỏng vào máy ép chậm để bã được đẩy ra hết và thu được lượng nước ép xanh ngọc tối đa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000055000003",
        "stepNumber": 3,
        "title": "Pha nước cốt chanh và mật ong",
        "description": "Thêm 1 muỗng cà phê nước cốt chanh vàng và chút mật ong vào bình nước ép, khuấy đều để giữ màu xanh tươi không bị oxy hóa.",
        "timerMinutes": 1,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000055000004",
        "stepNumber": 4,
        "title": "Rót ra ly đá lạnh thưởng thức",
        "description": "Rót nước ép cần tây táo dứa ra ly có đá viên, trang trí với lát táo xanh và cọng cần tây non, uống ngay trong ngày.",
        "timerMinutes": 1,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000055000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000055000002",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "altText": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000055000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  },
  "nuoc-ep-can-tay-tao-xanh-detox": {
    "id": "22222222-2222-4222-8222-000000000055",
    "title": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox",
    "slug": "nuoc-ep-can-tay-tao-xanh-detox",
    "description": "Thức uống xanh thanh lọc cơ thể (Detox) giàu vitamin và chất chống oxy hóa, kết hợp cần tây tươi mát với vị ngọt dịu của táo xanh, dứa mật và hương gừng ấm nhẹ rất dễ uống.",
    "prepTime": 15,
    "cookTime": 0,
    "totalTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "status": "Published",
    "categoryId": "11111111-1111-4111-8111-000000000012",
    "categoryName": "Thức Uống & Sinh Tố",
    "authorId": "admin-user-id",
    "authorName": "Quản Trị Viên Hệ Thống",
    "coverImageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
    "createdAt": "2026-04-27T08:30:00Z",
    "averageRating": 4.9,
    "reviewCount": 29,
    "nutrition": {
      "calories": 115,
      "protein": 2,
      "carbohydrates": 27,
      "fat": 0,
      "fiber": 3,
      "sodium": 85
    },
    "instructions": "Bước 1 (Ngâm rửa sạch cần tây và trái cây): Ngâm cần tây và táo xanh trong nước muối loãng 10 phút rồi rửa sạch để ráo. Cắt khúc cần tây, táo xanh bỏ lõi hạt, dứa mật cắt miếng vừa miệng máy ép.\nBước 2 (Ép chậm giữ trọn enzyme và vitamin): Lần lượt cho cần tây xen kẽ với táo xanh, dứa mật và lát gừng mỏng vào máy ép chậm để bã được đẩy ra hết và thu được lượng nước ép xanh ngọc tối đa.\nBước 3 (Pha nước cốt chanh và mật ong): Thêm 1 muỗng cà phê nước cốt chanh vàng và chút mật ong vào bình nước ép, khuấy đều để giữ màu xanh tươi không bị oxy hóa.\nBước 4 (Rót ra ly đá lạnh thưởng thức): Rót nước ép cần tây táo dứa ra ly có đá viên, trang trí với lát táo xanh và cọng cần tây non, uống ngay trong ngày.",
    "category": {
      "id": "11111111-1111-4111-8111-000000000012",
      "name": "Thức Uống & Sinh Tố",
      "slug": "thuc-uong-sinh-to",
      "description": "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.",
      "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
      "orderIndex": 12,
      "recipeCount": 4
    },
    "ingredients": [
      {
        "id": "33333333-3333-4333-8333-000055000001",
        "name": "Bẹ cần tây Đà Lạt tươi non",
        "quantity": 250,
        "unit": "g",
        "notes": "Rửa sạch, cắt khúc 4cm",
        "orderIndex": 1
      },
      {
        "id": "33333333-3333-4333-8333-000055000002",
        "name": "Táo xanh (Granny Smith)",
        "quantity": 2,
        "unit": "quả",
        "notes": "Rửa muối, bỏ hạt cắt múi",
        "orderIndex": 2
      },
      {
        "id": "33333333-3333-4333-8333-000055000003",
        "name": "Dứa mật (thơm) chín",
        "quantity": 150,
        "unit": "g",
        "notes": "Gọt vỏ bỏ mắt, cắt miếng",
        "orderIndex": 3
      },
      {
        "id": "33333333-3333-4333-8333-000055000004",
        "name": "Gừng tươi & cốt chanh vàng",
        "quantity": 15,
        "unit": "g",
        "notes": "Khử mùi hăng của cần tây",
        "orderIndex": 4
      },
      {
        "id": "33333333-3333-4333-8333-000055000005",
        "name": "Mật ong nguyên chất & đá viên",
        "quantity": 20,
        "unit": "ml",
        "notes": "Tùy chọn thêm vị ngọt tự nhiên",
        "orderIndex": 5
      }
    ],
    "steps": [
      {
        "id": "44444444-4444-4444-8444-000055000001",
        "stepNumber": 1,
        "title": "Ngâm rửa sạch cần tây và trái cây",
        "description": "Ngâm cần tây và táo xanh trong nước muối loãng 10 phút rồi rửa sạch để ráo. Cắt khúc cần tây, táo xanh bỏ lõi hạt, dứa mật cắt miếng vừa miệng máy ép.",
        "timerMinutes": 10,
        "imageUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000055000002",
        "stepNumber": 2,
        "title": "Ép chậm giữ trọn enzyme và vitamin",
        "description": "Lần lượt cho cần tây xen kẽ với táo xanh, dứa mật và lát gừng mỏng vào máy ép chậm để bã được đẩy ra hết và thu được lượng nước ép xanh ngọc tối đa.",
        "timerMinutes": 3,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000055000003",
        "stepNumber": 3,
        "title": "Pha nước cốt chanh và mật ong",
        "description": "Thêm 1 muỗng cà phê nước cốt chanh vàng và chút mật ong vào bình nước ép, khuấy đều để giữ màu xanh tươi không bị oxy hóa.",
        "timerMinutes": 1,
        "imageUrl": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
      },
      {
        "id": "44444444-4444-4444-8444-000055000004",
        "stepNumber": 4,
        "title": "Rót ra ly đá lạnh thưởng thức",
        "description": "Rót nước ép cần tây táo dứa ra ly có đá viên, trang trí với lát táo xanh và cọng cần tây non, uống ngay trong ngày.",
        "timerMinutes": 1,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      }
    ],
    "images": [
      {
        "id": "55555555-5555-4555-8555-000055000001",
        "originalUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
        "altText": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox",
        "isPrimary": true,
        "orderIndex": 0
      },
      {
        "id": "55555555-5555-4555-8555-000055000002",
        "originalUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80",
        "altText": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox - Hình minh họa 2",
        "isPrimary": false,
        "orderIndex": 1
      },
      {
        "id": "55555555-5555-4555-8555-000055000003",
        "originalUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "mediumUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "thumbnailUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
        "altText": "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox - Hình minh họa 3",
        "isPrimary": false,
        "orderIndex": 2
      }
    ]
  }
};

const USER_RECIPES_STORAGE_KEY = 'culinary_blog_user_recipes_v1';
const USER_RECIPE_DETAILS_STORAGE_KEY = 'culinary_blog_user_recipe_details_v1';

function getStoredUserRecipes(): RecipeSummaryDto[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(USER_RECIPES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getStoredUserRecipeDetails(): Record<string, RecipeDetailDto> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(USER_RECIPE_DETAILS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUserRecipeDetailLocal(detail: RecipeDetailDto) {
  if (typeof window === 'undefined') return;
  try {
    const map = getStoredUserRecipeDetails();
    map[detail.id] = detail;
    if (detail.slug) {
      map[detail.slug] = detail;
    }
    window.localStorage.setItem(USER_RECIPE_DETAILS_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function getRecipeDetailByIdOrSlug(idOrSlug: string): RecipeDetailDto | null {
  if (!idOrSlug) return null;
  const userDetails = getStoredUserRecipeDetails();
  if (userDetails[idOrSlug]) return userDetails[idOrSlug];
  if (INITIAL_RECIPE_DETAILS[idOrSlug]) return INITIAL_RECIPE_DETAILS[idOrSlug];

  const found = getAllRecipesCombined().find(
    (r) => r.id === idOrSlug || r.slug === idOrSlug
  );
  if (!found) return null;
  return INITIAL_RECIPE_DETAILS[found.id] || INITIAL_RECIPE_DETAILS[found.slug] || null;
}

export function getAllRecipesCombined(): RecipeSummaryDto[] {
  const local = getStoredUserRecipes();
  if (local.length === 0) return INITIAL_RECIPES;
  const seen = new Set(local.map((r) => r.id));
  return [...local, ...INITIAL_RECIPES.filter((r) => !seen.has(r.id))];
}

function normalizeVi(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

/**
 * Tìm kiếm, lọc theo chuyên mục, độ khó và sắp xếp trên kho 55+ công thức thực tế
 */
export function searchRecipes(params: RecipeSearchParams): PagedResult<RecipeSummaryDto> {
  const {
    keyword = '',
    categoryId = 'all',
    difficulty = 'all',
    sort = '-createdAt',
    page = 1,
    pageSize = 9,
  } = params;

  let filtered = [...getAllRecipesCombined()];

  // 1. Lọc theo từ khóa tìm kiếm (Hỗ trợ cả tiếng Việt có dấu và không dấu)
  if (keyword.trim()) {
    const rawTerm = keyword.toLowerCase().trim();
    const normTerm = normalizeVi(keyword);
    filtered = filtered.filter((r) => {
      const matchRaw =
        r.title.toLowerCase().includes(rawTerm) ||
        r.description.toLowerCase().includes(rawTerm) ||
        (r.categoryName && r.categoryName.toLowerCase().includes(rawTerm)) ||
        (r.authorName && r.authorName.toLowerCase().includes(rawTerm));
      if (matchRaw) return true;
      return (
        normalizeVi(r.title).includes(normTerm) ||
        normalizeVi(r.description).includes(normTerm) ||
        normalizeVi(r.categoryName || '').includes(normTerm) ||
        normalizeVi(r.authorName || '').includes(normTerm)
      );
    });
  }

  // 2. Lọc theo danh mục (hỗ trợ cả ID và Slug)
  if (categoryId && categoryId !== 'all') {
    const matchedCat = CATEGORIES.find(
      (c) => c.id === categoryId || c.slug === categoryId
    );
    filtered = filtered.filter(
      (r) =>
        r.categoryId === categoryId ||
        (matchedCat && (r.categoryId === matchedCat.id || r.categoryName === matchedCat.name))
    );
  }

  // 3. Lọc theo độ khó
  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter(
      (r) => String(r.difficulty ?? '').toLowerCase() === String(difficulty).toLowerCase()
    );
  }

  // 4. Sắp xếp (Ưu tiên các công thức vừa tạo mới lên đầu danh sách khi chọn Mới nhất)
  if (sort) {
    const isDesc = sort.startsWith('-');
    const field = sort.replace(/^[-+]/, '');
    const localRecipes = getStoredUserRecipes();
    const localOrderMap = new Map(localRecipes.map((r, idx) => [r.id, idx]));

    filtered.sort((a, b) => {
      if (field === 'createdAt' && isDesc) {
        const aIsLocal = localOrderMap.has(a.id);
        const bIsLocal = localOrderMap.has(b.id);
        if (aIsLocal && !bIsLocal) return -1;
        if (!aIsLocal && bIsLocal) return 1;
        if (aIsLocal && bIsLocal) {
          return (localOrderMap.get(a.id) ?? 0) - (localOrderMap.get(b.id) ?? 0);
        }
      }

      let valA: any = (a as any)[field];
      let valB: any = (b as any)[field];

      if (field === 'createdAt') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (typeof valA === 'string') {
        return isDesc ? valB.localeCompare(valA, 'vi') : valA.localeCompare(valB, 'vi');
      }

      return isDesc ? (valB ?? 0) - (valA ?? 0) : (valA ?? 0) - (valB ?? 0);
    });
  }

  // 5. Phân trang
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startIndex = (page - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  return {
    items,
    pageNumber: page,
    pageSize,
    totalCount,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}
