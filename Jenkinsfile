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
            }

        }

        stage("Testing code") {

            steps {
                echo 'Code testing'
            }

        }

    }
}