document.addEventListener('DOMContentLoaded', () => {
    const filterTags = document.querySelectorAll('.tag-list a');
    const posts = document.querySelectorAll('.feed .post-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the tag to filter by, removing the '#'
            const filter = tag.textContent.substring(1);

            // Remove active class from all tags and add to the clicked one
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            posts.forEach(post => {
                const postTags = post.dataset.tags;

                // If the filter is '태그' (our "All" button), or if the post's tags include the filter, show it.
                if (filter === '태그' || (postTags && postTags.includes(filter))) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
});
