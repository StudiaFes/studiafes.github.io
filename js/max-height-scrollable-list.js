function setScrollableListMaxHeight(itemSelector, offset) {
    // Get the height of the top navbar
    const topNavbar = document.querySelector('.navbar.fixed-top');
    const topNavbarHeight = topNavbar ? topNavbar.offsetHeight : 0;

    // Get the height of the bottom navbar
    const bottomNavbar = document.querySelector('.navbar.fixed-bottom');
    const bottomNavbarHeight = bottomNavbar ? bottomNavbar.offsetHeight : 0;

    // Calculate the available height for the scrollable list
    const availableHeight = window.innerHeight - topNavbarHeight - bottomNavbarHeight-offset;

    // Set the max-height for the scrollable list
    const scrollableList = document.querySelector(itemSelector);
    if (scrollableList) {
        scrollableList.style.maxHeight = `${availableHeight}px`;
    }
    const containerFluid = document.querySelector('.dynamic-margin');
    if (containerFluid) {
        containerFluid.style.marginTop = `${topNavbarHeight + offset}px`;
        containerFluid.style.marginBottom = `${bottomNavbarHeight + offset}px`;
    }
}