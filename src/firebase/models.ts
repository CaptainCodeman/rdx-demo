export interface TodoData {
  text: string
  created: Date
  completed: boolean
}

export interface Todo extends TodoData {
  id: string
}