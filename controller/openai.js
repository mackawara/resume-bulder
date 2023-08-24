import { Configuration, OpenAIApi } from "openai"
import {
    AggregateSteps,
    AggregateGroupByReducers,
    createClient,
    SchemaFieldTypes,
    redis,
  } from "redis"
  const redis=createClient()
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANISATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
