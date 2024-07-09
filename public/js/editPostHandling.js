document.getElementById('edit-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const postContent = document.getElementById('postContent').value.trim();
    const postId = event.target.getAttribute('data-post-id');

    if (title && postContent) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, postContent }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Could Not Update Post.');
        }
    }
});

document.getElementById('delete-post').addEventListener('click', async () => {
    const postId = document.getElementById('edit-post-form').getAttribute('data-post-id');

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Could Not Delete Post.');
    }
});
