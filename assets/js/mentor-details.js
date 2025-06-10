document.addEventListener('DOMContentLoaded', function() {
  // Request Mentorship Modal
  const requestBtn = document.querySelector('.request-mentor');
  const requestModal = document.getElementById('requestModal');
  const closeModal = document.querySelector('.close-modal');
  const cancelRequest = document.querySelector('.cancel-request');
  
  if (requestBtn && requestModal) {
    requestBtn.addEventListener('click', function() {
      requestModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
      requestModal.classList.remove('active');
    });
    
    cancelRequest.addEventListener('click', function() {
      requestModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === requestModal) {
        requestModal.classList.remove('active');
      }
    });
  }
  
  // Form submission
  const requestForm = document.getElementById('mentorshipRequestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const message = document.getElementById('requestMessage').value;
      const preferredTime = document.getElementById('preferredTime').value;
      const sessionFrequency = document.getElementById('sessionFrequency').value;
      const sessionLength = document.getElementById('sessionLength').value;
      
      // In a real app, this would send to your backend
      console.log('Mentorship Request:', {
        message,
        preferredTime,
        sessionFrequency,
        sessionLength
      });
      
      // Show success message and redirect
      alert('Your mentorship request has been submitted successfully!');
      requestModal.classList.remove('active');
      window.location.href = 'dashboard.html';
    });
  }
  
  // View all testimonials
  const viewAllBtn = document.querySelector('.view-all-testimonials');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function() {
      alert('This would show all testimonials in a separate page or expanded view');
    });
  }
});