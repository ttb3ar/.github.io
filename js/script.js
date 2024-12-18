// Dark mode toggle script
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
console.log('System prefers dark mode:', prefersDarkScheme.matches);

// Set the current theme based on localStorage or system preference
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
console.log('Current theme:', currentTheme);

// Set the initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Get the theme toggle button
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.textContent = 'Click Me'; // Default button text

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const currentMode = document.documentElement.getAttribute('data-theme');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';

        // Change the theme
        document.documentElement.setAttribute('data-theme', newMode);
        localStorage.setItem('theme', newMode);
        console.log('Theme changed to:', newMode);

        // Temporarily show the new mode on the button
        themeToggle.textContent = `Switching to ${newMode.charAt(0).toUpperCase() + newMode.slice(1)} Mode...`;
        
        // Revert to 'Click Me' after .25 seconds
        setTimeout(() => {
            themeToggle.textContent = 'Click Me';
        }, 250);
    });
} else {
    console.error('Theme toggle button not found.');
}

// Translation Script
const translateButton = document.getElementById("translate-random");

// Define supported languages
const languages = ["ar", "cn", "en", "fr", "jp", "kr", "ru", "sp"];

// Replace text dynamically
function replaceContent(translations) {
    // Translate page text elements
    document.getElementById("header").innerHTML = translations.header;
    document.getElementById("paragraph").innerHTML = translations.paragraph;
    document.getElementById("about-us").innerHTML = translations.about_us;
    document.getElementById("slideshow").innerHTML = translations.slideshow;

    // Translate button texts
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
        // Use button translations if available, otherwise keep current text
        if (translations.buttons && translations.buttons[index]) {
            button.textContent = translations.buttons[index];
        }
    });
}

// Event listener for the translate button
translateButton.addEventListener("click", async () => {
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    
    // Add translation in progress class
    translateButton.classList.add('translation-in-progress');
    translateButton.textContent = `Translating...`;

    try {
        // Fetch the JSON translation file
        const response = await fetch(`translations/${randomLanguage}.json`);
        const translations = await response.json();

        // Replace page content
        replaceContent(translations);
        console.log(`Translated to: ${randomLanguage}`);

        // Remove translation in progress class after a short delay
        setTimeout(() => {
            translateButton.classList.remove('translation-in-progress');
            translateButton.textContent = 'Click Me';
        }, 250);
    } catch (error) {
        console.error("Error loading translation:", error);
        
        // Remove translation in progress class and show error
        translateButton.classList.remove('translation-in-progress');
        translateButton.textContent = 'Error';
        
        // Revert to original text after a short delay
        setTimeout(() => {
            translateButton.textContent = 'Click Me';
        }, 1000);
    }
});
