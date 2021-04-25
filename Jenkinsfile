pipeline {
    
    agent any

    stages {

        stage("Build") {

            steps {
                nodejs(nodeJSInstallationName: 'Node 14.x') {
                    sh 'npm install'
                }
            }

        }

        stage("Testing code") {

            steps {
                echo 'Code testing'
            }

        }

    }
}