document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');
        if (id) {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const postElement = document.querySelector(`#post-${id}`);
                if (postElement) {
                    postElement.remove();
                }
            } else {
                alert('Failed to delete post');
            }
        }
    });
});




