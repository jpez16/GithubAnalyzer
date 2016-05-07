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
          $.get("http://localhost:8000/api/publicrepo/?owner=" + username,
          function (data){ 
            $.get("http://localhost:8000/api/personal/?owner=" + username, 
              function (data_personal) {
                console.log(data);
                $('.generating').hide();
                for (var i = 0; i < data.length; i++) {
                  $('.open_source').append('<div class="row"><div class="col-md-12"><h3>'+ 
                    data[i].repo.description + 
                    '</h3></div></div><div class="row"><div class="col-md-4"><h4>Name:' + 
                    data[i].repo.full_name +
                    '</h4></div><div class="col-md-2"><h4>Stars:'
                    + data[i].repo.stargazers_count +
                    '</h4></div><div class="col-md-3"><h4>Forks:'
                    + data[i].repo.forks +
                    '</h4></div><div class="col-md-3"><h4>Percent Contributed:'
                    + data[i].percent +'%</h4></div></div></div><hr>'
                    );
                }
                for (var i = 0; i < data_personal.length; i++) {
                  $('.personal').append('<div class="row"><div class="col-md-12"><h3>'+ 
                    data_personal[i].description + 
                    '</h3></div></div><div class="row"><div class="col-md-4"><h4>Name:' + 
                    data_personal[i].full_name +
                    '</h4></div><div class="col-md-2"><h4>Stars:'
                    + data_personal[i].stargazers_count +
                    '</h4></div><div class="col-md-3"><h4>Forks:'
                    + data_personal[i].forks +
                    '</h4></div><div class="col-md-3"><h4>Percent Contributed:'
                    + data_personal[i].percent +'%</h4></div></div></div><hr>'
                    );
                }
                var _template = _.template($(".report").html(), {});
                _template({data : data, data_personal: data_personal});
                $('.report2').html(_template);
                $('.report2').show();
              });
          });

          
                 
      },
      render: function(){
      
      }
    });
    $(document).ready(new AppView({ 
      el: $('body')
    }));
});
