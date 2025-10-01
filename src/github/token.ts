#!/usr/bin/env bun

import * as core from "@actions/core";

export async function setupGitHubToken(): Promise<string> {
  try {
    // Check if GitHub token was provided as override
    const providedToken = process.env.OVERRIDE_GITHUB_TOKEN;
    console.log("Environment variable ==== ", JSON.stringify(process.env));
    if (!providedToken) {
      throw new Error("GITHUB_TOKEN is not set");
    }
    return providedToken;
  } catch (error) {
    // Only set failed if we get here - workflow validation errors will exit(0) before this
    core.setFailed(
      `Failed to setup GitHub token: ${error}\n\nIf you instead wish to use this action with a custom GitHub token or custom GitHub app, provide a \`github_token\` in the \`uses\` section of the app in your workflow yml file.`,
    );
    process.exit(1);
  }
}
