// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // This is crucial for the App Router
  ],
  theme: {
    extend: {
      // You can extend your theme here
    },
  },
  plugins: [],
}
export default config
