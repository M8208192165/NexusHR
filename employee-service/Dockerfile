FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

RUN apk add --no-cache maven

COPY pom.xml ./pom.xml
COPY common/pom.xml ./common/pom.xml
COPY common/src ./common/src
COPY employee-service/pom.xml ./employee-service/pom.xml
COPY employee-service/src ./employee-service/src
COPY auth-service/pom.xml ./auth-service/pom.xml
COPY payroll-service/pom.xml ./payroll-service/pom.xml
COPY api-gateway/pom.xml ./api-gateway/pom.xml

RUN mvn install -pl common -am -DskipTests --no-transfer-progress
RUN mvn package -pl employee-service -DskipTests --no-transfer-progress

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/employee-service/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]