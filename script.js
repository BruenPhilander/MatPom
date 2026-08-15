const envelope = document.querySelector(".envelope");

if (envelope) {
    window.addEventListener("load", function () {
        setTimeout(function () {
            envelope.classList.add("open");
        }, 700);
    });
}

function goToMessages() {
    const transition = document.querySelector(".page-transition");

    transition.classList.add("active");

    setTimeout(function () {
        window.location.href = "message.html";
    }, 600);
}

/* =================================
   NATURAL MESSAGE SEQUENCE
================================= */

const messageRows = document.querySelectorAll(".message-row");

if (messageRows.length > 0) {

    // Hide every message initially
    messageRows.forEach(function (message) {

        message.style.animation = "none";
        message.style.opacity = "0";
        message.style.transform = "translateY(14px)";

    });


    let messageIndex = 0;


    function showNextMessage() {

        if (messageIndex >= messageRows.length) {
            return;
        }


        const message = messageRows[messageIndex];

        // Show this message
        message.style.animation =
            "messageAppear 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards";


        /*
         * Longer messages get slightly more breathing room.
         */

        const textLength =
            message.innerText.trim().length;


        let waitTime;


        if (textLength < 20) {

            waitTime = 1000;

        } else if (textLength < 45) {

            waitTime = 1400;

        } else if (textLength < 80) {

            waitTime = 1900;

        } else {

            waitTime = 2400;

        }


        // Add a tiny random variation
        // so the conversation doesn't feel robotic

        waitTime +=
            Math.random() * 500 - 250;


        messageIndex++;


        setTimeout(
            showNextMessage,
            waitTime
        );

    }


    // Small pause before the conversation starts

    setTimeout(
        showNextMessage,
        700
    );

}


/* =================================
   PROPOSAL BUTTON
================================= */

function sayYes() {

    document.body.classList.add("proposal-complete");

    // Create the celebration hearts
    for (let i = 0; i < 25; i++) {

        const heart = document.createElement("span");

        heart.classList.add("celebration-heart");

        heart.textContent = Math.random() > 0.25 ? "♡" : "♥";

        // Random horizontal starting position
        heart.style.left = Math.random() * 100 + "vw";

        // Random size
        heart.style.fontSize =
            (18 + Math.random() * 25) + "px";

        // Random animation duration
        heart.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        // Random delay so they don't all appear together
        heart.style.animationDelay =
            (Math.random() * 1.2) + "s";

        // Random sideways movement
        heart.style.setProperty(
            "--drift",
            (Math.random() * 160 - 80) + "px"
        );

        document.body.appendChild(heart);

        // Remove after animation finishes
        setTimeout(function () {
            heart.remove();
        }, 7000);
    }
}

function youThought(button) {

    button.textContent = "YOU THOUGHT 😭";

    button.classList.add("you-thought");

}

function openMemories(event) {

    event.preventDefault();

    const envelope = document.querySelector(".envelope");
    const letter = document.querySelector(".letter");

    if (!envelope || !letter) return;

    envelope.classList.add("transitioning");

    setTimeout(function () {
        window.location.href = "memories.html";
    }, 1100);
}


/* =================================
   MEMORY PHOTO SCROLL HOVER
================================= */

const memoryPhotos = document.querySelectorAll(".memory-photo");

if (memoryPhotos.length > 0) {

    const photoObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("scroll-hover");

                } else {

                    entry.target.classList.remove("scroll-hover");

                }

            });

        },
        {
            threshold: 0.55
        }
    );


    memoryPhotos.forEach(function(photo) {

        photoObserver.observe(photo);

    });

}


