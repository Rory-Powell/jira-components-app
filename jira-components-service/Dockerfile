FROM openjdk:11.0-jre
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} jira-components-service.jar
ENTRYPOINT ["java","-jar","/jira-components-service.jar"]
