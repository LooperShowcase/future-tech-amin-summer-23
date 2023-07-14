let open_response;

let chat = [
    { role: "user", content: "HI" },
    { role: "assistant", content: "HI, how can I help you today" }

];



async function chatUserAdd(feeling, question) {
    chat.push({role: "user", content: "My happiness from 0-10 is " + feeling + " . my input is: " + question})
}
async function chatAssistantAdd(res) {
    chat.push({ role: "assistant", content: res });
}
async function openAI_test() {
    let url = "https://api.openai.com/v1/chat/completions";
    let part1 = "sk";
    let part2 = "-RAtWR9nJwrgLF6Ml4nwq";
    let part3 = "T3BlbkFJT5tJv54MBU4s9EEIghTq";

    let APIkey = part1 + part2 + part3;
    let data = {
        model: "gpt-3.5-turbo",
        messages: chat
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${APIkey}`
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const responseData = await response.json();
            const message = responseData.choices[0].message.content;

            chatAssistantAdd(message);
            const speech = new SpeechSynthesisUtterance(message);

            speechSynthesis.speak(speech);
            return message;
        }
    else {
                speech.text = "Hello, world!";

            }
        
    }

    catch (error) {
        console.log("opps an error: " + error)
    }
}