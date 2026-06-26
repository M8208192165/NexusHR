FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

RUN apk add --no-cache maven

# Copy parent pom
COPY pom.xml ./pom.xml

# Copy all module poms (needed by parent)
COPY common/pom.xml ./common/pom.xml
COPY auth-service/pom.xml ./auth-service/pom.xml
COPY employee-service/pom.xml ./employee-service/pom.xml
COPY payroll-service/pom.xml ./payroll-service/pom.xml
COPY api-gateway/pom.xml ./api-gateway/pom.xml

# Copy only source we need
COPY common/src ./common/src
COPY auth-service/src ./auth-service/src

# Build common then auth-service only
RUN mvn install -pl common -am -DskipTests --no-transfer-progress
RUN mvn package -pl auth-service -DskipTests --no-transfer-progress

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]