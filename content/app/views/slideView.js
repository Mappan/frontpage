window.SlideView = Backbone.View.extend({


    isBanner: false,

    initialize: function() {

        _.bindAll(this);

        this.render();
    },

    reset: function(){

        //Hreinsa reyti þegar farið er á milli slide-a
        $("input[type='text']").attr("value","").blur();
        $("input[type='password']").attr("value","").blur();
        clearErrors();
    },

    show:function() {
        $(this.el).show();

        $(this.el).find(".layer").each(function(index){
           $(this).css("left",viewHelper.getRelativeLeft()+parseInt($(this).attr("data-x")));
           $(this).show();
           $(this).delay(parseInt($(this).attr("data-delay"))).animate({left: $(this).attr("data-x")},parseInt($(this).attr("data-speed")),"easeOutCirc");
            $(this).show();
        });


    },

    hide:function() {
        $(this.el).find(".layer").each(function(index){
           $(this).animate({left: viewHelper.getRelativeRight()+parseInt($(this).attr("data-x"))},$(this).attr("data-speed"))
        });
        setTimeout(this.showNext, $(this.el).attr("data-showNext"));
    },

    showNext: function() {
        this.trigger("fadeNextIn");

        

    },

    render: function() {
        $(this.el).hide()
    }

});
