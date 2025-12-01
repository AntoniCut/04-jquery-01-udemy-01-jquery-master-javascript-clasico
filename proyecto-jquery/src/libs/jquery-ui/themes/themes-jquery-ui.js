/*
    --------------------------------------------
    ----------  /themes-jquery-ui.js  ----------
    --------------------------------------------
*/



(function ($) {
    

    console.log('\n');
    console.warn('-----  themes-jquery-ui.js  -----');
    console.log('\n');


    const $theme = $('#theme');
    const $navbarThemesUL = $('#navbarThemesUI');
    const $themesTitle = $('#themesTitle');
    const $linksThemesContainer = $('#linksThemesContainer');

    const path = '/04-master-javascript-clasico-jquery-typescript-mean/04-jquery/src/libs/jquery-ui/themes';

    $navbarThemesUL.draggable();
    $navbarThemesUL.tooltip();

    $themesTitle.on('click', function (e) {
        
        e.preventDefault();
        $linksThemesContainer.slideToggle();
    });


    function disabledActive() {
        $("#linksThemesContainer > a").removeClass('active');
    }


    $linksThemesContainer.on("click", "a", function (e) {
        
        e.preventDefault();

        const themeName = $(this).data("theme");
        if (!themeName) return;

        $theme.attr("href", `${path}/${themeName}/jquery-ui.min.css`);
        disabledActive();
        $(this).addClass("active");

    });

})(jQuery);
