import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function LogOutBtn() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleLogout}>Вийти</Button>
    </div>
  );
}
