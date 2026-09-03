<?php

namespace Database\Seeders;

use App\Enums\ProjectCategory;
use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\ProjectMedia;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Tags matching specific services
        $tagNames = [
            'Studio Portraits', 'Wedding Photography', 'Family Photography', 'Graduation Photography',
            'Maternity Photography', 'Corporate Headshots', 'Real Estate Photography', 'Product Photography',
            'TV & Film Production', 'Documentary Production', 'Event Coverage', 'Livestreaming',
            'Drone Services', 'Podcast Production', 'Photo Mounting', 'Canvas Prints', 'Photo Restoration & Retouching'
        ];

        $tags = [];
        foreach ($tagNames as $name) {
            $tags[$name] = Tag::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name]
            );
        }

        $projects = [
            [
                'title' => 'The Royalty Studio Portrait Collection',
                'category' => ProjectCategory::PHOTOGRAPHY->value,
                'client' => 'High-Fashion Editorial',
                'location' => 'Waridi Studios, Nairobi',
                'project_date' => '2026-02-15',
                'cover_image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
                'excerpt' => 'A masterclass in Renaissance chiaroscuro lighting and modern gold-toned haute couture portraiture.',
                'body' => '<p>Commissioned for an exclusive fine-art portfolio series, this collection explored deep contrast, warm champagne highlights, and sculptured skin tones. Every frame was crafted using bronze reflectors and continuous diffused lighting to produce ethereal depth.</p><p>The series was printed on museum-grade rag paper with gold leaf accents for an intimate private gallery exhibition.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 1,
                'tags' => ['Studio Portraits'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Chiaroscuro key light setup with velvet backdrop'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Intimate profile perspective highlighting texture'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80', 'caption' => 'High-key golden hour studio study'],
                ]
            ],
            [
                'title' => 'Serenity at Lake Naivasha: Wedding of Sarah & Brian',
                'category' => ProjectCategory::PHOTOGRAPHY->value,
                'client' => 'Sarah & Brian Mwangi',
                'location' => 'Enashipai Resort, Naivasha',
                'project_date' => '2026-01-20',
                'cover_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
                'excerpt' => 'An editorial destination wedding filled with heartfelt emotion, acacia golden hours, and lakeside sunset silhouettes.',
                'body' => '<p>Sarah and Brian\'s wedding was a celebration of timeless intimacy. Our team deployed three photographers to document both candid unposed moments and majestic environmental portraits against Lake Naivasha\'s bird sanctuaries.</p><p>Delivered as an archival linen album along with 450 handcrafted digital masters.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 2,
                'tags' => ['Wedding Photography'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', 'caption' => 'The vows by the lake'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Golden hour portrait beneath yellow fever trees'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Evening lantern celebrations'],
                ]
            ],
            [
                'title' => 'The Great Rift Aerial Survey & Documentary Reel',
                'category' => ProjectCategory::MEDIA_PRODUCTION->value,
                'client' => 'East African Wildlife Initiative',
                'location' => 'Rift Valley Escarpment',
                'project_date' => '2026-02-05',
                'cover_image' => 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'excerpt' => 'Cinematic 4K 60fps drone cinematography highlighting geological fractures and wildlife migration corridors.',
                'body' => '<p>Filmed over 14 dawn-and-dusk expeditions, this aerial film captured geothermal plumes, ancient cedar ridges, and migratory bird patterns across the Rift. Heavy-lift cinema drones were paired with prime cine lenses for seamless cinematic fidelity.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 3,
                'tags' => ['Drone Services', 'Documentary Production'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Misty sunrise over the escarpment'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Water reflection study from 400ft AGL'],
                ]
            ],
            [
                'title' => 'Executive Headshots: Safaricom Leadership Summit',
                'category' => ProjectCategory::PHOTOGRAPHY->value,
                'client' => 'Regional Tech Executive Council',
                'location' => 'Radisson Blu Upper Hill, Nairobi',
                'project_date' => '2026-01-12',
                'cover_image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
                'excerpt' => 'Crisp, contemporary corporate portraiture delivering authentic leadership authority for 40 directors.',
                'body' => '<p>Waridi deployed an on-site mobile studio with instant iPad tethering. Each leader received wardrobe styling adjustments and instant frame selection, yielding high-impact portraits utilized across Forbes Africa and corporate annual reports.</p>',
                'is_featured' => false,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 4,
                'tags' => ['Corporate Headshots'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Executive portrait study'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Corporate leadership focus'],
                ]
            ],
            [
                'title' => 'Kenyatta University Milestone Graduation Series',
                'category' => ProjectCategory::PHOTOGRAPHY->value,
                'client' => 'Dr. Michelle Ndegwa & Family',
                'location' => 'Waridi Studios, Nairobi',
                'project_date' => '2025-12-18',
                'cover_image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
                'excerpt' => 'Distinguished studio portraits commemorating doctoral graduation with dignity and familial joy.',
                'body' => '<p>A multi-generational graduation session featuring ceremonial regalia, celebratory family groupings, and refined gold-bordered heirloom prints.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 5,
                'tags' => ['Graduation Photography', 'Family Photography'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Academic triumph portrait'],
                ]
            ],
            [
                'title' => 'East Africa Tech Summit: 3-Day Hybrid Livestream',
                'category' => ProjectCategory::MEDIA_PRODUCTION->value,
                'client' => 'Silicon Savannah Tech Forum',
                'location' => 'KICC Plenary Hall',
                'project_date' => '2025-11-28',
                'cover_image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'excerpt' => 'Broadcast-quality 6-camera live streaming reaching over 35,000 global virtual attendees with zero latency hiccups.',
                'body' => '<p>Utilizing bonded multi-SIM cellular bonding, Blackmagic ATEM Constellation 4K switchers, and real-time lower-third graphics, Waridi Media delivered seamless broadcasts across YouTube Live and private enterprise CDN streams.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 6,
                'tags' => ['Livestreaming', 'Event Coverage'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Main auditorium camera crane view'],
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Keynote live switcher control room'],
                ]
            ],
            [
                'title' => 'Heritage Restored: 1950s Nairobi Vintage Archive',
                'category' => ProjectCategory::PRINT_CREATIVE->value,
                'client' => 'National Historical Society',
                'location' => 'Waridi Creative Lab',
                'project_date' => '2025-10-15',
                'cover_image' => 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=85',
                'excerpt' => 'Restoration and museum-grade acrylic mounting of rare medium-format prints from colonial-era East Africa.',
                'body' => '<p>Original water-damaged gelatin silver negatives were digitally cleaned at 9600 DPI, tonally balanced, and reprinted using archival carbon pigment inks on 310gsm cotton rag before float-mounting inside handcrafted walnut frames.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 7,
                'tags' => ['Photo Restoration & Retouching', 'Photo Mounting', 'Canvas Prints'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Mounted gallery proofing inspection'],
                ]
            ],
            [
                'title' => 'Golden Blossom: Fine Art Maternity Symphony',
                'category' => ProjectCategory::PHOTOGRAPHY->value,
                'client' => 'Brenda & Kevin Otieno',
                'location' => 'Waridi Botanical Studio Set',
                'project_date' => '2026-01-28',
                'cover_image' => 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85',
                'excerpt' => 'An ethereal celebration of new life featuring golden silks, organic florals, and gentle studio backlighting.',
                'body' => '<p>Crafted to evoke tranquility and grace, this maternity session celebrated the beauty of motherhood through soft pastel backdrops and floating golden fabrics.</p>',
                'is_featured' => true,
                'status' => ProjectStatus::PUBLISHED->value,
                'sort_order' => 8,
                'tags' => ['Maternity Photography'],
                'media' => [
                    ['type' => 'image', 'path_or_url' => 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80', 'caption' => 'Silhouette in golden silk'],
                ]
            ],
        ];

        foreach ($projects as $pData) {
            $tagList = $pData['tags'] ?? [];
            $mediaList = $pData['media'] ?? [];
            unset($pData['tags'], $pData['media']);

            $slug = Str::slug($pData['title']);
            $project = Project::updateOrCreate(
                ['slug' => $slug],
                array_merge($pData, ['slug' => $slug])
            );

            // Sync tags
            $tagIds = [];
            foreach ($tagList as $tagName) {
                if (isset($tags[$tagName])) {
                    $tagIds[] = $tags[$tagName]->id;
                }
            }
            $project->tags()->sync($tagIds);

            // Sync media
            ProjectMedia::where('project_id', $project->id)->delete();
            foreach ($mediaList as $i => $mediaItem) {
                ProjectMedia::create([
                    'project_id' => $project->id,
                    'type' => $mediaItem['type'],
                    'path_or_url' => $mediaItem['path_or_url'],
                    'caption' => $mediaItem['caption'],
                    'sort_order' => $i + 1,
                ]);
            }
        }
    }
}
