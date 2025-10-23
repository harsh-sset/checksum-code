
// import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";
import { parseGitHubContext } from "../github/context";

async function invokeReportingApi(): Promise<void> {
    const { github_token, claude_comment_id } = process.env;
    const context = parseGitHubContext();
    // get comment content using octokit
    const octokit = new Octokit({
        auth: github_token,
    });
    const comment = await octokit.rest.issues.getComment({
        owner: context.repository.owner,
        repo: context.repository.repo,
        comment_id: parseInt(claude_comment_id!),
    });

    console.debug("Comment content: ", comment.data.body);
}

if (import.meta.main) {
    invokeReportingApi();
}