import { getCurrentTab } from "./utils";

// adding a new bookmark row to the popup

const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

// This is when we'll want to gather all of our bookmarks and
// show them, because this is the point where the page
// has fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const messageBox = document.getElementById("message");

    const currentVideo = urlParameters.get("v");

    if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
        console.log("Found YouTube!");
        messageBox.innerText = "Found YouTube!"
    } else {
        console.log("This is not YouTube.");
        messageBox.innerText = "This is not YouTube."
    }
});