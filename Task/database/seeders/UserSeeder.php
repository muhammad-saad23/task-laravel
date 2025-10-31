<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        // admin seeder
        User::updateOrCreate(
            ['email' => 'Mssaad@gmail.com'],
            [
                'name' => 'Muhammad saad',
                'phone' => '03152458881',
                'password' => Hash::make('saadmaster22'), 
                'role' => 'admin',
            ]
        );
    }
}
