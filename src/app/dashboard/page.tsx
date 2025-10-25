'use client'

import { useState, useEffect } from 'react'
import { Task, CreateTaskData } from '@/types'
import { taskApi } from '@/lib/api'

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState<CreateTaskData>({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium'
  })

  // Mock authentication for now
  useEffect(() => {
    // Set a mock token for testing
    localStorage.setItem('supabase.auth.token', 'mock_token')
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      // For now, we'll show mock data since we don't have real auth
      const mockTasks: Task[] = [
        {
          id: '1',
          user_id: 'mock_user',
          title: 'Learn Next.js',
          description: 'Build a fullstack application',
          completed: false,
          category: 'work',
          priority: 'high',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          user_id: 'mock_user',
          title: 'Set up Supabase',
          description: 'Configure database and authentication',
          completed: true,
          category: 'work',
          priority: 'medium',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
      setTasks(mockTasks)
    } catch (err) {
      setError('Failed to load tasks')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // For now, just add to local state
      const task: Task = {
        id: Date.now().toString(),
        user_id: 'mock_user',
        ...newTask,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      setTasks([task, ...tasks])
      setNewTask({
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium'
      })
      setShowAddForm(false)
    } catch (err) {
      setError('Failed to create task')
      console.error('Error creating task:', err)
    }
  }

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed } : task
      ))
    } catch (err) {
      setError('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      setError('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Task
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-lg shadow p-6 ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => handleToggleTask(task.id, e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <h3 className={`text-lg font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.category === 'work' ? 'bg-blue-100 text-blue-800' :
                          task.category === 'personal' ? 'bg-green-100 text-green-800' :
                          task.category === 'shopping' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
