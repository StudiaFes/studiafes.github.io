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
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="teamModalFormLabel">Edit Team Information</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h6 class="mb-4">Please fill in the details below:</h6>
                <form id="studentForm">
                  <div class="form-group mb-3">
                    <label for="titleInput">Title</label>
                    <input type="text" class="form-control" id="titleInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="universityInput">University</label>
                    <input type="text" class="form-control" id="universityInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="majorInput">Major</label>
                    <input type="text" class="form-control" id="majorInput" required>
                  </div>
                  <div class="form-group mb-3">
                    <label for="professorInput">Professor</label>
                    <input type="text" class="form-control" id="professorInput" required>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
              <div class="modal-footer" id="progressFooter" style="display: none;">
                <div class="progress w-100">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
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
      const titleInput = form.querySelector('#titleInput');
      const universityInput = form.querySelector('#universityInput');
      const majorInput = form.querySelector('#majorInput');
      const professorInput = form.querySelector('#professorInput');
      const progressBar = modalElement.querySelector('.progress-bar');
      const progressFooter = modalElement.querySelector('#progressFooter');
  
      modalElement.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        this.userId = button.getAttribute('data-bs-userid');
        
        titleInput.value = '';
        universityInput.value = '';
        majorInput.value = '';
        professorInput.value = '';
      });
  
      // Form submission handling
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const data = {
          title: titleInput.value,
          university: universityInput.value,
          major: majorInput.value,
          professor: professorInput.value,
        };
  
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
            
            this.dispatchEvent(new CustomEvent('formSubmitted', {
              detail: {
                userId: this.userId,
                ...data
              },
              bubbles: true,
              composed: true
            }));
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
          }, 500);
        }
      });
    }
  }
  
  // Register the custom element
  customElements.define('team-modal-form', TeamModalForm);
  