import { component$ } from "@builder.io/qwik";

interface GaugeProps {
  value?: number;
}

// PUBLIC_INTERFACE
export default component$<GaugeProps>(({ value = 50 }) => {
  const safeValue = Math.max(0, Math.min(100, value));
  const strokeDasharray = safeValue * 3.51;

  return (
    <div class="relative inline-block">
      <svg 
        viewBox="0 0 120 120" 
        class="w-32 h-32 md:w-48 md:h-48 transform -rotate-90"
        role="img"
        aria-label={`Progress gauge showing ${safeValue}%`}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--color-primary)" />
            <stop offset="100%" stop-color="var(--color-accent)" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          r="56"
          cx="60"
          cy="60"
          stroke-width="8"
          stroke="var(--color-border-light)"
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          r="56"
          cx="60"
          cy="60"
          stroke-width="8"
          stroke="url(#gaugeGradient)"
          fill="transparent"
          stroke-dasharray={`${strokeDasharray}, 351.858`}
          stroke-linecap="round"
          class="transition-all duration-500 ease-out"
          style={{
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      
      {/* Value display */}
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-2xl md:text-4xl font-bold text-primary">
          {safeValue}
        </span>
      </div>
    </div>
  );
});
