import React from 'react'
import { flexRender } from '@tanstack/react-table';
import { TableCell } from '../ui/table';

const UID = ({cell}: {cell: any}) => {
    const firstFour =  String(cell.column.columnDef.cell)?.substring(0,4);
    const lastFour =  String(cell.column.columnDef.cell)?.substring(cell.column.columnDef.cell.length - 4) ;
    const slicedAddress = `${firstFour}...${lastFour}`
    
    return (
      <TableCell>
        {flexRender(
           slicedAddress  ,
          cell.getContext()
        )}
      </TableCell>
    );
}

export default UID
