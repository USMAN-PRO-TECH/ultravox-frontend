export interface Template {
    id: string
    name: string
    category: string
    avatar: string
    type: 'Inbound' | 'Outbound'
  }
  
  export interface Category {
    name: string
    count: number
  }
  
  