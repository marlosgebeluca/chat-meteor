import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './header.html';

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;

        Meteor.loginWithPassword(email, password);
        FlowRouter.go('/');
    },

    'click .logout': function(){
        event.preventDefault();
        FlowRouter.go('/');
    }
});