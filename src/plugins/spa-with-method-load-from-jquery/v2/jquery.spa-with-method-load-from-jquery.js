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
 * @typedef {import('../../../types/route-types.js').RouteStyle} RouteStyle
 * @typedef {import('../../../types/route-types.js').RouteScript} RouteScript
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
 * 
 */

export const spaWithMethodLoadFromJQueryPlugins = () => {


    /*
        -------------------------------------------------------------------------------------
        ----------  Función Anónima Autoejecutable que Encapsula el plugin jQuery  ----------
        -------------------------------------------------------------------------------------
    */

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


            /*
                -------------------------------------------------------------------------
                -----  Configuración por defecto (solo lo estrictamente necesario)  -----
                -------------------------------------------------------------------------
            */
            

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



            /*
                -------------------------------------------------------------------
                ----------  Normalización de rutas, pathnames y slashes  ----------
                -------------------------------------------------------------------
            */


            /**
             * -------------------------
             * -----  `normalize`  -----
             * -------------------------
             * 
             * - Normaliza una ruta (quita base y slashes de inicio/fin)
             * 
             * @param {string} raw
             * @returns {string}
             * 
             */

            const normalize = (raw = '') => {

                /**
                 * - Base de la aplicación
                 * @type {string}
                 */

                const base = settings.base || '';

                /**
                 * - Cadena normalizada
                 * @type {string}
                 */

                let s = String(raw || '');

                if (base && s.startsWith(base))
                    s = s.slice(base.length);

                //  -----  quitar leading/trailing slash  -----
                s = s.replace(/^\/|\/$/g, '');

                return s;

            }



            /**
             * -----------------------------
             * -----  `buildPathname`  -----
             * -----------------------------
             * 
             * - Construye pathname absoluto para pushState, normalizado con base
             * 
             * @param {string} routePath
             * @returns {string}
             * 
             */

            const buildPathname = (routePath = '') => {

                /**
                 * - Base de la aplicación
                 * @type {string}
                 */

                const base = (settings.base || '').replace(/\/$/, '');

                /**
                 * - Ruta normalizada (con leading slash)
                 * @type {string}
                 */

                const trimmed = routePath ? `/${String(routePath).replace(/^\/|\/$/g, '')}` : '';

                try {

                    return new URL(base + trimmed, location.origin).pathname;

                } catch (e) {

                    //  -----  fallback básico  -----
                    return (base + trimmed).replace(/\/\/+/g, '/');
                }

            };



            /*
                ------------------------------------------------------------------------
                ----------  Carga de contenido dinámico, Componentes del DOM  ----------
                ----------  y Metadatos de la Ruta (título, favicon, CSS, JS)  ---------
                ------------------------------------------------------------------------
            */


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


                    //  -----  Verificar que la ruta es válida  -----
                    if (!route) {
                        console.warn("No se encontró la ruta para loadContent");
                        return resolve();
                    }


                    //  -----  Función interna asíncrona para cargar componentes y aplicar metadatos  -----
                    const loadComponentsAndMeta = async () => {

                        // ----- Caso especial: ruta sin componentes -----
                        if (!route.components || Object.keys(route.components).length === 0) {

                            console.log('\n');
                            console.warn(`La ruta ${route.id} no contiene 'components'`);
                            console.log('\n');

                            //  -----  Aplicar metadatos de la ruta (título, favicon, css, scripts, URL) -----
                            applyRouteMeta(route);

                            return;

                        }

                        try {

                            //  ----- Cargar todos los componentes declarados en la ruta -----
                            await loadComponentsDom(route.components);

                            //  -----  Inicializar acciones del navbar  -----
                            actionsNavbar();

                            //  -----  Aplicar metadatos de la ruta (título, favicon, css, scripts, URL)  -----
                            applyRouteMeta(route);

                        } catch (err) {

                            console.log('\n');
                            console.error('Error en loadComponentsDom:', err);
                            console.log('\n');

                            //  -----  Propagar error para que lo capture la Promise externa  -----
                            throw err;
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

                        /**
                         * - Iniciar ViewTransition y cargar componentes/metadatos dentro de la transición
                         * - La promesa se resuelve cuando la transición termina.
                         * @type {ViewTransition|null}
                         * @return {Promise<void>}
                         */
                        const transition = document.startViewTransition(() => loadComponentsAndMeta());

                        //  -----  Esperar a que la transición termine  -----
                        if (transition && typeof transition.finished?.then === "function")

                            transition.finished
                                .then(resolve)
                                .catch(reject);

                        else
                            resolve();


                    } catch (err) {

                        console.log('\n');
                        console.error("Error en startViewTransition:", err);
                        console.log('\n');

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

                        console.log('\n');
                        console.warn(`No hay URL para el selector ${selector}`);
                        console.log('\n');

                        //  -----  Limpiar el contenedor del componente si la URL es undefined  -----
                        $(selector).empty();

                        // Saltar a la siguiente iteración
                        continue;

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

                                console.log('\n');
                                console.error(`Error al cargar ${url}: ${xhr?.statusText || 'Desconocido'}`);
                                console.log('\n');

                                //  -----  Mostrar mensaje de error en el contenedor  -----
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
                    loadStylesheetByPage(route.styles);

                //  -----  JS  -----
                if (route.scripts)
                    loadScriptsByPage(route.scripts);


                /*
                    --------------------------------------------
                    -----  pushState seguro (normalizado)  -----
                    --------------------------------------------
                */

                /**
                 * - `Nueva pathname para la ruta` 
                 * @type {string}
                 */

                const newPathname = buildPathname(route.path || '');


                //  -----  Evitar push duplicado  -----
                if (window.location.pathname !== newPathname) {

                    history.pushState({ id: route.id, path: newPathname }, '', newPathname);

                    console.log('\n');
                    console.warn('navigate ==>', route.id, newPathname);
                    console.log('\n');
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



            /*
                -------------------------------------------------------------------------------------
                ----------  Elementos Draggables, Acciones del Navbar, Actualizar Favicon  ----------
                -------------------------------------------------------------------------------------
            */


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



            /*
                -----------------------------------
                ----------  STYLESHEETS  ----------
                -----------------------------------
            */


            /**
             * --------------------------------------------
             * -----  `loadStylesheetByPage(styles)`  -----
             * --------------------------------------------
             *
             * Carga múltiples hojas de estilo para la página.
             * Elimina las anteriores marcadas como `data-page-style`.
             *
             * @param {RouteStyle[] | RouteStyle | null | undefined} styles
             * 
             */

            const loadStylesheetByPage = (styles) => {

                //  -----  Borrar estilos anteriores dinámicos  -----
                $('link[data-page-style="true"]').remove();

                if (!styles) 
                    return;

                //  -----  Asegurar array  -----
                const list = Array.isArray(styles) ? styles : [styles];

                list.forEach(style => {
                    
                    if (!style || typeof style.href !== 'string') 
                        return;
                    
                    //  -----  Cargar la hoja de estilos  -----
                    loadStylesheet(style.href);   

                });

            };



            /**
             * ---------------------------------------
             * -----  `loadStylesheet(cssFile)`  -----
             * ---------------------------------------
             *
             * Carga una hoja de estilos individual.
             * No elimina *todas* las de la página, solo las que coinciden con la misma ruta.
             *
             * @param {string} cssFile
             * 
             */

            const loadStylesheet = (cssFile) => {

                if (typeof cssFile !== "string") 
                    return;

                //  -----  Quitar solamente enlaces existentes con la misma ruta  -----
                $(`link[data-page-style="true"][href^="${cssFile}"]`).remove();

                //  -----  Agregar versión  -----
                const versionedHref = `${cssFile}?t=${Date.now()}`;

                $('<link>')
                    
                    .attr({
                        rel: 'stylesheet',
                        href: versionedHref,
                        'data-page-style': 'true'
                    })
                    
                    .appendTo('head');

            };




            /*
                -------------------------------
                ----------  SCRIPTS  ----------
                -------------------------------
            */


            /**
             * ------------------------------------------
             * -----  `loadScriptsByPage(scripts)`  -----
             * ------------------------------------------
             *
             * - Carga múltiples scripts para la página.
             * - Antes elimina los scripts dinámicos previos.
             * 
             * @param {RouteScript[]|object} scripts
             * 
             */

            const loadScriptsByPage = (scripts) => {

                //  -----  Remover scripts anteriores  -----
                //  - Solo elimina scripts cargados por rutas → seguros
                $('script[data-page-script="true"]').remove();

                if (!scripts)
                    return;

                //  -----  Aceptar array o diccionario  -----
                const scriptArray = Array.isArray(scripts)
                    ? scripts
                    : Object.values(scripts);

                //  -----  Cargar los nuevos scripts  -----
                scriptArray.forEach(script => {

                    if (!script?.src)
                        return;

                    //  -----  Cargar el script  -----
                    loadScripts(script.src);

                });
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

                $.ajax({
                    url: scriptUrl,
                    type: 'HEAD',

                    success: function () {

                        $.getScript(scriptUrl)

                            .done(() => {

                                console.log(`Cargado: ${scriptUrl}`);

                                //  -----  Marcarlo como cargado dinámicamente  -----
                                //  - jQuery getScript lo inserta sin permitir modificarlo,
                                //    así que lo buscamos y marcamos el último script añadido.

                                const scripts = document.querySelectorAll('script');

                                const lastScript = scripts[scripts.length - 1];

                                if (lastScript && lastScript.src.includes(scriptUrl)) {
                                    lastScript.dataset.pageScript = "true";
                                }

                            })

                            .fail((jqxhr, settings, exception) =>
                                console.error(`Error en ${scriptUrl}:`, exception)
                            );
                    },

                    error: function () {

                        console.warn(`No existe el script: ${scriptUrl}`);
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
                 * - Ruta normalizada actual (sin base ni barra final)
                 * @type {string}
                 */

                const initialPath = normalize(window.location.pathname);


                /**
                 * - Ruta inicial encontrada en settings.routes
                 * @type {Route|undefined}
                 */
                const route = settings.routes.find(r => normalize(r.path) === initialPath);

                //  -----  Cargar la ruta inicial o la 404  -----
                if (route) {

                    loadContent(route)

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
                    const route404 = settings.routes.find(route => route.id === '404NotFoundPage');

                    //  -----  Si existe la ruta 404, cargarla  -----
                    if (route404)

                        loadContent(route404)

                            .catch(

                                /** @param {Error} err */
                                err => console.error('Error cargando 404', err)
                            );
                }


                //  -----  Reemplazamos el state inicial con un objeto normalizado  -----
                history.replaceState({ id: route?.id || null, path: window.location.pathname }, '', window.location.pathname);

            };



            /*
                -------------------------------
                ----------  EVENTOS  ----------
                -------------------------------
            */


            /*
                -------------------------------------------------------------------
                -----  Manejadores de navegación  -  clicks  ----------------------
                -----  Enlaces: a[data-id] => data-id corresponde a route.id  -----
                -------------------------------------------------------------------
            */
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

                        .catch(

                            /** @param {Error} err */
                            err => console.error('Error loadContent (click):', err)
                        );

                //  -----  Si no existe la ruta, cargar la 404  -----
                else {

                    /**
                     * - Ruta 404
                     * @type {Route|undefined}
                     */

                    const route404 = settings.routes.find(r => r.id === '404NotFoundPage');

                    if (route404)

                        loadContent(route404)

                            .catch(

                                /**@param {Error} err */
                                err => console.error('Error loadContent 404:', err)
                            );
                }

            });



            /*
                ---------------------------------------------------
                -----  Manejadores de navegación - popstate  -----
                -----  popstate: manejar atrás / adelante  -------
                ---------------------------------------------------
            */
            window.addEventListener('popstate', (e) => {

                /**
                 * - Ruta normalizada desde el state o la URL actual
                 * - usar state.path si está presente, si no usar location.pathname
                 * @type {string}
                 */
                const raw = e.state?.path ?? window.location.pathname;

                /**
                 * - Ruta normalizada (sin base ni barra final)
                 * @type {string}
                 */
                const normalized = normalize(raw);

                /**
                 * - Ruta correspondiente a la URL actual
                 * @type {Route|undefined}
                 */
                const route = settings.routes.find(r => normalize(r.path) === normalized);

                //  ----- cargamos la ruta sin empujar otra entrada en el historial  ---------
                //  ----- loadContent(route)  -  hace pushState solo si la ruta difiere  -----
                if (route)

                    loadContent(route)

                        .catch(

                            /** @param {Error} err */
                            err => console.error('Error loadContent (popstate):', err)
                        );

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
