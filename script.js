
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Initialize variables for voices
let voices = [];

// Load voices properly
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        // Add event listener if voices are not loaded yet
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
        };
    }
}

// Call loadVoices to initialize
loadVoices();

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    // Select a female voice matching `en-GB` or fallback to a female English voice
    utterance.voice =
        voices.find(voice => voice.lang === "en-GB" && voice.name.includes("Female")) ||
        voices.find(voice => voice.lang.includes("en") && voice.name.includes("Female")) ||
        voices[0]; // Fallback to the first available voice
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

function wishMe() {
    let day = new Date();
    let hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good morning sir.");
    } else if (hour >= 12 && hour < 16) {
        speak("Good afternoon sir.");
    } else {
        speak("Good evening sir.");
    }
}

// Enable the greeting when the page loads
 window.addEventListener("load", () => { wishMe(); });

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript; // Display transcript on the page
        takeCommand(transcript); // Pass the transcript to takeCommand
    };

    recognition.onend = () => {
        // When recognition ends without detecting speech
        if (btn.style.display === "none") {
            speak("Speech is not recognized. Please try again.");
            btn.style.display = "flex";
            voice.style.display = "none";
        }
    };

    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    });
} else {
    console.error("Speech Recognition is not supported in this browser.");
}

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    // Normalize the message: remove extra spaces and convert to lowercase
    let normalizedMessage = message.trim().toLowerCase();

    if (normalizedMessage.includes("hello") || normalizedMessage.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } 
    else if (normalizedMessage.includes("who are you")) {
        speak("I am your virtual assistant, created by Sudip sir....");
    } 
    else if (normalizedMessage.includes("thank you") || normalizedMessage.includes("thank you for your information")) {
        speak("welcome sir, enjoy your day....");
    } 
    else if (normalizedMessage.includes("what is your name") || normalizedMessage.includes(" tell me your name")
    ||normalizedMessage.includes("what's your name")) {
        speak("i,m siri,your virtual assistant....");
    } 
    else if (normalizedMessage.includes("i love her") ||normalizedMessage.includes("i love you")) {
        speak("I'm also love my creator Sudip sir.... not you");
    } 
    else if (normalizedMessage.includes("open youtube") || normalizedMessage.includes("opening youtube")) {
        speak("Opening YouTube.. just a moment.");
        window.open("https://www.youtube.com/");
    } 
    else if (normalizedMessage.includes("open google") || normalizedMessage.includes("opening google")) {
        speak("Opening Google.. just a moment.");
        window.open("https://www.google.com/");
    } 
    else if (normalizedMessage.includes("open instagram") || normalizedMessage.includes("opening instagram")) {
        speak("Opening Instagram.. just a moment.");
        window.open("https://www.instagram.com/");
    } 
    else if (normalizedMessage.includes("open linkedin") || normalizedMessage.includes("opening linkedin")) {
        speak("Opening linkedin.. just a moment.");
        window.open("https://www.linkedin.com/");
    } 
    else if (normalizedMessage.includes("open facebook") || normalizedMessage.includes("opening facebook")) {
        speak("Opening facebook.. just a moment.");
        window.open("https://www.facebook.com/");
    } 
    else if (normalizedMessage.includes("open calculator") || normalizedMessage.includes("opening calculator")) {
        speak("Opening calculator.. just a moment.");
        window.open("calculator://");
    } 
    else if (normalizedMessage.includes("open whatsapp") || normalizedMessage.includes("opening whatsapp")) {
        speak("Opening Whatsapp.. just a moment.");
        window.open("whatsapp://");
    } 
   
    else if (normalizedMessage.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }
    else if (normalizedMessage.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak(date);
    }
    else {
        speak(`This is what I found on the internet regarding ${message}.`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
