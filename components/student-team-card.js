class StudentExamCard extends HTMLElement {
    constructor() {
      super();
      // Attach shadow DOM
      this.attachShadow({ mode: 'open' });
    }
  
    // Observe the attributes for title, subtitle, and text
    // static get observedAttributes() {
    //   return ['title', 'subtitle', 'text'];
    // }
  
    // Called when the component is added to the DOM
    connectedCallback() {
      this.render();
    }
  
    // Render the Bootstrap card
    render() {
      const cardTitle = this.getAttribute("title");
        const university = this.getAttribute("university");
        const major = this.getAttribute("major");
        const professor = this.getAttribute("professor");

      // Add Bootstrap styles and card structure inside the shadow DOM
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
        <style>
            .circle {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin: 10px;
            }
          </style>

          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title text-center">${cardTitle}</h5>
              <div class="d-flex justify-content-center">
                <div class="circle bg-secondary border-2"></div>
                <div class="circle bg-secondary"></div>
              </div>
              <p class="card-text"><strong>University:</strong> ${university}</p>
              <p class="card-text"><strong>Major:</strong> ${major}</p>
              <p class="card-text"><strong>Professor:</strong> ${professor}</p>
            </div>
          </div>
      `;
    }
  }
  
  // Register the custom element
  customElements.define('student-team-card', StudentExamCard);
  