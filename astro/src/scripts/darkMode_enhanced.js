const theme = (() => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
})();

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
  let current = localStorage.getItem("currentNonDarkModeVal");
  if (!current) {
    current = "--accent-hue: " + localStorage.getItem("currentHue");
  }
  document.documentElement.style.cssText = current;
  localStorage.setItem("currentNonDarkModeVal", "");
};

if (theme === "light") {
  document.documentElement.classList.remove("dark");
  setCSSForLightTheme();
} else {
  document.documentElement.classList.add("dark");
  setCSSForDarkTheme();
}

window.localStorage.setItem("theme", theme);

const handleToggleClick = () => {
  const element = document.documentElement;
  element.classList.toggle("dark");
  const isDark = element.classList.contains("dark");
  if (isDark) {
    let current = document.documentElement.style.cssText;
    localStorage.setItem("currentNonDarkModeVal", current);
    setCSSForDarkTheme();
  } else {
    setCSSForLightTheme();
  }
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

document
  .getElementById("themeToggle")
  .addEventListener("click", handleToggleClick);
