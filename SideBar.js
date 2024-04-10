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

            // Close the sidebar
            toggleSidebar();
        });
    });
});

