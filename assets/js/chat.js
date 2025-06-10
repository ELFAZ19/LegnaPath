// Enhanced chat.js with modern features
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const chatContainer = document.querySelector('.chat-container');
  const chatSidebar = document.querySelector('.chat-sidebar');
  const chatTabs = document.querySelectorAll('.chat-tab');
  const chatList = document.querySelector('.chat-list');
  const conversationArea = document.querySelector('.chat-conversation');
  const messageInput = document.querySelector('.chat-input textarea');
  const sendButton = document.querySelector('.chat-input-btn.send');
  const backButton = document.querySelector('.back-button');
  const emojiButton = document.querySelector('.emoji-btn');
  const attachButton = document.querySelector('.attach-btn');
  const profileButton = document.querySelector('.profile-btn');
  const chatProfile = document.querySelector('.chat-profile');

  // Enhanced sample data with typing indicators and message status
  const students = [
    {
      id: 1,
      name: 'Michael Teka',
      avatar: '../../assets/images/student1.jpg',
      role: 'Student',
      lastMessage: 'Thanks for the help with the Python project!',
      time: '10:30 AM',
      unread: 2,
      online: true,
      typing: false,
      messages: [
        {
          id: 1,
          text: 'Hi, I need help with my Python project',
          time: '10:00 AM',
          sent: false,
          status: 'delivered'
        },
        {
          id: 2,
          text: 'Sure, what specifically do you need help with?',
          time: '10:05 AM',
          sent: true,
          status: 'read'
        },
        {
          id: 3,
          text: 'I\'m stuck on the object-oriented part',
          time: '10:15 AM',
          sent: false,
          status: 'delivered'
        },
        {
          id: 4,
          text: 'Can we schedule a session for tomorrow?',
          time: '10:20 AM',
          sent: false,
          status: 'delivered'
        },
        {
          id: 5,
          text: 'Yes, how about 2pm?',
          time: '10:25 AM',
          sent: true,
          status: 'read'
        },
        {
          id: 6,
          text: 'Thanks for the help with the Python project!',
          time: '10:30 AM',
          sent: false,
          status: 'delivered'
        }
      ]
    },
    {
      id: 2,
      name: 'Amina Mohammed',
      avatar: '../../assets/images/student2.jpg',
      role: 'Student',
      lastMessage: 'I finished the calculus problems you assigned',
      time: 'Yesterday',
      unread: 0,
      online: false,
      typing: false,
      messages: [
        {
          id: 1,
          text: 'I\'m having trouble with these calculus problems',
          time: '9:00 AM',
          sent: false,
          status: 'delivered'
        },
        {
          id: 2,
          text: 'Let me see which ones are giving you trouble',
          time: '9:05 AM',
          sent: true,
          status: 'read'
        },
        {
          id: 3,
          text: 'Problems 5 and 7 from chapter 3',
          time: '9:10 AM',
          sent: false,
          status: 'delivered'
        },
        {
          id: 4,
          text: 'Try using the chain rule for problem 5',
          time: '9:15 AM',
          sent: true,
          status: 'read'
        },
        {
          id: 5,
          text: 'I finished the calculus problems you assigned',
          time: '4:30 PM',
          sent: false,
          status: 'delivered'
        }
      ]
    }
  ];

  const mentors = [
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      avatar: '../../assets/images/mentor1.jpg',
      role: 'Mentor',
      lastMessage: 'Don\'t forget about our session tomorrow',
      time: '2 days ago',
      unread: 0,
      online: true,
      typing: true,
      messages: [
        {
          id: 1,
          text: 'How is the data structures assignment going?',
          time: 'Monday',
          sent: false,
          status: 'delivered'
        },
        {
          id: 2,
          text: 'I\'m about halfway through',
          time: 'Monday',
          sent: true,
          status: 'read'
        },
        {
          id: 3,
          text: 'Let me know if you need help with the tree traversal',
          time: 'Tuesday',
          sent: false,
          status: 'delivered'
        },
        {
          id: 4,
          text: 'Will do, thanks!',
          time: 'Tuesday',
          sent: true,
          status: 'read'
        },
        {
          id: 5,
          text: 'Don\'t forget about our session tomorrow',
          time: 'Wednesday',
          sent: false,
          status: 'delivered'
        }
      ]
    }
  ];

  // Current state
  let currentTab = 'students';
  let currentChat = null;
  let isTyping = false;
  let typingTimeout = null;

  // Initialize chat with enhanced features
  function initChat() {
    renderChatList();
    setupEventListeners();
    
    // Load last opened chat from localStorage
    const lastChatId = localStorage.getItem('lastChatId');
    if (lastChatId) {
      const chat = [...students, ...mentors].find(c => c.id.toString() === lastChatId);
      if (chat) {
        renderConversation(chat.id);
      }
    }
    
    // Check for unread messages
    checkUnreadMessages();
  }

  // Render chat list with enhanced UI
  function renderChatList() {
    chatList.innerHTML = '';
    const chats = currentTab === 'students' ? students : mentors;
    
    if (chats.length === 0) {
      chatList.innerHTML = `<div class="no-chats">No ${currentTab} found</div>`;
      return;
    }
    
    chats.forEach(chat => {
      const chatItem = document.createElement('div');
      chatItem.className = `chat-item ${currentChat?.id === chat.id ? 'active' : ''}`;
      chatItem.dataset.id = chat.id;
      chatItem.innerHTML = `
        <div class="chat-item-header">
          <div class="chat-item-user">
            <img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar ${chat.online ? 'online' : ''}">
            <span class="chat-item-name">${chat.name}</span>
          </div>
          <span class="chat-item-time">${chat.time}</span>
        </div>
        <div class="chat-item-preview">
          ${chat.typing ? '<span class="typing-indicator"><span></span><span></span><span></span></span>' : chat.lastMessage}
        </div>
        ${chat.unread > 0 ? `<span class="unread-badge">${chat.unread}</span>` : ''}
      `;
      chatList.appendChild(chatItem);
    });
  }

  // Enhanced conversation rendering
  function renderConversation(chatId) {
    const chats = currentTab === 'students' ? students : mentors;
    currentChat = chats.find(chat => chat.id === chatId);
    
    if (!currentChat) return;
    
    // Save last opened chat
    localStorage.setItem('lastChatId', chatId.toString());
    
    // Render profile in sidebar
    renderProfile(currentChat);
    
    conversationArea.innerHTML = '';
    currentChat.messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;
      messageDiv.dataset.id = message.id;
      messageDiv.innerHTML = `
        ${!message.sent ? `<img src="${currentChat.avatar}" alt="${currentChat.name}" class="message-avatar">` : ''}
        <div class="message-content">
          <div class="message-bubble">${message.text}</div>
          <div class="message-meta">
            <span class="message-time">${message.time}</span>
            ${message.sent ? `<span class="message-status ${message.status}">
              <i class="fas fa-${message.status === 'read' ? 'check-double' : 'check'}"></i>
            </span>` : ''}
          </div>
        </div>
      `;
      conversationArea.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    scrollToBottom();
    
    // Update active chat in sidebar
    document.querySelectorAll('.chat-item').forEach(item => {
      item.classList.toggle('active', parseInt(item.dataset.id) === chatId);
    });
    
    // Mark as read
    currentChat.unread = 0;
    renderChatList();
  }

  // Render profile in sidebar
  function renderProfile(chat) {
    if (!chatProfile) return;
    
    chatProfile.innerHTML = `
      <div class="profile-header">
        <img src="${chat.avatar}" alt="${chat.name}" class="profile-pic">
        <div class="profile-name">${chat.name}</div>
        <div class="profile-role">${chat.role}</div>
        <div class="profile-status ${chat.online ? 'online' : 'offline'}">
          <i class="fas fa-circle"></i> ${chat.online ? 'Online' : 'Offline'}
        </div>
      </div>
      <div class="profile-section">
        <h4>About</h4>
        <p>${chat.role === 'Student' ? 'Computer Science Student' : 'Senior Computer Science Professor'}</p>
      </div>
      <div class="profile-section">
        <h4>Contact</h4>
        <div class="profile-info">
          <i class="fas fa-envelope"></i> ${chat.name.toLowerCase().replace(' ', '.')}@example.com
        </div>
        <div class="profile-info">
          <i class="fas fa-phone"></i> +251 9${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}
        </div>
      </div>
      <div class="profile-actions">
        <button class="btn btn-outline">
          <i class="fas fa-phone"></i> Call
        </button>
        <button class="btn btn-primary">
          <i class="fas fa-video"></i> Video
        </button>
      </div>
    `;
  }

  // Send message with enhanced features
  function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentChat) return;
    
    // Create new message
    const newMessage = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      status: 'sent'
    };
    
    // Add to messages
    currentChat.messages.push(newMessage);
    currentChat.lastMessage = text;
    currentChat.time = 'Just now';
    
    // Render and clear input
    renderConversation(currentChat.id);
    messageInput.value = '';
    
    // Update message status
    setTimeout(() => {
      newMessage.status = 'delivered';
      updateMessageStatus(newMessage.id, 'delivered');
    }, 1000);
    
    setTimeout(() => {
      newMessage.status = 'read';
      updateMessageStatus(newMessage.id, 'read');
    }, 2000);
    
    // Simulate typing indicator
    simulateTyping();
    
    // Simulate reply after 1-3 seconds
    if (Math.random() > 0.3) {
      setTimeout(() => {
        simulateReply();
      }, 1000 + Math.random() * 2000);
    }
  }

  // Simulate typing indicator
  function simulateTyping() {
    if (!currentChat) return;
    
    currentChat.typing = true;
    renderChatList();
    
    // Clear typing after 2-5 seconds
    setTimeout(() => {
      currentChat.typing = false;
      renderChatList();
    }, 2000 + Math.random() * 3000);
  }

  // Simulate reply from other person
  function simulateReply() {
    if (!currentChat) return;
    
    const replies = [
      'Thanks for your message!',
      'I\'ll get back to you soon',
      'Let me think about that',
      'Can we discuss this in our next session?',
      'Great question!',
      'I understand what you\'re asking',
      'Let me check my schedule',
      'That sounds like a good plan'
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    
    const replyMessage = {
      id: Date.now(),
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: false,
      status: 'delivered'
    };
    
    currentChat.messages.push(replyMessage);
    currentChat.lastMessage = reply;
    currentChat.time = 'Just now';
    currentChat.unread = 1;
    
    renderConversation(currentChat.id);
    renderChatList();
  }

  // Update message status
  function updateMessageStatus(messageId, status) {
    if (!currentChat) return;
    
    const message = currentChat.messages.find(m => m.id === messageId);
    if (message) {
      message.status = status;
      
      const messageElement = document.querySelector(`.message[data-id="${messageId}"]`);
      if (messageElement) {
        const statusElement = messageElement.querySelector('.message-status');
        if (statusElement) {
          statusElement.className = `message-status ${status}`;
          statusElement.innerHTML = `<i class="fas fa-${status === 'read' ? 'check-double' : 'check'}"></i>`;
        }
      }
    }
  }

  // Scroll to bottom of conversation
  function scrollToBottom() {
    conversationArea.scrollTop = conversationArea.scrollHeight;
  }

  // Check for unread messages
  function checkUnreadMessages() {
    const totalUnread = [...students, ...mentors].reduce((sum, chat) => sum + chat.unread, 0);
    
    // Update tab badge
    const badge = document.querySelector('.sidebar-nav .badge');
    if (badge) {
      badge.textContent = totalUnread > 9 ? '9+' : totalUnread.toString();
      badge.style.display = totalUnread > 0 ? 'flex' : 'none';
    }
    
    // Update title if unread
    if (totalUnread > 0) {
      document.title = `(${totalUnread}) LegnaPath - Messages`;
    } else {
      document.title = 'LegnaPath - Messages';
    }
  }

  // Setup event listeners with enhanced features
  function setupEventListeners() {
    // Tab switching
    chatTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        chatTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentTab = this.dataset.tab;
        currentChat = null;
        conversationArea.innerHTML = '<div class="no-chat-selected">Select a conversation to start chatting</div>';
        if (chatProfile) chatProfile.innerHTML = '<div class="no-profile-selected">Select a conversation to view profile</div>';
        renderChatList();
      });
    });
    
    // Chat item selection
    chatList.addEventListener('click', function(e) {
      const chatItem = e.target.closest('.chat-item');
      if (chatItem) {
        renderConversation(parseInt(chatItem.dataset.id));
        
        // On mobile, hide sidebar after selection
        if (window.innerWidth <= 576 && chatSidebar) {
          chatSidebar.classList.remove('active');
        }
      }
    });
    
    // Send message on button click
    if (sendButton) {
      sendButton.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter (but allow Shift+Enter for new line)
    messageInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Typing indicator
    messageInput.addEventListener('input', function() {
      if (!isTyping && this.value.length > 0) {
        isTyping = true;
        if (currentChat) {
          currentChat.typing = true;
          renderChatList();
        }
      }
      
      // Clear typing timeout if exists
      if (typingTimeout) clearTimeout(typingTimeout);
      
      // Set timeout to stop typing indicator
      typingTimeout = setTimeout(() => {
        isTyping = false;
        if (currentChat) {
          currentChat.typing = false;
          renderChatList();
        }
      }, 2000);
    });
    
    // Back button (mobile)
    if (backButton) {
      backButton.addEventListener('click', function() {
        if (chatSidebar) chatSidebar.classList.add('active');
        conversationArea.innerHTML = '<div class="no-chat-selected">Select a conversation to start chatting</div>';
        if (chatProfile) chatProfile.innerHTML = '<div class="no-profile-selected">Select a conversation to view profile</div>';
        currentChat = null;
      });
    }
    
    // Emoji picker (would be implemented with a library in a real app)
    if (emojiButton) {
      emojiButton.addEventListener('click', function() {
        alert('Emoji picker would open here');
      });
    }
    
    // File attachment (would be implemented in a real app)
    if (attachButton) {
      attachButton.addEventListener('click', function() {
        alert('File attachment dialog would open here');
      });
    }
    
    // Toggle profile sidebar
    if (profileButton && chatProfile) {
      profileButton.addEventListener('click', function() {
        chatProfile.classList.toggle('active');
      });
    }
    
    // Close profile sidebar when clicking outside
    document.addEventListener('click', function(e) {
      if (chatProfile && !chatProfile.contains(e.target)) {
        chatProfile.classList.remove('active');
      }
    });
    
    // Responsive behavior
    window.addEventListener('resize', function() {
      if (window.innerWidth > 576 && chatSidebar) {
        chatSidebar.style.transform = 'translateX(0)';
      }
    });
  }

  // Initialize
  initChat();
});