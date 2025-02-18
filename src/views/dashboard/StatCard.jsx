import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

export default function StatCard({ title, value, percentageChange, chartData }) {
    const options = {
        chart: {
            type: chartData.type,
            toolbar: { show: false },
            sparkline: { enabled: true },
            background: 'transparent',
            dropShadow: {
                enabled: true,
                top: 2,
                left: 2,
                blur: 4,
                opacity: 0.2
            }
        },
        grid: { show: false },
        colors: [chartData.color],
        stroke: {
            curve: 'smooth',
            width: chartData.type === 'line' ? 2 : 0
        },
        tooltip: { enabled: false },
        theme: { mode: 'dark' }
    };

    const series = [{ data: chartData.series }];

    return (
        <Card sx={{ bgcolor: '#212121', height: '100%' }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h4" color="text.primary">
                        {value}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: percentageChange > 0 ? 'success.dark' : 'error.dark',
                            color: 'white'
                        }}
                    >
                        {percentageChange > 0 ? '+' : ''}
                        {percentageChange}%
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ height: 100, backgroundColor: 'transparent', paddingBottom: '5px' }}>
                <ReactApexChart options={options} series={series} type={chartData.type} height="100%" />
            </Box>
        </Card>
    );
}

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percentageChange: PropTypes.number.isRequired,
    chartData: PropTypes.shape({
        type: PropTypes.oneOf(['line', 'bar', 'area']).isRequired,
        color: PropTypes.string.isRequired,
        series: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
};
