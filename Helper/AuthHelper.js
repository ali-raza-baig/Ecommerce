import bcrypt from "bcrypt";



// Hash Password Helper 
export const hashpassword = async (password) => {
    try {
        const SaltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, SaltRounds);
        return hashedpassword;
    } catch (error) {
        console.log(error)
    }
}


// Compare Password Helper 
export const Comparepassword = async (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword)
}
