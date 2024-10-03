class DynamicSelectComponent extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'fetch-endpoint', 'data'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        var mockData = [
            "Università di Crotone",
            "Università di Bologna",
            "Università di San Marino",
        ]
        // Create the select element
        this.shadowRoot.innerHTML = `
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
            <label>${this.getAttribute('label')}</label>
            <select class="form-select" aria-label="University choice">
            </select>
        `;

        // Reference to the select element
        const selectElement = this.shadowRoot.querySelector("select")
        var data = JSON.parse(this.getAttribute('data'))
        if (data != null) {
            this._addSelectData(data, selectElement)
        } else {
            fetch(`${this.getAttribute('fetch-endpoint')}`)
                .then(response => response.json())
                .then(data => {
                    // Remove the "Caricamento..." option
                    this._addSelectData(mockData, selectElement)

                    // Populate select with fetched data
                })
                .catch(error => {

                });
        }

        // Fetch data from an API and populate the select options

    }

    _doFetch(fetchEndpoint, select) {
        fetch(fetchEndpoint)
            .then(response => response.json())
            .then(data => {
                // Remove the "Caricamento..." option
                this._addSelectData(data, select)

                // Populate select with fetched data
            })
            .catch(error => {

            });
    }
    _addSelectData(data, select) {
        data.forEach((university, index) => {
            const option = document.createElement('option')
            option.value = index
            option.textContent = university
            if (index == 0) {
                option.selected = true
            }
            select.appendChild(option);
        })
    }
}

// Definire il custom element
customElements.define('dynamic-select-component', DynamicSelectComponent);