import {
  Button,
  Divider
} from '@mui/material';
import { RightFloat } from '../../../assets/styles/layouts';
import { Toolbar } from '../../../components/BodyList/styles';
import { List } from '../List/List';

export const Content = () => {
  return (
    <>
      <Toolbar>
        <RightFloat>
          <Button variant='contained'>Add new</Button>
        </RightFloat>
      </Toolbar>
      <Divider />
      <List />
    </>
  )
}