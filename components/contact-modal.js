class ContactModal extends HTMLElement {
    constructor() {
        super();

        // Create the modal structure in the global document root (not Shadow DOM)
        const modalHTML = `
            <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="contactModalLabel">Contact Information</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p><strong>Name:</strong> <span id="name"></span></p>
                            <p><strong>Surname:</strong> <span id="surname"></span></p>
                            <p><strong>Email:</strong> <span id="email"></span></p>
                            <p><strong>Phone:</strong> <span id="phone"></span></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the modal structure to the document's body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalElement = document.getElementById('contactModal');
        // Add event listener for when the modal is triggered
        modalElement.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;

            // Extract data-bs-* attributes from the triggering button
            const name = button.getAttribute('data-bs-name');
            const surname = button.getAttribute('data-bs-surname');
            const email = button.getAttribute('data-bs-email');
            const phone = button.getAttribute('data-bs-phone');

            // Update modal content with the extracted attributes
            document.querySelector('#name').textContent = name;
            document.querySelector('#surname').textContent = surname;
            document.querySelector('#email').textContent = email;
            document.querySelector('#phone').textContent = phone;
        });
    }

    // Called when the component is added to the document
    connectedCallback() {
        const modal = new bootstrap.Modal(document.querySelector('#contactModal'));

        // Trigger the modal when the component is connected
        modal.show();
    }
}

// Define the new web component
customElements.define('contact-modal', ContactModal);
