source 'https://rubygems.org'
gem 'capistrano', '~>3.1'
gem 'net-ssh', '~>2.9.2'
gem 'rake'
gem 'mailcatcher'
gem 'json'

# Load gem dependencies from the theme
theme_gemfile = File.join(File.dirname(__FILE__), "public/sites/all/themes/gesso/Gemfile")
if File.exists?(theme_gemfile)
  puts "Loading #{theme_gemfile} ..." if $DEBUG # `ruby -d` or `bundle -v`
  instance_eval File.read(theme_gemfile)
end
