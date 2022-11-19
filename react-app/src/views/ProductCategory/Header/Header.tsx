import Grid from '@mui/material/Grid';
import { PageTitle } from '../../../components/PageTitle/PageTitle';

export const Header = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <PageTitle text={'Product Category'} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
}