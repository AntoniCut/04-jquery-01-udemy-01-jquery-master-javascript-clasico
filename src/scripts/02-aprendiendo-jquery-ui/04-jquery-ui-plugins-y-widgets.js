/*
    --------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  -------------------------
    ----------  /01-udemy/  --------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  -----------
    ----------  /src/scripts/02-aprendiendo-jquery-ui/  ----------
    ----------  /04-jquery-ui-plugins-y-widgets.js  --------------
    --------------------------------------------------------------  
*/



(($) => {


    console.log('\n')
    console.warn('-----  04-jquery-ui-plugins-y-widgets.js  -----');
    console.log('\n');


    /*
      -----------------------------------
      ----------  1. Tooltips  ----------
      -----------------------------------
  */

    /**
     * - Agregar tooltips a los elementos con jQuery UI
     * @type {JQuery<Document>}
     */
    $(document).tooltip();

    /**
     * - Prevenir el comportamiento por defecto de los enlaces
     * @type {JQuery<HTMLAnchorElement>}
     */
    const $enlace = $('.enlace');

    $enlace.on('click', function (e) {
        e.preventDefault();
    });



    /*
        ---------------------------------------------
        ----------  2. Cuadros de Dialogo  ----------
        ---------------------------------------------
    */

    /**
     * Lanzar un cuadro de dialogo (popup) con jQuery UI
     * @type {JQuery<HTMLButtonElement>}
     */

    const $lanzarPopup = $('#lanzarPopup');

    /**
     * Elementos del popup
     * @type {JQuery<HTMLDivElement>}
     */

    const $popup = $('#popup');

    /**
     * Texto del popup
     * @type {JQuery<HTMLParagraphElement>}
     */

    const $textPopup = $('.text-popup');


    $lanzarPopup.on('click', function () {

        $textPopup.css({
            display: 'block',
            fontSize: '1.6rem'
        });

        $popup.dialog({
            modal: true,
            buttons: {
                Aceptar: function () {
                    $(this).dialog('close');
                },
                Cancelar: function () {
                    $(this).dialog('close');
                }
            }
        });
    });


    /*
        -------------------------------------
        ----------  3. Calendario  ----------
        -------------------------------------
    */

    /**
     * - Agregar un calendario a un input con jQuery UI
     * @type {JQuery<HTMLInputElement>}
     */

    const $calendario = $('#calendario');

    $calendario.datepicker({
        dateFormat: 'dd-mm-yy',
        showAnim: 'slideDown',
    });


    /*
        -------------------------------
        ----------  4. Tabs  ----------
        -------------------------------
    */

    /** 
     * - Crear pestañas (tabs) con jQuery UI
     * @type {JQuery<HTMLDivElement>} 
     */
    
    const $pestanas = $('#pestanas');

    $pestanas.tabs();



})(jQuery);

