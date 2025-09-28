<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ArticlesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $vendeurSwitchId = DB::table('users')->where('email', 'switch.manager@mtl.com')->value('id')
            ?? DB::table('users')->where('role', 'vendeur')->orderBy('id')->value('id');

        $vendeurRouterId = DB::table('users')->where('email', 'router.manager@mtl.com')->value('id')
            ?? DB::table('users')->where('role', 'vendeur')->orderBy('id', 'desc')->value('id');

        if (!$vendeurSwitchId || !$vendeurRouterId) {
            return;
        }

        $articles = [
            [
                'title'          => 'Cisco Catalyst 8235',
                'description'    => "Switch Cisco Catalyst 8235 – hautes performances pour réseau d’entreprise.",
                'price'          => 1999.99,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 8235',
                'category'       => 'switch',
                'sku'            => 'C8235-48T',
                'stock_quantity' => 5,
                'main_image_url' => 'product/c8235-dsc08419-600x400.jpg',
                'specs'          => json_encode(['ports' => '48x GE', 'uplinks' => '4x SFP+', 'layer' => '2/3']),
                'vendeur_id'     => $vendeurSwitchId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 8355',
                'description'    => 'Switch Catalyst 8355 – stackable, idéal PME.',
                'price'          => 2499.99,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 8355',
                'category'       => 'switch',
                'sku'            => 'C8355-48P',
                'stock_quantity' => 4,
                'main_image_url' => 'product/c8355-dsc08376-600x400.jpg',
                'specs'          => json_encode(['ports' => '48x GE', 'uplinks' => '2x 10G', 'stack' => 'StackWise']),
                'vendeur_id'     => $vendeurSwitchId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 9200',
                'description'    => 'Switch d’accès Catalyst 9200 Series avec haute fiabilité.',
                'price'          => 2999.99,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 9200',
                'category'       => 'switch',
                'sku'            => 'C9200-48P-4X',
                'stock_quantity' => 6,
                'main_image_url' => 'product/cisco_catalyst_9200_series-600x400.jpg',
                'specs'          => json_encode(['ports' => '48x GE', 'uplinks' => '4x 1G/10G SFP', 'layer' => '2/3']),
                'vendeur_id'     => $vendeurSwitchId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 9300',
                'description'    => 'Switch Catalyst 9300 – référence campus access layer.',
                'price'          => 3999.99,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 9300',
                'category'       => 'switch',
                'sku'            => 'C9300-48U',
                'stock_quantity' => 3,
                'main_image_url' => 'product/cisco_catalyst_9300_series_l-600x400.jpg',
                'specs'          => json_encode(['ports' => '48x GE/Multigig', 'uplinks' => '4x 10G', 'stack' => 'StackWise-480']),
                'vendeur_id'     => $vendeurSwitchId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 9500',
                'description'    => 'Switch Catalyst 9500 – cœur de réseau, très haut débit.',
                'price'          => 7999.99,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 9500',
                'category'       => 'switch',
                'sku'            => 'C9500-40X',
                'stock_quantity' => 2,
                'main_image_url' => 'product/cisco_catalyst_9500_series-600x400.jpg',
                'specs'          => json_encode(['ports' => '40x 10G/25G', 'layer' => '3', 'stack' => 'StackWise-Virtual']),
                'vendeur_id'     => $vendeurSwitchId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 9600',
                'description'    => 'Switch Catalyst 9600 Series – châssis modulaire haut de gamme.',
                'price'          => 14999.99,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 9600',
                'category'       => 'switch',
                'sku'            => 'C9600-SUP2',
                'stock_quantity' => 1,
                'main_image_url' => 'product/cisco_catalyst_9600_series-600x400.jpg',
                'specs'          => json_encode(['ports' => 'Line cards modulaires', 'backplane' => 'Terabit scale']),
                'vendeur_id'     => $vendeurSwitchId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],

            // ---------- ROUTER ----------
            [
                'title'          => 'Cisco ISR 1100 Router',
                'description'    => 'Routeur Cisco ISR 1100 avec sécurité intégrée et VPN.',
                'price'          => 1599.50,
                'brand'          => 'Cisco',
                'model'          => 'ISR 1100',
                'category'       => 'router',
                'sku'            => 'ISR1100-4P',
                'stock_quantity' => 3,
                'main_image_url' => 'product/ms130-600x400.jpg',
                'specs'          => json_encode(['ports' => '4x GE', 'features' => 'VPN, Firewall intégré']),
                'vendeur_id'     => $vendeurRouterId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco ISR 4000 Series',
                'description'    => 'Routeur ISR 4000 – conçu pour les sites distants et la sécurité avancée.',
                'price'          => 2999.99,
                'brand'          => 'Cisco',
                'model'          => 'ISR 4331',
                'category'       => 'router',
                'sku'            => 'ISR4331-K9',
                'stock_quantity' => 4,
                'main_image_url' => 'product/datasheet-c78-744089-2-600x400.jpg',
                'specs'          => json_encode(['ports' => '3x GE', 'features' => 'VPN, QoS, Firewall']),
                'vendeur_id'     => $vendeurRouterId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco ASR 1001-X',
                'description'    => 'Routeur Cisco Aggregation Services ASR 1001-X, idéal pour le WAN haute performance.',
                'price'          => 8499.00,
                'brand'          => 'Cisco',
                'model'          => 'ASR 1001-X',
                'category'       => 'router',
                'sku'            => 'ASR1001X',
                'stock_quantity' => 2,
                'main_image_url' => 'product/catalyst-8300-uCPE.jpg',
                'specs'          => json_encode(['throughput' => '20Gbps', 'features' => 'Redondance, Sécurité avancée']),
                'vendeur_id'     => $vendeurRouterId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 8300 Series Edge',
                'description'    => 'Routeur Catalyst 8300 – SD-WAN, sécurité intégrée et haute performance.',
                'price'          => 6499.00,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 8300',
                'category'       => 'router',
                'sku'            => 'C8300-2N2S',
                'stock_quantity' => 2,
                'main_image_url' => 'product/catalyst-8300-2n2s-4t2x.jpg',
                'specs'          => json_encode(['ports' => '2x NIM, 2x SFP+', 'features' => 'SD-WAN, Firewall intégré']),
                'vendeur_id'     => $vendeurRouterId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'title'          => 'Cisco Catalyst 8500L Edge Router',
                'description'    => 'Routeur Catalyst 8500L – plateforme compacte pour l’agrégation SD-WAN.',
                'price'          => 9999.00,
                'brand'          => 'Cisco',
                'model'          => 'Catalyst 8500L',
                'category'       => 'router',
                'sku'            => 'C8500L-8S4X',
                'stock_quantity' => 1,
                'main_image_url' => 'product/catalyst-8500L-8S4X-front-top.jpg',
                'specs'          => json_encode(['ports' => '8x 1G SFP, 4x 10G SFP+', 'features' => 'SD-WAN, QoS, Sécurité']),
                'vendeur_id'     => $vendeurRouterId,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],

        ];

        DB::table('articles')->insert($articles);
    }
}
