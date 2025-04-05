# GETTING STARTED WITH DOCKER

## What is Docker?

**Docker** is an open source platform used to automatically deploy, maintain, manage and run applications in containers. **A container** is a lightweight, independence init that contains resources, libraries and necessary dependencies for an application to run in any environments, from persional computers to cloud systems.

## Benefits of Docker

1. Containerization: This is not the same as **the traditional virtual machine (VMs)**, Docker uses the containers to package their applications and running environments. The containers share kernel of the host operating systems, which helps them to be lighter and restart faster with VMs.

2. Portability: The applications run in the containers which can work uniform on the difference environments (Example: development, test, or production environments)

3. Resource efficiency: The containers is lighter than VMs because they share the OS kernel of host, they don't need to the entire operating system like VMs.

4. Isolation: Each container runs independently, without effecting each other. This makes sure that the applications or services do not conflict about dependencies, software versions or configurations.

5. Scalability: Docker supports easy scaling, especially when combined with tools like **Docker Swarm** or **Kubernetes**. We can replicate containers to handle advanced load balancing.

## Terms in Docker

1. **Container**: A application init is independent, slight, which contains the applications and every neccessary things to run itself such as resources, libraries, configurations, dependences.

2. **Image**: This is a read-only template that contains instructions for creating containers. An image is like a "blueprint" for a container.

3. **Dockerfile**: This is a text file, containing commands to build a Docker image. It defines how to install software, copy files, and environment configurations.

4. **Docker Engine**: This is Docker's core being responsible for creating, running and managing containers. It includes the **Daemon server** and **Command Line Interface (CLI)**.

5. **Docker Hub**: is a cloud stogare or repository storing and sharing Docker's images. We can download image from there such as nginx, rabbitmq,... or push our images.

6. **Repository**: is where to store the images. A repository can contain many versions of a image (It is distinguished by **tags**, Example: nginx:latest is a latest image of Nginx in repository `nginx` or nginx:1.27.4).

7. **Volume**: This is a persistent data storage mechanism in Docker. Volumes allow data to persist beyond the life of the container, avoiding data loss when the container is deleted.

8. **Network**: Network system in Docker allows containers to communicate with each other or with outside world. Network has some type such as `bridge`, `host`, `overaly`.

9. **Docker Compose**: This is a tool used to define and run multiple containers at the same time using the `docker-compose.yml` file. We usually use multiple containers or multiple services.

## How to run a container

Before we run a container in Docker then we need to download it and check it to make sure that it installed. The way to install Docker for [Windows](https://docs.docker.com/desktop/setup/install/windows-install/) and [Ubuntu](https://docs.docker.com/engine/install/ubuntu/). After we installed Docker, we can use the below command to make sure that it installed.

```bash
qctrung@QcTrung:~$ docker --version
Docker version 27.5.1, build 9f9e405
```

If the result returns is the version of Docker then we really successfully installed Docker. Now, we try to run a container with Docker, the following command is example to run a container:

```bash
docker run -d --name nginx -p 80:80 nginx:latest
```

The above command includes components:

- `docker run`: use to create and run a new container from a docker image. If the image does not exist on local then it will find on Docker Hub and try to download to your Docker repository. It replaces for this command `docker pull nginx:latest`.
- `-d`: This is a shorthand for `--detached`, which allows the container to run in the background. This means we won't see that container's logging and it won't take over the terminal windows.
- `--name nginx`: This is a flag used to set the container's name, because when we run a container without the flag `--name` then Docker will generate a random name for the container and Docker uses it as unique identification for each container.
- `-p 80:80`: This is a shorthand for `--port`, which is the flag used to map ports between the host and the container. The parameter includes 2 parts, the first part (before the `:`) is the port on the host and the second part (after the `:`) is the port on the container. This flag will connect port `80` on the host with the port `80` on the container, which will allow the host can access the Nginx through the port `80`. We can change the first part with a another port, but the second part must be `80` because this is the default configurations of Nginx.
- `nginx:latest`: This is the image name and tag, which Docker will use to create container. `nginx` is image name, `latest` is image tag, which say that we will pull the latest version of Nginx image and use it to create Nginx container.

After we run the above command, we will see the terminal as the following result. It means we run successfully a container. To check it, we open the browser and access the address [http://localhost](http://localhost) (we don's need to write the port 80 because it is the default port of any OS). If you see the website **Welcome to nginx** then you really successfully run a docker container.

```bash
qctrung@QcTrung:~$ docker run -d --name nginx -p 80:80 nginx:latest
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

Another way that you can check by the Docker command as the following command:

```bash
docker ps -a
```

The command will display all containers containing in your repository, it includes stopped containers and running containers. Why does it show all containers? Because we used the flag `-a`, which is shorthand for `--all`. Now, you will see the result as below:

```bash
qctrung@QcTrung:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS                     PORTS                NAMES
e960c3fdbe7f   ubuntu:latest   "/bin/bash"              8 seconds ago   Exited (0) 7 seconds ago                        ubuntu-os
ce8c79ea0122   nginx:latest    "/docker-entrypoint.…"   9 minutes ago   Up 9 minutes               0.0.0.0:80->80/tcp   nginx
```

As you can see that my repository has 2 containers. There are Nginx and Ubuntu, the Ubuntu container's name is `ubuntu-os` and the Nginx container's name is `nginx`. The Nginx container still is working, but the Ubuntu container exited 7 seconds ago.

Now, we will learn how to display the list images in our repository. It's quite easy, we just to run the below command:

```bash
docker images
```

It will show the images on our repository. For example:

```bash
qctrung@QcTrung:~$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    124b44bfc9cc   8 weeks ago    279MB
ubuntu       latest    72297848456d   2 months ago   117MB
```

## Build and create a container from Dockerfile
