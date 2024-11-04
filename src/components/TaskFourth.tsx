import {
    NumberInputField,
    NumberInputRoot,
} from "./ui/number-input";
import {VStack, Text} from "@chakra-ui/react";
import {Field} from "./ui/field.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@chakra-ui/react"
import {z} from "zod"
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {getTaskFirst} from "../features/getTaskFirst.ts";

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

    // Теперь мы уверены, что data.number это число
    const onSubmit = handleSubmit((data) => {
        setOnOrder(true)
        setNumber(data.number)
    })

    return (
        <VStack>
            <Text fontWeight="medium">
                Задача 4
            </Text>
            <form onSubmit={onSubmit}>
                {!onOrder &&
                    <VStack>
                        <Field
                            label={"Сколько компьютеров вам нужно"}
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
                                        onValueChange={({value}) => {
                                            // Преобразуем значение в число
                                            field.onChange(Number(value))
                                        }}
                                    >
                                        <NumberInputField onBlur={field.onBlur}/>
                                    </NumberInputRoot>
                                )}
                            />
                        </Field>
                        <Button size="sm" type="submit">
                            Заказать
                        </Button>
                    </VStack>}

                {onOrder &&
                    <VStack>
                        <Text> {number >0 ? "На складе для вас есть": number===0? "Нет смысла заказывать ": "Вы должны привезти нам на склад "} {getTaskFirst(number)}</Text>
                        <Button size="sm" type="submit"  onClick={() => setOnOrder(false)}> Новый заказ </Button>
                    </VStack>
                }
            </form>
        </VStack>
    );
};

export default TaskFourth
