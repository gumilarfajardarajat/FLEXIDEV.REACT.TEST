import { Typography } from "@mui/material"
import TableFragment from "./TableFragment"
import { KeyboardArrowDown } from "@mui/icons-material"

const ListTableFragment = (props:{state:any,setState:any,attributes:any,columns:any,handleClickLoad:any,title:any,name:any}) => {
    const {state,setState,attributes,columns,handleClickLoad,title,name} = props
    return(
        <>
        <div className="bg-slate-600 text-white py-5 cursor-pointer" onClick={()=>handleClickLoad(setState,name)}>
        <Typography variant="h5" align="center">{title} <KeyboardArrowDown/></Typography>
      </div>
      {
        state&&
        <TableFragment data={state} attributes={attributes} columns={columns}/>
      }
      </>
    )
}

export default ListTableFragment