<?php

namespace Database\Seeders;

use App\Models\Pasta;
use Illuminate\Database\Seeder;

class PastaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pasta::factory(5)->create();
    }
}
