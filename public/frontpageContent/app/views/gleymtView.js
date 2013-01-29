window.GleymtView = window.SlideView.extend({

    el: '#gleymtSlide',

    events: {

        'click #gleymtBtn': 'gleymtClick',
        'keypress input': 'updateOnEnter'
    },

    errors: {
        5009 : 'Ekki tókst að endurstilla lykilorði. Vinsamlegast reynið síðar.',
        5011 : 'Notandi ekki til. Vinsamlegast veldu <a href="#stofna">Stofna aðgang.</a>',
        3013 : 'Ógild kennitala.'
    },

    reset: function() {
        $(this.el).find(".step2").hide();
        $(this.el).find(".step1").show();
    },

    gleymtClick: function() {
        clearErrors();
        this.disableForgotButton();
        
        var kennitala = ($(this.el).find(".kennitala").attr("value")).replace("-", "");

        if (!isValidKennitala(kennitala)) {
            this.villaKennitala("Kennitalan er ekki rétt");
            this.enableForgotButton();
            return false;
        }


        var request = $.ajax({
            url: "MappanService/json/register/resetPassword/" + kennitala,
            type: "POST",
            context: this,
            //data: {kennitala : kennitala},
            dataType: "json"
        });

        request.done(function(msg) {
        	var num = msg.returnCode;
        	var desc = msg.description;
            if (num == 5000) { // success
            	$(this.el).find(".date").text(msg.description);
                $(this.el).find(".step1").hide();
                $(this.el).find(".step2").show();
            }
            else if ((num > 5010) && (num < 5020))
                this.villaKennitala(this.errors[num]);
            else
                this.villaService(this.errors[num]);
            
            this.enableForgotButton();
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("náði ekki sambandi við þjónustu");
            this.enableForgotButton();
        });
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.gleymtClick();
    },

    villaService: function(message){
         showError($(this.el).find("#gleymtBtn")[0], message);
    },

    villaKennitala: function(message) {
        showError($(this.el).find(".kennitala")[0], message);
    },
    
    disableForgotButton: function() {
        $("#gleymtBtn").attr("value", "Sendi...");
        $("#gleymtBtn").attr("disabled", "true");
    },
    
    enableForgotButton: function() {
    	$("#gleymtBtn").attr("value", "Fá nýtt lykilorð");
    	$("#gleymtBtn").removeAttr("disabled");
    }
});