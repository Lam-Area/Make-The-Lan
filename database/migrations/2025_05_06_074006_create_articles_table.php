<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            $table->string('title', 150);
            $table->string('slug', 191)->unique()->nullable();

            $table->text('description');
            $table->decimal('price', 10, 2);

            $table->string('brand', 100)->nullable();
            $table->string('model', 100)->nullable();
            $table->string('category', 50)->nullable();
            $table->string('sku', 100)->nullable()->unique();
            $table->unsignedInteger('stock_quantity')->default(0);

            $table->string('main_image_url', 255)->nullable();

            $table->json('specs')->nullable();

            $table->unsignedBigInteger('vendeur_id');
            $table->foreign('vendeur_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');

            $table->timestamps();

            $table->index(['category', 'brand']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
