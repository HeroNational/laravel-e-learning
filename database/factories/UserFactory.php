<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $roles=["administrator","student","teacher"];
        return [
            'nom_utilisateur' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            "pays"=>$this->faker->country(),
            "ville_residence"=>$this->faker->city(),
            "telephone"=>$this->faker->phoneNumber(),
            "biographie"=>$this->faker->text(),
            "newsletter"=>$this->faker->boolean(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            "role"=>$roles[mt_rand(0,2)],
            'email_verified_at' => now(),
            "pseudo"=>ucfirst($this->faker->unique()->word().$this->faker->numberBetween(1,200)),
            'remember_token' => Str::random(20),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
