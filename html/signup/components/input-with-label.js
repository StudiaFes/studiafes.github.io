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
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
                <label class="form-label">${label}</label>
                <input type="text" class="form-control" placeholder="${placeholder}">
        `;
    }
}

// Register the custom element
customElements.define('label-input-component', LabelInputComponent);
