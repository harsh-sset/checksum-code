
// import * as core from "@actions/core";
import { parseGitHubContext } from "../github/context";
import { createOctokit } from "../github/api/client";

async function invokeReportingApi(): Promise<void> {
    const { GITHUB_TOKEN, CLAUDE_COMMENT_ID, APP_ID, APP_PRIVATE_KEY, GITHUB_REPO_OWNER, GITHUB_REPO_NAME, GITHUB_BRANCH, GITHUB_BASE_BRANCH, GITHUB_HEAD_BRANCH, GITHUB_PR_NUMBER, GITHUB_PR_LINK, GITHUB_RUN_ID, GITHUB_RUN_NUMBER, GITHUB_RUN_ATTEMPT } = process.env;

    console.debug("process.env within invokeReportingApi: ", JSON.stringify({
        APP_ID,
        APP_PRIVATE_KEY,
        GITHUB_TOKEN,
        CLAUDE_COMMENT_ID,
        GITHUB_REPO_OWNER,
        GITHUB_REPO_NAME,
        GITHUB_BRANCH,
        GITHUB_BASE_BRANCH,
        GITHUB_HEAD_BRANCH,
        GITHUB_PR_NUMBER,
        GITHUB_PR_LINK,
        GITHUB_RUN_ID,
        GITHUB_RUN_NUMBER,
        GITHUB_RUN_ATTEMPT,
    }, null, 2));

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