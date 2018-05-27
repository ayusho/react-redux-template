"use strict";
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');



Router.run(routes, function(Handler){   //Router.HistoryLocation, in the parameters to remove #
    React.render(<Handler />, document.getElementById('app'));
});