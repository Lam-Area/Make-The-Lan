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
                'title' => "facilisation de la création d'un docker",
                'description' => "très efficaces pour manage les ports d'un site",
                'price' => 9.99,
                'file_path' => 'docker/cont',
                'code_preview' => 'import requests...',
                'vendeur_id' => 2,
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
