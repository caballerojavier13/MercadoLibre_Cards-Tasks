var Backlog = (function () {

	var properties = {
		"CLIENT_ID": "615330367362-lfpcomoi5ktopbmerg0e5t37f5je4gkf.apps.googleusercontent.com",
		"SCOPES": ["https://www.googleapis.com/auth/spreadsheets.readonly"],
		"spreadsheetId": "1Bv7ntmXyrTvXetZoVK_UPNmi_hWTCkIiAzNhSO7nrac", 
		"tasks": {
			"giftcard": [],
			"cobranded": [],
			"prepaid": []
		},
		"countLoad": 0
	};

	var module = {

		private: {

			resetProperties: function(callback){

				properties.tasks = {
					"giftcard": [],
					"cobranded": [],
					"prepaid": []
				};

				properties.countLoad = 0;

				if(callback){

					callback();

				}

			},

			filterUser: function(userName){

				userName = userName.toLowerCase();

				var result = [];

				try{

					result = $.grep(module.public.getCritearialFilterUser(), function(n,i){

						return userName.indexOf(n.toLowerCase()) > -1 || userName == n.toLowerCase();

					});

				}catch(e){

					

				}

				return result.length > 0;

			},

			loadSheetsApi: function() {

				var discoveryUrl =
				"https://sheets.googleapis.com/$discovery/rest?version=v4";

				gapi.client.load(discoveryUrl).then(module.private.listTasks);

			},

			listTasks: function(){

				console.log("Listado tareas");

				module.private.listTasksGiftCard();

				module.private.listTasksCobranded();

				module.private.listTasksPrepaid();

			},

			listTasksGiftCard: function(){

				gapi.client.sheets.spreadsheets.values.get({
					spreadsheetId: properties.spreadsheetId,
					range: "Backlog Giftcard!A:F",
				}).then(function(response) {

					var range = response.result;

					if (range.values.length > 0) {

						for (i = 0; i < range.values.length; i++) {

							var row = range.values[i];

							var assingnedTo = row[4];

							if((assingnedTo && module.private.filterUser(assingnedTo)) && (!row[3].includes("DONE"))){

								try{

									properties.tasks.giftcard.push({
										"priority": row[1],
										"title": row[2],
										"status": row[3],
										"assingnedTo": assingnedTo,
										"detail": row[5].split('-').length > 1 ? row[5].split('-').slice(1).join('-') : '',
										"time": row[5].split('-')[0]
									});

								}catch(e){

									properties.tasks.giftcard.push({
										"priority": row[1],
										"title": row[2],
										"status": row[3],
										"assingnedTo": assingnedTo,
										"detail": '',
										"time": ''
									});
								}

							}else{

								if( !assingnedTo && module.public.getCritearialIncludeAllTasks()  && row[3] && (!row[3].includes("DONE")) ){

									try{

										properties.tasks.giftcard.push({
											"priority": row[1],
											"title": row[2],
											"status": row[3],
											"assingnedTo": 'NO ASIGNADO',
											"detail": row[5].split('-').length > 1 ? row[5].split('-').slice(1).join('-') : '',
											"time": row[5].split('-')[0]
										});

									}catch(e){

										properties.tasks.giftcard.push({
											"priority": row[1],
											"title": row[2],
											"status": row[3],
											"assingnedTo": 'NO ASIGNADO',
											"detail": '',
											"time": ''
										});

									}


								}


							}

						}

						properties.tasks.giftcard.sort(module.private.SortByPriority);

						module.private.renderTasks("giftcard");

					} else {

						console.error("No data found.");

					}

				}, function(response) {

					console.error("Error: " + response.result.error.message);

				});

			},

			listTasksCobranded: function() {

				gapi.client.sheets.spreadsheets.values.get({
					spreadsheetId: properties.spreadsheetId,
					range: "Backlog Cobranded!A:F",
				}).then(function(response) {

					var range = response.result;

					if (range.values.length > 0) {

						for (i = 0; i < range.values.length; i++) {

							var row = range.values[i];

							var assingnedTo = row[4];

							if((assingnedTo && module.private.filterUser(assingnedTo)) && (!row[3].includes("DONE"))){

								try{

									properties.tasks.cobranded.push({
										"priority": row[0],
										"title": row[2],
										"status": row[3],
										"assingnedTo": assingnedTo,
										"detail": row[5].split('-').length > 1 ? row[5].split('-').slice(1).join('-') : '',
										"time": row[5].split('-')[0]
									});

								}catch(e){

									properties.tasks.cobranded.push({
										"priority": row[0],
										"title": row[2],
										"status": row[3],
										"assingnedTo": assingnedTo,
										"detail": '',
										"time": ''
									});

								}
								

							}else{

								if( !assingnedTo && module.public.getCritearialIncludeAllTasks()  && row[3] && (!row[3].includes("DONE")) ){

									try{

										properties.tasks.cobranded.push({
											"priority": row[0],
											"title": row[2],
											"status": row[3],
											"assingnedTo": 'NO - ASIGNADO',
											"detail": row[5].split('-').length > 1 ? row[5].split('-').slice(1).join('-') : '',
											"time": row[5].split('-')[0]
										});

									}catch(e){

										properties.tasks.cobranded.push({
											"priority": row[0],
											"title": row[2],
											"status": row[3],
											"assingnedTo": 'NO - ASIGNADO',
											"detail": '',
											"time": ''
										});

									}

								}

							}

						}

						properties.tasks.cobranded.sort(module.private.SortByPriority);

						module.private.renderTasks("cobranded");

					} else {

						console.error("No data found.");

					}

				}, function(response) {

					console.error("Error: " + response.result.error.message);

				});	

			},

			listTasksPrepaid: function() {

				gapi.client.sheets.spreadsheets.values.get({

					spreadsheetId: properties.spreadsheetId,

					range: "Backlog Prepaid!A:H",

				}).then(function(response) {

					var range = response.result;

					if (range.values.length > 0) {

						for (i = 0; i < range.values.length; i++) {

							var row = range.values[i];

							var assingnedTo = row[5];

							if((assingnedTo && module.private.filterUser(assingnedTo)) && (!row[4].includes("DONE"))){
								
								try{

									properties.tasks.prepaid.push({
										"priority": row[0],
										"title": row[3],
										"status": row[4],
										"assingnedTo": assingnedTo,
										"detail": row[6].split('-').length > 1 ? row[6].split('-').slice(1).join('-') : '',
										"time": row[6].split('-')[0]
									});

								}catch(e){

									properties.tasks.prepaid.push({
										"priority": row[0],
										"title": row[3],
										"status": row[4],
										"assingnedTo": assingnedTo,
										"detail": '',
										"time": ''
									});

								}

							}else{

								if( !assingnedTo && module.public.getCritearialIncludeAllTasks()  && row[4] && (!row[4].includes("DONE")) ){

									try{

										properties.tasks.prepaid.push({
											"priority": row[0],
											"title": row[3],
											"status": row[4],
											"assingnedTo": 'NO - ASIGNADO',
											"detail": row[6].split('-').length > 1 ? row[6].split('-').slice(1).join('-') : '',
											"time": row[6].split('-')[0]
										});

									}catch(e){

										properties.tasks.prepaid.push({
											"priority": row[0],
											"title": row[3],
											"status": row[4],
											"assingnedTo": 'NO - ASIGNADO',
											"detail": '',
											"time": ''
										});

									}

								}

							}

						}

						properties.tasks.prepaid.sort(module.private.SortByPriority);

						module.private.renderTasks("prepaid");

					} else {

						console.error("No data found.");

					}

				}, function(response) {

					console.error("Error: " + response.result.error.message);

				});

			},

			renderTasks: function(project){

				$("#" + project).find(".collection").empty();		

				$.each(properties.tasks[project],function(index,item){

					var task = '<li class="collection-item z-depth-2 hoverable">';               
					task += '<div>';
					task += '<div class="priority teal valign-wrapper center-align">';
					task += '<span class="valign white-text">' + item.priority + '</span>';
					task += '</div>';
					task += module.private.getTagTime(item.time, item.status);
					task += module.private.getTagStatus(item.status);
					task += '<div class="chip"><i class="material-icons">account_circle</i> <span>' + item.assingnedTo + '</span></div>';
					task += '<h5 class="title">' + item.title + '</h5>';
					task += '<p>' + item.detail + '</p>';
					task += '</div>';
					task += '</li>';

					$("#" + project).find(".collection").append( task );

				});

				console.log("Cargado " + project);

				$("#title-" + project).find('span').text('(' + properties.tasks[project].length + ')');

				module.private.finishTask();

			},

			finishTask: function (){

				properties.countLoad += 1;

				if(properties.countLoad > 2){

					$('.progress').hide();

					$('p').linkify();

				}

			},

			SortByPriority: function(a, b){
				
				var aPriority = parseInt(a.priority);
				var bPriority = parseInt(b.priority); 
				
				return ((aPriority < bPriority) ? -1 : ((aPriority > bPriority) ? 1 : 0));

			},

			getTagStatus: function(status){
				
				switch(status) {

					case "TODO":
					return '<div class="chip deep-orange darken-1 white-text "><i class="material-icons">turned_in_not</i> <span>' + status + '</span></div>'

					case "WIP":
					return '<div class="chip white-text amber darken-2"><i class="material-icons">turned_in_not</i> <span>' + status + '</span></div>'

					case "DONE":
					return '<div class="chip white-text teal"><i class="material-icons">turned_in_not</i> <span>' + status + '</span></div>'

					case "OUT":
					return '<div class="chip cyan darken-1 white-text"><i class="material-icons">turned_in_not</i> <span>' + status + '</span></div>'

					default:
					return '<div class="chip"><i class="material-icons">turned_in_not</i> <span>' + status + '</span></div>'

				}
			},

			getTagTime: function(time, status){

				if(status != "DONE"){

					try {

						var partsDate;

						if(time.split('/').length > 0){

							partsDate = time.split('/');

						}else{

							return '';

						}

						var mydate = new Date(partsDate[2],partsDate[1]-1,partsDate[0]); 

						var dueDate = moment(mydate).format('DD/MM/YYYY');

						if(dueDate != "Invalid date"){	

							var now = new Date();

							if(mydate > now){

								switch(status) {

									case "TODO":
									return '<div class="chip deep-orange darken-1 white-text "><i class="material-icons">alarm_on</i>' + dueDate + '<span></span></div>';

									case "WIP":
									return '<div class="chip white-text amber darken-2"><i class="material-icons">alarm_on</i>' + dueDate + '<span></span></div>';

									case "DONE":
									return '<div class="chip white-text teal"><i class="material-icons">alarm_on</i>' + dueDate + '<span></span></div>';

									case "OUT":
									return '<div class="chip cyan darken-1 white-text"><i class="material-icons">alarm_on</i>' + dueDate + '<span></span></div>';

									default:
									return '<div class="chip"><i class="material-icons">alarm_on</i>' + dueDate + '<span></span></div>';

								}

							}else{

								return '<div class="chip red accent-4 white-text"><i class="material-icons">alarm_on</i>' + dueDate + '<span></span></div>';

							}

						}else{

							return '';

						}

					}catch(err) {

						return '';

					}

				}else{

					return '';

				}
				
			}

		},

		public: {

			init: function(){

				$("#authorize-button").on("click",function(){

					gapi.auth.authorize(
						{client_id: properties.CLIENT_ID, scope: properties.SCOPES, immediate: false},
						module.public.handleAuthResult);

					return false;

				});

			},


			getCritearialFilterUser: function(){

				return eval(localStorage.critearialFilterUser);

			},


			setCritearialIncludeAllTasks: function(includeAll){

				localStorage.critearialIncludeAllTasks = includeAll;

			},

			getCritearialIncludeAllTasks: function(){

				return eval(localStorage.critearialIncludeAllTasks);

			},


			setCritearialFilterUser: function(arrayCriterials){

				localStorage.critearialFilterUser = JSON.stringify(arrayCriterials);

			},


			checkAuth: function() {

				console.log("Verificando si está logueado");

				gapi.auth.authorize(
				{
					"client_id": properties.CLIENT_ID,
					"scope": properties.SCOPES.join(" "),
					"immediate": true
				}, module.public.handleAuthResult);

			},

			handleAuthResult: function (authResult) {

				if (authResult && !authResult.error) {

					console.log("Inició Sesión");

					module.private.loadSheetsApi();

				} else {

					$("#authorize-modal").modal("open");

				}

			},

			reload: function(callback){
				
				console.log("Reloading Backlog");

				$('.progress').show();

				$('.tab').find('span').text('');

				module.private.resetProperties(function(){

					module.private.loadSheetsApi();	

					if(callback){

						callback();

					}

				});

			}

		}

	};

	return module.public;

})();