let isSubmitting = false;

document.querySelector('.new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();

    if (title && post_content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error creating post.');
        }
    }
    isSubmitting = false;
});

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

document.querySelectorAll('.delete-post').forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error deleting post.');
        }
    });
});
