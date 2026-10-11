<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $demo = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            ['name' => 'Demo User', 'password' => Hash::make('password123')]
        );

        if ($demo->tickets()->count() === 0) {
            foreach (range(1, 12) as $i) {
                $demo->tickets()->create([
                    'title'       => "Sample ticket number {$i}",
                    'description' => 'This is a sample description for the demo ticket.',
                    'priority'    => Ticket::PRIORITIES[$i % 4],
                    'status'      => Ticket::STATUSES[$i % 4],
                    'category'    => Ticket::CATEGORIES[$i % 5],
                ]);
            }
        }
    }
}