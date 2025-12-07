/*
    --------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  -------------------------
    ----------  /01-udemy/  --------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  -----------
    ----------  /src/scripts/02-aprendiendo-jquery-ui/  ----------
    ----------  /02-jquery-ui-interacciones.js  ------------------
    --------------------------------------------------------------  
*/



(($) => {


    console.log('\n');
    console.warn('-----  02-jquery-ui-interacciones.js  -----');
    console.log('\n');


    /*
        ------------------------------------
        ----------  1. Draggable  ----------
        ------------------------------------
    */

    /**
     * - Seleccionamos todos los elementos con la clase .draggable__elemento
     * - y los almacenamos en la variable $draggableElementos
     * @type {JQuery<HTMLDivElement>}
     */
    
    const $draggableElementos = $('.draggable__elemento');

    $draggableElementos.draggable({
        containment: "parent"
    });


    /*
        ------------------------------------
        ----------  2. Resizable  ----------
        ------------------------------------
    */

    /**
     * - Seleccionamos todos los elementos con la clase .resizable__elemento
     * - y los almacenamos en la variable $resizableElementos
     * @type {JQuery<HTMLDivElement>}
     */    
    
    const $resizableElementos = $('.resizable__elemento');

    $resizableElementos.resizable();


    /*
        -------------------------------------
        ----------  3. Selectable  ----------
        -------------------------------------
    */

    /**
     * - Seleccionamos todos los elementos con la clase .list-selectable
     * - y los almacenamos en la variable $listaSeleccionable
     * @type {JQuery<HTMLUListElement>}
     */

    const $listaSeleccionable = $('.list-selectable');

    $listaSeleccionable.selectable();


    /*
        ------------------------------------
        ----------  4. Sorteable  ----------
        ------------------------------------
    */

    /**
     * - Seleccionamos todos los elementos con la clase .list-sortable
     * - y los almacenamos en la variable $listaSortable
     * @type {JQuery<HTMLUListElement>}
     */    
    const $listaSortable = $('.list-sortable');

    $listaSortable.sortable({

        update: function (event, ui) {
            console.log("Ha cambiado la lista...");
        }

    });


    /*
        ------------------------------------
        ----------  5. Droppable  ----------
        ------------------------------------
    */

    /**
     * - Seleccionamos el elemento con el id #elementoMovido
     * - y lo almacenamos en la variable $elementoMovido
     * @type {JQuery<HTMLDivElement>}
     */

    const $elementoMovido = $('#elementoMovido');
    

    /**
     * - Aqui dejamos caer el elemento movible
     * @type {JQuery<HTMLDivElement>}
     */
    
    const $area = $('#area');


    $elementoMovido.draggable();
    
    $area.droppable({
        
        drop: function () {
            console.log("Has soltado algo dentro de el area.");
            $area.text('Elemento Movible dentro del area');
            $area.css('background-color', 'lightgreen');
        },

        out: function () {
            console.log("Has sacado el elemento del área.");
            $area.text('Elemento Movible fuera del área');
            $area.css('background-color', 'bisque');
        }
    });
   


})(jQuery);


