 $(document).ready(function(){
        
    /**
      * Add event to the "Sign Up" button
    */
     $( '#signUpUser' ).on( "click", function() {
        $( '#optionFormUser' ).removeClass("bounceRight");
        $( '#optionFormUser' ).addClass("bounceLeft");
    });

    /**
     * Add event  to the "Login" button
    */
    $( '#loginUser' ).on( "click", function() {
        $( '#optionFormUser' ).removeClass("bounceLeft");
        $( '#optionFormUser' ).addClass("bounceRight");
    });

});