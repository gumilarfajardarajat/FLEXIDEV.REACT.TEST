import { Button, ButtonGroup } from "@mui/joy"


const ButtonPaginationFragment = (props:{ length: number, className?: string, handleSetUrl: any}) => {

	const handleClick = (page:number) => {
		let baseUrl: string = 'https://swapi.dev/api/people';
		props.handleSetUrl(`${baseUrl}?page=${page}`);
	}

	const buttonList:any[] = []

	for (let index = 0; index < props.length; index++) {
		let modifiedIndex = index+1 
		buttonList.push(
			<Button key={modifiedIndex} onClick={()=>handleClick(modifiedIndex)}>{modifiedIndex}</Button>
		)
	}

	return (
		<ButtonGroup variant="outlined" aria-label="Basic button group" className={props.className}>
				{buttonList}
		</ButtonGroup>
	);
}

export default ButtonPaginationFragment;