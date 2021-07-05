<title>{{ config('app.name', 'Laravel') }} | All courses</title>
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('All courses') }}
        </h2>
    </x-slot>

    <div class="py-2">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <!-- Start top-category-widget Area -->
                    <section class="container">
                            <div class="row">

                                    @forelse ($courses as $cours)
                                    <div class="col-lg-4 col-sm-12 col-md-4 col-4">
                                        <div class="max-w-md px-8 py-4 my-20 bg-white rounded-lg shadow ">
                                            <div class="flex justify-center -mt-16 md:justify-end">
                                                <img class="object-cover w-20 h-20 p-1 border-4 border-indigo-500 rounded-full shadow bg-green-50 border-" src="{{Storage::url($cours->image)}}">
                                            </div>
                                            <div>
                                                <h2 class="text-3xl font-semibold text-gray-800">{{$cours->title}}</h2>
                                                <p class="mt-2 text-gray-600">{{$cours->descriptif}}</p>
                                            </div>
                                            <div>Proposed by <span  class="text-green-800">{{$cours->enseignant->user->nom_utilisateur}}</span></div>
                                            <div class="flex justify-end mt-4">
                                                <a href="{{route("course",$cours->id)}}" class="text-xl font-medium text-indigo-500">Read</a>
                                            </div>
                                        </div>
                                    </div>
                                    @empty
                                        Nothing to display.
                                    @endforelse
                                </div>
                            </div>
                            <nav class="blog-pagination justify-content-center d-flex">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a href="#" class="page-link" aria-label="Previous">
                                            <span aria-hidden="true">
                                                <span class="lnr lnr-chevron-left"></span>
                                            </span>
                                        </a>
                                    </li>
                                    <li class="page-item"><a href="#" class="page-link">01</a></li>
                                    <li class="page-item active"><a href="#" class="page-link">02</a></li>
                                    <li class="page-item"><a href="#" class="page-link">03</a></li>
                                    <li class="page-item"><a href="#" class="page-link">04</a></li>
                                    <li class="page-item"><a href="#" class="page-link">09</a></li>
                                    <li class="page-item">
                                        <a href="#" class="page-link" aria-label="Next">
                                            <span aria-hidden="true">
                                                <span class="lnr lnr-chevron-right"></span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>
                    <!-- End top-category-widget Area -->

        </div>
    </div>
    @include("eclipse-interface.layouts.footer")
</x-app-layout>
{{-- @include("components.footer") --}}
