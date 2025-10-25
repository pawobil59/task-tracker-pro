import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { CreateTaskData, Task } from '@/types'

// GET /api/tasks - Fetch all tasks for a user
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    
    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Fetch tasks for the user
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching tasks:', error)
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
    }
    
    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error in GET /api/tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    
    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Parse request body
    const body: CreateTaskData = await request.json()
    const { title, description, category, priority } = body
    
    // Validate required fields
    if (!title || !category || !priority) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, category, priority' 
      }, { status: 400 })
    }
    
    // Check user's subscription status and task limit
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', user.id)
      .single()
    
    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
    }
    
    // Check task limit for free users
    if (userData.subscription_status === 'free') {
      const { count, error: countError } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      
      if (countError) {
        console.error('Error counting tasks:', countError)
        return NextResponse.json({ error: 'Failed to count tasks' }, { status: 500 })
      }
      
      if (count && count >= 5) {
        return NextResponse.json({ 
          error: 'Task limit reached. Upgrade to Premium for unlimited tasks.' 
        }, { status: 403 })
      }
    }
    
    // Create the task
    const { data: task, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title,
        description,
        category,
        priority,
        completed: false
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating task:', error)
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }
    
    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
