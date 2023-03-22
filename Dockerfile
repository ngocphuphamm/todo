FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Set environment variables
ENV DB_HOST=194.163.180.21
ENV DB_PORT=13306
ENV DB_USERNAME=root
ENV DB_PASSWORD=123456@
ENV DB_NAME=todolist

ENV REDIS_HOST=194.163.180.21
ENV REDIS_PORT=6379
ENV REDIS_DB=4
ENV REDIS_PASSWORD=YX4DGATNW/1oxhBSN+2svARAoRMC8VZCT0ODH9vt3VZxbIEyiAnR54MYWbBVtgGkf/HgFhTRTB5byv1a
ENV REDIS_PRIFIX=redis
ENV REDIS_URL=redis://194.163.180.21:6379
ENV REDIS_KEY=YX4DGATNW/1oxhBSN+2svARAoRMC8VZCT0ODH9vt3VZxbIEyiAnR54MYWbBVtgGkf/HgFhTRTB5byv1a

# Expose port
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
