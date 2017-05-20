function craigruks.com() {
  cd ~/Sites/git/craigruks.com

  # env vars
  export AWS_ACCESS_KEY_ID=''
  export AWS_SECRET_ACCESS_KEY=''
  export AWS_BUCKET=''

  # node
  start_nvm >> /dev/null
  nvm use >> /dev/null

  # ruby (for sass)
  # install:
  # gem install bundle
  # bundle install
  start_rbenv
}
