document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function() {
      document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
      localStorage.setItem('legnapath_theme', this.checked ? 'dark' : 'light');
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('legnapath_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (themeToggle.checked = savedTheme === 'dark');
  }
  
  // Initialize charts on admin dashboard
  if (document.getElementById('userGrowthChart')) {
    initCharts();
  }
  
  // Form validations
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.classList.add('was-validated');
    });
  });

  // Initialize mentor rating system
  initRatingSystem();

  // Initialize tag input for mentor specializations
  initTagInput();

  // Initialize file upload preview
  initFileUpload();
});

// Initialize charts for admin dashboard
function initCharts() {
  // User Growth Chart
  const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
  new Chart(userGrowthCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Students',
        data: [120, 190, 170, 220, 280, 350],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.3,
        fill: true
      }, {
        label: 'Mentors',
        data: [15, 22, 30, 42, 55, 68],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Revenue Breakdown Chart
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  new Chart(revenueCtx, {
    type: 'doughnut',
    data: {
      labels: ['Mentor Earnings', 'Platform Fee', 'Host Institution'],
      datasets: [{
        data: [60, 20, 20],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    }
  });

  // Session Type Chart (if exists)
  const sessionTypeCtx = document.getElementById('sessionTypeChart');
  if (sessionTypeCtx) {
    new Chart(sessionTypeCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Programming', 'Mathematics', 'Science', 'Business', 'Other'],
        datasets: [{
          label: 'Sessions',
          data: [120, 85, 60, 45, 30],
          backgroundColor: [
            'rgba(76, 175, 80, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(255, 193, 7, 0.7)',
            'rgba(156, 39, 176, 0.7)',
            'rgba(158, 158, 158, 0.7)'
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(33, 150, 243, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(156, 39, 176, 1)',
            'rgba(158, 158, 158, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Top Courses Chart (if exists)
  const topCoursesCtx = document.getElementById('topCoursesChart');
  if (topCoursesCtx) {
    new Chart(topCoursesCtx.getContext('2d'), {
      type: 'polarArea',
      data: {
        labels: ['Python', 'Calculus', 'Physics', 'Web Dev', 'Statistics'],
        datasets: [{
          data: [35, 25, 20, 15, 10],
          backgroundColor: [
            'rgba(76, 175, 80, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(255, 193, 7, 0.7)',
            'rgba(156, 39, 176, 0.7)',
            'rgba(244, 67, 54, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    });
  }
}

// Initialize star rating system
function initRatingSystem() {
  const ratingContainers = document.querySelectorAll('.rating-input');
  
  ratingContainers.forEach(container => {
    const stars = container.querySelectorAll('.star');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        // Update visual rating
        stars.forEach((s, i) => {
          s.classList.toggle('active', i <= index);
        });
        
        // Update hidden input value
        if (hiddenInput) {
          hiddenInput.value = index + 1;
        }
      });
      
      star.addEventListener('mouseover', () => {
        // Highlight stars on hover
        stars.forEach((s, i) => {
          s.classList.toggle('hover', i <= index);
        });
      });
      
      star.addEventListener('mouseout', () => {
        // Remove hover highlights
        stars.forEach(s => s.classList.remove('hover'));
      });
    });
  });
}

// Initialize tag input for mentor specializations and languages
function initTagInput() {
  const tagInputs = document.querySelectorAll('.tags-input');
  
  tagInputs.forEach(container => {
    const input = container.querySelector('input[type="text"]');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    let tags = [];
    
    // Load existing tags from hidden input
    if (hiddenInput && hiddenInput.value) {
      tags = hiddenInput.value.split(',');
      renderTags();
    }
    
    // Add tag when pressing comma or enter
    input.addEventListener('keydown', function(e) {
      if (e.key === ',' || e.key === 'Enter') {
        e.preventDefault();
        const value = this.value.trim();
        
        if (value && !tags.includes(value)) {
          tags.push(value);
          renderTags();
          this.value = '';
          
          if (hiddenInput) {
            hiddenInput.value = tags.join(',');
          }
        }
      }
    });
    
    // Remove tag when clicking x
    container.addEventListener('click', function(e) {
      if (e.target.classList.contains('fa-times')) {
        const tag = e.target.parentElement;
        const index = Array.from(container.querySelectorAll('.tag')).indexOf(tag);
        
        if (index !== -1) {
          tags.splice(index, 1);
          renderTags();
          
          if (hiddenInput) {
            hiddenInput.value = tags.join(',');
          }
        }
      }
    });
    
    function renderTags() {
      const tagsHTML = tags.map(tag => `
        <span class="tag">${tag}<i class="fas fa-times"></i></span>
      `).join('');
      
      container.innerHTML = tagsHTML + `<input type="text" placeholder="${input.placeholder}">`;
      container.querySelector('input').focus();
    }
  });
}

// Initialize file upload preview
function initFileUpload() {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    input.addEventListener('change', function() {
      const preview = this.nextElementSibling;
      const file = this.files[0];
      
      if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          if (preview.tagName === 'IMG') {
            preview.src = e.target.result;
          } else if (preview.classList.contains('file-preview')) {
            preview.innerHTML = `
              <i class="fas fa-file"></i>
              <span>${file.name}</span>
              <small>${(file.size / 1024).toFixed(1)} KB</small>
            `;
          }
        };
        
        if (file.type.startsWith('image/')) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file);
        }
      }
    });
  });
}

// Initialize date pickers
function initDatePickers() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  
  dateInputs.forEach(input => {
    if (!input.value) {
      const today = new Date().toISOString().split('T')[0];
      input.value = today;
      input.min = today;
    }
  });
}

// Initialize time pickers
function initTimePickers() {
  const timeInputs = document.querySelectorAll('input[type="time"]');
  
  timeInputs.forEach(input => {
    if (!input.value) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      input.value = `${hours}:${minutes}`;
    }
  });
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initRatingSystem();
  initTagInput();
  initFileUpload();
  initDatePickers();
  initTimePickers();
});