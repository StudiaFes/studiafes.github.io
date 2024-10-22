class JoinTeamModal extends HTMLElement {  
    constructor() {
      super();
      // Generate a unique ID for the modal
      this.modalId = `joinTeamModal`;
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      // Retrieve external parameters
      const teamName = this.getAttribute('teamName') || '';
      const examName = this.getAttribute('examName') || '';
  
      // Modal HTML structure with Bootstrap classes
      const modalHTML = `
        <style>
            #${this.modalId}Content{
                max-width: 70%;
            }
        </style>
        <div class="modal fade" id="${this.modalId}" tabindex="-1" aria-labelledby="${this.modalId}Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
              <!-- Modal Body -->
              <div class="modal-body text-center">
                <p>Vuoi unirti al team <strong>${teamName}</strong> per studiare <strong>${examName}</strong>?</p>
              </div>
              <!-- Modal Footer -->
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Si</button>
              </div>
            </div>
          </div>
        </div>
      `;
  
      // Append the modal to the body
      document.body.insertAdjacentHTML('beforeend', modalHTML);
  
      // Initialize the Bootstrap modal
      const modalElement = document.getElementById(this.modalId);
      const bootstrapModal = new bootstrap.Modal(modalElement);
  
      // Show the modal
      bootstrapModal.show();
  
      // Clean up the modal from the DOM when hidden
      modalElement.addEventListener('hidden.bs.modal', () => {
        modalElement.remove();
        // Dispatch an event to notify that the modal has been hidden
        this.dispatchEvent(new Event('hidden.bs.modal'));
      });
  
      // Event listeners for buttons
      const yesButton = modalElement.querySelector('.btn-primary');
      const noButton = modalElement.querySelector('.btn-secondary');
  
      yesButton.addEventListener('click', () => {
        // Dispatch a custom event when "Si" is clicked
        this.dispatchEvent(new CustomEvent('join-team-confirmed', {
          detail: { teamName, examName },
          bubbles: true,
          composed: true
        }));
      });
  
      noButton.addEventListener('click', () => {
        // Dispatch a custom event when "No" is clicked
        this.dispatchEvent(new CustomEvent('join-team-declined', {
          detail: { teamName, examName },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  // Register the custom element
  customElements.define('join-team-modal', JoinTeamModal);
  