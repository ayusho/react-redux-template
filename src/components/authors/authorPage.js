"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorApi = require('../../api/authorApi');

var Author = React.createClass({
    getInitialState: function(){
        return {
            authors: []
        };
    },

    componentWillMount: function(){
        this.setState({ authors: AuthorApi.getAllAuthors() });
    },
    render: function() {
        var createAuthorRow = function(author){
            return (
                <tr key={author.id}>
                    <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
                    <td>{author.firstName}{author.lastName}</td>
                </tr>
            );
        };

        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add author</Link>
                <table className="table">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                </thead>
                <tbody>
                    {this.state.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Author;