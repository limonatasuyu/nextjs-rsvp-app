import { cn } from "@/lib/utils";

export function Switch({ className, label, ...props }: React.ComponentProps<"button"> & { label?: string }) {
  return label ? (
    <div>
      <label className="block text-lg font-medium" htmlFor={props.name}>
        {label}
      </label>
      <button
        type="button"
        role="switch"
        aria-checked="true"
        data-state={props.value ? "checked" : "unchecked"}
        value="on"
        data-slot="switch"
        className={cn(
          "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 mt-3 mb-3",
          className
        )}
        {...props}
      >
        <span
          data-state={props.value ? "checked" : "unchecked"}
          data-slot="switch-thumb"
          className={cn(
            "bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )}
        />
      </button>
    </div>
  ) : (
    <button
      type="button"
      role="switch"
      aria-checked="true"
      data-state={props.value ? "checked" : "unchecked"}
      value="on"
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        data-state={props.value ? "checked" : "unchecked"}
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </button>
  );
}
