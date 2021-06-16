pipeline {
    
    agent none

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

            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                echo 'Checking apps.'
                dir("./backend") {
                    sh 'npm --version'
                    sh 'node --version'
                    sh 'npm install'
                    echo 'Installing Typescript'
                    sh 'npm i typescript -g'
                    echo 'Compiling'
                    sh 'tsc'
                }
            }

        }

        stage("Testing") {

            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                dir("./backend") {
                    sh 'npm --version'
                    sh 'node --version'
                    sh 'npm install'
                    sh 'npm i typescript -g'
                    sh 'tsc'
                    echo 'Starting server.'
                    sh 'node ./build/Server.js'
                }
            }

        }

        stage("Checking code") {

            agent {
                docker {
                    image 'python:3.9.5-alpine' 
                }
            }

            steps {
                echo 'Checking code..'
                sh 'py CheckCode.py backend'
            }

        }

        stage("Deploy") {

            steps {
                echo 'Find a solution here please..'
                echo 'Currently trying to solve for plesk.'
            }

        }
    }
}