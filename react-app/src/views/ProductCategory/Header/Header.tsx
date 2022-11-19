import Grid from '@mui/material/Grid';
import { PageTitle } from '../../../components/PageTitle/PageTitle';
import { SearchBox } from '../../../components/SearchBox/SearchBox';

export const Header = () => {

  const onSearch = (value: string) => {
    console.log('onSearch', value);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <PageTitle text={'Product Category'} />
        </Grid>
        <Grid item xs={4}>
          <SearchBox 
            onSearch={onSearch}
          />
        </Grid>
      </Grid>
    </>
  );
}