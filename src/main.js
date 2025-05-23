// Import the bootstrap function from the 'bootstrap.js' file
import { bootstrap } from './bootstrap.js';

// Define a custom element 'countdown-widget' using the Custom Elements API
customElements.define('quiz-widget', class extends HTMLElement {

    async connectedCallback() {

        // Create a shadow DOM for encapsulatio
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Fetch <countdown-widget> attributes
        // to pass as properties for App.vue

        const attributes = {
            'firstname': this.getAttribute('firstname'),
            'lastname': this.getAttribute('lastname'),
            'email': this.getAttribute('email'),
            'settings': this.getAttribute('settings'),
            'apiUrl': this.getAttribute('apiUrl'),
            'cardsApiUrl': this.getAttribute('cardsApiUrl'),
            'secretId': this.getAttribute('secretId'),
        };

        this.dispatchEvent(new CustomEvent('test', { test: 1}));
        // Bootstrap the Vue.js application within the shadow DOM
        bootstrap(shadowRoot, attributes);
    }
});
