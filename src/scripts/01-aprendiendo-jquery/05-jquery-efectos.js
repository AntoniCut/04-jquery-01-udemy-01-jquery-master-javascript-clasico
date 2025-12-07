/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/scripts/01-aprendiendo-jquery/  ------------
    ----------  /05-jquery-efectos.js  --------------------------
    -------------------------------------------------------------  
*/


(($) => {

    console.log('\n');
    console.warn('-----  05-jquery-efectos.js  -----');


    //  -----  Referencias al HTML  -----

    /**
     * - `Caja` a la que se le aplicarán los efectos jQuery.
     * @type {JQuery<HTMLDivElement>}
     */
    const $caja = $('#caja');


    //  -----  Botones de efectos - Show - Hide - Toggle  -----

    /**
     * - `Botón` de Mostrar la `caja`
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnShow = $("#btnShow");
    
    /**
     * - `Botón` de Ocultar la `caja`
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnHide = $("#btnHide");
    
    /**
     * - `Botón` de Alternar la visibilidad de la `caja`
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnToggle = $("#btnToggle");


    //  -----  Botones de efectos - Fade In - Fade Out - Fade Toggle  -----

    /**
     * - `Botón`de efecto de `fade In` (aparecer)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnFadeIn = $("#btnFadeIn");
    
    /**
     * - `Botón`de efecto de `fade Out` (desvanecer)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnFadeOut = $("#btnFadeOut");
    
    /**
     * - `Botón`de efecto de `fade Toggle` (alternar desvanecimiento)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnFadeToggle = $("#btnFadeToggle");


    //  -----  Botones de efectos - Fade To (opacidad)  -----

    /**
     * - `Botón`de efecto de `fade To` (opacidad 0.3)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnFadeTo1 = $("#btnFadeTo1");

    /**
     * - `Botón`de efecto de `fade To` (opacidad 0.7)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnFadeTo2 = $("#btnFadeTo2");

    /**
     * - `Botón`de efecto de `fade To` (opacidad 1)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnFadeTo3 = $("#btnFadeTo3");


    //  -----  Botones de efectos - Slide Down - Slide Up - Slide Toggle  -----
    
    /**
     * - `Botón`de efecto de `slide Down` (deslizar hacia abajo)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnSlideDown = $("#btnSlideDown");

    /**
     * - `Botón`de efecto de `slide Up` (deslizar hacia arriba)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnSlideUp = $("#btnSlideUp");

    /**
     * - `Botón`de efecto de `slide Toggle` (alternar deslizar)
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnSlideToggle = $("#btnSlideToggle");

    
    /*  
        ----------------------------
        -----  Estado inicial  -----
        ----------------------------
    */

    $btnShow.hide();
    $btnFadeIn.hide();
    $btnSlideDown.hide();
    $btnFadeTo3.hide();


    //  -----  Función común para actualizar los botones según visibilidad  -----
    function actualizarBotones() {

        /**
         * - Estado de visibilidad de la `caja`
         * @type {boolean}
         */
        const visible = $caja.is(':visible');

        //  -----  show / hide  -----
        $btnShow.toggle(!visible);
        $btnHide.toggle(visible);

        // -----  fade  -----
        $btnFadeIn.toggle(!visible);
        $btnFadeOut.toggle(visible);

        //  -----  slide  -----
        $btnSlideDown.toggle(!visible);
        $btnSlideUp.toggle(visible);

        //  -----  toggle siempre visible  -----
        $btnToggle.show();
        $btnFadeToggle.show();
        $btnSlideToggle.show();

    }


    /*  
        ---------------------
        -----  Efectos  -----
        ---------------------
    */

    // ----- SHOW -----
    $btnShow.on('click', function () {
        $caja.show(3000, actualizarBotones);
    });

    // ----- HIDE -----
    $btnHide.on('click', function () {
        $caja.hide(3000, actualizarBotones);
    });

    // ----- TOGGLE -----
    $btnToggle.on('click', function () {
        $caja.toggle(3000, actualizarBotones);
    });

    // ----- FADE IN -----
    $btnFadeIn.on('click', function () {
        $caja.fadeIn(3000, actualizarBotones);
    });

    // ----- FADE OUT -----
    $btnFadeOut.on('click', function () {
        $caja.fadeOut(3000, actualizarBotones);
    });

    // ----- FADE TOGGLE -----
    $btnFadeToggle.on('click', function () {
        $caja.fadeToggle(3000, actualizarBotones);
    });

    // ----- FADE TO (opacidad) -----
    $btnFadeTo1.on('click', function () {
        $caja.fadeTo(3000, 0.3);
        $btnFadeTo1.hide();
        $btnFadeTo2.show();
        $btnFadeTo3.show();
    });

    $btnFadeTo2.on('click', function () {
        $caja.fadeTo(3000, 0.7);
        $btnFadeTo2.hide();
        $btnFadeTo1.show();
        $btnFadeTo3.show();
    });

    $btnFadeTo3.on('click', function () {
        $caja.fadeTo(3000, 1);
        $btnFadeTo3.hide();
        $btnFadeTo1.show();
        $btnFadeTo2.show();
    });

    // ----- SLIDE DOWN -----
    $btnSlideDown.on('click', function () {
        $caja.slideDown(3000, actualizarBotones);
    });

    // ----- SLIDE UP -----
    $btnSlideUp.on('click', function () {
        $caja.slideUp(3000, actualizarBotones);
    });

    // ----- SLIDE TOGGLE -----
    $btnSlideToggle.on('click', function () {
        $caja.slideToggle(3000, actualizarBotones);
    });


})(jQuery);
