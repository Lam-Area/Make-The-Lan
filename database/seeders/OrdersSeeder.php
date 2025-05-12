<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrdersSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'user_id' => 1,
                'total_price' => 69.98,
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'total_price' => 19.99,
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
