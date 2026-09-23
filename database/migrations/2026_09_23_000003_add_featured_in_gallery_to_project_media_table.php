<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_media', function (Blueprint $table) {
            $table->boolean('featured_in_gallery')->default(false)->after('caption');
        });
    }

    public function down(): void
    {
        Schema::table('project_media', function (Blueprint $table) {
            $table->dropColumn('featured_in_gallery');
        });
    }
};
