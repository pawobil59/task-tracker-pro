import { Task, CreateTaskData, UpdateTaskData } from '@/types'

const API_BASE_URL = '/api'

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('supabase.auth.token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

// Task API functions
export const taskApi = {
  // Get all tasks
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch tasks')
    }
    
    const data = await response.json()
    return data.tasks
  },

  // Get a specific task
  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch task')
    }
    
    const data = await response.json()
    return data.task
  },

  // Create a new task
  async createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create task')
    }
    
    const data = await response.json()
    return data.task
  },

  // Update a task
  async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update task')
    }
    
    const data = await response.json()
    return data.task
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete task')
    }
  },

  // Toggle task completion
  async toggleTask(id: string, completed: boolean): Promise<Task> {
    return this.updateTask(id, { completed })
  }
}
