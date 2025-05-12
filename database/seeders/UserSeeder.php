<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@myscript.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'name' => 'Vendeur Test',
            'email' => 'vendeur@myscript.com',
            'password' => bcrypt('vendeur123'),
            'role' => 'vendeur',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'name' => 'User Test',
            'email' => 'user@myscript.com',
            'password' => bcrypt('user123'),
            'role' => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
