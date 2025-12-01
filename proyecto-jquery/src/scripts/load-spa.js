/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /06-spa-proyecto-html5-css3-javascript-jquery/  -----------------
    ----------  /src/scripts/  --------------------------------------------------
    ----------  /load-spa.js  ---------------------------------------------------
    -----------------------------------------------------------------------------    
*/

import { routesPages } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/routes/routes-pages.js";



export const loadSpa = ($) => {

    
    //  ----------  Documento Cargado  ----------
    console.log('\n');
    console.warn('-----  load-spa.js  -----');
       
    
    //  ----------  Arrays con la informacion del contenido a cargar de las rutas del proyecto ----------
    const allRoutes = [...routesPages];

  
    //  ----------  referencias al HTML  ----------
    const $layout = $('#layout');


    //  ----------  Opciones que le pasamos al plugins  ----------
    const configOptions = {
        
        routes: allRoutes,
        base: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery',
        
        selectorTheme: '#selectorTheme',
        layoutHeader: '#layoutHeader',
        titlePage: '#titlePage',
        layoutNavbar: '#layoutNavbar',
        slider: '#slider',
        layoutMain: '#layoutMain',
        layoutAside: '#layoutAside',
        layoutFooter: '#layoutFooter',
        
        urlSelectorTheme: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/components-layout/selector-theme.html',
        urlLayoutHeader: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/components-layout/layout-header.html',
        urlLayoutNavBar: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/components-layout/layout-navbar.html',
        urlSlider: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/components-layout/slider.html',
        urlLayoutAside: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/components-layout/layout-aside.html',
        urlLayoutFooter: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/components-layout/layout-footer.html',
        
        urlHome: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/pages/inicio/index.html',
        titlePage: 'Proyecto SPA con HTML 5, CSS 3, JavaScript y jQuery',
        homePath: '/',
        faviconPage: '/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/favicon/jquery-favicon-original.ico',
        titleHeader: 'Inicio',
        draggable: true
    }


    //  ----------  Invocamos el Plugins  --  jquery.spa-with-method-load-from-jquery.js  ----------
    $layout.spaWithMethodLoadFromJQuery(configOptions);

}
