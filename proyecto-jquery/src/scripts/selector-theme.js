/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /05-proyecto-html5-css3-javascript-jquery/  ---------------------
    ----------  /src/scripts/  --------------------------------------------------
    ----------  /selector-theme.js  ---------------------------------------------
    -----------------------------------------------------------------------------
*/



(function ($) {

    const $toGreen = $('#toGreen');
    const $toRed = $('#toRed');
    const $toBlue = $('#toBlue');

    // Aplicar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.body.classList.add(savedTheme);

    // Reset class helper
    function setTheme(themeName) {
        document.body.classList.remove("theme-green", "theme-red", "theme-blue");
        document.body.classList.add(themeName);
        localStorage.setItem('theme', themeName);
    }

    $toGreen.on("click", () => setTheme("theme-green"));
    $toRed.on("click", () => setTheme("theme-red"));
    $toBlue.on("click", () => setTheme("theme-blue"));

})(jQuery);




// (function ($) {

//     console.log('\n');
//     console.warn('-----  selector-theme.js  -----');
//     console.log('\n');


//     //  ----------  selector de temas  ----------

//     const theme = $('#theme');
//     const $toGreen = $('#toGreen');
//     const $toRed = $('#toRed');
//     const $toBlue = $('#toBlue');


//     //  -----  Cargar tema guardado en localStorage  -----
//     const savedTheme = localStorage.getItem('selectedTheme');

//     if (savedTheme)
//         theme.attr('href', savedTheme);


//     //  -----  eventos click botones selector de temas  -----
//     $toGreen.on('click', function () {
//         const greenPath = '/04-master-javascript-clasico-jquery-typescript-mean/proyecto-jquery/src/styles/themes/green.css';
//         theme.attr('href', greenPath);
//         localStorage.setItem('selectedTheme', greenPath);
//     });

//     $toRed.on('click', function () {
//         const redPath = '/04-master-javascript-clasico-jquery-typescript-mean/proyecto-jquery/src/styles/themes/red.css';
//         theme.attr('href', redPath);
//         localStorage.setItem('selectedTheme', redPath);
//     });

//     $toBlue.on('click', function () {
//         const bluePath = '/04-master-javascript-clasico-jquery-typescript-mean/proyecto-jquery/src/styles/themes/blue.css';
//         theme.attr('href', bluePath);
//         localStorage.setItem('selectedTheme', bluePath);
//     });


// })(jQuery);



