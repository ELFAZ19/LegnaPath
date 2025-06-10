// Enhanced payment.js with modern features
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const paymentForm = document.getElementById('paymentForm');
  const paymentOptions = document.querySelectorAll('.payment-option');
  const paymentMethodSelect = document.getElementById('paymentMethod');
  const confirmPaymentBtn = document.getElementById('confirmPayment');
  const paymentSuccessModal = document.getElementById('paymentSuccessModal');
  const cancelPaymentBtn = document.querySelector('.cancel-payment');

  // Payment method details with enhanced options
  const paymentMethods = {
    telebirr: {
      name: 'Telebirr',
      instructions: 'Send payment to 0912345678 and include your user ID as reference',
      fields: [
        { 
          type: 'text', 
          name: 'telebirr_number', 
          label: 'Your Telebirr Number', 
          required: true,
          placeholder: '0912345678',
          pattern: '^09[0-9]{8}$'
        },
        {
          type: 'text',
          name: 'telebirr_pin',
          label: 'Telebirr PIN',
          required: false,
          placeholder: 'Optional for saved accounts'
        }
      ]
    },
    ebirr: {
      name: 'eBirr',
      instructions: 'Use biller code 12345 and your user ID as account number',
      fields: [
        { 
          type: 'text', 
          name: 'ebirr_account', 
          label: 'Your eBirr Account', 
          required: true,
          placeholder: 'Account number or phone'
        }
      ]
    },
    bank: {
      name: 'Bank Transfer',
      instructions: 'Transfer to Commercial Bank of Ethiopia, Account: 1234567890',
      fields: [
        { 
          type: 'select', 
          name: 'bank_name', 
          label: 'Bank Name', 
          required: true,
          options: [
            'Commercial Bank of Ethiopia',
            'Dashen Bank',
            'Awash Bank',
            'Abyssinia Bank',
            'Other'
          ]
        },
        { 
          type: 'text', 
          name: 'account_name', 
          label: 'Account Name', 
          required: true,
          placeholder: 'Your full name'
        },
        { 
          type: 'text', 
          name: 'transaction_id', 
          label: 'Transaction ID', 
          required: true,
          placeholder: 'Reference number'
        }
      ]
    }
  };

  // Current payment state
  let paymentState = {
    planType: 'light',
    sessionLength: 1,
    sessionsPerWeek: 2,
    paymentMethod: 'telebirr'
  };

  // Initialize payment form with enhanced features
  function initPaymentForm() {
    updatePaymentMethodFields();
    setupEventListeners();
    updatePriceCalculation();
    
    // Load saved payment method if exists
    const savedMethod = localStorage.getItem('preferredPaymentMethod');
    if (savedMethod && paymentMethods[savedMethod]) {
      paymentMethodSelect.value = savedMethod;
      updatePaymentMethodFields();
    }
  }

  // Update payment method specific fields with enhanced UI
  function updatePaymentMethodFields() {
    const method = paymentMethodSelect.value;
    paymentState.paymentMethod = method;
    localStorage.setItem('preferredPaymentMethod', method);
    
    const methodDetails = paymentMethods[method];
    const detailsContainer = document.getElementById('paymentMethodDetails');
    
    detailsContainer.innerHTML = `
      <div class="payment-method-header">
        <h4><i class="fas fa-${method === 'telebirr' ? 'mobile-alt' : method === 'ebirr' ? 'money-bill-wave' : 'university'}"></i> ${methodDetails.name} Payment</h4>
        <p class="method-instructions">${methodDetails.instructions}</p>
      </div>
      ${methodDetails.fields.map(field => `
        <div class="form-group">
          <label for="${field.name}">${field.label}</label>
          ${field.type === 'select' ? `
            <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
              ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
          ` : `
            <input type="${field.type}" id="${field.name}" name="${field.name}" 
                   ${field.required ? 'required' : ''}
                   ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
                   ${field.pattern ? `pattern="${field.pattern}"` : ''}>
          `}
        </div>
      `).join('')}
      ${method === 'telebirr' ? `
        <div class="save-payment">
          <input type="checkbox" id="saveTelebirr">
          <label for="saveTelebirr">Save Telebirr number for future payments</label>
        </div>
      ` : ''}
    `;
    
    // Load saved Telebirr number if exists
    if (method === 'telebirr') {
      const savedTelebirr = localStorage.getItem('savedTelebirr');
      if (savedTelebirr) {
        const telebirrInput = document.getElementById('telebirr_number');
        if (telebirrInput) telebirrInput.value = savedTelebirr;
      }
    }
  }

  // Handle payment confirmation with enhanced UX
  function confirmPayment() {
    if (!paymentForm.checkValidity()) {
      paymentForm.reportValidity();
      return;
    }
    
    // Show loading state
    const originalText = confirmPaymentBtn.innerHTML;
    confirmPaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    confirmPaymentBtn.disabled = true;
    
    // In a real app, this would submit to your backend
    const formData = new FormData(paymentForm);
    const paymentData = {
      planType: paymentState.planType,
      sessionLength: paymentState.sessionLength,
      sessionsPerWeek: paymentState.sessionsPerWeek,
      paymentMethod: paymentState.paymentMethod,
      details: {}
    };
    
    formData.forEach((value, key) => {
      paymentData.details[key] = value;
    });
    
    // Save Telebirr number if checkbox is checked
    if (paymentState.paymentMethod === 'telebirr' && document.getElementById('saveTelebirr')?.checked) {
      localStorage.setItem('savedTelebirr', paymentData.details.telebirr_number);
    }
    
    console.log('Payment data:', paymentData);
    
    // Simulate API call
    setTimeout(() => {
      // Show success modal
      paymentSuccessModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Reset button
      confirmPaymentBtn.innerHTML = originalText;
      confirmPaymentBtn.disabled = false;
      
      // In a real app, you would redirect or update UI based on payment result
      setTimeout(() => {
        paymentSuccessModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Update dashboard status
        updateDashboardAfterPayment();
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      }, 3000);
    }, 2000);
  }

  // Update dashboard after successful payment
  function updateDashboardAfterPayment() {
    const userData = JSON.parse(localStorage.getItem('legnapath_user')) || {};
    
    // Add to user's payment history
    if (!userData.payments) userData.payments = [];
    userData.payments.push({
      date: new Date().toISOString(),
      amount: calculateTotal(),
      mentor: document.querySelector('h2')?.textContent.replace('Request Mentorship with ', '') || 'Unknown Mentor'
    });
    
    localStorage.setItem('legnapath_user', JSON.stringify(userData));
    
    // Update pending requests
    const pendingRequests = document.getElementById('pendingRequests');
    if (pendingRequests) {
      pendingRequests.textContent = '1 mentor reviewing your request';
    }
  }

  // Calculate total payment amount
  function calculateTotal() {
    let rate;
    switch(paymentState.planType) {
      case 'light': rate = 30; break;
      case 'medium': rate = 50; break;
      case 'heavy': rate = 80; break;
    }
    
    return rate * paymentState.sessionLength * paymentState.sessionsPerWeek;
  }

  // Update price calculation based on selected options
  function updatePriceCalculation() {
    const selectedOption = document.querySelector('.payment-option.selected');
    if (!selectedOption) return;
    
    paymentState.planType = selectedOption.dataset.type;
    paymentState.sessionLength = parseFloat(document.getElementById('sessionLength').value);
    paymentState.sessionsPerWeek = parseInt(document.getElementById('sessionsPerWeek').value);
    
    let rate, planName;
    switch(paymentState.planType) {
      case 'light':
        rate = 30;
        planName = 'Light';
        break;
      case 'medium':
        rate = 50;
        planName = 'Medium';
        break;
      case 'heavy':
        rate = 80;
        planName = 'Heavy';
        break;
    }
    
    const weeklyTotal = rate * paymentState.sessionLength * paymentState.sessionsPerWeek;
    const monthlyTotal = weeklyTotal * 4;
    
    document.getElementById('planType').textContent = `${planName} (${rate} ETB/hr)`;
    document.getElementById('sessionLengthDisplay').textContent = `${paymentState.sessionLength} hour${paymentState.sessionLength === 1 ? '' : 's'}`;
    document.getElementById('sessionsPerWeekDisplay').textContent = paymentState.sessionsPerWeek;
    document.getElementById('weeklyTotal').textContent = `${weeklyTotal} ETB`;
    document.getElementById('monthlyTotal').textContent = `${monthlyTotal} ETB`;
    
    // Update breakdown
    document.getElementById('mentorEarnings').textContent = `${Math.round(weeklyTotal * 0.6)} ETB (60%)`;
    document.getElementById('platformEarnings').textContent = `${Math.round(weeklyTotal * 0.2)} ETB (20%)`;
    document.getElementById('hostEarnings').textContent = `${Math.round(weeklyTotal * 0.2)} ETB (20%)`;
  }

  // Setup event listeners with enhanced features
  function setupEventListeners() {
    // Payment option selection
    paymentOptions.forEach(option => {
      option.addEventListener('click', function() {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        paymentState.planType = this.dataset.type;
        updatePriceCalculation();
      });
    });
    
    // Payment method change
    paymentMethodSelect.addEventListener('change', function() {
      paymentState.paymentMethod = this.value;
      updatePaymentMethodFields();
    });
    
    // Form submission
    if (paymentForm) {
      paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        confirmPayment();
      });
    }
    
    // Confirm payment button
    if (confirmPaymentBtn) {
      confirmPaymentBtn.addEventListener('click', confirmPayment);
    }
    
    // Cancel payment button
    if (cancelPaymentBtn) {
      cancelPaymentBtn.addEventListener('click', function() {
        window.history.back();
      });
    }
    
    // Input changes
    document.getElementById('sessionLength')?.addEventListener('change', function() {
      paymentState.sessionLength = parseFloat(this.value);
      updatePriceCalculation();
    });
    
    document.getElementById('sessionsPerWeek')?.addEventListener('input', function() {
      paymentState.sessionsPerWeek = parseInt(this.value) || 1;
      updatePriceCalculation();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (paymentSuccessModal.classList.contains('active')) {
          paymentSuccessModal.classList.remove('active');
          document.body.style.overflow = 'auto';
          window.location.href = 'dashboard.html';
        }
      }
    });
  }

  // Initialize
  initPaymentForm();
});