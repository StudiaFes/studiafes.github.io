class BottomNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <team-modal-form></team-modal-form>
            <nav class="navbar fixed-bottom navbar-light bg-light">
                <div class="container-fluid d-flex justify-content-around">
                    <button type="button" class="btn btn-light" id="home-button">
                        <i class="bi bi-house fs-2"></i>
                    </button>
                    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#teamModalForm" data-bs-userid="123">
                        <i class="bi bi-plus-circle fs-2"></i>
                    </button>
                    <button type="button" class="btn btn-light" id="profile-button">
                        <i class="bi bi-person fs-2"></i>
                    </button>
                </div>
            </nav>
        `;

        // Add event listeners to the buttons
        const homeButton = this.querySelector('#home-button');
        const profileButton = this.querySelector('#profile-button');

        homeButton.addEventListener('click', () => this.openPage('/html/mainpage/main-page.html'));
        profileButton.addEventListener('click', () => this.openPage('/html/profile/profile.html?id=1234'));
    }

    openPage(url) {
        window.location.href = url;
    }
}

customElements.define('bottom-nav', BottomNav);
