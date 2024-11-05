import {Button} from "./components/ui/button.tsx";
import {VStack, Text, HStack, Box} from "@chakra-ui/react";
import {ColorModeButton} from "./components/ui/color-mode.tsx";
import TaskFirst from "./components/TaskFirst.tsx";
import {useState} from "react";
import TaskSecond from "./components/TaskSecond.tsx";
import TaskThird from "./components/TaskThird.tsx";
import TaskFourth from "./components/TaskFourth.tsx";
import BrainTasks from "./components/BrainTasks.tsx";
import {BRAINTASK} from "./utils/text-constant.ts";


function App() {
    const [taskNumber, setTaskNumber] = useState(1)
    const nodeList = [
        <TaskFirst/>,
        <TaskSecond/>,
        <TaskThird/>,
        <TaskFourth/>,
        <BrainTasks task={BRAINTASK[0]} answer={BRAINTASK[1]} num={1}/>,
        <BrainTasks task={BRAINTASK[2]} answer={BRAINTASK[3]} num={2}/>,
        <BrainTasks task={BRAINTASK[4]} answer={BRAINTASK[5]} num={3}/>,
        <BrainTasks task={BRAINTASK[6]} answer={BRAINTASK[7]} num={4}/>
    ]

    return (
        <div>

            <VStack width="100%">
                <HStack>
                    <Text fontSize="4xl">Тестовое задание Hotels</Text>
                    <ColorModeButton/>
                </HStack>
                <HStack mb={3}>
                    <VStack>
                        <Text fontSize="lg">Выбери номер задачи</Text>
                        <HStack>
                            {nodeList.map((_, index) => (
                                <Button
                                    variant="surface"
                                    key={index}
                                    onClick={() => setTaskNumber(index + 1)}
                                    _hover={{ transform: 'scale(1.05)'}}
                                    border={index>3?"1px solid blue":"1px solid red"}
                                    bg={index===taskNumber-1?"gray.400":""}
                                >
                                    {`№${index>3?index-3:index+1}`}
                                </Button>
                            ))}
                        </HStack>
                    </VStack>
                </HStack>
                <Text fontSize="md">{taskNumber>4?"Задача на сообразительность":"Задача на кодирование"}</Text>
                <Box bg="bg" shadow="md"  borderRadius="md" m={[0, 4]} p={[4]} >
                    {nodeList[taskNumber - 1]}
                </Box>
            </VStack>
        </div>
    )
}

export default App
