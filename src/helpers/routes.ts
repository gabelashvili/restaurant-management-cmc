import { Category, Leaderboard, ListAlt, People, Place, Restaurant } from '@mui/icons-material';

type TitleEnum = 'statistics' | 'products' | 'products_categories' | 'products_list' | 'branches' | 'employees';

const routes: Record<
  string,
  {
    title: TitleEnum;
    Icon: any;
    path: string;
    children?: Array<{
      title: TitleEnum;
      Icon: any;
      path: string;
    }>;
  }
> = {
  statistics: {
    title: 'statistics',
    Icon: Leaderboard,
    path: '',
  },
  products: {
    title: 'products',
    Icon: Restaurant,
    path: 'products',
    children: [
      {
        title: 'products_categories',
        Icon: Category,
        path: 'categories',
      },
      {
        title: 'products_list',
        Icon: ListAlt,
        path: 'list',
      },
    ],
  },
  branches: {
    title: 'branches',
    Icon: Place,
    path: 'branches',
  },
  employees: {
    title: 'employees',
    Icon: People,
    path: 'employees',
  },
};

export default routes;
