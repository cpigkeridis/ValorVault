function toggleSidebar() {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const openIcon = document.getElementById('open-sidebar');
    const closeIcon = document.getElementById('close-sidebar');

    sidebar.classList.toggle('sidebar-open');
    
    if (sidebar.classList.contains('sidebar-open')) {
        body.classList.add('pushed'); // Add class when sidebar opens
        closeIcon.style.display = 'block';
        openIcon.style.display = 'none';
    } else {
        body.classList.remove('pushed'); // Remove class when sidebar closes
        closeIcon.style.display = 'none';
        openIcon.style.display = 'block';
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    // Close the sidebar if it's open
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('sidebar-open');

    // Add event listener to each sidebar link
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const sectionId = link.getAttribute('href').substring(1); // Get the section id without the '#'
            const section = document.getElementById(sectionId); // Get the section element
            const mainContent = document.getElementById('main-content'); // Get the main content element
            
            // Move the clicked section to the top of the main content
            mainContent.prepend(section);
            window.scrollTo(0, 0);
            
            // Close the sidebar
            toggleSidebar();
        });
    });
});



let isSearching = false;
let currentSearchTerm = '';


function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const setupSearch = () => {
    const searchInput = document.querySelector('.input-search');
    const debouncedPerformSearch = debounce((searchTerm) => {
        performSearch(searchTerm);
    }, 400); // Wait for 300 ms of inactivity before searching

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        isSearching = searchTerm.length > 0;
        currentSearchTerm = searchTerm;
        debouncedPerformSearch(searchTerm);
    });
};
  
  function performSearch(searchTerm) {
    // Filter and display CS skins
    const filteredSkins = isSearching ? window.skinsData.filter(item => item.name.toLowerCase().includes(searchTerm)) : window.skinsData.slice(0, skinsLoaded);
    document.getElementById('cs2skins-section').innerHTML = '';
    displayItems(filteredSkins, 'cs2skins-section');
  
    // Filter and display CS stickers
    const filteredStickers = isSearching ? window.stickersData.filter(item => item.name.toLowerCase().includes(searchTerm)) : window.stickersData.slice(0, stickersLoaded);
    document.getElementById('cs2stickers-section').innerHTML = '';
    displayItems(filteredStickers, 'cs2stickers-section');

    // Filter and display Valorant skins
    const filteredValorantSkins = isSearching ? window.valorantSkinsData.filter(item => item.displayName.toLowerCase().includes(searchTerm)) : window.valorantSkinsData.slice(0, valorantSkinsLoaded);
    document.getElementById('Valoskins-section').innerHTML = '';
    displayValorantItems(filteredValorantSkins, 'Valoskins-section');

    // Filter and display Valorant stickers
    const filteredValorantStickers = isSearching ? window.valorantStickersData.filter(item => item.displayName.toLowerCase().includes(searchTerm)) : window.valorantStickersData.slice(0, valorantStickersLoaded);
    document.getElementById('Valostickers-section').innerHTML = '';
    displayValorantItems(filteredValorantStickers, 'Valostickers-section');
}

  // Call setupSearch in your DOMContentLoaded event listener
  window.addEventListener('DOMContentLoaded', (event) => {
      setupSearch(); // Initialize the search functionality
  });
