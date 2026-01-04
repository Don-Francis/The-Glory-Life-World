// ADD YOUR TIKTOK LINKS HERE
const tiktokVideos = [
  {
    thumbnail:
      "https://www.tiktok.com/@pastor_samuel_nasam/video/7573123481420713228?is_from_webapp=1&sender_device=pc&web_id=7590598204099118613",
    embed: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@example/video/123456789" 
            data-video-id="123456789" style="max-width: 605px;min-width: 325px;">
            <section>Loading...</section></blockquote>
            <script async src="https://www.tiktok.com/embed.js"></script>`,
  },
  // Add more here...
];

const grid = document.getElementById("tiktokGrid");

// Create video cards
tiktokVideos.forEach((video) => {
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `<img src="${video.thumbnail}" class="video-thumb">`;
  card.onclick = () => openVideo(video.embed);
  grid.appendChild(card);
});

// Modal functions
const modal = document.getElementById("videoModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openVideo(embedCode) {
  modalBody.innerHTML = embedCode;
  modal.style.display = "flex";
}

closeModal.onclick = () => {
  modal.style.display = "none";
  modalBody.innerHTML = "";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalBody.innerHTML = "";
  }
};
