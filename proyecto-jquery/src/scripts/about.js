/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /05-proyecto-html5-css3-javascript-jquery/  ---------------------
    ----------  /src/scripts/  --------------------------------------------------
    ----------  /about.js  ------------------------------------------------------
    -----------------------------------------------------------------------------
*/



(function ($) {

    console.log('\n');
    console.warn('-----  about.js -----');
    console.log('\n');


    //  -----  referencias al HTML  -----
    const $acordeon = $('#acordeon');
    

    //  -----  acordeon  -----
    $acordeon.accordion({
        collapsible: true,
        heightStyle: "content"
    });
    

})(jQuery);
