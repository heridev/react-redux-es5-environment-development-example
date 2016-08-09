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

  createAuthorRow: function(author) {
    return(
      <tr key={author.id}>
      <td><a href={"/#authors/" + author.id }>{author.id}</a></td>
      <td>{ author.firstName } { author.lastName }</td>
      </tr>
    );
  },

  render: function() {
    // this is the same as the outside function but if you use
    // this one you don't need to specify this.createAuthorRow only createAuthorRow
    //createAuthorRow: function(author) {
      //return(
        //<tr key={author.id}>
        //<td><a href={"/#authors/" + author.id }>{author.id}</a></td>
        //<td>{ author.firstName } { author.lastName }</td>
        //</tr>
      //);
    //},

    create
    return(
      <div>
        <h1>Authors</h1>
        <table className='table'>
          <thead>
            <th>ID</th>
            <th>Name</th>
          </thead>
          <tbody>
            {this.state.authors.map(this.createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = Authors;
