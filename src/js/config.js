var Config = (function () {

	var module = {

		public: {

			showModalUserFilterCriterial: function(){

				var criterial = Backlog.getCritearialFilterUser();

				try{

					var criterial_txt = criterial.join(',');

					$('#userFilterCriterialInput').val(criterial_txt);

				}catch(e){

				}

				$('#includeAllTasks').prop('checked', Backlog.getCritearialIncludeAllTasks());

				$("#modalUserTaskFilter").modal("open");

			},

			saveUserFilterCriterialConfig: function(){

				var criterial_txt = $('#userFilterCriterialInput').val();				

				var criterial = [];

				$.each(criterial_txt.split(','), function(index, item){

					var item_trim = $.trim(item);

					if( item_trim.length > 0){

						criterial.push(item_trim);

					}

				});

				console.log("Guardando Filtros");

				Backlog.setCritearialFilterUser(criterial);		

				Backlog.setCritearialIncludeAllTasks($('#includeAllTasks').prop('checked'));		

				$("#modalUserTaskFilter").modal("close");

				Backlog.reload();

			},

			cancelUserFilterCriterialConfig: function(){

				console.log("Cancelado del guardado de filtro de usuarios");

				$("#modalUserTaskFilter").modal("close");

			}

		}
	};

	return module.public;

})();