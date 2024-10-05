class CustomDivider extends HTMLElement {
    constructor() {
        super();
    }

    // Called when the component is added to the document
    connectedCallback() {
        // Get the color attribute or use "bg-secondary" as the default
        const colorClass = this.getAttribute('color') || 'custom-bg-lighter';
        const width = this.getAttribute('width') || 'w-70'

        // Define the divider HTML with dynamic background class
        this.innerHTML = `
            <style>
                .custom-bg-lighter {
                            background-color: #e0e0e0 !important; /* Custom light gray */
                        }
            </style>
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
            <div class="divider ${colorClass} ${width} mx-auto" style="height: 1px;"></div>
        `;
    }
}

// Define the new web component
customElements.define('custom-divider', CustomDivider);