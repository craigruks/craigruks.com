Quick one pager to link out to where I am active online. All notes here are for myself to remember later haha.

- Use sass to keep my css dry
- No CSS class standards because site is simple enough to use selectors
- Grunt commands help to gzip, minify, and push up single HTML file to CDN
- Completely static so I don't have to worry about traffic

### Installation
- Install ruby + rbenv, then `bundle install`
- Install nvm, then follow directions in gruntfile.js
- I recommend copying the contents of `.bashrc` into your actual bash profile, running to get into this env
- I leverage [Cloudflare in front of Zeit](https://zeit.co/docs/v2/custom-domains#cloudflare), caching on top of static deployment (with serverless function if I need)

### Usage
- `grunt build` to build production HTML file
- `grunt connect:public` to http serve `public/*`
- `grunt connect:src` to http serve `src/*`
- `grunt watch` to rebuild on save

### Deployment
```bash
# deploy
# when running `now`, Zeit by default deploys the `./public` dir as a static site
grunt build
now
now --prod
```
