pipeline {
    agent any

    stages {
        stage('Verify Trigger') {
            steps {
                echo '✅ Jenkins pipeline triggered successfully from GitHub webhook!'
            }
        }
    }

    post {
        success {
            echo '🎯 Pipeline finished successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
