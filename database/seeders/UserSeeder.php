<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@waridimedia.com'],
            [
                'name' => 'Waridi Admin',
                'password' => Hash::make('password123'),
                'role' => UserRole::ADMIN,
                'email_verified_at' => now(),
            ]
        );

        // Editor User
        User::updateOrCreate(
            ['email' => 'editor@waridimedia.com'],
            [
                'name' => 'Waridi Content Editor',
                'password' => Hash::make('password123'),
                'role' => UserRole::EDITOR,
                'email_verified_at' => now(),
            ]
        );
    }
}
