import z from 'zod';

const subscriptionSchema = z.object({
    email: z.string().email({
            invalid_type_error: 'User e-mail must be a valid e-mail address.'
        })
});

export function validateEmail(object) {
    return subscriptionSchema.safeParseAsync(object);
} 