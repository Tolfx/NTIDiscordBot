pipeline {
    
    agent {
        docker {
            image 'node:14-alpine'
        }
    }

    stages {

        stage("Build") {

            steps {
                echo 'Checking nodejs stuff.'
                sh 'npm --version'
                sh 'node --version'
                sh 'npm install'
                sh 'npm i typescript -g'
                sh 'tsc'
            }

        }

        stage("Testing") {

            steps {
                echo 'Starting server.'
                sh 'node ./Build/Server.js'
            }

        }

    }
}