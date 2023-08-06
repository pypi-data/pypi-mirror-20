#!/bin/bash
# (cc) 2016 diamond-patterns

source .settings.conf

echo "create bare git repository on remote host"
echo
ssh ${SSH_USER}@${SSH_HOST} "git init --bare ${GIT_REPO}"
echo "OK"

echo "initialize local blog folder and push to repository on remote host"
echo
git init
git remote add origin ${SSH_USER}@${SSH_HOST}:${GIT_REPO}
git add -A
git commit -am "initialize repository with fresh scaffold"
git push -u origin master
echo "OK"

echo "create working copy of blog on remote host"
echo
ssh ${SSH_USER}@${SSH_HOST} "git clone ${GIT_REPO} ${WORKING_PATH}"
echo "OK"

echo "install git hooks on remote host"
echo
ssh ${SSH_USER}@${SSH_HOST} "cd ${WORKING_PATH} && make githooks"
echo "OK"

echo "build jekyll dependencies on remote host"
echo
ssh ${SSH_USER}@${SSH_HOST} "cd ${WORKING_PATH} && make depends"
echo "OK"
