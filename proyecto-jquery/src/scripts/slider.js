/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /05-proyecto-html5-css3-javascript-jquery/  ---------------------
    ----------  /src/scripts/  --------------------------------------------------
    ----------  /slider.js  -----------------------------------------------------
    -----------------------------------------------------------------------------
*/



(function ($) {


    console.log('\n');
    console.warn('-----  slider.js  -----');
    
    const $galeria = $('.galeria');

    console.warn('Inicializando bxSlider...');

    if ($galeria.length && $.fn.bxSlider) {

        console.warn('bxSlider iniciado correctamente...');

        //  ----------  plugins bxSlider  ----------
        $galeria.bxSlider({
            // mode: 'horizontal',
            mode: 'fade',
            captions: true,
            slideWidth: 1230,
            responsive: true,
            pager: true
        });

    } 
    
    else 
        console.error('No se encontró .galeria o bxSlider no está disponible');
    

})(jQuery);
