const User = require("../models/users");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ where: { email: "admin@test.com" } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin", 10);
            const newAdmin = await User.create({
                email: "admin@test.com",
                name: "Admin",
                password: hashedPassword,
                role: "Administrator"
            })
            console.log("Admin account created succesfully")
        } else {
            console.log("Admin already exists")
        }
    } catch (error) {
        console.log(error.message)
    }
};

module.exports = createAdminAccount