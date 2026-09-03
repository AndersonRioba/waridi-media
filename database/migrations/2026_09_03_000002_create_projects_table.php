<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // photography, media_production, print_creative
            $table->string('client')->nullable();
            $table->string('location')->nullable();
            $table->date('project_date')->nullable();
            $table->string('cover_image');
            $table->string('video_url')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('body')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('status')->default('draft'); // draft, published
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
