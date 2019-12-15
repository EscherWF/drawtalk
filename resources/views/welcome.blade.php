<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>
        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <!-- <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js"></script> -->
        <!-- TODO: Add SDKs for Firebase products that you want to use
          https://firebase.google.com/docs/web/setup#available-libraries -->
        <!-- <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-analytics.js"></script> -->
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
    </head>
    <body>
      <div id="app">
        <app />
      </div>
    <script src="{{mix('js/app.js')}}"></script>
    </body>
</html>
