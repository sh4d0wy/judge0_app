import z from "zod";

export const codeSnippetSchema = z.object({
    language_id:z.number(),
    source_code:z.string(),
    testcases:z.array(z.object({
        stdin:z.string(),
        expected_output:z.string()
    }))
})

export const questionSchema = z.object({
    question:z.string(),
    testcases:z.array(z.object({
        stdin:z.string(),
        expected_output:z.string()
    }))
})

export type codeSnippetType = z.infer<typeof codeSnippetSchema>;
export type questionType = z.infer<typeof questionSchema>;

export type DecodedToken = {
    id:string;
    role:string;
}