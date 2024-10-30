# Foot Flair - Next.js 14 E-Commerce Application

Foot Flair is a modern, full-featured e-commerce application for selling shoes. Built with Next.js 14 and a powerful tech stack, it offers a seamless shopping experience for customers and a robust dashboard for administrators.

**Live Site:** [https://foot-flair.vercel.app](https://foot-flair.vercel.app)

**GitHub Repository:** [https://github.com/Alifouanne/foot-flair](https://github.com/Alifouanne/foot-flair)

## Features

- **User Authentication**: Secure login and registration using Kinde
- **Product Catalog**: Browse and search for a wide variety of shoes
- **Shopping Cart**: Add and manage items in your cart, persisted with Redis
- **Checkout Process**: Secure payments handled by Stripe
- **User Profiles**: Manage personal information and order history
- **Admin Dashboard**: Manage products, orders, and site content
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Image Upload**: Easy product image management with UploadThing
- **Type-safe Forms**: Form handling and validation using Conform

## Tech Stack

- **Frontend**: Next.js 14.2, React
- **Backend**: Next.js API Routes
- **Database**: Neon (Postgres), Prisma ORM
- **Authentication**: Kinde
- **Payment Processing**: Stripe
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Validation**: Conform
- **Image Storage**: UploadThing
- **Cart Storage**: Redis (Upstash)
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn or bun
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Alifouanne/foot-flair.git
   cd foot-flair
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   DATABASE_URL=your_neon_database_url
   KINDE_CLIENT_ID=your_kinde_client_id
   KINDE_CLIENT_SECRET=your_kinde_client_secret
   KINDE_ISSUER_URL=your_kinde_issuer_url
   KINDE_SITE_URL
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   REDIS_URL=your_upstash_redis_url
   REDIS_TOKEN
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app`: Next.js 14 app directory containing pages and API routes
- `/components`: Reusable React components
- `/lib`: Utility functions and shared logic
- `/prisma`: Prisma schema and migrations
- `/public`: Static assets
- `/styles`: Global styles and Tailwind CSS configuration

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Kinde](https://kinde.com/)
- [Stripe](https://stripe.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [UploadThing](https://uploadthing.com/)
- [Upstash](https://upstash.com/)
- [Neon](https://neon.tech/)

## Contact

For any inquiries or support, please contact [alifouanne8@gmail.com)](mailto:alifouanne8@gmail.com).

```

This README provides a comprehensive overview of your Foot Flair e-commerce project, including its features, tech stack, setup instructions, and project structure. It also includes sections for contributing, licensing, acknowledgments, and contact information.




```
