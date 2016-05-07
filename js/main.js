$.getScript("lib/backbone.js", function(){    

    var AppView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML
      //      content will be rendered.
      // It's the first function called when this view it's instantiated.
      events : {
        'click .get-user' : 'findUser' 
      },
      findUser : function () {          
          var _json = $.get("http://localhost:8000/api/code/?owner=" + $('.account_input').val(),
          
          //success callback 
          function (data){
          //render shit
          console.log(_json);
          debugger;
          $('.swag').html(_json.responseJSON.blog);
          
          })
          //fail callback
          .fail(function(err) {
            console.log(err)
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
