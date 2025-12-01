/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /06-spa-proyecto-html5-css3-javascript-jquery/  -----------------
    ----------  /src/routes/  ---------------------------------------------------
    ----------  /routes-pages.js  -----------------------------------------------
    -----------------------------------------------------------------------------
*/


const base = '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery';
const favicon = `${base}/src/favicon/jquery-favicon-original.ico`;


//  -----  Array de objetos con los IDs y las rutas correspondientes  -----
export const routesPages = [

    {
        id: 'pageInicio',
        url: `${base}/src/pages/inicio/index.html`,
        title: 'Inicio - Proyecto SPA con HTML 5, CSS 3, JavaScript y jQuery',
        path: '/',
        favicon: favicon,
        headerTitle: 'Inicio',
        styles: `${base}/src/styles/posts.css`,
        scripts: [
            `${base}/src/scripts/selector-theme.js`,
            `${base}/src/plugins/bxslider-4-4.2.17/dist/jquery.bxslider.min.js`,
            `${base}/src/scripts/slider.js`,
            `${base}/src/scripts/scroll.js`,
            `${base}/src/scripts/posts.js`,
            `${base}/src/scripts/login.js`
        ]
    },

    {
        id: 'pageAbout',
        url: `${base}/src/pages/about/index.html`,
        title: 'About - Proyecto SPA con HTML 5, CSS 3, JavaScript y jQuery',
        path: '/about',
        favicon: favicon,
        headerTitle: 'About',
        styles: `${base}/src/styles/about.css`,
        scripts: [
            `${base}/src/scripts/selector-theme.js`,
            `${base}/src/plugins/bxslider-4-4.2.17/dist/jquery.bxslider.min.js`,
            `${base}/src/scripts/slider.js`,
            `${base}/src/scripts/scroll.js`,
            `${base}/src/scripts/about.js`,
            `${base}/src/scripts/login.js`
        ]
    },

    {
        id: 'pageContacto',
        url: `${base}/src/pages/contacto/index.html`,
        title: 'Contacto - Proyecto SPA con HTML 5, CSS 3, JavaScript y jQuery',
        path: '/contacto',
        favicon: favicon,
        headerTitle: 'Contacto',
        styles: `${base}/src/styles/contacto.css`,
        scripts: [
            `${base}/src/scripts/selector-theme.js`,
            `${base}/src/plugins/bxslider-4-4.2.17/dist/jquery.bxslider.min.js`,
            `${base}/src/scripts/slider.js`,
            `${base}/src/scripts/scroll.js`,
            `${base}/src/scripts/contacto.js`,
            `${base}/src/scripts/login.js`
        ]
    },

    {
        id: 'pageReloj',
        url: `${base}/src/pages/reloj/index.html`,
        title: 'Reloj - Proyecto SPA con HTML 5, CSS 3, JavaScript y jQuery',
        path: '/reloj',
        favicon: favicon,
        headerTitle: 'Reloj',
        styles: `${base}/src/styles/reloj.css`,
        scripts: [
            `${base}/src/scripts/selector-theme.js`,
            `${base}/src/plugins/bxslider-4-4.2.17/dist/jquery.bxslider.min.js`,
            `${base}/src/scripts/slider.js`,
            `${base}/src/scripts/scroll.js`,
            `${base}/src/scripts/reloj.js`,
            `${base}/src/scripts/login.js`
        ]
    },
    
];
