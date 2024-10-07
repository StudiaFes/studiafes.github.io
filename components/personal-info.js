class PersonalInfo extends HTMLElement {
    constructor() {
        super();
        // Attach Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Set up the initial HTML structure
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="/css/bootstrap-icons.min.css">
            <script src="/js/bootstrap.bundle.min.js"></script>
            <div class="card list-group-item p-0">
                <div class="card-header" id="title">
                    Default Title
                </div>
                <ul class="list-group" id="list">
                    <!-- List items will be dynamically generated here -->
                </ul>
            </div>
        `;
    }

    // Observe the title and data attributes for changes
    static get observedAttributes() {
        return ['title', 'data'];
    }

    // Update the title or data when the attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.shadowRoot.getElementById('title').textContent = newValue;
        } else if (name === 'data') {
            this.updateList(JSON.parse(newValue));
        }
    }

    // Update the list with the items from the data array
    updateList(dataArray) {
        const listElement = this.shadowRoot.getElementById('list');
        listElement.innerHTML = ''; // Clear existing items

        // Create a list item for each entry in the data array
        dataArray.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'border-0', 'd-flex', 'gap-3', 'align-items-center');

            // Create the icon element (replacing the image)
            const icon = document.createElement('i');
            icon.classList.add(...item.icon.split(' '), 'flex-shrink-0', 'rounded-circle');
            
            // Create the div for text and content
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('d-flex', 'w-100', 'justify-content-between');

            // Create a paragraph for the value text (using item.value)
            const paragraph = document.createElement('p');
            paragraph.classList.add('mb-0', 'text-center');
            paragraph.textContent = item.value;

            // Append paragraph to the content div
            contentDiv.appendChild(paragraph);

            // Create the small icon for editing (Bootstrap icon bi-pencil-square)
            const smallIcon = document.createElement('i');
            smallIcon.classList.add('bi', 'bi-pencil-square');

            // Append the small icon to the content div
            contentDiv.appendChild(smallIcon);

            // Append the icon and contentDiv to the list item
            listItem.appendChild(icon);
            listItem.appendChild(contentDiv);

            // Append the list item to the list element
            listElement.appendChild(listItem);

            // Add the custom divider after each list item except the last one
            if (index < dataArray.length - 1) {
                const divider = document.createElement('custom-divider');
                listElement.appendChild(divider);
            }
        });
    }

    // Set initial title and data when the component is added to the DOM
    connectedCallback() {
        const title = this.getAttribute('title') || 'Default Title';
        const data = this.getAttribute('data') ? JSON.parse(this.getAttribute('data')) : [];

        this.shadowRoot.getElementById('title').textContent = title;
        this.updateList(data);
    }
}

// Define the new element
customElements.define('personal-info', PersonalInfo);
