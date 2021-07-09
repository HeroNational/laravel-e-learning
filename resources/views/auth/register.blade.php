<x-guest-layout>
    <x-slot name="logo">
        <a href="/">
            <x-application-logo class="w-20 h-20 text-gray-500 fill-current" />
        </a>
    </x-slot>

    <style>
        .bg-image {
            background-size:cover!important;
            background-image: url({{ Storage::url("images/bg2-2.svg")}});
        }
        .backdrop {
            backdrop-filter: blur(5px);
        }
    </style>

    <div class="shadow bg-gradient-to-tr from-green-300 to-green-400">
            @include("eclipse-interface.layouts.navbar")
            <br><br>
            <div class="flex items-center justify-center w-full pt-5">
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
                        REGISTER
                    </h3>

                    <!-- Session Status -->
                    <x-auth-session-status class="mb-4" :status="session('status')" />

                    <!-- Validation Errors -->
                    <x-auth-validation-errors class="mb-4" :errors="$errors" />
                    <form method="POST" action="{{ route('register') }}"  enctype="multipart/form-data" class="flex flex-col items-center justify-center w-full gap-3 px-3">
                        @csrf
                        <input type="file" accept="image/jpeg, image/png" name="avatar" class="hidden w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="avatarImg">
                        <label for="avatarImg" class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 transition-all duration-200 ease-in-out bg-green-100 border-green-700 rounded shadow-sm hover:text-gray-100 hover:bg-green-600 tborder focus:outline-none focus:border-green-500 " >Choose a picture image for profile</label>
                        <input
                            type="text" placeholder="Full name"
                            name="name" :value="old('name')" required autofocus
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        >
                        <input
                            type="Text" placeholder="Pseudo"
                            name="pseudo" :value="old('pseudo')" required autofocus
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        >
                        <input
                            type="Text" placeholder="Phone number"
                            name="phone" :value="old('phone')" required autofocus
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        >
                        <input
                            type="email" placeholder="email.."
                            name="email" :value="old('email')" required autofocus
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        >
                        <label for="bio">Biography</label>
                        <textarea
                            id="bio"
                            name="biographie" :value="old('email')" autofocus
                            placeholder="Biography"
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        ></textarea>

                        <select name="country"
                            class="pl-10 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm col-12 fil focus:outline-none focus:border-green-500"
                            id="country">
                            <option class="w-full px-4" value="">&nbsp;&nbsp;&nbsp;Country&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="cameroun">Cameroon</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Tchad">Tchad</option>
                            <option value="Autres">Autres</option>
                        </select>
                        <select name="gender"
                            class="pl-10 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm col-12 fil focus:outline-none focus:border-green-500"
                            id="gender">
                            <option class="w-full px-4" value="">&nbsp;&nbsp;&nbsp;Gender&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Transgender">Transgender</option>
                        </select>
                        <input
                            type="password" placeholder="password.."
                                    type="password"
                                    name="password"
                                    required autocomplete="new-password"
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        >
                        <input
                            type="password" placeholder="password.."
                            name="password_confirmation"
                            type="password"
                            required autocomplete="new-password"
                            class="w-full px-4 py-2 text-base placeholder-gray-500 placeholder-opacity-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500"
                        >

                        <div class="flex items-center justify-end w-full mt-4">
                            <button class="flex justify-center w-full px-3 py-1 ml-2 text-white bg-green-500 rounded witems-center hover:bg-green-600 focus:outline-none focus:ring">
                                <svg class="inline w-5 h-5"fill="none"stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                </svg>
                                <p class="ml-1 text-lg">
                                register
                                </p>
                            </button>
                        </div>


                    </form>

                    <p class="mt-2 text-sm text-gray-700">
                    Already have an account?
                    @if (Route::has('login'))
                    <a href="{{ route("login") }}" class="mt-3 font-bold text-green-500 underline hover:text-green-600 focus:outline-none">
                        Login
                    </a>
                    @endif
                    </p>
                </div>
            </div>
        </div>
        @include("eclipse-interface.layouts.footer")
    </div>
</x-guest-layout>
