**Continuous integration & Deployment in IBM Kubernetes service with integration of Slack platform**

In the cloud, DevOps has become the buzzword in the industry. As enterprises move their workloads to the cloud, the need for transparency and visibility across the development and operational teams is really important so here comes the real power of Slack Platform which can help the teams collaborate and coordinate their work no matter where they are - in the field office, at home, or any where in the globe.

This tutorial show how to setup IBM Toolchain that uses CI/CD stack to maintain and deploy  applications running on  IBM Kubernetes service and how to enhance the collaboration experience within the team by integrating Slack platform  . 


## Prerequisites

To complete the steps in this tutorial, you need:
* [Create IBM Account](https://cloud.ibm.com/registration)
* [IBM Kubernetes service](https://cloud.ibm.com/kubernetes/catalog/create)
* [Slack]( https://slack.com/intl/en-ca/help/articles/206845317-Create-a-Slack-workspace)
* [Visual Studio Code](https://code.visualstudio.com/) or any IDE for local development.
* A [GitHub](https://github.com/) account and some knowledge of git commands.


## Steps

1. [Fork and Clone the GitHub repository](#step-1-fork-and-clone-the-github-repository)
1. [Create Kubernetes cluster](#step-2-create-kubernetes-cluster)
1. [Create Container registry](#step-3-create-container-registry)
1. [Configure Toolchain](#step-4-configure-toolchain)
1. [Verify application is up and running](#step-5-verify-application-is-up-and-running)
1. [Integrate Slack](#step-6-integrate-slack)
1. [Make some changes to Toolchain and check updates on Slack Platform](#step-7-make-some-changes-to-toolchain-and-check-updates-on-slack-platform)

### Step 1. Fork and Clone the GitHub repository
1. Open [repo](https://github.com/mahsankhaan/CICD-in-kubernetes-service-with-integration-of-Slack-platform) and on top right click on __Fork__  save it in your GitHub. (will be used in __Source repository url__ in step 4).
1. Open your terminal and change your directory by using the `cd downloads` command. (Or any other directory in which you want to clone the project.)
1. Run the command: `git clone https://github.com/mahsankhaan/CICD-in-kubernetes.git`
1. Move into the cloned folder and Run command `npm install` to install the dependencies and then run`node app.js` to check the application running successfully locally.


__NOTE:__ We've already created Dockerfile and deployment files in the project that will be used in the next few steps, please go through the file. Secondly in this tutorial, we are not focusing on how to write these two files if you want to learn more please check our complete tutorial from [here](https://github.com/marketplace) or the [video](https://www.youtube.com/watch?v=_oKqtRf0aSY) .

### Step 2. Create Kubernetes cluster

1. Create [IBM Kubernetes service](https://cloud.ibm.com/kubernetes/catalog/create)

![K8's](images/k1.png)


__NOTE:__ Kindly wait for this step, it would take 10-15min to configure Kubernetes cluster.


### Step 3. Create Container registry

__NOTE__: We can skip this step and directly integrate container registry in Toolchain step but it could cause an error if your registry name is not unique.


1. Search for Container Registry from the search bar on top.
1. Click on create button.
1. Now from "Location" dropbox select the closest region. In our case it is __Frankurt__  region. 
1. Click on create and give some unique name, example (devops_space01)


### Step 4. Configure Toolchain

#### What is IBM Toolchain?
With IBM Toolchain, you can develop and deploy an application securely into a Kubernetes cluster managed by the IBM Cloud Kubernetes Service.The toolchain includes [Vulnerability Advisor](https://cloud.ibm.com/docs/va) to provide a secure container.

After you create the toolchain and when we push changes to our repo, the delivery pipeline automatically builds and deploys the code.

For more details on IBM Toolchain, please visit [here](https://www.ibm.com/cloud/architecture/toolchains)

Perform the following tasks:
1. On the top search bar search for __Toolchain__ . You'll be redirected to toolchain dashboard and where many ready-made toolchains are available, kindly select __Develop a Kubernetes app__
1.  Give any name to your toolchain __mytoolchain__ , "region" would be __Frankfurt__  . And in "Select a source provider" give __Git Repos and Issue Tracking__
1. Under Tool integration section, in __Source repository url__ put your fork link, done in [step 1](#step-1-fork-and-clone-the-github-repository). In our case  `https://github.com/mahsankhaan/CICD-in-kubernetes.git ` 

   __Note:__ Kindly put your Fork URL or you will not be able to trigger the changes in IBM Toolchain.

1. Select Delivery Pipeline tab and complete the fields according to below steps.

   1. App name:  mypipeline
   1. In IBM Cloud API key , click  __new__ button and a popup will open select __ok__ from there.
   1. Container registry and Cluster region both will be selected as __Frankfurt__. (Or select region where you have created your services)
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
   1. Pick a channel that the app will post to(in our case channel is __kubernetes__), and then click __allow__.
   1. You'll be sent back to your app settings, and a new entry is there under the __Webhook URLs__
 
 
1. Once slack is setup , lets integrate it with our toolchain
   1. Go back to view the list of toolchains and select your toolchain, then click on __Add a Tool__.
   1. Insert the configuration, in __Slack webhook__ : webhook url (step 1 vi) , __Slack channel__ : kubernetes and __Slack team name__: testing-raf9874.slack.com (open your slack, click your workspace name in the top left and copy the name)
   1. Once details are completed, click __create integration__ .
   1. Now our final pipleline will look like: 
   
![slack pipeline](images/s4.png)

1. Now open  Slack platform and inside the configured channel there must be a message __Service Slack Kubernetes has been bound to toolchain.. __

### Step 7. Make some changes to Toolchain and check updates on Slack Platform
1. Open Delivery pipeline, and click on play button on __deploy__ stage.
1. Stage will start running and inside the slack platform we can verifiy the execution as below (through this everyone in the team would have better visualization on the project) 

![update on slack](images/s5.png)

### Conclusion 
In this tutorial, we learn how to work with IBM Toolchain to manage our Kubernetes Service with automated stages that eject the manual interaction of developer and operational teams. 

Secondly, learn the importance of Slack Platform in DevOps lifecycle. How to configure and integrate it with IBM Toolchain to verify and identify all the execution performed by any specific role, through which teams can enhance the collaboration experience.

In the future, DevOps team can use IBM Toolchain service for the Multi staging strategy for best practices - before deploying complete workload to the production Kubernetes cluster it could be deployed in Test Environment stage. Incase of any failures will not affect the production environment.
