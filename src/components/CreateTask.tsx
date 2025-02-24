import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Tasks, TasksType } from "./Tasks";
import { NoTask } from "./NoTask";

export function CreateTask() {

    const [tasks, setNewTasks] = useState<TasksType[]>([])

    const [title, setNewTitle] = useState("")
    const [description, setNewDescription] = useState("")

    function handleCreateTask(event: FormEvent) {
        event.preventDefault()

        const newTask: TasksType = {
            id: tasks.length + 1,
            title: title,
            description: description,
            completed_at: null
        }

        setNewTasks([...tasks, newTask])
        setNewTitle("")
        setNewDescription("")
    }

    function handleNewTitleChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("")
        const title = document.getElementById("title") as HTMLInputElement
        const titleValue = title.value

        setNewTitle(titleValue)
    }

    function handleNewDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("")
        const description = document.getElementById("description") as HTMLInputElement
        const descriptionValue = description.value

        setNewDescription(descriptionValue)
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório!")
    }

    function deleteTask(idToDelete: number) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== idToDelete;
        })

        setNewTasks(tasksWithoutDeletedOne)
    }

    function completeTask(idTask: number) {
        tasks.forEach(task => {
            if (idTask === task.id) {
                task.completed_at = "completed"
            }
        })

        setNewTasks([...tasks])
    }

    function uncompleteTask(idTask: number) {
        tasks.forEach(task => {
            if (idTask === task.id) {
                task.completed_at = null
            }
        })

        setNewTasks([...tasks])
    }

    function countCompletedTasks() {
        let countTasksCompleted = 0
        tasks.forEach(task => {
            if (task.completed_at === "completed") {
                countTasksCompleted++
            }
        })
        return countTasksCompleted
    }

    const isTitleAndDescriptionEmpty = ((title.length === 0) || (description.length === 0))
    const countOfTasks = tasks.length
    const countOfCompletedTasks = countCompletedTasks()
    const showTasks = tasks.map(task => {
        return (
            <Tasks
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                completed_at={task.completed_at}
                onDeleteTask={deleteTask}
                onCompleteTask={completeTask}
                onUncompleteTask={uncompleteTask}
            />
        )
    })
    const showNoTasks = <NoTask />
    const showMainPanel = showTasks.length === 0 ? showNoTasks : showTasks    

    return (
        <div className="container mx-auto flex justify-center flex-col items-center">
            <form onSubmit={handleCreateTask}>
                <div className="container mx-auto w-184 -mt-7 flex justify-center">
                    <input onChange={handleNewTitleChange} onInvalid={handleNewTaskInvalid} id="title" name="title" value={title} required className="w-60 p-4 rounded-lg bg-base-gray-500 focus:outline-none border-2 border-base-gray-500 border-solid focus:border-2 focus:border-product-purple-dark focus:border-solid text-base-gray-100 placeholder-shown:text-base-gray-300 " type="text" placeholder="Adicione um título" />
                </div>
                <div className="container mx-auto mt-3 flex justify-center items-center">
                    <input onChange={handleNewDescriptionChange} onInvalid={handleNewTaskInvalid} id="description" name="description" value={description} required className="w-[39.875rem] p-4 rounded-lg bg-base-gray-500 focus:outline-none border-2 border-base-gray-500 border-solid focus:border-2 focus:border-product-purple-dark focus:border-solid text-base-gray-100 placeholder-shown:text-base-gray-300 " type="text" placeholder="Adicione uma descrição para a tarefa" />
                    <button type="submit" disabled={isTitleAndDescriptionEmpty} className="flex items-center cursor-pointer gap-2 p-4 ml-2 rounded-lg text-m font-bold text-base-gray-100 bg-product-blue-dark disabled:opacity-70 disabled:cursor-not-allowed hover:not-disabled:bg-product-blue  transition">
                        <h1 className="inline-block">Criar</h1>
                        <img className="inline-block" src="./src/assets/img/plus.svg" alt="Add Task" />
                    </button>
                </div>
            </form>
            <div className="container w-184 flex justify-between text-center mt-16 mb-6">
                <p className="text-m text-product-blue font-bold">Tarefas criadas <span className="w-6 text-m text-base-gray-200 font-bold py-0.5 px-3 bg-base-gray-400 rounded-2xl ml-2">{countOfTasks}</span></p>
                <p className="text-m text-product-purple font-bold">Concluídas <span className="w-6 text-m text-base-gray-200 font-bold py-0.5 px-3 bg-base-gray-400 rounded-2xl ml-2">{`${countOfCompletedTasks} de ${countOfTasks}`}</span></p>
            </div>
            <div className="flex flex-col gap-3">
                {showMainPanel}
            </div>
        </div>

    )
}