var Workspace = Backbone.Router.extend({

    initialize: function(options) {

        appModel.bind("change:nextView", this.nextViewChange,this);
    },

    routes:{
         "": "mappan",
         "m": "mappan",
         "gleymt": "gleymt",
         "innskraning": "innskraning",
         "stofna": "stofna",
        "skilmalar":"skilmalar"
    },


    mappan: function(){
        if(appModel.get("nextView") == appModel.get("selectedView"))
            appModel.set({nextView:slide1View});
    },

    innskraning: function(){
     appModel.set({nextView:innskraningView});
    },

    stofna: function(){
        appModel.set({nextView:stofnaView});
    },

    skilmalar: function(){
        appModel.set({nextView:skilmalarView});
    },

    gleymt: function(){
        appModel.set({nextView:gleymtView});
    },

    nextViewChange: function(){
      this.swapView(appModel.get("nextView"));
    },

    swapView: function(view){
        if (view != undefined) {
            view.reset();
            var prev = appModel.get("selectedView");
            appModel.set({selectedView: view});
            if (prev != undefined) {
                prev.unbind("fadeNextIn", this.showView);
                prev.bind("fadeNextIn", this.showView, this);
                prev.hide();
            } else {
                view.show();
            }
        }


    },

    showView: function(){
        appModel.get("selectedView").show();

        

    }
});