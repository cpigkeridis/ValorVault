window.addEventListener('DOMContentLoaded', (event) => {
    // Load data once and manage display through scrolling
    loadData();
});

// Initial items loaded for each category
let skinsLoaded = 0;
let stickersLoaded = 0;
const itemsPerLoad = 40; // Adjust based on desired items per load

function loadData() {
    const skinsApiUrl = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';
    const stickersApiUrl = 'https://bymykel.github.io/CSGO-API/api/en/stickers.json';
    
    Promise.all([fetch(skinsApiUrl), fetch(stickersApiUrl)])
        .then(responses => Promise.all(responses.map(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })))
        .then(data => {
            window.skinsData = data[0];
            window.stickersData = data[1];
            
            // Display initial items
            displayItems(window.skinsData.slice(0, itemsPerLoad), 'cs2skins-section');
            skinsLoaded += itemsPerLoad;
            displayItems(window.stickersData.slice(0, itemsPerLoad), 'cs2stickers-section');
            stickersLoaded += itemsPerLoad;

            // Setup scroll events for each category
            setupScrollEventForSkins();
            setupScrollEventForStickers();
        })
        .catch(error => console.error(`Error fetching items: ${error}`));
}

function setupScrollEventForSkins() {
    let isLoading = false;
    window.addEventListener('scroll', () => {
        let skinsSection = document.getElementById('cs2skins-section');
        if (window.innerHeight + window.pageYOffset >= skinsSection.offsetHeight + skinsSection.offsetTop - 200 && !isLoading && skinsLoaded < window.skinsData.length) {
            isLoading = true;
            setTimeout(() => {
                displayItems(window.skinsData.slice(skinsLoaded, skinsLoaded + itemsPerLoad), 'cs2skins-section');
                skinsLoaded += itemsPerLoad;
                isLoading = false;
            }, 500);
        }
    });
}

function setupScrollEventForStickers() {
    let isLoading = false;
    window.addEventListener('scroll', () => {
        let stickersSection = document.getElementById('cs2stickers-section');
        if (window.innerHeight + window.pageYOffset >= stickersSection.offsetHeight + stickersSection.offsetTop - 200 && !isLoading && stickersLoaded < window.stickersData.length) {
            isLoading = true;
            setTimeout(() => {
                displayItems(window.stickersData.slice(stickersLoaded, stickersLoaded + itemsPerLoad), 'cs2stickers-section');
                stickersLoaded += itemsPerLoad;
                isLoading = false;
            }, 500);
        }
    });
}

function displayItems(items, sectionId) {
    const container = document.getElementById(sectionId);

    items.forEach(item => {
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

function enlargeImage(src) {
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';

    const enlargedImg = document.createElement('img');
    enlargedImg.src = src;
    enlargedImg.className = 'enlarged-image'; // For styling

    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);

    // Close the overlay when clicked
    overlay.onclick = () => {
        document.body.removeChild(overlay);
    };
}


function createItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';

    const nameElement = document.createElement('h3');
    nameElement.textContent = item.name; // Assuming 'name' is a property of your items

    const imageElement = document.createElement('img');
    imageElement.src = item.image; // Assuming 'image' is a property of your items
    imageElement.alt = item.name;
    imageElement.className = 'item-image lazy-load';

    const previewButton = document.createElement('button');
    previewButton.className = 'preview-btn'; // Use for styling

    // Create img element for the expand icon
    const expandIcon = document.createElement('img');
    expandIcon.src = 'Page_images/expand-arrows-interface-symbol.png'; // Path to your downloaded expand icon
    expandIcon.alt = 'Preview';
    previewButton.appendChild(expandIcon);

    previewButton.onclick = () => enlargeImage(imageElement.src); // Function to enlarge image

    itemElement.appendChild(nameElement);
    itemElement.appendChild(imageElement);
    itemElement.appendChild(previewButton);

    return itemElement;
}

