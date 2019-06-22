function start() {
    // Selecting DOM elements
    const video = document.getElementById('video');
    const playButton = document.querySelector('.play-btn');
    const playSVG = document.querySelector('.play');
    const timerSelectButtons = document.querySelectorAll('.timer-select button');
    const timer = document.querySelector('#timer-content');
    var mute = document.querySelector('.mute');
    var mytimer;

    // Initial time setup
    var fakeDuration = 600;

    // Getting the volume DOM
    var rainVol = document.querySelector('#rain-vol');
    var thunderVol = document.querySelector('#thunder-vol');
    var windVol = document.querySelector('#wind-vol');
    var cricketVol = document.querySelector('#cricket-vol');
    var birdVol = document.querySelector('#bird-vol');

    // Getting the songs/music
    const rain = new Audio('../Music/rain.mp3');
    const thunder = new Audio('../Music/thunder.mp3');
    const wind = new Audio('../Music/wind.mp3');
    const cricket = new Audio('../Music/cricket.mp3');
    const bird = new Audio('../Music/bird.mp3');

    // Setting the initial volume of the music
    rain.volume = 0.5;
    thunder.volume = 0;
    wind.volume = 0;
    cricket.volume = 0;
    bird.volume = 0;

    // Set the loop of the music to true to run them continueously
    rain.loop = true;
    thunder.loop = true;
    wind.loop = true;
    cricket.loop = true;
    bird.loop = true;

    function checkPlaying() {
        if (video.paused) {
            // Call the timer function and play the music
            startTimer(fakeDuration);
            video.play();
            rain.play();
            thunder.play();
            wind.play();
            cricket.play();
            bird.play();
            video.muted = true;
            playSVG.src = '../svg/pause.svg';
        } else {
            // Clear the interval of the timer and pause the music
            clearInterval(mytimer);
            playSVG.src = '../svg/play.svg';
            video.pause();
            rain.pause();
            thunder.pause();
            wind.pause();
            cricket.pause();
            bird.pause();
        }
    }

    function playVideoAndRain() {
        checkPlaying();
    }

    function rainVolChange() {
        rain.volume = (rainVol.value) * 0.01;
    }

    function thunderVolChange() {
        thunder.volume = (thunderVol.value) * 0.01;
    }

    function windVolChange() {
        wind.volume = (windVol.value) * 0.01;
    }

    function cricketVolChange() {
        cricket.volume = (cricketVol.value) * 0.01;
    }

    function birdVolChange() {
        bird.volume = (birdVol.value) * 0.01;
    }

    function muteOrUnmute() {
        if (!rain.muted && !thunder.muted && !wind.muted && !cricket.muted && !bird.muted) {
            video.muted = rain.muted = thunder.muted = wind.muted = cricket.muted = bird.muted = true;
            mute.innerHTML = '<i class="fas fa-volume-off"></i> Unmute';
        } else {
            rain.muted = thunder.muted = wind.muted = cricket.muted = bird.muted = false;
            mute.innerHTML = '<i class="fas fa-volume-mute"></i> Mute';
        }
    }

    // Listen the event listeners
    playButton.addEventListener('click', playVideoAndRain);
    rainVol.addEventListener('change', rainVolChange);
    thunderVol.addEventListener('change', thunderVolChange);
    windVol.addEventListener('change', windVolChange);
    cricketVol.addEventListener('change', cricketVolChange);
    birdVol.addEventListener('change', birdVolChange);
    mute.addEventListener('click', muteOrUnmute);

    // Stop everything after the duration is completed
    video.ontimeupdate = function () {
        let videoCurrentTime = video.currentTime;
        if (videoCurrentTime >= fakeDuration) {
            video.pause();
            rain.pause();
            thunder.pause();
            wind.pause();
            cricket.pause();
            bird.pause();
            video.currentTime = 0;
            rain.currentTime = 0;
            thunder.currentTime = 0;
            wind.currentTime = 0;
            cricket.currentTime = 0;
            bird.currentTime = 0;
            playSVG.src = '../svg/play.svg';
        }
        // Disabing the timer buttons when video is playing
        if (!video.paused) {
            document.getElementById('3-min').disabled = true;
            document.getElementById('5-min').disabled = true;
            document.getElementById('10-min').disabled = true;
        } else {
            document.getElementById('3-min').disabled = false;
            document.getElementById('5-min').disabled = false;
            document.getElementById('10-min').disabled = false;
        }

    }
    console.log('Initail Duration outside' + fakeDuration);
    // Get the timer
    timerSelectButtons.forEach(option => {
        option.addEventListener('click', function () {

            console.log('Initail Duration ' + fakeDuration);
            fakeDuration = option.getAttribute('data-time');
            console.log('Final Duration ' + fakeDuration);

            let min = parseInt(fakeDuration / 60);
            let sec = parseInt(fakeDuration % 60);

            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            timer.textContent = min + ":" + sec;
        });
    });

    // Display the timer
    function startTimer(duration) {
        var durationOfTime = duration;
        mytimer = setInterval(function () {
            let minute = parseInt(durationOfTime / 60);
            let second = parseInt(durationOfTime % 60);

            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;

            timer.textContent = minute + ':' + second;

            if (--durationOfTime < 0) {
                durationOfTime = duration;
            }

            //  Clear everything
            if (durationOfTime == 0) {
                clearInterval(mytimer);
                timer.textContent = ` ${"0" + Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60) + "0"}`;
                video.pause();
                rain.pause();
                thunder.pause();
                wind.pause();
                cricket.pause();
                bird.pause();
                video.currentTime = 0;
                rain.currentTime = 0;
                thunder.currentTime = 0;
                wind.currentTime = 0;
                cricket.currentTime = 0;
                bird.currentTime = 0;
                playSVG.src = '../svg/play.svg';
            }
        }, 1000);
    }

    // Set the year for footer
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Call the functions
start();