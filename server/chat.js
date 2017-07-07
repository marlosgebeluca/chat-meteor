Messages = new Mongo.Collection("msgs");
import { FlowRouter } from 'meteor/kadira:flow-router';

Meteor.methods({
  sendMessage: function (messageText) {
    
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      messageText: messageText,
      createdAt: new Date(),
      username: Meteor.user().username
    });
    FlowRouter.go('/chat');
  }
  
});

if (Meteor.isServer) {
  Meteor.publish("messages", function () {
    return Messages.find();
  });
}