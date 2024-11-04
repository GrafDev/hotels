import {
    VStack, Text, Input
} from "@chakra-ui/react";
import {Field} from "./ui/field.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@chakra-ui/react"
import {z} from "zod"
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {getTaskSecond} from "../features/getTaskSecond.ts";


const formSchema = z.object({
    numbers: z.string()
        .min(1, "Введите числа")
        .regex(/^(\d+,)*\d+$/, "Введите целые положительные числа через запятую, без пробелов")
        .refine((val) => {
            const numbers = val.split(',').map(Number);
            return numbers.every(num =>
                Number.isInteger(num) &&
                num >= 0
            );
        }, {
            message: "Все числа должны быть целыми и положительными"
        })
})

type FormValues = z.infer<typeof formSchema>

const TaskSecond = () => {
    const [numbers, setNumbers] = useState<string>("")
    const [onOrder, setOnOrder] = useState(false)
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numbers: ""
        }
    })

    const onSubmit = handleSubmit((data) => {
        setOnOrder(true)
        setNumbers(data.numbers)
    })

    const handleNewOrder = () => {
        setOnOrder(false)
        setNumbers("")
        reset()
    }

    return (
        <VStack>
            <Text fontWeight="medium">
                Задача 2
            </Text>
            <form onSubmit={onSubmit}>
                {!onOrder &&
                    <VStack>
                        <Field
                            label={"Впишите через запятую целые положительные числа"}
                            invalid={!!errors.numbers}
                            errorText={errors.numbers?.message}
                        >
                            <Controller
                                name="numbers"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        placeholder="Например: 1,2,3,4"
                                    />
                                )}
                            />
                        </Field>
                        <Button size="sm" type="submit">
                            Показать
                        </Button>
                    </VStack>}

                {onOrder &&
                    <VStack>
                        <Text>
                            {numbers ? `У массива [${numbers}] общие делители: [${getTaskSecond(numbers)}]` : "Введите числа"}
                        </Text>
                        <Button
                            size="sm"
                            onClick={handleNewOrder}
                        >
                            Новый ввод массива
                        </Button>
                    </VStack>
                }
            </form>
        </VStack>
    );
};

export default TaskSecond;
