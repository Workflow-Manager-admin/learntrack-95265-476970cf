import { component$ } from "@builder.io/qwik";
import ImgThunder from "../../../media/thunder.png?jsx";

// PUBLIC_INTERFACE
export default component$(() => {
  return (
    <section class="relative bg-primary text-inverse py-20 overflow-hidden">
      <ImgThunder class="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" alt="Background" />
      
      <div class="container relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            So <span class="text-accent">fantastic</span>
            <br />
            to have <span class="text-accent">you</span> here
          </h1>
          <p class="text-lg md:text-xl text-inverse opacity-90 mb-8 max-w-2xl mx-auto">
            Have fun building your App with Qwik. Experience the power of resumable applications.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="btn btn-accent btn-lg"
              onClick$={async () => {
                const defaults = {
                  spread: 360,
                  ticks: 70,
                  gravity: 0,
                  decay: 0.95,
                  startVelocity: 30,
                  colors: ["006ce9", "ac7ff4", "18b6f6", "713fc2", "ffffff"],
                  origin: {
                    x: 0.5,
                    y: 0.35,
                  },
                };

                function loadConfetti() {
                  return new Promise<(opts: any) => void>((resolve, reject) => {
                    if ((globalThis as any).confetti) {
                      return resolve((globalThis as any).confetti as any);
                    }
                    const script = document.createElement("script");
                    script.src =
                      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
                    script.onload = () =>
                      resolve((globalThis as any).confetti as any);
                    script.onerror = reject;
                    document.head.appendChild(script);
                    script.remove();
                  });
                }

                const confetti = await loadConfetti();

                function shoot() {
                  confetti({
                    ...defaults,
                    particleCount: 80,
                    scalar: 1.2,
                  });

                  confetti({
                    ...defaults,
                    particleCount: 60,
                    scalar: 0.75,
                  });
                }

                setTimeout(shoot, 0);
                setTimeout(shoot, 100);
                setTimeout(shoot, 200);
                setTimeout(shoot, 300);
                setTimeout(shoot, 400);
              }}
            >
              Time to celebrate 🎉
            </button>
            <a
              href="https://qwik.dev/docs"
              target="_blank"
              class="btn btn-secondary btn-lg"
            >
              Explore the docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
