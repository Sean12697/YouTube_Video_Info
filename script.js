const apiKey = "AIzaSyChVwxkZsdUk4Anp7ew7W6ssx-DGa-yU4o";
let txtVideoId;

window.addEventListener('DOMContentLoaded', () => {
    txtVideoId = document.getElementById("videoId");
    document.getElementById("btnSearch").addEventListener("click", () => printTags(txtVideoId.value, apiKey));
    printTags("VA7BRqjwK98", apiKey);
});

async function getVideoData(videoId, apiKey) {
    let request = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;
    return await (await (fetch(request))).json();
}

function printTags(videoId, apiKey) {
    getVideoData(videoId, apiKey).then(d => {
        console.log(d);
        let tags = d.items[0].snippet.tags;
        document.getElementById("image").src = d.items[0].snippet.thumbnails.high.url;
        document.getElementById("heading").innerHTML = d.items[0].snippet.localized.title;
        document.getElementById("cat").innerHTML = getCategory(d);
        document.getElementById("result-div").innerHTML = `<p>${tags.reduce((sum, curr) => sum += curr + ", ", "")}</p>`;
    });
}

function getCategory(video) {
    let foodBool = video.items[0].snippet.tags.reduce((sum, curr) =>  sum || curr.toLowerCase().includes("food"), false);
    return (foodBool) ? "Food" : categories[parseInt(video.items[0].snippet.categoryId)];
}

const categories = {
    2: "Autos & Vehicles",
    1: "Film & Animation",
    10: "Music",
    15: "Pets & Animals",
    17: "Sports",
    18: "Short Movies",
    19: "Travel & Events",
    20: "Gaming",
    21: "Videoblogging",
    22: "People & Blogs",
    23: "Comedy",
    24: "Entertainment",
    25: "News & Politics",
    26: "Howto & Style",
    27: "Education",
    28: "Science & Technology",
    29: "Nonprofits & Activism",
    30: "Movies",
    31: "Anime/Animation",
    32: "Action/Adventure",
    33: "Classics",
    34: "Comedy",
    35: "Documentary",
    36: "Drama",
    37: "Family",
    38: "Foreign",
    39: "Horror",
    40: "Sci-Fi/Fantasy",
    41: "Thriller",
    42: "Shorts",
    43: "Shows",
    44: "Trailers"
};