<?php

namespace App\Http\Controllers;

use App\Enums\ServiceGroup;
use App\Models\Service;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __invoke(): Response
    {
        $photographyServices = Service::active()->byGroup(ServiceGroup::PHOTOGRAPHY)->get();
        $mediaProductionServices = Service::active()->byGroup(ServiceGroup::MEDIA_PRODUCTION)->get();
        $printCreativeServices = Service::active()->byGroup(ServiceGroup::PRINT_CREATIVE)->get();

        $showPricing = Setting::get('show_public_pricing', true);

        return Inertia::render('Public/Services', [
            'photographyServices' => $photographyServices,
            'mediaProductionServices' => $mediaProductionServices,
            'printCreativeServices' => $printCreativeServices,
            'showPricing' => (bool) $showPricing,
        ]);
    }
}
