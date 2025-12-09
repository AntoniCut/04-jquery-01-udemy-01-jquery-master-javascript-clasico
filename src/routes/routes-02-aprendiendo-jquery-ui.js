/*
    ----------------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ---------------------------------
    ----------  /01-udemy/01-jquery-master-javascript-clasico/  ----------
    ----------  /src/routes/  --------------------------------------------
    ----------  /routes-02-aprendiendo-jquery-ui.js  ---------------------
    ----------------------------------------------------------------------
*/


/**
 * @typedef {import('../types/route-types.js').Route} Route
 */


/**
 *  - `Array de objetos de tipo Route` que definen las `rutas de la aplicación SPA`
 *  @type {Route[]}
 */

export const routes02AprendiendoJQueryUI = [

    {
        id: 'primerosPasosJQueryUI',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-ui-favicon.ico',
        pageTitle: 'Aprendiendo jQuery UI - Primeros Pasos',
        path: '/aprendiendo-jquery-ui/primeros-pasos/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/02-aprendiendo-jquery-ui/01-jquery-ui-primeros-pasos.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery UI - 1. Primeros Pasos',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/02-aprendiendo-jquery-ui/01-jquery-ui-primeros-pasos.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/02-aprendiendo-jquery-ui/01-jquery-ui-primeros-pasos.js' }
        ]
    },

    {
        id: 'interaccionesJQueryUI',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-ui-favicon.ico',
        pageTitle: 'Aprendiendo jQuery UI - Interacciones',
        path: '/aprendiendo-jquery-ui/interacciones/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/02-aprendiendo-jquery-ui/02-jquery-ui-interacciones.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery UI - 2. Interacciones',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/02-aprendiendo-jquery-ui/02-jquery-ui-interacciones.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/02-aprendiendo-jquery-ui/02-jquery-ui-interacciones.js' }
        ]
    },

    {
        id: 'animacionesEfectosJQueryUI',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-ui-favicon.ico',
        pageTitle: 'Aprendiendo jQuery UI - Animaciones y Efectos',
        path: '/aprendiendo-jquery-ui/animaciones-y-efectos/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/02-aprendiendo-jquery-ui/03-jquery-ui-animaciones-y-efectos.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery UI - 3. Animaciones y Efectos',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/02-aprendiendo-jquery-ui/03-jquery-ui-animaciones-y-efectos.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/02-aprendiendo-jquery-ui/03-jquery-ui-animaciones-y-efectos.js' }
        ]
    },

    {
        id: 'pluginsWidgetsJQueryUI',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-ui-favicon.ico',
        pageTitle: 'Aprendiendo jQuery UI - Plugins y Widgets',
        path: '/aprendiendo-jquery-ui/plugins-y-widgets/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/themes-jquery-ui/layout-header-themes-jquery-ui.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/themes-jquery-ui/layout-navbar-themes-jquery-ui.html',
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/02-aprendiendo-jquery-ui/04-jquery-ui-plugins-y-widgets.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery UI - 4. Plugins y Widgets',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/02-aprendiendo-jquery-ui/04-jquery-ui-plugins-y-widgets.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/02-aprendiendo-jquery-ui/04-jquery-ui-plugins-y-widgets.js' }
        ]
    }
    
];
