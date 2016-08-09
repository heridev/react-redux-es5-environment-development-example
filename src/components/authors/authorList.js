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
