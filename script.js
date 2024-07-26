// Get elements
const authForm = document.getElementById('auth-form');
const authBtn = document.getElementById('auth-btn');
const usernameInput = document.getElementById('username');
const messengerInterface = document.getElementById('messenger-interface');
const chatHeader = document.getElementById('chat-header');
const userAvatar = document.getElementById('user-avatar');
const usernameDisplay = document.getElementById('username-display');
const messagesList = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');

// Initialize variables
let username = '';
let messages = [];
let typing = false;

// Authentication
authBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        authForm.style.display = 'none';
        messengerInterface.style.display = 'flex';
        userAvatar.src = `https://avatars.dicebear.com/api/male/${username}.svg`;
        usernameDisplay.textContent = username;
    }
});

// Send message
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        messages.push({ username, message });
        renderMessages();
        messageInput.value = '';
        // Update the messages list with the new message
        messagesList.scrollTop = messagesList.scrollHeight;
    }
});

// Emoji picker
emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
});

// Emoji click
emojiPicker.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        messageInput.value += e.target.textContent;
    }
});

// Render messages
function renderMessages() {
    messagesList.innerHTML = '';
    messages.forEach((message, index) => {
        const messageHTML = `
            <li>
                <img src="https://avatars.dicebear.com/api/male/${message.username}.svg" alt="User Avatar">
                <span>${message.username}</span>
                <p>${message.message}</p>
            </li>
        `;
        messagesList.innerHTML += messageHTML;
    });
}

// Typing indicator
messageInput.addEventListener('input', () => {
    typing = true;
    setTimeout(() => {
        typing = false;
    }, 3000);
});

// Online/offline status
setInterval(() => {
    const status = typing ? 'Typing...' : 'Online';
    usernameDisplay.textContent = `${username} - ${status}`;
}, 1000);