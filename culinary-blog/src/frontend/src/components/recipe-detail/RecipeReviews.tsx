'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Star, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

const mockReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Nguyễn Thị Mai',
    rating: 5,
    date: '2 ngày trước',
    comment: 'Công thức nấu nước dùng chuẩn Bắc rất thanh và ngọt sâu từ xương hầm. Cả nhà mình ai ăn cũng tấm tắc khen ngợi!',
    likes: 12,
  },
  {
    id: 'rev-2',
    authorName: 'Trần Văn Nam',
    rating: 5,
    date: '1 tuần trước',
    comment: 'Các bước hướng dẫn rất chi tiết, dễ làm cho người mới bắt đầu nấu ăn như mình. Cảm ơn tác giả nhiều!',
    likes: 8,
  },
  {
    id: 'rev-3',
    authorName: 'Lê Thu Trang',
    rating: 4,
    date: '2 tuần trước',
    comment: 'Món ăn rất ngon, mình gia giảm thêm xíu ớt để cay nồng hơn thì chuẩn gu luôn.',
    likes: 4,
  },
];

export function RecipeReviews({ recipeId }: { recipeId: string }) {
  const [reviews, setReviews] = React.useState<ReviewItem[]>(mockReviews);
  const [newComment, setNewComment] = React.useState('');
  const [newRating, setNewRating] = React.useState(5);
  const [likedMap, setLikedMap] = React.useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: 'Bạn (Người dùng Culinary)',
      rating: newRating,
      date: 'Vừa xong',
      comment: newComment.trim(),
      likes: 0,
    };

    setReviews([review, ...reviews]);
    setNewComment('');
  };

  return (
    <Card className="border-stone-200/80 shadow-xs dark:border-stone-800">
      <CardHeader className="pb-3 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-amber-600" />
          <CardTitle className="text-lg font-bold">Đánh Giá & Nhận Xét Từ Cộng Đồng</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Rating Breakdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-4 rounded-xl bg-amber-50/50 border border-amber-100/60 dark:bg-stone-800/40 dark:border-stone-800">
          <div className="text-center sm:pr-6 sm:border-r border-amber-200/60 dark:border-stone-700">
            <span className="text-4xl font-black text-amber-700 dark:text-amber-400">4.9</span>
            <div className="flex items-center justify-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-1">Dựa trên {reviews.length} đánh giá</p>
          </div>

          <div className="flex-1 space-y-1.5 text-xs">
            {[
              { star: 5, pct: 85 },
              { star: 4, pct: 12 },
              { star: 3, pct: 3 },
              { star: 2, pct: 0 },
              { star: 1, pct: 0 },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-2">
                <span className="w-10 text-stone-600 dark:text-stone-400 font-medium">{bar.star} sao</span>
                <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden dark:bg-stone-700">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${bar.pct}%` }} />
                </div>
                <span className="w-8 text-right text-stone-500">{bar.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="space-y-3 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">Để lại cảm nhận của bạn</h4>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Đánh giá của bạn:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={cn(
                      'h-5 w-5 transition-colors',
                      star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Chia sẻ kinh nghiệm hoặc cảm nhận của bạn sau khi nấu thử món ăn..."
            rows={3}
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 bg-white dark:bg-stone-950 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="flex justify-end">
            <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-xs font-semibold gap-1.5">
              <Send className="h-3.5 w-3.5" />
              <span>Gửi đánh giá</span>
            </Button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="divide-y divide-stone-100 dark:divide-stone-800/80 space-y-4">
          {reviews.map((rev) => {
            const isLiked = !!likedMap[rev.id];
            const currentLikes = rev.likes + (isLiked ? 1 : 0);

            return (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar fallback={rev.authorName[0]} size="sm" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                        {rev.authorName}
                      </p>
                      <p className="text-[11px] text-stone-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          'h-3.5 w-3.5',
                          s <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-200'
                        )}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-10">
                  {rev.comment}
                </p>

                <div className="pl-10 flex items-center gap-4 text-xs text-stone-400">
                  <button
                    type="button"
                    onClick={() => handleLike(rev.id)}
                    className={cn(
                      'flex items-center gap-1 hover:text-amber-600 transition-colors',
                      isLiked && 'text-amber-600 font-bold'
                    )}
                  >
                    <ThumbsUp className={cn('h-3.5 w-3.5', isLiked && 'fill-amber-600')} />
                    <span>Hữu ích ({currentLikes})</span>
                  </button>
                  <button type="button" className="hover:text-stone-600">Trả lời</button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
