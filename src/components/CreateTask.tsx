import { FiPlusCircle } from "react-icons/fi";

export function CreateTask() {
    return (
        <div className="container mx-auto -mt-7">
            <input className="w-[39.875rem] p-4 rounded-lg bg-base-gray-500 stroke-1 stroke-base-gray-700 text-base-gray-300" type="text" placeholder="Adicione uma nova tarefa" />
            <a href="#" className="p-4 ml-2 rounded-lg text-m font-bold text-base-gray-100 bg-product-blue-dark">Criar</a><FiPlusCircle />
        </div>
    )
}