class StudentTeamCard extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  // Observe changes to these attributes
  static get observedAttributes() {
    return ['title', 'university', 'major', 'professor', 'num-people'];
  }

  // Called when one of the observed attributes changes
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  // Called when the component is added to the DOM
  connectedCallback() {
    this.render();
  }

  // Render the Bootstrap card
  render() {
    const cardTitle = this.getAttribute("title") || '';
    const university = this.getAttribute("university") || '';
    const major = this.getAttribute("major") || '';
    const professor = this.getAttribute("professor") || '';
    const numPeople = parseInt(this.getAttribute("num-people")) || 2;

    // Generate the circles
    let circlesHTML = '';
    for (let i = 0; i < numPeople; i++) {
      circlesHTML += '<div class="circle bg-secondary border-2"></div>';
    }

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
              ${circlesHTML}
            </div>
            <p class="card-text"><strong>Università:</strong> ${university}</p>
            <p class="card-text"><strong>Facoltà:</strong> ${major}</p>
            <p class="card-text"><strong>Professore:</strong> ${professor}</p>
          </div>
        </div>
    `;
  }
}

// Register the custom element
customElements.define('student-team-card', StudentTeamCard);
