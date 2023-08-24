//openai
const indvUsers = require("../models/individualUsers");
const totalUsageModel = require("../models/totalUsage");
//const examPaper = require("../models/examPapers")
const Syllabus = require("../models/syllabus")
//const examinerReport = require("../models/examinerReport")

const getResource = async (chatID, redisClient, prompt, resource) => {
    let exampleObject;

    class cvDetails {
        constructor({ submittedObject: person }) {
            this.name = person.name;
            this.surname = person.surname
            this.occupation = person.occupation
            this.workExperience = []
            this.education = []
            this.skills = []
        }

        addWorkExperience(company, duration, achievements) {
            const experience = { company, duration, achievements };
            this.workExperiences.push(experience);
        }

        getWorkExperienceDetails() {
            return this.workExperiences.map((experience) => ({
                company: experience.company,
                duration: experience.duration,
                achievements: experience.achievements,
            }));
        }

    }



    getJsonFormatted = async () => {
        let user = await indvUsers.findOne({ serialisedNumber: chatID }).exec();
        const totalUsage = await totalUsageModel.findOne({});

        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            organization: process.env.OPENAI_ORGANISATION_KEY,
            apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        let messages = [];
        console.log("example" + exampleObject)
        await redisClient.hSet(
            `${chatID}${resource}`,
            "messages",
            JSON.stringify(messages),
            result => console.log(`reuslt`, result)
        );
        //console.log(messages);
        const system = {
            role: "system",
            content:
                `You are a resume builder, you assist users with creating proffessional css and resumes. Refer to best practises of creating CV in making the final compilation. Avoid using cliched expressions in any of the CV details, if the user submits cliched expressions try to have them change their. The sequence is you ask them questions in order to fill this json Object`
        };


        messages.push(system);
        messages.push({ role: "user", content: prompt });
        console.log(messages);
        const getDetails = async () => {

        }
        const response = await openai
            .createChatCompletion({
                model: "gpt-4-0613",
                messages: messages,
                temperature: 0.5,
                max_tokens: 750,
                frequency_penalty: 1.5,
                presence_penalty: 1.89,

            })
            .catch(err => {
                console.log(err);
                return;
            });
        //check if there is any response
        if (response) {
            if ("data" in response) {
                user.inputTokens =
                    parseInt(user.inputTokens) + response.data.usage.prompt_tokens;
                user.completionTokens =
                    parseInt(user.completionTokens) +
                    response.data.usage.completion_tokens;
                user.totalTokens =
                    parseInt(user.totalTokens) + response.data.usage.total_tokens;
                //Add to cumulatitive totals
                totalUsage.calls++;
                totalUsage.inputTokens =
                    parseInt(totalUsage.inputTokens) + response.data.usage.prompt_tokens;
                console.log("prompt tokens" + response.data.usage.prompt_tokens)
                totalUsage.completionTokens =
                    parseInt(totalUsage.completionTokens) +
                    response.data.usage.completion_tokens;
                console.log("completion tokens" + response.data.usage.completion_tokens)
                totalUsage.totalTokens =
                    parseInt(totalUsage.totalTokens) + response.data.usage.total_tokens;
                console.log("total tokens" + response.data.usage.total_tokens)
                try {
                    user.save();
                    totalUsage.save();
                } catch (err) {
                    console.log(err);
                }

                return response.data.choices[0]["message"]["content"].replace(/\(/gi, "").replace(/\)/gi, "");
            } else {
                return `Error , request could not be processed, please try again later`;
            }
        } else {
            totalUsage.errors++;
            totalUsage.calls++;
            try {

                totalUsage.save();
            } catch (err) {
                console.log(err);
            }
            return "*Error!* your request could not be processed , please try again later";
        }
    };


};
module.exports = getResource;
