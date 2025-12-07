/*  
    -------------------------------------------------
    ----------  /jquery-ui/load/  -------------------
    ----------  /load-jquery-ui-by-cdn.js  ----------
    -------------------------------------------------
*/


/**
 * @typedef {import('../types/cdn-jquery-ui-types.js').CDNJQueryUI} CDNJQueryUI
 */


import { loadJQueryUIByLocal } from './load-jquery-ui-by-local.js';



/** 
 *  - `Carga jQuery desde un CDN`.
 *  @param {CDNJQueryUI} cdnJQueryUI 
 *  @param {string} localJQueryUI 
 *  @param {Function} resolve 
 *  @param {Function} reject
 */

//  -----  Función para cargar jQuery si desde CDN  -----
export const loadJQueryUIByCdn = (cdnJQueryUI, localJQueryUI, resolve, reject) => {

    
    const {
        srcCdn,
        integrity,
        crossOrigin,
        referrerPolicy
    } = cdnJQueryUI;

    const script = document.createElement("script");

    script.src = srcCdn;

    if (integrity)
        script.integrity = integrity;

    if (crossOrigin)
        script.crossOrigin = crossOrigin;

    if (referrerPolicy)
        script.referrerPolicy = referrerPolicy;


    script.onload = () => {

        if (jQuery.ui) {
            
            console.warn("jQuery UI cargado desde CDN");
            resolve(jQuery);
            
        } else {
            reject(new Error("jQuery UI no cargado correctamente desde CDN"));
        }

    };


    script.onerror = () => {

        console.error("Error al cargar jQuery UI desde CDN. Intentando cargar localmente...");
        
        //  -----  Si el CDN falla, carga jQuery UI localmente  -----
        loadJQueryUIByLocal(localJQueryUI, resolve, reject);
    };

    document.head.appendChild(script);

}
