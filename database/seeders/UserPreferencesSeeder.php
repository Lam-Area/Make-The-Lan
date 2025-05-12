<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserPreferencesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('user_preferences')->insert([
            [
                'user_id' => 1,
                'dark_mode' => true,
                'language' => 'fr',
                'notification_email' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'dark_mode' => false,
                'language' => 'en',
                'notification_email' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
