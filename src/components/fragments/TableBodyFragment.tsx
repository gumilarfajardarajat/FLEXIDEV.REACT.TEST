import { TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

interface TableBodyFragmentProps {
  data: any[] | null;
  attributes: string[] | null; // Assuming attributes are keys of 'data' objects
}

const TableBodyFragment = (props: TableBodyFragmentProps) => {
  const { data, attributes } = props;

  // Guard clause: handle cases where 'data' or 'attributes' are null or empty
  if (!data || data.length === 0 || !attributes || attributes.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={attributes?.length || 1} align="center">
            ...Loading
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((item, index) => (
        <TableRow key={index}>
          {attributes.map((attribute, indexChild) => (
            <TableCell key={indexChild} align="center">{item[attribute]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyFragment;
