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
                  <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
  <script src="js/bootstrap.bundle.min.js"></script>
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
  