/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/scripts/01-aprendiendo-jquery/  ------------
    ----------  /04-jquery-manipulacion-dom.js  -----------------
    -------------------------------------------------------------  
*/


(($) => {


    console.log('\n');
    console.warn('-----  04-jquery-manipulacion-dom.js  -----');


    /**
     *  - Lista de elementos `<a>` seleccionados mediante la clase `.enlace`.
     *  @type {JQuery<HTMLAnchorElement>} 
     */
    const $enlaces = $('.enlace');


    /**
     * - Función para recargar y actualizar los enlaces en el DOM.
     */
    const reloadLinks = () => {

        $enlaces.each(function () {

            /**
             * - Referencia al elemento actual en el bucle `each`.
             * @type {JQuery<HTMLAnchorElement>}
             */
            const $a = $(this);
            console.log($a.attr('href'));

            /**
             * - Obtenemos el valor del atributo `href` del elemento actual.
             * @type {string | undefined}
             */
            const href = $a.attr('href') ?? '';

            $a
                .text(href)
                .attr('target', '_blank');

        });
    }



    /*
        -----------------------
        -----  1. Append  -----
        -----------------------
    */

    /**
     *  - `input` de la sección `Append`
     *  @type {JQuery<HTMLInputElement>}
     */
    const $inputAppend = $('#inputAppend');

    /**
     * - `Botón` para añadir enlaces en la sección de `Append`.
     *  @type {JQuery<HTMLButtonElement>}
     */
    const $btnAppend = $('#btnAppend');

    /**
     * - Elemento `<ul>` del menú principal.
     * - Usado para manejar interacciones de navegación y eventos del menú.
     * @type {JQuery<HTMLUListElement>}
     */
    const $menuAppend = $('#menuAppend');


    //  -----  click botón para Añadir con Append  -----
    $btnAppend.on('click', function () {

        /**
         * - Obtenemos el valor del enlace ingresado en el input, eliminando espacios en blanco.
         * @type {string}
         */
        const link = String($inputAppend.val()).trim();

        if (link) {

            $menuAppend.append(`

                <li>
                    <a class="enlace-added" href="${link}">${link} </a>
                </li>
            `);

            $inputAppend.val('');
            reloadLinks();

        } else
            alert('Añade un enlace');

        $inputAppend.trigger('focus');

    });



    /*
        -----------------------
        -----  2. Prepend  -----
        -----------------------
    */

    /**
     * - `input` de la sección `Prepend`
     * @type {JQuery<HTMLInputElement>}
     */
    const $inputPrepend = $('#inputPrepend');

    /**
     * - `Botón` para añadir enlaces en la sección de `Prepend`.
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnPrepend = $('#btnPrepend');

    /**
     * - Elemento `<ul>` del menú secundario.
     * - Usado para manejar interacciones de navegación y eventos del menú.
     * @type {JQuery<HTMLUListElement>}
     */
    const $menuPrepend = $('#menuPrepend');


    //  -----  click botón para Añadir con Prepend  -----
    $btnPrepend.on('click', function () {

        /**
         * - Obtenemos el valor del enlace ingresado en el input, eliminando espacios en blanco.
         * @type {string}
         */
        const link = String($inputPrepend.val()).trim();

        if (link) {

            $menuPrepend.prepend(`
                <li>
                    <a class="enlace-added" href="${link}">${link}</a>
                </li>
            `);

            $inputPrepend.val('');
            reloadLinks();

        } else
            alert('Añade un enlace');

        $inputPrepend.trigger('focus');

    });



    /*
        ----------------------
        -----  3. After  -----
        ----------------------
    */

    /**
     *  - `input` de la sección `After`
     *  @type {JQuery<HTMLInputElement>}
     */
    const $inputAfter = $('#inputAfter');

    /**
     * - `Botón` para añadir enlaces en la sección `After`.
     *  @type {JQuery<HTMLButtonElement>}
     */
    const $btnAfter = $('#btnAfter');

    /**
     * - Elemento `<ul>` del menú principal.
     * - Usado para manejar interacciones de navegación y eventos del menú.
     * @type {JQuery<HTMLUListElement>}
     */
    const $menuAfter = $('#menuAfter');


    //  -----  click botón para Añadir con After  -----
    $btnAfter.on('click', function () {

        /**
         * - Obtenemos el valor del enlace ingresado en el input, eliminando espacios en blanco.
         * @type {string}
         */
        const link = String($inputAfter.val()).trim();

        if (link) {

            $menuAfter.after(`

                <li>
                    <a class="enlace-added" href="${link}">${link} </a>
                </li>
            `);

            $inputAfter.val('');
            reloadLinks();

        } else
            alert('Añade un enlace');

        $inputAfter.trigger('focus');

    });



    /*
       -----------------------
       -----  4. Before  -----
       -----------------------
   */

    /**
     *  - `input` de la sección `Before`
     *  @type {JQuery<HTMLInputElement>}
     */
    const $inputBefore = $('#inputBefore');

    /**
     * - `Botón` para añadir enlaces en la sección de `Before`.
     *  @type {JQuery<HTMLButtonElement>}
     */
    const $btnBefore = $('#btnBefore');

    /**
     * - Elemento `<ul>` del menú principal.
     * - Usado para manejar interacciones de navegación y eventos del menú.
     * @type {JQuery<HTMLUListElement>}
     */
    const $menuBefore = $('#menuBefore');

    //  -----  click botón para Añadir con Before  -----
    $btnBefore.on('click', function () {

        /**
         * - Obtenemos el valor del enlace ingresado en el input, eliminando espacios en blanco.
         * @type {string}
         */
        const link = String($inputBefore.val()).trim();

        if (link) {

            $menuBefore.before(`

                <li>
                    <a class="enlace-added" href="${link}">${link} </a>
                </li>
            `);

            $inputBefore.val('');
            reloadLinks();

        } else
            alert('Añade un enlace');

        $inputBefore.trigger('focus');

    });



    //  -----  al cargar el documento  -----
    $btnAppend.removeAttr('disabled');
    $btnPrepend.removeAttr('disabled');
    $btnAfter.removeAttr('disabled');
    $btnBefore.removeAttr('disabled');

    reloadLinks();


})(jQuery);
