import {
    NumberInputField,
    NumberInputRoot,
} from "./ui/number-input";
import {VStack, Text, HStack, Box} from "@chakra-ui/react";
import {Field} from "./ui/field.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {PRIME_NUMBERS_TASK} from "../utils/text-constant.ts";
import {getTaskThird} from "../features/getTaskThird.ts";
import ShowCode from "./ShowCode.tsx";

const formSchema = z.object({
    number: z.number({
        required_error: "Number is required",
        invalid_type_error: "Must be a number"
    })
})

type FormValues = z.infer<typeof formSchema>

const TaskThird = () => {
    const [simpleNumbers, setSimpleNumbers] = useState<string>("");

    const form1 = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: 0
        }
    })

    const form2 = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: 0
        }
    })

    const number1 = form1.watch('number');
    const number2 = form2.watch('number');

    useEffect(() => {
        setSimpleNumbers(getTaskThird(number1, number2));
    }, [number1, number2]);

    return (
        <VStack width="100%">
            <Text fontWeight="medium">
                Задача 3
            </Text>
            <Text color="red.700">{PRIME_NUMBERS_TASK}</Text>
            <Text color="green.600">Решение</Text>
            <HStack border="1px solid green" borderRadius="md" shadow="md" p={4} alignItems="start">
                <form>
                    <Field
                        invalid={!!form1.formState.errors.number}
                        errorText={form1.formState.errors.number?.message}
                    >
                        <Controller
                            name="number"
                            control={form1.control}
                            render={({field}) => (
                                <NumberInputRoot
                                    disabled={field.disabled}
                                    name={field.name}
                                    min={0}
                                    onValueChange={({value}) => {
                                        field.onChange(Number(value))
                                    }}
                                >
                                    <NumberInputField onBlur={field.onBlur}/>
                                </NumberInputRoot>
                            )}
                        />
                    </Field>
                </form>

                <Box
                    border="1px solid green"
                    borderRadius="md"
                    py={2}
                    px={4}
                    shadow="md"
                >
                    <Text color="green.600"
                          width="300px"
                          whiteSpace="pre-wrap"
                          lineClamp="7">
                        {simpleNumbers}</Text>

                </Box>

                <form>
                    <Field
                        invalid={!!form2.formState.errors.number}
                        errorText={form2.formState.errors.number?.message}
                    >
                        <Controller
                            name="number"
                            control={form2.control}
                            render={({field}) => (
                                <NumberInputRoot
                                    disabled={field.disabled}
                                    name={field.name}
                                    onValueChange={({value}) => {
                                        field.onChange(Number(value))
                                    }}
                                >
                                    <NumberInputField onBlur={field.onBlur}/>
                                </NumberInputRoot>
                            )}
                        />
                    </Field>
                </form>
            </HStack>
            <ShowCode fun={getTaskThird}/>
        </VStack>

    );
};

export default TaskThird;
