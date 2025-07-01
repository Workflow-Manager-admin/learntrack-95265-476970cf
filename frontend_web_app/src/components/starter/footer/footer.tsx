import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";

// PUBLIC_INTERFACE
export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer class="bg-secondary border-t mt-auto">
      <div class="container">
        <div class="py-6 text-center">
          <a 
            href="https://www.builder.io/" 
            target="_blank" 
            class="text-sm text-tertiary hover:text-secondary transition-colors"
          >
            <span>Made with ♡ by Builder.io</span>
            <span class="mx-2">|</span>
            <span>{new Date(serverTime.value.date).toLocaleDateString()}</span>
          </a>
        </div>
      </div>
    </footer>
  );
});
