
// import * as core from "@actions/core";
import { parseGitHubContext } from "../github/context";
import { createOctokit } from "../github/api/client";

async function invokeReportingApi(): Promise<void> {
    const { github_token, claude_comment_id, app_id, app_private_key } = process.env;

    console.debug("process.env within invokeReportingApi: ", JSON.stringify(process.env, null, 2));
    console.debug("app_id: ", app_id);
    console.debug("app_private_key: ", app_private_key);
    console.debug("github_token: ", github_token);
    console.debug("claude_comment_id: ", claude_comment_id);

    if(!app_id || !app_private_key) {
        throw new Error("app_id and app_private_key are required");
    }
    if(!github_token || !claude_comment_id) {
        throw new Error("github_token and claude_comment_id are required");
    }
    const context = parseGitHubContext();
    // get comment content using octokit
    const octokit = createOctokit(github_token);
    try {
    const comment = await octokit.rest.issues.getComment({
        owner: context.repository.owner,
            repo: context.repository.repo,
            comment_id: parseInt(claude_comment_id!),
        });
        console.debug("Comment content: ", comment.data.body);
    } catch (error) {
        console.error("Error getting comment: ", error);
    }

}

if (import.meta.main) {
    invokeReportingApi();
}