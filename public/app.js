const $ = (selector) => document.querySelector(selector);

let state = { connected: false, users: [], servers: [], apps: [], active: {}, busy: false };

function token() {
  return localStorage.getItem("hub-token") ?? "";
}

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (response.status === 401) {
    const value = prompt("Admin token");
    if (value !== null) {
      localStorage.setItem("hub-token", value);
      return api(path, options);
    }
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? `Request failed (${response.status})`);
  return data;
}

function toast(message, isError = false) {
  const el = $("#toast");
  el.textContent = message;
  el.className = isError ? "toast error" : "toast";
  el.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (el.hidden = true), 4000);
}

function showSteps(title, steps) {
  $("#log-title").textContent = title;
  const list = $("#log-list");
  list.innerHTML = "";
  for (const step of steps) {
    const li = document.createElement("li");
    li.className = step.ok ? "ok" : "fail";
    li.textContent = step.name;
    if (step.detail) {
      const small = document.createElement("small");
      small.textContent = step.detail;
      li.append(small);
    }
    list.append(li);
  }
  $("#log-dialog").showModal();
}

async function run(button, task) {
  if (button) button.disabled = true;
  try {
    await task();
  } catch (error) {
    toast(error.message, true);
  } finally {
    if (button) button.disabled = false;
    await refresh();
  }
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  node.append(...children);
  return node;
}

function actionButton(label, className, handler) {
  const button = el("button", { textContent: label, className });
  button.addEventListener("click", () => run(button, () => handler(button)));
  return button;
}

function renderProfiles() {
  const root = $("#profiles");
  root.innerHTML = "";
  for (const user of state.users) {
    const activeServer = state.servers.find((s) => s.id === state.active[user.id]);
    const tags = el("div", { className: "tags" });
    if (user.current) tags.append(el("span", { className: "tag accent", textContent: "foreground" }));
    tags.append(
      el("span", { className: user.running ? "tag ok" : "tag", textContent: user.running ? "running" : "stopped" }),
    );
    if (activeServer) tags.append(el("span", { className: "tag ok", textContent: `VPN: ${activeServer.name}` }));

    const select = el("select");
    select.append(el("option", { value: "", textContent: "Select server" }));
    for (const server of state.servers) {
      select.append(el("option", { value: server.id, textContent: server.name }));
    }
    if (activeServer) select.value = activeServer.id;

    const actions = el("div", { className: "actions" });
    actions.append(
      actionButton("Switch", "ghost", () => api(`/users/${user.id}/switch`, { method: "POST" })),
      actionButton("Connect", "", async () => {
        if (!select.value) throw new Error("Choose a server first");
        const result = await api(`/users/${user.id}/activate`, {
          method: "POST",
          body: { serverId: select.value },
        });
        showSteps(`Connect in ${user.name}`, result.steps);
      }),
      actionButton("Disconnect", "ghost", async () => {
        const result = await api(`/users/${user.id}/disconnect`, { method: "POST" });
        showSteps(`Disconnect in ${user.name}`, result.steps);
      }),
    );
    if (user.id !== 0) {
      actions.append(
        actionButton(user.running ? "Stop" : "Start", "ghost", () =>
          api(`/users/${user.id}/${user.running ? "stop" : "start"}`, { method: "POST" }),
        ),
        actionButton("Delete", "danger", async () => {
          if (!confirm(`Delete profile "${user.name}" and all its data?`)) return;
          await api(`/users/${user.id}`, { method: "DELETE" });
        }),
      );
    }

    root.append(
      el(
        "div",
        { className: user.current ? "card current" : "card" },
        el(
          "div",
          { className: "card-top" },
          el("span", { className: "card-title", textContent: `${user.name} (#${user.id})` }),
        ),
        tags,
        select,
        actions,
      ),
    );
  }
}

function renderServers() {
  const root = $("#servers");
  root.innerHTML = "";
  for (const server of state.servers) {
    const info = el("div", {}, el("strong", { textContent: server.name }), el("small", { textContent: server.link }));
    root.append(
      el(
        "li",
        {},
        info,
        actionButton("Remove", "danger", () => api(`/servers/${server.id}`, { method: "DELETE" })),
      ),
    );
  }
}

function renderApps() {
  const root = $("#apps");
  root.innerHTML = "";
  for (const app of state.apps ?? []) {
    const info = el(
      "div",
      {},
      el("strong", { textContent: app.label }),
      el("small", { textContent: app.package ?? "not installed yet" }),
    );
    const actions = el(
      "div",
      { className: "row-actions" },
      actionButton("Install", "", async () => {
        const answer = prompt("Profile ids separated by commas, leave empty for all profiles", "");
        if (answer === null) return;
        const users = answer
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
          .map(Number);
        if (users.some((id) => !Number.isInteger(id) || id < 0)) throw new Error("Invalid profile id");
        const result = await api(`/apps/${app.id}/install`, { method: "POST", body: users.length ? { users } : {} });
        showSteps(`Install ${app.label}`, result.steps);
      }),
      actionButton("Remove", "danger", async () => {
        if (!confirm(`Remove "${app.label}" from the panel? It stays installed on the phone.`)) return;
        await api(`/apps/${app.id}`, { method: "DELETE" });
      }),
    );
    root.append(el("li", {}, info, actions));
  }
}

function renderHeader() {
  const badge = $("#device-state");
  badge.textContent = state.connected ? "device online" : "device offline";
  badge.className = state.connected ? "badge ok" : "badge bad";
}

async function refresh() {
  try {
    state = await api("/status");
  } catch (error) {
    toast(error.message, true);
  }
  renderHeader();
  renderProfiles();
  renderServers();
  renderApps();
}

async function loadIdentity() {
  if (!state.root) {
    const note = $("#identity");
    note.innerHTML = "";
    note.append(el("p", { textContent: "Root access is not available to the shell, so identity sync is disabled." }));
    return;
  }
  const data = await api("/identity");
  const root = $("#identity");
  root.innerHTML = "";
  const table = el("table");
  table.append(
    el("thead", {}, el("tr", {}, el("th", { textContent: "Profile" }), el("th", { textContent: "Happ ID" }), el("th"))),
  );
  const body = el("tbody");
  for (const row of data.rows) {
    const value = row.value ?? row.error ?? "not initialized";
    const action = actionButton("Use as source", "ghost", async () => {
      if (!confirm(`Copy the Happ ID from "${row.name}" to all other profiles?`)) return;
      const result = await api("/identity/sync", { method: "POST", body: { sourceUserId: row.id } });
      if (result.steps.length) showSteps("Sync Happ ID", result.steps);
      toast(`Synced ${result.synced.length} profile(s). Reboot the phone to apply.`);
      await loadIdentity();
    });
    body.append(el("tr", {}, el("td", { textContent: `${row.name} (#${row.id})` }), el("td", {}, el("code", { textContent: value })), el("td", {}, action)));
  }
  table.append(body);
  root.append(table, el("p"), actionButton("Reboot phone", "danger", async () => {
    if (!confirm("Reboot the phone now?")) return;
    await api("/reboot", { method: "POST" });
    toast("Reboot command sent");
  }));
}

$("#refresh").addEventListener("click", refresh);

$("#upload-apk").addEventListener("click", (event) =>
  run(event.currentTarget, async () => {
    const file = $("#apk-file").files[0];
    if (!file) throw new Error("Choose an APK file first");
    const response = await fetch("/api/happ/apk", {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream", Authorization: `Bearer ${token()}` },
      body: file,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error ?? `Upload failed (${response.status})`);
    toast("APK uploaded");
  }),
);

$("#upload-app").addEventListener("click", (event) =>
  run(event.currentTarget, async () => {
    const file = $("#app-file").files[0];
    const label = $("#app-label").value.trim();
    if (!label) throw new Error("Give the app a name first");
    if (!file) throw new Error("Choose an APK file first");
    const response = await fetch(`/api/apps?label=${encodeURIComponent(label)}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream", Authorization: `Bearer ${token()}` },
      body: file,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error ?? `Upload failed (${response.status})`);
    $("#app-label").value = "";
    $("#app-file").value = "";
    toast("APK uploaded");
  }),
);

$("#download-app").addEventListener("click", (event) =>
  run(event.currentTarget, async () => {
    const label = $("#app-label").value.trim();
    const url = $("#app-url").value.trim();
    if (!label) throw new Error("Give the app a name first");
    if (!url) throw new Error("Paste a link to the APK first");
    await api("/apps/url", { method: "POST", body: { label, url } });
    $("#app-label").value = "";
    $("#app-url").value = "";
    toast("APK downloaded");
  }),
);

$("#install-happ").addEventListener("click", (event) =>
  run(event.currentTarget, async () => {
    const result = await api("/happ/install", { method: "POST" });
    showSteps("Install Happ", result.steps);
  }),
);
$("#load-identity").addEventListener("click", (event) => run(event.currentTarget, loadIdentity));

$("#create-user").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  run(form.querySelector("button"), async () => {
    await api("/users", { method: "POST", body: { name: form.name.value } });
    form.reset();
  });
});

$("#add-server").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  run(form.querySelector("button"), async () => {
    await api("/servers", { method: "POST", body: { name: form.name.value, link: form.link.value } });
    form.reset();
  });
});

refresh();
setInterval(refresh, 15000);
