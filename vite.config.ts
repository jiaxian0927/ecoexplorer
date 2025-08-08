import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.webp"],
  plugins: [react(), tailwindcss(), flowbiteReact()],
  base: "/ecoexplorer",
})