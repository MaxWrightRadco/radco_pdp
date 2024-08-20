document.addEventListener('DOMContentLoaded', function() {
    console.log("Sticky Cart Script: DOMContentLoaded event fired.");

    const maxWaitTime = 5000; // Maximum wait time in milliseconds
    const intervalTime = 100; // Interval time in milliseconds
    let elapsedTime = 0;

    const checkInterval = setInterval(() => {
        try {
            const priceContainer = document.querySelector('.cmp-productdetails__found-right .price-container');
            const addToBasketContainer = document.querySelector('.cmp-productdetails__sticky');

            if (!priceContainer) {
                console.warn("Sticky Cart Script: .price-container not found.");
            }

            if (!addToBasketContainer) {
                console.warn("Sticky Cart Script: .cmp-productdetails__sticky not found.");
            }

            if (priceContainer && addToBasketContainer) {
                const priceContainerAttr = priceContainer.getAttribute('data-product-price');
                console.log("Sticky Cart Script: Found .price-container and .cmp-productdetails__sticky.");

                if (priceContainerAttr !== null) {
                    console.log("Sticky Cart Script: data-product-price attribute found with value:", priceContainerAttr);
                    initializeStickyCart(priceContainerAttr);
                    clearInterval(checkInterval);  // Stop checking once elements are found and initialized
                } else {
                    console.warn("Sticky Cart Script: data-product-price attribute is null.");
                }
            }

            elapsedTime += intervalTime;
            if (elapsedTime >= maxWaitTime) {
                clearInterval(checkInterval); // Stop checking after the maximum wait time
                console.error("Sticky Cart Script: Timeout. Required elements not found within the timeout period.");
            }
        } catch (error) {
            console.error("Sticky Cart Script: Error during interval checking:", error);
            clearInterval(checkInterval); // Stop the loop if an error occurs
        }
    }, intervalTime); // Check every 100ms until elements are ready or timeout

    function initializeStickyCart(priceContainerAttr) {
        try {
            console.log("Sticky Cart Script: Initializing sticky cart.");

            // Function to check if the device is a mobile device
            function isMobileDevice() {
                return window.matchMedia("(max-width: 767px)").matches;
            }

            if (isMobileDevice()) {
                console.log("Sticky Cart Script: Mobile device detected.");

                const priceContainer = document.querySelector('.cmp-productdetails__found-right .price-container');
                const addToBasketContainer = document.querySelector('.cmp-productdetails__sticky');
                const outOfStockContainer = document.querySelector('.cmp-productdetails.cmp-productdetails__outofstock .cmp-productdetails__sticky');

                if (!priceContainer || !addToBasketContainer) {
                    console.error("Sticky Cart Script: Required elements not found during initialization.");
                    return;
                }

                // Create a new sticky container
                const stickyContainer = document.createElement('div');
                stickyContainer.className = 'sticky-add-to-cart';
                stickyContainer.style.position = 'fixed';
                stickyContainer.style.bottom = '0';
                stickyContainer.style.left = '0';
                stickyContainer.style.right = '0';
                stickyContainer.style.display = 'flex';
                stickyContainer.style.justifyContent = 'space-between';
                stickyContainer.style.alignItems = 'center';
                stickyContainer.style.backgroundColor = '#fff';
                stickyContainer.style.padding = '10px';
                stickyContainer.style.boxShadow = '0 -2px 5px rgba(0, 0, 0, 0.1)';
                stickyContainer.style.opacity = '0';
                stickyContainer.style.transition = 'opacity 0.3s ease, display 0.3s ease';
                stickyContainer.style.zIndex = '50';
                stickyContainer.style.display = 'none';

                // Clone the priceContainer and addToBasketContainer to avoid using innerHTML
                const newPriceContainer = priceContainer.cloneNode(true);
                const newAddToBasketContainer = addToBasketContainer.cloneNode(true);

                // Set the data-product-price attribute
                newPriceContainer.setAttribute('data-product-price', priceContainerAttr);

                // Append new elements to the sticky container
                stickyContainer.appendChild(newPriceContainer);
                stickyContainer.appendChild(newAddToBasketContainer);

                // Append the sticky container to the body
                document.body.appendChild(stickyContainer);
                console.log("Sticky Cart Script: Sticky container added to the body.");

                // Function to copy event listeners from the original button to the new button
                function copyEventListeners(originalButton, newButton) {
                    newButton.addEventListener('click', function(event) {
                        event.preventDefault();
                        if (originalButton) {
                            originalButton.click();
                            setTimeout(() => {
                                const errorElement = document.querySelector('p.error');
                                if (errorElement) {
                                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }, 100);
                        }
                    });
                }

                // Find the original and new add-to-basket buttons
                const originalAddToBasketButton = addToBasketContainer.querySelector('.button__addToBasket');
                const newAddToBasketButton = newAddToBasketContainer.querySelector('.button__addToBasket');

                if (originalAddToBasketButton && newAddToBasketButton) {
                    console.log("Sticky Cart Script: Copying event listeners from the original button to the new button.");
                    copyEventListeners(originalAddToBasketButton, newAddToBasketButton);
                } else {
                    console.warn("Sticky Cart Script: Add to Basket buttons not found.");
                }

                // Function to disable the sticky add-to-basket button
                function disableStickyButton() {
                    newAddToBasketButton.style.backgroundColor = 'grey';
                    newAddToBasketButton.style.pointerEvents = 'none';
                }

                // Throttle function to limit the rate at which the scroll event is processed
                function throttle(func, limit) {
                    let lastFunc;
                    let lastRan;
                    return function() {
                        const context = this;
                        const args = arguments;
                        if (!lastRan) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        } else {
                            clearTimeout(lastFunc);
                            lastFunc = setTimeout(function() {
                                if ((Date.now() - lastRan) >= limit) {
                                    func.apply(context, args);
                                    lastRan = Date.now();
                                }
                            }, limit - (Date.now() - lastRan));
                        }
                    }
                }

                // Function to check the visibility of the original add-to-basket container
                function checkVisibility() {
                    try {
                        const rect = addToBasketContainer.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight - 20 && rect.bottom > 20;
                        const isOutOfStockHidden = outOfStockContainer && window.getComputedStyle(outOfStockContainer).display === 'none';
                        const hasError = document.querySelector('p.error') !== null;

                        const i = document.querySelector('#attentive_creative');
                        const immerssWidget = document.querySelector("#immerss-widget");
                        let n = null;
                        if (immerssWidget && immerssWidget.shadowRoot) {
                            n = immerssWidget.shadowRoot.querySelector("div.iw-widget-button.iw-visible");
                        }

                        if (!isVisible && !isOutOfStockHidden && !hasError) {
                            stickyContainer.style.opacity = '1';
                            stickyContainer.style.display = 'flex';
                            newAddToBasketContainer.style.display = 'block';
                            if (i) {
                                i.style.bottom = "91px";
                                i.style.transition = "bottom 0.3s ease 0s";
                            }
                            if (n) {
                                n.style.bottom = "91px";
                                n.style.transition = "bottom 0.3s ease 0s";
                            }
                        } else {
                            stickyContainer.style.opacity = '0';
                            stickyContainer.style.display = 'none';
                            newAddToBasketContainer.style.display = 'none';
                            if (i) {
                                i.style.bottom = "16px";
                                i.style.transition = "bottom 0.3s ease 0s";
                            }
                            if (n) {
                                n.style.bottom = "var(--iw-widget-button-y)";
                                n.style.transition = "bottom 0.3s ease 0s";
                            }
                        }
                    } catch (error) {
                        console.error("Sticky Cart Script: Error during visibility check:", error);
                    }
                }

                // Listen to scroll events with throttling
                window.addEventListener('scroll', throttle(checkVisibility, 100));

                // Listen for changes to the DOM to detect error messages within .cmp-productdetails__found-right
                const observer = new MutationObserver(function(mutationsList) {
                    try {
                        for (let mutation of mutationsList) {
                            if (mutation.type === 'childList' && mutation.target.classList.contains('cmp-productdetails__found-right')) {
                                if (document.querySelector('p.error')) {
                                    disableStickyButton();
                                }
                            }
                        }
                    } catch (error) {
                        console.error("Sticky Cart Script: Error in MutationObserver:", error);
                    }
                });

                // Observe changes only within the .cmp-productdetails__found-right subtree
                const foundRightElement = document.querySelector('.cmp-productdetails__found-right');
                if (foundRightElement) {
                    observer.observe(foundRightElement, {
                        childList: true,
                        subtree: true // Observe all child elements within .cmp-productdetails__found-right
                    });
                    console.log("Sticky Cart Script: MutationObserver is observing .cmp-productdetails__found-right subtree.");
                } else {
                    console.warn("Sticky Cart Script: .cmp-productdetails__found-right not found for MutationObserver.");
                }

                // Initial check
                checkVisibility();
            } else {
                console.warn("Sticky Cart Script: Not a mobile device. Sticky cart will not be initialized.");
            }
        } catch (error) {
            console.error("Sticky Cart Script: Error during initialization:", error);
        }
    }
});
