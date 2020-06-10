**Continuous integration & Deployment in IBM Kubernetes service**


This tutorial show how to setup CI/CD for applications running on the Kubernetes service and how to enhance the colloboration expereince within the team by integrating  Slack platform . 


## Architecture 

![Architecture diagram of CI/CD](images/m1.png)


## Prerequisites

To complete the steps in this tutorial, you need:
* [Create IBM Account](link)
* [Docker](https://docs.docker.com/install/) on your local computer. (optional)
* [IBM CLI](https://docs.docker.com/install/).
* [Visual Studio Code](https://code.visualstudio.com/) for local development.
* A [GitHub](https://github.com/) account and some knowledge of git commands.


## Steps

1. [Clone the GitHub repository](#step-1-clone-the-github-repository)
1. [Create Kubernetes cluster](#step-2-create-kubernetes-cluster)
1. [Configure Toolchain](#step-3-configure-toolchain)

### Step 1. Clone the GitHub repository
1. Open your terminal and change your directory by using the `cd downloads` command. (Or any other directory in which you want to clone the project.)
1. Run the command: `git clone https://github.com/mahsankhaan/CICD-in-kubernetes.git`.
1. Open the project in Visual Studio code.
1. Within VS code open terminal `Ctrl+shift+~` and Run command `node app.js` to check the application running successfully locally.


__NOTE:__ We've already created Dockerfile and deployment files in the project that will be used in the next few steps, please go through the file. Secondly in this tutorial, we are not focusing on how to write these two files if you want to learn more please check our complete tutorial from [here](https://github.com/marketplace) or the [video](https://www.youtube.com/watch?v=_oKqtRf0aSY) .

### Step 2. Create Kubernetes cluster
1. Login to IBM account and once you are successfully in, on the top search bar search for __Kubernetes service__ .
1. In Select a plan section, select __free__ option, then in resource details give your cluster name. Once everything is completed click on the __Create__ button on right.
1. Kindly wait for this step, it would take 10-15min to configure Kubernetes cluster.

__NOTE:__ In free plan you will get worker node of  2 vCPUs 4GB RAM.


### Step 3. Configure Toolchain

#### What is IBM Toolchain?
With IBM Toolchain, you can develop and deploy an application securely into a Kubernetes cluster managed by the IBM Cloud Kubernetes Service.The toolchain includes [Vulnerability Advisor](https://cloud.ibm.com/docs/va) to provide a secure container.

After you create the toolchain and when we push changes to our repo, the delivery pipeline automatically builds and deploys the code.

For more details on IBM Toolchain, please visit [here](https://www.ibm.com/cloud/architecture/toolchains)

Perform the following tasks:
1. On the top search bar search for __Toolchain__ . You'll be redirected to toolchain dashboard and where many ready-made toolchains are available, kindly select __Develop a Kubernetes app__
1.  Give any name to your toolchain __Mytoolchain__ , "region" would be __frankfurt__  . And in "Select a source provider" give __Git Repos and Issue Tracking__
1. Under Tool integration section, in __Source repository url__ put `https://github.com/mahsankhaan/CICD-in-kubernetes.git `
1. Select Delivery Pipeline tab and complete the fields according to below steps.

   1. App name:  mytoolchain
   1. In IBM Cloud API key , click  __new__ button and a popup will open select __ok__ from there.
   1. Container registry namespace: mynamepsace (Try to put unique name)
   1. Once everyhing is configured, kindly click __create__ button.
1. Once Toolchain is configured successfully
   