/** Author: Damien Beard, 2015 **/

/* The first step is to pull the  project id from the URL */

function getUrlParameter(sParam)
				{
					var sPageURL = window.location.search.substring(1);
					var sURLVariables = sPageURL.split('&');
					for (var i = 0; i < sURLVariables.length; i++) 
					{
						var sParameterName = sURLVariables[i].split('=');
						if (sParameterName[0] == sParam) 
						{
							return sParameterName[1];
						}
					}
				}   
			
var project_id = getUrlParameter('project_id');

/* Now query the JSON file to find the right project data.
   Once found, populate the page with the appropriate information. */
   
jQuery(document).ready(function($){
	
	//project_id is captured above
	
	var jsonProjects = {};
	
	// Grab the info from the JSON file
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
	
	// Find the appropriate information and make some HTML out of it!
	function display_project_data() {
		var projects_data = "";
		$.when( load_projects() ).done(function(res1) {
			for(i=0; i < jsonProjects.projects.length; i++)
			{
				if (jsonProjects.projects[i].ID==project_id) {
					
					/* This checks to see if the 'View' button should say something different 
				   than the default ;View' text. One use case is when it is a document instead
				   of a webpage */
				    var viewText = "Visit Site";
					if (jsonProjects.projects[i].viewText) {
						viewText = jsonProjects.projects[i].viewText
					}
					
					/*
					<div class="col-sm-5" id="project-pic">
					  <img src="images/taag_thumb.png" alt="Trade At a Glance" class="img-rounded"/>
					</div>
					<div class="col-sm-7" id="project-text">
					  <div id="project-header"><h1><a href="http://www.dfat.gov.au/trade/resources/trade-at-a-glance/Pages/default.aspx"  target="_blank"> Trade At A Glance </a></h1></div>
					  <h4><strong>Developer/Designer (Work)</strong></h4>
					  <p>Australia’s Trade at a Glance complements the annual Trade at a Glance publication, allowing users to investigate Australia’s trade profile. It brings together information from a range of Department of Foreign Affairs and Trade publications in the one location for the first time.
					  </p><p>
					  I was involved with generating content based on spreadsheets of data, exported from a SQL database. I was also involved with the functionality and style of the website, and was heavily involved with the JavaScript-based map used throughout the site.
					  </p>
					  <div id="projectSpecificButtons">
						  <a class="btn btn-primary btn-lg" href="http://www.dfat.gov.au/trade/resources/trade-at-a-glance/Pages/default.aspx" role="button"  target="_blank">Visit Site</a>
						  <a class="btn btn-default btn-lg" href="projects.html" role="button">Back to Projects</a>
					  </div>
					</div>
					*/
					project_data = '<div class="col-sm-5" id="project-pic">\n'+
								   '<img src="images/'+jsonProjects.projects[i].ID+'_thumb.png" alt="'+jsonProjects.projects[i].title+'" class="img-rounded"/>\n'+
								   '</div>\n'+
								   '<div class="col-sm-7" id="project-text">\n'+
								   '<div id="project-header"><h1><a href="'+jsonProjects.projects[i].link+'"  target="_blank">'+jsonProjects.projects[i].title+'</a></h1></div>\n'+
								   '<h4><strong>'+jsonProjects.projects[i].role+' ('+jsonProjects.projects[i].category+')</strong></h4>\n'+
								   '<p>'+jsonProjects.projects[i].fullText+'</p>\n'+
								   '<div id="projectSpecificButtons">\n'+
						           '<a class="btn btn-primary btn-lg" href="'+jsonProjects.projects[i].link+'" role="button"  target="_blank">'+viewText+'</a>\n'+
						           '<a class="btn btn-default btn-lg" href="projects.html" role="button">Back to Projects</a>\n'+
								   '</div>\n'+
					               '</div>';
					
					$('#project_details').html(project_data);
				
				}
				
				// Look pretty
				$( "#project-pic" ).show(1000);
			}
			
			construct_project_thumbnails();
			
			
		})
		.fail(function() {
			console.log( 'I fire if one or more requests failed.' );
		});
	}
	
	// Find the appropriate information and make some HTML out of it!
	function construct_project_thumbnails() {
	
		var projects_list = '<div class="row">';
		var activeThumb = ""
		for(i=0; i < jsonProjects.projects.length; i++)
			{
				
				var projectTitle = jsonProjects.projects[i].title;
				var truncateVal = projectTitle.substring(25, projectTitle.length).search(" ");
				if (truncateVal > -1) {
					projectTitle = projectTitle.substring(0,25+truncateVal)+"...";
				}
				
				activeThumb = "";
				if (jsonProjects.projects[i].ID==project_id) {
					activeThumb = "activeThumb";
				}
				
				projects_list += '<div class="col-sm-2 lowerThumbDiv">\n'+
				  '<div class="thumbnail '+activeThumb+'" id="'+jsonProjects.projects[i].ID+'_project" >\n'+
					'<a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'" class="project_image">\n'+
					  '<img src="images/'+jsonProjects.projects[i].ID+'_thumb.png" alt="'+jsonProjects.projects[i].title+'">\n'+
					'</a>\n'+
					  '<h6><a href="project_specific.html?project_id='+jsonProjects.projects[i].ID+'">'+projectTitle+' </a></h6>\n'+
					'</div>\n'+
				  '</div>';
				
				//Write the constructed HTML to the page
				if (i==jsonProjects.projects.length-1) {
					projects_list += '</div>';
					$('#projectThumbsImages').html($('#projectThumbsImages').html()+projects_list);
				}
				
			}
			
			$('#projectThumbs').css('bottom', "-"+$('#projectThumbsImages').outerHeight()+"px");
			$('#projectThumbs').hover(function() {
				$(this).stop().animate({ bottom: 0 }, 'fast');
			  }, function() {
				$(this).stop().animate({ bottom: "-"+$('#projectThumbsImages').outerHeight()+"px" }, 'fast');
			  });
			$('#projectThumbsImages').css('width', 100/6*jsonProjects.projects.length+"%"); 
			$('.col-sm-2').css('width', (100/jsonProjects.projects.length)+'%'); 
	}
	
	window.display_project_data = display_project_data;
});
