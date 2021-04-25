pipeline {

    agent any

    tools {
        nodejs 'Node 14.x'
    }

    stages {

        stage("Build") {

            steps {
                sh "npm install"
            }

        }

        stage("Testing code") {

            steps {
                echo 'Code testing'
            }

        }

    }
}