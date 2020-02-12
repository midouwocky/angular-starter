
def remoteTechin = [:]
remoteTechin.name = "node"
remoteTechin.host = "167.86.73.202"
remoteTechin.allowAnyHosts = true
def registry = "167.86.73.202:8083/registry/techinstinct"
def registryLogin= "admin";
def registryPasswod="ce7ecaa1df3b401a84ed01cbb7380b19"
node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('build docker image, tag it and push it'){
      def dockerHome = tool 'myDocker'
      env.PATH = "${dockerHome}/bin:${env.PATH}"
      sh "docker --version"

      def nodeHome = tool 'node12'
      env.PATH = "${nodeHome}/bin:${env.PATH}"

      def packageJSON = readJSON file: 'package.json'
      def VERSION = packageJSON.version
      echo "app version ${VERSION}"
      sh "docker build  -t ${registry}/angular-starter ."
      sh "docker tag ${registry}/angular-starter ${registry}/angular-starter:${VERSION}-SNAPSHOT"
    //   sh "docker login -u ${registryLogin} -p ${registryPasswod} ${registry}"
    //   sh "docker push ${registry}/angular-starter"
    }
    // stage('(Re)run angular-starter'){
        
    //     withCredentials([usernamePassword(credentialsId: 'techin-server', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {            
    //         remoteTechin.user=USERNAME;
    //         remoteTechin.password=PASSWORD;
    //         sshCommand remote: remoteTechin, command: "cd ~/databiz && docker-compose pull angular-starter && docker-compose up --force-recreate -d angular-starter"
    //      }
    //  }
  }
  catch (e) {
    // If there was an exception thrown, the build failed
    currentBuild.result = "FAILED"
    throw e
  } finally {
    // Success or failure, always send notifications
    notifyBuild(currentBuild.result)
  }
}


def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (color: colorCode, message: summary)
}