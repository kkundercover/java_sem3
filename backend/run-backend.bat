@echo off
set "PATH=%USERPROFILE%\.maven\apache-maven-3.9.6\bin;%PATH%"
echo Starting Spring Boot Backend on http://localhost:8080...
mvn spring-boot:run
pause
