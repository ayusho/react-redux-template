"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Route.Route;


var NotfoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <p>Page not found</p>
            </div>
        );
    }
});

module.exports = NotfoundPage;