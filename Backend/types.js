const z= require("zod");

const newUser = z.object({
    username: z.string().email(),
    password: z.string().min(6, {message: "Must be more than 6 Characters"}),
    firstname: z.string().max(20, {message: "Must be less than 20 Characters"}),
    lastname: z.string().max(20, {message: "Must be less than 20 Characters"}),
});

const existingUser = z.object({
    username: z.string().email(),
    password: z.string()
})

const updateUser = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

module.exports = {
    newUser,
    existingUser,
    updateUser
}