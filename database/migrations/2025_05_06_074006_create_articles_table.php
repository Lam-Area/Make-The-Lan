<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            // Identité / SEO
            $table->string('title', 150);
            $table->string('slug', 191)->unique()->nullable();

            // Descriptif & prix
            $table->text('description');
            $table->decimal('price', 10, 2);

            // Attributs "produit réseau"
            $table->string('brand', 100)->nullable();       // ex: Cisco
            $table->string('model', 100)->nullable();       // ex: C9200L-48P-4X
            $table->string('category', 50)->nullable();     // router | switch | access_point
            $table->string('sku', 100)->nullable()->unique();
            $table->unsignedInteger('stock_quantity')->default(0);

            // Médias
            $table->string('main_image_url', 255)->nullable();

            // Spécifications techniques (JSON libre)
            $table->json('specs')->nullable();

            // Vendeur
            $table->unsignedBigInteger('vendeur_id');
            $table->foreign('vendeur_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');

            $table->timestamps();

            // Index utiles
            $table->index(['category', 'brand']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
