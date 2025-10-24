document.addEventListener('DOMContentLoaded', () => {
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const signCards = document.querySelectorAll('.sign-card');
    const animationDuration = 400; // Must match CSS transition time in milliseconds

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const catalog = button.getAttribute('data-catalog');

            // Update active state for buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter and animate the gallery cards
            signCards.forEach(card => {
                const catalogs = card.getAttribute('data-catalogs').split(' ');
                const isVisible = catalog === 'all' || catalogs.includes(catalog);
                
                if (isVisible) {
                    // Show:
                    // 1. Set display block immediately
                    card.style.display = 'block'; 
                    
                    // 2. Wait for the browser to acknowledge the display change
                    requestAnimationFrame(() => {
                         // 3. Remove the 'hidden' class to trigger the opacity/scale transition
                         card.classList.remove('hidden');
                         card.classList.remove('display-none');
                    });

                } else {
                    // Hide:
                    // 1. Add the 'hidden' class to trigger the opacity/scale transition
                    card.classList.add('hidden');

                    // 2. Wait for the CSS transition duration before setting display: none
                    setTimeout(() => {
                        // Check if the card is still intended to be hidden
                        if (card.classList.contains('hidden')) {
                             card.style.display = 'none';
                             card.classList.add('display-none');
                        }
                    }, animationDuration); 
                }
            });
        });
    });

    // Initial Load: Remove the hidden class to ensure all visible cards fade in nicely
    signCards.forEach(card => {
        card.classList.remove('hidden');
    });

    // NOTE: Form submission is handled by Netlify and redirects to thank-you.html
});