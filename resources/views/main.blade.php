<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">	
        <link rel="shortcut icon" href="{{ asset('/favicon.ico') }}">
        <title>{{ env('APP_NAME',"drawtalk") }}</title>
        <style>
          body{
            margin:0;
            position:flex;
          }
        </style>
       <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
      <div id="app">
        <app />
      </div>
    <script src="{{mix('js/app.js')}}"></script>
    </body>
</html>
