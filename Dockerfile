# Use the latest Node.js LTS (Long Term Support) version
FROM node:lts

# Create and set the application directory
WORKDIR /usr/src/app

# Install dependencies (including bson)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8000

# Command to run your application
CMD ["node", "typeNodeUser.js"]
