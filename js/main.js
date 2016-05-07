$.getScript("lib/backbone.js", function(){    

    var AppView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML
      //      content will be rendered.
      // It's the first function called when this view it's instantiated.
      initialize: function(){
        this.render($('#test'));
      },
      // $el - it's a cached jQuery object (el), in which you can use jQuery functions
      //       to push content. Like the Hello World in this case.
      render: function($el){
        console.log($el);
        //$el.html("good to go yo");
      }
    });
    $(document).ready(new AppView());
});
