# GETTING STARTED WITH DOCKER

## What is Docker?

**Docker** is an open source platform used to automatically deploy, maintain, manage and run applications in containers. **A container** is a lightweight, independence init that contains resources, libraries and necessary dependencies for an application to run in any environments, from personal computers to cloud systems.

## Benefits of Docker

1. **Containerization**: This is not the same as **the traditional virtual machine (VMs)**, Docker uses the containers to package their applications and running environments. The containers share kernel of the host operating systems, which helps them to be lighter and restart faster with VMs.

2. **Portability**: The applications run in the containers which can work uniform on the difference environments (Example: development, test, or production environments)

3. **Resource efficiency**: The containers are lighter than VMs because they share the host's OS kernel, they don't need to carry the entire operating system like VMs.

4. **Isolation**: Each container runs independently, without effecting each other. This makes sure that applications or services do not conflict about dependencies, software versions or configurations.

5. **Scalability**: Docker supports easy scaling, especially when combined with tools like **Docker Swarm** or **Kubernetes**. You can replicate containers to handle advanced load balancing.

## Terms in Docker

1. **Container**: A application init is independent, slight, which contains the applications and every necessary things to run itself such as resources, libraries, configurations, dependencies.

2. **Image**: A read-only template contains instructions for creating containers. An image is like a "blueprint" for a container.

3. **Dockerfile**: A text file contains commands to build a Docker image. It defines how to install software, copy files, and setup environment configurations.

4. **Docker Engine**: Docker's core is responsible for creating, running and managing containers. It includes the **Daemon server** and **Command Line Interface (CLI)**.

5. **Docker Hub**: Cloud storage or repository stores and shares Docker's images. We can download image from there such as nginx, rabbitmq,... or push our images.

6. **Repository**: Repository stores our images with many versions (It is distinguished by **tags**. For example: `nginx:latest` that is the latest version of Nginx in repository `nginx` or nginx:1.27.4).

7. **Volume**: This is a persistent data storage mechanism in Docker. Volumes allow data to persist beyond the life of the container, avoiding data loss when the container is deleted.

8. **Network**: Network system in Docker allows containers to communicate with each other or with outside world. Docker networks include types such as `bridge`, `host`, `overaly`.

9. **Docker Compose**: A template define, create and run multi-container applications at the same time using the `docker-compose.yml` file. We usually use it for building multiple containers or multiple services.

## How to run a container

Before running a container in Docker, you need to install and check to make sure that it installed. The guides installation Docker for [Windows](https://docs.docker.com/desktop/setup/install/windows-install/) and [Ubuntu](https://docs.docker.com/engine/install/ubuntu/) are available. After installed Docker, we can use the below command to check.

```bash
...:~$ docker --version
Docker version 27.5.1, build 9f9e405
```

If the result returns the version of Docker then you really successfully installed Docker. Now, you can run a container with Docker by the following command:

```bash
docker run -d --name nginx -p 80:80 nginx:latest
```

The above command includes components:

- `docker run`: A Docker command uses to create and run a new container from a Docker image. If the image does not exist in the local repository, Docker will find on Docker Hub and pull the image to your Docker repository. It replaces for the command `docker pull nginx:latest`.
- `-d`: A shorthand for `--detached`, this flag allows the container to run in the background which means the container won't display logs and take over the terminal window.
- `--name nginx`: A flag uses to set the container's name, when you run a container without the flag `--name`, Docker will generate a random name for the container and Docker uses it as unique identification for each container. The container name is unique.
- `-p 80:80`: A shorthand for `--port`, the flag uses to map ports between the host and the container. The parameter includes 2 parts, the first part (before the `:`) is the port on the host and the second part (after the `:`) is the port on the container. This flag will map port `80` on the host with the port `80` on the container, which will allow the host can access the Nginx through the port `80`. You can change the first part with another port, but the second part must be `80` because this is the default configurations of Nginx.
- `nginx:latest`: These are the image name and tag, Docker will use it to create container. `nginx` is image name, and `latest` is image tag. Docker will pull the latest version of Nginx image and use it to create Nginx container.

After running the above command, you will see the following result in the terminal meaning you run successfully a container. To check it, you open the browser and access [http://localhost](http://localhost) (you don's need to write the port 80 because it is the default port of any OS). If you see the **Welcome to nginx** page, you really successfully run a Nginx container.

```bash
...:~$ docker run -d --name nginx -p 80:80 nginx:latest
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
417c4bccf534: Download complete 
97f5c0f51d43: Download complete 
6e909acdb790: Download complete 
373fe654e984: Download complete 
c22eb46e871a: Download complete 
5eaa34f5b9c2: Download complete 
e7e0ca015e55: Download complete 
Digest: sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19
Status: Downloaded newer image for nginx:latest
ce8c79ea01229e24ba3380894bdc3ddd0900fd15983b5ff46c2932f6f7d83869
```

## Display list of containers and images

To display all containers on your repository, you can run the following command:

```bash
docker ps -a
```

The command will display all containers containing in your repository, it includes stopped containers and running containers. Why does it show all containers? Because the command includes the flag `-a`, which is shorthand for `--all`. Now, you will see the result as below:

```bash
...:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS                     PORTS                NAMES
e960c3fdbe7f   ubuntu:latest   "/bin/bash"              8 seconds ago   Exited (0) 7 seconds ago                        ubuntu-os
ce8c79ea0122   nginx:latest    "/docker-entrypoint.…"   9 minutes ago   Up 9 minutes               0.0.0.0:80->80/tcp   nginx
```

The above result shows that my repository has 2 containers. It includes Nginx and Ubuntu, the Ubuntu container's name is `ubuntu-os` and the Nginx container's name is `nginx`. The Nginx container still is working, but the Ubuntu container exited 7 seconds ago.

## Stop and restart a container

But how can you stop a container? Almost you should stop the containers when you don't need to use it and save the memory for the host. To stop a container, you can use the below command:

```bash
docker stop nginx
```

or

```bash
docker stop ce8
```

The parameter `ce8` is the first 3 characters in container ID, you can use the first 3 characters instead of entering all characters of container ID. The container ID also to replace for the container name. Let's try to check whether the container stopped or not.

```bash
...:~$ docker stop nginx
nginx
...:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED       STATUS                     PORTS     NAMES
e960c3fdbe7f   ubuntu:latest   "/bin/bash"              2 hours ago   Exited (0) 2 hours ago               ubuntu-os
ce8c79ea0122   nginx:latest    "/docker-entrypoint.…"   2 hours ago   Exited (0) 5 seconds ago             nginx
```

The status of Nginx container stopped 5 seconds ago. You stopped the Nginx container, but how to restart it again? You just replace the word `stop` to `start` in the container stop command.

```bash
docker start nginx
```

Well, you learned some basic command to control containers. Now, you will learn how to display the list of images in our repository. It's quite easy, you just to run the below command:

```bash
docker images
```

It will show the images on our repository. For example:

```bash
...:~$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    124b44bfc9cc   8 weeks ago    279MB
ubuntu       latest    72297848456d   2 months ago   117MB
```

## Remove a container or containers

In this section, you learn about how to delete a container or containers. Before deleting, you should check the status of containers on our repository by the following command:

```bash
...:~$ docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                        PORTS                  NAMES
028b4cc4aff5   rabbitmq:management   "docker-entrypoint.s…"   20 minutes ago   Exited (0) 5 minutes ago                             rabbitmq
6bc265b4188a   ubuntu:latest         "/bin/bash"              23 hours ago     Exited (255) 19 minutes ago   0.0.0.0:2222->22/tcp   ubuntu-os
ce8c79ea0122   nginx:latest          "/docker-entrypoint.…"   45 hours ago     Exited (0) 43 hours ago                              nginx
```

You can see that I have 3 containers RabbitMQ, Nginx and Ubuntu in our repository. Now, let us assume that I have used RabbitMQ container and I want to delete this container to save memory for the host, you can use the command below:

```bash
docker rm 6bc
```

Note: If the container is still running then you must stop it before deleting.

After you deleted, you can check the list of containers:

```bash
...:~$ docker rm 6bc
6bc
...:~$ docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                      PORTS     NAMES
028b4cc4aff5   rabbitmq:management   "docker-entrypoint.s…"   49 minutes ago   Exited (0) 47 minutes ago             rabbitmq
ce8c79ea0122   nginx:latest          "/docker-entrypoint.…"   46 hours ago     Exited (0) 44 hours ago               nginx
```

The above result shows that you successfully deleted the RabbitMQ container. To delete multi-containers you can use again the above command `rm` with multi-parameters

```bash
docker rm 028 ce8
```

```bash
...:~$ docker rm 028 ce8
028
ce8
...:~$ docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

## Delete an image or images

The way is as same as with deleting the containers, but you will use the command `docker rmi`

Note: If you want to use the shorthand for ID images then you must use the first 4 characters of ID images.

```bash
docker rmi nginx:latest
```

```bash
...:~$ docker images
REPOSITORY   TAG          IMAGE ID       CREATED        SIZE
nginx        latest       124b44bfc9cc   2 months ago   279MB
ubuntu       latest       72297848456d   2 months ago   117MB
rabbitmq     management   a0f4e8eefa82   6 months ago   414MB

...:~$ docker rmi a0f4
Untagged: rabbitmq:management
Deleted: sha256:a0f4e8eefa826f9576d596ca4b1b9168a60118a1a83768dbb5c00d8479cdbfb3

...:~$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    124b44bfc9cc   2 months ago   279MB
ubuntu       latest    72297848456d   2 months ago   117MB
```

The `rmi` command allow you deleting with multi-images:

```bash
...:~$ docker rmi 124b 7229
Untagged: nginx:latest
Deleted: sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19
Untagged: ubuntu:latest
Deleted: sha256:72297848456d5d37d1262630108ab308d3e9ec7ed1c3286a32fe09856619a782
...:~$ docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

Additionally, Docker has many commands to work with containers and images such as `docker volume`, `docker network`,... which really is difficult to remember. But if you forget any command, you can use the flag `--help` after any Docker command that will show all information about the commands and the parameters to about this command. For example: `docker run --help`.

```bash
...:~$ docker container --help

Usage:  docker container COMMAND

Manage containers

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  exec        Execute a command in a running container
  export      Export a container's filesystem as a tar archive
  inspect     Display detailed information on one or more containers
  kill        Kill one or more running containers
  logs        Fetch the logs of a container
  ls          List containers
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  prune       Remove all stopped containers
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  run         Create and run a new container from an image
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker container COMMAND --help' for more information on a command.
```

## Build and create a container from Dockerfile

Docker does not just allow us to run existing containers, which helps us to custom and build our images. Especially, we can share our images with other peoples by **Docker Hub**. To build our image, we need to write a `Dockerfile` without file extension, `Dockerfile` is a simple text file contains commands Docker use to create a new image. In other words, this is an instruction tells Docker what to do when building a new image. For example:

```Dockerfile
# Declare that our image is built based on the NodeJS image (base image)
FROM node:18

# Set the working directory in container
WORKDIR /app

# Copy the package.json file into the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy all source code into the container
COPY . .

# Expose port 3000 of the container (Depending on our application)
EXPOSE 3000

# The command runs application when the container started
CMD ["node", "index.js"]
```

The above example is a simple Dockerfile using to build an image for Node,js project. To build the Dockerfile to image, you can use the below command:

```bash
docker image build -t myweb:latest .
```

The command includes:

- `docker image`: The Docker command uses to manage the Docker image.
- `build`: The command uses to build an image from a Dockerfile.
- `-t myweb:latest`: The shorthand for `--tag` uses to set name and tag of image. The following parameter includes two parts, the first part (before the `:`) is image name, and the second part is image tag version. The tag we can use as `myweb:v1`, `myweb:1.0.0`,...
- `.`: The dot means the current context containing the Dockerfile. If you place the Dockerfile in another context then you will replace the dot with `./directoryA/directoryB/`.

Now, I will try to build a web application with Node.js, and make sure that it activate well on the host. Now, I will write a Dockerfile as:

```Dockerfile
# Use the NodeJS image from Docker Hub
FROM node:current-alpine3.20

# Setup the working directory
WORKDIR /app

# Copy the package.json file containing information of external modules are used in this project
COPY package*.json ./

# Installed external modules
RUN npm install

# The below command is used to run specific command before the containter startes, it is usually used to setup libraries for the container
# RUN apt-get install curl

# Copy all files of the project into working directory
COPY . .

# Use port 3000 of the container
EXPOSE 3000

# Run the project (Only have a CMD command in the last file, can use ENTRYPOINT with CMD)
CMD [ "npm", "start" ]
```

Because I use `Nodemon` module, the way to run the website will be a little different from the old Dockerfile. The details about the packages I use, you can read in [package.json](./package.json) file. When you test the application on the host, the folder `node_modules` will be installed, if you build the image with this folder, it will take a long time. To avoid that, you can remove or place it into the `.dockerginore` file. You can write a `.dockerignore` file and write filenames or folder names that you don't want to copy into to container, it will ignore files and folders when building image. For example:

```.dockerignore
node_modules
```

Now, I will build it by the following command:

```bash
docker image build -t myweb:latest .
```

```bash
...:~/Projects/docker-projects/getting-started$ docker image build -t myweb:latest .
[+] Building 4.3s (11/11) FINISHED                                                                                               docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                             0.0s
 => => transferring dockerfile: 709B                                                                                                             0.0s
 => [internal] load metadata for docker.io/library/node:current-alpine3.20                                                                       3.5s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                      0.0s
 => [internal] load .dockerignore                                                                                                                0.0s
 => => transferring context: 52B                                                                                                                 0.0s
 => [1/5] FROM docker.io/library/node:current-alpine3.20@sha256:45b0799541e0fa993516a147bd9c59a5c2b81ec06cfb8f6e6e18d222f2780e23                 0.0s
 => => resolve docker.io/library/node:current-alpine3.20@sha256:45b0799541e0fa993516a147bd9c59a5c2b81ec06cfb8f6e6e18d222f2780e23                 0.0s
 => [internal] load build context                                                                                                                0.0s
 => => transferring context: 21.61kB                                                                                                             0.0s
 => CACHED [2/5] WORKDIR /app                                                                                                                    0.0s
 => CACHED [3/5] COPY package*.json ./                                                                                                           0.0s
 => CACHED [4/5] RUN npm install                                                                                                                 0.0s
 => [5/5] COPY . .                                                                                                                               0.0s
 => exporting to image                                                                                                                           0.6s
 => => exporting layers                                                                                                                          0.1s
 => => exporting manifest sha256:9b93f9e77960240d481966ae6b384b9e4e07a3dec988b545410048932e73cf0e                                                0.0s
 => => exporting config sha256:ac4cd2b770b749bf34d0633989c5b0b11cca077e03ed12bdfb2d978e27638cdf                                                  0.0s
 => => exporting attestation manifest sha256:57732ca998f88768c60cc45dfaed3425f0d9f9318b819907a650b130ff991f6b                                    0.0s
 => => exporting manifest list sha256:d3dccbe289a08ed76a0e494c370d0ed4c6ed4020930b9da074c55190081d02b9                                           0.0s
 => => naming to docker.io/library/myweb:latest                                                                                                  0.0s
 => => unpacking to docker.io/library/myweb:latest                                                                                               0.4s
```

Now, I will check the existing images on my repository:

```bash
...:~/Projects/docker-projects/getting-started$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
myweb        latest    d3dccbe289a0   6 minutes ago   249MB
ubuntu       latest    1e622c5f073b   6 days ago      117MB
```

You will see my repository containing the image `myweb` with `latest` tag, I will build it to container:

```bash
...:~/Projects/docker-projects/getting-started$ docker run -d --name myweb -p 3000:3000 myweb
99b748d812a27066c4118a5b032a72675b51943e0f273fbc942ebba2e8e93b36
...:~/Projects/docker-projects/getting-started$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS              PORTS                    NAMES
99b748d812a2   myweb     "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp   myweb
```

Now I will access the [http://localhost:3000](http://localhost:3000) and see my website.

## Run multi-containers with Docker Compose

In previous sections, you learned how to run a container from an existing image and how to build and run a custom image with a Dockerfile. However, that only runs one container, on a real project you need to detach our project to small services such as frontend service (or container), backend service, database service,... so you have to use the running container command many times. Instead, Docker provides Docker Compose, that is the tools will help us run and manage multi-containers in union
