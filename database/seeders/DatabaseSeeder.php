<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(LogsSeeder::class);
        $this->call(UserPreferencesSeeder::class);
        $this->call(ArticlesSeeder::class);
        $this->call(FavoritesSeeder::class);
        $this->call(OrdersSeeder::class);
        $this->call(OrderItemsSeeder::class);
    }
}
