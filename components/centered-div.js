class CenteredDiv extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Definire lo shadow DOM e inserire uno slot per il contenuto dinamico
        this.shadowRoot.innerHTML = `
         <link rel="stylesheet" type="text/css" href="/css/main.css">
  <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
  <script src="js/bootstrap.bundle.min.js"></script>
                <div class="container-fluid full-page d-flex align-items-center flex-column justify-content-center">
                    <slot></slot>
                </div>
            `;

    }
}

// Definire il custom element
customElements.define('centered-div', CenteredDiv);