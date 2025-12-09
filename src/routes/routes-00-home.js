/*
    ----------------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ---------------------------------
    ----------  /01-udemy/01-jquery-master-javascript-clasico/  ----------
    ----------  /src/routes/  --------------------------------------------
    ----------  /routes-00-home.js  --------------------------------------
    ----------------------------------------------------------------------
*/


/**
 * @typedef {import('../types/route-types.js').Route} Route
 */


/**
 *  - `Array de objetos de tipo Route` que definen las `rutas de la aplicación SPA`
 *  @type {Route[]}
 */

export const routes00Home = [

    {
        id: 'homeJQuery',
        favicon: '/01-udemy/01-jquery-master-javascript-clasico/assets/favicon/jquery-favicon.ico',
        pageTitle: 'jQuery Master JavaScript Clásico de Udemy',
        path: '/',
        components: {
            "#layoutHeader": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-header.html',
            "#btnNavbar": "/01-udemy/01-jquery-master-javascript-clasico/src/components/buttons/btn-navbar.html",
            "#layoutNavbar": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-navbar.html',
            "#layoutNavbarThemesUI": undefined,
            "#layoutMain": '/01-udemy/01-jquery-master-javascript-clasico/src/pages/00-home.html',
            "#layoutFooter": '/01-udemy/01-jquery-master-javascript-clasico/src/components/layout/layout-footer.html',
        },
        headerTitle: 'jQuery del Master de JavaScript Clásico de Udemy de Victor Robles Web',
        styles: [],
        scripts: []
    }
            
];
