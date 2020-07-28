**Continuous integration & Deployment in IBM Kubernetes service with integration of Slack platform**

This tutorial show how to setup IBM Toolchain that uses CI/CD stack to maintain and deploy  applications running on  IBM Kubernetes service and how to enhance the collaboration experience within the team by integrating Slack platform  . 


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
1. [Create Container registry](#step-3-create-container-registry)
1. [Configure Toolchain](#step-4-configure-toolchain)
1. [Verify application is up and running](#step-5-verify-application-is-up-and-running)
1. [Integrate Slack](#step-6-integrate-slack)


### Step 1. Clone the GitHub repository
1. Open your terminal and change your directory by using the `cd downloads` command. (Or any other directory in which you want to clone the project.)
1. Run the command: `git clone https://github.com/mahsankhaan/CICD-in-kubernetes.git`
1. Open the project in Visual Studio code.
1. Within VS code open terminal `Ctrl+shift+~` and go to the project directory. 
1. Run command `npm install` to install the dependencies and then run`node app.js` to check the application running successfully locally.


__NOTE:__ We've already created Dockerfile and deployment files in the project that will be used in the next few steps, please go through the file. Secondly in this tutorial, we are not focusing on how to write these two files if you want to learn more please check our complete tutorial from [here](https://github.com/marketplace) or the [video](https://www.youtube.com/watch?v=_oKqtRf0aSY) .

### Step 2. Create Kubernetes cluster
1. Login to IBM account and once you are successfully in, on the top search bar search for __Kubernetes service__ .
1. In Select a plan section, select __free__ option, then in resource details give your cluster name. Once everything is completed click on the __Create__ button on right.
1. Kindly wait for this step, it would take 10-15min to configure Kubernetes cluster.

__NOTE:__ In free plan you will get worker node of  2 vCPUs 4GB RAM.


### Step 3. Create Container registry

__NOTE__: We can skip this step and directly integrate container registry in Toolchain step but it could cause an error if your registry name is not unique.


1. Search for Container Registry from the search bar on top.
1. Click on create button.
1. Now from "Location" dropbox select __Frankurt__  region. 
1. Click on create and give some unique name, example (devops_space01)


### Step 4. Configure Toolchain

#### What is IBM Toolchain?
With IBM Toolchain, you can develop and deploy an application securely into a Kubernetes cluster managed by the IBM Cloud Kubernetes Service.The toolchain includes [Vulnerability Advisor](https://cloud.ibm.com/docs/va) to provide a secure container.

After you create the toolchain and when we push changes to our repo, the delivery pipeline automatically builds and deploys the code.

For more details on IBM Toolchain, please visit [here](https://www.ibm.com/cloud/architecture/toolchains)

Perform the following tasks:
1. On the top search bar search for __Toolchain__ . You'll be redirected to toolchain dashboard and where many ready-made toolchains are available, kindly select __Develop a Kubernetes app__
1.  Give any name to your toolchain __mytoolchain__ , "region" would be __Frankfurt__  . And in "Select a source provider" give __Git Repos and Issue Tracking__
1. Under Tool integration section, in __Source repository url__ put `https://github.com/mahsankhaan/CICD-in-kubernetes.git `
1. Select Delivery Pipeline tab and complete the fields according to below steps.

   1. App name:  mypipeline
   1. In IBM Cloud API key , click  __new__ button and a popup will open select __ok__ from there.
   1. Container registry and Cluster region both will be selected as __Frankfurt__. (Or select region where you have created             your services)
   1. Once everyhing is configured, kindly click __create__ button.
1. Once Delivery Pipeline is configured successfully, we are able to see below image:

![Delivery Pipeline](images/m3.png)


   1. __Build stage__ : If a manifest.yml file exists in the root folder, it is used to determine which buildpack to use.  

   1. __Containerize stage__: Checks for the Dockerfile in your root folder, once the image is successfully built then create                               an IBM container registry and deploy the image there.  It will check if there any        
                               vulnerabilities in the image, if there is any high warnings image will not deploy. 

   1. __Deploy stage__: Checks for cluster readiness and namespace existence, configures the cluster namespace, updates the                           __deployment.yml__ manifest file, and grants access to the private image registry.
   
    Note: In our case, we are getting a warning because we didn't activate the SSL certificate.
    
    
### Step 5. Verify application is up and running

1. On the DEPLOY stage, click __View logs and history__. 
1. Select the __Deploy to Kubernetes__ .
1. Scroll till the end of logs till you see __VIEW THE APPLICATION AT__: http://169.51.194.12:32478 (url could be different, run the url in browser and check if the application is running).

![application](images/m5.png)

1. Now let see the services running on __Kubernetes cluster__.
    1. Click on the three dots on the left, go to resources list.
    1. Under __cluster__ , open the service.
    1. Once inside the cluster from top left select __Kubernetes Dashboard__.
    1. From left under Namespaces, select __default__ .
    1. Now check the services running as __hello-app__ .

### Step 6. Integrate Slack
If you don't have slack account please create it first. From here https://slack.com/get-started#/create

1. Lets activaite slack api, please follow the below steps :
   1. Create a slack app from here https://api.slack.com/apps, __App Nam__ : IBM Toolchain , __Workspace__ : testing  (select   the workspace you created while activating your account).
   1. After creating, you'll be redirected to the settings page for your new app.
   1. From here select the __Incoming Webhooks__ feature, click the Activate Incoming Webhook and toggle to switch it __on__.
   1. Now click on __Add New Webhook to Workspace__.
   1. Pick a channel that the app will post to, and then click __allow__.
   1. You'll be sent back to your app settings, and a new entry is there under the __Webhook URLs__
 
 
1. Once slack is setup , lets integrate it with our toolchain
   1. Go back to view the list of toolchains and select your toolchain, then click on __Add a Tool__.
   1. Insert the configuration, in __webhook__ & __channel__ : webhook url (step 1 vi) and __Slack team name__: testing-raf9874.slack.com (open your slack, click your workspace name in the top left and copy the name)
   1. Once details are completed, click __create integration__ .
   1. Now our final pipleline will look like: 
   
![slack pipeline](images/s4.png)


