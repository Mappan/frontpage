window.MainView = Backbone.View.extend({

    el: '#tabNavView',

    initialize: function() {

        _.bindAll(this, "render");
        appModel.bind("change:selectedView", this.selectedViewChange,this);
        this.render();
    },

    events: {
        'click li': 'navClick'
    },

selectedViewChange: function(){

    
        var view = appModel.get("selectedView");
        if(view.isBanner)
        {
            $(this.el).fadeIn(400);
            $("#login").fadeIn(400);
        }
        else
        {
            $(this.el).fadeOut(400);
            $("#login").fadeOut(400);
        }
    },


    navClick: function(e){

        appModel.set({nextView:window[$(e.currentTarget).attr("data-slide")+"View"]});
        window.location.hash ="";
        goToByScroll('#app');
    },

    render: function() {


    }

});