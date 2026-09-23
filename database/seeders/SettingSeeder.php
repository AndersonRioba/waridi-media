<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'company_name' => 'Waridi Photo Studio',
            'umbrella_name' => 'Waridi Media',
            'tagline' => 'Where Moments Become Memories',
            'contact_email' => 'info@waridimedia.com',
            'contact_phone' => '+254 700 123 456',
            'address' => '4th Floor, Studio Chambers, Ngong Road, Nairobi, Kenya',
            'opening_hours' => 'Mon - Sat: 8:30 AM - 6:30 PM | Sun: By Appointment',
            'show_public_pricing' => true,
            'stats' => [
                ['label' => 'Years of Excellence', 'value' => '8+'],
                ['label' => 'Photo Sessions Delivered', 'value' => '2,500+'],
                ['label' => 'Happy Clients Served', 'value' => '1,800+'],
                ['label' => 'Media Productions', 'value' => '320+'],
            ],
            'why_choose_us' => [
                [
                    'headline' => 'Artistic Direction & Precision',
                    'blurb' => 'Masterful studio illumination, vintage analog tones, and editorial refinement honoring every subject with effortless grace.',
                ],
                [
                    'headline' => 'Tailored to Your Vision',
                    'blurb' => 'Personalized pre-shoot consultations ensuring every milestone, from intimate maternity portraits to major summits, reflects your identity.',
                ],
                [
                    'headline' => 'Archival Master Delivery',
                    'blurb' => 'Museum-grade pigment canvas printing and cinema-grade 4K delivery crafted to endure across generations as family heirlooms.',
                ],
            ],
            'social_links' => [
                'instagram' => 'https://instagram.com/waridimedia',
                'facebook' => 'https://facebook.com/waridimedia',
                'youtube' => 'https://youtube.com/@waridimedia',
                'vimeo' => 'https://vimeo.com/waridimedia',
                'linkedin' => 'https://linkedin.com/company/waridi-media',
            ],
            'seo_default_title' => 'Waridi Photo Studio & Media Production | Where Moments Become Memories',
            'seo_default_description' => 'Nairobi premier photography studio, media production, and fine art printing. Studio portraits, weddings, corporate headshots, 4K livestreaming, and drone cinematography.',
            'seo_default_og_image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
            'footer_text' => 'Crafting luxury portraits, compelling cinematic narratives, and museum-grade fine art prints with uncompromised artistry.',
        ];

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }
    }
}
