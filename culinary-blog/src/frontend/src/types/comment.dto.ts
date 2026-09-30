/**
/// <summary>
/// DTO đại diện cho bình luận & đánh giá công thức nấu ăn
/// Đồng bộ với CommentDto tại Backend .NET
/// </summary>
*/
export interface CommentDto {
  id: string;
  recipeId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  rating: number; // 1 đến 5 sao
  content: string;
  createdAt: string;
  likesCount?: number;
}

export interface CreateCommentRequest {
  recipeId: string;
  authorName: string;
  rating: number;
  content: string;
}
