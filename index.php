<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Calendar</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/style.css">
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:600' rel='stylesheet' type='text/css'>
  </head>
  <body>
  <div class="container-fluid header-container">
    <div class="container">
    	<div class="row header-profile-container">
    		
    		<!-- profile de usuario -->
    		<div class="col-xs-6 col-md-4 text-left profile" id="profile"></div><!-- /.col -->

			<!-- fecha -->
    		<div class="col-xs-6 col-md-4 text-center">
    			<button class="btn btn-default month-ago" id="month-ago"><span class="glyphicon glyphicon-chevron-left"></span></button>    			
    			<label class="header-name-month" id="header-name-month"></label> 
    			<button class="btn btn-default month-later" id="month-later"><span class="glyphicon glyphicon-chevron-right"></span></button>    			
    		</div><!-- /.col -->

			<!-- perfil visitado -->
    		<div class="col-xs-12 col-md-4 text-right profile-visited" id="profile-visited"></div><!-- /.col -->

    	</div><!-- /.row -->

    	<div class="row list-days-container" id="list-days-container"></div><!-- /.row -->
    </div><!-- /.container -->
  	</div><!-- /.div -->

	<!-- calendario -->

	<div class="container">
		<div class="row days-container calendar" id="calendar"></div>
	</div><!-- /.container -->

	<div id="modal"></div>

    <hr />

	<div class="container">
    	<div class="row">
    		<div class="col-xs-12 col-md-12 text-center">
    			<p>Desarrollado por Paul Hipsterna con amor <span class="glyphicon glyphicon-heart"></span></p>
    		</div><!-- /.col -->
    	</div><!-- /.row -->
    </div><!-- /.container -->
    
    <!-- scripts -->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/calendar.js"></script>
  </body>
</html>