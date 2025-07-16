document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messages');
    const conversations = document.querySelectorAll('.conversation');

    // Enviar mensagem
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const message = createMessage(text, time, 'sent');
            messagesContainer.appendChild(message);
            messageInput.value = '';
            scrollToBottom();
            
            // Simular resposta
            setTimeout(simulateReply, 1000 + Math.random() * 2000);
        }
    }

    // Criar elemento de mensagem
    function createMessage(text, time, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.innerHTML = `
            <p>${text}</p>
            <span>${time}</span>
        `;
        return message;
    }

    // Simular resposta
    function simulateReply() {
        const replies = [
            "Interessante! Conte mais.",
            "Eu também gosto disso!",
            "Nunca pensei por esse lado...",
            "Você tem bom gosto!",
            "Isso me lembra algo...",
            "O que mais você gosta de fazer?"
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        messagesContainer.appendChild(createMessage(reply, time, 'received'));
        scrollToBottom();
    }

    // Rolagem automática
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Eventos
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', e => e.key === 'Enter' && sendMessage());

    // Selecionar conversa
    conversations.forEach(conv => {
        conv.addEventListener('click', () => {
            conversations.forEach(c => c.classList.remove('active'));
            conv.classList.add('active');
            // Aqui você carregaria as mensagens da conversa selecionada
        });
    });
});