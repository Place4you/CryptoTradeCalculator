/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      screens: {
        'tablet': { 'min': '700px', 'max': '1025px' }, // Custom tablet breakpoint
      },


    },
  },
  purge: {
    content: ['./src/**/*.{html,ts}'],
    options: {
      safelist: [
        'fixed', 'top-5', 'right-5', 'w-full', 'max-w-sm', 
        'bg-white', 'bg-green-500', 'bg-red-500', 
        'rounded-lg', 'shadow-md', 'text-white', 'text-green-500', 'text-red-500',
        'font-semibold', 'text-sm', 'text-gray-600', 'text-xl'
      ],
    },
  },
  plugins: [],
}

