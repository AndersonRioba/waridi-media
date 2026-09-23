<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name' => 'Safaricom Telecommunications',
                'logo' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=240&h=120&q=80',
                'website_url' => 'https://www.safaricom.co.ke',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'KCB Bank Group',
                'logo' => 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=240&h=120&q=80',
                'website_url' => 'https://kcbgroup.com',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Nation Media Group',
                'logo' => 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=240&h=120&q=80',
                'website_url' => 'https://nation.africa',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Strathmore University',
                'logo' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=240&h=120&q=80',
                'website_url' => 'https://strathmore.edu',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Serena Hotels & Resorts',
                'logo' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=240&h=120&q=80',
                'website_url' => 'https://www.serenahotels.com',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Aura Luxury Weddings',
                'logo' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=240&h=120&q=80',
                'website_url' => null,
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($clients as $client) {
            Client::updateOrCreate(['name' => $client['name']], $client);
        }
    }
}
