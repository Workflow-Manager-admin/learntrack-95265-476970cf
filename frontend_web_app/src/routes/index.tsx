import {
  component$,
  useStore,
  $,
  useVisibleTask$,
  useStyles$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import globalStyles from "../global.css?inline";
import componentStyles from "../components.css?inline";

// Type definitions
interface Topic {
  id: number;
  name: string;
  status: "notstarted" | "inprogress" | "completed";
  category: string;
  targetDate: string;
  notes: string;
}

interface DashboardStore {
  topics: Topic[];
  filterStatus: string;
  filterCategory: string;
  topicModalOpen: boolean;
  editingTopic: Topic | null;
  nextId: number;
  searchQuery: string;
  viewMode: 'grid' | 'list';
}

// Constants
const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Not Started", value: "notstarted" },
  { label: "In Progress", value: "inprogress" },
  { label: "Completed", value: "completed" },
];

const CATEGORY_OPTIONS = [
  "All",
  "JavaScript",
  "React",
  "TypeScript", 
  "DSA",
  "UI/UX",
  "Backend",
  "DevOps",
];

// Utility functions
function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "completed": return "badge badge-status-completed";
    case "inprogress": return "badge badge-status-in-progress";
    case "notstarted": return "badge badge-status-not-started";
    default: return "badge badge-secondary";
  }
}

function getCategoryColor(category: string): string {
  const colors = {
    'JavaScript': '#f7df1e',
    'React': '#61dafb', 
    'TypeScript': '#3178c6',
    'DSA': '#ff6b6b',
    'UI/UX': '#ff9f43',
    'Backend': '#2ecc71',
    'DevOps': '#9b59b6'
  };
  return colors[category as keyof typeof colors] || 'var(--color-primary)';
}

// Main Dashboard Component
// PUBLIC_INTERFACE
export default component$(() => {
  useStyles$(globalStyles);
  useStyles$(componentStyles);
  
  // State management
  const store = useStore<DashboardStore>({
    topics: [
      {
        id: 1,
        name: "Master JavaScript Fundamentals",
        status: "completed",
        category: "JavaScript",
        targetDate: "2024-03-15",
        notes: "Focus on closures, prototypes, and async patterns",
      },
      {
        id: 2,
        name: "Data Structures & Algorithms",
        status: "inprogress", 
        category: "DSA",
        targetDate: "2024-06-30",
        notes: "Complete 150 LeetCode problems, focus on trees and graphs",
      },
      {
        id: 3,
        name: "Modern React Patterns",
        status: "inprogress",
        category: "React", 
        targetDate: "2024-05-20",
        notes: "Hooks, context, performance optimization",
      },
      {
        id: 4,
        name: "TypeScript Advanced Features",
        status: "notstarted",
        category: "TypeScript",
        targetDate: "2024-07-15",
        notes: "Generics, utility types, conditional types",
      },
      {
        id: 5,
        name: "UI/UX Design Principles",
        status: "notstarted", 
        category: "UI/UX",
        targetDate: "2024-08-01",
        notes: "Design systems, accessibility, user research",
      },
    ],
    filterStatus: "all",
    filterCategory: "All",
    topicModalOpen: false,
    editingTopic: null,
    nextId: 6,
    searchQuery: "",
    viewMode: 'grid',
  });

  // Computed values
  const filteredTopics = () => {
    let filtered = store.topics;
    
    // Apply status filter
    if (store.filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === store.filterStatus);
    }
    
    // Apply category filter
    if (store.filterCategory !== "All") {
      filtered = filtered.filter((t) => t.category === store.filterCategory);
    }
    
    // Apply search filter
    if (store.searchQuery.trim()) {
      const query = store.searchQuery.toLowerCase();
      filtered = filtered.filter((t) => 
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.notes.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const progressStats = () => {
    const topics = store.topics;
    const total = topics.length;
    const completed = topics.filter((t) => t.status === "completed").length;
    const inprogress = topics.filter((t) => t.status === "inprogress").length;
    const notstarted = total - completed - inprogress;
    
    return {
      total,
      completed,
      inprogress,
      notstarted,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  };

  // Event handlers
  // PUBLIC_INTERFACE: Open modal to add or edit a topic
  const openTopicModal = $((topic?: Topic) => {
    store.editingTopic = topic ? { ...topic } : {
      id: 0,
      name: "",
      status: "notstarted",
      category: CATEGORY_OPTIONS[1] || "",
      targetDate: "",
      notes: "",
    };
    store.topicModalOpen = true;
  });

  // PUBLIC_INTERFACE: Close the topic modal
  const closeTopicModal = $(() => {
    store.topicModalOpen = false;
    store.editingTopic = null;
  });

  // PUBLIC_INTERFACE: Handle form submission
  const handleSubmit = $((event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = (formData.get("name") as string | null)?.trim();
    if (!name) return;

    const status = formData.get("status") as "notstarted" | "inprogress" | "completed";
    const category = formData.get("category") as string;
    const targetDate = formData.get("targetDate") as string;
    const notes = formData.get("notes") as string;

    if (store.editingTopic && store.editingTopic.id > 0) {
      // Edit existing topic
      store.topics = store.topics.map((t) =>
        t.id === store.editingTopic!.id
          ? { ...t, name, status, category, targetDate, notes }
          : t
      );
    } else {
      // Add new topic
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
    
    closeTopicModal();
  });

  // PUBLIC_INTERFACE: Delete a topic
  const handleDelete = $((id: number) => {
    if (confirm("Are you sure you want to delete this topic?")) {
      store.topics = store.topics.filter((t) => t.id !== id);
    }
  });

  // PUBLIC_INTERFACE: Quick status update
  const updateTopicStatus = $((id: number, newStatus: "notstarted" | "inprogress" | "completed") => {
    store.topics = store.topics.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
  });

  // Keyboard shortcuts
  useVisibleTask$(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
        searchInput?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openTopicModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const stats = progressStats();

  return (
    <div class="min-h-screen bg-primary">
      {/* Header */}
      <header class="bg-elevated border-b shadow-sm sticky top-0 z-10">
        <div class="container">
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center gap-3">
              <div class="text-2xl">📚</div>
              <div>
                <h1 class="text-xl font-bold text-primary mb-0">Learning Tracker</h1>
                <p class="text-sm text-secondary mb-0">Track your learning journey</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button 
                class="btn btn-icon btn-ghost"
                onClick$={() => store.viewMode = store.viewMode === 'grid' ? 'list' : 'grid'}
                title={`Switch to ${store.viewMode === 'grid' ? 'list' : 'grid'} view`}
              >
                {store.viewMode === 'grid' ? '☰' : '⊞'}
              </button>
              <button 
                class="btn btn-primary"
                onClick$={() => openTopicModal()}
              >
                <span class="hidden sm:inline">Add Topic</span>
                <span class="sm:hidden">+</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="container py-6">
        <div class="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside class="lg:col-span-1">
            <div class="card">
              <div class="card-body">
                {/* Search */}
                <div class="form-group">
                  <label class="form-label" for="search-input">
                    Search Topics
                    <span class="text-xs text-tertiary ml-1">(⌘K)</span>
                  </label>
                  <input 
                    id="search-input"
                    type="text"
                    class="form-input"
                    placeholder="Search by name, category, or notes..."
                    value={store.searchQuery}
                    onInput$={(e) => store.searchQuery = (e.target as HTMLInputElement).value}
                  />
                </div>

                {/* Status Filter */}
                <div class="form-group">
                  <label class="form-label">Filter by Status</label>
                  <div class="grid grid-cols-1 gap-2">
                    {STATUS_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        class={`btn btn-sm ${store.filterStatus === option.value ? 'btn-primary' : 'btn-ghost'} justify-start`}
                        onClick$={() => store.filterStatus = option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div class="form-group">
                  <label class="form-label">Filter by Category</label>
                  <div class="grid grid-cols-1 gap-2">
                    {CATEGORY_OPTIONS.map((category) => (
                      <button
                        key={category}
                        class={`btn btn-sm ${store.filterCategory === category ? 'btn-primary' : 'btn-ghost'} justify-start`}
                        onClick$={() => store.filterCategory = category}
                      >
                        {category !== 'All' && (
                          <span 
                            class="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: getCategoryColor(category) }}
                          ></span>
                        )}
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main class="lg:col-span-3">
            {/* Progress Dashboard */}
            <div class="card mb-6">
              <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-semibold text-primary mb-0">Progress Overview</h2>
                  <div class="text-2xl font-bold text-primary">
                    {stats.completionRate}%
                  </div>
                </div>
                
                <div class="progress mb-4">
                  <div 
                    class="progress-bar success"
                    style={{ width: `${stats.completionRate}%` }}
                  ></div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="text-center">
                    <div class="text-xl font-semibold text-primary">{stats.total}</div>
                    <div class="text-sm text-secondary">Total Topics</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl font-semibold" style={{ color: 'var(--color-status-completed)' }}>
                      {stats.completed}
                    </div>
                    <div class="text-sm text-secondary">Completed</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl font-semibold" style={{ color: 'var(--color-status-in-progress)' }}>
                      {stats.inprogress}
                    </div>
                    <div class="text-sm text-secondary">In Progress</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl font-semibold" style={{ color: 'var(--color-status-not-started)' }}>
                      {stats.notstarted}
                    </div>
                    <div class="text-sm text-secondary">Not Started</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics List */}
            <div class="card">
              <div class="card-header">
                <div class="flex items-center justify-between">
                  <h3 class="card-title">Learning Topics</h3>
                  <div class="text-sm text-secondary">
                    {filteredTopics().length} of {store.topics.length} topics
                  </div>
                </div>
              </div>
              <div class="card-body">
                {filteredTopics().length === 0 ? (
                  <div class="text-center py-8">
                    <div class="text-4xl mb-3">📝</div>
                    <h4 class="text-lg font-medium text-primary mb-2">No topics found</h4>
                    <p class="text-secondary mb-4">
                      {store.searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding your first learning topic'}
                    </p>
                    <button class="btn btn-primary" onClick$={() => openTopicModal()}>
                      Add Your First Topic
                    </button>
                  </div>
                ) : (
                  <div class={store.viewMode === 'grid' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
                    {filteredTopics().map((topic) => (
                      <div
                        key={topic.id}
                        class={`card card-interactive ${store.viewMode === 'list' ? 'card-compact' : ''}`}
                      >
                        <div class="card-body">
                          <div class="flex items-start justify-between mb-3">
                            <h4 class="font-medium text-primary flex-1 pr-2">
                              {topic.name}
                            </h4>
                            <div class="flex gap-1">
                              <button
                                class="btn btn-xs btn-ghost"
                                onClick$={() => openTopicModal(topic)}
                                title="Edit topic"
                              >
                                ✏️
                              </button>
                              <button
                                class="btn btn-xs btn-ghost"
                                onClick$={() => handleDelete(topic.id)}
                                title="Delete topic"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>

                          <div class="flex items-center gap-2 mb-3">
                            <span class={getStatusBadgeClass(topic.status)}>
                              {STATUS_OPTIONS.find(s => s.value === topic.status)?.label}
                            </span>
                            <span 
                              class="badge badge-secondary"
                              style={{ 
                                backgroundColor: getCategoryColor(topic.category) + '20',
                                color: getCategoryColor(topic.category),
                                borderColor: getCategoryColor(topic.category) + '40'
                              }}
                            >
                              {topic.category}
                            </span>
                          </div>

                          {topic.targetDate && (
                            <div class="text-sm text-secondary mb-2">
                              <strong>Target:</strong> {new Date(topic.targetDate).toLocaleDateString()}
                            </div>
                          )}

                          {topic.notes && (
                            <p class="text-sm text-secondary mb-3 line-clamp-2">
                              {topic.notes}
                            </p>
                          )}

                          {/* Quick Status Actions */}
                          <div class="flex gap-1">
                            <button
                              class={`btn btn-xs ${topic.status === 'notstarted' ? 'btn-secondary' : 'btn-ghost'}`}
                              onClick$={() => updateTopicStatus(topic.id, 'notstarted')}
                              title="Mark as not started"
                            >
                              ⚪
                            </button>
                            <button
                              class={`btn btn-xs ${topic.status === 'inprogress' ? 'btn-warning' : 'btn-ghost'}`}
                              onClick$={() => updateTopicStatus(topic.id, 'inprogress')}
                              title="Mark as in progress"
                            >
                              🟡
                            </button>
                            <button
                              class={`btn btn-xs ${topic.status === 'completed' ? 'btn-success' : 'btn-ghost'}`}
                              onClick$={() => updateTopicStatus(topic.id, 'completed')}
                              title="Mark as completed"
                            >
                              🟢
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add/Edit Topic Modal */}
      {store.topicModalOpen && (
        <div class="modal-overlay" onClick$={closeTopicModal}>
          <div 
            class="modal"
            onClick$={(e) => e.stopPropagation()}
          >
            <div class="modal-header">
              <h3 class="modal-title">
                {store.editingTopic && store.editingTopic.id ? 'Edit Topic' : 'Add New Topic'}
              </h3>
              <button class="modal-close" onClick$={closeTopicModal}>
                ×
              </button>
            </div>
            <form preventdefault:submit onSubmit$={handleSubmit}>
              <div class="modal-body">
                <div class="form-group">
                  <label class="form-label required" for="topic-name">
                    Topic Name
                  </label>
                  <input
                    id="topic-name"
                    name="name"
                    type="text"
                    class="form-input"
                    placeholder="e.g., Master React Hooks"
                    value={store.editingTopic?.name || ''}
                    required
                    maxLength={100}
                  />
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                  <div class="form-group">
                    <label class="form-label" for="topic-status">
                      Status
                    </label>
                    <select
                      id="topic-status"
                      name="status"
                      class="form-select"
                      value={store.editingTopic?.status || 'notstarted'}
                    >
                      <option value="notstarted">Not Started</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="topic-category">
                      Category
                    </label>
                    <select
                      id="topic-category"
                      name="category"
                      class="form-select"
                      value={store.editingTopic?.category || CATEGORY_OPTIONS[1]}
                    >
                      {CATEGORY_OPTIONS.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="topic-date">
                    Target Date
                  </label>
                  <input
                    id="topic-date"
                    name="targetDate"
                    type="date"
                    class="form-input"
                    value={store.editingTopic?.targetDate || ''}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="topic-notes">
                    Notes
                  </label>
                  <textarea
                    id="topic-notes"
                    name="notes"
                    class="form-textarea"
                    placeholder="Add any additional notes, resources, or goals..."
                    rows={3}
                    maxLength={500}
                    value={store.editingTopic?.notes || ''}
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick$={closeTopicModal}>
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  {store.editingTopic?.id ? 'Update Topic' : 'Add Topic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div class="fixed bottom-4 right-4 text-xs text-tertiary bg-elevated p-2 rounded border shadow-sm hidden md:block">
        <div>⌘K to search</div>
        <div>⌘N to add topic</div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Learning Progress Tracker - Dashboard",
  meta: [
    {
      name: "description",
      content: "Track your learning journey with a beautiful, responsive dashboard. Organize topics, monitor progress, and achieve your learning goals.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
};
