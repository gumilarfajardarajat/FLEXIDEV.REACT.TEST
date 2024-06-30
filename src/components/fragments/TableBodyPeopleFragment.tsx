import { Button, TableBody, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"



const TableBodyPeopleFragment = (props: { list: any[]|null }) => {  
  const navigate = useNavigate()

  const handleClick = (url:string) => {
    var id = url.split('/').filter(Boolean).pop()!
    navigate(id)
  }
  
  const tableBodyContent = props.list == null ? [] : props.list.map((item,index) =>(
    <TableRow key={index} className="cursor-pointer">
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">{item.films.length}</TableCell>
      <TableCell align="center">{item.species.length}</TableCell>
      <TableCell align="center">{item.starships.length}</TableCell>
      <TableCell align="center">{item.vehicles.length}</TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={()=>{handleClick(item.url)}}>Detail</Button>
      </TableCell>
    </TableRow>
  ))

  return (
    <TableBody>
      {tableBodyContent}
    </TableBody>

  )
}
export default TableBodyPeopleFragment
