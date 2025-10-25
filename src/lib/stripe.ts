import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
}

export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month' as const,
    features: ['Up to 5 tasks', 'Basic categories'],
    max_tasks: 5,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 500, // $5.00 in cents
    interval: 'month' as const,
    features: ['Unlimited tasks', 'All categories', 'Priority support'],
    max_tasks: null, // unlimited
  },
}
