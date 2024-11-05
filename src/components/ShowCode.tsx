import {Button, Code, VStack} from "@chakra-ui/react";
import { useState } from "react";

type ValidParamType = string | number | boolean | Record<string, unknown> | unknown[];
type ValidReturnType = string | number | boolean | void | Record<string, unknown> | unknown[];

interface ShowCodeProps<P extends ValidParamType, R extends ValidReturnType> {
    fun: (param: P) => R;
}

const ShowCode = <P extends ValidParamType, R extends ValidReturnType>({
                                                                           fun
                                                                       }: ShowCodeProps<P, R>): JSX.Element => {
    const [showCode, setShowCode] = useState(false);

    const formatCode = (code: string): string => {
        const lines = code.split('\n');

        const minIndent = lines
            .filter(line => line.trim())
            .reduce((min, line) => {
                const indent = line.match(/^\s*/)?.[0].length ?? 0;
                return Math.min(min, indent);
            }, Infinity);

        return lines
            .map(line => line.slice(minIndent))
            .join('\n')
            .trim();
    };

    const getFormattedCode = (fn: (param: P) => R): string => {
        return formatCode(fn.toString());
    };

    return (
        <VStack p={3}>
            <Button
                variant="outline"
                onClick={() => setShowCode(!showCode)}
                mb={2}
            >
                {showCode ? 'Скрыть код' : 'Показать код функции'}
            </Button>

            {showCode && (
                <Code
                    display="block"
                    whiteSpace="pre"
                    padding={4}
                    marginTop={2}
                    borderRadius="md"
                    fontSize="sm"
                    overflowX="auto"
                    bg="gray.50"
                >
                    {getFormattedCode(fun)}
                </Code>
            )}
        </VStack>
    );
};

export default ShowCode;
