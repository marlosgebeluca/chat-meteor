import { Template } from 'meteor/templating';

import './userRegister.html';

Template.userRegister.events({
    'submit form': function(event){
        event.preventDefault();

        var nome = event.target.nome.value;       
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;

        Accounts.createUser({
            email: email,
            username: nome,
            password: password
        });
        FlowRouter.go('/');
    },

    'click .voltar': function(){
        event.preventDefault();
        FlowRouter.go('/');
    },
});