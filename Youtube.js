// Add all your YouTube video IDs here
const videos = [
  "vAqEz-EQITg",
  "jQpi9u2GGD0",
  "A0oJcCfSHzI",
  "HyKE8oRAaXQ",
  "8DssFyXgFbg",
  "mvH5q9DJlrA",
  "c37tp1GN028",
  "bSHoff-JlpQ",
  "BtHkKFmm0vg",
  "OjcKpIuU1Jw",
  "odW9fKQ3DV8",
  "PZUvwxhYNTQ",
];

// Number of videos to show initially
const INITIAL_COUNT = 6;

let shownCount = 0;

const grid = document.getElementById("videoGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Function to display videos
function displayVideos() {
  const nextVideos = videos.slice(shownCount, shownCount + INITIAL_COUNT);

  videos.forEach((id) => {
    const card = document.createElement("div");
    card.className = "video-card fade-in";

    card.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${id}" 
                allowfullscreen>
            </iframe>

            <div class="yt-actions">
        <a
          href="http://www.youtube.com/watch?v=VIDEO_ID"
          target="_blank"
          class="yt-btn subscribe"
          >Subscribe</a
        >
        <a
          href="http://www,youtube.com/watch?v=VIDEO_ID"
          target="_blank"
          class="yt-btn like"
          >Like👍</a
        >
        <a
          href="http://www,youtube.com/watch?v=VIDEO_ID"
          target="_blank"
          class="yt-btn comment"
          >Comment</a
        >
      </div>

        `;

    grid.appendChild(card);
  });

  shownCount += nextVideos.length;

  // Hide button when all videos are shown
  if (shownCount >= videos.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Run once on page load
displayVideos();

// Load more on button click
loadMoreBtn.addEventListener("click", displayVideos);
