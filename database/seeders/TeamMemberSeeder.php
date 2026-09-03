<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Wanjiku Kamau',
                'role_title' => 'Founder & Lead Portrait Photographer',
                'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                'bio' => 'With over a decade behind the viewfinder, Wanjiku blends classic Renaissance lighting techniques with contemporary editorial fashion aesthetics.',
                'social_links' => ['instagram' => 'https://instagram.com', 'linkedin' => 'https://linkedin.com'],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'David Ochieng',
                'role_title' => 'Director of Cinematography',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
                'bio' => 'Award-winning cinematographer specializing in commercial narrative films, documentary storytelling, and multi-camera live broadcast.',
                'social_links' => ['instagram' => 'https://instagram.com', 'vimeo' => 'https://vimeo.com'],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Amina Hassan',
                'role_title' => 'Head of Creative & Fine Art Printing',
                'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                'bio' => 'Master colorist and giclée print artisan ensuring every print, canvas, and photo restoration meets gallery standards.',
                'social_links' => ['instagram' => 'https://instagram.com'],
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Brian Kiprop',
                'role_title' => 'Aerial Media & Drone Specialist',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                'bio' => 'Licensed drone pilot and visual engineer capturing sweeping landscapes, luxury estates, and large-scale industrial projects.',
                'social_links' => ['instagram' => 'https://instagram.com', 'youtube' => 'https://youtube.com'],
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(
                ['name' => $member['name']],
                $member
            );
        }
    }
}
