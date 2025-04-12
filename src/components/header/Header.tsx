import LogOutBtn from "../log-out-btn/LogOut";
import Welcome from "../welcome/Welcome";

export default function Header() {
    return (
      <header className="flex justify-between items-center p-6 bg-gray-100 shadow-md rounded-lg mb-6">
        <Welcome />
        <LogOutBtn />
      </header>
    )
}