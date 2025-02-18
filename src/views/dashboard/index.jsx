// import { useEffect, useState } from 'react';

// // material-ui
// import { Grid } from '@mui/material';

// // project imports
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';

// import TotalGrowthBarChart from './TotalGrowthBarChart';

// import { gridSpacing } from 'store/constant';
// import StudentCountCard from './StudentCountCard';
// import StaffsCountCard from './StaffsCountCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCourses } from 'container/branchContainer/slice';
// import { getDashBoardCounts } from 'container/dashBoardContainer/slice';
// import DashBoardNotifications from './DashBoardNotifications';

// // assets

// // ==============================|| DEFAULT DASHBOARD ||============================== //

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const [isLoading, setLoading] = useState(true);
//   const courses = useSelector((state) => state.course?.courseList);
//   const dashBoardCounts = useSelector((state) => state.dashBoard?.counts);
//   console.log('%c [ courses ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', courses);

//   useEffect(() => {
//     setLoading(false);

//     dispatch(getCourses());
//     dispatch(getDashBoardCounts());
//     // }
//   }, []);

//   return (
//     <Grid container flexDirection={'row'} spacing={gridSpacing}>
//       <Grid item md={8} sm={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={6} md={6} sm={12} xs={11}>
//             <StudentCountCard count={dashBoardCounts?.students} isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={6} md={6} sm={12} xs={11}>
//             <StaffsCountCard count={dashBoardCounts?.staffs} isLoading={isLoading} />
//           </Grid>
//           <Grid item md={6} sm={6} xs={11}>
//             <TotalGrowthBarChart  isLoading={isLoading} />
//           </Grid>
//           <Grid item md={6} sm={6} xs={11}>
//             <DashBoardNotifications  isLoading={isLoading} />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item md={4} sm={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={12} md={12} sm={12} xs={12}>
//             <PopularCard isLoading={isLoading} />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default Dashboard;

import { Grid } from '@mui/material';
import Banner from './Banner';
import StatCard from './StatCard';

const mockData = {
    users: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    orders: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    sales: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    marketing: Array(20)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
};

export default function Dashboard() {
    return (
        <div>
            <Banner />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Users"
                        value="78,250"
                        percentageChange={70.5}
                        chartData={{
                            type: 'bar',
                            series: mockData.users,
                            color: '#28a745'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Order"
                        value="18,800"
                        percentageChange={-27.4}
                        chartData={{
                            type: 'line',
                            series: mockData.orders,
                            color: '#dc3545'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Sales"
                        value="$35,078"
                        percentageChange={27.4}
                        chartData={{
                            type: 'bar',
                            series: mockData.sales,
                            color: '#ffc107'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Marketing"
                        value="$1,12,083"
                        percentageChange={70.5}
                        chartData={{
                            type: 'line',
                            series: mockData.marketing,
                            color: '#28a745'
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
