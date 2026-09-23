<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
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
Route::get('/gallery', GalleryController::class)->name('gallery');
Route::get('/services', ServiceController::class)->name('services');
Route::get('/about', AboutController::class)->name('about');
Route::get('/livestream', LivestreamController::class)->name('livestream');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
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

// ──────────────────────────────────────────────────────────────
// Utility routes — for use when SSH terminal access is not available
// (e.g. shared hosting / cPanel deployments).
//
// PROTECTED: all three routes require ?secret=UTILITY_SECRET from .env
// Without the correct secret they return 403 — safe to keep deployed.
//
// Usage:
//   /clear-cache?secret=YOUR_SECRET
//   /run-migrations?secret=YOUR_SECRET
//   /run-seed?secret=YOUR_SECRET
// ──────────────────────────────────────────────────────────────

/** Helper: abort with styled 403 if secret doesn't match */
$guardUtility = function (\Illuminate\Http\Request $request): void {
    $expected = env('UTILITY_SECRET');
    if (! $expected || ! hash_equals($expected, (string) $request->query('secret', ''))) {
        abort(403, 'Forbidden — valid ?secret= required.');
    }
};

Route::get('/clear-cache', function (\Illuminate\Http\Request $request) use ($guardUtility) {
    $guardUtility($request);

    $results = ['[' . now()->toDateTimeString() . '] Clearing all Laravel caches...', ''];

    $commands = ['optimize:clear', 'config:clear', 'cache:clear', 'view:clear', 'route:clear'];
    foreach ($commands as $cmd) {
        try {
            \Illuminate\Support\Facades\Artisan::call($cmd);
            $out = trim(\Illuminate\Support\Facades\Artisan::output()) ?: 'OK';
            $results[] = "✔ {$cmd}: {$out}";
        } catch (\Throwable $e) {
            $results[] = "✘ {$cmd}: " . $e->getMessage();
        }
    }

    $results[] = '';
    $results[] = 'All caches cleared successfully.';

    return response(
        '<pre style="background:#0d1117;color:#3fb950;padding:24px 28px;font-family:monospace;font-size:13px;line-height:1.7;margin:0;">'
        . htmlspecialchars(implode("\n", $results))
        . '</pre>'
    );
})->name('utility.clear-cache');

Route::get('/run-migrations', function (\Illuminate\Http\Request $request) use ($guardUtility) {
    $guardUtility($request);

    $results = ['[' . now()->toDateTimeString() . '] Running database migrations...', ''];

    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $out = trim(\Illuminate\Support\Facades\Artisan::output()) ?: 'No new migrations to run.';
        $results[] = $out;
    } catch (\Throwable $e) {
        $results[] = '✘ migrate error: ' . $e->getMessage();
    }

    $results[] = '';
    $results[] = 'Migration run complete.';

    return response(
        '<pre style="background:#0d1117;color:#3fb950;padding:24px 28px;font-family:monospace;font-size:13px;line-height:1.7;margin:0;">'
        . htmlspecialchars(implode("\n", $results))
        . '</pre>'
    );
})->name('utility.migrate');

Route::get('/run-seed', function (\Illuminate\Http\Request $request) use ($guardUtility) {
    $guardUtility($request);

    $results = ['[' . now()->toDateTimeString() . '] Running database seeders...', ''];

    $params = ['--force' => true];
    if ($class = $request->query('class')) {
        // Support either 'ClientSeeder' or full namespace 'Database\Seeders\ClientSeeder'
        if (! str_contains($class, '\\')) {
            $class = "Database\\Seeders\\{$class}";
        }
        $params['--class'] = $class;
    }

    try {
        \Illuminate\Support\Facades\Artisan::call('db:seed', $params);
        $out = trim(\Illuminate\Support\Facades\Artisan::output()) ?: 'Seeding complete.';
        $results[] = $out;
    } catch (\Throwable $e) {
        $results[] = '✘ db:seed error: ' . $e->getMessage();
    }

    $results[] = '';
    $results[] = 'Seeding run complete.';

    return response(
        '<pre style="background:#0d1117;color:#3fb950;padding:24px 28px;font-family:monospace;font-size:13px;line-height:1.7;margin:0;">'
        . htmlspecialchars(implode("\n", $results))
        . '</pre>'
    );
})->name('utility.seed');

