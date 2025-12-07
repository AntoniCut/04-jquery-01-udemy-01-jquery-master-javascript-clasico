/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/scripts/01-aprendiendo-jquery/  ------------
    ----------  /07-jquery-peticiones-ajax.js  ------------------
    -------------------------------------------------------------  
*/


/**
 * - Respuesta de la API JSONPlaceholder para un usuario.
 * @typedef {Object} UserResponse
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {string} phone
 * @property {string} website
 */


(($) => {

    console.log('\n');
    console.warn('-----  07-jquery-peticiones-ajax.js  -----');
    console.log('\n');


    /*
        -------------------------------------
        ---------- 1. Método LOAD  ----------
        -------------------------------------
    */

    //  -----  referencias al HTML  -----

    /**
     * - `btnLoad`: botón para cargar contenido vía AJAX.
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnLoad = $('#btnLoad');

    /**
     * - `datosLoad`: contenedor donde se cargará el contenido vía AJAX.
     * @type {JQuery<HTMLArticleElement>}
     */
    const $datosLoad = $('#datosLoad');

    /**
     * - `urlLoad`: URL del recurso a cargar vía AJAX.
     * @type {string}
     */
    const urlLoad = '/01-udemy/01-jquery-master-javascript-clasico/src/services/datos-load.html';

    $btnLoad.on('click', function () {

        $datosLoad.load(urlLoad);

    });



    /*
      ------------------------------------
      ---------- 2. Método GET  ----------
      ------------------------------------
    */

    /**
     * - `btnGet`: botón para realizar la petición GET vía AJAX.
     * @type {JQuery<HTMLButtonElement>}
     */
    const $btnGet = $('#btnGet');

    /**
     * - `datosGet`: contenedor donde se mostrarán los datos obtenidos vía AJAX.
     * @type {JQuery<HTMLArticleElement>}
     */
    const $datosGet = $('#datosGet');

    /**
     * - `urlPlaceholderGet`: URL del recurso de la API JSONPlaceholder para obtener usuarios.
     * @type {string}
     */
    const urlPlaceholderGet = 'https://jsonplaceholder.typicode.com/users';


    //  -----  evento click del botón GET  -----
    $btnGet.on('click', function () {


        $.get(

            urlPlaceholderGet,

            function (

                /**
                 * - Respuesta de la API con el array de usuarios.
                 * @type {UserResponse[]}  
                 */
                response) {

                console.log('response Get:', response);

                /**
                 * - `arrUsers`: array para almacenar los artículos HTML de cada usuario.
                 * @type {string[]}
                 */
                const arrUsers = [];

                response.forEach(

                    /**
                     * @param {UserResponse} user - Información de un usuario.
                     */
                    user => {

                        //  -----  destructuring de cada usuario  -----
                        const { id, name, username, email, phone, website } = user;

                        arrUsers.push(`
                    
                            <article class="info__user"> 
                            
                                <p class="user__field">
                                    <span class="user__label"> ID </span>
                                    <span class="user__value"> ${id} </span>
                                </p>

                                <p class="user__field">
                                    <span class="user__label"> Name </span>
                                    <span class="user__value"> ${name} </span>
                                </p>

                                <p class="user__field">
                                    <span class="user__label"> Username </span>
                                    <span class="user__value"> ${username} </span>
                                </p> 

                                <p class="user__field">
                                    <span class="user__label"> Email </span>
                                    <span class="user__value"> ${email} </span>
                                </p>

                                <p class="user__field">
                                    <span class="user__label"> Phone </span>
                                    <span class="user__value"> ${phone} </span>
                                </p>

                                <p class="user__field">
                                    <span class="user__label"> Website </span>
                                    <span class="user__value"> ${website} </span>
                                </p>
                            
                            </article>
                        `);

                    });

                $datosGet.append(arrUsers.join(''));

            });

    });



    /*
        -------------------------------------
        ---------- 3. Método POST  ----------
        -------------------------------------
    */

    //  -----  referencias al HTML  -----

    /**
     * - `formPost`: formulario para enviar datos por `POST` vía AJAX.
     * @type {JQuery<HTMLFormElement>}
     */
    const $formPost = $('#formularioPost');

    /**
     * - `datosPost`: contenedor donde se mostrarán los datos enviados vía AJAX.
     * @type {JQuery<HTMLArticleElement>}
     */
    const $datosPost = $('#datosPost');


    //  -----  evento submit del formulario POST  -----
    $formPost.on('submit', function (e) {

        e.preventDefault();

        /**
         * - `newUser`: objeto con la información del nuevo usuario a enviar.
         * @type {UserResponse}
         */
        const newUser = {
            id: Number($('input[name="idPost"]').val() || 0),
            name: String($('input[name="namePost"]').val() || ''),
            username: String($('input[name="usernamePost"]').val() || ''),
            email: String($('input[name="emailPost"]').val() || ''),
            phone: String($('input[name="phonePost"]').val() || ''),
            website: String($('input[name="websitePost"]').val() || '')
        };


        //  -----  petición POST vía AJAX  -----
        $.post(

            /** @type {string} */
            ($formPost.attr('action')),

            newUser,

            function (

                /**
                 * - Respuesta de la API con el array de usuarios.
                 * @type {UserResponse}  
                 */
                response) {

                //  -----  destructuring de la respuesta  -----
                const { id, name, username, email, phone, website } = response;

                console.log('response Post:', response);

                /**     
                 * - `html`: artículo HTML con la información del usuario añadido.
                 * @type {string}
                 */
                const html = `
                    
                    <article class="info__user"> 
                            
                        <p class="user__field">
                            <span class="user__label"> ID </span>
                            <span class="user__value"> ${id} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Name </span>
                            <span class="user__value"> ${name} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Username </span>
                            <span class="user__value"> ${username} </span>
                        </p> 

                        <p class="user__field">
                            <span class="user__label"> Email </span>
                            <span class="user__value"> ${email} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Phone </span>
                            <span class="user__value"> ${phone} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Website </span>
                            <span class="user__value"> ${website} </span>
                        </p>
                            
                    </article>
                `;

                $datosPost.append(html);

            })

            .done(function () {

                setTimeout(() => {
                    //alert('Usuario añadido correctamente!!!');
                    $formPost.trigger('reset');

                }, 2000);
            });

    });



    /*
       -------------------------------------
       ---------- 4. Método AJAX  ----------
       -------------------------------------
   */

    //  -----  referencias al HTML  -----

    /**
     * - `formAjax`: formulario para enviar datos por `POST` vía AJAX.
     * @type {JQuery<HTMLFormElement>}
     */
    const $formAjax = $('#formularioAjax');

    /**
     * - `datosAjax`: contenedor donde se mostrarán los datos enviados vía AJAX.
     * @type {JQuery<HTMLArticleElement>}
     */
    const $datosAjax = $('#datosAjax');


    //  -----  evento submit del formulario POST  -----
    $formAjax.on('submit', function (e) {

        e.preventDefault();

        /**
         * - `newUser`: objeto con la información del nuevo usuario a enviar.
         * @type {UserResponse}
         */
        const newUser = {
            id: Number($('input[name="idAjax"]').val() || 0),
            name: String($('input[name="nameAjax"]').val() || ''),
            username: String($('input[name="usernameAjax"]').val() || ''),
            email: String($('input[name="emailAjax"]').val() || ''),
            phone: String($('input[name="phoneAjax"]').val() || ''),
            website: String($('input[name="websiteAjax"]').val() || '')
        };


        //  -----  petición POST vía AJAX  -----
        $.ajax({

            type: "POST",
            dataType: "json",
            url: $formAjax.attr("action"),
            contentType: "application/json",  // <--- importante
            data: JSON.stringify(newUser),    // <--- enviar JSON


            beforeSend: function () {
                console.log("Enviando usuario");
                //alert("Enviando usuario...");
            },


            success: function (

                /**
                 * - Respuesta de la API con el array de usuarios.
                 * @type {UserResponse}  
                 */
                response) {

                //  -----  destructuring de la respuesta  -----
                const { id, name, username, email, phone, website } = response;

                console.log('response => ', response);

                /**
                 * - `html`: artículo HTML con la información del usuario añadido.
                 * @type {string}
                 */
                const html = `
                    
                    <article class="info__user"> 
                            
                        <p class="user__field">
                            <span class="user__label"> ID </span>
                            <span class="user__value"> ${id} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Name </span>
                            <span class="user__value"> ${name} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Username </span>
                            <span class="user__value"> ${username} </span>
                        </p> 

                        <p class="user__field">
                            <span class="user__label"> Email </span>
                            <span class="user__value"> ${email} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Phone </span>
                            <span class="user__value"> ${phone} </span>
                        </p>

                        <p class="user__field">
                            <span class="user__label"> Website </span>
                            <span class="user__value"> ${website} </span>
                        </p>
                            
                    </article>
                `;


                $datosAjax.append(html);

                setTimeout(() => {
                    //alert('Petición realizada correctamente!!!');
                    $formAjax.trigger('reset');
                }, 2000);


            },

            error: function () {

                alert("A ocurrido un error!!!");
                console.log("A ocurrido un error!!!");

            },

            timeout: 5000

        });


    });



})(jQuery);
