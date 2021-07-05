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
                <div class="p-6 border-b border-gray-200">
                    <!--================ Start Course Details Area =================-->
                    <section class="course-details-area section-gap">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-8 course-details-left">
                                    <div class="main-image">
                                        <img class="img-fluid" src="img/courses/course-details.jpg" alt="">
                                    </div>
                                    <div class="content-wrapper">
                                        <h4 class="title">Objectives</h4>
                                        <div class="content">
                                            When you enter into any new area of science, you almost always find yourself with a
                                            baffling new language of
                                            technical terms to learn before you can converse with the experts. This is certainly
                                            true in astronomy both in
                                            terms of terms that refer to the cosmos and terms that describe the tools of the trade,
                                            the most prevalent
                                            being the telescope.
                                            <br>
                                            <br>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore
                                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                            ut aliquip ex ea
                                            commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum. Lorem ipsum dolor sit
                                            amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat. Duis aute
                                            irure dolor in reprehenderit in voluptate velit esse cillum.
                                        </div>

                                        <h4 class="title">Eligibility</h4>
                                        <div class="content">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore
                                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                            ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
                                            <br>
                                            <br>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore
                                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                            ut aliquip ex ea
                                            commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum. Lorem ipsum dolor sit
                                            amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat. Duis aute
                                            irure dolor in reprehenderit in voluptate velit esse cillum.
                                        </div>

                                        <h4 class="title">Course Outline</h4>
                                        <div class="content">
                                            <ul class="course-list">
                                                <li class="justify-content-between d-flex">
                                                    <p>Introduction Lesson</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Basics of HTML</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Getting Know about HTML</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Tags and Attributes</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Basics of CSS</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Getting Familiar with CSS</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Introduction to Bootstrap</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Responsive Design</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>
                                                <li class="justify-content-between d-flex">
                                                    <p>Canvas in HTML 5</p>
                                                    <a class="btn text-uppercase" href="{{route('my-course-detail')}}">View Details</a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-lg-4 right-contents">
                                    <ul>
                                        <li>
                                            <a class="justify-content-between d-flex" href="#">
                                                <p>Trainer’s Name</p>
                                                <span class="or">George Mathews</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="justify-content-between d-flex" href="#">
                                                <p>Course Fee </p>
                                                <span>$230</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="justify-content-between d-flex" href="#">
                                                <p>Available Seats </p>
                                                <span>15</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="justify-content-between d-flex" href="#">
                                                <p>Schedule </p>
                                                <span>2.00 pm to 4.00 pm</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <a href="#" class="btn text-uppercase enroll">Enroll the course</a>
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
