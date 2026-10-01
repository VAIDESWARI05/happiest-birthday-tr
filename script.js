/* =================================
   ELEMENTS
================================= */

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const firstScreen =
    document.getElementById("firstScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const photo1 =
    document.getElementById("photo1Card");

const photo2 =
    document.getElementById("photo2Card");

const photo3 =
    document.getElementById("photo3Card");

const puzzleSection =
    document.getElementById("puzzleSection");

const particleContainer =
    document.getElementById("particleContainer");

const canvas =
    document.getElementById("particleCanvas");

const finalImage =
    document.getElementById("finalPuzzleImage");

const message =
    document.getElementById("message");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const ctx =
    canvas.getContext("2d");


/* =================================
   MUSIC
================================= */

function playBirthdayMusic() {

    music.volume = 0.8;

    music.muted = false;

    music.currentTime = 0;


    const promise =
        music.play();


    if (promise !== undefined) {

        promise
            .then(function () {

                console.log(
                    "🎵 MUSIC PLAYING"
                );

                musicButton.style.display =
                    "none";

            })

            .catch(function (error) {

                console.log(
                    "Autoplay blocked:",
                    error
                );

                /*
                   Browser refused automatic
                   playback.

                   Show manual button.
                */

                musicButton.style.display =
                    "block";

            });

    }
}


/* =================================
   MUSIC BUTTON
================================= */

musicButton.addEventListener(
    "click",
    function () {

        music.volume = 0.8;

        music.muted = false;

        music.play()
            .then(function () {

                musicButton.style.display =
                    "none";

            })
            .catch(function (error) {

                console.log(
                    "Music error:",
                    error
                );

            });

    }
);


/* =================================
   YES BUTTON
================================= */

yesButton.addEventListener("click", function () {

    // Start music immediately when YES is clicked
    music.volume = 0.8;
    music.muted = false;

    music.play()
        .then(function () {
            console.log("🎵 Music started!");
        })
        .catch(function (error) {
            console.log("Music was blocked:", error);
            musicButton.style.display = "block";
        });

    // Open birthday screen
    firstScreen.classList.add("fade-out");

    setTimeout(function () {

        firstScreen.style.display = "none";

        birthdayScreen.style.display = "block";

        birthdayScreen.classList.add("birthday-show");

        createConfetti();

        showPhotos();

    }, 600);

});

/* =================================
   PHOTOS
================================= */

function showPhotos() {


    setTimeout(
        function () {

            photo1.classList.add(
                "photo-show"
            );

        },
        800
    );


    setTimeout(
        function () {

            photo2.classList.add(
                "photo-show"
            );

        },
        2800
    );


    setTimeout(
        function () {

            photo3.classList.add(
                "photo-show"
            );

        },
        4800
    );


    setTimeout(
        function () {

            puzzleSection.style.display =
                "block";


            startMoleculeReveal();


            setTimeout(
                function () {

                    puzzleSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                },
                300
            );

        },
        6800
    );


    setTimeout(
        function () {

            message.style.display =
                "block";


            message.style.animation =
                "birthdayReveal 1s ease forwards";


        },
        15000
    );

}


/* =================================
   MOLECULE REVEAL
================================= */

function startMoleculeReveal() {

    const image =
        new Image();


    image.src =
        "puzzle.jpeg";


    image.onload =
        function () {


            /* =========================
               PHOTO SIZE
            ========================= */

            let width;

            if (
                window.innerWidth < 600
            ) {

                width = 280;

            } else {

                width = 330;

            }


            width =
                Math.min(
                    width,
                    window.innerWidth * 0.88
                );


            /*
               KEEP ORIGINAL RATIO
            */

            const ratio =
                image.naturalHeight /
                image.naturalWidth;


            const height =
                width * ratio;


            canvas.width =
                Math.round(width);

            canvas.height =
                Math.round(height);


            particleContainer.style.width =
                Math.round(width) + "px";

            particleContainer.style.height =
                Math.round(height) + "px";


            /* =========================
               TEMP CANVAS
            ========================= */

            const tempCanvas =
                document.createElement(
                    "canvas"
                );


            tempCanvas.width =
                canvas.width;

            tempCanvas.height =
                canvas.height;


            const tempCtx =
                tempCanvas.getContext(
                    "2d"
                );


            tempCtx.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );


            const imageData =
                tempCtx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


            const pixels =
                imageData.data;


            /* =========================
               PARTICLES
            ========================= */

            const particles = [];

            const gap = 8;


            for (
                let y = 0;
                y < canvas.height;
                y += gap
            ) {

                for (
                    let x = 0;
                    x < canvas.width;
                    x += gap
                ) {


                    const index =
                        (
                            y *
                            canvas.width +
                            x
                        ) * 4;


                    const red =
                        pixels[index];

                    const green =
                        pixels[index + 1];

                    const blue =
                        pixels[index + 2];

                    const alpha =
                        pixels[index + 3];


                    if (alpha < 80) {
                        continue;
                    }


                    const angle =
                        Math.random() *
                        Math.PI * 2;


                    const distance =
                        160 +
                        Math.random() * 240;


                    particles.push({

                        x:
                            x +
                            Math.cos(angle) *
                            distance,

                        y:
                            y +
                            Math.sin(angle) *
                            distance,

                        targetX:
                            x,

                        targetY:
                            y,

                        color:
                            "rgba(" +
                            red + "," +
                            green + "," +
                            blue + "," +
                            (alpha / 255) +
                            ")",

                        size:
                            1.3 +
                            Math.random() * 1.2,

                        speed:
                            0.025 +
                            Math.random() * 0.025,

                        delay:
                            Math.random() * 60

                    });

                }

            }


            /* =========================
               ANIMATION
            ========================= */

            let frame = 0;


            function animate() {

                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                let finished = true;


                particles.forEach(
                    function (particle) {


                        if (
                            frame <
                            particle.delay
                        ) {

                            finished = false;

                        } else {


                            const dx =
                                particle.targetX -
                                particle.x;


                            const dy =
                                particle.targetY -
                                particle.y;


                            particle.x +=
                                dx *
                                particle.speed;


                            particle.y +=
                                dy *
                                particle.speed;


                            if (
                                Math.abs(dx) > 0.7 ||
                                Math.abs(dy) > 0.7
                            ) {

                                finished = false;

                            }

                        }


                        ctx.beginPath();


                        ctx.arc(
                            particle.x,
                            particle.y,
                            particle.size,
                            0,
                            Math.PI * 2
                        );


                        ctx.fillStyle =
                            particle.color;


                        ctx.fill();

                    }
                );


                frame++;


                if (!finished) {

                    requestAnimationFrame(
                        animate
                    );

                } else {


                    /*
                       Show clean original
                       image at the end.
                    */

                    setTimeout(
                        function () {

                            finalImage.classList.add(
                                "show"
                            );


                            canvas.style.transition =
                                "opacity 1.3s ease";


                            canvas.style.opacity =
                                "0";

                        },
                        800
                    );

                }

            }


            animate();

        };


    image.onerror =
        function () {

            finalImage.classList.add(
                "show"
            );

        };

}


/* =================================
   NO BUTTON
================================= */

function moveNoButton() {

    const screenWidth =
        window.innerWidth;

    const screenHeight =
        window.innerHeight;

    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    const maxX =
        Math.max(
            10,
            screenWidth -
            buttonWidth -
            20
        );


    const maxY =
        Math.max(
            10,
            screenHeight -
            buttonHeight -
            20
        );


    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;


    noButton.style.position =
        "fixed";

    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";

    noButton.style.zIndex =
        "9999";


    noButton.style.transform =
        "rotate(" +
        (
            Math.random() * 40 - 20
        ) +
        "deg)";

}


noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);


noButton.addEventListener(
    "click",
    function () {

        alert(
            "😏 Nice try! Now press YES 💖"
        );

    }
);


/* =================================
   CONFETTI
================================= */

function createConfetti() {

    const emojis = [

        "🎉",
        "✨",
        "💗",
        "🎈",
        "💕",
        "🥳",
        "🤍",
        "🌸",
        "⭐",
        "💫",
        "🫶",
        "🎊",
        "💖",
        "🌷",
        "T",
        "H",
        "A",
        "N",
        "U",
        "S",
        "H"

    ];


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.classList.add(
            "confetti"
        );


        confetti.innerText =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        confetti.style.left =
            Math.random() *
            100 +
            "vw";


        confetti.style.animationDuration =
            (
                2.5 +
                Math.random() * 4
            ) +
            "s";


        confetti.style.animationDelay =
            Math.random() * 2 +
            "s";


        confetti.style.fontSize =
            (
                14 +
                Math.random() * 18
            ) +
            "px";


        document.body.appendChild(
            confetti
        );


        setTimeout(
            function () {

                confetti.remove();

            },
            7500
        );

    }

}