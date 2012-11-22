window.InnskraningView = window.SlideView.extend({


    el: '#innskraningSlide',

    events: {

        'click #innskraningBtn': 'innskraningClick',
        'keypress input': 'updateOnEnter',
        'click #innskraningSkilrikiBtn' : 'skilrikiClick'
    },
    
    skilrikiClick: function() {
    	
    	var request = $.ajax({
            url: "/mappan/SignInRS/SignInRS",
            type: "POST",
            context: this,
            dataType: "json"
        });
    	
    	request.done(function(msg) {
        	var num = msg.returnCode;
        	var desc = msg.description;
			
            if (num == 1000) // successful login
                window.location.href = msg.redirectUrl;
            else if (num == 1100)
                window.location.hash = "skilmalar";
            else
                window.location.href = "/servererror/error/403.html"
            
        });

        request.fail(function(jqXHR, textStatus) {
            window.location.href = "/servererror/error/403.html"
        });
    },

    innskraningClick: function() {

        clearErrors();
        
        var kennitala = ($(this.el).find(".kennitala").attr("value")).replace("-", "");
        var lykilord = $(this.el).find(".lykilord").attr("value");
		var signOnType = "normal";
        var whiteSpace = /(\s)/;
        var nonAscii = /[^\u0000-\u0080]+/;
        this.disableLoginButton();

        if (!isValidKennitala(kennitala)) {
            this.villaKennitala("Kennitalan er ekki rétt");
            this.enableLoginButton();
            return false;
        }

        if(lykilord.length < 1){
            this.villaLykilord("Gleymdir að slá inn lykilorð");
            this.enableLoginButton();
            return false;
        }        

        if(lykilord.match(whiteSpace) || (lykilord.match(nonAscii))) {
            this.villaLykilord("Leyfilegir stafir eru: a-z, A-Z, 0-9, og algeng greinarmerki.")
            this.enableLoginButton();
            return false;
        }

        var request = $.ajax({
            url: "/mappan/SignInMappan",
            type: "POST",
            context: this,
            data: {ssn : kennitala, password : lykilord, signOnType:signOnType},
            dataType: "json"
        });

        request.done(function(msg) {
        	var num = msg.returnCode;
        	var desc = msg.description;
			
            if (num == 1000) // successful login
                window.location.href = msg.redirectUrl;
            else if (num == 1100)
                window.location.hash = "skilmalar";
            else if ((num > 1010) && (num < 1020))
                this.villaKennitala(desc);
            else if ((num > 1020) && (num < 1030))
                this.villaLykilord(desc);
            else
                this.villaService(desc);
            
            this.enableLoginButton();
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("náði ekki sambandi við þjónustu");
            this.enableLoginButton();
        });
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.innskraningClick();
    },

    villaService: function(message){
         showError($(this.el).find("#innskraningBtn")[0], message);
    },

    villaKennitala: function(message) {
        showError($(this.el).find(".kennitala")[0], message);
    },

    villaLykilord: function(message) {
        showError($(this.el).find(".lykilord")[0], message);
    },
    
    disableLoginButton: function() {
        $("#innskraningBtn").attr("value", "Tengist...");
        $("#innskraningBtn").attr("disabled", "true");
    },
    
    enableLoginButton: function() {
    	$("#innskraningBtn").attr("value", "Tengjast");
    	$("#innskraningBtn").removeAttr("disabled");
    }
});