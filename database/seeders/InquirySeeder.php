<?php

namespace Database\Seeders;

use App\Enums\InquiryStatus;
use App\Models\Inquiry;
use Illuminate\Database\Seeder;

class InquirySeeder extends Seeder
{
    public function run(): void
    {
        $inquiries = [
            [
                'name' => 'Grace Waweru',
                'email' => 'grace.waweru@gmail.com',
                'phone' => '+254 712 345 678',
                'service_group_interest' => 'photography',
                'service_interest' => 'Wedding Photography',
                'event_date' => now()->addMonths(4)->toDateString(),
                'message' => 'Hello Waridi Media! We are planning our garden wedding in Karen this coming December and would love to check your availability for full-day photo and video coverage.',
                'status' => InquiryStatus::NEW->value,
                'internal_notes' => null,
            ],
            [
                'name' => 'Marcus Otieno',
                'email' => 'marcus@brandcraft.co.ke',
                'phone' => '+254 722 987 654',
                'service_group_interest' => 'media_production',
                'service_interest' => 'Livestreaming',
                'event_date' => now()->addWeeks(3)->toDateString(),
                'message' => 'We are hosting a regional fintech product launch at Villa Rosa Kempinski. Looking for high quality multi-cam livestreaming to YouTube with custom lower thirds.',
                'status' => InquiryStatus::CONTACTED->value,
                'internal_notes' => 'Sent initial proposal and rate card on Tuesday. Waiting for AV venue walkthrough confirmation.',
            ],
            [
                'name' => 'Dr. Andrew Ndung\'u',
                'email' => 'andrew.ndungu@uonbi.ac.ke',
                'phone' => '+254 733 112 233',
                'service_group_interest' => 'photography',
                'service_interest' => 'Graduation Photography',
                'event_date' => now()->addDays(10)->toDateString(),
                'message' => 'Seeking a studio graduation portrait session with academic gown, followed by portraits with my parents and siblings.',
                'status' => InquiryStatus::BOOKED->value,
                'internal_notes' => 'Confirmed booking for 2:00 PM slot. Deposit received.',
            ],
        ];

        foreach ($inquiries as $inq) {
            Inquiry::updateOrCreate(
                ['email' => $inq['email'], 'service_interest' => $inq['service_interest']],
                $inq
            );
        }
    }
}
