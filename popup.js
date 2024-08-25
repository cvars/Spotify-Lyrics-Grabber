document.getElementById('fetchLyrics').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: getSpotifyLyrics
        }, (results) => {
            const lyrics = results[0].result;
            if (lyrics) {
                document.getElementById('lyrics').innerText = lyrics;
            } else {
                document.getElementById('lyrics').innerText = 'No lyrics found!';
            }
        });
    });
});

function getSpotifyLyrics() {
    const lyricsContainer = document.querySelector('._Wna90no0o0dta47Heiw');
    if (lyricsContainer) {
        // Find the currently visible lyric line based on the specific class
        const visibleLyricDiv = lyricsContainer.querySelector('div[data-testid="fullscreen-lyric"].EhKgYshvOwpSrTv399Mw > div');
        
        if (visibleLyricDiv) {
            return visibleLyricDiv.innerText.trim(); // Return the text of the currently visible lyric
        } else {
            return 'No visible lyrics found!';
        }
    } else {
        return 'Lyrics container not found!';
    }
}
