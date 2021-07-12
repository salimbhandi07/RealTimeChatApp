const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  name = prompt("Please Enter Your Name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let mgs = {
    user: name,
    message: message.trim(),
  };
  //Append
  appendMessage(mgs, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to Server
  socket.emit("message", mgs);
}

function appendMessage(mgs, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
  <h4>${mgs.user}</h4>
  <p>${mgs.message}</p>
  
  `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve message

socket.on("message", (mgs) => {
  appendMessage(mgs, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
