import { lazy } from 'react';

// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import NewStaffs from 'views/staffs/NewStaffs';
import StaffsTable from 'views/staffs/StaffsTable';
import NewAdmission from 'views/students/NewAdmission';
import StudentAttendance from 'views/students/StudentAttendance';
// import StudentsDocs from 'views/students/StudentsDocs';
import StudentTable from 'views/students/StudentTable';
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
            path: 'students',
            children: [
                {
                    path: 'view',
                    element: <StudentTable />
                },
                {
                    path: 'new-admission',
                    element: <NewAdmission />
                },
                // {
                //   path: 'students-docs',
                //   element: <StudentsDocs />
                // },
                {
                    path: 'attendances',
                    element: <StudentAttendance />
                }
            ]
        },

        {
            path: 'staffs',
            children: [
                {
                    path: 'view',
                    element: <StaffsTable />
                },
                {
                    path: 'add',
                    element: <NewStaffs />
                }
            ]
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
