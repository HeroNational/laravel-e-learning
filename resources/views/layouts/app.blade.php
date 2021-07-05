<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">


        <link rel="shortcut icon" href="{{config('app.icon', Storage::url("images\Computer.png"))}}" type="image/x-icon">
        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/eclipse.css') }}">
        @include("components.dark-theme")
    </head>
    <body class="font-sans antialiased" id="main">
        <div class="min-h-screen bg-gray-100 " >
            @include('layouts.navigation')

            <!-- Page Heading -->
            <header class="bg-white shadow">
                <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {{ $header }}
                </div>
            </header>

            <!-- Page Content -->
            <main>
                {{ $slot }}
            </main>
        </div>
    </body>
    <script src="{{ asset("js/jquery.min.js")}}"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script>
        function setDark(){
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                localStorage.theme=="light";
            }else{
                localStorage.theme="dark";
            }
        }
    </script>
</html>
