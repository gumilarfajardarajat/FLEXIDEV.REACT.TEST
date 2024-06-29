import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

const TableHeadFragment = (props: { columns: any[] }) => {
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((item, index) => (
            <TableCell key={index} align="center">
              <Typography fontWeight="bold">{item}</Typography>
            </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default TableHeadFragment;
