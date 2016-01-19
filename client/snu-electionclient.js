Template.addquestion.events({
    'click #add-question' : function(event){
    	//console.log("FUKING HIERE")
        event.preventDefault();
        var questionText = document.getElementById("questionText").value;
        Meteor.call("addQuestion",questionText,function(error , questionId){
          console.log('added question with Id .. '+questionId);
        });
        document.getElementById("questionText").value = "";
 
    }
});

Questions = new Meteor.Collection("questions");
 
Template.questions.items = function(){
    return Questions.find({},{sort:{'yes':-1, 'no':1}});
};

Template.question.events({
 
    'click': function () {
        Session.set("selected_question", this._id);
    },
 
    'click a.yes' : function (event) {
      event.preventDefault();
      if(Meteor.userId()){
        var questionId = Session.get('selected_question');
        console.log('updating yes count for questionId '+questionId);
        Meteor.call("incrementYesVotes",questionId, Meteor.userId());
 
      }
    },
 
    'click a.no': function(){
      event.preventDefault();
      if(Meteor.userId()){
        var questionId = Session.get('selected_question');
        console.log('updating no count for questionId '+questionId);
        Meteor.call("incrementNoVotes",questionId, Meteor.userId());
      }
    }
 });