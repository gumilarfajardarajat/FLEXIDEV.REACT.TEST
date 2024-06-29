
import { useNavigate, useParams } from "react-router-dom"
import config from "../../../../config/app.json"
import { useEffect, useState } from "react"
import IPerson from "../../../../interfaces/IPerson"
import axios from "axios"
import { Button, Card, CardActions, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { filterList } from "../../../../helpers/JsonHelper"
import TableFragment from "../../../fragments/TableFragment"
import ViewListIcon from '@mui/icons-material/ViewList';

const PeopleDetail = () => {
  const { id } = useParams()
  const [person,setPerson] = useState<any|null>(null)
  const [films,setFilms] = useState<any[]|null>(null)
  const [vehicles,setVehicles] = useState<any[]|null>(null)
  const [species,setSpecies] = useState<any[]|null>(null)
  const [starships,setStarships] = useState<any[]|null>(null)
  
  const apiUrl = config.baseApiUrl+'people/'+id

  const loadData = (setState:any,name:string) => {
    axios.get(config.baseApiUrl+name).then(response =>{
      let criterias : any[] = person[name];
      let jsonData : any[] = response.data.results;
      let criteriaType : string = name == 'film'? 'title' : 'name'
      let filteredList : any = filterList(jsonData,criterias,'url')
      setState(filteredList)
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(()=>{
    axios.get(apiUrl)
    .then(response =>{
      setPerson(response.data)
    }).catch(error => {
      console.error(error)
    })

    loadData(setFilms,'films')
    loadData(setVehicles,'vehicles')
    loadData(setSpecies,'species')
    loadData(setStarships,'starships')

  },[person,films])

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }


  
  return(
    <>
      <Container>
        <Card variant="outlined" className="relative">
          <CardContent>
            <div className="bg-slate-600 text-white py-5">
              <Typography variant="h5" align="center">{person?.name}</Typography>
            </div>
            <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Born</Typography></TableCell>
                  <TableCell>{person?.birth_year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Gender</Typography></TableCell>
                  <TableCell>{person?.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Height</Typography></TableCell>
                  <TableCell>{person?.height}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Weight</Typography></TableCell>
                  <TableCell>{person?.mass}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Hair Color</Typography></TableCell>
                  <TableCell>{person?.hair_color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Skin Color</Typography></TableCell>
                  <TableCell>{person?.skin_color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold"><Typography fontWeight="bold">Eye Color</Typography></TableCell>
                  <TableCell>{person?. eye_color}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="bg-slate-600 text-white py-5">
            <Typography variant="h5" align="center">Films</Typography>
          </div>
          <TableFragment data={films} attributes={['title','opening_crawl','director']} columns={['Title','Description','director']}/>
          <div className="bg-slate-600 text-white py-5">
            <Typography variant="h5" align="center">Species</Typography>
          </div>
          <TableFragment data={species} attributes={[["name","classification","designation","language"]]} columns={["Name","Classification","Designation","Language"]}/>
          <div className="bg-slate-600 text-white py-5">
            <Typography variant="h5" align="center">Starships</Typography>
          </div>
          <TableFragment data={starships} attributes={["name","model","manufacturer","starship_class"]} columns={["Name","Model","Manufacturer","Starship Class"]}/>
          <div className="bg-slate-600 text-white py-5">
            <Typography variant="h5" align="center">Vehicles</Typography>
          </div>
          <TableFragment data={vehicles} attributes={["name","model","manufacturer","vehicle_class"]} columns={["Name","Model","Manufacturer","Vehicle class"]}/>
          </CardContent>
        </Card>
      </Container>
      <div className="fixed bg-black text-6xl bottom-0 right-0 text-white p-5 rounded-full inline-flex cursor-pointer" onClick={()=>handleClick()}><ViewListIcon/></div>
    </>
  )
}

export default PeopleDetail