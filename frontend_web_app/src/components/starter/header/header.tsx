import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";

// PUBLIC_INTERFACE
export default component$(() => {
  return (
    <header class="bg-elevated border-b shadow-sm">
      <div class="container">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center">
            <a href="/" class="flex items-center gap-3 text-primary hover:text-primary-dark transition-colors">
              <QwikLogo height={40} width={114} />
            </a>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <a
              href="https://qwik.dev/docs/components/overview/"
              target="_blank"
              class="text-sm text-secondary hover:text-primary transition-colors"
            >
              Docs
            </a>
            <a
              href="https://qwik.dev/examples/introduction/hello-world/"
              target="_blank"
              class="text-sm text-secondary hover:text-primary transition-colors"
            >
              Examples
            </a>
            <a
              href="https://qwik.dev/tutorial/welcome/overview/"
              target="_blank"
              class="text-sm text-secondary hover:text-primary transition-colors"
            >
              Tutorials
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
});
