function getActiveProductSKU(){const t=document.querySelector(".cmp-productdetails__found-right .price[data-product-sku]");if(t){const e=t.getAttribute("data-product-sku");return console.log("Active Product SKU:",e),e}return console.error('No element with class "price" inside "cmp-productdetails__found-right" and data-product-sku attribute found.'),null}function displayDiscountMessage(){const t=document.querySelector(".productFullDetail__options"),e=document.querySelector(".cmp-productdetails__found-right .price[data-product-sku]"),o=getActiveProductSKU();if(!t||!o||!e)return;let c;try{c=JSON.parse(t.getAttribute("data-variants")),console.log("Variants Data:",c)}catch(t){return void console.error("Failed to parse data-variants attribute:",t)}const n=c.find((t=>t.sku===o));if(console.log("Active Variant:",n),!n)return void console.error("No variant found matching the active SKU:",o);const r=n.priceRange.wasPrice;if(console.log("Was Price:",r),void 0!==r&&0!==r){const t=Math.round(r),o=document.createElement("span");o.textContent="Included in Extra 15% Off Clearance",o.classList.add("discount-percent");const c=document.querySelector(".discount-percent");c&&c.remove(),e.insertAdjacentElement("afterend",o)}}window.onload=function(){if(document.querySelector(".cmp-productdetails__found-right")){displayDiscountMessage();document.querySelectorAll(".swatch__root, .tile__root, .clickable__root").forEach((t=>{t.addEventListener("click",(function(){console.log("Element clicked:",t),setTimeout(displayDiscountMessage,0)}))}))}else console.log("productdetails__found-right class not found")};
