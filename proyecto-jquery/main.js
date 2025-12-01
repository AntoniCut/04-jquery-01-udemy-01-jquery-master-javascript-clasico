/*
    -----------------------------------------------------------------------------
    ----------  /04-master-javascript-clasico-jquery-typescript-mean/  ----------
    ----------  /06-spa-proyecto-html5-css3-javascript-jquery/  -----------------
    ----------  /main.js  -------------------------------------------------------
    -----------------------------------------------------------------------------
*/


//  -----  import libs jQuery  -----
import { cdnJQuery_3_1_1 } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/libs/jquery/cdn/cdn-jquery-3.1.1.js";
import { loadJQueryByCdnOLocal } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/libs/jquery/load/load-jquery-by-cdn-local.js";
//import { bxSlider } from "/04-master-javascript-clasico-jquery-typescript-mean/05-proyecto-html5-css3-javascript-jquery/src/plugins/bxslider-4-4.2.17/dist/jquery.bxslider-module.min.js";

//  -----  import libs jQuery UI  -----
import { cdnJQueryUI_1_14_1 } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/libs/jquery-ui/cdn/cdn-jquery-ui-1.14.1.js";
import { loadJQueryUIByCdnOLocal } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/libs/jquery-ui/load/load-jquery-ui-by-cdn-local.js";


//  -----  import de los plugins del proyecto  -----
import { spaWithMethodLoadFromJQueryPlugins } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/plugins/spa-with-method-load-from-jquery/jquery.spa-with-method-load-from-jquery-module.js";
//import { bxSlider } from "/04-master-javascript-clasico-jquery-typescript-mean/proyecto-jquery/src/plugins/bxslider-4-4.2.17/dist/jquery.bxslider-module.min.js";
import { jQueryFormValidator } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/plugins/jquery.form-validator-2.3.79/jquery.form-validator-module.min.js";

//  -----  import del script principal del proyecto  -----
import { loadSpa } from "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/scripts/load-spa.js";



//  -----  carga de jQuery  -----
const cdnJQuery = cdnJQuery_3_1_1;
const localJQuery = "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/libs/jquery/local/jquery-3.1.1.min.js";

//  -----  carga de jQuery UI  -----
const cdnJQueryUI = cdnJQueryUI_1_14_1;
const localJQueryUI = "/01-udemy/01-jquery-master-javascript-clasico/proyecto-jquery/src/libs/jquery-ui/local/jquery-ui-1.14.1.min.js";
//  -----  url plugin jquery.spa-with-method-load-from-jquery.js  -----
const scriptMain = loadSpa;



/* 
    -----------------------------------------
    -----  Efecto Loading de la Página  -----
    -----------------------------------------
*/

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Referencias a los elementos del DOM ----------

    /** - Elemento de Carga 
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


//  ------------------------------------------------------------------------------------
//  -----  Ejecutamos la Promesa de carga de jQuery y el script del proyecto  ----------
//  ------------------------------------------------------------------------------------
console.warn("Iniciando carga de jQuery y jQueryUI...");
console.log('\n')

loadJQueryByCdnOLocal(cdnJQuery, localJQuery)

    .then($ => {

        console.warn("jQuery cargado correctamente - Version:", $.fn.jquery);

        //  -----  cargamos jQueryUI  -----
        loadJQueryUIByCdnOLocal(cdnJQueryUI, localJQueryUI)

            .then($ => {

                if (!$.ui) {
                    console.log('\n');
                    throw new Error("jQuery UI no se cargó correctamente.");
                }

                console.warn("jQuery UI cargado correctamente - Version:", $.ui.version);

                //bxSlider($);                                //  -----  cargamos el plugin bxSlider  ----- 
                spaWithMethodLoadFromJQueryPlugins($);      //  -----  cargamos el plugin que carga el contenido  -----
                jQueryFormValidator($);                     //  -----  cargamos el plugin de validación de formularios  -----

                //  -----  cargamos el script principal del proyecto  -----
                scriptMain($);
               
            })

    })

    .catch(err => console.error("Error al cargar jQuery o jQuery UI:", err));



//  ----------------------------------------------------------------------------------------
//  ----------  Función que carga el script del proyecto de la lógica con jQuery  ----------
//  ---------------------------------------------------------------------------------------- 
/*
function loadScript(scriptUrl) {

    $.ajax({

        url: scriptUrl,
        type: 'HEAD',

        success: function () {

            $.getScript(scriptUrl)
                .done(() => console.log(`Cargado: ${scriptUrl}`))
                .fail((jqxhr, settings, exception) => console.error(`Error en ${scriptUrl}:`, exception));
        },

        error: function () {
            console.warn(`No existe el script: ${scriptUrl}`);
        }

    });

}
*/