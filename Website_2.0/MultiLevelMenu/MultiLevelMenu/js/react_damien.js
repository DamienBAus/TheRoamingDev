"use strict";

/**
 * Created by damien on 2/9/16.
 */

// Create a custom component by calling React.createClass.

// Compile this by running this in the terminal:
// $ babel --presets es2015,react --watch src/js/ --out-dir js/
var NavMenu = React.createClass({
  displayName: "NavMenu",


  render: function render() {
    return React.createElement(
      "span",
      null,
      React.createElement(
        "ul",
        { "data-menu": "main", className: "menu__level" },
        React.createElement(
          "li",
          { className: "menu__item" },
          React.createElement(
            "a",
            { className: "menu__link mobile-only", href: "#" },
            React.createElement("span", { className: "fa fa-home fa-fw fa-2x" }),
            React.createElement(
              "span",
              { className: "menu-link-name" },
              "Home"
            )
          )
        ),
        React.createElement(
          "li",
          { className: "menu__item" },
          React.createElement(
            "a",
            { className: "menu__link", href: "#" },
            React.createElement("span", { className: "fa fa-user fa-fw fa-2x" }),
            React.createElement(
              "span",
              { className: "menu-link-name" },
              "About"
            )
          )
        ),
        React.createElement(
          "li",
          { className: "menu__item" },
          React.createElement(
            "a",
            { className: "menu__link", "data-submenu": "submenu-1", href: "#" },
            React.createElement("span", { className: "fa fa-cogs fa-fw fa-2x" }),
            React.createElement(
              "span",
              { className: "menu-link-name" },
              "Projects"
            )
          )
        ),
        React.createElement(
          "li",
          { className: "menu__item" },
          React.createElement(
            "a",
            { className: "menu__link", href: "#", id: "modal-trigger", "data-type": "cd-modal-trigger" },
            React.createElement(
              "i",
              { className: "material-icons" },
              "chat"
            ),
            React.createElement(
              "span",
              { className: "menu-link-name" },
              "Contact"
            )
          )
        ),
        React.createElement(
          "li",
          { className: "menu__item contact-item first-button" },
          React.createElement(
            "a",
            { className: "waves-effect waves-light btn teal darken-1 nav-info" },
            React.createElement("span", { className: "fa fa-envelope fa-fw contact-icon" }),
            "Email"
          )
        ),
        React.createElement(
          "li",
          { className: "menu__item contact-item" },
          React.createElement(
            "a",
            { className: "waves-effect waves-light btn light-blue darken-1 nav-info" },
            React.createElement("span", { className: "fa fa-twitter fa-fw contact-icon" }),
            "Twitter"
          )
        ),
        React.createElement(
          "li",
          { className: "menu__item contact-item" },
          React.createElement(
            "a",
            { className: "waves-effect waves-light btn deep-purple nav-info" },
            React.createElement("span", { className: "fa fa-github fa-fw contact-icon" }),
            "Github"
          )
        )
      ),
      React.createElement(
        "ul",
        { "data-menu": "submenu-1", className: "menu__level", id: "project-menu" },
        projectData.projects.map(function (project) {
          return React.createElement(
            "li",
            { className: "menu__item" },
            React.createElement(
              "a",
              { className: "menu__link", href: "#" },
              React.createElement(
                "span",
                { className: "menu-link-name" },
                project.title
              )
            )
          );
        })
      )
    );
  }
});

var ProjectCards = React.createClass({
  displayName: "ProjectCards",


  render: function render() {
    var self = this,
        projectItems = projectData.projects;

    return React.createElement(
      "span",
      null,
      projectItems.map(function (project) {
        return React.createElement(Project, { projectData: project });
      })
    );
  }
});

var Project = React.createClass({
  displayName: "Project",


  render: function render() {
    var self = this,
        project = self.props.projectData;

    return React.createElement(
      "div",
      { className: "col s12 m6 l4" },
      React.createElement(
        "a",
        { href: "#" },
        React.createElement(
          "div",
          { className: "card home-card" },
          React.createElement(
            "div",
            { className: "card-image" },
            React.createElement("img", { src: "img/" + project.ID + "_thumb.png" })
          ),
          React.createElement(
            "div",
            { className: "card-content" },
            React.createElement(
              "p",
              { className: "teal-text text-darken-2" },
              "PROJECT: " + project.title
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(ProjectCards, null), document.getElementById("project-cards"));

ReactDOM.render(React.createElement(NavMenu, null), document.getElementById("nav-menu"));