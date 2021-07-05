<!DOCTYPE html>
<html lang="zxx" class="no-js">

<head>
  <!-- Mobile Specific Meta -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Favicon -->
  <!-- Author Meta -->
  <meta name="author" content="Daniel Uokof" />
  <!-- Meta Description -->
  <meta name="description" content="" />
  <!-- Meta Keyword -->
  <meta name="keywords" content="" />
  <!-- meta character set -->
  <meta charset="UTF-8" />
  <!-- Site Title -->

  <link rel="shortcut icon" href="{{config('app.icon', Storage::url("images/Computer.png"))}}" type="image/x-icon">
  <title>{{config("app.name")}} {{ isset($title)?' | '.$title:""}}</title>

  <link href="{{ asset("https://fonts.googleapis.com/css?family=Playfair+Display:900|Roboto:400,400i,500,700")}}" rel="stylesheet" />
  <!--
      CSS
      =============================================
    -->
  <link rel="stylesheet" href="{{asset("css/eclipse.css")}}"/>
</head>

<body>
@include("eclipse-interface.layouts.navbar")
