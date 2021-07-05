<!-- ================ Start Header Area ================= -->
  <header class="default-header ">
  <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="img/logo.png" alt="" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="lnr lnr-menu"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li><a class="transition duration-150 ease-in-out hover:shadow" href="/"><span class="mr-2 ti-home"></span>Home</a></li>
            {{-- <li><a class="transition duration-150 ease-in-out hover:shadow" href="{{route("eclipse-courses")}}"><span class="mr-2 ti-book"></span>Courses</a></li> --}}
            {{-- <!-- Dropdown -->
            <li class="dropdown">
              <a class="transition duration-150 ease-in-out dropdown-toggle hover:shadow" href="#" data-toggle="dropdown">
                <span class="mr-2 ti-files"></span>
                Pages
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="elements.html">Elements</a>
                <a class="dropdown-item" href="course-details.html">Course Details</a>
              </div>
            </li>
 --}}
            <li><a class="transition duration-150 ease-in-out hover:shadow" href="{{route("contact")}}"><span class="mr-2 ti-headphone-alt"></span>Contacts</a></li>

            @guest
            <li><a class="mr-1 transition duration-150 ease-in-out rounded-full shadow hover:bg-green-600" href="{{route("login")}}" style='' class="bg-green-600">&nbsp;&nbsp;login&nbsp;&nbsp;</a></li>
            <li><a class="mr-1 transition duration-150 ease-in-out rounded-full shadow hover:bg-blue-500" href="{{route("register")}}" style='' class="bg-green-600">&nbsp;&nbsp;Register&nbsp;&nbsp;</a></li>
            @endguest
            @auth
            <li><a class="transition duration-150 ease-in-out hover:shadow" href="{{route('dashboard')}}"><span class="mr-2 ti-dashboard"></span>Dashboard </a></li>
            @endauth
            <li>
              <button class="search">
                <span class="lnr lnr-magnifier" id="search"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="search-input" id="search-input-box">
      <div class="container">
        <form class="d-flex justify-content-between">
          <input type="text" name="search-value" class="form-control" id="search-input" placeholder="Search Here" />
          @csrf
          <button type="submit" class="btn"></button>
          <span class="lnr lnr-cross" id="close-search" title="Close Search"></span>
        </form>
      </div>
    </div>
  </header>
  <!-- ================ End Header Area ================= -->
