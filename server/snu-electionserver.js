Questions = new Meteor.Collection("questions");
 
Meteor.startup(function () {
    // code to run on server at startup
});
 
var allowed_users = ["rv285@gmail.com"];

Meteor.methods({
  addQuestion : function(questionText){
    console.log('Adding Question');
    var questionId = Questions.insert({
          'questionText' : questionText,
          'submittedOn': new Date(),
          'submittedBy' : Meteor.userId(),
          'yes': 0,
          'no' : 0,
          'votedBy': []
      });
    return questionId;
  },
  incrementYesVotes : function(questionId, voterId){
    //console.log(questionId);
    //console.log(Questions.find({_id: questionId, votedBy: voterId}));
    if(Questions.find({_id: questionId, votedBy: voterId}).count() == 0)
    	Questions.update(questionId,{$inc : {'yes':1}, $addToSet: {'votedBy':voterId}});
  },
 
	incrementNoVotes : function(questionId, voterId){
	    //console.log(questionId);
	    //if(voterId )
	    if(Questions.find({_id: questionId, votedBy: voterId}).count() == 0)
	    	Questions.update(questionId,{$inc : {'no':1}, $addToSet: {'votedBy':voterId}});
	},

	getAllowedUsers: function(){
		return allowed_users;
	}
});
