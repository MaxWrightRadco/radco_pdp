document.addEventListener("DOMContentLoaded",(function(){function e(){requestAnimationFrame((()=>{const e=document.querySelector(".cmp-productdetails__found-right");if(e){const t=e.querySelector(".price"),r=e.querySelector(".cloned-price");if(t&&!r){const e=t.cloneNode(!0);e.classList.add("cloned-price"),t.style.display="none",e.removeAttribute("data-product-price"),e.removeAttribute("data-product-sku");e.querySelectorAll("span").forEach((function(e){e.textContent.includes(".00")&&(e.textContent=e.textContent.replace(".00",""))})),t.parentNode.insertBefore(e,t.nextSibling),e.style.opacity="1"}}}))}function t(e){requestAnimationFrame((()=>{e.querySelectorAll(".price, .price-range").forEach((function(e){if(e.querySelectorAll("span").forEach((function(e){e.textContent.includes(".00")&&(e.textContent=e.textContent.replace(".00",""))})),e.classList.contains("price-range")){e.querySelectorAll(".value").forEach((function(e){e.textContent.includes(".00")&&(e.textContent=e.textContent.replace(".00",""))}))}e.style.opacity="1"}))}))}function r(e){requestAnimationFrame((()=>{e.querySelectorAll(".glide__slides").forEach((function(e){e.querySelectorAll("img").forEach((function(e){e.src.includes("=300")&&(e.src=e.src.replace("=300","=500")),e.src.includes("=250")&&(e.src=e.src.replace("=250","=500"))}))}))}))}function c(c){if(!c)return;const o=document.querySelector(".cmp-searchresults__cards"),n=document.querySelector(".glide__slides"),u=document.querySelector(".cmp-productdetails__found-right"),s=function(s){(s.target.closest(".cmp-productcard__options .clickable__root")||s.target.closest(".swatchList__root .clickable__root"))&&(u&&u==c?e():t(c),(o||n)&&r(c))};c.addEventListener("click",s);const l=new MutationObserver((function(s){let l;for(let i of s)"childList"===i.type&&(clearTimeout(l),l=setTimeout((()=>{u&&u==c?e():t(c)}),100),(o||n)&&(l=setTimeout((()=>r(c)),100)))}));return l.observe(c,{childList:!0,subtree:!0}),setTimeout((()=>{u&&u==c?e():t(c)}),3e3),(o||n)&&setTimeout((()=>r(c)),500),()=>{c.removeEventListener("click",s),l.disconnect()}}const o=new IntersectionObserver(((e,t)=>{e.forEach((e=>{e.isIntersecting&&((()=>{const e=document.querySelector(".cmp-searchresults__cards"),t=document.querySelector(".cmp-searchbar__autocompleteWrapper"),r=document.querySelector(".cmp-productdetails__found-right"),o=document.querySelectorAll(".cmp-productcarousel__wrapper"),n=document.querySelector(".cmp-productdetails__related"),u=document.querySelector(".tabsrelated"),s=[];e&&s.push(c(e)),t&&s.push(c(t)),r&&s.push(c(r)),o.forEach((e=>{s.push(c(e))})),n&&s.push(c(n)),u&&s.push(c(u))})(),t.disconnect())}))})),n=document.querySelector(".cmp-searchresults__cards"),u=document.querySelector(".cmp-searchbar__autocompleteWrapper"),s=document.querySelector(".cmp-productdetails__found-right"),l=document.querySelectorAll(".cmp-productcarousel__wrapper"),i=document.querySelector(".cmp-productdetails__related"),a=document.querySelector(".tabsrelated");n&&o.observe(n),u&&o.observe(u),s&&o.observe(s),i&&o.observe(i),a&&o.observe(a),l.forEach((e=>{o.observe(e)})),setTimeout((function(){document.querySelectorAll(".price, .price-range").forEach((function(e){"1"!==e.style.opacity&&requestAnimationFrame((()=>{e.style.opacity="1"}))}))}),5e3)}));
