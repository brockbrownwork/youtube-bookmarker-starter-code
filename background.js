// do this when a tab updates:
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // if the tab contains youtube.com/watch, you are likely
  // watching a YouTube video
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    // grab everything in the url after the question mark
    const queryParameters = tab.url.split("?")[1];
    // create an object to access different parts of the query parameters
    const urlParameters = new URLSearchParams(queryParameters);
    // send a message through the tabs API that says we started watching
    // a youtube video with this unique ID
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v")
    });
  }
})