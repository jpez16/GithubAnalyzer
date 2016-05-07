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
          $('.form-group').hide();
          $('.lead').hide();
          $('.generating').html("<br><i class='fa fa-refresh fa-spin fa-5x fa-fw margin-bottom'></i><br><h2 style='color:white'>Generating</h2>");
          $.get("http://localhost:8000/api/code/?owner=" + username,
          function (data){
              setTimeout(function(){
              console.log(data);
              $('.generating').hide(); 
              var result = JSON.parse(data);
              var template = _.template( $(".report").html(), {
                result : result 
              } );
              this.$('.report').html( template );
              $('.report').fadeIn();
              }, 2000);
          })
          .fail(function(err) { 
          });
                 
      },
      // $el - it's a cached jQuery object (el), in which you can use jQuery functions
      //       to push content. Like the Hello World in this case.
      render: function(){
      
              }
    });
    $(document).ready(new AppView({ 
      el: $('body')
    }));
});
