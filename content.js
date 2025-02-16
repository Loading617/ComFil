function addFilterButton() {
    let commentSection = document.querySelector("#comments");
    if (!commentSection) return;

    let existingButton = document.getElementById("filter-comments-btn");
    if (existingButton) return; // Avoid duplicate buttons

    let button = document.createElement("button");
    button.id = "filter-comments-btn";
    button.innerText = "Filter Comments";
    button.style.padding = "10px";
    button.style.margin = "10px";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "#ff0000";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";

    button.addEventListener("click", filterComments);

    commentSection.prepend(button);
}

function filterComments() {
    let comments = document.querySelectorAll("#content-text");
    comments.forEach(comment => {
        let text = comment.innerText;
        if (!text.match(/\b\d{1,2}:\d{2}\b/) && !text.match(/#[a-zA-Z0-9]+/)) {
            comment.parentElement.style.display = "none"; 
        }
    });
}

// Run when comments load
const observer = new MutationObserver(addFilterButton);
observer.observe(document.body, { childList: true, subtree: true });