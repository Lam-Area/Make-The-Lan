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
        DB::table('user_logs')->insert([
            [
                'user_id' => 1,
                'name' => 'Admin Test',
                'action' => 'Connexion',
                'ip_address' => '192.168.1.1',
                'created_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'name' => 'Vendeur Test',
                'action' => 'Déconnexion',
                'ip_address' => '192.168.1.2',
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
