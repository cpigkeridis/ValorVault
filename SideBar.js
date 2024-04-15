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
    }, 400); // Wait for 400 ms of inactivity before searching

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        isSearching = searchTerm.length > 0;
        currentSearchTerm = searchTerm;
        debouncedPerformSearch(searchTerm);
    });
};
  
  function performSearch(searchTerm) {
    // Filter and display CS skins
    const filteredSkins = isSearching ? window.skinsData.filter(item => {return item.name.toLowerCase().startsWith(searchTerm.toLowerCase());}) : window.skinsData.slice(0, skinsLoaded);
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

  
  window.addEventListener('DOMContentLoaded', (event) => {
      setupSearch(); // Initialize the search functionality
  });

  document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth' // Smooth scroll
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const bannerImage = document.getElementById('banner-image');
    const OpenSidebar = document.getElementById('open-sidebar');

    function updateSideBarIcon() {
        if (bodyElement.classList.contains('dark-theme')) {
            OpenSidebar.src = 'Page_images/Open-SideBar-White.png';
        } else {
            OpenSidebar.src = 'Page_images/Open-SideBar.png';
        }
    }

    // Function to change the banner image based on theme
    function updateBannerImage() {
        if (bodyElement.classList.contains('dark-theme')) {
            bannerImage.src = 'Page_images/BannerWhite.png';
        } else {
            bannerImage.src = 'Page_images/BannerBlack.png';
        }
    }

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', function() {
        bodyElement.classList.toggle('dark-theme');
        updateBannerImage(); // Change the banner image whenever the theme is toggled
        updateSideBarIcon(); // Change the sidebar icon whenever the theme is toggled
    });

    // Set the initial theme and banner image
    if (localStorage.getItem('theme') === 'dark') {
        bodyElement.classList.add('dark-theme');
        bannerImage.src = 'Page_images/BannerWhite.png'; // Set to white banner for dark theme
        OpenSidebar.src = 'Page_images/Open-SideBar-White.png';
    } 
});

document.querySelectorAll('.submenu-label').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var subSubMenu = this.nextElementSibling;
        if (subSubMenu.style.display === 'block') {
            subSubMenu.style.display = 'none';
        } else {
            document.querySelectorAll('.sub-sub-menu').forEach(subMenu => subMenu.style.display = 'none');
            subSubMenu.style.display = 'block';
        }
    });
});

function toggleSubmenu(submenuId) {
    const allSubmenus = document.querySelectorAll('.sub-menu');
    const targetSubmenu = document.getElementById(submenuId);
    
    // Toggle the target submenu and close all others
    allSubmenus.forEach(menu => {
        if(menu.id === submenuId) {
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        } else {
            menu.style.display = 'none';
        }
    });
}

function setupCategoryLinkSearch() {
    // Add event listeners to all category links
    const categoryLinks = document.querySelectorAll('.sub-sub-menu a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action
            const searchTerm = link.textContent.trim(); // Get the text content of the link
            updateSearchInputAndSearch(searchTerm); // Update the search input and perform the search
        });
    });
}

function updateSearchInputAndSearch(searchTerm) {
    const searchInput = document.querySelector('.input-search');
    searchInput.value = searchTerm; // Update the search input field
    searchInput.dispatchEvent(new Event('input')); // Manually trigger the input event to start the search
}

document.addEventListener('DOMContentLoaded', function() {
    setupCategoryLinkSearch(); // Set up the search functionality for category links
});


// Add event listener to the 'Counter-Strike Skins' toggleable link
document.querySelector('.toggleable-link').addEventListener('click', function(e) {
    e.preventDefault();
    toggleSubmenu('cs2skins-sub-menu'); // Passing the ID 
});
// Add event listener to the 'Valorant Skins' toggleable link
document.querySelector('.toggleable-link2').addEventListener('click', function(e) {
    e.preventDefault();
    toggleSubmenu('Valoskins-sub-menu'); // Passing the ID 
});
