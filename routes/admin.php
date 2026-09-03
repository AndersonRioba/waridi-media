<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\LivestreamEventController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\MediaUploadController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    // Projects
    Route::resource('projects', ProjectController::class)->except(['show']);

    // Services
    Route::resource('services', ServiceController::class)->except(['show']);

    // Team
    Route::resource('team', TeamMemberController::class)->except(['show']);

    // Testimonials
    Route::resource('testimonials', TestimonialController::class)->except(['show']);

    // Blog
    Route::resource('blog', BlogPostController::class)->except(['show']);

    // Livestream
    Route::resource('livestream', LivestreamEventController::class)->except(['show']);

    // Inquiries
    Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::get('inquiries/{inquiry}', [InquiryController::class, 'show'])->name('inquiries.show');
    Route::patch('inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.status');
    Route::patch('inquiries/{inquiry}/notes', [InquiryController::class, 'updateNotes'])->name('inquiries.notes');
    Route::delete('inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');

    // Settings
    Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');

    // Users (admin only)
    Route::resource('users', UserController::class)->except(['show']);

    // Media Upload
    Route::post('media/upload', [MediaUploadController::class, 'upload'])->name('media.upload');
});
