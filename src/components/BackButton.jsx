import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigatet = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigatet(-1); // Go back to the previous page
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
