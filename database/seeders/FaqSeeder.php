<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'What photography and media services does Waridi Studio offer?',
                'answer' => 'Waridi Photo Studio offers three dedicated service groups: Photography (studio portraits, maternity, graduation, family, weddings, passport, corporate headshots, and product photography); Media Production (broadcast 4K livestreams, documentary films, aerial drone cinematography, TV production, and podcast recording); and Print & Creative (museum-grade canvas prints, acrylic mounting, and digital photo restoration).',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'How far in advance should I reserve a studio session or wedding date?',
                'answer' => 'For studio portrait sessions, we recommend booking 3 to 7 days in advance. For weddings, corporate galas, and multi-camera live broadcasts, dates often reserve 2 to 6 months ahead. You can reach out directly via our contact form to check current availability.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'What is your turnaround time for delivered photography and cinema reels?',
                'answer' => 'Standard studio portrait galleries are color-graded and delivered within 48 to 72 hours. Comprehensive wedding collections and commercial documentary films typically require 2 to 3 weeks for full cinematic color mastering and sound design.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Do you provide on-location drone cinematography with authorized permits?',
                'answer' => 'Yes. Our drone pilots hold commercial KCAA remote pilot licenses (RPL) and operate authorized DJI Inspire and Mavic Cine platforms with proper airspace clearances for regional projects throughout Kenya and East Africa.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'question' => 'How does your hybrid conference and livestreaming service work?',
                'answer' => 'We deploy multi-camera 4K setups (Sony FX cinema cameras and Blackmagic ATEM production switchers) with bonded cellular network transmitters to ensure 100% uninterrupted broadcast to YouTube, Vimeo, Facebook Live, or private corporate portals, complete with real-time lower-thirds graphics.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'question' => 'What materials and framing options do you offer for canvas prints and photo mounting?',
                'answer' => 'Our archival creative lab produces genuine 12-color archival giclée pigment canvas wraps, museum rag paper framing, and shatterproof UV-resistant acrylic mounting engineered to preserve colors for up to 100 years without fading.',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(['question' => $faq['question']], $faq);
        }
    }
}
