/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/types/  ------------------------------------
    ----------  /config-option-spa-types.js  --------------------
    -------------------------------------------------------------
*/


/**
 * @typedef {import('./route-types.js').Route} Route
 */


//  ----------  Esto asegura que VS Code lo trate como módulo  ----------
export {};


/**
 *  - Objeto que define la configuración para el plugin `spaWithMethodLoadFromJQuery`
 *  - Versión actualizada al nuevo sistema de carga dinámica por componentes
 *
 * @typedef {Object} ConfigOptionsSPA
 * @property {Route[]} routes - Conjunto de rutas definidas para la SPA.
 * @property {string} base - Ruta base para el manejo de navegación (puede ser una cadena vacía).
 * @property {boolean} draggable - Habilita o deshabilita funciones de arrastre dentro de la SPA.
 */
