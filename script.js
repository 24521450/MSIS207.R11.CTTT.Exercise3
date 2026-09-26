const panel = document.querySelector("#metrics-panel");
const announcement = document.querySelector("#panel-announcement");
const loadingState = document.querySelector("#loading-state");
const liveState = document.querySelector("#live-state");
const loadButton = document.querySelector('[data-result="live"]');

const sampleMetrics = [
  {
    title: "Healthy services",
    value: "12 / 12",
    detail: "All monitored services are responding.",
    updated: "Updated just now",
    metadata: ["Healthy", "Production"]
  },
  {
    title: "Successful requests",
    value: "99.8%",
    detail: "Requests completed successfully in the last hour.",
    updated: "Updated just now",
    metadata: ["Last hour", "SLO 99.5%"]
  },
  {
    title: "Median response",
    value: "128 ms",
    detail: "Median API response time over the last hour.",
    updated: "Updated just now",
    metadata: ["Median", "Last hour"]
  }
];

function createMetricCard(metric) {
  const item = document.createElement("li");
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const value = document.createElement("strong");
  const detail = document.createElement("p");
  const updated = document.createElement("p");
  const badges = document.createElement("ul");

  article.className = "metric-card";
  heading.textContent = metric.title;
  value.className = "metric-value";
  value.textContent = metric.value;
  detail.className = "metric-detail";
  detail.textContent = metric.detail;
  updated.className = "metric-updated";
  updated.textContent = metric.updated;
  badges.className = "metadata-badges";
  metric.metadata.forEach((label) => {
    const badge = document.createElement("li");
    badge.textContent = label;
    badges.append(badge);
  });

  article.append(heading, value, detail, badges, updated);
  item.append(article);
  return item;
}

function renderLoading() {
  panel.setAttribute("aria-busy", "true");
  loadingState.hidden = false;
  liveState.hidden = true;
  announcement.textContent = "Loading service metrics.";
}

function renderLive() {
  panel.setAttribute("aria-busy", "false");
  loadingState.hidden = true;
  liveState.replaceChildren(...sampleMetrics.map(createMetricCard));
  liveState.hidden = false;
  announcement.textContent = "Service metrics loaded.";
}

function loadLiveMetrics() {
  renderLoading();
  window.setTimeout(renderLive, 650);
}

loadButton.addEventListener("click", loadLiveMetrics);
loadLiveMetrics();
