let yt, txtVideoId, btnSearch, video, state = 0;

window.addEventListener('DOMContentLoaded', () => {
    yt = new youTubeInterface();
    txtVideoId = document.getElementById("videoId");
    btnSearch = document.getElementById("btnSearch");
    video = document.getElementById("video");

    btnSearch.addEventListener("click", searchHandler);
    btnSearch.disabled = true;
    video.addEventListener('ended', videoFinishedHandler, false);
    video.controls = true;
});

function searchHandler() {
    yt.getVideo(txtVideoId.value).then(videoObj => {
        let category = videoObj.category;
        render(vid, yt.suggested());
    });
}

function videoFinishedHandler() {
    switch (++state) {
        case 1: // option 1
            btnSearch.disabled = false;
            break;
        case 2: // response 1
            // do
            break;
        case 3: // question 2
            // do
            break;
        case 4: // response 2
            // do
            break;
        case 5: // question 3
            // do
            break;
        case 6: // response 3
            // do
            break;
        case 7: // penance
            // do
            break;
        case 8: // end
            // do
            break;
    }
}

function render(vid, sugg) {
    document.getElementById("image").src = vid.thumbnail;
    document.getElementById("heading").innerHTML = vid.title;
    document.getElementById("cat").innerHTML = vid.category;
    document.getElementById("suggestedImage").src = sugg.thumbnail;
    document.getElementById("suggestedHeading").innerHTML = sugg.title;
    document.getElementById("suggestedCat").innerHTML = sugg.category;
}

// function printTags(videoId, apiKey) {
//     getVideoData(videoId, apiKey).then(d => {
//         console.log(d);
//         document.getElementById("image").src = d.items[0].snippet.thumbnails.medium.url;
//         // document.getElementById("video").src = `https://www.youtube.com/embed/${d.items[0].id}`;
//         document.getElementById("heading").innerHTML = d.items[0].snippet.localized.title;
//         document.getElementById("cat").innerHTML = getCategory(d);
//         // let tags = d.items[0].snippet.tags;
//         // document.getElementById("result-div").innerHTML = `<p>${tags.reduce((sum, curr) => sum += curr + ", ", "")}</p>`;
//         getVideoData(getSuggestedId(getCategory(d), "Good"), apiKey).then(s => {
//             console.log(s);
//             document.getElementById("suggestedImage").src = s.items[0].snippet.thumbnails.medium.url;
//             // document.getElementById("suggestedVideo").src = `https://www.youtube.com/embed/${s.items[0].id}`;
//             document.getElementById("suggestedHeading").innerHTML = s.items[0].snippet.localized.title;
//             document.getElementById("suggestedCat").innerHTML = getCategory(s);
//         });
//     });
// }