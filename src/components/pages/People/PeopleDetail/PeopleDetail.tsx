
import { useNavigate, useParams } from "react-router-dom"
import config from "../../../../config/app.json"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import ViewListIcon from '@mui/icons-material/ViewList'
import ListTableFragment from "../../../fragments/ListTableFragment"

const PeopleDetail = () => {
  const { id } = useParams()
  const [person,setPerson] = useState<any|null>(null)
  const [films,setFilms] = useState<any[]|null>(null)
  const [vehicles,setVehicles] = useState<any[]|null>(null)
  const [species,setSpecies] = useState<any[]|null>(null)
  const [starships,setStarships] = useState<any[]|null>(null)
  
  const apiUrl = config.baseApiUrl+'people/'+id
  const baseUrl = config.baseUrl

  const loadData = async (setState:any,name:string) => {

    // console.log(person[name])
    try {
     
      // Create an array of Axios promises
      const axiosPromises = person[name].map((url:string) => axios.get(url))
  
      // Execute all requests concurrently using Promise.all
      const responses = await Promise.all(axiosPromises)
  
      // Process responses
      const data = responses.map(response => response.data)
      
      console.log('Data from all requests:', data)
      
      setState(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error // Re-throw or handle the error as needed
    }

  }

  useEffect(()=>{
    axios.get(apiUrl)
    .then(response =>{
      setPerson(response.data)
      
    }).catch(error => {
      console.error(error)
    })

  },[films])

  const navigate = useNavigate()

  const handleClickLoad = (setState:any,name:string) => {
    loadData(setState,name)
  }

  const handleClick = () => {
    navigate('/'+baseUrl)
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
          <ListTableFragment state={films} setState={setFilms} attributes={['title','opening_crawl','director']} columns={['Title','Description','director']} handleClickLoad={handleClickLoad} title="Films" name="films"/>
          <ListTableFragment state={species} setState={setSpecies} attributes={["name","classification","designation","language"]} columns={["Name","Classification","Designation","Language"]} handleClickLoad={handleClickLoad} title="Species" name="species"/>
          <ListTableFragment state={starships} setState={setStarships} attributes={["name","model","manufacturer","starship_class"]} columns={["Name","Model","Manufacturer","Starship Class"]} handleClickLoad={handleClickLoad} title="Starships" name="starships"/>
          <ListTableFragment state={vehicles} setState={setVehicles} attributes={["name","model","manufacturer","vehicle_class"]} columns={["Name","Model","Manufacturer","Vehicle class"]} handleClickLoad={handleClickLoad} title="Vehicles" name="vehicles"/>
          </CardContent>
        </Card>
      </Container>
      <div className="fixed bg-black text-6xl bottom-0 right-0 text-white p-5 rounded-full inline-flex cursor-pointer" onClick={()=>handleClick()}><ViewListIcon/></div>
    </>
  )
}

export default PeopleDetail