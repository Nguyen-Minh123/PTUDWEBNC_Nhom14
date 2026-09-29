'use client';

import React, { useState, useEffect } from 'react';
import { CommentDto } from '../../types';
import { getCommentsByRecipeId, addComment, likeComment } from '../../services/commentService';

interface CommentSectionProps {
  recipeId: string;
  recipeTitle: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ recipeId, recipeTitle }) => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Tải danh sách bình luận khi recipeId thay đổi
  useEffect(() => {
    const list = getCommentsByRecipeId(recipeId);
    setComments(list);
    setSuccessMessage('');
  }, [recipeId]);

  // Xử lý gửi bình luận
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    const newComment = addComment({
      recipeId,
      authorName: authorName.trim() || 'Người Ẩm Thực',
      rating,
      content,
    });

    setComments((prev) => [newComment, ...prev]);
    setContent('');
    setIsSubmitting(false);
    setSuccessMessage('Bình luận và đánh giá của bạn đã được đăng thành công!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // Xử lý thả tim/like bình luận
  const handleLike = (commentId: string) => {
    const success = likeComment(commentId);
    if (success) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likesCount: (c.likesCount || 0) + 1 } : c
        )
      );
    }
  };

  const averageRating =
    comments.length > 0
      ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
      : '5.0';

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
      {/* Header & Thống kê đánh giá */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Bình luận & Đánh giá công thức
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Chia sẻ cảm nhận hoặc bí quyết nấu món <span className="font-semibold text-amber-700">{recipeTitle}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50/80 px-4 py-2.5 rounded-xl border border-amber-200/60">
          <div className="text-2xl font-black text-amber-600">{averageRating}</div>
          <div>
            <div className="flex text-amber-500 text-sm">
              {'★'.repeat(Math.round(Number(averageRating)))}
              {'☆'.repeat(5 - Math.round(Number(averageRating)))}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Dựa trên {comments.length} đánh giá
            </div>
          </div>
        </div>
      </div>

      {/* Form gửi bình luận mới */}
      <form onSubmit={handleSubmit} className="my-6 bg-gray-50/80 p-5 rounded-xl border border-gray-200/80">
        <h4 className="text-sm font-bold text-gray-800 mb-3">
          Viết đánh giá của bạn
        </h4>

        {/* Chọn số sao */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-600 font-medium">Đánh giá của bạn:</span>
          <div className="flex items-center gap-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl transition-transform hover:scale-110 focus:outline-none"
              >
                <span
                  className={
                    star <= (hoverRating || rating) ? 'text-amber-500' : 'text-gray-300'
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-amber-600 ml-1">
            {rating === 5 && 'Tuyệt vời! 🌟'}
            {rating === 4 && 'Rất ngon! 👍'}
            {rating === 3 && 'Bình thường 👌'}
            {rating === 2 && 'Cần cải thiện ⚠️'}
            {rating === 1 && 'Chưa đạt ❌'}
          </span>
        </div>

        {/* Tên người bình luận */}
        <div className="mb-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Tên của bạn (ví dụ: Bùi Trung Hiếu)..."
            className="w-full sm:w-80 px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        {/* Nội dung bình luận */}
        <div className="mb-3">
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đã nấu thử món này chưa? Hãy chia sẻ hương vị, mẹo hay hoặc góp ý cho tác giả nhé..."
            className="w-full p-3 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 resize-none"
          />
        </div>

        {/* Nút gửi */}
        <div className="flex items-center justify-between">
          {successMessage ? (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              ✓ {successMessage}
            </span>
          ) : (
            <span className="text-[11px] text-gray-400">
              Bình luận sẽ hiển thị ngay lập tức.
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg text-xs shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang gửi...' : 'Đăng Bình Luận'}
          </button>
        </div>
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs">
            Chưa có bình luận nào cho công thức này. Hãy là người đầu tiên để lại đánh giá!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      comment.authorAvatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                        comment.authorName
                      )}`
                    }
                    alt={comment.authorName}
                    className="w-9 h-9 rounded-full border border-amber-200 bg-amber-50 object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">
                      {comment.authorName}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(comment.rating)}
                        {'☆'.repeat(5 - comment.rating)}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-rose-500 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50"
                  title="Thích bình luận này"
                >
                  <span>❤️</span>
                  <span className="font-semibold text-[11px]">
                    {comment.likesCount || 0}
                  </span>
                </button>
              </div>

              <p className="text-xs text-gray-700 mt-3 leading-relaxed pl-12">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
