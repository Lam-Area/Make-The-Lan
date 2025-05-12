<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MessagesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('messages')->insert([
            [
                'sender_id' => 1,
                'receiver_id' => 2,
                'content' => 'Salut ! Tu es dispo pour une démo ?',
                'read_at' => Carbon::now()->addMinutes(5),
                'created_at' => Carbon::now(),
            ],
            [
                'sender_id' => 2,
                'receiver_id' => 1,
                'content' => 'Yes, go maintenant.',
                'read_at' => null,
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
