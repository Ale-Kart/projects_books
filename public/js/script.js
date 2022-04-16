const toggleDropdown = document.querySelector('#toggleDropdown');
const nav_dropdown = document.querySelector('.nav-dropdown');

toggleDropdown.addEventListener("click", () => {
    nav_dropdown.classList.toggle("DropOpen");
    if (nav_dropdown.classList.contains("DropOpen")) {
        nav_dropdown.style.display = "block"
    }
    else{
        nav_dropdown.style.display = "none"
    }
});