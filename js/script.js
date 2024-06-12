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

let stars = document.getElementById('stars');
let person = document.getElementById('person');
let text = document.getElementById('text');
let galaxy_front = document.getElementById('galaxy_front');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    stars.style.left = value * 0.3 + 'px';
    person.style.marginLeft = value * 0.4 + 'px';
    text.style.marginRight = value * 0.8 + 'px';
})