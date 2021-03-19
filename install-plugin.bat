REM Run as administrator
CD "%~dp0"
SET "SRC=target\sonar-example-plugin-8.1.0.jar"
SET "DST=%SONARQUBE_HOME%\extensions\plugins\sonar-example-plugin-8.1.0.jar"
IF NOT EXIST "%SRC%" EXIT /B
IF EXIST "%DST%" MOVE "%DST%" "%SONARQUBE_HOME%\extensions"
COPY "%SRC%" "%DST%"
CALL "%SONARQUBE_HOME%\bin\windows-x86-64\StopNTService.bat"
CALL "%SONARQUBE_HOME%\bin\windows-x86-64\StartNTService.bat"
PAUSE