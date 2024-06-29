import { Container, Paper, Table, TableContainer } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonPaginationFragment from "../../fragments/ButtonPaginationFragment";
import TableBodyPeopleFragment from "../../fragments/TableBodyPeopleFragment";
import TableHeadFragment from "../../fragments/TableHeadFragment"
import IPeople from "../../../interfaces/IPeople";

const People = () => {
  const [people, setPeople] = useState<IPeople[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [url, setUrl] = useState<string>("https://swapi.dev/api/people?page=1");
  const limit: number = 10;

  useEffect(() => {
    setIsLoading(true); // Set loading state when making request
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        var results: IPeople[] = data.results;
        setPeople(results);
        setCount(data.count);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Ensure loading state is set to false in case of error
      });
  }, [url]);

  const handleSetUrl = (urlParam: string) => {
    setUrl(urlParam);
  };

  const listTableHeaderTitle: string[] = ["Name", "Birth", "Gender", "Height", "Weight", "Detail"];

  return (
    <Container className="text-center py-10">
      <p className="text-4xl mb-10">Star Wars</p>
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
          <ButtonPaginationFragment length={Math.ceil(count / limit)} handleSetUrl={handleSetUrl} className="justify-end" />
        </>
      )}
    </Container>
  );
};

export default People;
