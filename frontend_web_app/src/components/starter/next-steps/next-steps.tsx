import { component$, $, useOnWindow, useSignal } from "@builder.io/qwik";

export const GETTING_STARTED_STEPS = [
  {
    message:
      "Press and hold the <b>ALT/Option</b> key to activate 'Click-to-Source' mode",
  },
  {
    message:
      "Select the title of this page while keeping the <b>ALT/Option</b> key pressed",
    hint: 'Edit the title and save the changes. If your editor does not open, have a look at <a href="https://github.com/yyx990803/launch-editor#supported-editors" target="_blank">this page</a> to set the correct <code>LAUNCH_EDITOR</code> value.',
  },
  {
    message:
      "<b>Update</b> now the <code>routeLoader$</code> defined in the <code>src/routes/layout.tsx</code> file",
    hint: "Instead of returning the current date, you could return any possible string.<br />The output is displayed in the footer.",
  },
  {
    message: "Create a <b>new Route</b> called <code>/me</code>",
    hint: 'Create a new directory called <code>me</code> in <code>src/routes</code>. Within this directory create a <code>index.tsx</code> file or copy the <code>src/routes/index.tsx</code> file. Your new route is now accessible <a href="/me" target="_blank">here</a> ✨',
  },
  {
    message: "Time to have a look at <b>Forms</b>",
    hint: 'Open <a href="/demo/todolist" target="_blank">the TODO list App</a> and add some items to the list. Try the same with disabled JavaScript 🐰',
  },
  {
    message: "<b>Congratulations!</b> You are now familiar with the basics! 🎉",
    hint: "If you need further info on how to use qwik, have a look at <a href='https://qwik.dev' target='_blank'>qwik.dev</a> or join the <a href='https://qwik.dev/chat' target='_blank'>Discord channel</a>.",
  },
];

// PUBLIC_INTERFACE
export default component$(() => {
  const gettingStartedStep = useSignal(0);

  useOnWindow(
    "keydown",
    $((e) => {
      if ((e as KeyboardEvent).key === "Alt") {
        gettingStartedStep.value = 1;
      }
    }),
  );

  const currentStep = GETTING_STARTED_STEPS[gettingStartedStep.value];

  return (
    <section class="bg-secondary py-16">
      <div class="container">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
            Time for a
            <br />
            <span class="text-accent">qwik intro</span>?
          </h2>
          
          <div class="card max-w-2xl mx-auto mb-8">
            <div class="card-body">
              <div class="flex items-center justify-between mb-4">
                <span class="badge badge-primary">
                  Step {gettingStartedStep.value + 1} of {GETTING_STARTED_STEPS.length}
                </span>
                <div class="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-primary transition-all duration-300"
                    style={{ 
                      width: `${((gettingStartedStep.value + 1) / GETTING_STARTED_STEPS.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div
                class="text-base md:text-lg text-primary mb-4"
                dangerouslySetInnerHTML={currentStep.message}
              />
              
              {currentStep.hint && (
                <div
                  class="text-sm text-secondary p-4 bg-secondary rounded-lg"
                  dangerouslySetInnerHTML={currentStep.hint}
                />
              )}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            {gettingStartedStep.value + 1 < GETTING_STARTED_STEPS.length ? (
              <>
                <button 
                  class="btn btn-primary"
                  onClick$={() => gettingStartedStep.value++}
                >
                  Continue to Step {gettingStartedStep.value + 2}
                </button>
                {gettingStartedStep.value > 0 && (
                  <button 
                    class="btn btn-secondary"
                    onClick$={() => gettingStartedStep.value--}
                  >
                    Previous Step
                  </button>
                )}
              </>
            ) : (
              <button
                class="btn btn-accent"
                onClick$={() => (gettingStartedStep.value = 0)}
              >
                🔄 Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
