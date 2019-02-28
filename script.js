const apiKey = "AIzaSyChVwxkZsdUk4Anp7ew7W6ssx-DGa-yU4o";
let txtVideoId;

window.addEventListener('DOMContentLoaded', () => {
    txtVideoId = document.getElementById("videoId");
    document.getElementById("btnSearch").addEventListener("click", () => printTags(txtVideoId.value, apiKey));
    document.getElementById("btnSearch").disabled = true;
    document.getElementById("video").addEventListener("finished", () => {
        document.getElementById("btnSearch").disabled = false;
    } ,false);
    // printTags("VA7BRqjwK98", apiKey);
});

async function getVideoData(videoId, apiKey) {
    let request = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;
    return await (await (fetch(request))).json();
}

function printTags(videoId, apiKey) {
    getVideoData(videoId, apiKey).then(d => {
        console.log(d);
        document.getElementById("image").src = d.items[0].snippet.thumbnails.medium.url;
        // document.getElementById("video").src = `https://www.youtube.com/embed/${d.items[0].id}`;
        document.getElementById("heading").innerHTML = d.items[0].snippet.localized.title;
        document.getElementById("cat").innerHTML = getCategory(d);
        godResponse(getCategory(d));
        // let tags = d.items[0].snippet.tags;
        // document.getElementById("result-div").innerHTML = `<p>${tags.reduce((sum, curr) => sum += curr + ", ", "")}</p>`;
        getVideoData(getSuggestedId(getCategory(d), "Good"), apiKey).then(s => {
            console.log(s);
            document.getElementById("suggestedImage").src = s.items[0].snippet.thumbnails.medium.url;
            // document.getElementById("suggestedVideo").src = `https://www.youtube.com/embed/${s.items[0].id}`;
            document.getElementById("suggestedHeading").innerHTML = s.items[0].snippet.localized.title;
            document.getElementById("suggestedCat").innerHTML = getCategory(s);
        });
    });
}

function godResponse(category) {
    switch(category) {
        case "Pets & Animals":
            document.getElementById("video").src = "videos/res1-animals.mp4";
            break;
        case "Food":
            document.getElementById("video").src = "videos/res1-food.mp4";
            break;
        case "Music":
            document.getElementById("video").src = "videos/res1-music.mp4";
            break;
        default:
            document.getElementById("video").src = "videos/res1-random1.mp4";
            break;
    }
}

function getSuggestedId(category, type) {
    let reverseType = (type == "Good") ? "Bad" : "Good",
        suggestedCategoryExists = suggested.hasOwnProperty(category),
        array = (suggestedCategoryExists) ? suggested[category][reverseType] : random[reverseType],
        video = array[Math.floor(Math.random() * array.length)];
    return (video == "") ? "NpEaa2P7qZI" : video;
}

function getCategory(video) {
    let foodBool = video.items[0].snippet.tags.reduce((sum, curr) => sum || curr.toLowerCase().includes("food"), false);
    return (foodBool) ? "Food" : categories[parseInt(video.items[0].snippet.categoryId)];
}

const suggested = {
    "Food": {
        "Good": [""],
        "Bad": ["GS_z6FG_jqE", "IOG4kiQTXUo", "Mdj711U31yU"]
    },
    "Music": {
        "Good": [""],
        "Bad": ["wzjWIxXBs_s", "l8Rofpq2_QY", "nMfPqeZjc2c", "ArwcHjmsw3A"]
    },
    "Pets & Animals": {
        "Good": [""],
        "Bad": ["2pEh9bZEtwA", "dU4CFTTCsIE", "2ILAkWciUnE"]
    }
}

const random = {
    "Good": [""],
    "Bad": [""]
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