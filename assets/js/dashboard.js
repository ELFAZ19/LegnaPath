// Enhanced dashboard.js with modern functionality
document.addEventListener('DOMContentLoaded', function() {
  // Load user data with error handling
  let userData;
  try {
    userData = JSON.parse(localStorage.getItem('legnapath_user')) || {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'student',
      avatar: '../../assets/images/default-avatar.png'
    };
  } catch (e) {
    console.error('Error parsing user data:', e);
    userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'student',
      avatar: '../../assets/images/default-avatar.png'
    };
  }

  // Set user name and avatar
  document.getElementById('studentName').textContent = userData.firstName;
  document.getElementById('displayName').textContent = `${userData.firstName} ${userData.lastName}`;
  document.getElementById('userAvatar').src = userData.avatar;
  
  // Set mentor name if on mentor dashboard
  const mentorNameElement = document.getElementById('mentorName');
  if (mentorNameElement) {
    mentorNameElement.textContent = userData.firstName;
  }

  // Theme Toggle with enhanced functionality
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('legnapath_theme', newTheme);
      
      // Update theme toggle icon
      const moonIcon = themeToggle.querySelector('.fa-moon');
      const sunIcon = themeToggle.querySelector('.fa-sun');
      if (newTheme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
      } else {
        moonIcon.style.display = 'inline-block';
        sunIcon.style.display = 'none';
      }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('legnapath_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Set initial icon state
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    if (savedTheme === 'dark') {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline-block';
    } else {
      moonIcon.style.display = 'inline-block';
      sunIcon.style.display = 'none';
    }
  }
  
  // Sample mentor data with enhanced structure
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Computer Science Professor',
      image: '../../assets/images/mentor1.jpg',
      rating: 4.8,
      specialty: 'Programming, Algorithms',
      bio: 'With over 10 years of experience in teaching computer science, I specialize in helping students understand complex programming concepts through practical examples and real-world applications.',
      skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
      students: 245,
      sessions: 1200,
      languages: ['English', 'Amharic'],
      availability: ['Mon 9am-12pm', 'Wed 2pm-5pm', 'Fri 10am-1pm'],
      about: 'I hold a PhD in Computer Science from Addis Ababa University and have been teaching at the university level for over a decade. My approach focuses on building strong fundamentals while keeping the learning process engaging and practical.',
      education: [
        'PhD in Computer Science, Addis Ababa University (2015)',
        'MSc in Software Engineering, AAU (2010)',
        'BSc in Computer Science, AAU (2007)'
      ],
      experience: [
        'Professor of Computer Science, Addis Ababa University (2015-Present)',
        'Senior Software Engineer, Tech Solutions Inc. (2010-2015)'
      ]
    },
    {
      id: 2,
      name: 'Michael Teka',
      title: 'Software Engineer at Google',
      image: '../../assets/images/mentor2.jpg',
      rating: 4.9,
      specialty: 'Web Development, System Design',
      bio: 'Industry professional with 5 years of experience at top tech companies. I can help you prepare for technical interviews and master modern web technologies.',
      skills: ['JavaScript', 'React', 'Node.js', 'System Design'],
      students: 180,
      sessions: 850,
      languages: ['English'],
      availability: ['Tue 6pm-9pm', 'Thu 6pm-9pm', 'Sat 10am-4pm'],
      about: 'After graduating with a degree in Software Engineering, I joined Google where I work on large-scale web applications. I enjoy mentoring students and helping them bridge the gap between academic knowledge and industry requirements.',
      education: [
        'PhD in Computer Science, Addis Ababa University (2015)',
        'MSc in Software Engineering, AAU (2010)',
        'BSc in Computer Science, AAU (2007)'
      ],
      experience: [
        'Professor of Computer Science, Addis Ababa University (2015-Present)',
        'Senior Software Engineer, Tech Solutions Inc. (2010-2015)'
      ]
    },
    {
      id: 3,
      name: 'Amina Mohammed',
      title: 'Mathematics Tutor',
      image: '../../assets/images/mentor3.jpg',
      rating: 4.7,
      specialty: 'Calculus, Linear Algebra',
      bio: 'Specialized in making complex mathematical concepts accessible to students of all levels through clear explanations and step-by-step guidance.',
      skills: ['Calculus', 'Linear Algebra', 'Statistics', 'Discrete Math'],
      students: 320,
      sessions: 1500,
      languages: ['Amharic', 'English'],
      availability: ['Mon-Fri 4pm-8pm', 'Sat 9am-3pm'],
      about: 'With a Master\'s degree in Mathematics and 8 years of tutoring experience, I\'ve developed effective methods to help students overcome their fear of math and develop problem-solving skills that extend beyond the classroom.',
      education: [
        'PhD in Computer Science, Addis Ababa University (2015)',
        'MSc in Software Engineering, AAU (2010)',
        'BSc in Computer Science, AAU (2007)'
      ],
      experience: [
        'Professor of Computer Science, Addis Ababa University (2015-Present)',
        'Senior Software Engineer, Tech Solutions Inc. (2010-2015)'
      ]
    },
    {
      id: 4,
      name: 'Daniel Assefa',
      title: 'Data Science Mentor',
      image: '../../assets/images/mentor4.jpg',
      rating: 4.6,
      specialty: 'Machine Learning, Data Analysis',
      bio: 'Passionate about teaching data science tools and techniques to help students become proficient in this high-demand field.',
      skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
      students: 150,
      sessions: 700,
      languages: ['English'],
      availability: ['Mon 6pm-9pm', 'Wed 6pm-9pm', 'Sun 10am-2pm'],
      about: 'I work as a Data Scientist at a leading tech company and hold a Master\'s in Data Science. My mentoring approach combines theoretical foundations with hands-on projects to ensure students gain practical skills they can apply immediately.',
      education: [
        'PhD in Computer Science, Addis Ababa University (2015)',
        'MSc in Software Engineering, AAU (2010)',
        'BSc in Computer Science, AAU (2007)'
      ],
      experience: [
        'Professor of Computer Science, Addis Ababa University (2015-Present)',
        'Senior Software Engineer, Tech Solutions Inc. (2010-2015)'
      ]
    },
    // ... other mentors
  ];

  // Enhanced mentor card rendering with filtering
  const mentorGrid = document.querySelector('.mentor-grid');
  if (mentorGrid) {
    renderMentorCards(mentors);
    
    // Setup filter functionality
    const courseFilter = document.getElementById('courseFilter');
    const languageFilter = document.getElementById('languageFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener('click', function() {
        const filteredMentors = mentors.filter(mentor => {
          // Course filter
          const courseMatch = courseFilter.value === 'all' || 
            mentor.specialty.toLowerCase().includes(courseFilter.value.toLowerCase()) ||
            mentor.skills.some(skill => skill.toLowerCase().includes(courseFilter.value.toLowerCase()));
          
          // Language filter
          const languageMatch = languageFilter.value === 'all' || 
            mentor.languages.some(lang => lang.toLowerCase().includes(languageFilter.value.toLowerCase()));
          
          // Availability filter
          let availabilityMatch = availabilityFilter.value === 'all';
          if (!availabilityMatch) {
            const time = availabilityFilter.value;
            availabilityMatch = mentor.availability.some(slot => {
              if (time === 'morning') return slot.includes('AM') || slot.includes('am');
              if (time === 'afternoon') return slot.includes('PM') && !slot.includes('evening');
              if (time === 'evening') return slot.includes('PM') || slot.includes('evening');
              return true;
            });
          }
          
          return courseMatch && languageMatch && availabilityMatch;
        });
        
        renderMentorCards(filteredMentors);
      });
    }
  }

  function renderMentorCards(mentorsToRender) {
    mentorGrid.innerHTML = '';
    
    if (mentorsToRender.length === 0) {
      mentorGrid.innerHTML = '<div class="no-results">No mentors match your filters. Try adjusting your search criteria.</div>';
      return;
    }
    
    mentorsToRender.forEach(mentor => {
      const card = document.createElement('div');
      card.className = 'mentor-card';
      card.innerHTML = `
        <div class="mentor-image">
          <img src="${mentor.image}" alt="${mentor.name}" loading="lazy">
          <div class="mentor-rating">
            <span>${mentor.rating}</span>
            <i class="fas fa-star"></i>
          </div>
        </div>
        <div class="mentor-info">
          <h3 class="mentor-name">${mentor.name}</h3>
          <p class="mentor-specialty">${mentor.specialty}</p>
          <p class="mentor-bio">${mentor.bio}</p>
          <div class="mentor-skills">
            ${mentor.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
          <div class="mentor-actions">
            <button class="btn-outline view-details" data-id="${mentor.id}">View Details</button>
            <button class="btn-primary request-mentor" data-id="${mentor.id}">Request</button>
          </div>
        </div>
      `;
      mentorGrid.appendChild(card);
    });
  }

  // Enhanced modal functionality
  const mentorModal = document.getElementById('mentorModal');
  const paymentModal = document.getElementById('paymentModal');
  
  // Close modal when clicking outside content
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });

  // View Details button handler
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-details')) {
      e.preventDefault();
      const mentorId = parseInt(e.target.dataset.id);
      const mentor = mentors.find(m => m.id === mentorId);
      
      if (mentor) {
        document.getElementById('mentorModalBody').innerHTML = `
          <div class="mentor-details">
            <div class="mentor-profile">
              <img src="${mentor.image}" alt="${mentor.name}" loading="lazy">
              <h2>${mentor.name}</h2>
              <p class="mentor-title">${mentor.title}</p>
              <div class="mentor-rating-large">
                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(mentor.rating))}
                ${mentor.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                <span>${mentor.rating} (${mentor.students}+ students)</span>
              </div>
              <div class="mentor-stats">
                <div class="stat-item">
                  <div class="stat-value">${mentor.sessions}+</div>
                  <div class="stat-label">Sessions</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${mentor.languages.length}</div>
                  <div class="stat-label">Languages</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${mentor.availability.length}</div>
                  <div class="stat-label">Slots</div>
                </div>
              </div>
              <button class="btn-primary request-mentor" data-id="${mentor.id}">Request Mentorship</button>
            </div>
            <div class="mentor-about">
              <h3>About Me</h3>
              <p>${mentor.about}</p>
              
              <div class="education">
                <h4>Education</h4>
                <ul>
                  ${mentor.education.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              
              <div class="experience">
                <h4>Professional Experience</h4>
                <ul>
                  ${mentor.experience.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              
              <div class="mentor-skills-large">
                <h3>Skills & Expertise</h3>
                <div class="skills-list">
                  ${mentor.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
              </div>
              
              <div class="mentor-availability">
                <h3>Availability</h3>
                <div class="availability-slots">
                  ${mentor.availability.map(slot => `<span class="slot">${slot}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
        
        mentorModal.classList.add('active');
      }
    }
    
    // Request Mentor button handler
    if (e.target.classList.contains('request-mentor')) {
      e.preventDefault();
      const mentorId = parseInt(e.target.dataset.id);
      const mentor = mentors.find(m => m.id === mentorId);
      
      if (mentor) {
        document.getElementById('paymentModalBody').innerHTML = `
          <div class="payment-form">
            <h2>Request Mentorship with ${mentor.name}</h2>
            
            <div class="payment-options">
              <div class="payment-option selected" data-type="light">
                <i class="fas fa-leaf"></i>
                <h4>Light</h4>
                <p>30 ETB/hr</p>
                <p>1-2 sessions/week</p>
              </div>
              <div class="payment-option" data-type="medium">
                <i class="fas fa-balance-scale"></i>
                <h4>Medium</h4>
                <p>50 ETB/hr</p>
                <p>3-4 sessions/week</p>
              </div>
              <div class="payment-option" data-type="heavy">
                <i class="fas fa-dumbbell"></i>
                <h4>Heavy</h4>
                <p>80 ETB/hr</p>
                <p>5+ sessions/week</p>
              </div>
            </div>
            
            <div class="payment-details">
              <div class="form-group">
                <label for="sessionLength">Session Length (hours)</label>
                <select id="sessionLength">
                  <option value="1">1 hour</option>
                  <option value="1.5">1.5 hours</option>
                  <option value="2">2 hours</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="sessionsPerWeek">Sessions per Week</label>
                <input type="number" id="sessionsPerWeek" min="1" max="7" value="2">
              </div>
              
              <div class="form-group">
                <label for="paymentMethod">Payment Method</label>
                <select id="paymentMethod">
                  <option value="telebirr">Telebirr</option>
                  <option value="ebirr">eBirr</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
            </div>
            
            <div class="payment-summary">
              <h3>Payment Summary</h3>
              <div class="summary-row">
                <span>Mentorship Plan:</span>
                <span class="plan-type">Light (30 ETB/hr)</span>
              </div>
              <div class="summary-row">
                <span>Session Length:</span>
                <span class="session-length">1 hour</span>
              </div>
              <div class="summary-row">
                <span>Sessions/Week:</span>
                <span class="sessions-week">2</span>
              </div>
              <div class="summary-row summary-total">
                <span>Weekly Total:</span>
                <span class="weekly-total">60 ETB</span>
              </div>
            </div>
            
            <div class="payment-actions">
              <button class="btn-outline cancel-payment">Cancel</button>
              <button class="btn-primary confirm-payment">Confirm Payment</button>
            </div>
          </div>
        `;
        
        // Close mentor modal and open payment modal
        mentorModal.classList.remove('active');
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set up payment option selection
        const paymentOptions = document.querySelectorAll('.payment-option');
        paymentOptions.forEach(option => {
          option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            updatePaymentSummary();
          });
        });
        
        // Set up payment summary updates
        document.getElementById('sessionLength').addEventListener('change', updatePaymentSummary);
        document.getElementById('sessionsPerWeek').addEventListener('input', updatePaymentSummary);
        
        function updatePaymentSummary() {
          const selectedOption = document.querySelector('.payment-option.selected');
          const planType = selectedOption.dataset.type;
          const sessionLength = document.getElementById('sessionLength').value;
          const sessionsPerWeek = document.getElementById('sessionsPerWeek').value;
          
          let rate, planName;
          switch(planType) {
            case 'light':
              rate = 30;
              planName = 'Light (30 ETB/hr)';
              break;
            case 'medium':
              rate = 50;
              planName = 'Medium (50 ETB/hr)';
              break;
            case 'heavy':
              rate = 80;
              planName = 'Heavy (80 ETB/hr)';
              break;
          }
          
          const weeklyTotal = rate * parseFloat(sessionLength) * parseInt(sessionsPerWeek);
          
          document.querySelector('.plan-type').textContent = planName;
          document.querySelector('.session-length').textContent = `${sessionLength} hour${sessionLength === '1' ? '' : 's'}`;
          document.querySelector('.sessions-week').textContent = sessionsPerWeek;
          document.querySelector('.weekly-total').textContent = `${weeklyTotal} ETB`;
        }
        
        // Initial update
        updatePaymentSummary();
      }
    }
    
    // Close modal buttons
    if (e.target.classList.contains('close-modal') || e.target.classList.contains('cancel-payment')) {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    }
    
    // Confirm payment button
    if (e.target.classList.contains('confirm-payment')) {
      const button = e.target;
      const originalText = button.textContent;
      
      // Show loading state
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      button.disabled = true;
      
      // Simulate payment processing
      setTimeout(() => {
        alert('Payment processed successfully! Redirecting to dashboard...');
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Update connection status
        const pendingCard = document.querySelector('.status-card.pending');
        if (pendingCard) {
          pendingCard.querySelector('.progress').style.width = '100%';
          pendingCard.querySelector('.card-content p').textContent = 'Mentor reviewing your request';
        }
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      }, 2000);
    }
  });

  // Applications page functionality
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', function() {
      const status = this.value;
      const applications = document.querySelectorAll('.application-card');
      
      applications.forEach(app => {
        if (status === 'all' || app.classList.contains(status)) {
          app.style.display = 'block';
        } else {
          app.style.display = 'none';
        }
      });
    });
  }

  // Accept/Decline buttons for mentor applications
  document.querySelectorAll('.application-actions .btn-primary').forEach(btn => {
    if (btn.textContent.includes('Accept')) {
      btn.addEventListener('click', function() {
        const card = this.closest('.application-card');
        card.classList.remove('pending');
        card.classList.add('accepted');
        card.querySelector('.status-badge').className = 'status-badge accepted';
        card.querySelector('.status-badge').textContent = 'Accepted';
        
        // Show success notification
        showNotification('Application accepted! A session has been scheduled.', 'success');
      });
    }
  });

  document.querySelectorAll('.application-actions .btn-outline').forEach(btn => {
    if (btn.textContent.includes('Decline')) {
      btn.addEventListener('click', function() {
        if (confirm('Are you sure you want to decline this application?')) {
          const card = this.closest('.application-card');
          card.classList.remove('pending');
          card.classList.add('declined');
          card.querySelector('.status-badge').className = 'status-badge declined';
          card.querySelector('.status-badge').textContent = 'Declined';
          
          // Show info notification
          showNotification('Application declined.', 'info');
        }
      });
    }
  });

  // Profile page functionality
  const photoUpload = document.getElementById('photoUpload');
  if (photoUpload) {
    photoUpload.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
          document.getElementById('profileImage').src = event.target.result;
          
          // Update user avatar in local storage
          const userData = JSON.parse(localStorage.getItem('legnapath_user')) || {};
          userData.avatar = event.target.result;
          localStorage.setItem('legnapath_user', JSON.stringify(userData));
          
          // Show success notification
          showNotification('Profile picture updated successfully!', 'success');
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  // Helper function to show notifications
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
});