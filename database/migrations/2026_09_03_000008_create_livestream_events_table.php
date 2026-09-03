<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('livestream_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('client_name')->nullable();
            $table->text('description')->nullable();
            $table->dateTime('scheduled_at');
            $table->string('status')->default('upcoming'); // upcoming, live, completed, cancelled
            $table->string('platform')->default('youtube'); // youtube, vimeo, facebook, other
            $table->string('stream_url');
            $table->string('cover_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('livestream_events');
    }
};
