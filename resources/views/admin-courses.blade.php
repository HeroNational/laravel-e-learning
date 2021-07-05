<title>{{ config('app.name', 'Laravel') }} | Administrate courses</title>
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            @if (isset(auth()->user()->enseignant->id))
                {{ __('My online courses') }}
            @else
                {{ __('Online courses') }}
            @endif

        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                {{-- <img src="{{Storage::get($ courses[0]->id)}}" class="w-full" alt="" srcset=""> --}}
                <div class="p-6 border-b border-gray-200">
                    <!-- Start top-category-widget Area -->
                    <section class="pt-10 top-category-widget-area pb-90 ">
                        <div class="container">
                            <div class="row">
                                @forelse ($courses as $course)

                                <div class=" col-lg-4 col-sm-12 col-md-4 col-4">
                                    <div class="single-cat-widget">
                                        <div class="relative content">
                                            <div class=" overlay overlay-bg"></div>
                                            <a href="{{route("course",$course->id)}}">
                                                <div class="thumb">
                                                    <img class="mx-auto content-image img-fluid d-block" src="{{Storage::url($course->image)}}" alt="">
                                                </div>
                                                <div class="content-details">
                                                    <h4 class="mx-auto content-title text-uppercase">{{substr($course->title,0,15)}}...</h4>
                                                    <p>{{substr($course->descriptif,0,70)}}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                @empty

                                @endforelse
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
        </div>
    </div>
    @include("eclipse-interface.layouts.footer")
</x-app-layout>
{{-- @include("components.footer") --}}
