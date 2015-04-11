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
						           '<a class="btn btn-primary btn-lg" href="'+jsonProjects.projects[i].link+'" role="button"  target="_blank">Visit Site</a>\n'+
						           '<a class="btn btn-default btn-lg" href="projects.html" role="button">Back to Projects</a>\n'+
								   '</div>\n'+
					               '</div>';
					
					$('#project_details').html(project_data);
				
				}
				
				// Look pretty
				$( "#project-pic" ).show(1000);
			}
			
			
		})
		.fail(function() {
			console.log( 'I fire if one or more requests failed.' );
		});
	}
	
	window.display_project_data = display_project_data;
});
