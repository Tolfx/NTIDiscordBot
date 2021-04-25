pipeline {
    
    agent any

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