window.MainView = Backbone.View.extend({

    el: '#tabNavView',
    slideIntervalId: 0,
    selected_slide_index: 0,
    focus: true,
    back_to_front:false,

    initialize: function() {

        _.bindAll(this);
        appModel.bind("change:selectedView", this.selectedViewChange, this);
        this.slides = $(this.el).find("a");
        this.render();
    },

    events: {
        'click a': 'navClick'
    },

    selectedViewChange: function() {


        var view = appModel.get("selectedView");
        if (view.isBanner) {
            $("a").removeClass("selected");
            this.selected_slide_index = $(view.el).index();
            $(this.slides[this.selected_slide_index ]).addClass("selected");
            
            if (this.back_to_front) {
                $(this.el).fadeIn(400);
                $("#login").fadeIn(400);
                this.focus = true;
                this.startSlide();
                this.back_to_front = false;
            }
        }
        else {
            $(this.el).fadeOut(400);
            $("#login").fadeOut(400);
            this.stopSlide();
            this.back_to_front = true;
        }
    },


    navClick: function(e) {

        this.showSlide($(e.currentTarget).attr("data-slide"));
        this.stopSlide();
        window.goToByScroll('#app');
    },

    startSlide: function () {

        clearTimeout(this.slideIntervalId);
        this.slideIntervalId = setTimeout(this.gotoNextSlide, 10000);

    },

    stopSlide: function () {
        clearTimeout(this.slideIntervalId);
    },

    gotoNextSlide: function () {


        if (this.selected_slide_index < this.slides.length - 1) {
            this.selected_slide_index++;
        } else {
            this.selected_slide_index = 0;
        }
        this.showSlide($(this.slides[this.selected_slide_index]).attr("data-slide"));
        this.startSlide();
    },

    showSlide:function(slide) {

        appModel.set({nextView:window[slide + "View"]});
    },


    render: function() {
        this.startSlide();

    }

});