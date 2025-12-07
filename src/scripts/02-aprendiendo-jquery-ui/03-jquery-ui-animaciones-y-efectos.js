/*
    --------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  -------------------------
    ----------  /01-udemy/  --------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  -----------
    ----------  /src/scripts/02-aprendiendo-jquery-ui/  ----------
    ----------  /03-jquery-ui-animaciones-y-efectos.js  ----------
    --------------------------------------------------------------  
*/



(($) => {


    console.log('\n');
    console.warn('-----  03-jquery-ui-animaciones-y-efectos.js  -----');
    console.log('\n');


    /*
        ------------------------------------------------
        ----------  1. Animaciones y Efectos  ----------
        ------------------------------------------------
    */

    /**
     * - seleccionamos el `efecto` a aplicar
     * @type {JQuery<HTMLOptionElement>}
     */

    const $effectSelect = $('#effectSelect');

    /**
     * - seleccionamos el `easing` a aplicar
     * @type {JQuery<HTMLOptionElement>}
     */

    const $easingSelect = $('#easingSelect');

    /**
     * - botón para aplicar el efecto
     * @type {JQuery<HTMLButtonElement>}
     */

    const $btnAplicarEfecto = $('#btnAplicarEfecto');

    /**
     * - caja donde se aplicarán los efectos
     * @type {JQuery<HTMLDivElement>}
     */
    const $cajaEfectos = $('#cajaEfectos');


    //  -------------------------------
    //  ----------  Efectos  ----------
    //  -------------------------------

    //  ----------  Effect  -----------------------------------------------------------------
    //  -----       Highlight    Bounce     Shake   Scale   Explode     fade    drop    -----
    //  -----       Puff         Pulsate    Slide   Blind   Clip        Fold    -------------
    //  -------------------------------------------------------------------------------------

    //  ----------  Easing  -------------------------------------------------------------------------------------------------
    //  -----  linear           swing            easeInQuad          easeOutQuad     easeInOutQuad                      -----
    //  -----  easeInCubic      easeOutCubic     easeInOutCubic      easeInQuart     easeOutQuart      easeInOutQuart   -----  
    //  -----  easeInSine       easeOutSine      easeInOutSine       easeInExpo      easeOutExpo       easeInOutExpo    -----
    //  -----  easeInQuint      easeOutQuint     easeInOutQuint      easeInCirc      easeOutCirc       easeInOutCirc    -----
    //  -----  easeInElastic    easeOutElastic   easeInOutElastic    easeInBack      easeOutBack       easeInOutBack    -----
    //  -----  easeInBounce     easeInOutBounce  easeOutBounce                                                          -----                                                                                  -----
    //-----------------------------------------------------------------------------------------------------------------------


    /**
     * - `función` que se `ejecuta` al `completar el efecto`
     */

    const completeEffect = () => {

        /**
         * - Detectamos si es móvil o no para ajustar el tamaño de la caja
         * @type {boolean}
         */
        const isMobile = window.innerWidth < 768;

        $cajaEfectos.css({
            width: isMobile ? '10rem' : '25rem',
            height: isMobile ? '10rem' : '25rem',
            position: 'absolute',
            top: '20rem',
            left: '50%',
            transform: 'translateX(-50%)'
        });
    }


    $btnAplicarEfecto.on('click', function () {

        /**
         * - `efecto` seleccionado
         * @type {string|undefined}
         */
        const effect = $effectSelect.val();

        /**
         * - `easing` seleccionado
         * @type {string|undefined}
         */
        const easing = $easingSelect.val();

        /**
         * - `texto a mostrar` en la caja de efectos
         * @type {string}
         */
        const texto = `${effect} <br> ${easing}`;

        //  -----  añadimos el texto a la caja de efectos  -----
        $cajaEfectos.html(texto);

        //  -----  Detiene animaciones acumuladas  -----
        $cajaEfectos.stop(true, true);

        //  -----  caso especial para scale  -----
        if (effect === 'scale') {

            $cajaEfectos.effect(
                'scale',
                {
                    percent: 150,        // Escala al 150% (puede ser 50, 200, etc.)
                    duration: 2000,
                    easing: easing,
                    complete: completeEffect
                }
            );

        } else {

            $cajaEfectos.effect(

                //@ts-ignore
                effect,
                {
                    duration: 2000,
                    easing: easing,
                    complete: completeEffect
                }

            );

        }

    });


})(jQuery);

