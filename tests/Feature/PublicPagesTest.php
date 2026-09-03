<?php

use App\Models\BlogPost;
use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;

test('home page can be rendered', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('portfolio index page can be rendered', function () {
    $response = $this->get('/portfolio');

    $response->assertStatus(200);
});

test('portfolio detail page can be rendered', function () {
    $project = Project::firstOrCreate(
        ['slug' => 'sample-test-project'],
        [
            'title' => 'Sample Test Project',
            'category' => 'photography',
            'cover_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552',
            'status' => 'published',
        ]
    );

    $response = $this->get("/portfolio/{$project->slug}");

    $response->assertStatus(200);
});

test('services page can be rendered', function () {
    $response = $this->get('/services');

    $response->assertStatus(200);
});

test('about page can be rendered', function () {
    $response = $this->get('/about');

    $response->assertStatus(200);
});

test('livestream page can be rendered', function () {
    $response = $this->get('/livestream');

    $response->assertStatus(200);
});

test('journal index page can be rendered', function () {
    $response = $this->get('/journal');

    $response->assertStatus(200);
});

test('journal show page can be rendered', function () {
    $post = BlogPost::firstOrCreate(
        ['slug' => 'sample-test-article'],
        [
            'title' => 'Sample Test Article',
            'cover_image' => 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
            'body' => '<p>Test article body.</p>',
            'status' => 'published',
            'published_at' => now(),
        ]
    );

    $response = $this->get("/journal/{$post->slug}");

    $response->assertStatus(200);
});

test('contact page can be rendered and inquiry submitted', function () {
    $response = $this->get('/contact');
    $response->assertStatus(200);

    $inquiryData = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '+254712345678',
        'service_group_interest' => 'photography',
        'service_interest' => 'Studio Portraits',
        'event_date' => '2026-10-15',
        'message' => 'Hello, I would like to book a studio portrait session.',
    ];

    $postResponse = $this->post('/contact', $inquiryData);

    $postResponse->assertRedirect();
    $this->assertDatabaseHas('inquiries', [
        'email' => 'jane@example.com',
        'name' => 'Jane Doe',
    ]);
});
