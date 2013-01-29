window.SkilmalarView = window.SlideView.extend({

    el: '#skilmalarSlide',

    events: {

        'click #samthykkjaBtn': 'samthykkjaClick',
        'click #komidBtn':'komidClick'
    },

    errors: {
        1008 : 'Skráning tókst ekki. Vinsamlegast reynið síðar.',
        1031 : 'Netfang er ekki rétt.'
    },

    reset: function() {
        $(this.el).find(".step2").hide();
        $(this.el).find(".step1").show();
    },

    samthykkjaClick: function() {
        $(this.el).find(".step1").hide();
        $(this.el).find(".step2").show();
    },

    komidClick: function() {
        clearErrors();
        var email = $(this.el).find("#netfang_komid").attr("value");
        var skilabod = $(this.el).find("#skilabod_cb")[0].checked;
        var action = "acceptTC";
        if (!this.validateEmail(email) && email.length > 0) {
            this.villaEmail("Netfang ekki rétt skráð");
            return false;
        }
        
        var request = $.ajax({
            url: "/mappan/RegisterUser",
            type: "POST",
            data: {email : email, emailNotify : skilabod, action : action},
            context: this,
            dataType: "json"
        });

        request.done(function(msg) {
        	var num = msg.returnCode;
        	var desc = msg.description;
            if (num == 1000)
     			this.signOnRegistration();
            else if ((num > 1030) && (num < 1040))
            	this.villaEmail(this.errors[num]);
            else
                this.villaService(this.errors[num]);
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("náði ekki sambandi við þjónustu");
        });
    },
    
	  signOnRegistration: function() {
        var signOnType = "registration";
        
        var request = $.ajax({
            url: "/mappan/SignInMappan",
            type: "POST",
            data: {signOnType : signOnType},
            context: this,
            dataType: "json"
        });

        request.done(function(msg) {
        	var num = msg.returnCode;
        	var desc = msg.description;
            if (num == 1000)
                window.location.href = msg.redirectUrl;
            else
                this.villaService(desc);
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("náði ekki sambandi við þjónustu");
        });
    },
  
	
    villaService: function(message){
        showError($(this.el).find("#komidBtn")[0], message);
    },

    villaEmail: function(message) {
        showError($(this.el).find("#netfang_komid")[0], message);
    },

    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return( re.test(email));
    }

});