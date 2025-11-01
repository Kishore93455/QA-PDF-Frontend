pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            } 
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'echo "Deployment complete!"'
            }
        }
    }

    post {
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
