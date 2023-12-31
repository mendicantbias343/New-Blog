// Dynamic accent color change on page reload
// needs to change on astro-transition

function setAccentColor() {
  const hueVal = randomIntFromInterval(0, 255);
  localStorage.setItem("currentHue", hueVal.toString());
  document.documentElement.style.cssText += "--accent-hue: " + hueVal + ";";
}

setAccentColor();
document.addEventListener("astro:after-swap", setAccentColor);

// The current theme
const currentTheme = localStorage.getItem("theme");
const primaryColorScheme = "dark"; // "light" | "dark"

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;
  if (primaryColorScheme) return primaryColorScheme;
  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

// sets the preference
function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    const setCSSForDarkTheme = () => {
      let hueVal = localStorage.getItem("currentHue");
      document.documentElement.style.cssText =
        "--accent-hue: " +
        hueVal +
        "; --accent-color: hsl(" +
        hueVal +
        ", 85%, 80%); --text-color: hsl(215deg 30% 80%); --text-color-contrast:rgb(56, 56, 56); --button-border-color: rgba(255, 255, 255, 0.6); --bg-color: #0f172a";
    };

    const setCSSForLightTheme = () => {
      current = "--accent-hue: " + localStorage.getItem("currentHue");
      document.documentElement.style.cssText = current;
    };
    if (themeValue === "light") {
      document.documentElement.classList.remove("dark");
      setCSSForLightTheme();
    } else {
      document.documentElement.classList.add("dark");
      setCSSForDarkTheme();
    }
  }
}

reflectPreference();

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });

// Utility functions
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
