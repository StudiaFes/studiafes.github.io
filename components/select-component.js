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
          <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
  <script src="/js/bootstrap.bundle.min.js"></script>
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