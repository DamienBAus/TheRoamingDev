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
  $(".cd-modal svg > path").css("fill", "#ffffff"); //Change the background modal to the colour you want

  ReactDOM.render(
    <AboutModal />,
    document.getElementById("cd-modal-content")
  );

  $('.cd-modal-content').scrollTop(0);
  $('.modal-close').focus();  //Focus on the close button for accessibility reasons
};

var openProjectModal = function(projectData) {
  $(".cd-modal svg > path").css("fill", "#1c1d22"); //Change the background modal to the colour you want

  ReactDOM.render(
    <ProjectModal projectData={projectData}/>,
    document.getElementById("cd-modal-content")
  );

  $('.cd-modal-content').scrollTop(0);
  $('.modal-close').focus();  //Focus on the close button for accessibility reasons

  setTimeout(() => {
    resetHomePage();
  }, 800);
};

var openContactModal = function(){
  $(".cd-modal svg > path").css("fill", "#11487c"); //Change the background modal to the colour you want

  ReactDOM.render(
    <ContactModal />,
    document.getElementById("cd-modal-content")
  );

  $('.cd-modal-content').scrollTop(0);
  $('.modal-close').focus();  //Focus on the close button for accessibility reasons
};

var copyEmailAddress = function() {
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
  $($('.material-tooltip').last().children()[0]).html('Copied!')

  setTimeout(function(){
    $('#email-nav-button').attr('data-tooltip', 'Click to copy e-mail address: info@damienbeard.com');
  }, 1000);

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
             id="email-nav-button"
             data-position="right"
             data-delay="25"
             data-tooltip="Click to copy e-mail address:&#10; info@damienbeard.com"
             tabIndex="0"
             onClick={copyEmailAddress}
          >
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
            <a className="menu__link" href="#" data-modal-id="modal-trigger" data-type="cd-modal-trigger" onClick={openProjectModal.bind(this, project)}>
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
        <a href="#"
           className="card home-card project-card home-card-link"
           data-modal-id="modal-trigger"
           data-type="cd-modal-trigger"
           onClick={openProjectModal.bind(self, project)}>
            <div className="card-image">
              <img src={"img/" + project.ID + "_thumb_v2.jpg"} />
            </div>
            <div className="card-content">
              <p className="card-text">{project.shortTitle}<span className="project-word"/></p>
            </div>
        </a>
      </div>
    );
  }
});

var AboutModal = React.createClass({

  render: function() {
    var self = this;

    return (
      <div className="AboutModal container">
        <div className="row">
          <div className="col s12 m5 l5 xl5">
            <img className="about-me-pic" src="img/about-me-pic.jpg" />
          </div>

          <div className="col hide-on-small-only m1 l1 xl1 spacer-col" />

          <div className="col s12 m5 l5 xl5">
            <div className="about-me-blurb">
              <p>
                I am a Fullstack Software Engineer with a particular interest in championing for users in both professional
                and open source projects. My passion is to create high impact on people's lives using software, which led me
                on an adventure to work in the San Francisco tech scene. Prior to moving to the United States I graduated from
                a Bachelor of Software Engineering with First Class Honours from The Australian National University in 2014.
              </p>
              <p>
                I have recently been part of a team that launched a content distribution platform for local news organizations
                across the web. I have also helped engineer a web and javascript interface for a real-time chat service, along
                with an administration console to control the service across the organization's web, iOS and Android platforms.
              </p>
            </div>
          </div>


          <div className="col hide-on-small-only m1 l1 xl1 spacer-col" />

        </div>

        <div className="row">
          <div className="col hide-on-small-only m1 l1 xl1 spacer-col" />

          <div className="col s12 m4 l4 xl4">
            <div className="about-me-blurb">
              <p>I have experience coding in the following languages.</p>

              <h5>Very Proficient</h5>
              <blockquote>
                Javascript (including ES6 and ES7+)<br/>
                React.js<br/>
                Node.js<br/>
                HTML & CSS
              </blockquote>

              <h5>Proficient</h5>
              <blockquote>
                Java<br/>
                PowerShell
              </blockquote>

              <h5>Moderate</h5>
              <blockquote>
                Python<br/>
                C<br/>
                SQL
              </blockquote>
            </div>
          </div>

          <div className="col hide-on-small-only m1 l1 xl1 spacer-col" />

          <div className="col s12 m5 l5 xl5">
            <img className="engineer-pic" src="img/engineer.jpg" />
          </div>

        </div>


      </div>
    );
  }
});

var ProjectModal = React.createClass({

  render: function() {
    var self = this,
      projectData = self.props.projectData;

    return (
      <div className="ProjectModal container">
        <div className="row">
          <div className="col s12 m5 l4 xl4">
            <div className="ProjectModal-projectPic" style={{backgroundImage: 'url(img/' + projectData.ID + '_thumb_v2.jpg)'}} />
            {projectData.link ?
              <a className="ProjectModal-goToProjectButton waves-effect waves-light btn-large"
                 href={projectData.link}
                 target="_blank">
                <i className="material-icons left">open_in_new</i>{projectData.viewText || 'Go to Project'}
              </a> : null}
          </div>

          <div className="ProjectModal-descriptionCol col s12 m7 l8 xl8">
            <div className="ProjectModal-projectOverview">
              <h3 className="ProjectModal-projectTitle">{projectData.title}</h3>
              <div className="ProjectModal-chips">
                {projectData.role ? <div className="chip"><i className="material-icons">face</i>{projectData.role}</div> : null}
                {projectData.category ? <div className="chip"><i className="material-icons">build</i>{projectData.category}</div> : null}
              </div>
              <div className="ProjectModal-projectBlurb">{projectData.blurb}</div>
            </div>

            <div className="ProjectModal-projectDescription" dangerouslySetInnerHTML={{__html: projectData.fullText }} />
          </div>
        </div>
      </div>
    );
  }
});

var ContactModal = React.createClass({

  render: function() {
    var self = this;
    const contactData = [
      {
        label: 'EMAIL',
        iconClasses: 'fa fa-envelope fa-fw',
        info: [
          {
            label: 'Email me at: ',
            value: 'info@damienbeard.com'
          }
        ],
        actionButton: {
          label: 'Send me an e-mail',
          uri: 'mailto:info@damienbeard.com'
        }
      },
      {
        label: 'GITHUB',
        iconClasses: 'fa fa-github fa-fw',
        info: [
          {
            label: 'Username: ',
            value: 'damienbaus'
          },
          {
            label: 'Profile link: ',
            value: 'https://github.com/DamienBAus'
          }
        ],
        actionButton: {
          label: 'Go to Profile',
          uri: 'https://github.com/DamienBAus'
        }
      },
      {
        label: 'TWITTER',
        iconClasses: 'fa fa-twitter fa-fw',
        info: [
          {
            label: 'Handle: ',
            value: '@DamienBAus'
          },
          {
            label: 'Twitter Feed: ',
            value: 'https://twitter.com/DamienBAus'
          }
        ],
        actionButton: {
          label: 'Go to Profile',
          uri: 'https://twitter.com/DamienBAus'
        }
      },
      {
        label: 'LINKEDIN',
        iconClasses: 'fa fa-linkedin fa-fw',
        info: [
          {
            label: 'Find me under: ',
            value: 'Damien Beard'
          }
        ],
        actionButton: {
          label: 'Go to Profile',
          uri: 'http://www.linkedin.com/in/damienbeard'
        }
      }
    ];

    const cards = contactData.map((data, i) => (
      <div key={i} className="col s12 m6 l6 xl6 ContactModal-cardCol">
        <ContactModalCard label={data.label} iconClasses={data.iconClasses} info={data.info} action={data.actionButton} />
      </div>
    ));

    return (
      <div className="ContactModal container">
        <div className="row">
          <div className="col s12">
            <div className="ContactModal-title">
              <h1>CONTACT ME</h1>
            </div>
          </div>
        </div>

        <div className="row ContactModal-cards">
          {cards}
        </div>

        <div className="row">
          <div className="col s12">
            <div className="ContactModal-bigCloseButton modal-close-btn">
              <div className="ContactModal-bigCloseButtonText">BACK TO HOME</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

var ContactModalCard = React.createClass({

  topElem: null,

  componentDidMount: function(){
    $('.modal-close-btn').each((i, elem) => {
      elem.addEventListener('click', this._removeAllCovers);
    })
  },

  componentWillUnmount: function(){
    $('.modal-close-btn').each((i, elem) => {
      elem.removeEventListener('click', this._removeAllCovers);
    })
  },

  _removeAllCovers: function(){
    $('.ContactModalCard').removeClass('cover');
  },

  _removeThisCover: function(event){
    $(this.topElem).removeClass('cover');
    event.stopPropagation();
  },

  _showData: function(elem){
    $(this.topElem).removeClass('cover').addClass('cover');
  },

  render: function() {
    var self = this;
    const { label: cardLabel, iconClasses, info = [], action } = this.props;

    const informationLines = info.map((contactInfo, i) => (
      <div className="ContactModalCard-infoLine" key={i}>
        <span className="ContactModalCard-infoLabel">{contactInfo.label}</span>
        <span className="ContactModalCard-infoValue">{contactInfo.value}</span>
      </div>
    ));

    return (
      <div className="ContactModalCard" ref={(elem) => (this.topElem = elem)}>
        <div className="ContactModalCard-contents" onClick={this._showData}>
          <div className="ContactModalCard-icon">
            <span className={iconClasses}></span>
          </div>
          <div className="ContactModalCard-cardLabel">
            {cardLabel}
          </div>
          <div className="ContactModalCard-innerContents">
            <div className="ContactModalCard-closeButton" onClick={this._removeThisCover}>x</div>
            <h4 className="ContactModalCard-innerContentsTitle">{cardLabel}</h4>
            {informationLines}
            <a className="ContactModalCard-actionButton waves-effect waves-light btn-large"
               href={action.uri}
               target="_blank">
              {action.label}
            </a>
          </div>
          <div className="ContactModalCard-cover" />
        </div>
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

$("#about-card").parent().click(openAboutMeModal);
$("#contact-card").parent().click(openContactModal);