import { Slot, component$ } from "@builder.io/qwik";

// PUBLIC_INTERFACE
export default component$(() => {
  return (
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">
          <Slot name="title" />
        </h3>
        <div class="text-secondary">
          <Slot />
        </div>
      </div>
    </div>
  );
});
