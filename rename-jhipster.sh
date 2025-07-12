#!/bin/bash

# Usage: ./rename-jhipster.sh com.oldpackage.app com.newpackage.project oldappname newprojectname

if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <old.package.name> <new.package.name> <oldAppName> <newAppName>"
    exit 1
fi

OLD_PACKAGE=$1
NEW_PACKAGE=$2
OLD_APP=$3
NEW_APP=$4

# Convert packages to paths
OLD_PATH=${OLD_PACKAGE//./\/}
NEW_PATH=${NEW_PACKAGE//./\/}

echo "🔁 Renaming Java package from $OLD_PACKAGE to $NEW_PACKAGE"

# Rename package directories
mkdir -p src/main/java/$NEW_PATH
mkdir -p src/test/java/$NEW_PATH

# Move Java source files
find src/main/java/$OLD_PATH -type f -exec mv {} src/main/java/$NEW_PATH/ \;
find src/test/java/$OLD_PATH -type f -exec mv {} src/test/java/$NEW_PATH/ \;

# Delete old package directories
rm -rf src/main/java/$(echo $OLD_PATH | cut -d/ -f1-2)
rm -rf src/test/java/$(echo $OLD_PATH | cut -d/ -f1-2)

# Replace package declarations in Java files
echo "✏️ Updating package names in Java files"
find src -type f -name "*.java" -exec sed -i "s|$OLD_PACKAGE|$NEW_PACKAGE|g" {} +

# Update package in .yo-rc.json
sed -i "s|\"packageName\": \"$OLD_PACKAGE\"|\"packageName\": \"$NEW_PACKAGE\"|g" .yo-rc.json

# Update baseName in .yo-rc.json
sed -i "s|\"baseName\": \"$OLD_APP\"|\"baseName\": \"$NEW_APP\"|g" .yo-rc.json

# Update pom.xml or build.gradle
if [ -f "pom.xml" ]; then
    echo "🔧 Updating pom.xml"
    sed -i "s|<artifactId>$OLD_APP</artifactId>|<artifactId>$NEW_APP</artifactId>|g" pom.xml
    sed -i "s|<name>$OLD_APP</name>|<name>$NEW_APP</name>|g" pom.xml
fi

if [ -f "settings.gradle" ]; then
    echo "🔧 Updating settings.gradle"
    sed -i "s|rootProject.name = '$OLD_APP'|rootProject.name = '$NEW_APP'|g" settings.gradle
fi

# Update frontend config
if [ -f "package.json" ]; then
    echo "📝 Updating package.json"
    sed -i "s|\"name\": \"$OLD_APP\"|\"name\": \"$NEW_APP\"|g" package.json
fi

# Update Angular project (if exists)
if [ -f "angular.json" ]; then
    sed -i "s|$OLD_APP|$NEW_APP|g" angular.json
fi

# Clean and rebuild
echo "🧹 Cleaning and rebuilding the project"
./mvnw clean install || ./gradlew clean build
npm install && npm run build || echo "⚠️ Frontend build skipped or failed"

echo "✅ Rename complete: $OLD_APP → $NEW_APP"
