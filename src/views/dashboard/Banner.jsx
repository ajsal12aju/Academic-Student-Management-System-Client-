import { Grid, Button, Typography } from '@mui/material';
import BannerImage from 'assets/images/8202589-removebg-preview.png';
export default function Banner() {
    return (
        <Grid
            sx={{
                p: 3,
                mb: 3,
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                background: `linear-gradient(
              250.38deg,
              rgb(26, 35, 31) 2.39%,
              rgb(19, 80, 47) 32.42%,
              rgb(10, 125, 62) 60.95%,
              rgb(31, 143, 78) 84.83%,
              rgb(92, 176, 122) 104.37%
            )`
            }}
            xs={12}
            container
        >
            <Grid item xs={8}>
                <Typography variant="h1" color="black" gutterBottom>
                    Welcome to BroGoByte
                </Typography>
                <Typography variant="h5" color="black" sx={{ opacity: 0.8, mb: 2 }}>
                    The purpose of a product update is to add new features, fix bugs or improve the performance of the product.
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    Book Demo
                </Button>
            </Grid>
            <Grid item xs={4} component="img" src={BannerImage} alt="Banner illustration" sx={{ height:230}} />
        </Grid>
    );
}
