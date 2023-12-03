import { Category, Leaderboard, ListAlt, LocalBar, LunchDining, People, Place, Restaurant } from '@mui/icons-material';

const routes: Record<
  string,
  {
    title: string;
    Icon: any;
    path: string;
    children?: Array<{
      title: string;
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
  dishes: {
    title: 'menu',
    Icon: Restaurant,
    path: 'menu',
    children: [
      {
        title: 'categories',
        Icon: Category,
        path: 'categories',
      },
      {
        title: 'dishes',
        Icon: ListAlt,
        path: 'dishes',
      },
      {
        title: 'drinks',
        Icon: LocalBar,
        path: 'drinks',
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
