class StudentExamCard extends HTMLElement {
    constructor() {
      super();
      // Attach shadow DOM
      this.attachShadow({ mode: 'open' });
    }
  
    // Observe the attributes for title, subtitle, and text
    static get observedAttributes() {
      return ['title', 'subtitle', 'text'];
    }
  
    // Called when the component is added to the DOM
    connectedCallback() {
      this.render();
    }
  
    // Render the Bootstrap card
    render() {
      const title = this.getAttribute('title') || 'Card title';
      const subtitle = this.getAttribute('subtitle') || 'Card subtitle';
      const text = this.getAttribute('text') || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
  
      // Add Bootstrap styles and card structure inside the shadow DOM
      this.shadowRoot.innerHTML = `
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${subtitle}</h6>
            <p class="card-text">${text}</p>
          </div>
        </div>
      `;
    }
  }
  
  // Register the custom element
  customElements.define('student-exam-card', StudentExamCard);
  