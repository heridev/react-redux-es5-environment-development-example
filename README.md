### These were most of the steps I followed in order to create this example:
Based on https://app.pluralsight.com/library/courses/react-flux-building-applications/table-of-contents

#### Setting up the environment setup:
github.com/coryhouse/react-flux-starter-kit

- Node
- Browserify
- Gulp
- Boostrap
- ESLint

### After installing node.js

Setup a new package.json file

```
>> npm init
```

and follow the steps

### Gulp installation

```
npm install --save gulp@3.9.0 gulp-connect@2.2.0 gulp-open@1.0.0
```

Create the dist and src folders and create a new file for configuration:
```
touch gulpfile.js
```

with the following connect for development

```
'user strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // open a url in a web broser)

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    dist: './dist'
  }
}

// start a local development server
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  })
})

gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
      .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
})

gulp.task('html', function(){
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
})

gulp.task('default', ['html', 'open', 'watch'], function(){});
```

#### let's add some basic html in the index.html file

```
<html lang='es'>

  <head><title>Pacientes Web React</title></head>
  <body>
    <div id='app'></div>
  </body>
</html>
```

#### Let's continue installing more dependencies

```
npm install --save browserify@11.0.1 reactify vinyl-source-stream@1.1.0
```

we just installed three dependencies so let's add them in the gulpfile.js

```
var browserify = require('browserify'); // bundles js
var reactify = require('reactify');  // transform react jsx to js
var source = require('vinyl-source-stream');  // user conventional text streams for gulp
```

update the new javascript directotires in gulpfile as well:

```
var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    dist: './dist'
  }
}

## create the js task
gulp.task('js', function() {
  browserify(config.paths.mainJs)
      .transform(reactify)
      .bundle()
      .on('error', console.error.bind(console))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.paths.dist + '/scripts'))
      .pipe(connect.reload());
})

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
})

gulp.task('default', ['html', 'open', 'watch', 'js'], function(){});
```

include the compiled js file in the main html file:
```
<script src='scripts/bundle.js'></script>
```

we are installing the following dependencies:

```
npm install --save bootstrap jquery gulp-concat
```

setup the new gulp-concat to concat css files:

put the following in the config file:

```
css: [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
]
```

create thec css gulp task:

```
gulp.task('css', function(){
  gulp.src(config.paths.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.paths.dist + '/css')); 
})
```

Bootstrap expects to have jquery so let's require it in the gulpfile.js
```
$ = Jquery = require('jquery');
```

include the bundle.css file in the main html file:
```
<link rel='stylesheet' href='css/bundle.css' />
```


boostrap html classes example that you can use
```
<div class='jumbotron'>
  <h1>Hello from bootstrap</h1>
</div>
```

### ESLint to lint keep us inform if we make mistakes.

```
npm install --save gulp-eslint
```

Add it in the gulfile
```
var lint = require('gulp-eslint');
```

create a eslint task:
```
gulp.task('lint', function() {
 return gulp.src(config.paths.js)
            .pipe(lint({configFile: 'eslint.config.json'}))
            .pipe(lint.format());
});
```

create the eslint.config.json
```
{
  "extends": "eslint:recommended",
  "ecmaFEatures": {
    "jsx": true
  },
  "rules": {
    "no-alert": 0,
    "no-console":0,
    "no-bitwise": 0,
    "camelcase": 1,
    "curly": 1,
    "eqeqeq": 0,
    "no-eq-null": 0,
    "guard-for-in": 1,
    "no-empty": 1
  },
  "globals": {
    "$": true,
    "Jquery": true
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
  }
}
```

### let's begin with react react-router and flux
```
npm install --save react react-router flux
```

create src/components folder

```
src/components/homePage.js
```

### we will use es5

```
"use strict";

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>Plural sigh admininstration</h1>
        <p>React, react router, and flux ultra responsive web apps</p>
      </div>
    );
  }
});

module.exports = Home;
```

#### code for main.js

```
var Home = require('./components/homePage');
React.render(<Home>, document.getDocumentById('root'));
```

## edit the main.js file
```
$ = Jquery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/homePage');

ReactDOM.render(<Home />, document.getElementById('app'));
```

### let's work with more pages

create a new folder and file called about/aboutPage.js

with the follwing content:

```
'use strict';

var React = require('react');

var About = React.createClass({
  render: function() {
    return(
      <div>
        <h1>About</h1>
        <p>
          this application uses the following technologies:
        </p>
        <ul>
          <li>React</li>
          <li> REact router </li>
        </ul>
      </div>
    );
  }
});

module.exports = About;
```

Add the following to main.js

```
$ = Jquery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');

(function(win) {
  'use strict';
  var App = React.createClass({
    render: function() {
      var Child;
      switch(this.props.route) {
        case 'about':
          Child = About;
          break;
        default:
          Child = Home;
      }

      return(<div><Child /></div>);
    }
  })

  var render = function render(){
    var route = win.location.hash.substr(1);
    ReactDOM.render(<App route={route} />, document.getElementById('app'));
  }

  win.addEventListener("hashchange", render, false);
  render();
}(window));
```

new src/common/header.js file

```
"use strict";

var React = require('react');

var Header = React.createClass({
  render: function() {
    return(
      <nav className="navbar navbar-default">
        <div className='container-fluid'>
          <a href="/" className="navbar-brand">
            <img src="images/pluralsight-logo.png" />
          </a>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
          </ul>
        </div>
      </nav>
    )
  }
});

module.exports = Header;
```

put the image in the src/images folder

Include in the gulp file the images in path

```
images: './src/images/*',
```

### and new task for gulpfile:
```
gulp.task('images', function(){
  gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/images'))
      .pipe(connect.reload());

  // publish favicon
  gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
});
```

### require the new 'images' task to be invoked in the gulp.task line.

### React lifecycle

Most of the times a good application will consume an API service so that's why in this example we will create a mocked api service to interact with the frontend.

We will admininister authors for pluralsight:

create the file src/api/authorApi.js and download the content from:
```
https://gist.github.com/coryhouse/fd6232f95f9d601158e4
```


#### content for authorData.js

```
module.exports = {
  authors:
  [
    {
      id: 'cory-house',
      firstName: 'Cory',
      lastName: 'House'
    },
    {
      id: 'scott-allen',
      firstName: 'scto',
      lastName: 'allen',
    },
    {
      id: 'scott-allen',
      firstName: 'scto',
      lastName: 'allen',
    }
  ]
}
```

Let's install the lodash library required for the api mock
```
npm install --save lodash
```

#### Working with authors

new component at src/authors/authorPage.js

```
'use strict';

var React = require('react');
var AuthorApi = require('../../api/authorApi');

var Authors = React.createClass({
  getInitialState: function() {
    return {
      authors: []
    }
  },

  componentWillMount: function() {
    this.setState({ authors: AuthorApi.getAllAuthors() });
  },  

  render: function() {
    var createAuthorRow = function(author) {
      return(
        <tr key={author.id}>
          <td><a href={"/#authors/" + author.id }>{author.id}</a></td>
          <td>{ author.firstName } { author.lastName }</td>
        </tr>
      );
    };
    return(
      <div>
        <h1>Authors</h1>
        <table className='table'>
          <thead>
            <th>ID</th>
            <th>Name</th>
          </thead>
          <tbody>
            {this.state.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = Authors;
```

#### Includes the authors component in the main file

```
var Authors = require('../components/authors/authorPage');

case 'authors':
  Child = Authors;
  break;
```

And include the link for that in the header.js

#### working with controller views.

Let's split the logic for authorPage.

new file src/components/authors/authorList.js with the following content:
// we'll copy and modify a bit the original authorPage to use props instead of the usage of states.

```
'use strict';
var React = require('react');

var AuthorList = React.createClass({

  createAuthorRow: function(author) {
    return(
      <tr key={author.id}>
      <td><a href={"/#authors/" + author.id }>{author.id}</a></td>
      <td>{ author.firstName } { author.lastName }</td>
      </tr>
    );
  },

  render: function() {
    return(
      <div>
        <table className='table'>
          <thead>
            <th>ID</th>
            <th>Name</th>
          </thead>
          <tbody>
            {this.props.authors.map(this.createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = AuthorList;
```

and the authorPage.js looks like:
```
'use strict';

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var Authors = React.createClass({
  getInitialState: function() {
    return {
      authors: []
    }
  },

  componentDidMount: function() {
    if(this.isMounted) {
      this.setState({ authors: AuthorApi.getAllAuthors() });
    }
  },

  render: function() {
    return(
      <div>
        <h1>Authors</h1>
        <AuthorList authors={this.state.authors}/>
      </div>
    )
  }
});

module.exports = Authors;
```

So now we have refactored a bit this components and authorList is only responsible for rendering the information in the DOM.

#### Prop validations

- is a way to enforce your expectactions in development.
- To ensure the expected properties when you use a component and to inform other developers about them - and only work in development.

in the example above authors is required so we can the following method to authorList:

```
propTypes: {
  authors: React.PropTypes.array.isRequired
}
```

So if you include that component without passing authors you'll see an error in the console in the web browser.


### Mixins

You can use them in order to share code between multiple components.

