pipeline {
    
    agent {
        docker {
            image 'node:14-alpine'
        }
    }

    environment {
        DISCORD_TOKEN=credentials('DISCORD_TOKEN')
        SECRETAUTH=credentials('SECRETAUTH')
        DISCORD_CLIENT_ID=credentials('DISCORD_CLIENT_ID')
        DISCORD_CLIENT_SECRET=credentials('DISCORD_CLIENT_SECRET')
        MONGODB_URL=credentials('MONGODB_URL')
        JENKINS=true
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
                sh 'node ./build/Server.js'
            }

        }

    }
}