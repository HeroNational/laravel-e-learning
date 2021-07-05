<title>{{ config('app.name', 'Laravel') }} | Courses detail</title>
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl leading-tight text-center text-green-800 font-semi-bold">
            {{ $leçon->title}}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200 ">
                    <!-- Start post-content Area -->
                    <section class="post-content-area >
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-8 posts-list">
                                    <div class="single-post row">
                                        <div class="col-lg-12">
                                            <div class="feature-img">
                                                <img class="img-fluid" src="{{Storage::url($leçon->image)}}" alt="">
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 meta-details">
                                            {{-- <ul class="tags">
                                                {{dd($leçon->cour->categorie)}}
                                                @foreach ($leçon->cour->categorie as $cours)
                                                    <li><a href="#">Lifestyle</a></li>
                                                @endforeach
                                            </ul> --}}
                                            <div class="user-details row">
                                                <p class="user-name col-lg-12 col-md-12 col-6"><a href="#">{{$leçon->cour->enseignant->user->nom_utilisateur}}</a> <span
                                                        class="lnr lnr-user"></span></p>
                                                <p class="date col-lg-12 col-md-12 col-6"><a href="#">{{$leçon->created_at->format("F j, Y, h:i:s a")}}</a> <span
                                                        class="lnr lnr-calendar-full"></span></p>
                                                {{-- <p class="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span
                                                        class="lnr lnr-eye"></span></p>
                                                <p class="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span
                                                        class="lnr lnr-bubble"></span></p> --}}
                                                <ul class="social-links col-lg-12 col-md-12 col-6">
                                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                    <li><a href="#"><i class="fa fa-github"></i></a></li>
                                                    <li><a href="#"><i class="fa fa-behance"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="container border-l col-lg-9 col-md-9">
                                            <h3 class="mt-20 mb-20">{{$leçon->title}}</h3>
                                            <p class="text-sm text-green-800 excert">
                                                &nbsp;&nbsp;&nbsp;&nbsp;{{$leçon->descriptif}}
                                            </p>
                                            <p class="text-black" style="color: black!important">
                                                &nbsp;&nbsp;&nbsp;&nbsp;{!! html_entity_decode($leçon->contenu) !!}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 sidebar-widgets">
                                    <div class="widget-wrap ">
                                        <div class="single-sidebar-widget search-widget">
                                            <form class="search-form" action="#">
                                                <input placeholder="Search Posts" name="search" type="text"
                                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Search Posts'">
                                                <button type="submit"><i class="fa fa-search"></i></button>
                                            </form>
                                        </div>
                                        <div class="single-sidebar-widget user-info-widget">
                                            <img class="rounded-full shadow" src="{{Storage::url($leçon->cour->enseignant->user->avatar)}}" alt="">
                                            <a href="#">
                                                <h4>{{$leçon->cour->enseignant->user->nom_utilisateur}}</h4>
                                            </a>
                                            <p>
                                                {{$leçon->cour->enseignant->profession}}
                                            </p>
                                            <ul class="social-links">
                                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                                <li><a href="#"><i class="fa fa-github"></i></a></li>
                                                <li><a href="#"><i class="fa fa-behance"></i></a></li>
                                            </ul>
                                            <p>
                                                {{$leçon->cour->enseignant->biographie}}
                                            </p>
                                        </div>
                                        <div class="single-sidebar-widget ads-widget">
                                            <a href="#"><img class="img-fluid" src="img/blog/ads-banner.jpg" alt=""></a>
                                        </div>
                                        <div class="single-sidebar-widget post-category-widget">
                                            <h4 class="category-title">Post Catgories</h4>
                                            <ul class="cat-list">
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Technology</p>
                                                        <p>37</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Lifestyle</p>
                                                        <p>24</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Fashion</p>
                                                        <p>59</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Art</p>
                                                        <p>29</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Food</p>
                                                        <p>15</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Architecture</p>
                                                        <p>09</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="d-flex justify-content-between">
                                                        <p>Adventure</p>
                                                        <p>44</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="single-sidebar-widget tag-cloud-widget">
                                            <h4 class="tagcloud-title">Tag Clouds</h4>
                                            <ul>
                                                <li><a href="#">Technology</a></li>
                                                <li><a href="#">Fashion</a></li>
                                                <li><a href="#">Architecture</a></li>
                                                <li><a href="#">Fashion</a></li>
                                                <li><a href="#">Food</a></li>
                                                <li><a href="#">Technology</a></li>
                                                <li><a href="#">Lifestyle</a></li>
                                                <li><a href="#">Art</a></li>
                                                <li><a href="#">Adventure</a></li>
                                                <li><a href="#">Food</a></li>
                                                <li><a href="#">Lifestyle</a></li>
                                                <li><a href="#">Adventure</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- End post-content Area -->
                </div>
            </div>
        </div>
    </div>
    @include("eclipse-interface.layouts.footer")
</x-app-layout>
{{-- @include("components.footer") --}}
