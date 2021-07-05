<title>{{ config('app.name', 'Laravel') }} | Courses</title>
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Course detail') }} <a href="#" class="float-right shadow bg-green-00 hover:bg-green-600 hover:text-white btn text-uppercase enroll">Enroll the course</a>
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200">
                    <img class="w-full" src="{{Storage::url($course->image)}}" alt="">
                    <!--================ Start Course Details Area =================-->
                    <section class="course-details-area">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 course-details-left">
                                    <div class="content-wrapper">
                                        <h4 class="title">Objectives</h4>
                                        <ul class="ml-4 list-decimal">
                                            <li>}Master course in all plan.</li>
                                            <li>take right way to learn step by step.</li>
                                        </ul>

                                        <h4 class="title">Course Outline</h4>
                                        <div class="content">
                                            <ul class="course-list">
                                                @forelse ($course->leçons as $lesson)

                                                <li class="justify-content-between d-flex">
                                                    <p>{{$lesson->title}}</p>
                                                    @if (isset(Auth::user()->enseignant))
                                                    <div>
                                                        <span class="text-uppercase justify-content-between d-flex" ><a href="{{route('lesson',["id"=>$lesson])}}" class="btn ti-eye">&nbsp;Read</a><a href="{{route("edit-lesson",["id"=>$lesson->id])}}" class="btn ti-pencil">&nbsp;Update</a><a href="{{route("edit-lesson",["id"=>$lesson->id])}}" class="ml-3 btn hover:bg-red-600 ti-trash">&nbsp;Delete</a></span>
                                                    </div>
                                                    @else
                                                        <a href="{{route('lesson',["id"=>$lesson])}}">Read</a>
                                                    @endif

                                                @empty

                                                @endforelse
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <!--================ End Course Details Area =================-->

                </div>
            </div>
        </div>
    </div>
    @include("eclipse-interface.layouts.footer")
</x-app-layout>
{{-- @include("components.footer") --}}
