<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrderItemsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('order_items')->insert([
            [
                'order_id' => 1,
                'article_id' => 1,
                'price_at_purchase' => 19.99,
                'created_at' => Carbon::now(),
            ],
            [
                'order_id' => 1,
                'article_id' => 2,
                'price_at_purchase' => 49.99,
                'created_at' => Carbon::now(),
            ],
            [
                'order_id' => 2,
                'article_id' => 1,
                'price_at_purchase' => 19.99,
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
