'use strict';

/**
 * Created by damien on 2/9/16.
 */

// Compile this by running this in the terminal:
// $ babel --presets es2015,react --watch src/js/ --out-dir js/

//variable declarations
var globalNavMenu;

var filterProjects = function filterProjects() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? { hide: false, animationTime: 800 } : arguments[0];


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

var sendMenuBack = function sendMenuBack() {
  if (globalNavMenu.current > 0) {
    globalNavMenu._back();
  }
};

var resetHomePage = function resetHomePage() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  filterProjects(options.filterOptions);
  sendMenuBack();
};

var openAboutMeModal = function openAboutMeModal() {
  $(".cd-modal svg > path").css("fill", "navy"); //Change the background modal to the colour you want

  ReactDOM.render(React.createElement(AboutModal, null), document.getElementById("cd-modal-content"));
};

var openProjectModal = function openProjectModal(projectData) {
  $(".cd-modal svg > path").css("fill", "purple"); //Change the background modal to the colour you want

  ReactDOM.render(React.createElement(ProjectModal, { projectData: projectData }), document.getElementById("cd-modal-content"));
};

var openContactModal = function openContactModal() {
  $(".cd-modal svg > path").css("fill", "darkgreen"); //Change the background modal to the colour you want

  ReactDOM.render(React.createElement(ContactModal, null), document.getElementById("cd-modal-content"));
};

// Create a custom component by calling React.createClass.

var NavMenu = React.createClass({
  displayName: 'NavMenu',


  render: function render() {
    return React.createElement(
      'span',
      null,
      React.createElement(
        'ul',
        { 'data-menu': 'main', className: 'menu__level' },
        React.createElement(
          'li',
          { className: 'menu__item' },
          React.createElement(
            'a',
            { className: 'menu__link mobile-only', href: '#' },
            React.createElement('span', { className: 'fa fa-home fa-fw' }),
            React.createElement(
              'span',
              { className: 'menu-link-name' },
              'Home'
            )
          )
        ),
        React.createElement(
          'li',
          { className: 'menu__item' },
          React.createElement(
            'a',
            { className: 'menu__link', href: '#', 'data-modal-id': 'modal-trigger', 'data-type': 'cd-modal-trigger', onClick: openAboutMeModal },
            React.createElement('span', { className: 'fa fa-user fa-fw' }),
            React.createElement(
              'span',
              { className: 'menu-link-name' },
              'About'
            )
          )
        ),
        React.createElement(
          'li',
          { className: 'menu__item' },
          React.createElement(
            'a',
            { className: 'menu__link', 'data-submenu': 'submenu-1', href: '#' },
            React.createElement('span', { className: 'fa fa-cogs fa-fw', 'data-submenu': 'submenu-1' }),
            React.createElement(
              'span',
              { className: 'menu-link-name', 'data-submenu': 'submenu-1' },
              'Projects'
            )
          )
        ),
        React.createElement(
          'li',
          { className: 'menu__item' },
          React.createElement(
            'a',
            { className: 'menu__link', href: '#', 'data-modal-id': 'modal-trigger', 'data-type': 'cd-modal-trigger', onClick: openContactModal },
            React.createElement(
              'i',
              { className: 'material-icons' },
              'chat'
            ),
            React.createElement(
              'span',
              { className: 'menu-link-name' },
              'Contact'
            )
          )
        ),
        React.createElement(
          'li',
          { className: 'menu__item contact-item first-button' },
          React.createElement(
            'a',
            { className: 'waves-effect waves-light btn btn-floating grey darken-3 nav-info tooltipped',
              'data-position': 'right',
              'data-delay': '25',
              'data-tooltip': 'Click to copy e-mail address: info@theroamingdev.com' },
            React.createElement('span', { className: 'fa fa-envelope fa-fw contact-icon' })
          )
        ),
        React.createElement(
          'li',
          { className: 'menu__item contact-item' },
          React.createElement(
            'a',
            { href: 'https://twitter.com/DamienBAus',
              target: '_blank',
              className: 'waves-effect waves-light btn btn-floating grey darken-3 nav-info' },
            React.createElement('span', { className: 'fa fa-twitter fa-fw contact-icon' })
          )
        ),
        React.createElement(
          'li',
          { className: 'menu__item contact-item' },
          React.createElement(
            'a',
            { className: 'waves-effect waves-light btn btn-floating grey darken-3 nav-info',
              href: 'https://github.com/DamienBAus',
              target: '_blank' },
            React.createElement('span', { className: 'fa fa-github fa-fw contact-icon' })
          )
        )
      ),
      React.createElement(
        'ul',
        { 'data-menu': 'submenu-1', className: 'menu__level', id: 'project-menu' },
        projectData.projects.map(function (project) {
          return React.createElement(
            'li',
            { className: 'menu__item' },
            React.createElement(
              'a',
              { className: 'menu__link', href: '#' },
              React.createElement(
                'span',
                { className: 'menu-link-name' },
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
  displayName: 'ProjectCards',


  render: function render() {
    var self = this,
        projectItems = projectData.projects;

    return React.createElement(
      'span',
      null,
      projectItems.map(function (project, i) {
        return React.createElement(Project, { projectData: project, isLastItem: i === projectItems.length - 1 });
      })
    );
  }
});

var Project = React.createClass({
  displayName: 'Project',


  render: function render() {
    var self = this,
        project = self.props.projectData,
        extraClasses = self.props.isLastItem ? " hide-on-med-only" : "";

    return React.createElement(
      'div',
      { className: "col s12 m6 l4 xl3" + extraClasses },
      React.createElement(
        'a',
        { href: '#', 'data-modal-id': 'modal-trigger', 'data-type': 'cd-modal-trigger', onClick: openProjectModal.bind(self, project) },
        React.createElement(
          'div',
          { className: 'card home-card project-card' },
          React.createElement(
            'div',
            { className: 'card-image' },
            React.createElement('img', { src: "img/" + project.ID + "_thumb_v2.jpg" })
          ),
          React.createElement(
            'div',
            { className: 'card-content' },
            React.createElement(
              'p',
              { className: 'card-text' },
              project.shortTitle,
              React.createElement('span', { className: 'project-word' })
            )
          )
        )
      )
    );
  }
});

var AboutModal = React.createClass({
  displayName: 'AboutModal',


  render: function render() {
    var self = this;

    return React.createElement(
      'div',
      null,
      'This modal contains data about me! '
    );
  }
});

var ProjectModal = React.createClass({
  displayName: 'ProjectModal',


  render: function render() {
    var self = this,
        projectData = self.props.projectData;

    return React.createElement(
      'div',
      null,
      'This modal contains data about ',
      projectData.title,
      '! '
    );
  }
});

var ContactModal = React.createClass({
  displayName: 'ContactModal',


  render: function render() {
    var self = this;

    return React.createElement(
      'div',
      null,
      'This modal contains data about how to contact me! '
    );
  }
});

ReactDOM.render(React.createElement(ProjectCards, null), document.getElementById("project-cards"));

ReactDOM.render(React.createElement(NavMenu, null), document.getElementById("nav-menu"));

$("#about-card").parent().click(openAboutMeModal);
$("#contact-card").parent().click(openContactModal);