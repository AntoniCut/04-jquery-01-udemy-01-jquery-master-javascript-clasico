/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/scripts/01-aprendiendo-jquery/  ------------
    ----------  /03-jquery-eventos.js  --------------------------
    -------------------------------------------------------------  
*/



(($) => {

    console.log('\n');
    console.warn('-----  03-jquery-eventos.js  -----');
    console.log('\n');


    /*
        -----------------------------------------------
        ----------  1. Mouseover y Mouseout  ----------
        -----------------------------------------------
    */

    //  -----  referencias al HTML  -----
    const $caja1 = $('#caja1');
    const texto1 = $caja1.text();


    //  -----  evento 'mouseover'  -----
    $caja1

        .on('mouseover', function () {

            const $this = $(this);

            $this
                .css({
                    color: 'white',
                    backgroundColor: 'red'
                })
                .text(texto1 + ' - evento mouseover')
        })


        //  -----  evento 'mouseout'  -----
        .on('mouseout', function () {

            const $this = $(this);

            $this
                .css({
                    color: 'black',
                    backgroundColor: 'yellow'
                })
                .text(texto1 + ' - evento mouseout')

        });


    /*
        --------------------------------
        ----------  2. Hover  ----------
        --------------------------------
    */

    //  -----  referencias al HTML  -----
    const $caja2 = $('#caja2');
    const texto2 = $caja2.text();


    //  -----  evento 'hover' en desuso  -----
    //  -----  se recomienda usar 'mouseenter' y 'mouseleave'  -----
    $caja2

        .on('mouseenter', function () {

            const $this = $(this);

            $this
                .css({
                    color: 'white',
                    backgroundColor: 'red'
                })
                .text(texto2 + ' - evento over')
        })

        .on('mouseleave', function () {

            const $this = $(this);

            $this
                .css({
                    color: 'black',
                    backgroundColor: 'yellow'
                })
                .text(texto2 + ' - evento out')
        });



    /*
        ----------------------------------------------
        ----------  3. Click y Doble Click  ----------
        ----------------------------------------------
    */

    //  -----  referencias al HTML  -----
    const $caja3 = $('#caja3');
    const texto3 = $caja3.text();


    //  -----  evento 'click'  -----
    $caja3

        .on('click', function () {

            const $this = $(this);

            $this
                .css({
                    color: 'white',
                    backgroundColor: 'red'
                })
                .text(texto3 + ' - evento click')
        })


        //  -----  evento 'dblclick'  -----
        .on('dblclick', function () {

            const $this = $(this);

            $this
                .css({
                    color: 'white',
                    backgroundColor: 'blue'
                })
                .text(texto3 + ' - evento dobleclick')
        });



    /*
        ---------------------------------------
        ----------  4. Blur y Focus  ----------
        ---------------------------------------
    */

    //  -----  referencias al HTML  -----
    const $nombre1 = $('#nombre1');
    const $datos1 = $('#datos1');


    //  -----  evento 'focus'  -----
    $nombre1

        .on('focus', function () {

            const $this = $(this);
            $this.css("border", "10px solid red");
        })


        //  -----  evento 'blur'  -----
        .on('blur', function () {

            const $this = $(this);
            $this.css("border", "10px solid #ccc");

            const value = $this.val();
            
            // Convertimos a texto seguro para mostrarlo
            const textValue = Array.isArray(value)
                ? value.join(', ')       // si es array → lo unimos
                : value !== undefined
                    ? String(value)      // si es string o number → lo convertimos
                    : '';                // si es undefined → cadena vacía

            $datos1
                .text(textValue)
                .show();
                
        });



    /*
       ----------------------------------------------
       ----------  5. Mousedown y MouseUp  ----------
       ----------------------------------------------
   */

    //  -----  referencias al HTML  -----
    const $nombre2 = $('#nombre2');

    //  -----  evento 'mousedown'  -----
    $nombre2.on('mousedown', function () {

        const $this = $(this);

        $this
            .val('Pulsado tecla ratón')
            .css("border-color", "green");
    });


    //  -----  evento 'mouseup'  -----
    $nombre2.on('mouseup', function () {

        const $this = $(this);

        $this
            .val('Soltada tecla ratón')
            .css("border-color", "gray");
    });



    /*
        ------------------------------------
        ----------  6. Mousemove  ----------
        ------------------------------------
    */

    //  -----  referencias al HTML  -----
    const $btnActive = $('#btnActive');
    const $document = $(document);
    const $layout = $('#layout');
    const $sigueme = $('#sigueme');

    $btnActive.on('click', function () {

        $document.on('mousemove', function (event) {

            $sigueme.css('position', 'absolute');

            console.log('x:', event.clientX, ' - y:', event.clientY);

            //  ----- Subir scroll suavemente hacia arriba y ocultar cursor -----
            $layout

                .stop()

                .animate({
                    scrollTop: 0
                }, 1000)

                .css('cursor', 'none');

            $sigueme.css({
                left: event.clientX,
                top: event.clientY
            });

        });

    });



})(jQuery);

