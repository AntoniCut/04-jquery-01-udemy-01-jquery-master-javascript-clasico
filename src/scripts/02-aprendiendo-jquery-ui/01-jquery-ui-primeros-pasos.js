/*
    --------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  -------------------------
    ----------  /01-udemy/  --------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  -----------
    ----------  /src/scripts/02-aprendiendo-jquery-ui/  ----------
    ----------  /01-jquery-ui-primeros-pasos.js  -----------------
    --------------------------------------------------------------  
*/



(($) => {


    console.log('\n');
    console.warn('-----  01-jquery-ui-primeros-pasos.js  -----');
    console.log('\n');


    setTimeout(() => {
        alert('Aprendiendo jQuery UI del Master de JavaScript Clásico');
    }, 3000);

   
    /**
     * - Hacer un elemento "draggable" (arrastrable)
     * - Restringir el área de movimiento dentro del contenedor padre
     * @type {JQuery<HTMLDivElement>}
     */
    const $caja = $('#caja');

    $caja.draggable({
        containment: "parent"
    });


})(jQuery);






