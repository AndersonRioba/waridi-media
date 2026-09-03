<?php

namespace Database\Seeders;

use App\Enums\ServiceGroup;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            // Photography Group
            [
                'title' => 'Studio Portraits',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Camera',
                'description' => 'High-end studio portrait sessions with masterfully sculpted lighting for individuals, couples, and creatives.',
                'deliverables' => ['1-2 hours studio session', 'Multiple outfit changes', '10 high-resolution retouched images', 'Private online gallery'],
                'starting_price' => 'KES 15,000',
                'sort_order' => 1,
            ],
            [
                'title' => 'Family Photography',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Users',
                'description' => 'Heartwarming, timeless portraits that preserve the bonds, laughter, and generations of your family.',
                'deliverables' => ['Studio or on-location shoot', 'Up to 8 family members', '15 fully polished images', '1 complimentary mounted print'],
                'starting_price' => 'KES 20,000',
                'sort_order' => 2,
            ],
            [
                'title' => 'Graduation Photography',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'GraduationCap',
                'description' => 'Honor your milestone academic achievement with distinguished, celebratory graduation portraiture.',
                'deliverables' => ['Gown and formal attires', 'Individual and family combos', '8 retouched portraits', 'Digital delivery within 48 hours'],
                'starting_price' => 'KES 12,000',
                'sort_order' => 3,
            ],
            [
                'title' => 'Maternity Photography',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Heart',
                'description' => 'Graceful, intimate celebrations of motherhood and new life in serene studio aesthetics.',
                'deliverables' => ['Studio wardrobe selection access', 'Partner & sibling inclusion', '12 signature retouched photos', 'Fine art print options'],
                'starting_price' => 'KES 18,000',
                'sort_order' => 4,
            ],
            [
                'title' => 'Wedding Photography',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Sparkles',
                'description' => 'Editorial, documentary-style wedding storytelling that captures every emotional nuance of your union.',
                'deliverables' => ['Full-day dual photographer coverage', 'Pre-wedding consultation', '350+ curated high-res photos', 'Luxury handcrafted photo album'],
                'starting_price' => 'KES 80,000',
                'sort_order' => 5,
            ],
            [
                'title' => 'Passport Photos',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'UserCheck',
                'description' => 'Instant biometric passport and visa photography compliant with international embassy standards.',
                'deliverables' => ['Compliance guarantee for US/UK/Schengen/EAC', 'Digital softcopy + 4 printed cutouts', 'Delivery in 10 minutes'],
                'starting_price' => 'KES 1,500',
                'sort_order' => 6,
            ],
            [
                'title' => 'Real Estate Photography',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Building2',
                'description' => 'Architectural photography capturing space, depth, and luxury finishes for properties and resorts.',
                'deliverables' => ['Interior & exterior bracketed HDR', 'Twilight architectural shots', 'Web and print optimized assets', 'Next-day turnaround'],
                'starting_price' => 'KES 35,000',
                'sort_order' => 7,
            ],
            [
                'title' => 'Corporate Headshots',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Briefcase',
                'description' => 'Polished executive imagery that elevates your professional brand on LinkedIn, annual reports, and press.',
                'deliverables' => ['On-site mobile studio or in-house studio', 'Instant tethered preview', '3 retouched headshots per person', 'Commercial licensing'],
                'starting_price' => 'KES 10,000',
                'sort_order' => 8,
            ],
            [
                'title' => 'Product Photography',
                'service_group' => ServiceGroup::PHOTOGRAPHY->value,
                'icon' => 'Package',
                'description' => 'Crisp, color-accurate e-commerce and lifestyle product imagery tailored to drive customer conversion.',
                'deliverables' => ['Pure white background (e-comm)', 'Styled tabletop creative setups', 'Color matching & reflection control', 'Ultra-sharp focus stacking'],
                'starting_price' => 'KES 25,000',
                'sort_order' => 9,
            ],

            // Media Production Group
            [
                'title' => 'TV & Film Production',
                'service_group' => ServiceGroup::MEDIA_PRODUCTION->value,
                'icon' => 'Film',
                'description' => 'Full-lifecycle cinema production from scriptwriting and storyboarding to multi-camera 4K cinematography.',
                'deliverables' => ['Scripting & story development', 'Cinema camera rigs & sound crew', 'Color grading in DaVinci Resolve', 'Broadcast master delivery'],
                'starting_price' => 'KES 250,000',
                'sort_order' => 10,
            ],
            [
                'title' => 'Documentary Production',
                'service_group' => ServiceGroup::MEDIA_PRODUCTION->value,
                'icon' => 'Clapperboard',
                'description' => 'Compelling narrative films for NGOs, corporate impact programs, and cultural heritage preservation.',
                'deliverables' => ['Field interviews & archival integration', 'Multi-location fieldwork', 'Original score & sound design', 'Festival & web deliverables'],
                'starting_price' => 'KES 300,000',
                'sort_order' => 11,
            ],
            [
                'title' => 'Event Coverage',
                'service_group' => ServiceGroup::MEDIA_PRODUCTION->value,
                'icon' => 'Video',
                'description' => 'Dynamic multi-angle video recording and highlight reels for summits, galas, concerts, and brand launches.',
                'deliverables' => ['Multi-camera 4K capture', 'Same-day social media teaser cut', 'Full event archival recording', 'Licensed soundtrack'],
                'starting_price' => 'KES 75,000',
                'sort_order' => 12,
            ],
            [
                'title' => 'Livestreaming',
                'service_group' => ServiceGroup::MEDIA_PRODUCTION->value,
                'icon' => 'Radio',
                'description' => 'Broadcast-grade multi-camera livestreaming to YouTube, Vimeo, Facebook, and custom private web portals.',
                'deliverables' => ['Dedicated bonded cellular internet', 'Live graphics & lower-thirds', 'Multi-channel audio mixing', 'Instant raw recording backup'],
                'starting_price' => 'KES 60,000',
                'sort_order' => 13,
            ],
            [
                'title' => 'Drone Services',
                'service_group' => ServiceGroup::MEDIA_PRODUCTION->value,
                'icon' => 'Compass',
                'description' => 'Licensed aerial cinematography and high-resolution photography offering breathtaking perspectives.',
                'deliverables' => ['KCAA certified drone pilots', '4K 60fps aerial video', 'High-res raw aerial stills', 'Full airspace authorization handling'],
                'starting_price' => 'KES 45,000',
                'sort_order' => 14,
            ],
            [
                'title' => 'Podcast Production',
                'service_group' => ServiceGroup::MEDIA_PRODUCTION->value,
                'icon' => 'Mic',
                'description' => 'Acoustically treated studio space with broadcast Shure microphones and 4K multi-angle video podcast setups.',
                'deliverables' => ['Soundproof studio booking', 'Multi-mic Shure SM7B setup', 'Multi-cam 4K visual switching', 'Audio mastering & reels editing'],
                'starting_price' => 'KES 20,000',
                'sort_order' => 15,
            ],

            // Print & Creative Group
            [
                'title' => 'Graphic Design',
                'service_group' => ServiceGroup::PRINT_CREATIVE->value,
                'icon' => 'Palette',
                'description' => 'Bespoke branding, typography, marketing collateral, and publication layouts that command attention.',
                'deliverables' => ['Brand identity systems', 'Brochures & annual reports', 'Print-ready press files', 'Digital social kits'],
                'starting_price' => 'KES 15,000',
                'sort_order' => 16,
            ],
            [
                'title' => 'Photo Mounting',
                'service_group' => ServiceGroup::PRINT_CREATIVE->value,
                'icon' => 'Maximize2',
                'description' => 'Museum-grade mounting on acrylic, foam board, and aluminium dibond with seamless float frames.',
                'deliverables' => ['Acid-free backing materials', 'UV protective matte/gloss finish', 'Concealed hanging brackets', 'Sizes from 8x10 to 40x60 inches'],
                'starting_price' => 'KES 4,500',
                'sort_order' => 17,
            ],
            [
                'title' => 'Canvas Prints',
                'service_group' => ServiceGroup::PRINT_CREATIVE->value,
                'icon' => 'Image',
                'description' => 'Rich cotton canvas giclée prints stretched over kiln-dried pine frames for enduring gallery elegance.',
                'deliverables' => ['100% cotton archival canvas', 'Eco-solvent pigment inks', 'Gallery wrap edges (1.5" depth)', 'Lifetime fade-resistant coating'],
                'starting_price' => 'KES 5,500',
                'sort_order' => 18,
            ],
            [
                'title' => 'Photo Restoration & Retouching',
                'service_group' => ServiceGroup::PRINT_CREATIVE->value,
                'icon' => 'Sparkle',
                'description' => 'Precision restoration of vintage, torn, faded family photographs and high-end beauty retouching.',
                'deliverables' => ['Scratch, tear, and stain removal', 'Color correction & re-colorization', 'Detail reconstruction', 'Archival physical & digital copies'],
                'starting_price' => 'KES 3,500',
                'sort_order' => 19,
            ],
        ];

        foreach ($services as $serviceData) {
            Service::updateOrCreate(
                ['slug' => Str::slug($serviceData['title'])],
                array_merge($serviceData, ['slug' => Str::slug($serviceData['title'])])
            );
        }
    }
}
