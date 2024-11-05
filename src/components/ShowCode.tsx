import {Button, Code, VStack} from "@chakra-ui/react";
import { useState } from "react";

interface ShowCodeProps {
    fun: Function;
}

const ShowCode = ({ fun }: ShowCodeProps): JSX.Element => {
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

    const getFormattedCode = (fn: Function): string => {
        return formatCode(fn.toString());
    };

    return (
        <VStack p={3} width="100%">
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
