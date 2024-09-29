document.getElementById('startBtn').addEventListener('click', async () => {
    const role = document.getElementById('role').value;
    const response = await fetch(`/get-questions/${role}`);
    const data = await response.json();
    
    if (data.questions) {
      document.getElementById('questionsContainer').style.display = 'block';
      const questionsContainer = document.getElementById('questions');
      questionsContainer.innerHTML = ''; // Clear previous questions
      
      data.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
          <p>${index + 1}. ${question}</p>
          <textarea id="answer${index}"></textarea>
        `;
        questionsContainer.appendChild(questionDiv);
      });
    }
  });
  
  document.getElementById('submitBtn').addEventListener('click', () => {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '<h2>Your Answers:</h2>';
    
    const answers = [];
    document.querySelectorAll('textarea').forEach((textarea, index) => {
      answers.push(`Answer ${index + 1}: ${textarea.value}`);
    });
    
    resultContainer.innerHTML += answers.join('<br/>');
  });

  auth0.createAuth0Client({
    domain: "dev-etk34512zn1q2blm.us.auth0.com",
    clientId: "IvgB7YFyBqB1nEO7Y2DJISr6qSGyiUn2",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }).then(async (auth0Client) => {
    // Assumes a button with id "login" in the DOM
    const loginButton = document.getElementById("login");
  
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.loginWithRedirect();
    });
  
    if (location.search.includes("state=") && 
        (location.search.includes("code=") || 
        location.search.includes("error="))) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }
  
    // Assumes a button with id "logout" in the DOM
    const logoutButton = document.getElementById("logout");
  
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.logout({
        returnTo: window.location.origin // Redirect after logout
      });
    });
  
    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();
  
    // Assumes an element with id "profile" in the DOM
    const profileElement = document.getElementById("profile");
  
    if (isAuthenticated) {
      profileElement.style.display = "block";
      profileElement.innerHTML = `
        <p>${userProfile.name}</p>
        <img src="${userProfile.picture}" alt="User Profile Picture" />
      `;
      loginButton.style.display = "none"; // Hide login button when authenticated
      logoutButton.style.display = "block"; // Show logout button
    } else {
      profileElement.style.display = "none";
      loginButton.style.display = "block"; // Show login button
      logoutButton.style.display = "none"; // Hide logout button
    }
  });