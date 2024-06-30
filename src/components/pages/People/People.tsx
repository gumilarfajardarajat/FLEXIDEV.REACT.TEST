import { Button, ButtonGroup, Card, CardContent, Container, Paper, Table, TableContainer, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import ButtonPaginationFragment from "../../fragments/ButtonPaginationFragment"
import TableBodyPeopleFragment from "../../fragments/TableBodyPeopleFragment"
import TableHeadFragment from "../../fragments/TableHeadFragment"
import config from "../../../config/app.json"
import imgStartWars from "../../../../public/starwars.png"
import { Search } from "@mui/icons-material"

const People = () => {
  const apiUrl = config.baseApiUrl + 'people/'
  const [people, setPeople] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [count, setCount] = useState<number>(0)
  const [url, setUrl] = useState<string>(apiUrl + "?page=1")
  const limit: number = 10
  const [search, setSearch] = useState<string>('') // Ensure setSearch uses string type

  useEffect(() => {
    setIsLoading(true) // Set loading state when making request
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        var results: any[] = data.results
        setPeople(results)
        setCount(data.count)
        setIsLoading(false) // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false) // Ensure loading state is set to false in case of error
      })
  }, [url])

  const handleSetUrl = (urlParam: string) => {
    setUrl(urlParam)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };

  const handleSearch = () => {
    setUrl(apiUrl + "?search=" + search)
  };

  const listTableHeaderTitle: string[] = ["Name", "Films", "Species", "Starships", "Vehicle", "Detail"]

  return (
    <Container className="text-center py-10">
      <Card>
        <CardContent>
          <div className="flex justify-between mb-5">
            <img src={imgStartWars} alt="Star Wars Logo" className="w-48" />
            <div>
              <ButtonGroup>
                <TextField label="Search..." onChange={handleInputChange} />
                <Button onClick={handleSearch}><Search /></Button>
              </ButtonGroup>
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p> // Display loading message while fetching data
          ) : (
            <>
              <TableContainer className="mb-5" component={Paper}>
                <Table>
                  <TableHeadFragment columns={listTableHeaderTitle} />
                  <TableBodyPeopleFragment list={people} />
                </Table>
              </TableContainer>
              <div className="flex justify-between">
                <h1>Showing 1 to {Math.ceil(count / limit)} of {count} entries</h1>
                <ButtonPaginationFragment length={Math.ceil(count / limit)} handleSetUrl={handleSetUrl} className="justify-end" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default People;
