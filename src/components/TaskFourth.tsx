import {
    NumberInputField,
    NumberInputRoot,
} from "./ui/number-input";
import {VStack, Text, Flex} from "@chakra-ui/react";
import {Field} from "./ui/field.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@chakra-ui/react"
import {z} from "zod"
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {MULTIPLICATION_TABLE_TASK} from "../utils/text-constant.ts";
import ShowCode from "./ShowCode.tsx";
import {getTaskFourth} from "../features/getTaskFourth.ts";

// Изменяем схему на number
const formSchema = z.object({
    number: z.number({
        required_error: "Number is required",
        invalid_type_error: "Must be a number"
    })
})

type FormValues = z.infer<typeof formSchema>

const TaskFourth = () => {
    const [number, setNumber] = useState<number>(0)
    const [onOrder, setOnOrder] = useState(false)
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: 0
        }
    })

    const onSubmit = handleSubmit((data) => {
        setOnOrder(true)
        setNumber(data.number)
    })

    return (
        <VStack>
            <Text fontWeight="medium">Задача 4</Text>
            <Text color="red.700">{MULTIPLICATION_TABLE_TASK}</Text>
            <Text color="green.600">Решение</Text>

            <form onSubmit={onSubmit}>
                {!onOrder &&
                    <VStack border="1px solid green" borderRadius="md" shadow="md" p={4}>
                        <Flex flexDirection="column"
                              alignItems="center"
                              gap="4"
                        >
                            <Field
                                label={"Введите положительное целое число"}
                                invalid={!!errors.number}
                                errorText={errors.number?.message}
                            >
                                <Controller
                                    name="number"
                                    control={control}
                                    render={({field}) => (
                                        <NumberInputRoot
                                            disabled={field.disabled}
                                            name={field.name}
                                            min={1}
                                            defaultValue={"0"}
                                            onValueChange={({value}) => {
                                                field.onChange(Number(value))
                                            }}
                                        >
                                            <NumberInputField onBlur={field.onBlur}/>
                                        </NumberInputRoot>
                                    )}
                                />

                            </Field>
                            <Button size="sm" type="submit">
                                Показать таблицу
                            </Button>
                        </Flex>
                    </VStack>}

                {onOrder &&
                    <VStack border="1px solid green" borderRadius="md" shadow="md" p={4}>
                        <Text
                            as="pre"
                            fontFamily="monospace"
                            whiteSpace="pre"
                            p={4}>
                            {number > 0 ? `${getTaskFourth(number)}` : "Введите корректное значение"}
                        </Text>
                        <Text fontSize="2xs" >Так же таблица выводится в консоль</Text>
                        <Button size="sm" type="submit" onClick={() => setOnOrder(false)}> Новая таблица </Button>
                    </VStack>
                }
            </form>
            <ShowCode fun={getTaskFourth}/>
        </VStack>
    );
};

export default TaskFourth
