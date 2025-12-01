/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /05-proyecto-html5-css3-javascript-jquery/  ---------------------
    ----------  /src/scripts/  --------------------------------------------------
    ----------  /reloj.js  ------------------------------------------------------
    -----------------------------------------------------------------------------
*/



(function ($) {

    console.log('\n');
    console.warn('-----  reloj.js -----');
    console.log('\n');


    //  -----  referencias al HTML  -----
    const $reloj = $('#reloj');

    //  -----  reloj  -----
    setInterval(function () {

        const reloj = moment().format('HH:mm:ss');
        //console.log('reloj => ', reloj);

        $reloj.html(reloj);

    }, 1000);


})(jQuery);
