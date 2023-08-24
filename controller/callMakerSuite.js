import axios from "axios"
export const callMakerSuite = async (prompt) => {
    const makerSuiteApiKEY = process.env.MAKERSUITE_API

    const options = {
        data: { "prompt": { "text": prompt } },
        url: "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=" + makerSuiteApiKEY,
        headers: { 'Content-Type': 'application/json', },
    }
    const response = await axios.request(options)
}
//export default callMakerSuite