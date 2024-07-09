const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/'); // Redirects to the homepage after logout
    } else {
        alert('Failed to logout. Please try again.'); // Alerts the user if the logout fails
    }
};

document.getElementById('logout').addEventListener('click', logout);
