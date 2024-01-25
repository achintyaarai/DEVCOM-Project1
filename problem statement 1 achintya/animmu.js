// Initialize the audio context
let audioCtx;
try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext)();
} catch (e) {
    alert('Web Audio API is not supported in this browser');
}

// Initialize variables
var flag = 0;

// Create an intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Select hidden elements and menu
const hidden = document.querySelectorAll('.hide');
const menu = document.getElementById('menu');
let currentDropDown;

// Observe hidden elements
hidden.forEach((e1) => observer.observe(e1));

// Handle click events
document.addEventListener("click", e => {
    const isDropDownButton = e.target.matches("[menu-drop]");

    if (!isDropDownButton && e.target.closest('[menu-drop]') != null) {
        return;
    }

    if (isDropDownButton) {
        currentDropDown = e.target.closest('[menu-drop]');
        currentDropDown.classList.toggle("active");

        if (currentDropDown.matches('.active')) {
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
            menu.style.pointerEvents = "auto";
            menu.style.transition = "all 0.2s ease-in-out";
        } else {
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-10px)";
            menu.style.pointerEvents = "none";
        }
    } else {
        currentDropDown.classList.remove("active");
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-10px)";
        menu.style.pointerEvents = "none";
    }
});

// Create an audio element
let audi = new Audio();

// Set audio source
audi.src = 'img/y2mate.com - Kanye West Ty Dolla Sign  Burn CDQ Full Leak.mp3';
audi.currentTime = 0;
audi.pause();

// Get container, canvas, and audio context
const conta = document.getElementById('container');
const can = document.getElementById('canvas');
can.width = window.innerWidth;
can.height = window.innerHeight;
const ctx = can.getContext('2d');

// Initialize audio source and analyser
let audioSource;
let analyser;
audioSource = audioCtx.createMediaElementSource(audi);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount / 2;
const dataArray = new Uint8Array(bufferLength);
const barWidth = canvas.width / bufferLength;
let barHeight;
var flag3 = 0;
var flag2 = 1;

// Handle canplaythrough event. The song should be loaded enough for the song to begin playing
audi.addEventListener('canplaythrough', function () {
    // Handle click on subtext
    document.getElementById('subtext').addEventListener('click', function () {
        // Resume audio context if suspended (issue I faced on refreshing)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                console.log('AudioContext resumed successfully');
                flag2 = 0;
                audi.play();

                // Animate audio visualizer
                function animate() {
                    x = 0;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    analyser.getByteFrequencyData(dataArray);

                    for (let i = 0; i < bufferLength; i++) {
                        barHeight = dataArray[i] * 4;
                        ctx.fillStyle = 'rgba(46, 46, 46, 0.449)';
                        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                        x += barWidth;
                    }
                    requestAnimationFrame(animate);
                }
                animate();
            });
        } else if (flag2) {
            // Play audio and animate visualizer
            flag2 = 0;
            audi.play();

            function animate() {
                x = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                analyser.getByteFrequencyData(dataArray);

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] * 4;
                    ctx.fillStyle = 'rgba(46, 46, 46, 0.449)';
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth;
                }
                requestAnimationFrame(animate);
            }
            animate();
        } else {
            // Pause audio
            flag2 = 1;
            audi.pause();
        }
    });
});
