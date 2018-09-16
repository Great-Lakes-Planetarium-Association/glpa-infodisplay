# Introduction

The `glpa-infodisplay` package is a [NodeCG](http://github.com/nodecg/nodecg) bundle.  The package is used at the annual [GLPA](https://www.glpa.org) conference to display information between sessions.

# Components
## Server
Since `glpa-infodisplay` is a NodeCG package the standard NodeCG environment applies.  There will be a system running NodeJS, have the NodeCG and required libraries installed, and have this bundle installed.  This system will generate a HTML page that will be loaded by the client.
## Client
The client can be any device capable of rendering the web page output.  There are some specific requirements we have determined are necessary.  We have run the client on a Raspberry Pi 2 with Chromium.  There are a number of adjustments that need to be made to Chromium on the RPI to have acceptable performance.

*todo: document those Chromium requirements*

# Installation
The installation guide only covers the NodeCG server portion of the setup, since the client is simply a web browser capable of rendering the page.

## Requirements
`glpa-infodisplay` requires a working NodeCG environment.  All requirements for NodeCG are also required for `glpa-infodisplay`.  As of this writing, those requirements are:

* Node.js 8.3+
* npm 2.0+

### Node Modules
NodeCG and this bundle make use of the following Node.JS modules:

* pm2 - Run NodeCG as a background service task
* bower - front-end package management tool.  
  Note: it is recommended to still use bower despite it being deprecated.  Polymer still requires bower usage and therefore using yarn adds additional, unnecessary complexity.
* nodecg-cli - NodeCG utility for installing bundles and creating a default bundle configuration.


## Windows
### Chocolatey
Chocolatey is a Windows package manager which can be used to download and install software.  This is an optional step, but the following setup commands assume Chocolatey is present.  If you do not use Chocolatey, you will need to obtain and install the packages through alternative means.

To install Chocolatey, open a PowerShell administrative command prompt and run:

```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

### Install Components
Install Node.JS and git:

```
choco install NodeJS git -y
```

### Install NodeCG
```
npm install -g bower pm2
mkdir C:\NodeCG\
cd C:\NodeCG
git clone https://github.com/nodecg/nodecg.git .
npm install --production
bower install
```

### Install the `glpa-infodisplay` bundle
```
nodecg install bitbucket:username/glpa-infodisplay
```

This completes the installation.  You will now need to configure the bundle.

# Configuration Manifest
The `glpa-infodisplay` bundle requires a .json configuration file which includes things such as the conference name, Twitter API keys, and other authentication strings.  Since these are unique/private, this file is not stored in the repository.  However, a sample file, `glpa-infodisplay.json.sample`, has been provided.  Make a local copy of this file named `glpa-infodisplay.json` and edit it as necessary.  For a complete description of the config file, review the [Configuration](Documentation/CONFIGURATION.md) document.

Additionally, you can review the NodeCG documentation on a [package.json manifest](https://nodecg.com/tutorial-5_manifest.html).

# Running NodeCG
## Console Window
You can run the NodeCG service in a console window.  Note that if the window is closed NodeCG will be terminated.

```
cd C:\NodeCG\
node index.js
```

## PM2
Using P2 you can run NodeCG as a background process/service.

```
# Start
pm2 start C:\NodeCG\index.js

# Stop
pm2 stop <pid>

# Reload
pm2 reload <pid>

# Get logs
pm2 logs --lines <n> <pid>
```