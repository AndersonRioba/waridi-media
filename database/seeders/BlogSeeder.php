<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Behind The Lens', 'Studio Guides', 'Cinematography'];
        $catModels = [];
        foreach ($categories as $cat) {
            $catModels[$cat] = BlogCategory::firstOrCreate(
                ['slug' => Str::slug($cat)],
                ['name' => $cat]
            );
        }

        $wanjiku = TeamMember::where('name', 'like', '%Wanjiku%')->first();
        $david = TeamMember::where('name', 'like', '%David%')->first();

        $posts = [
            [
                'title' => 'The Art of Studio Portrait Lighting: Sculpting with Gold & Bronze',
                'slug' => 'the-art-of-studio-portrait-lighting',
                'cover_image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
                'excerpt' => 'An insider look into how we shape key, rim, and kicker lights to bring warmth, dimensionality, and timeless grace to every skin tone.',
                'body' => '<p>Lighting is the fundamental language of photography. When you step into Waridi Studios, the first thing you notice is our intentional approach to contrast and warmth.</p><p>Rather than flooding the subject with flat, sterile LED light, we utilize large parabolic softboxes paired with warm bronze reflectors. This creates a gentle falloff that flatters bone structure and leaves an authentic, painterly glint in the eye.</p><h3>The Golden Hour in the Studio</h3><p>We often replicate the gentle, low-angle glow of sunset by feathering our key light 45 degrees across the subject. The results are luminous portraits that feel eternal.</p>',
                'author_id' => $wanjiku?->id,
                'blog_category_id' => $catModels['Behind The Lens']->id,
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Preparing for Your Family Portrait Session: A Wardrobe & Posing Guide',
                'slug' => 'preparing-for-your-family-portrait-session',
                'cover_image' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
                'excerpt' => 'From cohesive color palettes to keeping young children relaxed and joyful, here is everything you need to create cherished family heirlooms.',
                'body' => '<p>A family portrait is more than a photograph—it is a visual legacy that children and grandchildren will hold in their hands decades from now.</p><p>We always recommend coordinating tones rather than strictly matching outfits. Creams, warm neutrals, champagne, deep navy, and earthy ochres harmonize beautifully with our studio aesthetics.</p>',
                'author_id' => $wanjiku?->id,
                'blog_category_id' => $catModels['Studio Guides']->id,
                'status' => 'published',
                'published_at' => now()->subDays(14),
            ],
            [
                'title' => 'Multi-Camera Broadcast Livestreaming: How to Eliminate Zero-Day Glitches',
                'slug' => 'multi-camera-broadcast-livestreaming-guide',
                'cover_image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
                'excerpt' => 'Why cellular bonding, dedicated audio master chains, and failover switchers are mandatory for enterprise-grade live event broadcasts.',
                'body' => '<p>When a keynote speech is happening live in front of tens of thousands of global viewers, there is no "take two." Our production team shares the technical redundancies that safeguard our livestreams against venue internet drops and audio clipping.</p>',
                'author_id' => $david?->id,
                'blog_category_id' => $catModels['Cinematography']->id,
                'status' => 'published',
                'published_at' => now()->subDays(28),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }
    }
}
