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

const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'Zomming in on Milky Way',
        'name': 'Milky Way.mp4',
        'duration': '0:06',
    },
    {
        'id': 'a2',
        'title': 'Zomming in on Betelgeuse',
        'name': 'Betelgeuse.mp4',
        'duration': '0:39',
    },
    {
        'id': 'a3',
        'title': 'Zomming in on Pillars of Creation',
        'name': 'Pillars of Creation.mp4',
        'duration': '0:10',
    },
    {
        'id': 'a4',
        'title': 'Relax Music Galaxy',
        'name': 'Relax Music Galaxy.mp4',
        'duration': '01:52',
    },
    {
        'id': 'a5',
        'title': 'Travel The Universe',
        'name': 'Travel The Universe.mp4',
        'duration': '0:10',
    },
    {
        'id': 'a6',
        'title': 'Space Ambient  Music',
        'name': 'Space Ambient  Music.mp4',
        'duration': '0:07',
    }
];

data.forEach((video, i) => {
    let video_element = `
        <div class="video" data-id="${video.id}">
            <img src="images/play.svg" alt="">
            <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
            <h3 class="title">${video.title}</h3>
            <p class="time">${video.duration}</p>
        </div>
    `;
    video_playlist.innerHTML += video_element;
});

// Setting the first video as active
let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'images/pause.svg';

// Adding 'onclick' event for each video in the video playlist
videos.forEach(selected_video => {
    selected_video.onclick = () => {
        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';
        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;

        main_video.play();
    };
});