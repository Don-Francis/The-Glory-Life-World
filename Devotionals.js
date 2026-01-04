// Map of devotionals: keys are "DD-MM-YYYY" and values are image URLs.
const devotionals = {
  "16-10-2025":
    "https://via.placeholder.com/700x500?text=Devotional+for+16th+October",
  "17-10-2025":
    "https://via.placeholder.com/700x500?text=Devotional+for+17th+October",
  "18-10-2025":
    "https://via.placeholder.com/700x500?text=Devotional+for+18th+October",
  // Add more mappings here...
};

// Utility: format Date -> "DD-MM-YYYY"
function formatDateKey(d) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function searchDevotional(title) {
  const lower = title.toLowerCase();

  // Find first matching devotional key
  const foundKey = Object.keys(devotionals).find(
    (dateKey) =>
      dateKey.toLowerCase().includes(lower) ||
      `Devotional for ${dateKey}`.toLowerCase().includes(lower)
  );

  if (foundKey) {
    showDevotionalForKey(foundKey);

    // Convert DD-MM-YYYY → YYYY-MM-DD for the date picker
    const [day, month, year] = foundKey.split("-");
    document.getElementById("devotionalDate").value = `${year}-${month}-${day}`;
  } else {
    document.getElementById("devotionalMessage").textContent =
      "No devotional found for that title.";
    document.getElementById("devotionalImage").src =
      "https://via.placeholder.com/700x500?text=No+Devotional+Found";
  }
}

// Wait until DOM is ready so we don't get null elements
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("devotionalImage");
  const message = document.getElementById("devotionalMessage");
  const dateInput = document.getElementById("devotionalDate");
  const calendarContainer = document.getElementById("calendarContainer");
  const toggleCalendarBtn = document.getElementById("toggleCalendarBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function showDevotionalForKey(dateKey) {
    if (devotionals[dateKey]) {
      img.src = devotionals[dateKey];
      img.classList.add("active");
      message.textContent = `Devotional for ${dateKey}`;
    } else {
      img.src =
        "https://via.placeholder.com/700x500?text=No+Devotional+Available+for+This+Date";
      img.classList.add("active");
      message.textContent = `No devotional found for ${dateKey}`;
    }
  }

  // Auto-load today's devotional
  (function loadToday() {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    dateInput.value = iso;
    const key = formatDateKey(today);
    showDevotionalForKey(key);
  })();

  // ⭐⭐ ADD THE SEARCH LISTENER RIGHT HERE ⭐⭐
  document.getElementById("searchInput").addEventListener("input", function () {
    const value = this.value.trim();
    if (value.length === 0) return;
    searchDevotional(value);
  });

  // When the user picks a date from the date input
  dateInput.addEventListener("change", () => {
    if (!dateInput.value) return;
    const picked = new Date(dateInput.value);
    const key = formatDateKey(picked);
    showDevotionalForKey(key);
  });

  // Toggle calendar visibility
  toggleCalendarBtn.addEventListener("click", () => {
    calendarContainer.style.display =
      calendarContainer.style.display === "block" ? "none" : "block";
  });

  // Change day by offset (positive or negative)
  function changeDay(offset) {
    // start from date input value if set, otherwise today
    let baseDate = dateInput.value ? new Date(dateInput.value) : new Date();
    baseDate.setDate(baseDate.getDate() + offset);
    // set the input (browser-friendly yyyy-mm-dd format)
    const iso = baseDate.toISOString().slice(0, 10);
    dateInput.value = iso;
    const key = formatDateKey(baseDate);
    showDevotionalForKey(key);
  }

  prevBtn.addEventListener("click", () => changeDay(-1));
  nextBtn.addEventListener("click", () => changeDay(1));

  // Auto-load today's devotional on first visit
  (function loadToday() {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    dateInput.value = iso;
    const key = formatDateKey(today);
    showDevotionalForKey(key);
  })();
});
