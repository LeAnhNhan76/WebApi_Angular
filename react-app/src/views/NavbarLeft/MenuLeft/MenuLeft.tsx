import {
  Apps as AppsIcon, Article as ArticleIcon, Category as CategoryIcon, Home as HomeIcon
} from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';

import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

const MenuLeft = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: '100%', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Home" icon={<HomeIcon/>} onClick={() => {navigate('/')}} />
        <TreeItem nodeId="3" label="Products">
          <TreeItem nodeId="3-2" label="Categories" icon={<CategoryIcon/>} onClick={() => {navigate('/productcategories')}}/>
          <TreeItem nodeId="3-3" label="Products" icon={<ArticleIcon/>} onClick={() => {navigate('/products')}} />
        </TreeItem>
        <TreeItem nodeId="4" label="Documents">
          <TreeItem nodeId="4-2" label="OSS" />
          <TreeItem nodeId="4-3" label="MUI">
            <TreeItem nodeId="4-4" label="index.js" />
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="2" label="Systems" icon={<AppsIcon/>}>
          <TreeItem nodeId="2-2" label="Calendar" />
          <TreeItem nodeId="2-3" label="Errors" />
        </TreeItem>
      </TreeView>
    </Container>
  );
}

export default MenuLeft;