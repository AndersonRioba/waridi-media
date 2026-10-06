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
            'contact_email' => 'waridipix@gmail.com',
            'contact_phone' => '+254 742 539 999',
            'hero_bg_image' => '/images/front-banner.webp',
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
            'who_we_are_title' => 'Who We Are',
            'who_we_are_eyebrow' => 'OUR ESSENCE & PURPOSE',
            'who_we_are_p1' => 'Waridi Photo Studio & Media is an independent, premier media production and creative studio offering a comprehensive suite of creative and technical solutions. Over the years, we have built a reputation for reliability, artistic innovation, and unmatched production quality across Kenya and East Africa.',
            'who_we_are_p2' => 'Our work spans fine-art studio photography, multi-camera live streaming, corporate events coverage, documentary films, aerial cinematography, and archival fine art printing. We combine cutting-edge cinema equipment with a passionate, highly skilled crew to bring vision to life — beautifully and efficiently.',
            'who_we_are_mission_title' => 'Our Mission',
            'who_we_are_mission_text' => 'To deliver innovative, cinema-grade media production and studio solutions that elevate brands, capture authentic emotion, and shape meaningful visual memories across Africa.',
            'who_we_are_vision_title' => 'Our Vision',
            'who_we_are_vision_text' => 'To be Africa’s pre-eminent media production house and photography sanctuary, celebrated for artistic excellence, technological leadership, and lasting cultural impact.',
            'who_we_are_image' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
            'who_we_are_values' => ['Reliability', 'Quality', 'Integrity', 'Affordable Rates'],
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
