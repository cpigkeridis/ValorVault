window.addEventListener('DOMContentLoaded', (event) => {
    // Load data once and manage display through scrolling
    loadValorantData();
});

let valorantSkinsLoaded = 0;
let valorantStickersLoaded = 0;
const valorantItemsPerLoad = 40; // Adjust based on desired items per load

function loadValorantData() {
    const valorantSkinsApiUrl = 'https://valorant-api.com/v1/weapons/skins';
    const valorantStickersApiUrl = 'https://valorant-api.com/v1/sprays';
    
    Promise.all([fetch(valorantSkinsApiUrl), fetch(valorantStickersApiUrl)])
        .then(responses => Promise.all(responses.map(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })))
        .then(data => {
            window.valorantSkinsData = data[0].data;
            window.valorantStickersData = data[1].data;
            
            // Display initial items
            displayValorantItems(window.valorantSkinsData.slice(0, valorantItemsPerLoad), 'Valoskins-section');
            valorantSkinsLoaded += valorantItemsPerLoad;
            displayValorantItems(window.valorantStickersData.slice(0, valorantItemsPerLoad), 'Valostickers-section');
            valorantStickersLoaded += valorantItemsPerLoad;

            // Setup scroll events for each category
            setupScrollEventForValorantSkins();
            setupScrollEventForValorantStickers();
        })
        .catch(error => console.error(`Error fetching Valorant items: ${error}`));
}

function setupScrollEventForValorantSkins() {
    let isLoading = false;
    window.addEventListener('scroll', () => {
        let skinsSection = document.getElementById('Valoskins-section');
        if (window.innerHeight + window.pageYOffset >= skinsSection.offsetHeight + skinsSection.offsetTop - 200 && !isLoading && valorantSkinsLoaded < window.valorantSkinsData.length) {
            isLoading = true;
            setTimeout(() => {
                displayValorantItems(window.valorantSkinsData.slice(valorantSkinsLoaded, valorantSkinsLoaded + valorantItemsPerLoad), 'Valoskins-section');
                valorantSkinsLoaded += valorantItemsPerLoad;
                isLoading = false;
            }, 500);
        }
    });
}

function setupScrollEventForValorantStickers() {
    let isLoading = false;
    window.addEventListener('scroll', () => {
        let stickersSection = document.getElementById('Valostickers-section');
        if (window.innerHeight + window.pageYOffset >= stickersSection.offsetHeight + stickersSection.offsetTop - 200 && !isLoading && valorantStickersLoaded < window.valorantStickersData.length) {
            isLoading = true;
            setTimeout(() => {
                displayValorantItems(window.valorantStickersData.slice(valorantStickersLoaded, valorantStickersLoaded + valorantItemsPerLoad), 'Valostickers-section');
                valorantStickersLoaded += valorantItemsPerLoad;
                isLoading = false;
            }, 500);
        }
    });
}

function displayValorantItems(items, sectionId) {
    const container = document.getElementById(sectionId);

    items.forEach(item => {
        const itemElement = createValorantItemElement(item);
        container.appendChild(itemElement);
    });
}

function createValorantItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';

    const nameElement = document.createElement('h3');
    nameElement.textContent = item.displayName || item.name; // Use 'displayName' for Valorant API

    const imageElement = document.createElement('img');
    if (item.displayIcon || item.icon) { // 'displayIcon' for skins, 'icon' might be used for stickers
        imageElement.src = item.displayIcon || item.icon;
        imageElement.alt = item.displayName || item.name;
    }

    const previewButton = document.createElement('button');
    previewButton.className = 'preview-btn'; // Use for styling

    // Create img element for the expand icon
    const expandIcon = document.createElement('img');
    expandIcon.src = 'Page_images/expand-arrows-interface-symbol.png'; // Path to your downloaded expand icon
    expandIcon.alt = 'Preview';
    previewButton.appendChild(expandIcon);

    previewButton.onclick = () => enlargeImage(imageElement.src); // Function to enlarge image

    itemElement.appendChild(nameElement);
    if (item.displayIcon || item.icon) {
        itemElement.appendChild(imageElement);
    }
    itemElement.appendChild(previewButton);

    return itemElement;
}





