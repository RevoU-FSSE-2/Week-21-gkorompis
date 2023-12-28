#!/bin/sh

echo ">>> transpiling..."

cd /Users/gazakorompis/start-now/todos-app/server
pwd

echo ">>> compress deploy file"
zip -r deploy.zip . -x "src/*" "misc/*" "test*" "*.sh" "./testenv.js" "cek/*" "lambda.js" ".git/*" "my_deployment_package.zip" "package" "site-packages.zip" "todos-app-site-packages"

echo ">>> upload to aws s3 bucket todos-app-server-02"
aws s3 cp deploy.zip s3://todos-app-server-02

echo ">>> deploy to aws lambda"
aws lambda update-function-code --function-name todos-app-server-02 --s3-bucket todos-app-server-02 --s3-key deploy.zip

