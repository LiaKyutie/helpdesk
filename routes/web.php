<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function (Request $request) {
        $counts = $request->user()->tickets()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Dashboard', [
            'counts' => $counts,
            'recent' => $request->user()->tickets()->latest()->take(5)->get(),
        ]);
    })->name('dashboard');

    Route::resource('tickets', TicketController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';