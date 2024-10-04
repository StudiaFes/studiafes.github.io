class DynamicAppBar extends HTMLElement {
    constructor() {
        super();
    }

    // Called when the component is added to the document
    connectedCallback() {
        // Create the navbar HTML structure with a dynamic title
        this.innerHTML = `
            <nav class="navbar navbar-light bg-light fixed-top navbar-bg">
                <div class="container-fluid justify-content-center">
                    <span class="navbar-brand mb-0 h1" id="navbar-title">Default Title</span>
                </div>
            </nav>
        `;

        // Get the title attribute and update the navbar title
        const title = this.getAttribute('title') || 'Default Title';
        this.querySelector('#navbar-title').textContent = title;
    }

    // Observe the 'title' attribute for changes
    static get observedAttributes() {
        return ['title'];
    }
}

// Define the new web component
customElements.define('dynamic-app-bar', DynamicAppBar);
