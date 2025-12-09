/*
    ---------------------------------------------------
    ----------  /plugins/  ----------------------------
    ----------  /change-themes-jquery-ui/  ------------
    ----------  /change-themes-jquery-ui.js  ----------
    ---------------------------------------------------
    
*/



(function ($) {


    console.log('\n');
    console.warn('-----  themes-jquery-ui.js  -----');
    console.log('\n');


    /**
     * - `id` del elemento `link` de la hoja de estilos de jquery UI
     * @type {JQuery<HTMLLinkElement>} 
     */
     const $theme = $('#theme');

     /**
      * - contenedor de los links de themes
      * @type {JQuery<HTMLDivElement>}
      */
     const $linksThemesContainer = $('#linksThemesContainer');
   
    
    /**
     * - Path de las themes de jQuery UI
     * @type {string}
     */
    const path = '/01-udemy/01-jquery-master-javascript-clasico/src/libs/jquery-ui/themes';


    //  -----  añadimos widget tooltip al layoutNavbarThemesUI  -----
    $linksThemesContainer.tooltip();


    function disabledActive() {
        
        $linksThemesContainer
            .find("a")
            .removeClass('active');
    }


    $linksThemesContainer.on("click", "a", function (e) {

        e.preventDefault();

        const themeName = $(this).data("theme");
        if (!themeName) return;

        $theme.attr("href", `${path}/${themeName}/jquery-ui.min.css`);

        console.log('\n');
        console.warn(`Theme changed to: ${themeName}`);
        console.log('\n');

        disabledActive();
        $(this).addClass("active");

        e.stopPropagation();

    });

})(jQuery);
