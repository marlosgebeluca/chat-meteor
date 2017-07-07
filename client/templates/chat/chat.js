import { Template } from 'meteor/templating';

import './chat.html';

Messages = new Mongo.Collection("msgs");

var autoScrollingIsActive = false;

mensagemNaoLida = new ReactiveVar(false);

scrollToBottom = function scrollToBottom (duration) {
  var messageWindow = $(".message-window");
  var scrollHeight = messageWindow.prop("scrollHeight");
  messageWindow.stop().animate({scrollTop: scrollHeight}, duration || 0);
};

if (Meteor.isClient) {
  Meteor.subscribe("messages", {
    onReady: function () {
      scrollToBottom();
      autoScrollingIsActive = true;
    }
  });

  Template.chat.helpers({
    mensagemRecente: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    },
    
    mensagemNaoLida: function () {
      return mensagemNaoLida.get();
    }
  });

  Template.message.onRendered(function () {
    if (autoScrollingIsActive) {
      scrollToBottom(250);
    }
     
  });

  Template.chat.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;

      Meteor.call("sendMessage", text);
      scrollToBottom(250); 

      event.target.text.value = "";
      event.preventDefault();
    },
    
    "scroll .message-window": function () {
      var howClose = 80; 
      var messageWindow = $(".message-window");
      var scrollHeight = messageWindow.prop("scrollHeight");
      var scrollBottom = messageWindow.prop("scrollTop") + messageWindow.height();
      var atBottom = scrollBottom > (scrollHeight - howClose);
      autoScrollingIsActive = atBottom ? true : false;
      if (atBottom) {        
        mensagemNaoLida.set(false);
      }
    },

    "click .more-messages": function () {
      scrollToBottom(500);
      mensagemNaoLida.set(false);
    }
  });

  Template.message.onRendered(function () {
    if (autoScrollingIsActive) {
      scrollToBottom(250);
    } else {
      if (Meteor.user() && this.data.username !== Meteor.user().username) {
        mensagemNaoLida.set(true);
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}