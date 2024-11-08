function formatPromoText(e){let t=e.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_");return/^\d/.test(t)&&(t="xx_"+t),t}function removeExistingBadges(){document.querySelectorAll(".product_badge").forEach((e=>e.remove()));document.querySelectorAll(".promo_message").forEach((e=>e.remove()))}function displayPromoMessage(){const e=document.querySelector(".frontattributes-container .small-description tbody");if(e){const t=Array.from(e.getElementsByTagName("th")).find((e=>"Promotion"===e.textContent.trim()));if(t){const e=t.nextElementSibling;if(e){const t=e.textContent.trim(),o=formatPromoText(t)+"_badge",r="#"+formatPromoText(t)+"_container",n=document.querySelector(".cmp-productdetails__found-left .carousel__imageContainer"),i=document.querySelector(r);if(i&&(i.style.display="block"),n){removeExistingBadges();const e=document.createElement("div");e.classList.add("product_badge",o),n.appendChild(e)}if("spend_save"==formatPromoText(t)||"buy_3_save_30"==formatPromoText(t)){const e=document.querySelector(".cmp-productdetails__found-right");if(!e)return;const o=e.querySelector(".price-container"),r=e.querySelector(".price");if(!r||!r.firstElementChild||!r.firstElementChild.textContent.includes("$"))return void console.log("$ symbol not found in the first child of the price element. Exiting.");if(!o)return void console.error("Selling price element not found.");const n=parseInt(o.getAttribute("data-product-price"),10);if(isNaN(n))return void console.error("Invalid price value detected. Exiting.");const i=o.querySelector(".promo_message");if(i&&i.remove(),"spend_save"==formatPromoText(t)&&n>=175){const e=document.createElement("div");e.classList.add("promo_message"),e.style.fontSize="75%",e.style.letterSpacing="1.1px";const t=document.createElement("span");t.style.color="crimson";const r=document.createTextNode("OFFER: ");t.appendChild(r);const i=document.createTextNode("Save "),c=document.createTextNode(""),a=document.createElement("strong");n>=325?(c.textContent="$75 with code ",a.textContent="75SAVE",a.style.padding="0 4px"):n>=250?(c.textContent="$50 with code ",a.textContent="50SAVE",a.style.padding="0 4px"):n>=175&&(c.textContent="$25 with code ",a.textContent="25SAVE",a.style.padding="0 4px"),t&&i&&c&&a&&(e.appendChild(t),e.appendChild(i),e.appendChild(c),e.appendChild(a),o.appendChild(e))}else if("buy_3_save_30"==formatPromoText(t)){const e=document.createElement("div");e.classList.add("promo_message"),e.style.fontSize="75%",e.style.letterSpacing="1.1px";const t=document.createElement("span");t.style.color="crimson";const r=document.createTextNode("OFFER: ");t.appendChild(r);const n=document.createTextNode("Buy 3 Save 30% on Gifting");t&&n&&(e.appendChild(t),e.appendChild(n),o.appendChild(e))}}else if(formatPromoText(t)){const e=document.querySelector(".cmp-productdetails__found-right");if(!e)return;const o=e.querySelector(".price-container"),r=e.querySelector(".price");if(!r||!r.firstElementChild||!r.firstElementChild.textContent.includes("£"))return void console.log("£ symbol not found in the first child of the price element. Exiting.");if(!o)return void console.error("Selling price element not found.");const n=parseInt(o.getAttribute("data-product-price"),10);if(isNaN(n))return void console.error("Invalid price value detected. Exiting.");const i=o.querySelector(".promo_message");i&&i.remove();const c=document.createElement("div");c.classList.add("promo_message",formatPromoText(t)+"_promo_message"),c.style.fontSize="75%",c.style.letterSpacing="1.1px",o.appendChild(c)}}}}}document.addEventListener("DOMContentLoaded",(()=>{try{document.querySelector("coral-actionbar.header-main.coral3-ActionBar")||setTimeout(displayPromoMessage,500)}catch(e){console.error("Error in DOMContentLoaded listener:",e)}}));let fallbackTimeoutPromo,isFirstLoadPromo=!0;window.addEventListener("load",(()=>{try{const e=document.querySelector("coral-actionbar.header-main.coral3-ActionBar");isFirstLoadPromo&&!e&&(setTimeout(displayPromoMessage,500),isFirstLoadPromo=!1,clearTimeout(fallbackTimeoutPromo))}catch(e){console.error("Error in load event listener:",e)}})),fallbackTimeoutPromo=setTimeout((()=>{try{const e=document.querySelector("coral-actionbar.header-main.coral3-ActionBar");isFirstLoadPromo&&!e&&(setTimeout(displayPromoMessage,500),isFirstLoadPromo=!1)}catch(e){console.error("Error in fallback timeout:",e)}}),3500),window.addEventListener("load",(()=>{document.querySelectorAll(".swatch__root, .tile__root, .clickable__root").forEach((e=>{e.addEventListener("click",removeExistingBadges),e.addEventListener("click",displayPromoMessage)}))}));
