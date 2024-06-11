function toggleMode() {
    var body = document.body;
    var darkModeToggle = document.getElementById('dark-mode-toggle');
        
    var isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<span class="sun-icon"><i class="fas fa-sun"></i></span>';
    }
}

