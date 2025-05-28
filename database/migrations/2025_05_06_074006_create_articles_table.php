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
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('file_path', 255);
            $table->text('code_preview')->nullable();
            $table->unsignedBigInteger('vendeur_id');
            $table->timestamps();

            $table->foreign('vendeur_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
