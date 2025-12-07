/*
    -----------------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ----------------------------------
    ----------  /01-udemy/  -----------------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  --------------------
    ----------  /src/spa/  ------------------------------------------------
    ----------  /spa-udemy-jquery-master-javascript-clasico.js/  ----------
    -----------------------------------------------------------------------
*/



/**
 * @typedef {import('../types/route-types.js').Route} Route
 * @typedef {import('../types/config-option-spa-types.js').ConfigOptionsSPA} ConfigOptionsSPA
 */


import { routes00Home } from "../routes/routes-00-home.js";
import { routes01AprendiendoJQuery } from "../routes/routes-01-aprendiendo-jquery.js";
import { routes02AprendiendoJQueryUI } from "../routes/routes-02-aprendiendo-jquery-ui.js";



/**
 *  ------------------------------------
 *  ----- `spaJQueryAntonydevTech` -----
 *  ------------------------------------
 * 
 * - Inicializa la lógica SPA usando jQuery.
 * - Configura las rutas del proyecto `01-jquery-master-javascript-clasico` y las pasa al plugin dinámico
 *   `spaWithMethodLoadFromJQuery`.
 * - Se encarga únicamente de:
 *   -   ✔ cargar las rutas
 *   -   ✔ pasar la configuración al plugin
 *   -   ✔ inicializar la SPA
 */

export const spaUdemyJQueryMasterJavaScriptClasico = () => {


    console.log('\n');
    console.warn('-----  spa-udemy-jquery-master-javascript-clasico.js  -----');
    console.log('\n');

    
    /**
     * - Array que combina todas las rutas definidas para la aplicación SPA.
     * @type {Route[]}
     */

    const allRoutes = [
        ...routes00Home,
        ...routes01AprendiendoJQuery,
        ...routes02AprendiendoJQueryUI
    ];


    /** 
     * -  Elemento raíz de la aplicación SPA.
     * -  Selecciona el contenedor principal de la aplicación SPA utilizando jQuery.
     * @type {JQuery<HTMLDivElement>}
     */

    const $layout = $('#layout');


    /**
     * - Opciones para el plugin SPA
     *
     * @example - route.components = { "#selector": "archivo.html" }
     *
     * @type {ConfigOptionsSPA}
     */


    const configOptions = {
        routes: allRoutes,
        base: '/01-udemy/01-jquery-master-javascript-clasico',
        draggable: true
    }


    //  ----------  Invocamos el Plugins  --  jquery.spa-with-method-load-from-jquery.js - v2  ----------
    $layout.spaWithMethodLoadFromJQuery(configOptions);


}
