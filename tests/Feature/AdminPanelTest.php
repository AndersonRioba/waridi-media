<?php

use App\Models\User;

test('unauthenticated users are redirected from admin dashboard', function () {
    $response = $this->get('/admin');

    $response->assertRedirect('/login');
});

test('authenticated staff can view admin dashboard', function () {
    $user = User::factory()->create(['role' => 'editor']);

    $response = $this->actingAs($user)->get('/admin');

    $response->assertStatus(200);
});

test('authenticated admin can view settings and users', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get('/admin/settings');
    $response->assertStatus(200);

    $usersResponse = $this->actingAs($admin)->get('/admin/users');
    $usersResponse->assertStatus(200);
});

test('admin can view projects index', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get('/admin/projects');

    $response->assertStatus(200);
});

test('admin can view inquiries index', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get('/admin/inquiries');

    $response->assertStatus(200);
});
