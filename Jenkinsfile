pipeline {
    agent any

	environment {
		CI=false
	}

	stages {
        stage('Checkout') {
            steps {
				checkout scm
				echo 'Pulling... ' + env.GIT_BRANCH
				echo 'Git url: ' + scm.userRemoteConfigs[0].url
                updateGitlabCommitStatus(name: 'checkout', state: 'pending')
                updateGitlabCommitStatus(name: 'checkout', state: 'running')
			}
			post {
				failure {
					updateGitlabCommitStatus(name: 'checkout', state: 'failed')
				}
				success {
					updateGitlabCommitStatus(name: 'checkout', state: 'success')
				}
			}
        }
        stage('Build') {
            when {
				expression {
					return env.GIT_BRANCH == 'origin/develop'
				}
			}
			steps {
                updateGitlabCommitStatus(name: 'build', state: 'pending')
                sh "rm -rf dist"
                updateGitlabCommitStatus(name: 'build', state: 'running')
				nodejs(nodeJSInstallationName: 'nodejs-lts') {
					sh 'yarn'
                	sh 'yarn build:development'
				}
			}
			post {
				failure {
					updateGitlabCommitStatus(name: 'build', state: 'failed')
				}
				success {
					updateGitlabCommitStatus(name: 'build', state: 'success')
				}
			}
        }

		stage('Build Staging') {
			when {
				expression {
					return env.GIT_BRANCH == 'origin/staging'
				}
			}
			steps {
                updateGitlabCommitStatus(name: 'build', state: 'pending')
                sh "rm -rf dist"
                updateGitlabCommitStatus(name: 'build', state: 'running')
                nodejs(nodeJSInstallationName: 'nodejs-lts') {
                    sh 'yarn'
                    sh 'yarn build:staging'
                }
			}
			post {
				failure {
					updateGitlabCommitStatus(name: 'build', state: 'failed')
				}
				success {
					updateGitlabCommitStatus(name: 'build', state: 'success')
				}
			}
		}

		stage('Publish Staging') {
			when {
				expression {
					return env.GIT_BRANCH == 'origin/staging'
				}
			}
			steps {
                updateGitlabCommitStatus(name: 'deploy', state: 'running')
				dir("dist") {
					sh "zip -r ${env.WORKSPACE}/publish.zip ."
					sshagent(credentials : ['ssh-67-server']) {
						sh "ssh -p 1854 abcsoft@123.30.145.67 rm -rf /var/www/cmsMatMa/web"
						sh "ssh -p 1854 abcsoft@123.30.145.67 mkdir -p  /var/www/cmsMatMa/web"
						sh "rsync -a -e 'ssh -p 1854' ${env.WORKSPACE}/publish.zip abcsoft@123.30.145.67:/var/www/cmsMatMa/web_publish.zip"
						sh "ssh -p 1854 abcsoft@123.30.145.67 unzip  /var/www/cmsMatMa/web_publish.zip -d  /var/www/cmsMatMa/web"
                        sh "ssh -p 1854 abcsoft@123.30.145.67 chmod +x  /var/www/cmsMatMa"
                        sh "ssh -p 1854 abcsoft@123.30.145.67 chmod +x  /var/www/cmsMatMa/web"
					}
				}
			}
			post {
				failure {
					updateGitlabCommitStatus(name: 'deploy', state: 'failed')
				}
				success {
					updateGitlabCommitStatus(name: 'deploy', state: 'success')
				}
			}
		}
    }
	post {
		always {
			cleanWs()
		}
	}
}
