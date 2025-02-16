document.getElementById("toggleFilter").addEventListener("click", () => {
    chrome.scripting.executeScript({
        target: { tabId: chrome.tabs.TAB_ID_NONE },
        func: filterComments
    });
});