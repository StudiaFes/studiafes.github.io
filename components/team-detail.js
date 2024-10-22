class TeamDetail extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // Extract teamId from the URL
      this.teamId = this.getTeamIdFromURL();
      // Fetch team data
      this.fetchTeamData();
    }
  
    getTeamIdFromURL() {
      // Parse the URL to extract the teamId parameter
      const urlParams = new URLSearchParams(window.location.search);
      const teamId = urlParams.get('teamId');
      return teamId;
    }
  
    async fetchTeamData() {
      if (!this.teamId) {
        this.renderError('Team ID not found in the URL.');
        return;
      }

      // Simulated team data (replace with actual API call when ready)
      const teamData = {
        teamName: 'Alpha Team',
        examName: 'Mathematics',
        examDate: '2023-12-15',
        professor: 'Dr. Smith',
        major: 'Engineering',
        university: 'University of Rome',
        ownerName: 'John Doe',
        ownerPhone: '+39 123 456 7890',
        ownerEmail: 'john.doe@example.com',
        teamMembers: ['user1', 'user2', 'user3'],
      };
  
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
  
        // Render the team details
        this.renderTeamDetails(teamData);
      } catch (error) {
        console.error('Error fetching team data:', error);
        this.renderTeamDetails(teamData);
      }
    }
  
    renderTeamDetails(teamData) {
      // Destructure the team data
      const {
        teamName,
        examName,
        examDate,
        professor,
        major,
        university,
        ownerName,
        ownerPhone,
        ownerEmail,
        teamMembers,
      } = teamData;
  
      // Generate HTML for team members
      const teamMembersHTML = teamMembers.map((memberId) => `
        <li class="list-group-item">Member ID: ${memberId}</li>
      `).join('');
  
      // Include Bootstrap CSS
      this.shadowRoot.innerHTML = `
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
        <style>
          .team-detail {
            margin: 20px;
          }
          .team-detail h2 {
            margin-bottom: 20px;
          }
          .team-detail h4 {
            margin-top: 30px;
          }
        </style>
        <div class="team-detail">
          <h2>${teamName}</h2>
          <p><strong>Exam:</strong> ${examName}</p>
          <p><strong>Exam Date:</strong> ${examDate}</p>
          <p><strong>Professor:</strong> ${professor}</p>
          <p><strong>Major:</strong> ${major}</p>
          <p><strong>University:</strong> ${university}</p>
          <h4>Team Owner</h4>
          <p><strong>Name:</strong> ${ownerName}</p>
          <p><strong>Phone:</strong> ${ownerPhone}</p>
          <p><strong>Email:</strong> ${ownerEmail}</p>
          <h4>Team Members</h4>
          <ul class="list-group">
            ${teamMembersHTML}
          </ul>
        </div>
      `;
      this.dispatchEvent(new CustomEvent('team-data', {
        detail: teamData,
        bubbles: true,
        composed: true
      }));
    }
  
    renderError(message) {
      this.shadowRoot.innerHTML = `
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
        <p class="text-danger">${message}</p>
      `;
    }
  }
  
  // Register the custom element
  customElements.define('team-detail', TeamDetail);
  