/*
    --------------------------------------------------------------------
    ----------  /jquery.spa-whith-method-load-from-jquery.js  ----------
    --------------------------------------------------------------------
*/


//  ----------  Envuelve el plugin en una función de modulos ES6  ----------
export const spaWithMethodLoadFromJQueryPlugins = ($) => {


    (function ($) {

        //  ----------  Plugins jquery.spa-with-jquery.js  ----------
        $.fn.spaWithMethodLoadFromJQuery = function (options) {

            const settings = $.extend({
                routes: undefined,
                base: undefined,
                selectorTheme: undefined,
                layoutHeader: undefined,
                layoutNavbar: undefined,
                layoutMain: undefined,
                layoutAside: undefined,
                layoutFooter: undefined,
                urlHeader: undefined,
                urlNavBar: undefined,
                urlFooter: undefined,
                urlHome: undefined,
                titlePage: undefined,
                homePath: undefined,
                faviconPage: undefined,
                titleHeader: undefined,
                draggable: undefined
            }, options);



            //  ----------  referencias al HTML  ----------
            const $selectorTheme = $(settings.selectorTheme);
            const $layoutNavbar = $(settings.layoutNavbar);
            const $slider = $(settings.slider);
            const $layoutMain = $(settings.layoutMain);
            const $layoutAside = $(settings.layoutAside);
            const $layoutFooter = $(settings.layoutFooter);

                        
            //  ---------------------------------------------------------------------
            //  ----------  función para la Carga de los Componentes HTML  ----------
            //  ---------------------------------------------------------------------
            function loadInitialComponentsHtml() {

                $selectorTheme.load(settings.urlSelectorTheme);
                $layoutNavbar.load(settings.urlLayoutNavBar);
                $slider.load(settings.urlSlider);
                $layoutAside.load(settings.urlLayoutAside);
                $layoutFooter.load(settings.urlLayoutFooter);

                if (settings.draggable)
                    draggableComponentsHtml();
            }


            //  --------------------------------------------------------------------
            //  ----------  función para mover componentes por la página  ----------
            //  --------------------------------------------------------------------
            function draggableComponentsHtml() {

                //  ----------  Hacemos los menús arrastrables  ----------
                $selectorTheme.draggable({
                    containment: 'window',
                    scroll: false
                });
                
                $layoutNavbar.draggable({
                    containment: 'window',
                    scroll: false
                });

                $slider.draggable({
                    containment: 'window',
                    scroll: false
                });

            }


            //  -------------------------------------------------------------------
            //  ----------  función para la Carga del Contenido Inicial  ----------
            //  -------------------------------------------------------------------
            function loadInitialContent() {

                const initialPath = window.location.pathname.replace(settings.base, '');
                const initialRoute = settings.routes.find(route => route.path === initialPath);

                if (initialRoute) {

                    loadContent(initialRoute);

                } else {

                    loadContent({
                        url: settings.urlHome,
                        title: settings.titlePage,
                        path: settings.homePath,
                        favicon: settings.faviconPage,
                        headerTitle: settings.titleHeader,
                        styles: settings.urlHome,
                        scripts: [settings.urlHome]
                    });

                }

                //  ----------  Guarda el estado inicial para que el botón "Atrás" funcione correctamente  ----------
                history.replaceState({ path: window.location.pathname }, '', window.location.pathname);
            }


            //  ------------------------------------------------------------------
            //  ----------  Función para manejar la carga de contenido  ----------
            //  ------------------------------------------------------------------
            function loadContent(route) {

                const doLoad = () => new Promise((resolve) => {

                    $layoutMain.load(route.url, function (response, status, xhr) {

                        if (status === "error") {

                            console.error(`Error al cargar ${route.url}: ${xhr.statusText}`);
                            $layoutMain.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                            return resolve();

                        } else {

                            //  -----  Cambiamos el title de la página  -----
                            document.title = route.title;

                            //  -----  Solo cambia la URL si es diferente a la actual  -----
                            const newUrl = `${settings.base}${route.path}`;

                            if (window.location.pathname !== newUrl) {
                                history.pushState({ path: newUrl }, '', newUrl);
                            }

                            //  -----  Actualizar el favicon  -----
                            updateFavicon(route.favicon);

                            //  -----  Esperar a que el layoutHeader esté cargado -----
                            $(settings.layoutHeader).load(settings.urlLayoutHeader, function () {
                                $('#titlePage').text(route.headerTitle);
                            });

                            //  -----  Cargar la hoja de estilos de la página  -----
                            if (route.styles)
                                loadStylesheet(route.styles);

                            //  -----  Cargar scripts si existen  -----
                            if (route.scripts)
                                route.scripts.forEach(script => loadScriptsIfExists(script));

                            return resolve();
                        }

                    });

                });

                // ---------------------------
                //      🟢 VIEW TRANSITION
                // ---------------------------
                if (document.startViewTransition) {
                    document.startViewTransition(() => doLoad());
                } else {
                    doLoad();
                }
            }


            //  --------------------------------------------------------
            //  ----------  Función que Actualiza el Favicon  ----------
            //  --------------------------------------------------------
            function updateFavicon(favicon) {

                let $favicon = $('link[rel~="icon"]');

                if ($favicon.length === 0) {
                    $favicon = $('<link rel="icon" type="image/x-icon">').appendTo('head');
                }

                $favicon.attr('href', `${favicon}?t=${new Date().getTime()}`);

            }


            //  ------------------------------------------------------------------
            //  ----------  Función que Carga los estilos de la página  ----------
            //  ------------------------------------------------------------------
            function loadStylesheet(cssFile) {

                let $stylesheet = $(`link[href*="${cssFile}"]`);
                if ($stylesheet.length === 0) {
                    $stylesheet = $('<link rel="stylesheet">').appendTo('head');
                }
                $stylesheet.attr('href', `${cssFile}?t=${new Date().getTime()}`);
            }


            //  ------------------------------------------------------------------
            //  ----------  Función que Carga un Script si este Existe  ----------
            //  ------------------------------------------------------------------
            function loadScriptsIfExists(scriptUrl) {

                $.ajax({

                    url: scriptUrl,
                    type: 'HEAD',

                    success: function () {

                        $.getScript(scriptUrl)
                            .done(() => console.log(`Cargado: ${scriptUrl}`))
                            .fail((jqxhr, settings, exception) => console.error(`Error en ${scriptUrl}:`, exception));
                    },

                    error: function () {
                        console.warn(`No existe el script: ${scriptUrl}`);
                    }

                });

            }


            //  -----------------------------------------------------------
            //  ----------  Manejador de clics para los enlaces  ----------
            //  -----------------------------------------------------------
            $(document).on('click', 'a[id]', function (event) {

                event.preventDefault();

                const id = $(this).attr('id');
                const route = settings.routes.find(route => route.id === id);

                //  -----  si hemos clicado en una seccion del menú  -----
                //  -----  cargamos el contenido de la sección  ----------
                if (route)
                    loadContent(route);
                
            });


            //  ----------------------------------------------------------
            //  ----------  Manejar retrocesos en el historial  ----------
            //  ----------------------------------------------------------
            window.addEventListener('popstate', function (event) {

                //  -----  Usar `event.state.path` si está disponible, si no, tomar la URL actual  -----
                const matchedPath = event.state?.path ? event.state.path.replace(settings.base, '') : window.location.pathname.replace(settings.base, '');
                const matchedRoute = settings.routes.find(route => route.path === matchedPath);

                if (matchedRoute) {

                    loadContent(matchedRoute);

                    if (matchedRoute.path === '/')
                        $layoutNavbar.load(settings.urlNavBar);

                } else
                    loadInitialContent();

            });


            //  ----------  Cargamos los Componentes HTML y el Contenido Inicial  ----------
            console.log('\n');
            console.warn('pluging - jquery.spa-with-method-load-from-jquery.js - cargado correctamente');

            loadInitialComponentsHtml();
            loadInitialContent();

        };


    })(jQuery);


}
