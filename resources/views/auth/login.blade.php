<x-guest-layout>
    <x-slot name="logo">
        <a href="/">
            <x-application-logo class="w-20 h-20 text-gray-500 fill-current" />
        </a>
    </x-slot>

    <style>
        .bg-image {
            background-size:cover!important;
            background-image: url({{ Storage::url("images/bg10-2.svg")}});
        }
        .backdrop {
            backdrop-filter: blur(5px);
        }
    </style>


    <div class="shadow bg-gradient-to-tr from-green-300 to-green-400">
        @include("eclipse-interface.layouts.navbar")
            <div class="flex items-center justify-center w-full h-screen">

            <div class="flex flex-col items-center w-full mx-3 overflow-hidden bg-green-600 bg-center bg-cover rounded shadow-md bg-image sm:w-1/2 md:w-9/12 lg:w-1/2 md:mx-5 lg:mx-0 md:flex-row">
                <div class="flex flex-col items-center justify-center w-full bg-green-600 bg-opacity-25 md:w-1/2 backdrop">
                    <h1 class="my-2 text-3xl font-extrabold text-white md:text-4xl md:my-0">
                        Better Learning
                    </h1>
                    <p class="hidden mb-2 font-mono text-white md:block">
                        Get something new for your life.
                    </p>
                </div>
            <div class="flex flex-col items-center w-full px-4 py-5 bg-white md:w-1/2 md:py-8">
                <h3 class="flex items-center mb-4 text-3xl font-bold text-green-500">
                    LOGIN
                </h3>

                <!-- Session Status -->
                <x-auth-session-status class="mb-4" :status="session('status')" />

                <!-- Validation Errors -->
                <x-auth-validation-errors class="mb-4" :errors="$errors" />

                <form method="POST" action="{{ route('login') }}" class="flex flex-col items-center justify-center w-full gap-3 px-3">
                    @csrf
                    <input
                        type="email" placeholder="email.."
                        name="email" :value="old('email')" required autofocus
                        class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                    >
                    <input
                        type="password" placeholder="password.."
                        name="password"
                        required autocomplete="current-password"
                        class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                    >

                    @if (Route::has('password.request'))
                        <a class="float-left text-sm text-left underline gray-600 text- hover:text-green-900" href="{{ route('password.request') }}">
                            {{ __('Forgot your password?') }}
                        </a>
                    @endif

                    <!-- Remember Me -->
                    <div class="block mt-4">
                        <label for="remember_me" class="inline-flex items-left">
                            <input id="remember_me" type="checkbox" class="text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember">
                            <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                        </label>
                    </div>
                    <div class="flex items-center justify-end w-full mt-4">
                        <button class="flex items-center justify-center w-full px-3 py-1 ml-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring">
                            <svg class="inline w-5 h-5"fill="none"stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                            </svg>
                            <p class="ml-1 text-lg">
                            Login
                            </p>
                        </button>
                    </div>


                </form>

                <p class="mt-2 text-sm text-gray-700">
                Don't have an account?
                @if (Route::has('register'))
                <a href="{{ route("register") }}" class="mt-3 font-bold text-green-500 underline hover:text-green-600 focus:outline-none">
                    register
                </a>
                @endif
                </p>
            </div>
            </div>
        </div>
        @include("eclipse-interface.layouts.footer")
    </div>
</x-guest-layout>
