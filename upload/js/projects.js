jQuery(document).ready(function($){
	
	var jsonProjects = {};
	
	var load_projects = function(){
		$.ajax({
	    	url: "./js/projects.json",
	    	async: false,
	    	dataType: 'json',
	    	success: function(data) {
	    		jsonProjects = data;
	    	}
		});
	}
	
	function show_projects() {
		var projects_list = "";
		$.when( load_projects() ).done(function(res1) {
			for(i=0; i < jsonProjects.projects.length; i++)
			{
				//projects_list += '<a class="country_list_item" href="#" inc="'+i+'" dataid="'+jsonProjects.projects[i].ID+'">'+jsonProjects.projects[i].title+'</a>';
				
				
				
				
				projects_list = '<div class="col-sm-4">\n'+
				  '<div class="thumbnail" id="'+jsonProjects.projects[i].ID+'_project">\n'+
					'<a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'" class="project_image">\n'+
					  '<img src="images/'+jsonProjects.projects[i].ID+'_thumb.png" alt="'+jsonProjects.projects[i].title+'">\n'+
					'</a>\n'+
					'<div class="caption">\n'+
					  '<h3><a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'">'+jsonProjects.projects[i].title+' </a></br><small>'+jsonProjects.projects[i].role+'</small></h3>\n'+
					  '<p>'+jsonProjects.projects[i].blurb+'</p>\n'+
					  '<p><a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'" class="btn btn-primary" role="button">Read More</a> <a  href="'+jsonProjects.projects[i].link+'" class="btn btn-default" role="button" target="_blank">Visit site</a></p>\n'+
					'</div>\n'+
				  '</div>\n'+
				'</div>';
				$('#projects_list').html($('#projects_list').html()+projects_list);
				
				setTimeout(function(){
					$( ".thumbnail" ).show(1000);
				}, 400);
			}
			
			$('html,body').animate({
			  scrollTop: $("#content-main").offset().top
			}, 1500);
			//$('#projects_list').html(projects_list);
			
			
		})
		.fail(function() {
			console.log( 'I fire if one or more requests failed.' );
		});
	}
	
	window.show_projects = show_projects;
});
