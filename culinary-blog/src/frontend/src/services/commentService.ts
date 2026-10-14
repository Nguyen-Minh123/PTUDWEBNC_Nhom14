import { CommentDto, CreateCommentRequest } from '../types';

/**
/// <summary>
/// Dữ liệu bình luận mẫu lưu trữ cục bộ
/// </summary>
*/
const INITIAL_COMMENTS: CommentDto[] = [
  {
    id: 'comm-001',
    recipeId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Phở Bò
    authorId: 'user-01',
    authorName: 'Lê Thu Hương',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Công thức nước dùng quá xuất sắc! Nước ngọt thanh từ xương bò hầm đúng chuẩn Bắc, gia đình mình ai cũng khen tấm tắc.',
    createdAt: '2026-03-26T14:20:00Z',
    likesCount: 12,
  },
  {
    id: 'comm-002',
    recipeId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Phở Bò
    authorId: 'user-02',
    authorName: 'Trần Văn Mạnh',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Mẹo nướng hành tây và gừng trước khi bỏ vào nồi nước dùng giúp mùi thơm dậy lên ngào ngạt. Cảm ơn tác giả nhiều!',
    createdAt: '2026-03-27T09:15:00Z',
    likesCount: 8,
  },
  {
    id: 'comm-003',
    recipeId: 'a12bc34d-58cc-4372-a567-0e02b2c3d480', // Bún Bò Huế
    authorId: 'user-03',
    authorName: 'Nguyễn Bích Ngọc',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Mắm ruốc nêm rất vừa vặn, không bị tanh mà lại cay nồng đậm vị Huế. 10/10 cho công thức này!',
    createdAt: '2026-03-25T19:40:00Z',
    likesCount: 15,
  },
  {
    id: 'comm-004',
    recipeId: 'b23cd45e-58cc-4372-a567-0e02b2c3d481', // Cơm Tấm
    authorId: 'user-04',
    authorName: 'Phạm Quốc Bảo',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rating: 4,
    content: 'Sườn ướp rất mềm và thấm vị. Chả trứng thì thơm béo ăn kèm mắm chua ngọt chuẩn vị Sài Gòn luôn.',
    createdAt: '2026-03-24T12:00:00Z',
    likesCount: 6,
  },
];

let commentsStore: CommentDto[] = [...INITIAL_COMMENTS];

/**
/// <summary>
/// Lấy danh sách bình luận theo mã công thức (RecipeId)
/// </summary>
*/
export function getCommentsByRecipeId(recipeId: string): CommentDto[] {
  return commentsStore
    .filter((c) => c.recipeId === recipeId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
/// <summary>
/// Thêm một bình luận & đánh giá mới cho công thức
/// </summary>
*/
export function addComment(req: CreateCommentRequest): CommentDto {
  const newComment: CommentDto = {
    id: `comm-${Date.now()}`,
    recipeId: req.recipeId,
    authorId: `guest-${Date.now()}`,
    authorName: req.authorName.trim() || 'Người Ẩm Thực',
    authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(req.authorName)}`,
    rating: Math.min(5, Math.max(1, req.rating)),
    content: req.content.trim(),
    createdAt: new Date().toISOString(),
    likesCount: 0,
  };

  commentsStore = [newComment, ...commentsStore];
  return newComment;
}

/**
/// <summary>
/// Tăng lượt thích cho bình luận
/// </summary>
*/
export function likeComment(commentId: string): boolean {
  const comment = commentsStore.find((c) => c.id === commentId);
  if (comment) {
    comment.likesCount = (comment.likesCount || 0) + 1;
    return true;
  }
  return false;
}
