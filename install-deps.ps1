$packages = @(
    "@radix-ui/react-context-menu",
    "@radix-ui/react-dialog", 
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-avatar",
    "@radix-ui/react-aspect-ratio",
    "@radix-ui/react-label",
    "@radix-ui/react-select",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-switch",
    "@radix-ui/react-slider",
    "vaul",
    "cmdk",
    "recharts",
    "embla-carousel-react",
    "react-day-picker",
    "date-fns",
    "lucide-react",
    "class-variance-authority",
    "tailwind-merge",
    "clsx"
)

foreach ($pkg in $packages) {
    npm install $pkg --save
}