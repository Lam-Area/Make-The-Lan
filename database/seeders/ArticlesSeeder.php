<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ArticlesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('articles')->insert([
            [
                'title' => 'Script de scraping Python',
                'description' => 'Un script efficace pour scraper les données d’un site.',
                'price' => 19.99,
                'file_path' => 'scripts/scraper.py',
                'code_preview' => 'import requests...',
                'vendeur_id' => 2, // user.id
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Template React + Inertia',
                'description' => 'Base solide pour démarrer un projet SPA avec Laravel.',
                'price' => 49.99,
                'file_path' => 'templates/react-starter.zip',
                'code_preview' => '<script setup>',
                'vendeur_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
