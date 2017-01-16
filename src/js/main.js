$(function(){

	listeners();

	$(".modal").modal();

	Backlog.init();

	TrelloBacklog.init();

	Poroto.init();

});


function listeners(){

	$('#showUserTaskFilter').on('click', function(e){
		
		e.stopPropagation();

		e.preventDefault();

		e.stopImmediatePropagation();

		Config.showModalUserFilterCriterial();

		return false;

	});


	$('#saveUserFilterCriterialConfig').on('click', function(e){
		
		e.stopPropagation();

		e.preventDefault();

		e.stopImmediatePropagation();

		Config.saveUserFilterCriterialConfig();

		return false;

	});


	$('#cancelUserFilterCriterialConfig').on('click', function(e){
		
		e.stopPropagation();

		e.preventDefault();

		e.stopImmediatePropagation();

		Config.cancelUserFilterCriterialConfig();

		return false;

	});	


	$('#realoadApp').on('click', function(e){
		
		e.stopPropagation();

		e.preventDefault();

		e.stopImmediatePropagation();

		Backlog.reload();

		return false;

	});

	$('#showTrelloBacklog').on('click', function(e){

		e.stopPropagation();

		e.preventDefault();

		e.stopImmediatePropagation();
		
		TrelloBacklog.showTrelloBacklog();

		return false;
	});

	$('#showPorotos').on('click', function(e){

		e.stopPropagation();

		e.preventDefault();

		e.stopImmediatePropagation();
		
		Poroto.showModal();

		return false;
	});

}

function loadApp(){
	Backlog.checkAuth();
}