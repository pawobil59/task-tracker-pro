export interface User {
  id: string;
  email: string;
  subscription_status: 'free' | 'premium';
  subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: 'work' | 'personal' | 'shopping' | 'other';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  category: 'work' | 'personal' | 'shopping' | 'other';
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  category?: 'work' | 'personal' | 'shopping' | 'other';
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  max_tasks: number | null; // null means unlimited
}
