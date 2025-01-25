

export const checkValidData=(email, password)=>{
    const isValidEmail= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if(!isValidEmail) return "Please enter a valid email address."
    if(!isValidPassword) return "Please enter a valid password."
    return null;
}

export function convertResponses(inputData) {
    return inputData.map((item, index) => {
        const sevenDaysAgo = new Date().setDate(new Date().getDate() - (7 - index * 2));

        const messages = [
            { text: item.question, sender: "user" }
        ];

        if (item.answer.includes("botText:") || item.answer.includes("botSQL:")) {
            const [botText, botSQL] = item.answer.split("botSQL:");
            messages.push({ text: botText.replace("botText:", "").trim(), sender: "bot" });
            messages.push({ text: botSQL.trim(), sender: "bot", sql: true });
        } else {
            messages.push({ text: item.answer, sender: "bot" });
        }

        return {
            id: index + 1,
            timestamp: sevenDaysAgo,
            messages: messages
        };
    });
}
