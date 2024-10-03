// Define the web component class
class LabelInputComponent extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow DOM
        this.attachShadow({ mode: 'open' });
    }

    // Observe the attributes we want to handle
    static get observedAttributes() {
        return ['label', 'placeholder'];
    }

    // Called when the component is added to the DOM
    connectedCallback() {
        this.render();
    }

    // Render the label and input field
    render() {
        // Get the label and placeholder from attributes
        const label = this.getAttribute('label') || 'Default Label';
        const placeholder = this.getAttribute('placeholder') || '';

        // Clear the shadow root content and add new content
        this.shadowRoot.innerHTML = `
                  <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
  <script src="js/bootstrap.bundle.min.js"></script>
                <label class="form-label">${label}</label>
                <input type="text" class="form-control" placeholder="${placeholder}">
        `;
    }
}

// Register the custom element
customElements.define('label-input-component', LabelInputComponent);
