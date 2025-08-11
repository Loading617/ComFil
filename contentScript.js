function addSearchAndFilterUI() {
   const sortByContainer = document.querySelector("#sort-by");
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

   const btnContainer = document.createElement("div");
   btnContainer.style.display = "inline-flex";
   btnContainer.style.marginLeft = "8px";

   const hashtagBtn = document.createElement("button");
   hashtagBtn.innerText = "#hash";
   hashtagBtn.title = "Show only hashtag comments";
   styleFilterButton(hashtagBtn);

   const timeBtn = document.createElement("button");
   timeBtn.innerText = "8:00time";
   timeBtn.title = "Show only recent comments";
   styleFilterButton(timeBtn);

   const mentionBtn = document.createElement("button");
   mentionBtn.innerText = "@at";
   mentionBtn.title = "Show only mention comments";
   styleFilterButton(mentionBtn);

   input.addEventListener("input", ()=> {
       filterComments(input.value);
   });

   hashtagBtn.addEventListener("click", () => {
       filterComments("HASHTAG_ONLY");
   });

   timeBtn.addEventListener("click", () => {
       filterComments("TIMESTAMP_ONLY");
   });

   mentionBtn.addEventListener("click", () => {
       filterComments("MENTION_ONLY");
   });

   sortByContainer.parentElement.appendChild(input);
   btnContainer.appendChild(hashtagBtn);
   btnContainer.appendChild(timeBtn);
   btnContainer.appendChild(mentionBtn);
   sortByContainer.parentElement.appendChild(btnContainer);


function styleFilterButton(btn) {
    btn.style.padding = "5px 8px";
    btn.style.marginLeft = "4px";
    btn.style.border = "1px solid #ccc";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";
    btn.style.background = "#f1f1f1";
    btn.style.fontSize = "14px";
}

function filterComments(mode) {
    const comments = document.querySelectorAll("#content-text");

    comments.forEach(comment => {
        const text = comment.innerText.toLowerCase();
        const container = comment.closest("ytd-comment-thread-renderer");
        if (!container) return; 

        let show = false;

        if (mode === "HASHTAG_ONLY") {
            show = /#[a-z0-9_]+/i.test(text);
        } else if (mode === "TIMESTAMP_ONLY") {
            show = /\b\d{1,2}:\d{2}\b/.test(text);
        } else if (mode === "MENTION_ONLY") {
            show = /@[a-z0-9_]+/i.test(text);
        } else {
            const query = mode.toLowerCase();
            if (!query) {
                show = true;
            } else if (/^\d{1,2}:\d{2}$/.test(query)) {
                show = text.includes(query);
            } else {
                show = text.includes(query);
            }
        }

        container.style.display = show ? "" : "none";
    });
} 

const observer = new MutationObserver (() => {
    addSearchAndFilterUI();
});
observer.observe(document.body, { childList: true, subtree: true });

addSearchAndFilterUI();
}



