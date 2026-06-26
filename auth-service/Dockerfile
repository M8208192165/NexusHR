FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY common/pom.xml common/pom.xml
COPY common/src common/src
COPY auth-service/pom.xml auth-service/pom.xml
COPY auth-service/src auth-service/src
RUN apk add --no-cache maven
RUN mvn install -pl common -am -DskipTests
RUN mvn package -pl auth-service -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]