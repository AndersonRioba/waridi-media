<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        \Illuminate\Support\Facades\Route::model('team', \App\Models\TeamMember::class);
        \Illuminate\Support\Facades\Route::model('blog', \App\Models\BlogPost::class);
        \Illuminate\Support\Facades\Route::model('livestream', \App\Models\LivestreamEvent::class);
    }
}
