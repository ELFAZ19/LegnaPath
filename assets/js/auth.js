document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const roleSelection = document.getElementById('roleSelection');
  const roleButtons = document.querySelectorAll('.role-btn');
  const mentorFields = document.querySelector('.mentor-fields');
  const passwordInputs = document.querySelectorAll('.password-input input');
  const togglePasswordIcons = document.querySelectorAll('.toggle-password');
  const signupPassword = document.getElementById('signupPassword');
  const passwordStrength = document.querySelector('.password-strength');
  
  // Role Selection
  if (roleButtons.length > 0) {
    roleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        roleButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide mentor fields
        if (this.dataset.role === 'mentor') {
          mentorFields.style.display = 'block';
        } else {
          mentorFields.style.display = 'none';
        }
      });
    });
  }
  
  // Toggle Password Visibility
  togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  });
  
  // Password Strength Checker
  if (signupPassword) {
    signupPassword.addEventListener('input', function() {
      const password = this.value;
      let strength = 0;
      
      // Length check
      if (password.length >= 8) strength++;
      // Contains numbers
      if (/\d/.test(password)) strength++;
      // Contains special chars
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
      // Contains uppercase
      if (/[A-Z]/.test(password)) strength++;
      
      // Update UI
      passwordStrength.className = 'password-strength';
      if (password.length === 0) {
        passwordStrength.querySelector('.strength-text').textContent = '';
      } else if (strength <= 1) {
        passwordStrength.classList.add('password-weak');
        passwordStrength.querySelector('.strength-text').textContent = 'Weak';
      } else if (strength <= 3) {
        passwordStrength.classList.add('password-medium');
        passwordStrength.querySelector('.strength-text').textContent = 'Medium';
      } else {
        passwordStrength.classList.add('password-strong');
        passwordStrength.querySelector('.strength-text').textContent = 'Strong';
      }
    });
  }
  
  // Form Validation and Submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      // Simple validation
      if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate login (in a real app, this would be an API call)
      localStorage.setItem('legnapath_token', 'simulated_token');
      localStorage.setItem('legnapath_role', 'student'); // Default to student for demo
      
      // Redirect based on role (in a real app, this would come from the API response)
      const role = localStorage.getItem('legnapath_role');
      if (role === 'student') {
        window.location.href = '../student/dashboard.html';
      } else if (role === 'mentor') {
        window.location.href = '../mentor/dashboard.html';
      } else if (role === 'admin') {
        window.location.href = '../admin/dashboard.html';
      }
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const agreeTerms = document.getElementById('agreeTerms').checked;
      const role = document.querySelector('.role-btn.active').dataset.role;
      
      // Validation
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showAlert('Please fill in all required fields', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
      }
      
      if (password.length < 8) {
        showAlert('Password must be at least 8 characters', 'error');
        return;
      }
      
      if (!agreeTerms) {
        showAlert('You must agree to the terms and conditions', 'error');
        return;
      }
      
      // Simulate signup (in a real app, this would be an API call)
      localStorage.setItem('legnapath_token', 'simulated_token');
      localStorage.setItem('legnapath_role', role);
      localStorage.setItem('legnapath_user', JSON.stringify({
        firstName,
        lastName,
        email,
        role
      }));
      
      // Redirect based on role
      if (role === 'student') {
        window.location.href = '../student/dashboard.html';
      } else {
        window.location.href = '../mentor/dashboard.html';
      }
    });
  }
  
  // Show alert function
  function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.innerHTML = `
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
      <span>${message}</span>
    `;
    
    const authForm = document.querySelector('.auth-form');
    authForm.prepend(alertDiv);
    
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
  
  // Social login buttons
  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      showAlert('Social login would be implemented in a real app', 'error');
    });
  });
});