/** Author: Damien Beard, 2015 **/

jQuery(document).ready(function($){
	
	var jsonProjects = {};
	
	// Load the project data from the generated .json file
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
	
	// For each project, create a thumbnail and add it to the project page. 
	
	function show_projects() {
		var projects_list = "";
		var viewText = "Visit Site";
		$.when( load_projects() ).done(function(res1) {
			for(i=0; i < jsonProjects.projects.length; i++)
			{
				
				/* This checks to see if the 'View' button should say something different 
				   than the default 'View' text. One use case is when it is a document instead
				   of a webpage */
				if (jsonProjects.projects[i].viewText) {
					viewText = jsonProjects.projects[i].viewText
				} else {
					// This is a reset in case a previous entry had a different 'View' text.
					viewText = "Visit Site";
				}
				
				if (i%3==0) {
					projects_list = ""
					projects_list += '<div class="row">\n';
				}
				
				projects_list += '<div class="col-sm-4">\n'+
				  '<div class="thumbnail thumbnail-row-'+(Math.floor(i/3)+1)+'" id="'+jsonProjects.projects[i].ID+'_project">\n'+
					'<a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'" class="project_image">\n'+
					  '<img src="images/'+jsonProjects.projects[i].ID+'_thumb.png" alt="'+jsonProjects.projects[i].title+'">\n'+
					'</a>\n'+
					'<div class="caption">\n'+
					  '<h3><a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'">'+jsonProjects.projects[i].title+' </a></br><small>'+jsonProjects.projects[i].role+'</small></h3>\n'+
					  '<p>'+jsonProjects.projects[i].blurb+'</p>\n'+
					  '<p><a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'" class="btn btn-primary" role="button">Read More</a> <a  href="'+jsonProjects.projects[i].link+'" class="btn btn-default" role="button" target="_blank">'+viewText+'</a></p>\n'+
					'</div>\n'+
				  '</div>\n'+
				'</div>';
				
				if (i%3==2 || i==jsonProjects.projects.length-1) {
					projects_list += '</div>';
					$('#projects_list').html($('#projects_list').html()+projects_list);
				}
				
				
				
				
			}
			
			
			// Make it look pretty with animations
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
