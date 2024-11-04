import {Text} from "@chakra-ui/react";
import React from "react";

interface BrainTasksProps {
    task: string,
    answer: string,
    num: number
}

const BrainTasks:React.FC<BrainTasksProps> = ({task, answer, num}) => {

    return (
        <div>
            <Text fontWeight="bold">Задача на сообразительность {num}</Text>
            <Text>{task}</Text>
            <Text>{answer}</Text>
        </div>
    )
}
export default BrainTasks;