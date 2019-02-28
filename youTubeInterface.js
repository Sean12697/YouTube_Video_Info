class youTubeInterface {

    constructor() {
        this.videos = [];
        this.suggestedVideos = [];
        this.apiKey = "AIzaSyChVwxkZsdUk4Anp7ew7W6ssx-DGa-yU4o";
    }

    async getVideo(videoId) {
        return getVideoData(videoId).then(d => {
            let vid = videoToObj(d);
            videos.push(vid);
            return getVideoData(getSuggestedId(getCategory(d), getType()), this.apiKey).then(s => {
                suggestedVideos.push(videoToObj(s));
                return vid;
            });
        });
    }

    get suggested() {
        return suggestedVideos[suggestedVideos.length-1];
    }

    getType() {
        return (videos.length % 2) ? "Bad" : "Good";
    }

    videoToObj(video) {
        return {
            "id": video.items[0].id,
            "category": getCategory(video),
            "title": video.items[0].snippet.localized.title,
            "thumbnail": video.items[0].snippet.thumbnails.medium.url
        };
    }

    async getVideoData(videoId) {
        let request = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${this.apiKey}`;
        return await (await (fetch(request))).json();
    }

    getSuggestedId(category, type) {
        let reverseType = (type == "Good") ? "Bad" : "Good",
            suggestedCategoryExists = suggested.hasOwnProperty(category),
            array = (suggestedCategoryExists) ? suggested[category][reverseType] : random[reverseType],
            video = array[Math.floor(Math.random() * array.length)];
        return (video == "") ? "NpEaa2P7qZI" : video;
    }
    
    getCategory(video) {
        let foodBool = video.items[0].snippet.tags.reduce((sum, curr) => sum || curr.toLowerCase().includes("food"), false);
        return (foodBool) ? "Food" : categories[parseInt(video.items[0].snippet.categoryId)];
    }

    // ---------------------------------- ARRAYS ------------------------------------

    suggested = {
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
    
    random = {
        "Good": [""],
        "Bad": [""]
    }
    
    categories = {
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
    }
}