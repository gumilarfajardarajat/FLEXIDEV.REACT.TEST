import { Table, TableContainer } from "@mui/material"
import TableBodyFragment from "./TableBodyFragment"
import TableHeadFragment from "./TableHeadFragment"

interface ITableFragmentProps {
  data: any[] | null
  attributes: any[] | null
  columns?: any[]
}

const TableFragment = ({ data, attributes, columns }: ITableFragmentProps) => {
  let tableBodyFragmentEl = null

  if (data === null) {
    tableBodyFragmentEl = <h1>...Loading</h1> // Handle case where data is null
  } else if (data.length === 0) {
    // Ensure 'columns' is defined before mapping
    const columnHeaders = columns ? columns.map(() => '-') : []
    tableBodyFragmentEl = <TableHeadFragment columns={columnHeaders} />
  } else {
    tableBodyFragmentEl = <TableBodyFragment data={data} attributes={attributes} />
  }

  return (
    <TableContainer>
      <Table>
        <TableHeadFragment columns={columns || []} />
        {/* Ensure there's no whitespace or comments that could produce text nodes */}
        {tableBodyFragmentEl}
      </Table>
    </TableContainer>
  )
}

export default TableFragment
