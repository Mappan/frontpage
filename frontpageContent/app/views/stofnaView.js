window.StofnaView = window.SlideView.extend({

    el: '#stofnaSlide',

    
    events: {

        'click #stofnaBtn': 'stofnaClick',
        'keypress input': 'updateOnEnter',
        'click #stofnaSkilrikiBtn' : 'skilrikiClick'
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

    reset: function() {
        $(this.el).find(".step2").hide();
        $(this.el).find(".step1").show();
    },

    stofnaClick: function() {
        clearErrors();
        this.disableCreateButton();
        
        var kennitala = ($(this.el).find(".kennitala").attr("value")).replace("-", "");

        if(!isValidKennitala(kennitala))
        {
            this.villaKennitala("Kennitalan er ekki rétt");
            this.enableCreateButton();
            return false;
        }
        
        var request = $.ajax({
            url: "MappanService/json/register/createAccount/" + kennitala,
            type: "POST",
            context: this,
            //data: {kennitala : kennitala},
            dataType: "json"
        });

        request.done(function(msg) {
        	var num = msg.returnCode;
        	var desc = msg.description;
        	if (num == 3000) { // success
                $(this.el).find(".step1").hide();
                $(this.el).find(".step2").show();
            }
            else if ((num > 3010) && (num < 3020))
                this.villaKennitala(desc);
            else
                this.villaService(desc);
        	
        	this.enableCreateButton();
        });

        request.fail(function(jqXHR, textStatus) {
            this.villaService("náði ekki sambandi við þjónustu");
            this.enableCreateButton();
        });
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.stofnaClick();
    },

    villaService: function(message){
         showError($(this.el).find("#stofnaBtn")[0], message);
    },

    villaKennitala: function(message){
        showError($(this.el).find(".kennitala")[0],message);
    },
    
    disableCreateButton: function() {
        $("#stofnaBtn").attr("value", "Sendi...");
        $("#stofnaBtn").attr("disabled", "true");
    },
    
    enableCreateButton: function() {
    	$("#stofnaBtn").attr("value", "Stofna aðgang");
    	$("#stofnaBtn").removeAttr("disabled");
    }
});