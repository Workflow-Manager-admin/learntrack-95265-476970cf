interface Topic {
  id: number;
  name: string;
  status: "notstarted" | "inprogress" | "completed";
  category: string;
  targetDate: string;
  notes: string;
}

function statusColor(status: string) {
  if (status === "completed") return "var(--tracker-status-completed)";
  if (status === "inprogress") return "var(--tracker-status-inprogress)";
  return "#bbb";
}

import {
  component$,
  useStore,
  $,
  useVisibleTask$,
  useStyles$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import trackerCss from "./tracker.module.css?inline";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Not Started", value: "notstarted" },
  { label: "In Progress", value: "inprogress" },
  { label: "Completed", value: "completed" },
];

const CATEGORY_OPTIONS = [
  "All",
  "JavaScript",
  "DSA",
  "UI/UX",
  "React",
  "TypeScript",
];

// PUBLIC_INTERFACE
const Dashboard = component$(() => {
  useStyles$(trackerCss);
  // Initial topics for demo
  const store = useStore<{
    topics: Topic[];
    filterStatus: string;
    filterCategory: string;
    topicModalOpen: boolean;
    editingTopic: Topic | null;
    nextId: number;
  }>({
    topics: [
      {
        id: 1,
        name: "JavaScript Basics",
        status: "completed",
        category: "JavaScript",
        targetDate: "2024-05-01",
        notes: "Review closures and scope.",
      },
      {
        id: 2,
        name: "DSA - Trees",
        status: "inprogress",
        category: "DSA",
        targetDate: "2024-06-15",
        notes: "Solve 10 tree problems.",
      },
      {
        id: 3,
        name: "UI/UX Principles",
        status: "notstarted",
        category: "UI/UX",
        targetDate: "2024-07-01",
        notes: "",
      },
    ],
    filterStatus: "all",
    filterCategory: "All",
    topicModalOpen: false,
    editingTopic: null,
    nextId: 4,
  });

  const filteredTopics = () => {
    let filtered = store.topics as Topic[];
    if (store.filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === store.filterStatus);
    }
    if (store.filterCategory !== "All") {
      filtered = filtered.filter((t) => t.category === store.filterCategory);
    }
    return filtered;
  };

  // Calculate progress for dashboard stats
  const progressStats = () => {
    const topics = store.topics;
    const total = topics.length;
    const completed = topics.filter((t) => t.status === "completed").length;
    const inprogress = topics.filter((t) => t.status === "inprogress").length;
    return {
      total,
      completed,
      inprogress,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  };

  // PUBLIC_INTERFACE: Open modal to add or edit a topic
  const openTopicModal = $((topic?: Topic) => {
    store.editingTopic = topic
      ? { ...topic }
      : {
          id: 0,
          name: "",
          status: "notstarted",
          category: CATEGORY_OPTIONS[1] || "",
          targetDate: "",
          notes: "",
        };
    store.topicModalOpen = true;
  });

  // PUBLIC_INTERFACE: Close the topic modal (add/edit)
  const closeTopicModal = $(() => {
    store.topicModalOpen = false;
    store.editingTopic = null;
  });

  // PUBLIC_INTERFACE: Handle form submit for adding/editing topic
  const handleSubmit = $((event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const elements = form.elements as any;

    const name = elements.name.value.trim();
    if (!name) return;

    const status = elements.status.value as "notstarted" | "inprogress" | "completed";
    const category = elements.category.value;
    const targetDate = elements.targetDate.value;
    const notes = elements.notes.value;

    if (store.editingTopic && store.editingTopic.id > 0) {
      // Edit topic
      store.topics = store.topics.map((t) =>
        t.id === store.editingTopic!.id
          ? { ...t, name, status, category, targetDate, notes }
          : t,
      );
    } else {
      // Add topic
      store.topics = [
        ...store.topics,
        {
          id: store.nextId++,
          name,
          status,
          category,
          targetDate,
          notes,
        },
      ];
    }
    store.topicModalOpen = false;
    store.editingTopic = null;
  });

  // PUBLIC_INTERFACE: Delete a topic by id
  const handleDelete = $((id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete this topic?")) {
      store.topics = store.topics.filter((t) => t.id !== id);
    }
  });

  useVisibleTask$(() => {
    // Keyboard shortcut to open Add Topic modal (Ctrl + N)
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key?.toLowerCase() === "n") {
        openTopicModal();
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });

  const stats = progressStats();

  return (
    <div class="tracker-root">
      <header class="tracker-header">
        <h1>
          <span class="tracker-logo">📚</span> Learning Progress Tracker
        </h1>
      </header>
      <div class="tracker-layout">
        {/* Sidebar */}
        <aside class="tracker-sidebar">
          <div class="sidebar-section">
            <strong>Status</strong>
            <ul>
              {STATUS_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    class={
                      "sidebar-btn" +
                      (store.filterStatus === opt.value ? " active" : "")
                    }
                    style={{
                      background:
                        store.filterStatus === opt.value
                          ? "var(--tracker-accent)"
                          : "transparent",
                    }}
                    onClick$={() => (store.filterStatus = opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div class="sidebar-section">
            <strong>Category</strong>
            <ul>
              {CATEGORY_OPTIONS.map((category) => (
                <li key={category}>
                  <button
                    class={
                      "sidebar-btn" +
                      (store.filterCategory === category ? " active" : "")
                    }
                    style={{
                      background:
                        store.filterCategory === category
                          ? "var(--tracker-primary)"
                          : "transparent",
                      color:
                        store.filterCategory === category
                          ? "white"
                          : "inherit",
                    }}
                    onClick$={() => (store.filterCategory = category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Main Content Area */}
        <main class="tracker-main">
          <section class="tracker-dashboard">
            <div>
              <h2>
                Progress:{" "}
                <span style={{ color: "var(--tracker-primary)" }}>
                  {stats.percent}%
                </span>
              </h2>
              <progress
                max={100}
                value={stats.percent}
                style={{
                  width: "100%",
                  accentColor: "var(--tracker-primary)",
                  height: "20px",
                }}
              />
            </div>
            <div class="dashboard-stats">
              <div>
                <span class="stats-value">{stats.completed}</span>
                <span class="stats-label">Completed</span>
              </div>
              <div>
                <span class="stats-value">{stats.inprogress}</span>
                <span class="stats-label">In Progress</span>
              </div>
              <div>
                <span class="stats-value">{stats.total - stats.completed - stats.inprogress}</span>
                <span class="stats-label">Not Started</span>
              </div>
              <div>
                <span class="stats-value">{stats.total}</span>
                <span class="stats-label">Total</span>
              </div>
            </div>
            <button class="add-btn" onClick$={() => openTopicModal()}>
              + Add Topic
            </button>
          </section>
          <section class="tracker-topic-list">
            <h3>Learning Goals</h3>
            {filteredTopics().length === 0 ? (
              <p class="empty-list">No topics found.</p>
            ) : (
              <ul class="topic-list">
                {filteredTopics().map((topic) => (
                  <li
                    key={topic.id}
                    class={[
                      "topic-item",
                      "status-" + topic.status,
                    ]}
                  >
                    <div class="topic-main">
                      <span
                        class="status-dot"
                        style={{ background: statusColor(topic.status) }}
                        title={topic.status}
                      ></span>
                      <span class="topic-title">{topic.name}</span>
                      <span class="topic-category">{topic.category}</span>
                    </div>
                    <div class="topic-meta">
                      <span>
                        Target:{" "}
                        <span class="topic-date">
                          {topic.targetDate || <em>Not set</em>}
                        </span>
                      </span>
                      <span>
                        Status:{" "}
                        <span style={{ color: statusColor(topic.status) }}>
                          {STATUS_OPTIONS.find((s) => s.value === topic.status)?.label}
                        </span>
                      </span>
                    </div>
                    {topic.notes && (
                      <div class="topic-notes">
                        <strong>Notes:</strong> {topic.notes}
                      </div>
                    )}
                    <div class="topic-actions">
                      <button
                        class="topic-edit"
                        title="Edit"
                        onClick$={() => openTopicModal(topic)}
                      >
                        ✏️
                      </button>
                      <button
                        class="topic-del"
                        title="Delete"
                        onClick$={() => handleDelete(topic.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
      {store.topicModalOpen && (
        <div class="topic-modal-overlay" onClick$={closeTopicModal}>
          <div
            class="topic-modal"
            onClick$={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <h2>
              {store.editingTopic && store.editingTopic.id > 0 ? "Edit Topic" : "Add Topic"}
            </h2>
            <form
              class="topic-form"
              preventdefault:submit
              onSubmit$={handleSubmit}
            >
              <label>
                Topic Name
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={64}
                  value={store.editingTopic ? store.editingTopic.name : ""}
                />
              </label>
              <label>
                Status
                <select name="status" value={store.editingTopic ? store.editingTopic.status : "notstarted"}>
                  <option value="notstarted">Not Started</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <label>
                Category
                <select name="category" value={store.editingTopic ? store.editingTopic.category : CATEGORY_OPTIONS[1]}>
                  {CATEGORY_OPTIONS.slice(1).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>
              <label>
                Target Date
                <input
                  name="targetDate"
                  type="date"
                  value={store.editingTopic ? store.editingTopic.targetDate : ""}
                />
              </label>
              <label>
                Notes
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={280}
                  value={store.editingTopic ? store.editingTopic.notes : ""}
                ></textarea>
              </label>
              <div class="form-actions">
                <button type="button" class="cancel-btn" onClick$={closeTopicModal}>
                  Cancel
                </button>
                <button type="submit" class="submit-btn">
                  {store.editingTopic && store.editingTopic.id > 0
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <footer class="tracker-footer">
        <span>
          © {new Date().getFullYear()} Personal Learning Tracker.
          &nbsp;|&nbsp; <a href="https://qwik.dev/" target="_blank">Built with Qwik</a>
        </span>
      </footer>
      {/* Additional responsive/modern theme attribution */}
    </div>
  );
});

export default Dashboard;

export const head: DocumentHead = {
  title: "Learning Progress Tracker",
  meta: [
    {
      name: "description",
      content: "Personal learning tracker: dashboard, topics, filtering, and progress tracking.",
    },
  ],
};
