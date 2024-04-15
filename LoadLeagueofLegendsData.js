window.addEventListener('DOMContentLoaded', (event) => {
    loadAllChampionsDetails();
});

let LeagueSkinsLoaded = 0;
const LeagueItemsPerLoad = 40; // Adjust based on desired items per load

function loadAllChampionsDetails() {
    const version = '14.7.1';
    const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

    fetch(championsUrl)
        .then(response => response.json())
        .then(data => {
            window.LeagueSkinsData = [];
            const champions = data.data;
            const championIds = Object.keys(champions).map(key => champions[key].id);
            championIds.forEach(id => {
                fetchChampionDetails(id);
            });
            setupScrollEventForLeagueSkins();
        })
        .catch(error => console.error('Error fetching all champions names:', error));
}

function fetchChampionDetails(championId) {
    const version = '14.7.1';
    const championUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championId}.json`;

    fetch(championUrl)
        .then(response => response.json())
        .then(data => {
            const championData = data.data[championId];
            const skins = championData.skins.map(skin => ({
                name: skin.name,
                image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skin.num}.jpg`
            }));
            window.LeagueSkinsData = window.LeagueSkinsData.concat(skins);
            if (LeagueSkinsLoaded === 0) {
                displayLeagueItems(window.LeagueSkinsData.slice(0, LeagueItemsPerLoad), 'LeagueSkins-section');
                LeagueSkinsLoaded += LeagueItemsPerLoad;
            }
        })
        .catch(error => console.error(`Error fetching details for ${championId}:`, error));
}

function setupScrollEventForLeagueSkins() {
    let isLoading = false;
    window.addEventListener('scroll', () => {
        let skinsSection = document.getElementById('LeagueSkins-section');
        if (window.innerHeight + window.pageYOffset >= skinsSection.offsetHeight + skinsSection.offsetTop - 200 && !isLoading && LeagueSkinsLoaded < window.LeagueSkinsData.length) {
            isLoading = true;
            setTimeout(() => {
                // Determine whether to apply search filtering on additional items
                const additionalSkins = window.LeagueSkinsData.slice(LeagueSkinsLoaded, LeagueSkinsLoaded + LeagueItemsPerLoad);
                LeagueSkinsLoaded += LeagueItemsPerLoad; // Increment loaded count for next scroll event
                const itemsToDisplay = isSearching ? additionalSkins.filter(skin => skin.name.toLowerCase().includes(currentSearchTerm)) : additionalSkins;
                displayLeagueItems(itemsToDisplay, 'LeagueSkins-section');
                isLoading = false;
            }, 500);
        }
    });
}


function displayLeagueItems(items, sectionId) {
    const container = document.getElementById(sectionId);
    items.forEach(item => {
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

function createItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';

    const nameElement = document.createElement('h3');
    nameElement.textContent = item.name;

    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.className = 'item-image';

    const previewButton = document.createElement('button');
    previewButton.className = 'preview-btn';
    previewButton.innerHTML = '<img src="Page_images/expand-arrows-interface-symbol.png" alt="Preview" />';
    previewButton.onclick = () => enlargeImage(imageElement.src);

    itemElement.appendChild(nameElement);
    itemElement.appendChild(imageElement);
    itemElement.appendChild(previewButton);

    return itemElement;
}

function enlargeImage(src) {
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';

    const enlargedImg = document.createElement('img');
    enlargedImg.src = src;
    enlargedImg.className = 'enlarged-image';

    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);
    overlay.onclick = () => document.body.removeChild(overlay);
}
