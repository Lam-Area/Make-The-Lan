<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CartItemsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cart_items')->insert([
            [
                'user_id' => 1,
                'article_id' => 1,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'article_id' => 2,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'article_id' => 3,
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
