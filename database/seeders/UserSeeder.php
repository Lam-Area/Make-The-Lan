<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // --- Admin ---
        User::create([
            'name'       => 'Admin Principal',
            'email'      => 'admin@mtl.com',
            'password'   => bcrypt('admin123'),
            'role'       => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Gérants ---
        User::create([
            'name'       => 'Gérant Routeurs',
            'email'      => 'gerant.routeurs@mtl.com',
            'password'   => bcrypt('router123'),
            'role'       => 'vendeur',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'name'       => 'Gérant Switches',
            'email'      => 'gerant.switches@mtl.com',
            'password'   => bcrypt('switch123'),
            'role'       => 'vendeur',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // --- Utilisateurs ---
        User::create([
            'name'       => 'Alice Client',
            'email'      => 'alice@mtl.com',
            'password'   => bcrypt('user123'),
            'role'       => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'name'       => 'Bob Client',
            'email'      => 'bob@mtl.com',
            'password'   => bcrypt('user123'),
            'role'       => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
