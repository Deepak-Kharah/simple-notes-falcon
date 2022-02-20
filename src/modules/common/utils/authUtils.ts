import snakeCase from "just-snake-case";

export function generateInitials(username: string) {
    const initialsArray = snakeCase(username).split("_");

    let initials = "";

    initialsArray.forEach((initial) => {
        initials += initial[0];
    });

    return initials.toUpperCase();
}
