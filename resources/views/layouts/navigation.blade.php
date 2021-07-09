<nav x-data="{ open: false }" class="sticky top-0 z-50 bg-white border-b border-gray-100 disappear">
    <!-- Primary Navigation Menu -->
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Logo -->
                <div class="flex items-center flex-shrink-0">
                    <a href="{{ route('dashboard') }}" class="w-7">
                        <img src="{{Storage::url("images/Computer.png")}}" class="rounded" alt="">
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    <x-nav-link :href="route('home')" :active="request()->routeIs('home')">
                        <span class="mr-2 ti-home"></span>{{ __('Home') }}
                    </x-nav-link>
                     <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                        <span class="mr-2 ti-dashboard"></span>{{ __('Dashboard') }}
                    </x-nav-link>
                    <div class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent active hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                        <x-dropdown  align="right" width="48">
                            <x-slot name="trigger">
                                <button class="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out active hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    <div><span class="mr-2 ti-book"></span> Courses</div>

                                    <div class="ml-1">
                                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </x-slot>

                            <x-slot name="content">

                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('my-courses')}}">
                                    My courses
                                </a>
                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('courses')}}">
                                    All courses
                                </a>
                            </x-slot>
                        </x-dropdown>
                    </div>
                    @if (Auth::user()->administrateur || Auth::user()->enseignant)
                    <div class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-transparent active hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                        <x-dropdown  align="right" width="48">
                            <x-slot name="trigger">
                                <button class="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out active hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    <div><span class="ti-settings"></span> Administration</div>

                                    <div class="ml-1">
                                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </x-slot>

                            <x-slot name="content">

                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('edit-course')}}">
                                    Create a course
                                </a>
                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('edit-lesson')}}">
                                    Create a lesson
                                </a>
                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('admin-course')}}">
                                    My courses
                                </a>
                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('courses')}}">
                                    All courses
                                </a>
                                @if (Auth::user()->administrateur)

                                <a
                                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    href="{{route('users')}}">
                                    Users
                                </a>
                                @endif
                            </x-slot>
                        </x-dropdown>
                    </div>
                    @endif
                </div>
            </div>
            <!-- Settings Dropdown -->
            <div class="hidden sm:flex sm:items-center sm:ml-6">
                <x-dropdown align="right" width="48">
                    <x-slot name="trigger">
                        <button class="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                                    @if (Storage::disk("public")->exists(Auth::user()->avatar))
                                        <img class="inline-block rounded-full shadow w-9 h-9 ring-2 ring-white" src="{{ Storage::url(Auth::user()->avatar) }}" alt="">
                                    @else
                                        <span  class="inline-block w-10 h-10 text-3xl text-white align-middle bg-green-700 rounded-full shadow text- ring-2 ring-white">
                                            <span class="relative bottom-0 left-0">{{ ucfirst(substr(Auth::user()->nom_utilisateur, 0,1)) }}</span>
                                        </span>
                                    @endif
                                </span>
                                    &nbsp;&nbsp;{{ ucfirst(Auth::user()->nom_utilisateur) }}

                            <div class="ml-1">
                                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </x-slot>

                    <x-slot name="content">

                        <x-responsive-nav-link :href="route('profile')" :active="request()->routeIs('profile')">
                            <span class="mr-2 ti-user"></span>{{ __('Profile') }}
                        </x-responsive-nav-link>
                        <!-- Authentication -->
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <x-responsive-nav-link :href="route('logout')"
                                    onclick="event.preventDefault();
                                                this.closest('form').submit();">
                                <span class="mr-2 ti-shift-left-alt"></span>{{ __('Log Out') }}
                            </x-responsive-nav-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

            <!-- Hamburger -->
            <div class="flex items-center -mr-2 sm:hidden">
                <button @click="open = ! open" class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                    <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': ! open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': ! open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div :class="{'block': open, 'hidden': ! open}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                <span class="mr-2 ti-dashboard"></span>{{ __('Dashboard') }}
            </x-responsive-nav-link>
            <span class="hover:bg-green-400">
                <x-responsive-nav-link :href="route('my-courses')" :active="request()->routeIs('my-courses')">
                    <span class="ml-2">{{ __('My courses') }}</span>
                </x-responsive-nav-link>
            </span>
            <span class="hover:bg-green-400">
                <x-responsive-nav-link :href="route('courses')" :active="request()->routeIs('courses')">
                    <span class="ml-2">{{ __('All courses') }}</span>
                </x-responsive-nav-link>
            </span>
        </div>

        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-gray-200">
            {{-- <div class="px-4">
                <div class="text-base font-medium text-gray-800">{{ Auth::user()->name }}</div>
            </div> --}}

            <div class="mt-3 space-y-1">

                <x-responsive-nav-link :href="route('profile')" :active="request()->routeIs('profile')">
                    <span class="mr-2 ti-user"></span>{{ __('Profile') }}
                </x-responsive-nav-link>
                <!-- Authentication -->
                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <x-responsive-nav-link :href="route('logout')"
                            onclick="event.preventDefault();
                                        this.closest('form').submit();">
                        <span class="mr-2 ti-shift-left-alt"></span>{{ __('Log Out') }}
                    </x-responsive-nav-link>
                </form>
            </div>
        </div>
    </div>
</nav>
