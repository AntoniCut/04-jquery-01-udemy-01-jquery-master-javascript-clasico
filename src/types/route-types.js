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
 *  - Objeto que define la configuración de una ruta en la aplicación SPA.
 *
 * @typedef {Object} Route
 *
 * @property {string} id  - Identificador único de la ruta (usado en los enlaces `data-id`).
 *
 * @property {string} path
 *      Ruta relativa del navegador (usada en `history.pushState`).
 *
 * @property {Object.<string,string>} components
 *      Objeto dinámico donde la clave es el selector CSS
 *      y el valor es la ruta al archivo HTML que se cargará en ese contenedor.
 *
 *      Ejemplo:
 *      {
 *          "#layoutHeader": "/src/components/layout/header.html",
 *          "#layoutMain": "/src/pages/home.html",
 *          "#widgetPromo": "/src/components/widgets/promo.html"
 *      }
 *
 * @property {string} favicon
 *      Ruta del favicon que se mostrará en la pestaña del navegador.
 *
 * @property {string} pageTitle
 *      Título que se asignará al documento (`document.title`).
 *
 * @property {string} headerTitle
 *      Texto mostrado en el encabezado principal de la vista.
 *
 * @property {string|null} [styles]
 *      Hoja de estilos asociada a la vista (opcional).
 *
 * @property {string[]|null} [scripts]
 *      Lista de archivos JavaScript adicionales que deben cargarse (opcional).
 */
