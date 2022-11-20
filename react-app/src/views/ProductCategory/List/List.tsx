import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { useEffect, useState } from 'react';
import { productCategoryService } from '../../../services/productCategory.service';

export const List = () => {
  const [items, setItems] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  
  useEffect(() => {
    const waiter = async () => {
      const res  = await productCategoryService.searchProductCategories('', pageIndex, 20);

      console.log('res', res);
    };

    waiter();
  },[items]);

  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{}}
        className={'tree-view-custom'}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="8" label="index.js" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </>
  );
}