window.StofnaView = window.SlideView.extend({

    el: '#stofnaSlide',

    
    events: {

        'click #stofnaBtn': 'stofnaClick'
    },



    reset: function() {
        $(this.el).find(".step2").hide();
        $(this.el).find(".step1").show();
    },

    stofnaClick: function() {
        clearErrors();
        
        var kennitala = $(this.el).find(".kennitala").attr("value");

        if(!isValidKennitala(kennitala))
        {
            this.villaKennitala("Kennitala þarf að vera 10 tölustafir");
            return false;
        }
        
        var request = $.ajax({
            url: "service/stofna", 
            type: "POST",
            context: this,
            data: {kennitala : kennitala},
            dataType: "json"
        });

        request.done(function(msg) {
           $(this.el).find(".step1").hide();
           $(this.el).find(".step2").show();
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("náði ekki sambandi við þjónustu")
        });
    },

    villaService: function(message){
         showError($(this.el).find("#stofnaBtn")[0], message);
    },

    villaKennitala: function(message){
        showError($(this.el).find(".kennitala")[0],message);
    }


});