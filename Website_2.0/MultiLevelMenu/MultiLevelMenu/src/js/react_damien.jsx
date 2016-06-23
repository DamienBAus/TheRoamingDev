/**
 * Created by damien on 2/9/16.
 */

  // Compile this by running this in the terminal:
  // $ babel --presets es2015,react --watch src/js/ --out-dir js/

//variable declarations
var globalNavMenu;

var filterProjects = function(options = {hide: false, animationTime: 800}){

  if (!options.animationTime && options.animationTime != 0) {
    options.animationTime = 800;
  }

  if (options.hide) {
    $('.non-project').hide(options.animationTime);
    $('.back-card').show(options.animationTime);
  } else {
    $('.non-project').show(options.animationTime);
    $('.back-card').hide(options.animationTime);
  }
};

var sendMenuBack = function(){
  if (globalNavMenu.current > 0) {
    globalNavMenu._back();
  }
};

var resetHomePage = function(options = {}){
  filterProjects(options.filterOptions);
  sendMenuBack();
};

var openAboutMeModal = function(){
  $(".cd-modal svg > path").css("fill", "navy"); //Change the background modal to the colour you want

  ReactDOM.render(
    <AboutModal />,
    document.getElementById("cd-modal-content")
  );
};

var openProjectModal = function(projectData) {
  $(".cd-modal svg > path").css("fill", "purple"); //Change the background modal to the colour you want

  ReactDOM.render(
    <ProjectModal projectData={projectData}/>,
    document.getElementById("cd-modal-content")
  );
};

var openContactModal = function(){
  $(".cd-modal svg > path").css("fill", "darkgreen"); //Change the background modal to the colour you want

  ReactDOM.render(
    <ContactModal />,
    document.getElementById("cd-modal-content")
  );
};

// Create a custom component by calling React.createClass.

var NavMenu = React.createClass({

  render: function() {
    return (
    <span>
      <ul data-menu="main" className="menu__level">
        <li className="menu__item">
          <a className="menu__link mobile-only" href="#">
            <span className="fa fa-home fa-fw"></span>
            <span className="menu-link-name">Home</span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#" data-modal-id="modal-trigger" data-type="cd-modal-trigger" onClick={openAboutMeModal}>
            <span className="fa fa-user fa-fw"></span>
            <span className="menu-link-name">About</span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" data-submenu="submenu-1" href="#">
            <span className="fa fa-cogs fa-fw" data-submenu="submenu-1"></span>
            <span className="menu-link-name" data-submenu="submenu-1">Projects</span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#" data-modal-id="modal-trigger" data-type="cd-modal-trigger" onClick={openContactModal}>
            <i className="material-icons">chat</i>
            <span className="menu-link-name">Contact</span>
          </a>
        </li>
        <li className="menu__item contact-item first-button">
          <a className="waves-effect waves-light btn btn-floating grey darken-3 nav-info tooltipped"
             data-position="right"
             data-delay="25"
             data-tooltip="Click to copy e-mail address:&#10; info@theroamingdev.com">
            <span className="fa fa-envelope fa-fw contact-icon"></span>
          </a>
        </li>
        <li className="menu__item contact-item">
          <a href="https://twitter.com/DamienBAus"
             target="_blank"
             className="waves-effect waves-light btn btn-floating grey darken-3 nav-info">
            <span className="fa fa-twitter fa-fw contact-icon"></span>
          </a>
        </li>
        <li className="menu__item contact-item">
          <a className="waves-effect waves-light btn btn-floating grey darken-3 nav-info"
             href="https://github.com/DamienBAus"
             target="_blank">
            <span className="fa fa-github fa-fw contact-icon"></span>
          </a>
        </li>
      </ul>
      <ul data-menu="submenu-1" className="menu__level" id="project-menu">
        {projectData.projects.map(project => {
          return (<li className="menu__item">
            <a className="menu__link" href="#">
              <span className="menu-link-name">{project.title}</span>
            </a>
          </li>);
        })}
      </ul>
    </span>
    )
  }
});


var ProjectCards = React.createClass({

  render: function() {
    var self = this,
      projectItems = projectData.projects;

    return <span>
      {projectItems.map((project, i) => {
        return <Project projectData={project} isLastItem={i === projectItems.length - 1} />
      })}
    </span>;
  }
});

var Project = React.createClass({

  render: function() {
    var self = this,
        project = self.props.projectData,
        extraClasses = (self.props.isLastItem) ? " hide-on-med-only" : "";

    return (
      <div className={"col s12 m6 l4 xl3" + extraClasses}>
      <a href="#" data-modal-id="modal-trigger" data-type="cd-modal-trigger" onClick={openProjectModal.bind(self, project)}>
        <div className="card home-card project-card">
          <div className="card-image">
            <img src={"img/" + project.ID + "_thumb_v2.jpg"} />
          </div>
          <div className="card-content">
            <p className="card-text">{project.shortTitle}<span className="project-word"/></p>
          </div>
        </div>
      </a>
    </div>
    );
  }
});

var AboutModal = React.createClass({

  render: function() {
    var self = this;

    return <div>This modal contains data about me! </div>;
  }
});

var ProjectModal = React.createClass({

  render: function() {
    var self = this,
      projectData = self.props.projectData;

    return <div>This modal contains data about {projectData.title}! </div>;
  }
});

var ContactModal = React.createClass({

  render: function() {
    var self = this;

    return <div>This modal contains data about how to contact me! </div>;
  }
});

ReactDOM.render(
  <ProjectCards  />,
  document.getElementById("project-cards")
);

ReactDOM.render(
  <NavMenu  />,
  document.getElementById("nav-menu")
);

$("#about-card").parent().click(openAboutMeModal);
$("#contact-card").parent().click(openContactModal);
