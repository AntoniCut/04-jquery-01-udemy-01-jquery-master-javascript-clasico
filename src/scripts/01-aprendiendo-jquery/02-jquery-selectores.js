/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/scripts/01-aprendiendo-jquery/  ------------
    ----------  /02-jquery-selectores.js  -----------------------
    -------------------------------------------------------------  
*/



(($) => {


    console.log('\n');
    console.warn('-----  02-jquery-selectores.js  -----');
    console.log('\n');


    /*
        -----------------------------------------
        ----------  1. Selector de ID  ----------
        -----------------------------------------
    */

    //  -----  referencias al HTML  -----
    
    /** @type {JQuery<HTMLParagraphElement>}  */
    const $rojo1 = $('#rojo1');

    /** @type {JQuery<HTMLParagraphElement>}  */
    const $amarillo1 = $('#amarillo1');

    /** @type {JQuery<HTMLParagraphElement>}  */
    const $verde1 = $('#verde1');


    $rojo1
        .css('color', 'white')
        .css('background', 'red')

    $amarillo1
        .css('color', 'green')
        .css('background', 'yellow')

    $verde1
        .css('color', 'white')
        .css('background', 'green')



    /*
        ----------------------------------------------
        ----------  2. Selectores de Clase  ----------
        ----------------------------------------------
    */


    //  -----  referencias al HTML  -----
    
    /**
     * @type {JQuery<HTMLParagraphElement>}
     */
    const $rojo2 = $('.rojo2');
    
    /**
     * @type {JQuery<HTMLParagraphElement>}
     */
    const $amarillo2 = $('.amarillo2');
    
    /**
     * @type {JQuery<HTMLParagraphElement>}
     */
    const $verde2 = $('.verde2');
    
    /**
     * @type {JQuery<HTMLParagraphElement>}
     */
    const $zebra2 = $('.zebra2');

    $rojo2
        .css("background", "red")
        .css("color", "white")

    $amarillo2
        .css("background", "yellow")
        .css("color", "green")

    $verde2
        .css("background", "green")
        .css("color", "white");

    $zebra2
        .css("border", "5px solid red")
        .css("background", "black")
        .css("color", "white")

        .on('click', function () {

            const color = $(this).css('color');
            console.log('color zebra2 => ', color);

            const $this = $(this);

            if (color === 'rgb(255, 255, 255)') {

                $this
                    .text('Soy un parrafo de color Naranja')
                    .css("color", "orange")
                    .addClass('zebra-class')
            }

            if (color === 'rgb(255, 165, 0)') {

                $this
                    .text('Soy un párrafo de color Blanco')
                    .css("color", "white")
                    .removeClass('zebra-class')
            }
        })



    /*
        -------------------------------------------------
        ----------  3. Selectores de Etiqueta  ----------
        -------------------------------------------------
    */

    //  -----  referencias al HTML  -----
    
    /** @type {JQuery<HTMLSpanElement>} */
    const $rojo3 = $('.rojo3');
    
    /** @type {JQuery<HTMLSpanElement>} */
    const $amarillo3 = $('.amarillo3');
    
    /** @type {JQuery<HTMLSpanElement>} */
    const $verde3 = $('.verde3');
    
    /** @type {JQuery<HTMLSpanElement>} */
    const $zebra3 = $('.zebra3');
    
    /** @type {JQuery<HTMLSpanElement>} */
    const $span = $('span');

    $rojo3
        .css("background", "red")
        .css("color", "white")
        .addClass('zebra-border')

    $amarillo3
        .css("background", "yellow")
        .css("color", "green")
        .addClass('grande')

    $verde3
        .css("background", "green")
        .css("color", "white")
        .addClass('zebra-border')

    $zebra3
        .css("border", "5px solid red")
        .css("background", "black")
        .css("color", "white")
        .addClass('grande')

    $span
        .css('cursor', 'pointer')


    //  -----  Guardar el texto base sin clases adicionales  -----
    $span.each(function () {

        
        const $this = $(this);

        const texto = $this
            .text()
            .replace(' - con clase zebra-border', '')
            .replace(' - con clase grande', '')
            .trim()

        $this.data('originalText', texto);
    });


    $span.on('click', function () {

        const $this = $(this);

        /**
         * @type {string}
         */
        const baseText = $this.data('originalText');

        //  -----  Alternar clases  -----
        const tieneZebra = $this.hasClass('zebra-border');


        if (tieneZebra) {

            $this
                .removeClass('zebra-border')
                .addClass('grande');

        }

        else {

            $this
                .addClass('zebra-border')
                .removeClass('grande');
        }

        //  -----  Construir texto actualizado  -----
        let nuevoTexto = baseText;

        if ($this.hasClass('zebra-border'))
            nuevoTexto += ' - con clase zebra-border';

        if ($this.hasClass('grande'))
            nuevoTexto += ' - con clase grande';


        $this.text(nuevoTexto);

    });



    /*
        -------------------------------------------------
        ----------  4. Selectores de Atributo  ----------
        -------------------------------------------------
    */

    //  -----  referencias al HTML  -----
    const $enlaceGoogle = $('[title="Google"]');
    const $enlaceFacebook = $('[title="Facebook"]');
    const $btnAtributos = $('#btnAtributos');


    $btnAtributos.on('click', function () {

        $enlaceGoogle.css({
            color: 'black',
            background: '#ccc',
            padding: '2rem',
            fontWeight: 'bold',
        });

        $enlaceFacebook.css({
            color: 'black',
            background: 'blue',
            padding: '2rem',
            fontWeight: 'bold',
        });

    });



    /*
        ----------------------------------------
        ----------  5. Find y Parent  ----------
        ----------------------------------------
    */

    //  -----  referencias al HTML  -----
    const $rojo5 = $('.rojo5');
    const $amarillo5 = $('.amarillo5');
    const $verde5 = $('.verde5');
    const $azul5 = $('.azul5');

    const $btnMarginSup = $('#btnMarginSup');
    const $btnChangeBackground = $('#btnChangeBackground');
    const $btnGetTitle = $('#btnGetTitle');

    const $parrafosEnlaces = $('.find-y-parent__container p, .find-y-parent__container a');
    const $caja = $('#caja');

    $rojo5
        .css("background", "red")
        .css("color", "white")

    $amarillo5
        .css("background", "yellow")
        .css("color", "green")

    $verde5
        .css("background", "green")
        .css("color", "white");

    $azul5
        .css("background", "blue")
        .css("color", "white")


    $btnMarginSup.on('click', function () {

        $parrafosEnlaces.addClass('border-superior');
    });


    $btnChangeBackground.on('click', function () {

        const busqueda = $('#elemento2')
            .parent()
            .parent()
            .find('#elemento2.resaltado')
            .css('background-color', 'black');

        console.log('busqueda =>', busqueda);

    });


    $btnGetTitle.on('click', function () {

        const $resaltado = $('#caja .resaltado').eq(0);
        
        const $contenedorComun = $resaltado.parents('.find-y-parent__top');
        
        const titleEnlace = $contenedorComun
            .find('[title="Google"]')
            .text();

        console.log('titleEnlace =>', titleEnlace);

        if (titleEnlace)
            $caja.append(`<p class='title-enlace'> ${titleEnlace} </p>`);

    });



})(jQuery);
