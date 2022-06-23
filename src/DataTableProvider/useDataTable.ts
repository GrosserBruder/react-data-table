import { useContext } from 'react';
import { DataTableContext } from './DataTableProvider';


export function useDataTable() {
  return useContext(DataTableContext);
}