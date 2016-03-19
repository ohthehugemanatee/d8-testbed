# Composer template for Drupal projects

[![Build Status](https://travis-ci.org/drupal-composer/drupal-project.svg?branch=8.x)](https://travis-ci.org/drupal-composer/drupal-project)

This project template should provide a kickstart for managing your site
dependencies with [Composer](https://getcomposer.org/).

If you want to know how to use it as replacement for
[Drush Make](https://github.com/drush-ops/drush/blob/master/docs/make.md) visit
the [Documentation on drupal.org](https://www.drupal.org/node/2471553).

## Usage

First you need to [install composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx).

> Note: The instructions below refer to the [global composer installation](https://getcomposer.org/doc/00-intro.md#globally).
You might need to replace `composer` with `php composer.phar` (or similar) 
for your setup.

After that you can create the project:

```
composer create-project drupal-composer/drupal-project:8.x-dev some-dir --stability dev --no-interaction
```

With `composer require ...` you can download new dependencies to your 
installation.

```
cd some-dir
composer require drupal/devel:8.*
```

The `composer create-project` command passes ownership of all files to the 
project that is created. You should create a new git repository, and commit 
all files not excluded by the .gitignore file.

## What does the template do?

When installing the given `composer.json` some tasks are taken care of:

* Drupal will be installed in the `web`-directory.
* Autoloader is implemented to use the generated composer autoloader in `vendor/autoload.php`,
  instead of the one provided by Drupal (`web/vendor/autoload.php`).
* Modules (packages of type `drupal-module`) will be placed in `web/modules/contrib/`
* Theme (packages of type `drupal-theme`) will be placed in `web/themes/contrib/`
* Profiles (packages of type `drupal-profile`) will be placed in `web/profiles/contrib/`
* Creates default writable versions of `settings.php` and `services.yml`.
* Creates `sites/default/files`-directory.
* Latest version of drush is installed locally for use at `vendor/bin/drush`.
* Latest version of DrupalConsole is installed locally for use at `vendor/bin/drupal`.

## Updating Drupal Core

This project will attempt to keep all of your Drupal Core files up-to-date; the 
project [drupal-composer/drupal-scaffold](https://github.com/drupal-composer/drupal-scaffold) 
is used to ensure that your scaffold files are updated every time drupal/core is 
updated. If you customize any of the "scaffolding" files (commonly .htaccess), 
you may need to merge conflicts if any of your modfied files are updated in a 
new release of Drupal core.

Follow the steps below to update your core files.

1. Run `composer update drupal/core`.
1. Run `git diff` to determine if any of the scaffolding files have changed. 
   Review the files for any changes and restore any customizations to 
  `.htaccess` or `robots.txt`.
1. Commit everything all together in a single commit, so `web` will remain in
   sync with the `core` when checking out branches or running `git bisect`.
1. In the event that there are non-trivial conflicts in step 2, you may wish 
   to perform these steps on a branch, and use `git merge` to combine the 
   updated core files with your customized files. This facilitates the use 
   of a [three-way merge tool such as kdiff3](http://www.gitshah.com/2010/12/how-to-setup-kdiff-as-diff-tool-for-git.html). This setup is not necessary if your changes are simple; 
   keeping all of your modifications at the beginning or end of the file is a 
   good strategy to keep merges easy.

## Generate composer.json from existing project

With using [the "Composer Generate" drush extension](https://www.drupal.org/project/composer_generate)
you can now generate a basic `composer.json` file from an existing project. Note
that the generated `composer.json` might differ from this project's file.


## FAQ

### Should I commit the contrib modules I download

Composer recommends **no**. They provide [argumentation against but also 
workrounds if a project decides to do it anyway](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md).

### How can I apply patches to downloaded modules?

If you need to apply patches (depending on the project being modified, a pull 
request is often a better solution), you can do so with the 
[composer-patches](https://github.com/cweagans/composer-patches) plugin.

To add a patch to drupal module foobar insert the patches section in the extra 
section of composer.json:
```json
"extra": {
    "patches": {
        "drupal/foobar": {
            "Patch description": "URL to patch"
        }
    }
}
```

# Web Starter Kit

This project has been setup to use a virtual machine for local development to closely mirror the production environment. To use the the virtual machine, follow these instructions.

## Preparing your local environment

  * Latest Virtualbox -- [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads). If you are running Win 7 install 4.2.x
  * Latest Virtualbox Extension Pack -- [https://www.virtualbox.org/wiki/Downloads]. Should match your Virtualbox version
  * Vagrant (currently tested with 1.3.5 and 1.6.2) -- [http://downloads.vagrantup.com](http://downloads.vagrantup.com)


## Getting Vagrant environment set up
Starting from within the root of your project (an existing project which already has a vagrant/puppet configured or starting a new project from the Drupal Starter Project), do the following:

1. Create VM by running "vagrant up" (This step will take long (might be 5+ minutes) as all necessary components are being downloaded and installed)
  * If you get an error re-provision the VM by running "vagrant provision" to see if this resolves the issue
2. SSH into VM by running "vagrant ssh"
3. Navigate to VM docroot by running "cd /vagrant/public"
4. Install Drupal using custom install profile by running "drush si [profile] -y" and following prompts. Alterntatively, use drush aliases to synch to a development instance of a site database. 

## Troubleshooting

Occasionally some issues may occur that prevent you from loading the virtual machine. Below are some common issues that others have experienced.

### General

If the virtual machine does not boot up and you get a message saying there was a timeout, try launching the VM through the Virtualbox interface to get more detailed information.


### Macintosh machines

* If you experience errors when sharing the folder over NFS you may need to enable File Sharing in System Preferences -> Sharing
* If you receive an error about an invalid export you may need to manually delete /etc/exports file
* If you've updated to Mavericks and Virtualbox is no longer working, try the following command: sudo /Library/StartupItems/VirtualBox/VirtualBox restart
* If you are prompted to enter your password when SSHing from the VM ensure your SSH private key is in the keychain by running "ssh-add -K ~/.ssh/id_rsa" from your machine

### Linux machines

* If you experience errors when sharing the folder over NFS you may need to install the appropriate NFS packages, on Ubuntu you will need to run "sudo apt-get install nfs-kernel-server"

### Windows machines

* Virtualbox requires the Intel Virtualization Technology for Directed I/O (VT-d) be enabled, if you receive a message saying that the VM requires a 64 bit processor and you only have an i686 processor this may be the cause
* Virtualbox may trigger a Windows Firewall popup to allow ports to be shared
* If the provisioning fails with errors on ports.conf or sites.xml this may be due to CRLF issues with the configuration files, to resolve this take the following actions:
  1. git config --global --edit
  2. Add line if missing: [core]
  3. Below that line add line: autocrlf = input
* if your ssh key information does not correctly forward, you can copy your ssh private key to ~/.ssh and chmod it 700
* if git says everything is changed, it's probably the line endings issues you've most likely seen before, doing "git add -u" should just remove them from the list (and not add them to be committed)


## Drush Alias File

A sample Drush alias file has been included at /examples/drupal/site.aliases.drushrc.php . Simply copy this file into public/sites/all/drush and modify the hostnames inside it. You will be able to access the vagrant environment with 'drush @site.local', dev with 'drush @site.dev', etc. 
