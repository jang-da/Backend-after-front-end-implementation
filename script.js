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

    // --- New Comment Submission Logic ---
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach(form => {
        const submitButton = form.querySelector('.submit-comment');
        const textarea = form.querySelector('textarea');

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const commentText = textarea.value.trim();
            const postCard = form.closest('.post-card');
            const commentsList = postCard.querySelector('.comments-list');
            const commentCountSpan = postCard.querySelector('.comment-count');

            if (commentText !== "" && commentsList) {
                // 1. Create the new comment element
                const newComment = document.createElement('div');
                newComment.classList.add('comment');
                newComment.innerHTML = `
                    <img src="https://via.placeholder.com/32x32.png" alt="My Avatar" class="avatar">
                    <div class="comment-content">
                        <div class="comment-author">
                            <strong>나</strong>
                        </div>
                        <div class="comment-text">
                            <p>${commentText.replace(/\n/g, '<br>')}</p>
                        </div>
                        <div class="comment-meta">
                            <span>방금 전</span>
                            <button class="comment-like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                <span>0</span>
                            </button>
                            <button class="comment-reply">답글</button>
                        </div>
                    </div>
                    <button class="more-options"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                `;

                // 2. Add the new comment to the list
                commentsList.prepend(newComment);

                // 3. Clear the textarea
                textarea.value = "";

                // 4. Update comment count
                if (commentCountSpan) {
                    const currentCount = parseInt(commentCountSpan.textContent, 10);
                    commentCountSpan.textContent = currentCount + 1;
                }
            }
        });
    });
});
