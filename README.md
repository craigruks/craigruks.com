Quick one pager to link out to where I am active online. All notes here are for myself to remember later haha.

- Use sass to keep my css dry
- No CSS class standards because site is simple enough to use selectors
- Grunt commands help to gzip, minify, and push up single HTML file to CDN
- Completely static so I don't have to worry about traffic

### Installation
- Install ruby + rbenv, then `bundle install`
- Install nvm, then follow directions in gruntfile.js
- I recommend copying the contents of `.bashrc` into your actual bash profile, running to get into this env

### Usage
- `grunt build` to build production HTML file
- `grunt connect:build` to http serve `build/*`
- `grunt connect:src` to http serve `src/*`
- `grunt production` to build, then push up to s3
- `grunt watch` to rebuild sass on save

### Deployment
```bash
# rm old
now rm -y craigruks-com

# deploy new
now --public ./build -n craigruks-com

# point craigruks.com to .sh site
URL=`now ls craigruks-com | grep NPM | awk '{print $2}'`
now alias "${URL}" www.craigruks.com

# redirect to www
now -e REDIRECT_URL=https://craigruks.com/ now-examples/redirect
now alias https://now-examples-redirect-[generated-from-last-cmd].now.sh www.craigruks.com
```
