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
