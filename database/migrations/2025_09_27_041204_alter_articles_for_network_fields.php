<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {

            if (!Schema::hasColumn('articles', 'brand')) {
                $table->string('brand', 100)->nullable()->after('price');
            }

            if (!Schema::hasColumn('articles', 'model')) {
                $table->string('model', 100)->nullable()->after('brand');
            }

            if (!Schema::hasColumn('articles', 'category')) {
                $table->string('category', 50)->nullable()->after('model');
            }

            if (!Schema::hasColumn('articles', 'sku')) {
                $table->string('sku', 100)->nullable()->unique()->after('category');
            }

            if (!Schema::hasColumn('articles', 'stock_quantity')) {
                $table->unsignedInteger('stock_quantity')->default(0)->after('sku');
            }

            if (!Schema::hasColumn('articles', 'main_image_url')) {
                $table->string('main_image_url', 255)->nullable()->after('stock_quantity');
            }

            if (!Schema::hasColumn('articles', 'specs')) {
                $table->json('specs')->nullable()->after('main_image_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
        });
    }
};
