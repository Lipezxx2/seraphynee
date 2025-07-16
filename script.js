
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active de todos os botões e formulários
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
      
      // Ativa o botão clicado
      button.classList.add('active');
      
      // Ativa o formulário correspondente
      const formId = button.getAttribute('data-target');
      document.getElementById(formId).classList.add('active');
    });
  });
  // Busca usuários salvos ou cria lista vazia
const users = JSON.parse(localStorage.getItem('seraphyne_users')) || [];

// Elementos de saudação
//const userGreeting = document.getElementById('userGreeting');
//const usernameDisplay = document.getElementById('usernameDisplay');
//const logoutBtn = document.getElementById('logoutBtn');

// Verifica se há usuário logado
const currentUser = JSON.parse(localStorage.getItem('seraphyne_currentUser'));
/*
if (currentUser) {
    showUserGreeting(currentUser.username);
}
*/

// Mostra saudação personalizada
function showUserGreeting(username) {
    usernameDisplay.textContent = `Bem-vindo, ${username}!`;
    userGreeting.style.display = 'block';
}

// Formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (password !== confirm) {
        alert('As senhas não coincidem!');
        return;
    }

    if (users.some(user => user.username === username)) {
        alert('Nome de usuário já existe!');
        return;
    }

    if (users.some(user => user.email === email)) {
        alert('E-mail já cadastrado!');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('seraphyne_users', JSON.stringify(users));

    alert('Conta criada com sucesso! Agora você pode fazer login.');

    // Alterna para aba login
    document.querySelector('[data-tab="login"]').click();
    this.reset();
});

// Formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert('Usuário ou senha incorretos!');
        return;
    }

    localStorage.setItem('seraphyne_currentUser', JSON.stringify(user));

    showUserGreeting(user.username);
    alert('Login realizado com sucesso!');
    window.location.href = 'home.html'; 

    
});

// Logout
logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('seraphyne_currentUser');
    userGreeting.style.display = 'none';
    alert('Você saiu da sua conta.');
});

    