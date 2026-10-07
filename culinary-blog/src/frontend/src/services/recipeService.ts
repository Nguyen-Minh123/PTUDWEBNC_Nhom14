import { RecipeSummaryDto, RecipeSearchParams, PagedResult } from '../types';

/**
/// <summary>
/// Dữ liệu mẫu ban đầu về các món ăn Việt Nam truyền thống và hiện đại
/// Sử dụng cấu trúc RecipeSummaryDto (tương thích Mapster ProjectToType)
/// </summary>
*/
export const INITIAL_RECIPES: RecipeSummaryDto[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    title: 'Phở Bò Tái Nạm Truyền Thống Hà Nội',
    slug: 'pho-bo-tai-nam-ha-noi',
    description: 'Hương vị phở chuẩn Bắc với nước dùng hầm xương trong vắt, thơm mùi quế, hồi, thảo quả kết hợp cùng thịt bò mềm ngọt.',
    prepTime: 30,
    cookTime: 120,
    totalTime: 150,
    servings: 4,
    difficulty: 'Medium',
    status: 'Published',
    categoryId: 'cat-1',
    categoryName: 'Món Nước & Bún Phở',
    authorId: 'chef-01',
    authorName: 'Đầu Bếp Hoàng Tuấn',
    coverImageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-25T08:00:00Z',
    averageRating: 4.9,
    reviewCount: 28,
  },
  {
    id: 'a12bc34d-58cc-4372-a567-0e02b2c3d480',
    title: 'Bún Bò Huế Đậm Đà Cố Đô',
    slug: 'bun-bo-hue-dam-da',
    description: 'Tô bún bò cay nồng mùi sả, thơm đậm mắm ruốc cùng thịt bắp bò, chả cua và tiết luộc đúng điệu xứ Huế.',
    prepTime: 40,
    cookTime: 90,
    totalTime: 130,
    servings: 6,
    difficulty: 'Hard',
    status: 'Published',
    categoryId: 'cat-1',
    categoryName: 'Món Nước & Bún Phở',
    authorId: 'chef-02',
    authorName: 'Mẹ Hạnh Cố Đô',
    coverImageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-24T14:30:00Z',
    averageRating: 4.8,
    reviewCount: 19,
  },
  {
    id: 'b23cd45e-58cc-4372-a567-0e02b2c3d481',
    title: 'Cơm Tấm Sườn Bì Chả Sài Gòn',
    slug: 'com-tam-suon-bi-cha-sai-gon',
    description: 'Miếng sườn nướng mật ong thơm phức, bì trộn thính giòn dai kết hợp chả trứng nướng béo ngậy và nước mắm chua ngọt kẹo.',
    prepTime: 25,
    cookTime: 35,
    totalTime: 60,
    servings: 2,
    difficulty: 'Medium',
    status: 'Published',
    categoryId: 'cat-2',
    categoryName: 'Món Cơm & Xôi',
    authorId: 'chef-03',
    authorName: 'Bếp Nhà Sài Gòn',
    coverImageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-23T10:15:00Z',
    averageRating: 4.9,
    reviewCount: 35,
  },
  {
    id: 'c34de56f-58cc-4372-a567-0e02b2c3d482',
    title: 'Cá Bống Kho Tiêu Nồi Đất',
    slug: 'ca-bong-kho-tieu-noi-dat',
    description: 'Món ăn gia đình dân dã với cá kho săn chắc, thấm đẫm màu cánh gián caramel, cay nồng ớt hiểm và hạt tiêu xanh.',
    prepTime: 15,
    cookTime: 45,
    totalTime: 60,
    servings: 4,
    difficulty: 'Easy',
    status: 'Published',
    categoryId: 'cat-3',
    categoryName: 'Món Kho & Rim',
    authorId: 'chef-01',
    authorName: 'Đầu Bếp Hoàng Tuấn',
    coverImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-22T17:20:00Z',
    averageRating: 4.7,
    reviewCount: 14,
  },
  {
    id: 'd45ef67a-58cc-4372-a567-0e02b2c3d483',
    title: 'Canh Chua Cá Lóc Nam Bộ',
    slug: 'canh-chua-ca-loc-nam-bo',
    description: 'Vị chua thanh mát từ me dầm, ngát hương ngò gai om cùng bạc hà, đậu bắp, dứa ngọt và cá lóc đồng tươi sống.',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: 'Easy',
    status: 'Published',
    categoryId: 'cat-4',
    categoryName: 'Món Canh & Súp',
    authorId: 'chef-02',
    authorName: 'Mẹ Hạnh Cố Đô',
    coverImageUrl: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-21T11:00:00Z',
    averageRating: 4.6,
    reviewCount: 12,
  },
  {
    id: 'e56fa78b-58cc-4372-a567-0e02b2c3d484',
    title: 'Gỏi Cuốn Tôm Thịt Thanh Mát',
    slug: 'goi-cuon-tom-thit-thanh-mat',
    description: 'Bánh tráng dẻo cuốn chặt tay với tôm luộc đỏ au, thịt ba chỉ, bún tươi và các loại rau thơm, chấm tương đen xay bùi béo.',
    prepTime: 20,
    cookTime: 10,
    totalTime: 30,
    servings: 3,
    difficulty: 'Easy',
    status: 'Published',
    categoryId: 'cat-5',
    categoryName: 'Món Khai Vị & Ăn Vặt',
    authorId: 'chef-03',
    authorName: 'Bếp Nhà Sài Gòn',
    coverImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-20T09:45:00Z',
    averageRating: 4.9,
    reviewCount: 22,
  },
  {
    id: 'f67ab89c-58cc-4372-a567-0e02b2c3d485',
    title: 'Chè Hạt Sen Long Nhãn Hưng Yên',
    slug: 'che-hat-sen-long-nhan-hung-yen',
    description: 'Món tráng miệng thanh tao quý phái, hạt sen bùi ngậy lồng trong cùi nhãn giòn ngọt, ướp hoa nhài thoang thoảng.',
    prepTime: 30,
    cookTime: 40,
    totalTime: 70,
    servings: 4,
    difficulty: 'Medium',
    status: 'Published',
    categoryId: 'cat-6',
    categoryName: 'Món Tráng Miệng & Chè',
    authorId: 'chef-01',
    authorName: 'Đầu Bếp Hoàng Tuấn',
    coverImageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-03-19T15:10:00Z',
    averageRating: 4.8,
    reviewCount: 16,
  },
];

export const CATEGORIES = [
  { id: 'all', name: 'Tất Cả Danh Mục' },
  { id: 'cat-1', name: 'Món Nước & Bún Phở' },
  { id: 'cat-2', name: 'Món Cơm & Xôi' },
  { id: 'cat-3', name: 'Món Kho & Rim' },
  { id: 'cat-4', name: 'Món Canh & Súp' },
  { id: 'cat-5', name: 'Món Khai Vị & Ăn Vặt' },
  { id: 'cat-6', name: 'Món Tráng Miệng & Chè' },
];

/**
/// <summary>
/// Service tìm kiếm và lọc danh sách Recipe theo các tiêu chí:
/// - keyword: tìm kiếm theo tên hoặc mô tả món ăn
/// - categoryId: lọc theo danh mục
/// - difficulty: lọc theo độ khó
/// - sort: sắp xếp linh hoạt (?sort=-field)
/// - page / pageSize: phân trang trả về PagedResult
/// </summary>
*/
export function searchRecipes(params: RecipeSearchParams): PagedResult<RecipeSummaryDto> {
  const {
    keyword = '',
    categoryId = 'all',
    difficulty = 'all',
    sort = '-createdAt',
    page = 1,
    pageSize = 6,
  } = params;

  let filtered = [...INITIAL_RECIPES];

  // 1. Lọc theo từ khóa tìm kiếm (Full-Text Search mô phỏng)
  if (keyword.trim()) {
    const term = keyword.toLowerCase().trim();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.categoryName?.toLowerCase().includes(term)
    );
  }

  // 2. Lọc theo danh mục
  if (categoryId && categoryId !== 'all') {
    filtered = filtered.filter((r) => r.categoryId === categoryId);
  }

  // 3. Lọc theo độ khó
  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter((r) => r.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  // 4. Áp dụng sắp xếp chuẩn (?sort=-field)
  if (sort) {
    const isDesc = sort.startsWith('-');
    const field = sort.replace(/^[-+]/, '');

    filtered.sort((a, b) => {
      let valA: any = (a as any)[field];
      let valB: any = (b as any)[field];

      if (field === 'createdAt') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (typeof valA === 'string') {
        return isDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }

      return isDesc ? valB - valA : valA - valB;
    });
  }

  // 5. Phân trang
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
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
