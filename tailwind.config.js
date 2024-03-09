/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      // colors: {
      //   border: 'hsl(var(--border))',
      //   input: 'hsl(var(--input))',
      //   ring: 'hsl(var(--ring))',
      //   background: 'hsl(var(--background))',
      //   foreground: 'hsl(var(--foreground))',
      //   primary: {
      //     DEFAULT: 'hsl(var(--primary))',
      //     foreground: 'hsl(var(--primary-foreground))'
      //   },
      //   secondary: {
      //     DEFAULT: 'hsl(var(--secondary))',
      //     foreground: 'hsl(var(--secondary-foreground))'
      //   },
      //   destructive: {
      //     DEFAULT: 'hsl(var(--destructive))',
      //     foreground: 'hsl(var(--destructive-foreground))'
      //   },
      //   muted: {
      //     DEFAULT: 'hsl(var(--muted))',
      //     foreground: 'hsl(var(--muted-foreground))'
      //   },
      //   accent: {
      //     DEFAULT: 'hsl(var(--accent))',
      //     foreground: 'hsl(var(--accent-foreground))'
      //   },
      //   popover: {
      //     DEFAULT: 'hsl(var(--popover))',
      //     foreground: 'hsl(var(--popover-foreground))'
      //   },
      //   card: {
      //     DEFAULT: 'hsl(var(--card))',
      //     foreground: 'hsl(var(--card-foreground))'
      //   }
      // },
      colors: {
        border: 'hsl(20, 5.9%, 90%)',
        input: 'hsl(20, 5.9%, 90%)',
        ring: 'hsl(24.6, 95%, 53.1%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(20, 14.3%, 4.1%)',
        primary: {
          DEFAULT: 'hsl(2, 87.3%, 69%)',
          foreground: 'hsl(60, 9.1%, 97.8%)'
        },
        secondary: {
          DEFAULT: 'hsl(197, 94.1%, 19.8%)',
          foreground: 'hsl(24, 9.8%, 10%)'
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(60, 9.1%, 97.8%)'
        },
        muted: {
          DEFAULT: 'hsl(60, 4.8%, 95.9%)',
          foreground: 'hsl(25, 5.3%, 44.7%)'
        },
        accent: {
          DEFAULT: 'hsl(60, 4.8%, 95.9%)',
          foreground: 'hsl(24, 9.8%, 10%)'
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(20, 14.3%, 4.1%)'
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(20, 14.3%, 4.1%)'
        },
        link: {
          DEFAULT: '#008cb9'
        }
      },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)'
      // },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        google:
          '0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2)',
        'google-sm':
          '0px 2px 2px 1px rgba(0, 0, 0, 0.14), 0px 2px 2px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
