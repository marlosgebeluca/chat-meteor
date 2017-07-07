import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './login.html';

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;

        Meteor.loginWithPassword(email, password);
    },

    'click .register': function(){
        event.preventDefault();
        FlowRouter.go('/register');
    }
});