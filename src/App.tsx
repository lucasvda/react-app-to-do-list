import { CreateTask } from "./components/CreateTask";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="container h-screen mx-auto max-w-screen text-center bg-base-gray-600">
      <Header />
      <CreateTask />
      {/* <Tasks /> */}
    </div>
  )
}
