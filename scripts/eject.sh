BASE_APP_COMMIT_SHA=$(git rev-parse HEAD)
rm -rf .git/
git init
git add -A
git commit -m "Base Application $BASE_APP_COMMIT_SHA"

