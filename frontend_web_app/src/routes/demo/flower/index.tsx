import {
  component$,
  useVisibleTask$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { type DocumentHead, useLocation } from "@builder.io/qwik-city";
import styles from "./flower.css?inline";

// PUBLIC_INTERFACE
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  const state = useStore({
    count: 0,
    number: 20,
  });

  useVisibleTask$(({ cleanup }) => {
    const timeout = setTimeout(() => (state.count = 1), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 7000);
    cleanup(() => clearInterval(internal));
  });

  return (
    <div class="min-h-screen bg-primary">
      {/* Header */}
      <header class="bg-primary text-inverse py-16">
        <div class="container text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="text-accent">Generate</span> Flowers
          </h1>
          <p class="text-lg opacity-90">
            Watch beautiful animated flowers bloom with CSS transforms
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main class="container py-8">
        <div class="max-w-4xl mx-auto">
          {/* Controls */}
          <div class="card mb-8">
            <div class="card-body">
              <div class="flex flex-col sm:flex-row items-center gap-4">
                <label class="form-label mb-0 whitespace-nowrap">
                  Number of petals:
                </label>
                <div class="flex-1 max-w-md">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={state.number}
                    onInput$={(ev, el) => {
                      state.number = el.valueAsNumber;
                    }}
                    class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div class="badge badge-primary">
                  {state.number} petals
                </div>
              </div>
            </div>
          </div>

          {/* Animation Container */}
          <div class="card">
            <div class="card-body">
              <div
                style={{
                  "--state": `${state.count * 0.1}`,
                }}
                class={{
                  host: true,
                  pride: loc.url.searchParams.get("pride") === "true",
                }}
              >
                {Array.from({ length: state.number }, (_, i) => (
                  <div
                    key={i}
                    class={{
                      square: true,
                      odd: i % 2 === 0,
                    }}
                    style={{ "--index": `${i + 1}` }}
                  />
                )).reverse()}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div class="grid md:grid-cols-2 gap-6 mt-8">
            <div class="card">
              <div class="card-body text-center">
                <div class="text-2xl mb-2">🎨</div>
                <h3 class="font-semibold text-primary mb-2">CSS Animations</h3>
                <p class="text-sm text-secondary">
                  Powered by CSS transforms and transitions for smooth animations
                </p>
              </div>
            </div>
            <div class="card">
              <div class="card-body text-center">
                <div class="text-2xl mb-2">⚙️</div>
                <h3 class="font-semibold text-primary mb-2">Interactive Controls</h3>
                <p class="text-sm text-secondary">
                  Adjust the number of petals and watch the animation adapt
                </p>
              </div>
            </div>
          </div>

          {/* Pride Mode Link */}
          <div class="text-center mt-6">
            <a
              href="?pride=true"
              class="btn btn-accent"
            >
              🌈 Enable Pride Colors
            </a>
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower Animation - Demo",
  meta: [
    {
      name: "description",
      content: "Beautiful animated flower demo showcasing CSS transforms and interactive controls with Qwik.",
    },
  ],
};
