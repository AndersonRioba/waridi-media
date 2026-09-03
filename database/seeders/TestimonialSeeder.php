<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $sarahWedding = Project::where('slug', 'like', '%sarah%')->first();
        $portraitProject = Project::where('slug', 'like', '%royalty%')->first();

        $testimonials = [
            [
                'client_name' => 'Sarah Mwangi',
                'client_role' => 'Bride, Naivasha Destination Wedding',
                'quote' => 'Waridi Photo Studio made our wedding day completely unforgettable. The team felt like trusted family, guiding us effortlessly through every portrait while capturing moments we didn’t even realize occurred. Looking at our gold-bound album still brings tears of joy.',
                'photo' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
                'project_id' => $sarahWedding?->id,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'client_name' => 'Evans K. Mutiso',
                'client_role' => 'Managing Director, Apex Capital East Africa',
                'quote' => 'Our entire executive board needed updated headshots and brand imagery for our ten-year anniversary report. Waridi brought a full studio rig directly to our boardrooms. The lighting precision, instant tethered previews, and quick turnaround were exceptional.',
                'photo' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
                'project_id' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'client_name' => 'Aisha Mohammed',
                'client_role' => 'Creative Director, Zuri Haute Couture',
                'quote' => 'The richness of the gold tones and deep velvet shadows in our editorial campaign portraits exceeded everything we envisioned. Waridi understands the nuance of light on skin better than any studio in the region.',
                'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                'project_id' => $portraitProject?->id,
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['client_name' => $t['client_name']],
                $t
            );
        }
    }
}
