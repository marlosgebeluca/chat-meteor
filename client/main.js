import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import './main.html';

FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', { main: "login" });
    }
});

FlowRouter.route('/register', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', { main: "userRegister" });
    }
});

FlowRouter.route('/salas', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', { main: "roomList" });
    }
});

Template.body.helpers({
  
});