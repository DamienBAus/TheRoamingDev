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
  $(".cd-modal svg > path").css("fill", "#ffffff"); //Change the background modal to the colour you want

  ReactDOM.render(React.createElement(AboutModal, null), document.getElementById("cd-modal-content"));

  $('.cd-modal-content').scrollTop(0);
  $('.modal-close').focus(); //Focus on the close button for accessibility reasons
};

var openProjectModal = function openProjectModal(projectData) {
  $(".cd-modal svg > path").css("fill", "#1c1d22"); //Change the background modal to the colour you want

  ReactDOM.render(React.createElement(ProjectModal, { projectData: projectData }), document.getElementById("cd-modal-content"));

  $('.cd-modal-content').scrollTop(0);
  $('.modal-close').focus(); //Focus on the close button for accessibility reasons

  setTimeout(function () {
    resetHomePage();
  }, 800);
};

var openContactModal = function openContactModal() {
  $(".cd-modal svg > path").css("fill", "#11487c"); //Change the background modal to the colour you want

  ReactDOM.render(React.createElement(ContactModal, null), document.getElementById("cd-modal-content"));

  $('.cd-modal-content').scrollTop(0);
  $('.modal-close').focus(); //Focus on the close button for accessibility reasons
};

var copyEmailAddress = function copyEmailAddress() {
  // We will need a range object and a selection.
  var range = document.createRange(),
      selection = window.getSelection();

  // Clear selection from any previous data.
  selection.removeAllRanges();

  // Make the range select the entire content of the contentHolder paragraph.
  range.selectNodeContents(document.getElementById('hidden-email-address'));

  // Add that range to the selection.
  selection.addRange(range);

  // Copy the selection to clipboard.
  document.execCommand('copy');

  // Clear selection if you want to.
  selection.removeAllRanges();

  $('#email-nav-button').attr('data-tooltip', 'Copied!');
  $($('.material-tooltip').last().children()[0]).html('Copied!');

  setTimeout(function () {
    $('#email-nav-button').attr('data-tooltip', 'Click to copy e-mail address: info@damienbeard.com');
  }, 1000);
};

// Create a custom component by calling React.createClass.

var NavMenu = React.createClass({
  displayName: 'NavMenu',


  render: function render() {
    var _this = this;

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
              id: 'email-nav-button',
              'data-position': 'right',
              'data-delay': '25',
              'data-tooltip': 'Click to copy e-mail address: info@damienbeard.com',
              tabIndex: '0',
              onClick: copyEmailAddress
            },
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
              { className: 'menu__link', href: '#', 'data-modal-id': 'modal-trigger', 'data-type': 'cd-modal-trigger', onClick: openProjectModal.bind(_this, project) },
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
        return React.createElement(Project, { number: i, projectData: project, isLastItem: i === projectItems.length - 1 });
      })
    );
  }
});

var Project = React.createClass({
  displayName: 'Project',


  render: function render() {
    var self = this,
        project = self.props.projectData,
        extraClasses = self.props.isLastItem ? " hide-on-med-only" : "",
        picRatio = self.props.number / 7 * 100 + '%';

    return React.createElement(
      'div',
      { className: "col s12 m6 l4 xl3" + extraClasses },
      React.createElement(
        'a',
        { href: '#',
          className: 'card home-card project-card home-card-link',
          'data-modal-id': 'modal-trigger',
          'data-type': 'cd-modal-trigger',
          onClick: openProjectModal.bind(self, project) },
        React.createElement(
          'div',
          { className: "card-image projectPicNumber" + self.props.number },
          React.createElement('div', { style: { backgroundImage: 'url(img/project_sprites-min.jpg)',
              backgroundRepeat: 'no-repeat', backgroundPositionX: '50%', clipPath: 'polygon( 0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              paddingBottom: '82.6%', backgroundSize: 'cover', backgroundPositionY: picRatio } })
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
    );
  }
});

var AboutModal = React.createClass({
  displayName: 'AboutModal',


  render: function render() {
    var self = this;

    return React.createElement(
      'div',
      { className: 'AboutModal container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12 m5 l5 xl5' },
          React.createElement('img', { className: 'about-me-pic', src: 'img/about-me-pic.jpg' })
        ),
        React.createElement('div', { className: 'col hide-on-small-only m1 l1 xl1 spacer-col' }),
        React.createElement(
          'div',
          { className: 'col s12 m5 l5 xl5' },
          React.createElement(
            'div',
            { className: 'about-me-blurb' },
            React.createElement(
              'p',
              null,
              'I am a Fullstack Software Engineer with a particular interest in championing for users in both professional and open source projects. My passion is to create high impact on people\'s lives using software, which led me on an adventure to work in the San Francisco tech scene. Prior to moving to the United States I graduated from a Bachelor of Software Engineering with First Class Honours from The Australian National University in 2014.'
            ),
            React.createElement(
              'p',
              null,
              'I have recently been part of a team that launched a content distribution platform for local news organizations across the web. I have also helped engineer a web and javascript interface for a real-time chat service, along with an administration console to control the service across the organization\'s web, iOS and Android platforms.'
            )
          )
        ),
        React.createElement('div', { className: 'col hide-on-small-only m1 l1 xl1 spacer-col' })
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { className: 'col hide-on-small-only m1 l1 xl1 spacer-col' }),
        React.createElement(
          'div',
          { className: 'col s12 m4 l4 xl4' },
          React.createElement(
            'div',
            { className: 'about-me-blurb' },
            React.createElement(
              'p',
              null,
              'I have experience coding in the following languages.'
            ),
            React.createElement(
              'h5',
              null,
              'Very Proficient'
            ),
            React.createElement(
              'blockquote',
              null,
              'Javascript (including ES6 and ES7+)',
              React.createElement('br', null),
              'React.js',
              React.createElement('br', null),
              'Node.js',
              React.createElement('br', null),
              'HTML & CSS'
            ),
            React.createElement(
              'h5',
              null,
              'Proficient'
            ),
            React.createElement(
              'blockquote',
              null,
              'Java',
              React.createElement('br', null),
              'PowerShell'
            ),
            React.createElement(
              'h5',
              null,
              'Moderate'
            ),
            React.createElement(
              'blockquote',
              null,
              'Python',
              React.createElement('br', null),
              'C',
              React.createElement('br', null),
              'SQL'
            )
          )
        ),
        React.createElement('div', { className: 'col hide-on-small-only m1 l1 xl1 spacer-col' }),
        React.createElement(
          'div',
          { className: 'col s12 m5 l5 xl5' },
          React.createElement('img', { className: 'engineer-pic', src: 'img/engineer.jpg' })
        )
      )
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
      { className: 'ProjectModal container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12 m5 l4 xl4' },
          React.createElement('div', { className: 'ProjectModal-projectPic', style: { backgroundImage: 'url(img/' + projectData.ID + '_thumb_v2.jpg)' } }),
          projectData.link ? React.createElement(
            'a',
            { className: 'ProjectModal-goToProjectButton waves-effect waves-light btn-large',
              href: projectData.link,
              target: '_blank' },
            React.createElement(
              'i',
              { className: 'material-icons left' },
              'open_in_new'
            ),
            projectData.viewText || 'Go to Project'
          ) : null
        ),
        React.createElement(
          'div',
          { className: 'ProjectModal-descriptionCol col s12 m7 l8 xl8' },
          React.createElement(
            'div',
            { className: 'ProjectModal-projectOverview' },
            React.createElement(
              'h3',
              { className: 'ProjectModal-projectTitle' },
              projectData.title
            ),
            React.createElement(
              'div',
              { className: 'ProjectModal-chips' },
              projectData.role ? React.createElement(
                'div',
                { className: 'chip' },
                React.createElement(
                  'i',
                  { className: 'material-icons' },
                  'face'
                ),
                projectData.role
              ) : null,
              projectData.category ? React.createElement(
                'div',
                { className: 'chip' },
                React.createElement(
                  'i',
                  { className: 'material-icons' },
                  'build'
                ),
                projectData.category
              ) : null
            ),
            React.createElement(
              'div',
              { className: 'ProjectModal-projectBlurb' },
              projectData.blurb
            )
          ),
          React.createElement('div', { className: 'ProjectModal-projectDescription', dangerouslySetInnerHTML: { __html: projectData.fullText } })
        )
      )
    );
  }
});

var ContactModal = React.createClass({
  displayName: 'ContactModal',


  render: function render() {
    var self = this;
    var contactData = [{
      label: 'EMAIL',
      iconClasses: 'fa fa-envelope fa-fw',
      info: [{
        label: 'Email me at: ',
        value: 'info@damienbeard.com'
      }],
      actionButton: {
        label: 'Send me an e-mail',
        uri: 'mailto:info@damienbeard.com'
      }
    }, {
      label: 'GITHUB',
      iconClasses: 'fa fa-github fa-fw',
      info: [{
        label: 'Username: ',
        value: 'damienbaus'
      }, {
        label: 'Profile link: ',
        value: 'https://github.com/DamienBAus'
      }],
      actionButton: {
        label: 'Go to Profile',
        uri: 'https://github.com/DamienBAus'
      }
    }, {
      label: 'TWITTER',
      iconClasses: 'fa fa-twitter fa-fw',
      info: [{
        label: 'Handle: ',
        value: '@DamienBAus'
      }, {
        label: 'Twitter Feed: ',
        value: 'https://twitter.com/DamienBAus'
      }],
      actionButton: {
        label: 'Go to Profile',
        uri: 'https://twitter.com/DamienBAus'
      }
    }, {
      label: 'LINKEDIN',
      iconClasses: 'fa fa-linkedin fa-fw',
      info: [{
        label: 'Find me under: ',
        value: 'Damien Beard'
      }],
      actionButton: {
        label: 'Go to Profile',
        uri: 'http://www.linkedin.com/in/damienbeard'
      }
    }];

    var cards = contactData.map(function (data, i) {
      return React.createElement(
        'div',
        { key: i, className: 'col s12 m6 l6 xl6 ContactModal-cardCol' },
        React.createElement(ContactModalCard, { label: data.label, iconClasses: data.iconClasses, info: data.info, action: data.actionButton })
      );
    });

    return React.createElement(
      'div',
      { className: 'ContactModal container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12' },
          React.createElement(
            'div',
            { className: 'ContactModal-title' },
            React.createElement(
              'h1',
              null,
              'CONTACT ME'
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row ContactModal-cards' },
        cards
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12' },
          React.createElement(
            'div',
            { className: 'ContactModal-bigCloseButton modal-close-btn' },
            React.createElement(
              'div',
              { className: 'ContactModal-bigCloseButtonText' },
              'BACK TO HOME'
            )
          )
        )
      )
    );
  }
});

var ContactModalCard = React.createClass({
  displayName: 'ContactModalCard',


  topElem: null,

  componentDidMount: function componentDidMount() {
    var _this2 = this;

    $('.modal-close-btn').each(function (i, elem) {
      elem.addEventListener('click', _this2._removeAllCovers);
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    var _this3 = this;

    $('.modal-close-btn').each(function (i, elem) {
      elem.removeEventListener('click', _this3._removeAllCovers);
    });
  },

  _removeAllCovers: function _removeAllCovers() {
    $('.ContactModalCard').removeClass('cover');
  },

  _removeThisCover: function _removeThisCover(event) {
    $(this.topElem).removeClass('cover');
    event.stopPropagation();
  },

  _showData: function _showData(elem) {
    $(this.topElem).removeClass('cover').addClass('cover');
  },

  render: function render() {
    var _this4 = this;

    var self = this;
    var _props = this.props;
    var cardLabel = _props.label;
    var iconClasses = _props.iconClasses;
    var _props$info = _props.info;
    var info = _props$info === undefined ? [] : _props$info;
    var action = _props.action;


    var informationLines = info.map(function (contactInfo, i) {
      return React.createElement(
        'div',
        { className: 'ContactModalCard-infoLine', key: i },
        React.createElement(
          'span',
          { className: 'ContactModalCard-infoLabel' },
          contactInfo.label
        ),
        React.createElement(
          'span',
          { className: 'ContactModalCard-infoValue' },
          contactInfo.value
        )
      );
    });

    return React.createElement(
      'div',
      { className: 'ContactModalCard', ref: function ref(elem) {
          return _this4.topElem = elem;
        } },
      React.createElement(
        'div',
        { className: 'ContactModalCard-contents', onClick: this._showData },
        React.createElement(
          'div',
          { className: 'ContactModalCard-icon' },
          React.createElement('span', { className: iconClasses })
        ),
        React.createElement(
          'div',
          { className: 'ContactModalCard-cardLabel' },
          cardLabel
        ),
        React.createElement(
          'div',
          { className: 'ContactModalCard-innerContents' },
          React.createElement(
            'div',
            { className: 'ContactModalCard-closeButton', onClick: this._removeThisCover },
            'x'
          ),
          React.createElement(
            'h4',
            { className: 'ContactModalCard-innerContentsTitle' },
            cardLabel
          ),
          informationLines,
          React.createElement(
            'a',
            { className: 'ContactModalCard-actionButton waves-effect waves-light btn-large',
              href: action.uri,
              target: '_blank' },
            action.label
          )
        ),
        React.createElement('div', { className: 'ContactModalCard-cover' })
      )
    );
  }
});

ReactDOM.render(React.createElement(ProjectCards, null), document.getElementById("project-cards"));

ReactDOM.render(React.createElement(NavMenu, null), document.getElementById("nav-menu"));

$("#about-card").parent().click(openAboutMeModal);
$("#contact-card").parent().click(openContactModal);