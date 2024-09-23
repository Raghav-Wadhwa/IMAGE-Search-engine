const accessKey = 'WXCD0t_G1GD9svVHfLuP2ROrL0qLuFD9xXeKV_XyoxE';

const searchForm = document.getElementById('searchform');
const searchBox = document.getElementById('form-input');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const results = data.results;

        // Clear previous results only if this is the first page
        if (page === 1) {
            searchResult.innerHTML = '';
        }

        results.forEach((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small; 
            image.alt = result.alt_description || 'Image from Unsplash'; 
            const imgLink = document.createElement('a');
            imgLink.href = result.links.html;
            imgLink.target = "_blank";

            imgLink.appendChild(image);
            searchResult.appendChild(imgLink);
        });

        // Show or hide the "Show More" button based on results
        if (results.length > 0 && results.length === 12) {
            showMoreBtn.style.display = "block"; // Show button only if there are more images to load
        } else {
            showMoreBtn.style.display = "none";
        }
        
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

showMoreBtn.addEventListener("click", () => {
    page += 1; // Increment page number
    searchImages(); // Fetch the next set of images
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to the first page for a new search
    searchImages();
});
