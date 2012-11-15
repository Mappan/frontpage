window.TabNavView = Backbone.View.extend({

    el: '#mainView',

    initialize: function(){

        _.bindAll(this,"render");
        this.render();
    },

    
    render: function(){


        $(this.el).append(safetyView.el);
        $(this.el).append(cloudView.el);
    }

});