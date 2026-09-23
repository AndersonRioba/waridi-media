<?php
/**
 * Standalone Production Deploy & Migration Runner for Waridi Media
 *
 * This file allows running migrations and seeders directly, even if
 * Laravel's route cache or config cache is currently active.
 *
 * Usage in browser:
 *   https://yourdomain.com/deploy-runner.php?secret=YOUR_SECRET&action=migrate
 *   https://yourdomain.com/deploy-runner.php?secret=YOUR_SECRET&action=seed&class=ClientSeeder
 *   https://yourdomain.com/deploy-runner.php?secret=YOUR_SECRET&action=seed&class=FaqSeeder
 *   https://yourdomain.com/deploy-runner.php?secret=YOUR_SECRET&action=all
 *   https://yourdomain.com/deploy-runner.php?secret=YOUR_SECRET&action=clear-cache
 */

header('Content-Type: text/html; charset=utf-8');

$baseDir = dirname(__DIR__);

// 1. Read .env file directly to verify secret
$envFile = $baseDir . '/.env';
$expectedSecret = null;
$appKey = null;

if (file_exists($envFile)) {
    $envContent = file_get_contents($envFile);
    if (preg_match('/^UTILITY_SECRET=(.*)$/m', $envContent, $m)) {
        $expectedSecret = trim($m[1], " \t\n\r\0\x0B\"'");
    }
    if (preg_match('/^APP_KEY=(.*)$/m', $envContent, $m)) {
        $appKey = trim($m[1], " \t\n\r\0\x0B\"'");
    }
}

$providedSecret = (string) ($_GET['secret'] ?? '');

$authorized = false;
if (! empty($expectedSecret) && hash_equals($expectedSecret, $providedSecret)) {
    $authorized = true;
} elseif (! empty($appKey) && hash_equals($appKey, $providedSecret)) {
    $authorized = true;
}

if (! $authorized) {
    http_response_code(403);
    echo '<!DOCTYPE html><html><body style="background:#0d1117;color:#f85149;font-family:monospace;padding:40px;line-height:1.6;">';
    echo '<h2 style="color:#ff7b72;">403 Forbidden — Valid ?secret= Required</h2>';
    echo '<p>Pass your <code>UTILITY_SECRET</code> (or <code>APP_KEY</code>) from your <code>.env</code> file:</p>';
    echo '<p style="color:#8b949e;">Example: <code>deploy-runner.php?secret=YOUR_SECRET&action=all</code></p>';
    echo '</body></html>';
    exit;
}

// 2. Clear bootstrap cache files so newly added code is immediately picked up
$cacheFiles = glob($baseDir . '/bootstrap/cache/*.php');
$clearedCacheCount = 0;
if ($cacheFiles) {
    foreach ($cacheFiles as $file) {
        if (basename($file) !== '.gitignore') {
            @unlink($file);
            $clearedCacheCount++;
        }
    }
}

// 3. Bootstrap Laravel Console
require_once $baseDir . '/vendor/autoload.php';
$app = require_once $baseDir . '/bootstrap/app.php';

$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$action = strtolower((string) ($_GET['action'] ?? 'all'));
$class = (string) ($_GET['class'] ?? '');

$outputLog = [];
$outputLog[] = "========================================================";
$outputLog[] = " Waridi Media Production Deploy Runner";
$outputLog[] = " " . date('Y-m-d H:i:s');
$outputLog[] = " Action: " . htmlspecialchars($action);
$outputLog[] = " Cleared {$clearedCacheCount} bootstrap cache files";
$outputLog[] = "========================================================\n";

function runArtisanCommand($command, array $parameters = [])
{
    global $outputLog;
    try {
        \Illuminate\Support\Facades\Artisan::call($command, $parameters);
        $res = trim(\Illuminate\Support\Facades\Artisan::output());
        $outputLog[] = "✔ artisan {$command}: " . ($res ?: 'Done.');
    } catch (\Throwable $e) {
        $outputLog[] = "✘ artisan {$command} ERROR: " . $e->getMessage();
    }
}

switch ($action) {
    case 'clear-cache':
        runArtisanCommand('optimize:clear');
        break;

    case 'migrate':
        runArtisanCommand('migrate', ['--force' => true]);
        break;

    case 'seed':
        $seedParams = ['--force' => true];
        if (! empty($class)) {
            if (! str_contains($class, '\\')) {
                $class = "Database\\Seeders\\{$class}";
            }
            $seedParams['--class'] = $class;
        }
        runArtisanCommand('db:seed', $seedParams);
        break;

    case 'all':
    default:
        $outputLog[] = "--- Step 1: Running Pending Migrations ---";
        runArtisanCommand('migrate', ['--force' => true]);

        $outputLog[] = "\n--- Step 2: Running Seeders ---";
        runArtisanCommand('db:seed', ['--class' => 'Database\\Seeders\\ClientSeeder', '--force' => true]);
        runArtisanCommand('db:seed', ['--class' => 'Database\\Seeders\\FaqSeeder', '--force' => true]);

        $outputLog[] = "\n--- Step 3: Clearing and Refreshing Caches ---";
        runArtisanCommand('optimize:clear');
        break;
}

$outputLog[] = "\n========================================================";
$outputLog[] = " Execution completed successfully!";
$outputLog[] = "========================================================";

echo '<!DOCTYPE html><html><head><title>Deploy Runner - Waridi Media</title></head>';
echo '<body style="background:#0d1117;color:#3fb950;font-family:monospace;font-size:14px;line-height:1.7;padding:32px;margin:0;">';
echo '<pre style="margin:0;white-space:pre-wrap;">' . htmlspecialchars(implode("\n", $outputLog)) . '</pre>';
echo '</body></html>';
