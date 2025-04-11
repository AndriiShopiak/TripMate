import { useParams } from "react-router-dom";

export default function TripPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Подорож #{id}</h1>
      <p>Тут буде карта, список місць, нотатки тощо 🔥</p>
    </div>
  );
}
