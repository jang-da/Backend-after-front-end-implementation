document.addEventListener('DOMContentLoaded', () => {
    // --- Tag Filtering Logic ---
    const filterTags = document.querySelectorAll('.tag-list a');
    const posts = document.querySelectorAll('.feed .post-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();

            const filter = tag.textContent.substring(1);

            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            posts.forEach(post => {
                const postTags = post.dataset.tags;

                if (filter === '태그' || (postTags && postTags.includes(filter))) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // --- Like Button Logic ---
    const likeButtons = document.querySelectorAll('.post-actions button');

    likeButtons.forEach(button => {
        const heartIcon = button.querySelector('.icon-heart');
        if (heartIcon) {
            button.addEventListener('click', () => {
                heartIcon.classList.toggle('liked');
            });
        }
    });

    // --- Comment Section Toggle Logic ---
    const commentButtons = document.querySelectorAll('.post-actions button');

    commentButtons.forEach(button => {
        const commentIcon = button.querySelector('.icon-message-square');
        if (commentIcon) {
            button.addEventListener('click', (e) => {
                // Find the parent .post-card element
                const postCard = e.currentTarget.closest('.post-card');
                if (postCard) {
                    const commentSection = postCard.querySelector('.comment-section');
                    if (commentSection) {
                        commentSection.classList.toggle('hidden');
                    }
                }
            });
        }
    });
});
