'use client'
import Tasks from "../components/tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

function Incomplete() {
    const { incompleteTasks } = useGlobalState();
    return <Tasks title="Incomplete Tasks" tasks={incompleteTasks}/> ;
}

export default Incomplete;