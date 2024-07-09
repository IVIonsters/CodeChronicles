const registerFormHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && email && password) {
        if (password.length < 8) {
            alert('Please enter a password with at least 8 characters');
            return;
        }

        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorText = await response.text();
            alert(errorText || 'Error registering user.');
        }
    }
};

document
    .getElementById('register-form')
    .addEventListener('submit', registerFormHandler);
