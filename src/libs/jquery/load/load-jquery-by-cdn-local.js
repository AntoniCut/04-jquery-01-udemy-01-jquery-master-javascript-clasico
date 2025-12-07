/*  
    ----------------------------------------------------
    ----------  /jquery/load/  -------------------------
    ----------  /load-jquery-by-cdn-local.js  ----------
    ----------------------------------------------------
*/


/**
 * @typedef {import('../types/cdn-jquery-types.js').CDNJQuery} CDNJQuery
 */


import { loadJQueryByCdn } from './load-jquery-by-cdn.js';
import { loadJQueryByLocal } from './load-jquery-by-local.js';



/** 
 *  - `Carga jQuery desde un CDN con fallback a local si falla`
 *  @param {CDNJQuery|null} cdnJQuery 
 *  @param {string} localJQuery 
 *  @returns {Promise<JQueryStatic>}
 */

export const loadJQueryByCdnOLocal = (cdnJQuery = null, localJQuery) => {



    return new Promise((resolve, reject) => {

        //  -----  Verifica si jQuery ya está cargado  -----
        
        /** 
         *  - Instancia de jQuery
         *  @type {JQueryStatic} 
         */
        
        //@ts-ignore
        const $ = window.jQuery;
        
        if ($) {
            
            console.warn("jQuery ya estaba cargado:", $.fn.jquery);
            return resolve($);
        }


         //  -----  Si NO se pasó CDN, cargar directo desde local  -----
        if (!cdnJQuery || !cdnJQuery.srcCdn) {

            console.error("No se definió CDN de jQuery, cargando desde local...");
            loadJQueryByLocal(localJQuery, resolve, reject);
            return;
        }

        
        loadJQueryByCdn(cdnJQuery, localJQuery, resolve, reject);
                

    });


}
