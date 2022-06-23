import React from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    text: string,
};

function AbstractButton({ handleClick, text }: ButtonProps): JSX.Element {
  return (
    <Button type="submit" onClick={handleClick} variant="contained">{text}</Button>
  );
}

export default AbstractButton;
