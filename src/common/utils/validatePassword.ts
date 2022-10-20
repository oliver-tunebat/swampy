export function validatePassword(password: string) {
    return (
        password.length >=
        parseInt(process.env.NEXT_PUBLIC_PASSWORD_LENGTH ?? "0")
    );
}
