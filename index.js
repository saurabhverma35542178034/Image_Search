
const apiKey = '6uLtMiuJs783q6a2C9SyvjD9Wz8SVOnalS1QAXsu1ckTGl6Y9ZxBgU6w';

let currentPage = 1; 
const imagesPerPage = 10; 
let isLoading = false; 
let totalResults = 0;
let nextPageUrl = ""; 
const resultsDiv = document.querySelector('#results');

async function ImageSearch() {
    const query = document.querySelector('#query').value;
    if (query === "") {
        alert("Please type something");
        return;
    }

    try {
       
        currentPage = 1;
        resultsDiv.innerHTML = "";
        isLoading = false;
        nextPageUrl = ""; 

        
        await fetchImages(query);

        
        document.querySelector('#showMore').style.display = totalResults > imagesPerPage ? 'block' : 'none';

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

async function fetchImages(query) {
    if (isLoading) return; // Prevent multiple simultaneous fetches
    isLoading = true;

    try {
        // Determine which URL to use for fetching
        const url = nextPageUrl || `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${imagesPerPage}&page=${currentPage}`;
        console.log(url);
        const response = await fetch(url, {
            headers: {
                "Authorization": apiKey // Replace with your actual API key
            }
        });

        const data = await response.json();
        totalResults = data.total_results; 
        nextPageUrl = data.next_page; 

       
        data.photos.forEach(photo => {
            resultsDiv.innerHTML += `<img src="${photo.src.small}">`;
        });

        
        currentPage++;

        
        if (!nextPageUrl) {
            document.querySelector('#showMore').style.display = 'none';
        }

        isLoading = false;

    } catch (error) {
        console.error('Error fetching images:', error);
        isLoading = false;
    }
}


function loadMoreImages() {
    const query = document.querySelector('#query').value;
    if (nextPageUrl) {
        fetchImages(query); 
    }
}


