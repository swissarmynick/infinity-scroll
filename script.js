const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'vgRQWDmr1XopVnYC2_t_DvcAl7FeOJkiQo5lAT2qAuM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log('imagesLoaded:', imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("Ready is:", ready)
    }

}

// Helper Function for Setting Attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display elements for Links and Photos
function displayPhotos() {
    totalImages = photosArray.length;
    console.log('Total Images:', totalImages)
    photosArray.forEach((photo) => {
        // Build Links
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Build Images
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Check when each img is finished loading
        img.addEventListener('load', imageLoaded);

        // Assemble Element Hierarchy
        item.appendChild(img);
        imageContainer.appendChild(item);

        // Return imageContainer?
    })
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

// Check for scrolling near bottom of page - Load more photos
window.addEventListener('scroll', () => {
    if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        console.log('Load More...')
        ready = false;
        imagesLoaded = 0;
        getPhotos();
    }
})

// LOAD
getPhotos();