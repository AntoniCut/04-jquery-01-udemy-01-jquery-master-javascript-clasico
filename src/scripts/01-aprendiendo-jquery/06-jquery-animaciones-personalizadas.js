/*
    ----------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ---------------------------
    ----------  /01-udemy/  ----------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  -------------
    ----------  /src/scripts/01-aprendiendo-jquery/  ---------------
    ----------  /06-jquery-animaciones-personalizadas.js  ----------
    ----------------------------------------------------------------  
*/


(($) => {


    console.log('\n');
    console.warn('-----  06-jquery-animaciones-personalizadas.js  -----');
    console.log('\n');


    //  -----  Referencias al HTML  -----

    /**
    * - `Caja` a la que se le aplicarán los efectos jQuery.
    * @type {JQuery<HTMLDivElement>}
    */
    const $caja = $('#caja');

    /**
     * - `Botón` para iniciar la `Animación`
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnAnimame = $('#btnAnimame');


    $btnAnimame.on('click', function () {


        /**
         * - Ancho del viewport (ventana del navegador). 
         * @type {number} */
        const viewportWidth = $(window).width() ?? 0; // Si width() es undefined, usamos 0

        if (viewportWidth < 768) {
            
            //  -----  Animación para móviles  -----
            console.log('Animación para móviles');
            
            $caja
                
                .animate({
                    marginLeft: '15rem',
                    fontSize: '1rem',
                    height: '3.5rem'
                }, 3000)
                
                .animate({
                    borderRadius: '300px',
                    height: '7rem',
                    marginTop: '10rem',
                    fontSize: '1.6rem'
                }, 'slow')
                
                .animate({
                    borderRadius: '0px',
                    marginLeft: '1rem'
                }, 3000)
                
                .animate({
                    borderRadius: '0px',
                    marginTop: '20px',
                    height: '3.5rem',
                    fontSize: '1rem'
                }, 'slow', 
                
                    function () {
                        setTimeout(() => alert('Animación terminada en Tablet y Móvil'), 500);
                    });

        } else {
            
            //  -----  Animación para escritorio  -----
            console.log('Animación para escritorio');
            
            $caja
                
                .animate({
                    marginLeft: '50rem',
                    fontSize: '4rem',
                    height: '11rem'
                }, 5000)
                
                .animate({
                    borderRadius: '900px',
                    marginTop: '12rem',
                }, 'slow')
                
                .animate({
                    borderRadius: '0px',
                    marginLeft: '5rem'
                }, 5000)
                
                .animate({
                    borderRadius: '0px',
                    marginTop: '2rem',
                    height: '5rem',
                    fontSize: '1.6rem'
                }, 'slow', 
                
                    function () {
                        setTimeout(() => alert('Animación terminada en Escritorio'), 1000);
                    });
        }

    });


})(jQuery);
