export type Recipe = {
  id: number;
  title: string;
  content: string;
  ingredients: Ingredient[];
  coverimg: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  authorId?: number;
  author?: Author;
  category: Category;
};

export type Ingredient = {
  amount: string;
  emoji: string;
  ingredient: string;
  unit: string;
};

export type Author = {
  name: string;
};

export type Category = {
  name: string;
};

export type RootStackParamList = {
  Default: undefined,
  Home: { name: string };
  Recipe: {
    title: string;
    coverimg: string;
    ingredients: Ingredient[];
    category?: Category;
    content: string;
  };
};