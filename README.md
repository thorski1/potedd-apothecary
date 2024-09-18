# Pot.EdD Apothecary

Pot.EdD Apothecary is an e-commerce platform for a local nursery specializing in native, perennial fruits and plants. This Next.js application provides a seamless shopping experience for customers interested in sustainable, locally-grown plants.

## Features

- Responsive design for desktop and mobile devices
- Product catalog with categories
- Shopping cart functionality with local storage persistence
- Checkout process with Stripe integration
- Newsletter subscription
- Contact form
- Inventory management with stock quantity checks
- Product reservation system during checkout

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- Shadcn UI for UI components
- Supabase for database and authentication
- Stripe for payment processing
- Vercel for deployment and serverless functions

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/potedd-apothecary.git
   cd potedd-apothecary
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Creative Commons Zero v1.0 Universal License.
