import {Button} from "./components/ui/button.tsx";
import {VStack, Text, HStack, Box} from "@chakra-ui/react";
import {ColorModeButton} from "./components/ui/color-mode.tsx";
import TaskFirst from "./components/TaskFirst.tsx";
import {useState} from "react";
import TaskSecond from "./components/TaskSecond.tsx";
import TaskThird from "./components/TaskThird.tsx";
import TaskFourth from "./components/TaskFourth.tsx";
import BrainTasks from "./features/BrainTasks.tsx";
import {BRAINTASK} from "./utils/text-constant.ts";


function App() {
    const [taskNumber, setTaskNumber] = useState(1)

    const buttonCoddingTaskList = [
        "Задача на кодинг 1",
        "Задача на кодинг 2",
        "Задача на кодинг 3",
        "Задача на кодинг 4",
    ]
    const buttonBrainTaskList = [
        "Задача на сообразительность 1",
        "Задача на сообразительность 2",
        "Задача на сообразительность 3",
        "Задача на сообразительность 4"
    ]

    const nodeList = [
        <TaskFirst/>,
        <TaskSecond/>,
        <TaskThird/>,
        <TaskFourth/>,
        <BrainTasks task={BRAINTASK[0]} answer={BRAINTASK[1]} num={1}/>,
        <BrainTasks task={BRAINTASK[2]} answer={BRAINTASK[3]} num={2}/>,
        <BrainTasks task={BRAINTASK[4]} answer={BRAINTASK[5]} num={3}/>,
        <BrainTasks task={BRAINTASK[6]} answer={BRAINTASK[7]} num={4}>
    ]

    return (
        <div>

            <VStack>
                <HStack>
                    <Text fontSize="4xl">Тестовое задание Hotels</Text>
                    <ColorModeButton/>
                </HStack>
                <HStack>
                    <VStack>
                        {buttonCoddingTaskList.map((item, index) => (
                            <Button key={index} onClick={() => setTaskNumber(index + 1)}>
                                {item}
                            </Button>
                        ))}
                    </VStack>
                    <VStack>
                        {buttonBrainTaskList.map((item, index) => (
                            <Button key={index} onClick={() => setTaskNumber(index + 5)}>
                                {item}
                            </Button>
                        ))}
                    </VStack>

                </HStack>


                <Box bg="bg" shadow="md" borderRadius="md" m={4} p={[4]}>
                    {nodeList[taskNumber - 1]}
                </Box>


            </VStack>
        </div>
    )
}

export default App
