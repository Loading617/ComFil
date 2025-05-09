function addSearchInput() {
    const sortByContainer = document.querySelector("#sort-menu");
    if (!sortByContainer || document.getElementById("comment-search-input")) return;

    const input = document.createElement("input");
    input.type = "text";
    input.id = "comment-search-input";
    input.placeholder = "Search comments...";
    input.style.marginLeft = "10px";
    input.style.padding = "5px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "4px";
    input.style.fontSize = "14px";

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        const isHashtag = query.startsWith("#");
        const isTimestamp = /^\d{1,2}:\d{2}$/.test(query);
        const comments = document.querySelectorAll("#content-text");

        comments.forEach(comment => {
            const text = comment.innerText.toLowerCase();
            const container = comment.closest("ytd-comment-thread-renderer");

            if (!container) return;

            let match = false;

            if (!query) {
                match = true;
            } else if (isHashtag) {
                match = text.includes(query);
            } else if (isTimestamp) {
                match = text.includes(query);
            } else {
                match = text.includes(query);
            }

            container.style.display = match ? "" : "none";
        });
    });

    sortByContainer.parentElement.appendChild(input);
}

const observer = new MutationObserver(() => {
    addSearchInput();
});
observer.observe(document.body, { childList: true, subtree: true });

addSearchInput();
