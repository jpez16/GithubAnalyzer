$.getScript("lib/backbone.js", function(){    

    var AppView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML
      //      content will be rendered.
      // It's the first function called when this view it's instantiated.
      events : {
        'click .get-user' : 'findUser' 
      },
      findUser : function () {
          var username = $('.account_input').val();
          $('.form-group').html("<i class='fa fa-refresh fa-spin fa-5x fa-fw margin-bottom'></i><br><h2>Generating</h2>");
          $.get("http://localhost:8000/api/code/?owner=" + username,
          function (data){
            console.log(data); 
            //REPLACE .FORM-GROUP WITH ANALYSIS
          })
          .fail(function(err) { 
          });
                 
      },
      // $el - it's a cached jQuery object (el), in which you can use jQuery functions
      //       to push content. Like the Hello World in this case.
      render: function(){
                debugger;
        //$el.html("good to go yo");
      }
    });
    $(document).ready(new AppView({ 
      el: $('.enter-user')
    }));
});
