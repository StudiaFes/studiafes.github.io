class BottomNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar fixed-bottom navbar-light bg-light">
                <div class="container-fluid d-flex justify-content-around">
                    <button type="button" class="btn btn-light" id="home-button">
                        <i class="bi bi-house fs-2"></i>
                    </button>
                    <button type="button" class="btn btn-light">
                        <span class="navbar-toggler-icon"></span>
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
