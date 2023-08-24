
const indvUsers = require("../models/individualUsers");
const totalUsageModel = require("../models/totalUsage");
const { Configuration, OpenAIApi } = require("openai");


class getDetail {
    constructor() {

        const workExperience = `Your only task is to collect work experieince section for a resume bulder. The details  for each section of the work experience needs to have Company, position,date started and dateFinished, key-achievement/duties. Each section of the work experience must have these fields and you must prompt the user to until you get them .Once done you can save the in array like this [] `
        const getPersonalDetails = {
            role: "system",
            content: `Your only task is to collect personal details for use in a resume builder. You only task is to collect  the following details which are not optional ("required") fullName, email,phone number. These details however are optional , github profile, twitter, linkedin. Keep prompting the user for the required details if they are not supplied. Once you have all the details save them in a object like this { fullName: "John Doe",phoneNumber: "+4412345603",linkedIn: "@chakadaro"}.  Once you get all the details gather them all and send to the user for confirmation. if they confirm return the personal details verbatim in this format  as shown inside the text delimited by and dont add anything else. [[[personalDetails]]]:{ fullName: "John Doe",phoneNumber: "+4412345603",linkedIn: "@chakadaro"}.`

        };
        const getWorkExperience = {
            role: "system",
            content: `Your task is to collect the work experience section for a resume builder. Start by asking for the duties and responsibilities of the job being applied for. Use this information to tailor the work experience, highlighting why the user would be a good candidate.

            To gather details for each work experience section, prompt the user to provide Company name, Position held, Duration (From and To), and Key achievements/duties performed. Keep prompting until all these details are obtained.
            
            Save each work experience as an object in this format:
            [{company: "Livestock Wealth", dateStarted: "June 2022", dateCompleted: "July 2023", dutiesOrAchievements: ["list of details here"]}]
            
            Once you confirm that the user has finished adding their work experiences, enhance them based on industry best practices and required qualifications/experiences. Present this enhanced version back to the user for confirmation.
            
            After receiving confirmation from the user, return your final output in this format:
            [[[workExperience]]]: [{company:"", position:"", duration:" ", dutiesAndAchievements},{company:"", position:"", duration:" ",dutiesAndAchievements}]`
        };
        const getSkills = {
            role: "system",
            content: `Your task is to create a "skills" section for a resume builder based on the user's suggestions. Start by asking the user to list skills thay want on their CV.The user should provide at least three technical skills related to their field and one transferable or demonstrable soft skill. You must keep prompting the user for this until they provide them. optionally, ask the user to provide examples of how these skills have been displayed or utilized in previous positions/projects explaining how this is more likely to result in a successful application

            Discourage user from using clichéd expressions like "Able to work under pressure with minimum supervision." Instead they should focus on  most relevant skills by placing them at the top of your list.
            
            Once you receive the user's input, enhance it by improving wording, incorporating industry-specific keywords, correcting grammar errors if any exist, and adding necessary material. Show the enhanced skills for confirmation or request edits from the user. Once confirmed, reply with [[skills:]] followed by an array listing all of your skills.`
        };
        const createProfile = {
            role: "system",
            content: `based on a provided skills, work experience and job description, create profile of about 4 sentences  separated by line space and maximum of 200 characters) for use in a CV/resume, You are to create unique, fresh,original summary/profile that exudes confidence an is likely to catch the eye of the recruiter without being boasty After the creating the summary ask the user to cinfirm if this is ok. if not they can suggest improvememts which you will take into cisndieration when making a new  version. Repeat until ser agrees that summary is ok. Once confirmed return the summary in this format , with nothing else [[[profile:]]] "summary here as a string"`
        };
    }
}

const systemRole = {}
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANISATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});
let messages = [];
console.log("example" + exampleObject)
await redisClient.hSet(
    `${chatID}`,
    "messages",
    JSON.stringify(messages),
    result => console.log(`result`, result)
)

const aIresponse = await openai
    .createChatCompletion({
        model: "gpt-4-0613",
        messages: messages,
        temperature: 0.5,
        max_tokens: 750,
        frequency_penalty: 1.5,
        presence_penalty: 1.5,


    })
    .catch(err => {
        console.log(err);
        return;
    });
if (aIresponse) {
    if ("data" in aIresponse) {
        messages.push(aIresponse.data.message)
        redisClient.hSet(
            `${chatID}messages`,
            "messages",
            JSON.stringify(messages)
        );
        redisClient.expire(`${chatID}messages`, 300);
        const systemResponse = aIresponse.data.choices[0]["message"]["content"]
        //if message start with *** it is a n indication that the section is complete
        if (systemResponse.startsWith("***")) {
            messages = []
            //send message to the userto the effect that we are going to the next staage
            return systemResponse.replace(/\[\[\[)/gi, "").replace(/\]\]\]/gi, "")
        }
        else {
            return aIresponse.data.choices[0]["message"]
        }
    }
    else {
        return `Sorry there was an error during processing of your request please start afresh`
    }

}
else {

}
