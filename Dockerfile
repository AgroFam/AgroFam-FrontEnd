FROM node:16.14.2

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production


# Bundle app source
COPY . .

# Create production build
RUN npm run build

EXPOSE 3000
CMD node index.js