
// import * as core from "@actions/core";
import { parseGitHubContext } from "../github/context";
import { createOctokit } from "../github/api/client";

async function invokeReportingApi(): Promise<void> {
    const { GITHUB_TOKEN, CLAUDE_COMMENT_ID, APP_ID, APP_PRIVATE_KEY, GITHUB_REPO_OWNER_NAME, GITHUB_EVENT_NAME, GITHUB_REPOSITORY, GITHUB_BRANCH, GITHUB_BASE_BRANCH, GITHUB_HEAD_BRANCH, GITHUB_PR_NUMBER, GITHUB_PR_LINK, GITHUB_RUN_ID, GITHUB_RUN_NUMBER, GITHUB_RUN_ATTEMPT } = process.env;

    console.debug("process.env within invokeReportingApi: ", JSON.stringify({
        APP_ID,
        APP_PRIVATE_KEY,
        GITHUB_TOKEN,
        CLAUDE_COMMENT_ID,
        GITHUB_REPO_OWNER_NAME,
        GITHUB_EVENT_NAME,
        GITHUB_REPOSITORY,
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
       
        // invoke reporting api
        const response = await fetch('https://reproting-api-770070026559.us-east1.run.app', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              appId: APP_ID,
              appPrivateKey: APP_PRIVATE_KEY,
              commentContent: comment.data.body,
              github: {
                repo: GITHUB_REPOSITORY,
                owner: GITHUB_REPO_OWNER_NAME,
                branch: GITHUB_BRANCH,
                baseBranch: GITHUB_BASE_BRANCH,
                headBranch: GITHUB_HEAD_BRANCH,
                prNumber: parseInt(GITHUB_PR_NUMBER!), // optional
                prLink: GITHUB_PR_LINK, // optional
                runId: GITHUB_RUN_ID,
                runNumber: parseInt(GITHUB_RUN_NUMBER!), // optional
                runAttempt: parseInt(GITHUB_RUN_ATTEMPT!), // optional
                commentId: CLAUDE_COMMENT_ID,
              }
            })
        });
        if(!response.ok) {
            console.error("Failed to invoke reporting API: ", response.statusText);
            throw new Error("Failed to invoke reporting API");
        }
        await response.json();
        console.debug("Concluding reporting API");
    } catch (error) {
        console.error("Error getting comment: ", error);
    }

}

if (import.meta.main) {
    invokeReportingApi();
}