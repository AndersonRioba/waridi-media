<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LivestreamController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

// Public Marketing & Portfolio Routes
Route::get('/', HomeController::class)->name('home');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');
Route::get('/services', ServiceController::class)->name('services');
Route::get('/about', AboutController::class)->name('about');
Route::get('/livestream', LivestreamController::class)->name('livestream');
Route::get('/journal', [BlogController::class, 'index'])->name('blog.index');
Route::get('/journal/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/contact', [ContactController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Breeze User Profile Routes & Dashboard Redirect
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Panel Routes
require __DIR__.'/admin.php';

// Auth Routes (Breeze)
require __DIR__.'/auth.php';

// Temporary utility route to clear cache / run migrations without terminal
Route::get('/clear-cache', function () {
    $results = [];
    
    try {
        \Illuminate\Support\Facades\Artisan::call('optimize:clear');
        $results[] = 'optimize:clear: ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Throwable $e) {
        $results[] = 'optimize:clear error: ' . $e->getMessage();
    }

    try {
        \Illuminate\Support\Facades\Artisan::call('config:clear');
        $results[] = 'config:clear: ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Throwable $e) {
        $results[] = 'config:clear error: ' . $e->getMessage();
    }

    try {
        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        $results[] = 'cache:clear: ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Throwable $e) {
        $results[] = 'cache:clear error: ' . $e->getMessage();
    }

    try {
        \Illuminate\Support\Facades\Artisan::call('view:clear');
        $results[] = 'view:clear: ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Throwable $e) {
        $results[] = 'view:clear error: ' . $e->getMessage();
    }

    try {
        \Illuminate\Support\Facades\Artisan::call('route:clear');
        $results[] = 'route:clear: ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Throwable $e) {
        $results[] = 'route:clear error: ' . $e->getMessage();
    }

    return response('<pre style="background:#111;color:#0f0;padding:20px;font-family:monospace;font-size:14px;">' . implode("\n", $results) . "\n\nAll caches cleared successfully!</pre>");
});

