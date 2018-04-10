$(document).ready(function() 
{
	// variables globales
	var today = new Date(Date.now());
	var today_temp = new Date(Date.now());
	var days_es = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
	var months_es = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	var user = new RegExp('[\?&]calendar-of=([^&#]*)').exec(window.location.href);
	user = (user == null ? 0 : user[1]);

	// imprimir datos del perfil de usuario
	function userProfileData()
	{
		// get users
		$.ajax({
			type:"GET",
			url:"php/login.php",
		}).done(function(data)
		{
			var user_data = JSON.parse(data);
			var user_data_total = user_data.length;

			if(user_data_total > 0)
			{
				$("#profile").load("views/profile_user_data.html", 
					function(response, status, xhr) 
					{
					  if ( status != "error" ) 
					  {
					  	// imprimir la foto de perfil
						if(user_data[0].photo) $("#header-profile-photo").attr("src", "img/" + user_data[0].photo);

						// imprimir el nombre del usuario
						$("#header-profile-name").html(user_data[0].user);
						$("#header-profile-link").attr("href", "index.php?calendar-of=" + user_data[0].user);

					  	$("#profile-controls").removeClass("hide").show();
					  	$("#profile-notifications").removeClass("hide").show();
					  }

					user_data = user_data[0].user;
					visitProfileData(user_data);
				});
			}
			else
			{
				$("#profile").load("views/login_button.html", 
					function(response, status, xhr) 
					{
					  if (status != "error") 
					  {
					  	$("#login-button").removeClass("hide").show();
					  }
					}
				);
			
				visitProfileData(0);
			}		

		});
	}

	// imprimir datos del perfil de visita
	function visitProfileData(usersession)
	{
		if(usersession == user)
		{
			$("#profile-visited").load("views/user_controls.html", 
				function(response, status, xhr) 
				{
				  if ( status != "error" ) 
				  {
				  	$("#header-search-profile").removeClass("hide").show();
				  }
			});
		}
		else
		{
			// get users
			$.ajax({
				type:"GET",
				url:"php/users.php",
				data: { type: "view", user: user }
			}).done(function(data)
			{
				var user_data = JSON.parse(data);
				var user_data_total = user_data.length;

				if(user_data_total > 0)
				{
					$("#profile-visited").load("views/profile_visited_data.html", 
						function(response, status, xhr) 
						{
						  if ( status != "error" ) 
						  {
						  	// imprimir la foto de perfil
							if(user_data[0].photo) $("#header-visit-profile-photo").attr("src", "img/" + user_data[0].photo);

							// imprimir el nombre del usuario
							$("#header-visit-profile-name").html(user_data[0].user);
					
						  	$("#header-visit-profile").removeClass("hide").show();
						  }
					});

					
				}
			});	
		}

		/*
		var user = $("#profile-name").attr("name");

		if(user != "")
		{
			// get users
			$.ajax({
				type:"GET",
				url:"php/users.php",
				data: { type: "view", user: user }
			}).done(function(data)
			{
				var user_data = JSON.parse(data);
				var user_data_total = user_data.length;

				if(user_data_total > 0)
				{
					// imprimir la foto de perfil
					if(user_data[0].photo) $("#header-visit-profile-photo").attr("src", "img/" + user_data[0].photo);

					// imprimir el nombre del usuario
					$("#header-visit-profile-name").html(user_data[0].user);
				}
			});

			$("#header-visit-profile").removeClass("hide").show();	
		}
		*/
	}

	// imprimir mes
	function printCurrentMonth()
	{
		var current_month = today_temp.getMonth();
		var current_year = today_temp.getFullYear();
		var month_name = months_es[current_month];

		$("#header-name-month").html(month_name + ", " + current_year);
	}

	function printListDays()
	{
		$.each(days_es, function(i, day) {
			$("#list-days-container").append('<div class="col-xs-2 col-cm-1">' + day.substr(0,3) + '</div><!-- /.col -->');
		});
	}

	// imprimir calendario
	function printCalendar()
	{
		// calculate current month and year
		var current_month = today_temp.getMonth();
		var current_year = today_temp.getFullYear();

		// calculate finish calendar date on calendar
		var finish_calendar = new Date(current_year, current_month, 1);
		var finish_calendar_days_left = finish_calendar.getDay();

		finish_calendar.setDate(finish_calendar.getDate() - finish_calendar_days_left);

		// calculate end calendar date on calendar
		var end_calendar = new Date(current_year, current_month + 1, 0);
		var end_calendar_number_day = end_calendar.getDay();
		var end_calendar_days_left = 6 - end_calendar_number_day;

		end_calendar.setDate(end_calendar.getDate() + end_calendar_days_left);

		// limpiar el calendario
		$("#calendar").empty();

		// informacion para la peticion ajax
		var finish = finish_calendar.getFullYear() + "-" + (finish_calendar.getMonth() + 1) + "-" + finish_calendar.getDate();
		var end = end_calendar.getFullYear() + "-" + (end_calendar.getMonth() + 1) + "-" + end_calendar.getDate();

		// get posts
		$.ajax({
			type:"GET",
			url:"php/calendar.php",
			data: { type: "list", user: user, finish_calendar: finish, end_calendar: end }
		}).done(function(data)
		{
			console.log(data);
			var calendar_data = JSON.parse(data);
			var calendar_data_total = calendar_data.length;
			var photo_path = "";
			var i = 0;

			// print calendar
			for (var finish = finish_calendar; finish <= end_calendar; finish.setDate(finish.getDate() + 1)) 
			{		
				// convertir a fecha
				if(i < calendar_data_total)
				{
					var t = calendar_data[i].date.split(/[- :]/);
					var calendar_date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
				}

				// tomar la direccion de la foto
				if(i < calendar_data_total)
				{
				    if(finish.getDate() == calendar_date.getDate() && finish.getMonth() == calendar_date.getMonth() && finish.getFullYear() == calendar_date.getFullYear())
				    {
				    	photo_path = "img/" + calendar_data[i].photo;
				    }
				}	

				// publicar foto
				if(photo_path != "")
				{
					$("#calendar").append('<div style="background-image:url(' + "'" + photo_path + "'" + ')" class="col-cm-1 photo-day-container" name="' + calendar_data[i].id + '"><span>' + finish.getDate() + '</div><!-- /.col -->');

					if(i < calendar_data_total)
					{
						i++;
					}
				}
				// dia de hoy
			    else if(finish.getDate() == today.getDate() && finish.getMonth() == today.getMonth() && finish.getFullYear() == today.getFullYear())
				{
					$("#calendar").append('<div class="col-cm-1 today-container"><span>' + finish.getDate() + '</span></div><!-- /.col -->');
				}
				// dia de otro mes
			    else if(finish.getMonth() != today_temp.getMonth())
			    {
					$("#calendar").append('<div class="col-cm-1 day-container-other-month"><span>' + finish.getDate() + '</span></div><!-- /.col -->');	
			    }
			    // dia del mes
				else
				{
					$("#calendar").append('<div class="col-cm-1 day-container-this-month"><span>' + finish.getDate() + '</span></div><!-- /.col -->');
				}

				// reinicializar valores
				photo_path = ""
			} 
		});

		// mostrar calendario
		$("#loading-calendar-container").hide();
		$("#calendar").show();
	}

	// cargar pagina

	userProfileData();
	
	printCurrentMonth();
	
	printListDays();

	printCalendar();

	// acciones

	// ir un mes anterior
	$("#month-ago").on("click", function()
	{
		today_temp.setMonth(today_temp.getMonth() - 1);
		printCurrentMonth();
		printCalendar();
	});

	// ir un mes siguiente
	$("#month-later").on("click", function()
	{
		today_temp.setMonth(today_temp.getMonth() + 1);
		printCurrentMonth();
		printCalendar();
	});

	// ver un post
	$("#calendar").on("click", ".photo-day-container", function()
	{
		var id_post = $(this).attr("name");

		$("#modal").load("views/view_post.html", 
			function(response, status, xhr) 
			{
			  if ( status != "error" ) 
			  {
				$.ajax({
					type:"GET",
					url:"php/calendar.php",
					data: { type: "view", id_post: id_post }
				}).done(function(data)
				{
					var calendar_data = JSON.parse(data);					
					var t = calendar_data[0].date.split(/[- :]/);
					var calendar_date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
					var day_name = days_es[calendar_date.getDay()];
					var month_name = months_es[calendar_date.getMonth()];

					$("#view-name").html("Foto de " + calendar_data[0].username);
					$("#view-photo").html('<img src="img/' + calendar_data[0].photo + '" width="80%">');
					$("#view-description").html(calendar_data[0].description);					
					$("#view-date").html(day_name + ", " + calendar_date.getDate() + " de " + month_name + " del " + calendar_date.getFullYear() + ".");
					$('#view-post').modal('show');		
				});		
			  }
		});
	});

	// formulario de publicacion

	$("#profile-visited").on("click", "#header-post-profile", function()
	{
		$("#modal").load("views/add_post.html", 
			function(response, status, xhr) 
			{
			  if ( status != "error" ) 
			  {
				$("#add-post").modal('show');
			  }
		});
	});

	// mostrar fomulario de login

	$("#profile").on("click", "#login-button", function()
	{
		$("#modal").load("views/login.html", 
			function(response, status, xhr) 
			{
			  if (status != "error") 
			  {
				$("#login").modal('show');
			  }
			}
		);
	});

	// iniciar sesion

	$("#modal").on("submit", "#login-form", function(event)
	{
		event.preventDefault();

		var user = $("#login-user").val();
		var password = $("#login-password").val();

		$.ajax({
			type:"POST",
			url:"php/users.php?type=login",
			data: { user: user, password: password }
		}).done(function(data)
		{
			var user_data = JSON.parse(data);
			var user_data_total = user_data.length;

			if(user_data_total > 0)
			{
				window.location = "index.php?calendar-of=" + user;
			} 
		});
	});

	// cerrar sesion

	$("#profile").on("click", "#logout",function(event)
	{
		$.ajax({
			type:"POST",
			url:"php/logout.php"
		}).done(function(data)
		{
			if(data == "exito")
			{
				window.location = "index.php";
			} 
		});
	});

	// agregar publicacion

	$("#modal").on("submit", "#add-post-form", function(event)
	{
		event.preventDefault();

		var formData = new FormData($("#add-post-form")[0]);

		$.ajax({
			type:"POST",
			url:"php/new_post.php",
			async: true, 
            data: formData,
			dataType: "html", 
			cache: false, 
			contentType: false, 
			processData: false
		}).done(function(data)
		{
			window.location = "index.php?calendar-of=" + user;
		});
	});

}); // final del documento