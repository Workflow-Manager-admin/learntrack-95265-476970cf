import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  zod$,
  z,
  Form,
} from "@builder.io/qwik-city";

interface ListItem {
  text: string;
}

export const list: ListItem[] = [];

export const useListLoader = routeLoader$(() => {
  return list;
});

export const useAddToListAction = routeAction$(
  (item) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string().trim().min(1),
  }),
);

// PUBLIC_INTERFACE
export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();

  return (
    <div class="min-h-screen bg-primary">
      {/* Header */}
      <header class="bg-primary text-inverse py-16">
        <div class="container text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="text-accent">TODO</span> List
          </h1>
          <p class="text-lg opacity-90">
            A simple todo list demonstrating forms and data persistence
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main class="container py-8">
        <div class="max-w-2xl mx-auto">
          {/* Add Item Form */}
          <div class="card mb-8">
            <div class="card-header">
              <h2 class="card-title">Add New Item</h2>
            </div>
            <div class="card-body">
              <Form action={action} spaReset>
                <div class="flex gap-3">
                  <input 
                    type="text" 
                    name="text" 
                    required 
                    class="form-input flex-1"
                    placeholder="Enter a new todo item..."
                    maxLength={200}
                  />
                  <button type="submit" class="btn btn-primary">
                    Add Item
                  </button>
                </div>
              </Form>
              
              {action.value?.success && (
                <div class="mt-3 p-3 bg-success bg-opacity-10 border border-success border-opacity-20 rounded-lg text-success text-sm">
                  ✅ Item added successfully!
                </div>
              )}
              
              <p class="text-sm text-tertiary mt-3">
                💡 <strong>Pro tip:</strong> This app works even when JavaScript is disabled.
              </p>
            </div>
          </div>

          {/* Items List */}
          <div class="card">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h2 class="card-title">Your Items</h2>
                <span class="badge badge-secondary">
                  {list.value.length} item{list.value.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div class="card-body">
              {list.value.length === 0 ? (
                <div class="text-center py-12">
                  <div class="text-4xl mb-3">📝</div>
                  <h3 class="text-lg font-medium text-primary mb-2">No items yet</h3>
                  <p class="text-secondary">
                    Add your first todo item using the form above
                  </p>
                </div>
              ) : (
                <div class="space-y-3">
                  {list.value.map((item, index) => (
                    <div 
                      key={`items-${index}`}
                      class="flex items-center gap-3 p-3 bg-secondary rounded-lg border"
                    >
                      <div class="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span class="text-primary flex-1">{item.text}</span>
                      <span class="text-xs text-tertiary">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div class="grid md:grid-cols-2 gap-6 mt-8">
            <div class="card">
              <div class="card-body text-center">
                <div class="text-2xl mb-2">⚡</div>
                <h3 class="font-semibold text-primary mb-2">Progressive Enhancement</h3>
                <p class="text-sm text-secondary">
                  Works without JavaScript, enhanced with it
                </p>
              </div>
            </div>
            <div class="card">
              <div class="card-body text-center">
                <div class="text-2xl mb-2">🔄</div>
                <h3 class="font-semibold text-primary mb-2">SPA Reset</h3>
                <p class="text-sm text-secondary">
                  Form resets after submission for better UX
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo List - Demo",
  meta: [
    {
      name: "description",
      content: "A progressive todo list demonstrating forms, data persistence, and progressive enhancement with Qwik.",
    },
  ],
};
