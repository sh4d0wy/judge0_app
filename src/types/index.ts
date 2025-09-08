import z from "zod";

export const codeSnippetSchema = z.object({
    language_id:z.number(),
    source_code:z.string(),
    testcases:z.array(z.object({
        stdin:z.string(),
        expected_output:z.string()
    }))
})


export type codeSnippetType = z.infer<typeof codeSnippetSchema>;