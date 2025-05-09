function addSearchInput() {

    const sortByContainer = document.querySelector("#sort-menu");
    if (!sortByContainer || document.getElementById("comment-search-input")) return;

    const input = document.createElement("input");
    input.type = "text";
    input.id = "comment-search-input";
    input.placeholder = "Search comments";
    input.style.marginLeft = "10px";
    input.style.padding = "5px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "4px";
    input.style.fontSize = "14px";

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        const comments = document.querySelectorAll("#content-text");
        comments.forEach(comment => {
            const text = comment.innerText.toLowerCase();
            comment.closest("ytd-comment-thread-renderer").style.display = text.includes(query) ? "" : "none";
        });
    });

    sortByContainer.parentElement.appendChild(input);
}

const observer = new MutationObserver(() => {
    addSearchInput();
});
observer.observe(document.body, { childList: true, subtree: true });

addSearchInput();
