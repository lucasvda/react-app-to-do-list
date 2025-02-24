import { CreateTask } from "./components/CreateTask";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="container mx-auto max-w-screen text-center bg-base-gray-600">
      <header>
        <Header />
      </header>
      <main>
        <CreateTask />    
      </main>
    </div>
  )
}
