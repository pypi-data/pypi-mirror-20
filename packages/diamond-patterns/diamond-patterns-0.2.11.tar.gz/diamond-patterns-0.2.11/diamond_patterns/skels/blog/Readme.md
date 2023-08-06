# website

Welcome to your blog.

## Usage

Once the site is installed, deployment is as simple as pushing code to git.

    git add -A
    git commit -am "note about commit"
    git push

## Local development

To run the local server:

    make serve

The test website is available at [http://127.0.0.1:4000](http://127.0.0.1:4000).

### Regenerate javascript

    make js

## Installation

    diamond --skel blog scaffold
    make init
