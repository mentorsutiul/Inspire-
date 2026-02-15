
export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
};

export type View = 'home' | 'category' | 'favorites' | 'settings' | 'terms' | 'privacy' | 'about';

export interface AppState {
  currentView: View;
  selectedCategory: Category | null;
  favorites: string[];
  darkMode: boolean;
}
