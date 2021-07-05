@extends("eclipse-interface.layouts.eclipse",["title"=>"Contact"])
@section("banner")
	<!-- ================ start banner Area ================= -->
	<section class="banner-area">
		<div class="container">
			<div class="row justify-content-center align-items-center">
				<div class="col-lg-12 banner-right">
					<h1 class="text-white">
						Contacts
					</h1>
					<div class="link-nav">
						<span class="box">
							<a href="index.html">Home </a>
							<i class="lnr lnr-arrow-right"></i>
							<a href="contacts.html">Contacts</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ End banner Area ================= -->
@endsection
</div>
@section("content")

	<!-- ================ Start contact-page Area  ================= -->
	<section class="contact-page-area section-gap">
		<div class="container">
			<div class="row">
				<div class="map-wrap" style="width:100%; height: 445px;" id="map"></div>
				<div class="col-lg-4 d-flex flex-column address-wrap">
					<div class="flex-row single-contact-address d-flex">
						<div class="icon">
							<span class="lnr lnr-home"></span>
						</div>
						<div class="contact-details">
							<h5>Messassi, Yaoundé</h5>
							<p>
								Carrefour Messassi
							</p>
						</div>
					</div>
					<div class="flex-row single-contact-address d-flex">
						<div class="icon">
							<span class="lnr lnr-phone-handset"></span>
						</div>
						<div class="contact-details">
							<h5>(00237) 657675216</h5>
							<p>Mon to Fri 8am to 6 pm</p>
						</div>
					</div>
					<div class="flex-row single-contact-address d-flex">
						<div class="icon">
							<span class="lnr lnr-envelope"></span>
						</div>
						<div class="contact-details">
							<h5>danieluokof@gmail.com</h5>
							<p>Send us your query anytime!</p>
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<form class="text-right form-area contact-form" id="myForm" action="mail.php" method="post">
						<div class="row">
							<div class="col-lg-6 form-group">
								<input name="name" placeholder="Enter your name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'"
								 class="mb-20 common-input form-control" required="" type="text">

								<input name="email" placeholder="Enter email address" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
								 onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" class="mb-20 common-input form-control"
								 required="" type="email">

								<input name="subject" placeholder="Enter subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter subject'"
								 class="mb-20 common-input form-control" required="" type="text">
							</div>
							<div class="col-lg-6 form-group">
								<textarea class="common-textarea form-control" name="message" placeholder="Enter Messege" onfocus="this.placeholder = ''"
								 onblur="this.placeholder = 'Enter Messege'" required=""></textarea>
							</div>
							<div class="col-lg-12">
								<div class="alert-msg" style="text-align: left;"></div>
								<button class="btn" style="float: right;">Send Message</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ End contact-page Area ================= -->
@endsection
