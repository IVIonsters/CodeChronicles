document.getElementById('new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const postContent = document.getElementById('postContent').value.trim();

    if (title && postContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, postContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error creating post.');
        }
    }
});
