var TrelloBacklog = (function () {

	var properties = {

		"board": '569e3ddfff28bea97feef80e',

		"DONE_list": "5829b5363795cb95f3828f93"

	};

	var module = {

		private: {

			driveError: function(){

				console.err("Ocurrió un error");

			},

			getUser: function(){

				return localStorage.trelloUser;

			},

			setUser: function(userId){

				localStorage.trelloUser = userId;

			},

			getCards: function(){

				Trello.get('/boards/' + properties.board + '/lists', function(lists){

					var backlog_trello = [];

					var list_index = 1;

					$.each(lists, function(index,item){

						var list = item;

						if(list.id != properties.DONE_list ){

							var list_json = {};

							list_json.name = list.name;

							Trello.get('/lists/' + item.id + '/cards', function(data){

								var cards_list = [];

								$.each(data,function(index, card){

									if($.inArray(module.private.getUser(), card.idMembers) > -1){

										cards_list.push({
											"title": card.name,
											"url": card.url
										});

									}

									if( ((index + 1) >= data.length) ){

										
										list_json.cards = cards_list;

										backlog_trello.push(list_json);

										list_index = list_index + 1;

										if((list_index >= lists.length)){

											module.private.showTasks(backlog_trello);

										}

									}

								});

							}, module.private.driveError);

						}						

					});

				}, module.private.driveError);

			},

			showTasks: function(backlog){

				$.each(backlog, function(index, item){

					if(item.cards.length > 0){

						var html_tasks = "";

						$.each(item.cards, function(index, item){

							html_tasks += module.private.getHTMLTask(item);

						});

						var html_list = '<div class="collection backlog-trello">';

						html_list += '<span class="collection-header"><h5>' + item.name + '</h5></span>';

						html_list += html_tasks;

						html_list += '</div>';

						$('#modalTrello').find('.modal-content').append(html_list);

					}

				});

			},

			getHTMLTask: function(task){

				return '<a target="_blank" href="' + task.url + '" class="collection-item z-depth-1">' + task.title + '<span class="secondary-content"><i class="material-icons">send</i></span></a>';

			}

		},

		public: {

			showTrelloBacklog: function(){

				$("#modalTrello").modal("open");

			},

			init: function(){

				try{

					Trello.authorize({
						type: 'redirect',
						name: 'Tareas Mercadolibre - Cards',
						scope: {
							read: 'true',
							write: 'false' 
						},
						expiration: 'never',
						success: function(){

							if(module.private.getUser()){

								module.private.getCards();

							}else{

								Trello.get(
									'/members/me/', 
									function(user){

										module.private.setUser(user.id);

										module.private.getCards();

									},
									function(){

										console.log("Ocurrió un error al obtener el usuario");

									}
									);

							}

						},					
						error: function(){

							console.log("Failed authentication");

						}
					});

				}catch(e){

				}

			}

		}
	};

	return module.public;

})();