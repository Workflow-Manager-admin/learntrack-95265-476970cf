import { component$, useSignal, $ } from "@builder.io/qwik";
import Gauge from "../gauge";

// PUBLIC_INTERFACE
export default component$(() => {
  const count = useSignal(70);

  const setCount = $((newValue: number) => {
    if (newValue < 0 || newValue > 100) {
      return;
    }
    count.value = newValue;
  });

  return (
    <div class="flex items-center justify-center gap-6 py-12">
      <button
        class="btn btn-primary btn-lg btn-icon"
        onClick$={() => setCount(count.value - 1)}
        disabled={count.value <= 0}
        aria-label="Decrease value"
      >
        −
      </button>
      <div class="flex flex-col items-center gap-4">
        <Gauge value={count.value} />
        <div class="text-center">
          <div class="text-sm text-secondary">Current Value</div>
          <div class="text-lg font-semibold text-primary">{count.value}%</div>
        </div>
      </div>
      <button
        class="btn btn-primary btn-lg btn-icon"
        onClick$={() => setCount(count.value + 1)}
        disabled={count.value >= 100}
        aria-label="Increase value"
      >
        +
      </button>
    </div>
  );
});
