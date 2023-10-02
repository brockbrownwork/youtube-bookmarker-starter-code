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
        })
    }
)();