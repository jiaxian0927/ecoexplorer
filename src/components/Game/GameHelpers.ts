export const generateObjectsTool = (divWidth: number, obstaclesType: string) => {
    return {
        left: divWidth - 40,
        top: Math.round(Math.random() * 350 + 100), // Random top position
        collision: false, // Initial collision state
        type: obstaclesType,
    }
}