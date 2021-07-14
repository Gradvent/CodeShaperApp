<?php

namespace Database\Factories;

use App\Models\Pasta;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PastaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pasta::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'created_at' => now(),
            // 'user_id' => 1,
            'title' => $this->faker->title(),
            'textcode' =>$this->faker->text(),
            // 'lang' => ,
            // 'closed_at',
            'access' => 'public',
        ];
    }
}
