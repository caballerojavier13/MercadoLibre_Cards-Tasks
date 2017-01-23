var Poroto = (function () {

	var properties = {

		"url": 'https://api.myjson.com/bins/umhlb'

	};

	var module = {

		private: {

			getHTMLPoroto: function(item){

				var html = '<li class="collection-item avatar z-depth-1">';
				html += '<img src="images/poroto.png" alt="" class="circle">';
				html += '<span class="title">' + item.title + '</span>';
				html += '<p>' + item.project + ' </br> '+ item.status +' </p>';
				html += '<a href="" class="secondary-content"><i class="material-icons">grade</i></a>';
				html += '</li>';

				return html;

			}

		},

		public: {

			init: function(){

				$.getJSON(properties.url, function(data){

					var title = 'Objetivos del ' + data.title;

					$('#modalPoroto').find('h4').text(title);

					$.each(data.porotos, function(index, item){

						$('#modalPoroto').find('.collection').append(module.private.getHTMLPoroto(item));

					});					

				});

			},

			showModal: function(){

				$("#modalPoroto").modal("open");

			}

		}

	};

	return module.public;

})();