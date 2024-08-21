function addContinueShoppingButton(){if(!document.querySelector("#continue-shopping")&&isMobileDevice()){console.log("Adding Continue Shopping button");const e=document.createElement("div");e.classList.add("cmp-button","cmp-button__filled","cmp-button__without-borders","continue-shopping-button","minibasket-exit");const t=document.createElement("a");t.id="continue-shopping",t.classList.add("cmp-form-button"),t.href="#";const o=document.createElement("span");o.textContent="Continue Shopping",t.appendChild(o),e.appendChild(t);const n=document.createElement("i");n.classList.add("exit-icon","minibasket-exit");const i=document.querySelector(".shopping-cart"),c=i?i.querySelector(".basket-button"):null;c?(c.insertAdjacentElement("afterend",e),console.log("Continue Shopping button added successfully")):console.log("Basket button container not found"),i?(i.append(n),console.log("Exit icon added successfully")):console.log("Shopping cart not found"),document.querySelectorAll(".minibasket-exit").forEach((function(e){e.removeEventListener("click",handleExitClick),e.addEventListener("click",handleExitClick)}))}}function handleExitClick(e){e.preventDefault();const t=document.querySelector(".cmp-minibasket__contentContainer .shopping-cart.toggled");t?(console.log("Shopping cart found:",t),t.classList.remove("toggled"),console.log("Toggled class removed:",!t.classList.contains("toggled")),setTimeout((function(){t.classList.contains("toggled")&&(console.log("Toggled class found again, removing..."),t.classList.remove("toggled"),console.log("Final toggled class removal:",!t.classList.contains("toggled")))}),250)):console.log("Shopping cart not found")}function isMobileDevice(){return window.matchMedia("(max-width: 767px)").matches}function observeTotalSection(){const e=document.querySelector(".total--section");if(e){new MutationObserver((()=>{updatePromotionalMessage()})).observe(e,{childList:!0,subtree:!0,characterData:!0}),console.log("MutationObserver set up for total--section")}else console.log("total--section not found.")}document.addEventListener("DOMContentLoaded",(()=>{isMobileDevice()&&(setTimeout(addContinueShoppingButton,250),observeTotalSection())})),window.addEventListener("load",(()=>{document.querySelectorAll(".swatch__root, .tile__root, .clickable__root").forEach((e=>{e.addEventListener("click",addContinueShoppingButton)}))}));
