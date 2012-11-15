window.InnskraningView = window.SlideView.extend({


    el: '#innskraningSlide',

    events: {

        'click #innskraningBtn': 'innskraningClick'
    },


    innskraningClick: function() {

        clearErrors();
        
        var kennitala = $(this.el).find(".kennitala").attr("value");
        var lykilord = $(this.el).find(".lykilord").attr("value");

        if (!isValidKennitala(kennitala)) {
            this.villaKennitala("Kennitala þarf að vera 10 tölustafir");
            return false;
        }

        if(lykilord.length < 1){
            this.villaLykilord("Gleymdir að slá inn lykilorð");
            return false;
        }

        var request = $.ajax({
            url: "../SignInMappan",
            type: "POST",
            context: this,
            data: {ssn : kennitala, password : lykilord},
            dataType: "json"
        });

        request.done(function(msg) {
            if (msg.number == 0000) // successful login
                window.location.href = "Mappan.html";
            else
                this.villaKennitala("Kennitala ekki skráð");
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("service fail");
        });
    },

    villaService: function(message){
         showError($(this.el).find("#innskraningBtn")[0], message);
    },

    villaKennitala: function(message) {
        showError($(this.el).find(".kennitala")[0], message);
    },

    villaLykilord: function(message) {
        showError($(this.el).find(".lykilord")[0], message);
    }
});