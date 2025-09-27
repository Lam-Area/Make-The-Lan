<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserPreferencesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('user_preferences')->insert([
            [
                'user_id'    => 1,
                'dark_mode'  => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id'    => 2,
                'dark_mode'  => false,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
