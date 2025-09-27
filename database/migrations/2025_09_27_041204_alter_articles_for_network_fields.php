<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            // si tu dois renommer: nécessite doctrine/dbal
            if (Schema::hasColumn('articles', 'image')) {
                $table->renameColumn('image', 'main_image_url'); // composer require doctrine/dbal si erreur
            }

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
            if (!Schema::hasColumn('articles', 'specs')) {
                $table->json('specs')->nullable()->after('main_image_url');
            }

            // Index utiles
            $table->index(['category', 'brand']);
        });

        // Backfill simple (optionnel)
        DB::table('articles')
            ->whereNull('brand')
            ->update(['brand' => 'Cisco']);
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex(['category', 'brand']);
            if (Schema::hasColumn('articles', 'specs')) $table->dropColumn('specs');
            if (Schema::hasColumn('articles', 'stock_quantity')) $table->dropColumn('stock_quantity');
            if (Schema::hasColumn('articles', 'sku')) $table->dropUnique('articles_sku_unique');
            if (Schema::hasColumn('articles', 'sku')) $table->dropColumn('sku');
            if (Schema::hasColumn('articles', 'category')) $table->dropColumn('category');
            if (Schema::hasColumn('articles', 'model')) $table->dropColumn('model');
            if (Schema::hasColumn('articles', 'brand')) $table->dropColumn('brand');

            if (Schema::hasColumn('articles', 'main_image_url')) {
                $table->renameColumn('main_image_url', 'image');
            }
        });
    }
};