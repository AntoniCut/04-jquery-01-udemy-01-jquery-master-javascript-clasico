/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/types/  ------------------------------------
    ----------  /routes-types.js  -------------------------------
    -------------------------------------------------------------
*/


//  ----------  Esto asegura que VS Code lo trate como módulo  ----------
export { };



/**
 * -------------------------------
 * -----  `RouteComponents`  -----
 * -------------------------------
 * 
 * - Mapa de componentes HTML a cargar dinámicamente.
 * - Cada valor puede ser string o undefined.
 *
 * @typedef {Record<string, string|undefined>} RouteComponents
 * 
 */


/**
 * --------------------------
 * -----  `RouteStyle` -----
 * --------------------------
 * 
 * - Representa una hoja de estilos que debe cargarse dinámicamente.
 * 
 * @typedef {Object} RouteStyle
 * @property {string} href - Ruta absoluta o relativa del archivo CSS.
 * 
 */


/**
 * --------------------------
 * -----  `RouteScript` -----
 * --------------------------
 * 
 * - Representa un script que debe cargarse dinámicamente.
 * 
 * @typedef {Object} RouteScript
 * @property {string} src - Ruta absoluta o relativa del archivo JS.
 * 
 */


/**
 * ---------------------
 * -----  `Route`  -----
 * ---------------------
 * 
 *  - Objeto que define la configuración de una ruta en la aplicación SPA.
 *
 * @typedef {Object} Route
 *
 * @property {string} id  - Identificador único de la ruta (usado en los enlaces `data-id`).
 *
 * @property {string} path - Ruta relativa del navegador (usada en `history.pushState`).
 *
 * @property {RouteComponents} components
 * 
 *      Objeto dinámico donde la clave es el selector CSS
 *       y el valor es la ruta al archivo HTML que se cargará en ese contenedor.
 *
 *      Ejemplo:
 *      {
 *          "#layoutHeader": "/src/components/layout/header.html",
 *          "#layoutMain": "/src/pages/home.html",
 *          "#widgetPromo": "/src/components/widgets/promo.html"
 *      }
 *
 * @property {string} favicon - Ruta del favicon que se mostrará en la pestaña del navegador.
 *
 * @property {string} pageTitle - Título que se asignará al documento (`document.title`).
 *
 * @property {string} headerTitle - Texto mostrado en el encabezado principal de la vista.
 *
 * @property {RouteStyle[]|null} [styles] - Lista de hojas de estilos asociada a la vista (opcional).
 *
 * @property {RouteScript[]|null} [scripts] - Lista de archivos JavaScript adicionales que deben cargarse (opcional).
 * 
 */
