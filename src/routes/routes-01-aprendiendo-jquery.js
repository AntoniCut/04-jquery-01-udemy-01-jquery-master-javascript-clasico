/*
    ----------------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ---------------------------------
    ----------  /01-udemy/01-jquery-master-javascript-clasico/  ----------
    ----------  /src/routes/  --------------------------------------------
    ----------  /routes-01-aprendiendo-jquery.js  ------------------------
    ----------------------------------------------------------------------
*/


/**
 * @typedef {import('../types/route-types.js').Route} Route
 */


/**
 *  - `Array de objetos de tipo Route` que definen las `rutas de la aplicación SPA`
 *  @type {Route[]}
 */

export const routes01AprendiendoJQuery = [

    {
        id: 'primerosPasosJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Primeros Pasos',
        path: '/aprendiendo-jquery/primeros-pasos/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/01-jquery-primeros-pasos.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 1. Primeros Pasos',   
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/01-jquery-primeros-pasos.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/01-jquery-primeros-pasos.js' }
        ]
    },

    {
        id: 'selectoresJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Selectores',
        path: '/aprendiendo-jquery/selectores/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/02-jquery-selectores.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 2. Selectores',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/02-jquery-selectores.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/02-jquery-selectores.js' }
        ]
    },

    {
        id: 'eventosJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Eventos',
        path: '/aprendiendo-jquery/eventos/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/03-jquery-eventos.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 3. Eventos',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/03-jquery-eventos.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/03-jquery-eventos.js' }
        ]
    },

    {
        id: 'domJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Manipulación del DOM',
        path: '/aprendiendo-jquery/manipulacion-dom/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/04-jquery-manipulacion-dom.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 4. Manipulación del DOM',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/04-jquery-manipulacion-dom.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/04-jquery-manipulacion-dom.js' }
        ]
    },

    {
        id: 'efectosJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Efectos en jQuery',
        path: '/aprendiendo-jquery/efectos/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/05-jquery-efectos.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 5. Efectos en jQuery',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/05-jquery-efectos.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/05-jquery-efectos.js' }
        ]
    },

    {
        id: 'animacionesJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Animaciones Personalizadas y Callback en Funciones',
        path: '/aprendiendo-jquery/animaciones-personalizadas/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/06-jquery-animaciones-personalizadas.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 6. Animaciones Personalizadas y Callback en Funciones',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/06-jquery-animaciones-personalizadas.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/06-jquery-animaciones-personalizadas.js' }
        ]
    },

    {
        id: 'peticionesAjaxJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Aprendiendo jQuery - Peticiones Ajax',
        path: '/aprendiendo-jquery/peticiones-ajax/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/01-aprendiendo-jquery/07-jquery-peticiones-ajax.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'Aprendiendo jQuery - 7. Peticiones Ajax',
        styles: [
            { href: '/01-udemy/01-jquery-master-javascript-clasico/src/styles/01-jquery/07-jquery-peticiones-ajax.css' }
        ],
        scripts: [
            { src: '/01-udemy/01-jquery-master-javascript-clasico/src/scripts/01-aprendiendo-jquery/07-jquery-peticiones-ajax.js' }
        ]
    }
        
];
