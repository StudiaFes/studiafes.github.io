class TeamModalForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const modalHTML = `
        <div class="modal fade" id="teamModalForm" tabindex="-1" aria-labelledby="teamModalFormLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen-sm-down">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="teamModalFormLabel">Crea un team</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="studentForm">
                  <div class="form-group mb-3">
                    <label for="teamNameInput">Nome del team</label>
                    <input type="text" class="form-control" id="teamNameInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="universityInput">Università</label>
                    <input type="text" class="form-control" id="universityInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="majorInput">Facoltà</label>
                    <input type="text" class="form-control" id="majorInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="professorInput">Professore</label>
                    <input type="text" class="form-control" id="professorInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="numPeopleInput">Numero di persone</label>
                    <input type="number" class="form-control" id="numPeopleInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="dateInput">Appello</label>
                    <input type="date" class="form-control" id="dateInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="examInput">Esame</label>
                    <input type="text" class="form-control" id="examInput" required>
                  </div>
                  <!-- Buttons Footer -->
                  <div class="modal-footer" id="buttonFooter">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                    <button type="submit" class="btn btn-primary">Salva</button>
                  </div>
                </form>
              </div>
              <!-- Progress Bar Footer -->
              <div class="modal-footer" id="progressFooter" style="display: none;">
                <div class="progress w-100">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
                       aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    // Append the modal HTML to the document body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalElement = document.getElementById('teamModalForm');
    const form = document.getElementById('studentForm');
    const teamNameInput = form.querySelector('#teamNameInput');
    const universityInput = form.querySelector('#universityInput');
    const majorInput = form.querySelector('#majorInput');
    const professorInput = form.querySelector('#professorInput');
    const numPeopleInput = form.querySelector('#numPeopleInput');
    const dateInput = form.querySelector('#dateInput');
    const examInput = form.querySelector('#examInput');
    const progressBar = modalElement.querySelector('.progress-bar');
    const progressFooter = modalElement.querySelector('#progressFooter');
    const buttonFooter = modalElement.querySelector('#buttonFooter');

    // Modal show event to reset form fields and UI elements
    modalElement.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      this.userId = button.getAttribute('data-bs-userid');

      // Reset form fields
      form.reset();

      // Show the button footer
      buttonFooter.style.display = 'flex';

      // Hide the progress footer
      progressFooter.style.display = 'none';

      // Reset the progress bar
      progressBar.style.width = '0%';
      progressBar.setAttribute('aria-valuenow', '0');
    });

    // Form submission handling
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        userId: this.userId,
        examName: examInput.value,
        university: universityInput.value,
        major: majorInput.value,
        professor: professorInput.value,
        numPeople: numPeopleInput.value,
        examDate: dateInput.value,
        teamName: teamNameInput.value  // Corrected to use the team name input
      };

      // Hide the button footer
      buttonFooter.style.display = 'none';

      // Show the progress bar and set it to 50%
      progressFooter.style.display = 'block';
      progressBar.style.width = '50%';
      progressBar.setAttribute('aria-valuenow', '50');

      // Send form data with the userId as part of the URL path
      try {
        const response = await fetch(`https://your-api-url.com/users/${this.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const bootstrapModal = bootstrap.Modal.getInstance(modalElement);

        if (response.ok) {
          console.log('Data successfully submitted');
          progressBar.style.width = '100%';
          progressBar.setAttribute('aria-valuenow', '100');
          setTimeout(() => {
            bootstrapModal.hide();
          }, 300);  // Add slight delay to show the full progress
        } else {
          console.error('Error submitting data');
          progressBar.style.width = '100%';
          progressBar.setAttribute('aria-valuenow', '100');
          setTimeout(() => {
            bootstrapModal.hide();
          }, 300);
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', '100');
        const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
        setTimeout(() => {
          bootstrapModal.hide();
        }, 300);
      } finally {
        // Reset the progress bar and hide after completion
        setTimeout(() => {
          progressFooter.style.display = 'none';
          progressBar.style.width = '0%';
          progressBar.setAttribute('aria-valuenow', '0');
          // Show the button footer again if needed
          // buttonFooter.style.display = 'flex';
        }, 500);
        this.emitEvent(data);
      }
    });
  }

  emitEvent(data) {
    this.dispatchEvent(new CustomEvent('team-form-submitted', {
      detail: data,
      bubbles: true,
      composed: true
    }));
  }
}

// Register the custom element
customElements.define('team-modal-form', TeamModalForm);
