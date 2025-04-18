import { lazy } from 'react';

// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import StudentsDocs from 'views/students/StudentsDocs';
import DashboardDefault from 'views/dashboard';

// import NewBranch from 'views/branches/NewBranch';
import BranchesTable from 'views/branches/index.jsx';

// const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const SamplePage = Loadable(lazy(() => import('views/pages/SamplePage')));

const MenuRoutes = {
    path: '/',
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },

        {
            path: 'branches',
            children: [
                {
                    path: 'view',
                    element: <BranchesTable />
                }
                // {
                //     path: 'add',
                //     element: <NewBranch />
                // }
            ]
        },
        {
            path: 'reports/fee-payments',
            element: <SamplePage name={'fee-payments'} />
        }
    ]
};

export default MenuRoutes;
