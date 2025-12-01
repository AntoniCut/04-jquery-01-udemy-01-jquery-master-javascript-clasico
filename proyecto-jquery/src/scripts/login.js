/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /05-proyecto-html5-css3-javascript-jquery/  ---------------------
    ----------  /src/scripts/  --------------------------------------------------
    ----------  /login.js  ------------------------------------------------------
    -----------------------------------------------------------------------------
*/



(function ($) {


    console.log('\n');
    console.warn('-----  login.js (sin recarga) -----');
    console.log('\n');


    //  -----  referencias al HTML  -----
    const $login = $('#asideLogin');
    const $loginForm = $('#asideLogin form');
    const $formName = $("#formName");
    const $descriptionLogout = $('.description__logout');
    const $descriptionLogin = $('.description__login');

    //  -----  variables  -----
    const getName = localStorage.getItem("formName");


    //  -----  Función para mostrar mensaje de bienvenida  -----
    function mostrarBienvenida(nombre) {
        
        //  -----  mensaja de bienbenida en el html  -----
        $descriptionLogin.html(`
            <strong> Bienvenido, ${nombre} </strong>
            <a href='#' id='asideLogout'> Cerrar Sesión </a>
        `);

        $descriptionLogout.hide();      //  -----  ocultamos mensaje de bienvenida  -----
        $login.hide();                  //  -----  ocultamos formulario de login  -----        
    }

    
    //  -----  Cargar nombre si ya está en localStorage  -----
    if (getName) mostrarBienvenida(getName);

    
    //  -----  evento submit para enviar login  -----
    $loginForm.on('submit', function (e) {
        
        e.preventDefault();
        
        const name = $formName.val().trim();
        
        if (name) {
            localStorage.setItem("formName", name);
            mostrarBienvenida(name);
        }

    });

    
    //  -----  Botón de logout dinámico con delegación de eventos  -----
    $(document).on('click', '#asideLogout', function (e) {
        
        e.preventDefault();
        
        localStorage.removeItem('formName');    //  -----  Limpiamos el localStorage  -----
        $descriptionLogin.html('');             //  -----  Limpiamos el mensaje de bienvenida  -----
        $descriptionLogout.show();              //  -----  Mostramos el mensaje de logout  -----
        $login.show();                          //  -----  Mostramos el formulario de login  -----
    });


})(jQuery);
