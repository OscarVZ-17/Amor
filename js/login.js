document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;

    if ((username === 'oscar' || username === 'yuritzi') && password === 'amor2024') {
        // Guardar el usuario para el diario
        localStorage.setItem('currentUser', username);
        window.location.href = 'home.html';
    } else {
        showError('Usuario o contraseña incorrectos');
    }
});

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.getElementById('loginForm');
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}