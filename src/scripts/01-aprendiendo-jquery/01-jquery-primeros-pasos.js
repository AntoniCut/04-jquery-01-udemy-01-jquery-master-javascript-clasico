/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/scripts/01-aprendiendo-jquery/  ------------
    ----------  /01-jquery-primeros-pasos.js  -------------------
    -------------------------------------------------------------  
*/



(($) => {


    console.log('\n');
    console.warn('-----  01-jquery-primeros-pasos.js  -----');

    setTimeout(() => {
        alert('Aprendiendo jQuery del Master de JavaScript Clásico');
    }, 3000);


    /**
     * - Heading H2 
     * - Título de la sección Primeros Pasos con jQuery
     * @type {JQuery<HTMLHeadingElement>}
     */
    const $title = $(".primeros-pasos__title");

    
    /**
     * - Sección de Primeros Pasos con jQuery
     * @type {string}
     */
    const section = `
    
        <section class="primeros-pasos__section">
            <span class="text-jquery"> Texto Inyectado por jQuery </span>
            1. Aprendiendo jQuery - Primeros Pasos. 
            <br> <br> - 1.1 - ¿ Que es jQuery y para qué sirve ?
            <br><br> -  1.2 - Integrar jQuery.
            <br><br> - 1.3 - Diferencias versiones jQuery 1, 2 y 3
        </section>
        
    `;   
    

    $title.html(section);


})(jQuery);
