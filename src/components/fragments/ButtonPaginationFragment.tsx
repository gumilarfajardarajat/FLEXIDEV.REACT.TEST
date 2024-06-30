import { Button, ButtonGroup } from '@mui/joy'; // Assuming correct import path for MUI buttons

interface ButtonPaginationFragmentProps {
  length: number;
  className?: string;
  handleSetUrl: (url: string) => void; // Assuming handleSetUrl accepts a string parameter
}

const ButtonPaginationFragment = ({
  length,
  className,
  handleSetUrl,
}: ButtonPaginationFragmentProps) => {
  const handleClick = (page: number) => {
    const baseUrl = 'https://swapi.dev/api/people';
    handleSetUrl(`${baseUrl}?page=${page}`);
  };

  const buttonList: JSX.Element[] = [];

  for (let index = 0; index < length; index++) {
    const modifiedIndex = index + 1;
    buttonList.push(
      <Button key={modifiedIndex} onClick={() => handleClick(modifiedIndex)}>
        {modifiedIndex}
      </Button>
    );
  }

  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group" className={className}>
      {buttonList}
    </ButtonGroup>
  );
};

export default ButtonPaginationFragment;
