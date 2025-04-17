import z from 'zod';

const propertySchema = z.object({
    title: z.string({
        invalid_type_error: 'Title must be a string.',
        required_error: 'Property title is required.'
    }),
    price: z.number().int().positive(),
    city: z.string({
        invalid_type_error: 'City must be a string.',
        required_error: 'Property city is required.'
    }),
    state: z.string({
        invalid_type_error: 'State must be a string.',
        required_error: 'Property state is required.'
    }).length(2, {message: 'State must be exactly 2 characters long.'}),
    year: z.number().int().min(1600).max(2025),
    description: z.string({
        invalid_type_error: 'Description must be a string.',
        required_error: 'Property description is required.'
    }),
    thumbnail: z.string().url({
        message: 'Thumbnail must be a valid URL'
    })

});

export function validateProperty(object) {
    return propertySchema.safeParseAsync(object)
}