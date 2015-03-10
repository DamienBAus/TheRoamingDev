jQuery(document).ready(function($){
	
	function load_navbar(pageTitle) {
		var pages = ["About", "Projects", "Contact"];
		var links = ["index.html", "projects.html", "contact.html"];
		
		var navbar_html = '<nav class="navbar navbar-default">\n'+
		  '<div class="container-fluid">\n'+
			'<!-- Brand and toggle get grouped for better mobile display -->\n'+
			'<div class="navbar-header">\n'+
			  '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n'+
				'<span class="sr-only">Toggle navigation</span>\n'+
				'<span class="icon-bar"></span>\n'+
				'<span class="icon-bar"></span>\n'+
				'<span class="icon-bar"></span>\n'+
			  '</button>\n'+
			  '<a class="navbar-brand" href="index.html">Damien Beard</a>\n'+
			'</div>\n'+

			'<!-- Collect the nav links, forms, and other content for toggling -->\n'+
			'<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n'+
			  '<ul class="nav navbar-nav">\n';
		
		for(i=0; i<pages.length; i++) {
			if (pages[i]==pageTitle) {
				navbar_html += '<li class="active"><a href="'+links[i]+'">'+pages[i]+' <span class="sr-only">(current)</span></a></li>';
			} else {
				navbar_html += '<li><a href="'+links[i]+'">'+pages[i]+'</a></li>';
			}
		}
		
		navbar_html += '</ul>\n'+
			'</div><!-- /.navbar-collapse -->\n'+
		  '</div><!-- /.container-fluid -->\n'+
		'</nav>\n';
		
		$('#nav-container').html(navbar_html);
	}
	
	window.load_navbar = load_navbar;
});
