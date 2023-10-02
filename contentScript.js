(
    () => {
        let youtubeLeftControls, youtubePlayer;
        let currentVideo = "";
        // listen to messages sent to the tabs API
        chrome.runtime.onMessage.addListener((obj, sender, response) => {
            // obj: the object we're sending from the bg script
            // response: when a message is being sent to the content script,
            // we can send it back where it's coming from

            const {type, value, videoId} = obj;

            if (type === "NEW") {
                console.log("Message recieved from tabs API");
                console.log(videoId);
                currentVideo = videoId;
                newVideoLoaded();
            }
        });

        const newVideoLoaded = () => {
            const bookmarkButtonExists = document.getElementsByClassName("bookmark-btn")[0];

            console.log(bookmarkButtonExists);

            if (!bookmarkButtonExists) {
                const bookmarkButton = document.createElement("img");

                bookmarkButton.src = chrome.runtime.getURL("assets/bookmark.png");
                bookmarkButton.className = "ytp-button " + "bookmark-btn";
                bookmarkButton.title = "Click to bookmark current timestamp";

                youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
                youtubePlayer = document.getElementsByClassName("video-stream")[0];
                youtubeLeftControls.appendChild(bookmarkButton);
                bookmarkButton.addEventListener("click", addNewBookmarkHandler);
            }
        }

        const addNewBookmarkHandler = (e) => {
            console.log("clicked!");
            console.log("Current time: " + youtubePlayer.currentTime);
        }
        // IMPORTANT: this calls newVideoLoaded any time our content
        // script matches youtube.com.
        // This fixes the problem we have where if we refresh,
        // we're not going to see the change we made.
        // Downside: if the background script sees it as a new
        // video using that onUpdated event listener, we're gonna call
        // this twice. You can fix this using a conditional to make
        // sure this doesn't happen.
        newVideoLoaded();
    }
)();