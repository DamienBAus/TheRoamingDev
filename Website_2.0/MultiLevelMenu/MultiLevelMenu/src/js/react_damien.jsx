/**
 * Created by damien on 2/9/16.
 */

// Create a custom component by calling React.createClass.

  // Compile this by running this in the terminal:
  // $ babel --presets es2015,react --watch src/js/ --out-dir js/
var NavMenu = React.createClass({

  render: function() {
    return (
    <span>
      <ul data-menu="main" className="menu__level">
        <li className="menu__item">
          <a className="menu__link mobile-only" href="#">
            <span className="fa fa-home fa-fw fa-2x"></span>
            <span className="menu-link-name">Home</span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            <span className="fa fa-user fa-fw fa-2x"></span>
            <span className="menu-link-name">About</span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" data-submenu="submenu-1" href="#">
            <span className="fa fa-cogs fa-fw fa-2x"></span>
            <span className="menu-link-name">Projects</span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#" id="modal-trigger" data-type="cd-modal-trigger">
            <i className="material-icons">chat</i>
            <span className="menu-link-name">Contact</span>
          </a>
        </li>
        <li className="menu__item contact-item first-button">
          <a className="waves-effect waves-light btn teal darken-1 nav-info">
            <span className="fa fa-envelope fa-fw contact-icon"></span>Email
          </a>
        </li>
        <li className="menu__item contact-item">
          <a className="waves-effect waves-light btn light-blue darken-1 nav-info">
            <span className="fa fa-twitter fa-fw contact-icon"></span>Twitter
          </a>
        </li>
        <li className="menu__item contact-item">
          <a className="waves-effect waves-light btn deep-purple nav-info">
            <span className="fa fa-github fa-fw contact-icon"></span>Github
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
      {projectItems.map(project => {
        return <Project projectData={project} />
      })}
    </span>;
  }
});

var Project = React.createClass({

  render: function() {
    var self = this,
        project = self.props.projectData;

    return (
      <div className="col s12 m6 l4 xl3">
      <a href="#">
        <div className="card home-card">
          <div className="card-image">
            <img src={"img/" + project.ID + "_thumb.png"} />
          </div>
          <div className="card-content">
            <p className="teal-text text-darken-2">{"PROJECT: " + project.title}</p>
          </div>
        </div>
      </a>
    </div>
    );
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
