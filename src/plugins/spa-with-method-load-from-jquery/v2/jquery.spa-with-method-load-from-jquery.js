/*
    -------------------------------------------------------------------
    ----------  /spa-with-method-load-from-jquery/  -------------------
    ----------  /jquery.spa-with-method-load-from-jquery.js  ----------
    -------------------------------------------------------------------
*/



/**
 * @typedef {import('../../../types/route-types.js').Route} Route
 * @typedef {import('../../../types/config-option-spa-types.js').ConfigOptionsSPA} ConfigOptionsSPA
 */



/**
 *  --------------------------------------------------
 *  -----  `spaWithMethodLoadFromJQueryPlugins`  -----
 *  --------------------------------------------------
 * 
 *  - Este plugin `spaWithMethodLoadFromJQueryPlugins` permite cargar contenido dinámico
 *    en una aplicación SPA utilizando el método `load` de jQuery.
 *  - Envuelve el plugin en una función de `Módulos ES6` para facilitar su integración.
 */

export const spaWithMethodLoadFromJQueryPlugins = () => {


    //  -----  - Función Anónima Autoejecutable que define el plugin jQuery.
    (function ($) {


        /**
         * ------------------------------------------------
         * -----  `$.fn.spaWithMethodLoadFromJQuery`  -----
         * ------------------------------------------------
         * 
         * - Plugin SPA que añade funcionalidad al prototipo de jQuery.
         * 
         * @param {ConfigOptionsSPA} options - Opciones de configuración de la SPA.
         * @returns {JQuery} - Retorna el objeto jQuery para encadenamiento.
         */

        $.fn.spaWithMethodLoadFromJQuery = function (options) {


            // ----------------------------------------------------------------
            // Configuración por defecto (solo lo estrictamente necesario)
            // ----------------------------------------------------------------

            /**
             * ------------------------
             * -----  `settings`  -----
             * ------------------------
             * 
             * Objeto de configuración final del plugin SPA.
             *
             * Se crea combinando:
             *   - Los valores por defecto
             *   - Las opciones proporcionadas por el usuario (`options`)
             *
             * @type {ConfigOptionsSPA}
             *
             * Estructura final:
             *   {
             *      routes:    Route[]        → Lista de rutas de la aplicación
             *      base:      string         → URL base para history.pushState
             *      draggable: boolean        → Activa funciones de arrastre opcionales
             *   }
             */

            const settings = $.extend(
                {
                    /** @type {Route[]} */
                    routes: [],
                    base: '',
                    draggable: false
                },
                options
            );



            /**
             * ---------------------------------------------
             * -----  `loadComponentsDom(components)`  -----
             * ---------------------------------------------
             * 
             * Carga todos los componentes pasados en el objeto `components`.
             * components: { "#selector": "/ruta/archivo.html", ... }
             * Devuelve una promesa que se resuelve cuando TODOS los componentes se cargan.
             * 
             * @param {Record<string,string>} components
             * @returns {Promise<void[]>}
             */

            const loadComponentsDom = (components) => {

                /**
                 * - Array de promesas para cada carga de componente.
                 * @type {Promise<void>[]}
                 */
                const promises = [];


                //  -----  Iterar sobre cada selector en components  -----
                for (const selector in components) {

                    //  -----  Verificar que la propiedad pertenece a components  -----
                    if (!Object.prototype.hasOwnProperty.call(components, selector))
                        continue;


                    /**
                     * - URL del componente a cargar.
                     * @type {string}
                     */

                    const url = components[selector];

                    /**
                     * - Promesa que carga el componente en el selector correspondiente.
                     * @type {Promise<void>}
                     */

                    const promise = new Promise((resolve, reject) => {

                        //  -----  Usamos jQuery .load() para cargar el contenido  -----
                        $(selector).load(url, function (response, status, xhr) {

                            if (status === "error") {
                                console.error(`Error al cargar ${url}: ${xhr?.statusText || 'Desconocido'}`);
                                $(selector).html(`<p>Error 404 al cargar: ${url}</p>`);
                                return reject(new Error(`Error al cargar ${url}`));
                            }

                            resolve(undefined);

                        });

                    });

                    //  -----  Añadir la promesa al array  -----
                    promises.push(promise);

                }


                //  -----  Devolver la promesa que se resuelve cuando todas las cargas terminan  -----
                return Promise.all(promises);

            };



            /**
             * --------------------------------------------
             * -----  `loadTodoContentInHtml(route)`  -----
             * --------------------------------------------
             *
            * Carga el contenido (componentes, título, favicon, css, scripts) para una ruta.
            * @param {Route} route
            * @returns {Promise<void>}
            */

            const loadTodoContentInHtml = (route) => {


                //  -----  Devolver una promesa  -----
                return new Promise((resolve, reject) => {


                    //  -----  Validar que la ruta existe  -----
                    if (!route)
                        return reject(new Error('Ruta inválida'));


                    //  -----  Caso especial: ruta sin componentes  -----
                    //  -----   Si la ruta no tiene components, resolvemos (pero avisamos)  ------
                    if (!route.components || Object.keys(route.components).length === 0) {

                        console.log('\n');
                        console.warn(`La ruta ${route.id} no contiene 'components'`);
                        console.log('\n');

                        // Aún así actualizamos título / favicon / url / assets si existen

                        //  -----  Título  -----
                        if (route.pageTitle)
                            document.title = route.pageTitle;

                        //  -----  Favicon  -----
                        if (route.favicon)
                            updateFavicon(route.favicon);

                        //  -----  CSS  -----
                        if (route.styles)
                            loadStylesheet(route.styles);

                        //  -----  JS  -----
                        if (route.scripts)
                            route.scripts.forEach(s => loadScripts(s));


                        //  -----  URL (pushState)  -----

                        /**
                         * - Nueva URL construida con base y path de la ruta.
                         * @type {string}
                         */

                        const newUrl = `${settings.base}${route.path}`;

                        //  -----  Actualizar el historial solo si la URL es diferente  -----
                        if (window.location.pathname !== newUrl) {
                            history.pushState({ path: newUrl }, '', newUrl);
                        }


                        return resolve();

                    }



                    //  -----  1) Cargar todos los componentes declarados en la ruta  -----
                    loadComponentsDom(route.components)

                        .then(() => {

                            //  -----  Después de cargar TODOS los componentes  -----
                            actionsNavbar();

                            // -----  2) Título  -----
                            if (route.pageTitle)
                                document.title = route.pageTitle;

                            // -----  3) Favicon  -----
                            if (route.favicon)
                                updateFavicon(route.favicon);


                            //  -----  4) URL (pushState)  -----

                            /**
                             * - Nueva URL construida con base y path de la ruta.
                             * @type {string}
                             */

                            const newUrl = `${settings.base}${route.path}`;

                            //  -----  Actualizar el historial solo si la URL es diferente  -----
                            if (window.location.pathname !== newUrl) {
                                history.pushState({ path: newUrl }, '', newUrl);
                            }

                            //  -----  Carga el Título del Header  -----
                            if (route.headerTitle && route.components) {
                                $('#layoutHeader #headerTitle').html(route.headerTitle);
                                $('#layoutFooter #footerTitle').html(route.headerTitle);
                            }


                            //  -----  5) CSS  -----
                            if (route.styles)
                                loadStylesheet(route.styles);

                            //  -----  6) JS  -----
                            if (route.scripts) route.scripts.forEach(script => loadScripts(script));


                            //  -----  Finalmente resolvemos la promesa  -----
                            resolve();

                        })

                        /**
                         * - Captura errores en la carga de componentes
                         * @param {Error} err
                         */
                        .catch(

                            /** @param {Error} err */
                            
                            err => {
                                console.error('Error en loadComponents:', err);
                                reject(err);

                            });

                });

            };


            /**
             * ----------------------------------
             * -----  `loadContent(route)`  -----
             * ----------------------------------
             * 
             * - Carga contenido con o sin ViewTransition.
             * - Siempre devuelve una Promise.
             * 
             * @param {Route} route
             * @returns {Promise<void>}
             */

            const loadContent = (route) => {


                //  -----  Devolver una promesa  -----
                return new Promise((resolve, reject) => {

                    //  -----  Validar que la ruta existe  -----
                    if (!route) {
                        console.warn("No se encontró la ruta para loadContent");
                        return resolve();
                    }

                    //  -----  Si no existe ViewTransition: carga normal  -----
                    if (!document.startViewTransition) {

                        loadTodoContentInHtml(route)
                            .then(resolve)
                            .catch(reject);

                        return;

                    }


                    //  -----  Si Existe ViewTransition   -----
                    try {

                        /**
                         * - Iniciar la transición de vista
                         * @param {() => Promise<void>} callback
                         * @return {ViewTransition}
                         */
                        const transition = document.startViewTransition(() => {
                            return loadTodoContentInHtml(route);
                        });


                        //  -----  Algunos navegadores devuelven un objeto sin then() → lo adaptamos:  -----
                        if (transition && typeof transition.finished?.then === "function")
                            transition.finished.then(resolve).catch(reject);

                        //  -----  Fallback: resolvemos sin bloquear  -----
                        else
                            resolve();


                    } catch (err) {

                        console.error("Error en startViewTransition:", err);
                        loadTodoContentInHtml(route)
                            .then(resolve)
                            .catch(reject);
                    }
                });
            };



            /**
             *  -----------------------------------
             *  -----  `enableDraggables()`   -----
             *  -----------------------------------
             *  
             * - Habilita la funcionalidad de elementos arrastrables.
             * - Busca cualquier elemento con la clase `.draggable` y aplica .draggable() (jQuery UI).
             * - Esto evita depender de selectores rígidos.
             */

            const enableDraggables = () => {

                try {

                    //  -----  Iterar sobre cada elemento con clase .draggable y aplicar jQuery UI draggable.  -----
                    $('.draggable').each(function () {

                        if ($(this).draggable) {

                            $(this).draggable({
                                scroll: false
                            });
                        }

                    });

                } catch (err) {

                    //  -----  si jQuery UI no está presente, no hacer nada  -----
                    console.log('\n');
                    console.warn('jQuery UI draggable no disponible o falló la inicialización.', err);
                    console.log('\n');
                }
            };



            /**
             * -------------------------------
             * -----  `actionsNavbar()`  -----
             * -------------------------------
             * 
             * - Inicializa las acciones del navbar y comportamiento de abrir/cerrar.
             * - Busca cualquier .navbar__container en el DOM.
             */

            const actionsNavbar = () => {


                //  -----  Ocultar navbar y botón cerrar al inicio  -----
                $('.navbar__container').hide();
                $('.navbar__btn-close').hide();


                //  -----  Delegación de eventos  -----
                $(document)

                    //  -----  eliminamos cualquier binding anterior  -----
                    .off('.navbar')

                    //  -----  Evento click en botón abrir  -----
                    .on('click.navbar', '.navbar__btn-open', function (e) {
                        e.stopPropagation();
                        $('.navbar__container').stop(true, true).slideDown(1000);
                        $(this).hide();
                        $('.navbar__btn-close').show();
                    })

                    //  -----  Evento click en botón cerrar  -----
                    .on('click.navbar', '.navbar__btn-close', function (e) {
                        e.stopPropagation();
                        $('.navbar__container').stop(true, true).slideUp(1000);
                        $(this).hide();
                        $('.navbar__btn-open').show();
                    })

                    //  -----  Evento click fuera del navbar para cerrarlo  -----
                    .on('click.navbar', function () {
                        $('.navbar__container').stop(true, true).slideUp(1000);
                        $('.navbar__btn-close').hide();
                        $('.navbar__btn-open').show();
                    });
            };



            /**
             * -----------------------------------
             * -----  `normalizePath(path)`  -----
             * -----------------------------------
             * 
             * - Normaliza una ruta eliminando la barra final y el base
             * 
             * @param {string} path
             * @returns {string}
             */

            const normalizePath = (path) => path.replace(settings.base, '').replace(/\/$/, '');



            /**
             * --------------------------------------
             * -----  `updateFavicon(favicon)`  -----
             * --------------------------------------
             * 
             * - Actualiza el favicon añadiendo un query para forzar recarga
             * 
             * @param {string} favicon
             */

            const updateFavicon = (favicon) => {


                /** 
                 * - Elemento link del favicon
                 * @type {JQuery<HTMLLinkElement>}  
                 */
                
                let $favicon = $('link[rel="icon"]');

                //  -----  Si no existe el favicon, lo creamos  -----
                if ($favicon.length === 0) {
                    
                    /**
                     * - Crear un nuevo elemento link para el favicon si no existe
                     * @type {HTMLLinkElement}
                     */
                    const link = document.createElement('link');
                    
                    link.rel = "icon";
                    link.type = "image/x-icon";

                    document.head.appendChild(link);

                    $favicon = $(link);
                }

                $favicon.attr('href', `${favicon}?t=${Date.now()}`);
            };



            /**
             * ---------------------------------------
             * -----  `loadStylesheet(cssFile)`  -----
             * ---------------------------------------
             * 
             * - Carga hoja de estilos de página (elimina las anteriores marcadas como data-page-style)
             * 
             * @param {string} cssFile
             */

            const loadStylesheet = (cssFile) => {

                
                //  ----- Eliminar cualquier hoja de estilos previa marcada como data-page-style  -----
                $('link[data-page-style="true"]').remove();

                $('<link>')
                    
                    .attr({
                        rel: 'stylesheet',
                        href: `${cssFile}?t=${new Date().getTime()}`,
                        'data-page-style': 'true'
                    })
                    
                    .appendTo('head');
            };



            /**
             * ---------------------------------------
             * -----  `loadScriptsIfExists(scriptUrl)`  -----
             * ---------------------------------------
             * - Carga un script (verifica con HEAD)
             * @param {string} scriptUrl
             */

            const loadScripts = (scriptUrl) => {

                //  -----  Verificar si el script existe con una petición HEAD  -----
                $.ajax({

                    url: scriptUrl,
                    type: 'HEAD',

                    success: function () {

                        $.getScript(scriptUrl)
                            .done(() => console.log(`Cargado: ${scriptUrl}`))
                            .fail((jqxhr, settings, exception) => console.error(`Error en ${scriptUrl}:`, exception));
                    },

                    error: function () {
                        
                        console.log('\n');
                        console.warn(`No existe el script: ${scriptUrl}`);
                        console.log('\n');
                    }

                });

            };



            /**
             * ----------------------
             * -----  `init()`  -----
             * ----------------------
             * 
             * - Inicializa la app: encuentra la ruta inicial y la carga, o la 404.
             */

            const init = () => {


                /**
                 * - Ruta inicial basada en la URL actual
                 * @type {string}
                 */
                const normalizedPath = normalizePath(window.location.pathname);
                
                /**
                 * - Ruta inicial encontrada en settings.routes
                 * @type {Route|undefined}
                 */
                const initialRoute = settings.routes.find(route => normalizePath(route.path) === normalizedPath);

                //  -----  Cargar la ruta inicial o la 404  -----
                if (initialRoute) {

                    loadContent(initialRoute)
                        
                        .catch(
                            
                            /** @param {Error} err */

                            err => console.error('Error cargando ruta inicial', err)
                        );
                        
                } 
                
                //  -----  Si no se encuentra la ruta, cargar la 404  -----
                else {

                    /**
                     * - Ruta 404
                     * @type {Route|undefined}
                     */
                    const route404 = settings.routes.find(route => route.id === '404');

                    //  -----  Si existe la ruta 404, cargarla  -----
                    if (route404)

                        loadContent(route404)
                            .catch(err => console.error('Error cargando 404', err));
                }

                
                //  -----  Reemplazamos el state inicial (sin crear nuevo entry)  -----
                history.replaceState({ path: window.location.pathname }, '', window.location.pathname);

            };



            //  -----  Manejadores de navegación  -  clicks  ----------------------
            //  -----  Enlaces: a[data-id] => data-id corresponde a route.id  -----
            $(document).on('click', 'a[data-id]', function (event) {

                event.preventDefault();

                /**
                 * - ID de la ruta desde el atributo data-id
                 * @type {string}
                 */
                
                const dataId = $(this).data('id');
                
                /**
                 * - Ruta correspondiente al data-id
                 * @type {Route|undefined}
                 */
                
                const route = settings.routes.find(r => r.id === dataId);


                //  -----  ocultar menus tipo navbar compact  -----
                $('.navbar__container').slideUp();

                //  -----  Cargar la ruta si existe  -----
                if (route)

                    loadContent(route)
                        .catch(err => console.error('Error loadContent (click):', err));

                //  -----  Si no existe la ruta, cargar la 404  -----
                else {

                    /**
                     * - Ruta 404
                     * @type {Route|undefined}
                     */

                    const route404 = settings.routes.find(r => r.id === '404');

                    if (route404)
                        
                        loadContent(route404)
                            
                        .catch(
                            
                            /**@param {Error} err */

                            err => console.error('Error loadContent 404:', err)
                        );
                }

            });



            //  -----  Manejadores de navegación - popstate  -----
            //  -----  popstate: manejar atrás / adelante  -------
            window.addEventListener('popstate', function (event) {

                /**
                 * - Ruta normalizada desde el state o la URL actual
                 * @type {string}
                 */
                
                const rawPath = (event.state?.path || window.location.pathname);
                
                /**
                 * - Ruta normalizada (sin base ni barra final)
                 * @type {string}
                 */
                
                const normalized = normalizePath(rawPath);
                
                /**
                 * - Ruta correspondiente a la URL actual
                 * @type {Route|undefined}
                 */
                
                const matchedRoute = settings.routes.find(route => normalizePath(route.path) === normalized);

                //  -----  Cargar la ruta correspondiente o la 404  -----
                if (matchedRoute) 
                    loadContent(matchedRoute).catch(err => console.error('Error loadContent (popstate):', err));
                
                else {
                    
                    /**
                     * - Ruta 404
                     * @type {Route|undefined}
                     */
                    const route404 = settings.routes.find(r => r.id === '404');
                    
                    if (route404) 
                        
                        loadContent(route404)
                        
                        .catch(
                        
                            /** @param {Error} err */

                            err => console.error('Error loadContent 404 (popstate):', err)
                        );
                }
                
            });



            /*
                -----------------------------------------
                ----------  INICIO DEL PLUGIN  ----------
                -----------------------------------------
            */

            console.log('\n');
            console.warn('-------------------------------------------------------------------------------------------------------');
            console.warn('----------  plugin  -  jquery.spa-with-method-load-from-jquery.js  -  versión 2  -  cargado  ----------');
            console.warn('-------------------------------------------------------------------------------------------------------');
            console.log('\n');


            //  -----  Si está activado, habilitar draggables  -----
            if (settings.draggable)
                enableDraggables();


            //  -----  Inicializar la aplicación SPA  -----
            init();


            //  -----  Retornar this para encadenamiento  -----
            return this;

        };


    })(jQuery);

};
