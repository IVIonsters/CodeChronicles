document.getElementById('new-comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const commentContent = document.getElementById('new-comment-content').value.trim();
    const postId = window.location.pathname.split('/').pop();

    if (commentContent) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postId: postId, comments: commentContent }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment.');
        }
    }
});
