/*
    -------------------------------------------------------------
    ----------  /jquery.antonydev.tech/  ------------------------
    ----------  /01-udemy/  -------------------------------------
    ----------  /01-jquery-master-javascript-clasico/  ----------
    ----------  /src/main.js  -----------------------------------
    -------------------------------------------------------------
*/


/**
 * @typedef {import('./libs/jquery/types/cdn-jquery-types.js').CDNJQuery} CDNJQuery
 * @typedef {import('./libs/jquery-ui/types/cdn-jquery-ui-types.js').CDNJQueryUI} CDNJQueryUI
 */


import { cdnJQuery_4_0_0_min} from './libs/jquery/cdn/cdn-jquery-4.0.0.min.js';
import { loadJQueryByCdnOLocal } from "./libs/jquery/load/load-jquery-by-cdn-local.js";


import { cdnJQueryUI_1_14_1_min } from "./libs/jquery-ui/cdn/cdn-jquery-ui-1.14.1.min.js";
import { loadJQueryUIByCdnOLocal } from "./libs/jquery-ui/load/load-jquery-ui-by-cdn-local.js";

import { spaWithMethodLoadFromJQueryPlugins } from "./plugins/spa-with-method-load-from-jquery/v2/jquery.spa-with-method-load-from-jquery.js";
import { spaUdemyJQueryMasterJavaScriptClasico } from "./spa/spa-udemy-jquery-master-javascript-clasico.js";



/* 
    -----------------------------------------
    -----  Efecto Loading de la Página  -----
    -----------------------------------------
*/

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Referencias a los elementos del DOM ----------

    /** 
     *  - Elemento de Carga 
     *  @type {HTMLDivElement|null}
     */
    const loader = document.querySelector('#loader');   // Elemento de carga

    /**
     *  - Elemento de Layout Principal
     *  @type {HTMLDivElement|null}
     */
    const layout = document.querySelector('#layout');   // Contenedor principal

    // ---------- Verificar existencia de elementos ----------
    if (!loader || !layout) {
        console.error("Loader o layout no encontrado en el DOM");
        return;
    }


    // ---------- Retrasar la animación para simular carga ----------
    setTimeout(() => {

        //  -----  Mostrar layout  -----
        layout.style.display = "flex";

        //  -----  Aplicar transición de fade-in al layout  -----
        requestAnimationFrame(() => {
            layout.classList.add("fade-in");
        });

        //  -----  Aplicar fade-out al loader  -----
        loader.classList.add("fade-out");

        //  -----  Una vez que termina la transición del loader, ocultarlo  -----
        loader.addEventListener("transitionend", () => {
            loader.style.display = "none";
        }, { once: true });

    }, 1000);

});



/* 
   ------------------------------
    -----  Carga de jQuery  -----
   ------------------------------
*/

/**
 * - Configuración del `CDN de jQuery`.
 * @type {CDNJQuery}
 */

const cdnJQuery = cdnJQuery_4_0_0_min;

/**
 *  - Ruta del `Archivo jQuery local` a usar como fallback si el CDN falla.
 *  @type {string}
 */

const localJQuery = "./libs/jquery/local/jquery-4.0.0-beta.min.js";



/* 
   ---------------------------------
    -----  Carga de jQuery UI  -----
   ---------------------------------
*/

/**
 *  - Configuración del `CDN de jQuery UI`.
 *  @type {CDNJQueryUI}
 */

const cdnJQueryUI = cdnJQueryUI_1_14_1_min;


/**
 *  - Ruta del `Archivo jQuery UI local` a usar como fallback si el CDN falla.
 *  @type {string}
 */
const localJQueryUI = "./libs/jquery-ui/local/jquery-ui-1.14.1.min.js";



/* 
    -----------------------------------------------------------
    -----  Ejecución de Promesas para Carga de Librerías  -----
    -----------------------------------------------------------
*/

console.log('\n');
console.warn("-----  Iniciando carga de jQuery y jQueryUI...  -----");
console.log('\n');


//  -----  Carga jQuery  -----
loadJQueryByCdnOLocal(cdnJQuery, localJQuery)

    .then(

        /**  
         *  - Instancia de jQuery
         *  @param {JQueryStatic} $   
         */

        ($) => {

            console.warn("jQuery cargado correctamente - Versión:", $.fn.jquery);

            //  -----  Carga jQuery UI  -----
            return loadJQueryUIByCdnOLocal(cdnJQueryUI, localJQueryUI)

                .then(

                    /**  
                     *  - Instancia de jQuery  
                     *  @param {JQueryStatic} $
                     * */

                    ($) => {


                        if (!$.ui) {
                            console.log('\n');
                            throw new Error("jQuery UI no se cargó correctamente.");
                        }

                        console.warn("jQuery UI cargado correctamente - Versión:", $.ui.version);

                        //  -----  Ejecuta plugin que carga el contenido dinámico  -----
                        spaWithMethodLoadFromJQueryPlugins();

                        //  -----  Ejecuta script principal del proyecto  -----
                        spaUdemyJQueryMasterJavaScriptClasico();

                        //  ----- Limpia la consola después de 10 segundos  -----
                        //setTimeout(() => console.clear(), 10000);

                    });

        })


    .catch(

        /**
         * - Manejo de `Errores` en la carga de jQuery o jQuery UI .
         *  @param {Error} err 
         */
        err => console.error("Error al cargar jQuery o jQuery UI:", err));

