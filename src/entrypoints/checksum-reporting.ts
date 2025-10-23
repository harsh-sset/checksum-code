
// import * as core from "@actions/core";
import { parseGitHubContext } from "../github/context";
import { createOctokit } from "../github/api/client";

async function invokeReportingApi(): Promise<void> {
    const { GITHUB_TOKEN, CLAUDE_COMMENT_ID, APP_ID, APP_PRIVATE_KEY } = process.env;

    console.debug("app_id: ", APP_ID);
    console.debug("app_private_key: ", APP_PRIVATE_KEY);
    console.debug("github_token: ", GITHUB_TOKEN);
    console.debug("claude_comment_id: ", CLAUDE_COMMENT_ID);

    if(!APP_ID || !APP_PRIVATE_KEY) {
        throw new Error("app_id and app_private_key are required");
    }
    if(!GITHUB_TOKEN || !CLAUDE_COMMENT_ID) {
        throw new Error("github_token and claude_comment_id are required");
    }
    const context = parseGitHubContext();
    // get comment content using octokit
    const octokit = createOctokit(GITHUB_TOKEN);
    try {
    const comment = await octokit.rest.issues.getComment({
        owner: context.repository.owner,
            repo: context.repository.repo,
            comment_id: parseInt(CLAUDE_COMMENT_ID!),
        });
        console.debug("Comment content: ", comment.data.body);
    } catch (error) {
        console.error("Error getting comment: ", error);
    }

}

if (import.meta.main) {
    invokeReportingApi();
}