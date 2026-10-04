#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

REPO_NAME="chronicles-of-bharatavarsha"
GITHUB_USER="saltymother"

echo "============================================================"
echo " 🇮🇳 Pushing Chronicles of Bharatavarsha to GitHub..."
echo "============================================================"

# Ensure remote is set
if ! git remote | grep -q "^origin$"; then
  git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
else
  git remote set-url origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
fi

git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "============================================================"
  echo " 🎉 SUCCESS! Pushed to GitHub!"
  echo " 🌐 Repository: https://github.com/${GITHUB_USER}/${REPO_NAME}"
  echo " 🚀 GitHub Pages: https://${GITHUB_USER}.github.io/${REPO_NAME}/"
  echo "============================================================"
  echo ""
  echo "Note: GitHub Actions will now automatically build and publish"
  echo "your site to GitHub Pages within 1-2 minutes!"
else
  echo ""
  echo "============================================================"
  echo " ⚠️ Push could not complete automatically."
  echo " If the repository does not exist on GitHub yet, please:"
  echo " 1. Open: https://github.com/new"
  echo " 2. Set Repository name to: ${REPO_NAME}"
  echo " 3. Make it Public and click 'Create repository'"
  echo " 4. Run this script again: ./push_to_github.sh"
  echo "============================================================"
fi
