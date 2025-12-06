/*
    -------------------------------------------------------------------
    ----------  /spa-with-method-load-from-jquery/  -------------------
    ----------  /jquery.spa-with-method-load-from-jquery.js  ----------
    -------------------------------------------------------------------
*/



/**
 * -----------------------------------------
 * -----  Imports de tipos para JSDoc  -----
 * -----------------------------------------
 * 
 * @typedef {import('../../../types/route-types.js').Route} Route
 * @typedef {import('../../../types/route-types.js').RouteComponents} RouteComponents
 * @typedef {import('../../../types/config-option-spa-types.js').ConfigOptionsSPA} ConfigOptionsSPA
 * 
 */



/**
 *  --------------------------------------------------
 *  -----  `spaWithMethodLoadFromJQueryPlugins`  -----
 *  --------------------------------------------------
 * 
 * @version `2.0.0`
 * 
 * @author `Antonio Francisco Cutillas García`
 * 
 * @description
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
             * 
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

                return new Promise(async (resolve, reject) => {

                    if (!route) {
                        console.warn("No se encontró la ruta para loadContent");
                        return resolve();
                    }

                    // Función interna asíncrona para cargar componentes y aplicar metadatos
                    const loadComponentsAndMeta = async () => {

                        // ----- Caso especial: ruta sin componentes -----
                        if (!route.components || Object.keys(route.components).length === 0) {
                            console.warn(`La ruta ${route.id} no contiene 'components'`);
                            applyRouteMeta(route);
                            return;
                        }

                        try {
                            // ----- Cargar todos los componentes declarados en la ruta -----
                            await loadComponentsDom(route.components);

                            // Inicializar acciones del navbar
                            actionsNavbar();

                            // Aplicar metadatos de la ruta (título, favicon, css, scripts, URL)
                            applyRouteMeta(route);

                        } catch (err) {
                            console.error('Error en loadComponentsDom:', err);
                            throw err; // Propagar error para que lo capture la Promise externa
                        }
                    };

                    // ----- Si no existe ViewTransition: carga normal -----
                    if (!document.startViewTransition) {
                        try {
                            await loadComponentsAndMeta();
                            resolve();
                        } catch (err) {
                            reject(err);
                        }
                        return;
                    }

                    // ----- Si Existe ViewTransition -----
                    try {
                        const transition = document.startViewTransition(() => loadComponentsAndMeta());

                        if (transition && typeof transition.finished?.then === "function")
                            transition.finished.then(resolve).catch(reject);
                        else
                            resolve();

                    } catch (err) {
                        console.error("Error en startViewTransition:", err);
                        try {
                            await loadComponentsAndMeta();
                            resolve();
                        } catch (err) {
                            reject(err);
                        }
                    }

                });
            };



            /**
             * ---------------------------------------------
             * -----  `loadComponentsDom(components)`  -----
             * ---------------------------------------------
             * 
             * Carga todos los componentes pasados en el objeto `components`.
             * components: { "#selector": "/ruta/archivo.html", ... }
             * Devuelve una promesa que se resuelve cuando TODOS los componentes se cargan.
             * 
             * @param {RouteComponents} components
             * @returns {Promise<void[]>}
             * 
             */

            const loadComponentsDom = (components) => {

                /**
                 * - Array de promesas para cada carga de componente.
                 * @type {Promise<void>[]}
                 */
                const promises = [];


                /*
                    ------------------------------------------------------
                    -----  Iterar sobre cada selector en components  -----
                    ------------------------------------------------------
                */
                for (const selector in components) {


                    //  -----  Verificar que la propiedad pertenece a components  -----
                    if (!Object.prototype.hasOwnProperty.call(components, selector))
                        continue;


                    /**
                     * - URL del componente a cargar.
                     * @type {string|undefined}
                     */

                    const url = components[selector];

                    if (!url) {
                        console.warn(`No hay URL para el selector ${selector}`);
                        continue; // Saltar si url es undefined
                    }

                    /**
                     * - Promesa que carga el componente en el selector correspondiente.
                     * @type {Promise<void>}
                     */

                    const promise = new Promise((resolve, reject) => {

                        /*
                            -----------------------------------------------------------------
                            -----  Cargamos componente del DOM con jQuery .load()  -----
                            -----------------------------------------------------------------
                        */

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
             * ------------------------------
             * -----  `applyRouteMeta`  -----
             * ------------------------------
             * 
             * - `Función para aplicar metadatos de la ruta (título, favicon, URL, etc.)`
             * 
             * @param {Route} route 
             * 
             */

            const applyRouteMeta = async (route) => {


                //  -----  Título del Header y Footer  -----
                if (route.headerTitle)
                    addTitleHeaderFooter(route.headerTitle);

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
                    route.scripts.forEach(script => loadScripts(script.src));

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

            }



            /**
             * ------------------------------------
             * -----  `addTitleHeaderFooter`  -----
             * ------------------------------------
             * 
             * - Agrega el título al header y footer de la página.
             * 
             * @param {string} title - Texto para mostrar en ambos lugares.
             * 
             */

            const addTitleHeaderFooter = (title) => {

                $('#layoutHeader #headerTitle').html(title);
                $('#layoutFooter #footerTitle').html(title);

            }



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
             * -----  `loadScripts(scriptUrl)`  ------
             * ---------------------------------------
             * 
             * - Carga un script (verifica con HEAD)
             * 
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
