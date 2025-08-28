(async function () {
  const script = document.currentScript;
  const trackingId = script.getAttribute("data-tracking-id") || "UNKNOWN";
  const theme = script.getAttribute("data-theme") || "light";

  const container = document.createElement("div");
  container.style.border = "1px solid #ccc";
  container.style.padding = "16px";
  container.style.borderRadius = "8px";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.background = theme === "dark" ? "#1f1f1f" : "#fff";
  container.style.color = theme === "dark" ? "#fff" : "#000";
  container.innerText = "Loading tracking details...";

  script.parentNode.insertBefore(container, script.nextSibling);

  try {
    const res = await fetch("./mock-data.json");
    const data = await res.json();
    const trackingInfo = data[trackingId];

    if (!trackingInfo) {
      container.innerHTML = `<p>Tracking ID <b>${trackingId}</b> not found.</p>`;
      return;
    }

    const { productName, history, estimatedDelivery } = trackingInfo;

    container.innerHTML = `
      <h3 style="margin-top: 0;">${productName}</h3>
      <p><strong>Tracking ID:</strong> ${trackingId}</p>
      <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
      <div style="margin-top: 16px;">
        ${history.map((h, i) => `
          <div style="margin-bottom: 8px;">
            <span style="display:inline-block;width:10px;height:10px;background:#4CAF50;border-radius:50%;margin-right:8px;"></span>
            <strong>${h.status}</strong> <br/>
            <small>${new Date(h.time).toLocaleString()} – ${h.location}</small>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    console.error("Widget error:", err);
    container.innerText = "Failed to load tracking details.";
  }
})();
