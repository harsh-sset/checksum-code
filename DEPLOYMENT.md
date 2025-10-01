# Deployment Guide for Checksum Code Action

This guide will help you deploy the Checksum Code Action to the GitHub Actions marketplace under your own brand.

## Prerequisites

1. **GitHub Repository**: You need a public GitHub repository to host your action
2. **GitHub Account**: You need a GitHub account with appropriate permissions
3. **npm Account** (optional): If you want to publish to npm as well

## Step 1: Repository Setup

1. **Create a new repository** on GitHub (e.g., `your-username/checksum-code-action`)
2. **Push your code** to the repository:
   ```bash
   git remote add origin https://github.com/your-username/checksum-code-action.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Create a Release

1. **Tag your version**:

   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **Create a GitHub Release**:
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Choose the tag `v1.0.0`
   - Add release notes describing the action's features
   - Mark as "Latest release"

## Step 3: Publish to GitHub Actions Marketplace

1. **Go to your repository** on GitHub
2. **Click on "Actions" tab**
3. **Click "Publish this Action to the GitHub Marketplace"** (this option appears after you create a release)
4. **Fill out the marketplace form**:
   - **Name**: `Checksum Code Action`
   - **Description**: `Flexible GitHub automation platform with Claude. Auto-detects mode based on event type: PR reviews, @claude mentions, or custom automation.`
   - **Icon**: Upload a custom icon (optional)
   - **Color**: Choose a color for your action
   - **Category**: Select appropriate categories (e.g., "Code Quality", "Utilities")
   - **Keywords**: Add relevant keywords like `claude`, `ai`, `automation`, `code-review`

## Step 4: Usage Instructions

Once published, users can use your action like this:

```yaml
name: Checksum Code Action
on:
  issue_comment:
    types: [created]
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
  issues:
    types: [opened, edited, labeled, assigned]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: your-username/checksum-code-action@v1.0.0
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # Optional: Add your custom prompt
          prompt: "Review this code and suggest improvements"
```

## Step 5: Optional - Publish to npm

If you want to also publish to npm:

1. **Update package.json** (already done):

   ```json
   {
     "name": "@checksum-code/checksum-code-action",
     "version": "1.0.0"
   }
   ```

2. **Login to npm**:

   ```bash
   npm login
   ```

3. **Publish**:
   ```bash
   npm publish --access public
   ```

## Step 6: Documentation

Make sure your README.md includes:

1. **Clear usage examples**
2. **Configuration options**
3. **Authentication setup**
4. **Troubleshooting guide**
5. **Contributing guidelines**

## Step 7: Maintenance

1. **Version Management**: Use semantic versioning (v1.0.0, v1.0.1, etc.)
2. **Release Notes**: Document changes in each release
3. **Security Updates**: Keep dependencies updated
4. **User Support**: Monitor issues and provide support

## Important Notes

- **Marketplace Approval**: GitHub reviews actions before they appear in the marketplace
- **Security**: Ensure your action follows security best practices
- **Testing**: Test your action thoroughly before publishing
- **Documentation**: Provide comprehensive documentation for users

## Customization Options

You can further customize your action by:

1. **Changing the icon and color** in `action.yml`
2. **Updating the description** to better reflect your brand
3. **Adding custom inputs** for your specific use cases
4. **Creating custom documentation** that matches your brand

## Support

For issues or questions about deployment:

- Check GitHub Actions documentation
- Review the original Claude Code Action repository for reference
- Create issues in your repository for user support
