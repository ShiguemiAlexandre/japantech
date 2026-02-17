
export interface Service {
  id: string;
  title: string;
  description: string;
  dark?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  url?: string;
}

export interface Differentiator {
  title: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
