'use client';

import RecipeImageGallery, {
    type RecipeGalleryImage,
} from '@/components/recipe/RecipeImageGallery';

const mockImages: RecipeGalleryImage[] = [
    {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200',
        name: 'Món 1',
        alt: 'Ảnh món ăn 1',
        isPrimary: true,
    },
    {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
        name: 'Món 2',
        alt: 'Ảnh món ăn 2',
    },
    {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200',
        name: 'Món 3',
        alt: 'Ảnh món ăn 3',
    },
];

export default function RecipeGalleryPage() {
    return (
        <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <RecipeImageGallery
                    images={mockImages}
                    onAddImages={() => {
                        console.log('Open upload modal');
                    }}
                    onSetPrimaryImage={(imageId) => {
                        console.log('Set primary:', imageId);
                    }}
                    onRemoveImage={(imageId) => {
                        console.log('Remove image:', imageId);
                    }}
                />
            </div>
        </main>
    );
}