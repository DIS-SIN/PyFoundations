$(function() {
    var synth = window.speechSynthesis;
    var pitchValue = 1;
    var rateValue = 1.3; // cross browser note, this isn't consistent across them. This might be too fast, consider user settable

    var speak_back = function(inputTxt){
        try {
            if (synth.speaking) {
                console.error('speechSynthesis.speaking');
                return;
            }
            if (inputTxt !== '') {
                var utterThis = new SpeechSynthesisUtterance(inputTxt);
                utterThis.pitch = pitchValue;
                utterThis.rate = rateValue;
                synth.speak(utterThis);
            }
        } catch(error) {
            // do nothing, not all pyfoundationss squeak
        }
    };
    
    var pyfoundations_speak = function() {
        if($('#pyfoundations_spoken').length) { 
            speak_back( $('#pyfoundations_spoken').text() );
        } else {
            speak_back( "pyfoundations ready!" );
        }
    };

    var pyfoundations_dont_speak = function() { // no doubt: i know what you're thinking, I don't need your reasons
        synth.cancel();
    };
    pyfoundations_speak();

    var clear_text = function() {
        $("#transcript").val('');
        $("#pyfoundations_console").html('');
        $("#pyfoundations_return").html('');
        $("#q_asked").html('pyfoundations Ready!');
    };

    var send_speech_text = function() {
        document.getElementById('pyfoundationsfrm').submit();
    };

    var recognition_lang = "en-US";
    var recognition_lang_tlxd = "enabled";
    var set_recog_notlx = function() {
        recognition_lang_tlxd = "disabled";
        $("#recognition_lang_tlxd").val(recognition_lang_tlxd);
        var rl = $("#recognition_language").val();
        if(recognition_lang == "en-US") {
            rl = "pyfoundations is listening in English: " + ($("#recognition_language").val()) + " | " + "Auto-translate: " + "<span class='mif-blocked'></span>";
        }
        if(recognition_lang == "fr-CA"){
            rl = "pyfoundations écoute Français: " + ($("#recognition_language").val()) + " | " + "Traduire automatiquement: " + "<span class='mif-blocked'></span>";
        }
        $("#pyfoundations_listening_for").html( rl + "<br><small>[Note: This is a note]</small>");
    };

    var set_recog_yestlx = function() {
        recognition_lang_tlxd = "enabled";
        $("#recognition_lang_tlxd").val(recognition_lang_tlxd);
        var rl = $("#recognition_language").val();
        if(recognition_lang == "en-US") {
            rl = "pyfoundations is listening in English: " + ($("#recognition_language").val()) + " | " + "Auto-translate: " + "<span class='mif-checkmark'></span>";
        }
        if(recognition_lang == "fr-CA"){
            rl = "pyfoundations écoute Français: " + ($("#recognition_language").val()) + " | " + "Traduire automatiquement: " + "<span class='mif-checkmark'></span>";
        }
        $("#pyfoundations_listening_for").html( rl  + "<br><small>[Note: This is a note]</small>");
    };
    var set_recog_en = function() {
        recognition_lang = "en-US";
        recognition_lang_tlxd = "enabled";
        $("#recognition_lang_tlxd").val(recognition_lang);
        $("#recognition_language").val(recognition_lang);
        $("#pyfoundations_listening_for").html( "pyfoundations is listening in English: " + ($("#recognition_language").val()) +  " | " + "Auto-translate: " +"<span class='mif-checkmark'></span>"  + "<br><small>[Note: This is a note]</small>");
    };
    var set_recog_fr = function() {
        recognition_lang = "fr-CA";
        recognition_lang_tlxd = "enabled";
        $("#recognition_lang_tlxd").val(recognition_lang);
        $("#recognition_language").val(recognition_lang);
        $("#pyfoundations_listening_for").html( "pyfoundations écoute Français: " + ($("#recognition_language").val()) +  " | " + "Traduire automatiquement: " +"<span class='mif-checkmark'></span>"  + "<br><small>[Note: This is a note]</small>");
    };
    var recognize_speech = function() {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = recognition_lang;
            recognition.start();

            recognition.onresult = function(e) {
                document.getElementById('transcript').value = e.results[0][0].transcript; // consider ca-na-da-dot-see-eh here
                recognition.stop();
                document.getElementById('pyfoundationsfrm').submit();
            };

            recognition.onerror = function(e) {
                recognition.stop();
            }
        } else {
            $("#result_set").html("<div class='remark alert'><p><strong>pyfoundations is sorry...</strong> This page uses experimental voice recognition APIs.</p><p>It appears this browser doesnt support speech recognition. You might have more luck with <a href='https://www.google.com/chrome'>Chrome</a> or <a href='https://www.mozilla.org/firefox'>Firefox</a></p></div>");
        }
    };

    var pyfoundations_help_box = function() {
        $("#pyfoundations_help").show();
        help_guide_toggle_gi();
    };
    var pyfoundations_help_box_dismiss = function() {
        $("#pyfoundations_help").hide();
    };

    var pyfoundations_console_display = function() {
        $("#pyfoundations_console").toggle();
    };
    
    var help_guide_toggle = function(panel) {
        $(".help_guide").hide();
        $("#"+panel).toggle();
    };
    var help_guide_toggle_gi = function(panel) { help_guide_toggle('help_guide_gi'); }
    $("#b_help_guide_gi").on("click", help_guide_toggle_gi );
    var help_guide_toggle_sw = function(panel) { help_guide_toggle('help_guide_sw'); }
    $("#b_help_guide_sw").on("click", help_guide_toggle_sw );
    var help_guide_toggle_ex = function(panel) { help_guide_toggle('help_guide_ex'); }
    $("#b_help_guide_ex").on("click", help_guide_toggle_ex );
    var help_guide_toggle_lm = function(panel) { help_guide_toggle('help_guide_lm'); }
    $("#b_help_guide_lm").on("click", help_guide_toggle_lm );

    $("#speech_icon_en").on("click", set_recog_en);
    $("#speech_icon_fr").on("click", set_recog_fr);
    $("#speech_icon_no_tlx").on("click", set_recog_notlx);
    $("#speech_icon_yes_tlx").on("click", set_recog_yestlx);
    $("#pyfoundations_help_open").on("click", pyfoundations_help_box);
    $("#pyfoundations_help_dismiss").on("click", pyfoundations_help_box_dismiss );

    $("#speech_icon").on("click", recognize_speech);
    $("#send_text").on("click", send_speech_text);
    $("#clear_text").on("click", clear_text);
    $("#talk_back").on("click", pyfoundations_speak);
    $("#dont_talk_back").on("click", pyfoundations_dont_speak);
    $("#toggle_pyfoundations_console").on("click", pyfoundations_console_display)
});


