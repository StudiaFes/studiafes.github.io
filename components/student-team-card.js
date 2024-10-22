class StudentTeamCard extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  // Observe changes to these attributes
  static get observedAttributes() {
    return ['team-name', 'exam-name', 'university', 'major', 'professor', 'num-people', 'exam-date'];
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
    const teamName = this.getAttribute("team-name") || '';
    const examName = this.getAttribute("exam-name") || '';
    const cardTitle = `${teamName} - ${examName}`;
    const university = this.getAttribute("university") || '';
    const major = this.getAttribute("major") || '';
    const professor = this.getAttribute("professor");
    const examDate = this.getAttribute("exam-date");
    const numPeople = parseInt(this.getAttribute("num-people")) || 2;

    // Generate the circles
    let circlesHTML = '';
    for (let i = 0; i < numPeople; i++) {
      circlesHTML += '<div class="circle bg-secondary border-2"></div>';
    }

    // Optional professor and examDate sections
    let professorHTML = '';
    if (professor) {
      professorHTML = `<p class="card-text"><strong>Professore:</strong> ${professor}</p>`;
    }

    let examDateHTML = '';
    if (examDate) {
      examDateHTML = `<p class="card-text"><strong>Appello:</strong> ${examDate}</p>`;
    }

    // Add Bootstrap styles and card structure inside the shadow DOM
    this.shadowRoot.innerHTML = `
      <!-- Include Bootstrap CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <style>
          .circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 10px;
          }
          .card {
            cursor: pointer;
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
          ${professorHTML}
          ${examDateHTML}
        </div>
      </div>
    `;

    // Add event listener to the card
    const cardElement = this.shadowRoot.querySelector('.card');
    cardElement.addEventListener('click', (event) => {
      // Prevent any default action
      event.preventDefault();

      // Create and show the joinTeamModal
      this.showJoinTeamModal(teamName, examName);
    });
  }

  // Method to create and display the joinTeamModal
  showJoinTeamModal(teamName, examName) {
    // Create the join-team-modal element
    const joinTeamModal = document.createElement('join-team-modal');
    joinTeamModal.setAttribute('teamName', teamName);
    joinTeamModal.setAttribute('examName', examName);

    // Append it to the body
    document.body.appendChild(joinTeamModal);

    // Listen for modal closure to remove the element from the DOM
    joinTeamModal.addEventListener('hidden.bs.modal', () => {
      joinTeamModal.remove();
    });

    // Listen for custom events from the modal
    joinTeamModal.addEventListener('join-team-confirmed', (event) => {
      console.log('User confirmed joining the team:', event.detail);
      window.location.href = `/html/team/student-team.html?teamName=${encodeURIComponent(teamName)}&examName=${encodeURIComponent(examName)}`;
    });

    joinTeamModal.addEventListener('join-team-declined', (event) => {
      console.log('User declined to join the team:', event.detail);
      // Handle the user's decline if necessary
    });
  }
}

// Register the custom element
customElements.define('student-team-card', StudentTeamCard);
