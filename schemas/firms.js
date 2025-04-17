import z from 'zod';

const firmSchema = z.object({
    name: z.string({
        invalid_type_error: 'Name must be a string.',
        required_error: 'Firm name is required.'
    }),
    city: z.string({
        invalid_type_error: 'Name must be a string.',
        required_error: 'Firm city is required.'
    }),
    state: z.string({
            invalid_type_error: 'State must be a string.',
            required_error: 'Firm state is required.'
        }).length(2, {message: 'State must be exactly 2 characters long.'}),
    established: z.number().int().min(1900).max(2025),
    email: z.string().email({
        email: 'Firm e-mail must be a valid e-mail address.'
    }),
    website: z.string().url({
        message: 'Firm website must be a valid URL.'
    })


});

export function validateFirm(object) {
    return firmSchema.safeParseAsync(object);
}