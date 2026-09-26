const panel = document.querySelector("#metrics-panel");
const announcement = document.querySelector("#panel-announcement");
const loadingState = document.querySelector("#loading-state");
const liveState = document.querySelector("#live-state");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const retryButton = document.querySelector("#retry-button");
const resultButtons = document.querySelectorAll("[data-result]");

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

let activeRequest = 0;

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

function renderState(state) {
  const isLoading = state === "loading";
  panel.dataset.state = state;
  panel.setAttribute("aria-busy", String(isLoading));
  loadingState.hidden = !isLoading;
  liveState.hidden = state !== "live";
  emptyState.hidden = state !== "empty";
  errorState.hidden = state !== "error";

  if (state === "loading") {
    announcement.textContent = "Loading service metrics.";
    return;
  }

  if (state === "live") {
    liveState.replaceChildren(...sampleMetrics.map(createMetricCard));
    announcement.textContent = "Service metrics loaded.";
    return;
  }

  if (state === "empty") {
    announcement.textContent = "No service metrics are available for this time range.";
    return;
  }

  announcement.textContent = "Metrics could not be loaded. A retry action is available.";
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function loadResult(result) {
  const requestId = ++activeRequest;
  renderState("loading");

  await wait(650);

  if (requestId !== activeRequest) {
    return;
  }

  renderState(result);
}

resultButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const result = button.dataset.result;

    if (result === "loading") {
      activeRequest += 1;
      renderState("loading");
      return;
    }

    loadResult(result);
  });
});

retryButton.addEventListener("click", () => {
  loadResult("live");
});

loadResult("live");
