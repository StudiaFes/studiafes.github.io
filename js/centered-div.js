class CenteredDiv extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Definire lo shadow DOM e inserire uno slot per il contenuto dinamico
        this.shadowRoot.innerHTML = `
         <link rel="stylesheet" type="text/css" href="../../css/main.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
                <div class="container-fluid full-page d-flex align-items-center flex-column justify-content-center">
                    <slot></slot>
                </div>
            `;

    }
}

// Definire il custom element
customElements.define('centered-div', CenteredDiv);