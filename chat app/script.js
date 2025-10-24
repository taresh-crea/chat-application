// === LOGIN FUNCTION ===
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    document.getElementById('loginPage').classList.add("fade-out");
    setTimeout(() => {
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('chatPage').style.display = 'block';
      document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
      initChat(username);
    }, 700);
  } else {
    alert("Please enter both username and password 😅");
  }
}

// === MEMBERS ===
const members = ["Divya", "Arun", "Meena", "Raghu", "Sita", "Vikram", "Anita", "Kumar", "Latha", "Ravi"];

const memberList = document.getElementById('memberList');
const chatBox = document.getElementById('chatBox');
const chatHeader = document.getElementById('chatHeader');
const inputField = document.getElementById('userMessage');
const sendBtn = document.querySelector(".chat-input button");

let currentMember = "";
const conversations = {};
const botIndex = {};

// === RANDOM BOT REPLIES ===
const botReplies = {
  "Divya": ["Hi there! 😊", "How are you today?", "Where are you from?", "That’s cool!", "Do you like music?", "Awesome!", "Bye! 👋"],
  "Arun": ["Hey buddy! 😎", "Working on something?", "Which city are you in?", "Do you like coding?", "Nice!", "Catch you later! 👋"],
  "Meena": ["Hi! 🌸", "How’s your day going?", "Coffee or Tea? ☕", "Cool choice!", "Bye! 👋"],
  "Raghu": ["Yo! ✌️", "What's up?", "Do you watch movies?", "Favorite one?", "Oh wow nice!", "Bye 😊"],
  "Sita": ["Hey 👋", "How are things?", "Favorite food?", "Yummy!", "See ya later!"],
  "Vikram": ["Sup! 🔥", "You into tech?", "Cool gadgets?", "Same here!", "Bye! 😁"],
  "Anita": ["Hiya 💫", "What are you doing?", "Do you read books?", "Which one?", "Nice taste!", "Bye! 🌼"],
  "Kumar": ["Hey bro 💪", "Do you play games?", "Which one?", "I love that too!", "Later da! 😎"],
  "Latha": ["Hello 🌷", "Do you like traveling?", "Favorite place?", "Wow, amazing!", "Take care! 💕"],
  "Ravi": ["Hi friend 😊", "You coding now?", "Favorite language?", "Mine’s JS!", "Okay, see ya 👋"]
};

// === INITIALIZE CHAT MEMBERS ===
function initChat(username) {
  members.forEach(member => {
    conversations[member] = [{ from: 'bot', text: `Hi ${username}, I'm ${member}. Let's chat! 🤗` }];
    botIndex[member] = 0;

    const div = document.createElement('div');
    div.className = 'member';
    div.innerHTML = `<span>${member}</span>`;
    div.onclick = () => selectMember(member);
    memberList.appendChild(div);
  });
}

// === SELECT MEMBER TO CHAT ===
function selectMember(member) {
  currentMember = member;
  chatHeader.innerText = member;
  chatBox.innerHTML = '';
  document.querySelectorAll('.member').forEach(m => m.classList.remove('active'));
  event.currentTarget.classList.add('active');

  conversations[member].forEach(msg => {
    addMessage(msg.text, msg.from);
  });

  inputField.disabled = false;
  sendBtn.disabled = false;
  inputField.focus();
}

// === ADD MESSAGE WITH TYPING ANIMATION ===
function addMessage(text, type) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${type}`;

  if (type === 'bot') {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgDiv.appendChild(typing);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => {
      typing.remove();
      msgDiv.innerHTML = `<p>${text}</p>`;
      msgDiv.classList.add('fade-in');
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000 + Math.random() * 800);
  } else {
    msgDiv.innerHTML = `<p>${text}</p>`;
    msgDiv.classList.add('user-msg');
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// === SEND MESSAGE ===
function sendMessage() {
  const text = inputField.value.trim();
  if (!text || !currentMember) return;

  addMessage(text, 'user');
  conversations[currentMember].push({ from: 'user', text });
  inputField.value = '';

  // Simulate bot typing
  setTimeout(() => {
    const replies = botReplies[currentMember];
    let replyText;
    if (botIndex[currentMember] < replies.length) {
      replyText = replies[botIndex[currentMember]];
      botIndex[currentMember]++;
    } else {
      replyText = "It was nice chatting! 👋";
    }
    addMessage(replyText, 'bot');
    conversations[currentMember].push({ from: 'bot', text: replyText });
  }, 1000 + Math.random() * 2000);
}
