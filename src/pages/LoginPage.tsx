import { Link } from "react-router-dom";
import Login from "../features/auth/Login";
import { RoutesEnum } from "../routes/RoutesEnum";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Вхід до системи TripMate</h1>
      <p className="mb-4 text-gray-600">Будь ласка, введіть свої дані для входу.</p>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <Login />
      </div>
      <p className="mt-4 text-gray-600">Or register if you do not have an account yet</p>
      <Link
        to={RoutesEnum.REGISTER}
        className="mt-2 text-blue-500 hover:underline"
      >
        Register Now
      </Link>
    </div>
  );
}
