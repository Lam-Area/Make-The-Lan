<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LogsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('logs')->insert([
            [
                'user_id' => 1,
                'action' => 'Connexion',
                'ip_address' => '192.168.1.1',
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'action' => 'Déconnexion',
                'ip_address' => '192.168.1.2',
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
