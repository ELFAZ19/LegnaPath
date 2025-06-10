// Paste this in frontend/plugin/plugin.js
document.addEventListener('DOMContentLoaded', function() {
  // Check if the plugin is already injected
  if (window.legnaPathInjected) return;
  window.legnaPathInjected = true;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    .legnapath-assistance-btn {
      padding: 10px 15px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin: 10px 0;
      transition: all 0.3s;
    }
    .legnapath-assistance-btn:hover {
      background: #3e8e41;
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);

  // Inject the assistance button into the host platform
  function injectAssistanceButton() {
    const contentAreas = document.querySelectorAll('.course-content, .module-content, .lesson-content, .content-area');
    
    contentAreas.forEach(area => {
      if (!area.querySelector('.legnapath-assistance-btn')) {
        const btn = document.createElement('button');
        btn.className = 'legnapath-assistance-btn';
        btn.innerHTML = '<i class="fas fa-hands-helping"></i> Get Personal Assistance';
        btn.dataset.legnapath = 'true';
        
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openLegnaPathPopup();
        });
        
        // Try to insert near the main content
        const header = area.querySelector('h1, h2, h3') || area;
        header.insertAdjacentElement('afterend', btn);
      }
    });
  }

  function openLegnaPathPopup() {
    // Check if user is logged in (simplified for frontend-only)
    const isLoggedIn = localStorage.getItem('legnapath_token');
    const userRole = localStorage.getItem('legnapath_role');
    
    if (isLoggedIn && userRole === 'student') {
      // Redirect to dashboard (in a real app, this would be your dashboard URL)
      window.open('student/dashboard.html', '_blank');
    } else if (isLoggedIn && userRole === 'mentor') {
      window.open('mentor/dashboard.html', '_blank');
    } else {
      // Open auth modal
      const popup = window.open('auth/login.html', 'legnapath_auth', 
        'width=600,height=700,scrollbars=yes');
      
      // Focus the popup
      if (window.focus) popup.focus();
    }
  }

  // Initial injection
  injectAssistanceButton();
  
  // Observe DOM changes for SPA platforms
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(() => {
      injectAssistanceButton();
    });
  });

  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });

  // Add Font Awesome if not present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(faLink);
  }
});