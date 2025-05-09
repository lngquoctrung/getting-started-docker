# **GETTING STARTED WITH DOCKER**

----------------------

## **0. What is Docker?**

**Docker** is an open source platform used to automatically deploy, maintain, manage, and run applications in containers. **A container** is a lightweight, independence init that contains resources, libraries, and necessary dependencies for an application to run in any environments, from personal computers to cloud systems.

----------------------

## **1. Benefits of Docker**

1. **Containerization**: This is different from **the traditional virtual machine (VMs)**, Docker uses the containers to package their applications and running environments. The containers share kernel of the host operating systems, which helps them to be lighter and restart faster with VMs.

2. **Portability**: The applications run in the containers which can work uniformly in the different environments (Example: development, test, or production environments)

3. **Resource efficiency**: The containers are lighter than VMs because they share the host's OS kernel, they don't need to carry the entire operating system like VMs.

4. **Isolation**: Each container runs independently, without effecting each other. This makes sure that applications or services do not conflict about dependencies, software versions, or configurations.

5. **Scalability**: Docker supports easy scaling, especially when combined with tools like **Docker Swarm** or **Kubernetes**. You can replicate containers to handle advanced load balancing.

----------------------

## **2. Terms in Docker**

1. **Container**: An application init is independent, slight, which contains the applications and every necessary thing to run itself such as resources, libraries, configurations, dependencies.

2. **Image**: A read-only template contains instructions for creating containers. An image is like a _"blueprint"_ for a container.

3. **Dockerfile**: A text file contains commands to build a Docker image. It defines how to install software, copy files, and setup environment configurations.

4. **Docker Engine**: Docker's core is responsible for creating, running, and managing containers. It includes the **Daemon server** and **Command Line Interface (CLI)**.

5. **Docker Hub**: Cloud storage or repository stores and shares Docker's images. We can download image from there such as nginx, rabbitmq, ... or push our images.

6. **Repository**: Repository stores our images with many versions (It is distinguished by **tags**. For example: `nginx:latest` that is the latest version of Nginx in repository `nginx` or `nginx:1.27.4`).

7. **Volume**: This is a persistent data storage mechanism in Docker. Volumes allow data to persist beyond the life of the container, avoiding data loss when the container is deleted.

8. **Network**: A network system in Docker allows containers to communicate with each other or with the outside world. Docker networks include types such as `bridge`, `host`, `overaly`.

9. **Docker Compose**: A template define, create and run multi-container applications at the same time using the `docker-compose.yml` file. We usually use it for building multiple containers or multiple services.

----------------------

## **3. How to run a container**

Before running a container in Docker, you need to install and check to make sure that it is installed. The guides installation Docker for [Windows](https://docs.docker.com/desktop/setup/install/windows-install/) and [Ubuntu](https://docs.docker.com/engine/install/ubuntu/) are available. After installing Docker, we can use the below command to check.

```shell
...:~$ docker --version
Docker version 27.5.1, build 9f9e405
```

If the result returns the version of Docker, then you really successfully installed Docker. Now, you can run a container with Docker by the following command:

```shell
docker run -d --name nginx -p 80:80 nginx:latest
```

The above command includes components:

- `docker run`: A Docker command uses to create and run a new container from a Docker image. If the image does not exist in the local repository, Docker will find it on Docker Hub and pull the image to your Docker repository. It replaces for the command `docker pull nginx:latest`.
- `-d`: Shorthand for `--detached`, this flag allows the container to run in the background, which means the container won't display logs and take over the terminal window.
- `--name nginx`: A flag uses to set the container's name, when you run a container without the flag `--name`, Docker will generate a random name for the container and Docker uses it as unique identification for each container. The container name is unique.
- `-p 80:80`: A shorthand for `--port`, the flag uses to map ports between the host and the container. The parameter includes two parts, the first part (before the `:`) is the port on the host and the second part (after the `:`) is the port on the container. This flag will map port `80` on the host with the port `80` on the container, which will allow the host can access the Nginx through the port `80`. You can change the first part with another port, but the second part must be `80` because this is the default configurations of Nginx.
- `nginx:latest`: These are the image name and tag, Docker will use it to create container. `nginx` is image name, and `latest` is image tag. Docker will pull the latest version of the Nginx image and use it to create a container.

After running the above command, you will see the following result in the terminal, meaning you successfully run a container. To check it, you open the browser and access [http://localhost](http://localhost) (you don's need to write port 80 because it is the default port of any OS). If you see the **Welcome to nginx** page, you really successfully run a Nginx container.

```shell
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

----------------------

## **4. Display a list of containers and images**

### **4.1 Display a list of containers**

To display all containers in your repository, you can run the following command:

```shell
docker ps -a
```

The command will display all containers contained in your repository; it includes stopped containers and running containers. Why does it show all containers? Because the command includes the flag `-a`, which is shorthand for `--all`, if you use the above command without the flag `-a`, it will only display running containers. Now, you will see the result as below:

```shell
...:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS                     PORTS                NAMES
e960c3fdbe7f   ubuntu:latest   "/bin/bash"              8 seconds ago   Exited (0) 7 seconds ago                        ubuntu-os
ce8c79ea0122   nginx:latest    "/docker-entrypoint.…"   9 minutes ago   Up 9 minutes               0.0.0.0:80->80/tcp   nginx
```

The above result shows that my repository has two containers. It includes Nginx and Ubuntu, the Ubuntu container's name is `ubuntu-os` and the Nginx container's name is `nginx`. The Nginx container still is working, but the Ubuntu container exited 7 seconds ago.

### **4.2 Display a list of images**

Now, you will learn how to display the list of images in our repository. It's quite easy, you just to run the below command:

```shell
docker images
```

It will show the images on our repository. For example:

```shell
...:~$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    124b44bfc9cc   8 weeks ago    279MB
ubuntu       latest    72297848456d   2 months ago   117MB
```

----------------------

## **5. Stop and restart a container**

But how can you stop a container? Almost you should stop the containers when you don't need to use it and save the memory for the host. To stop a container, you can use the below command:

```shell
docker stop <container_name or container_id>
```

For example:

```shell
docker stop nginx
```

or

```shell
docker stop ce8
```

The parameter `ce8` is the first three characters in container ID, you can use the first three characters instead of entering all characters of container ID. The container ID also to replace it for the container name. Let's try to check whether the container stopped or not.

```shell
...:~$ docker stop nginx
nginx
...:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED       STATUS                     PORTS     NAMES
e960c3fdbe7f   ubuntu:latest   "/bin/bash"              2 hours ago   Exited (0) 2 hours ago               ubuntu-os
ce8c79ea0122   nginx:latest    "/docker-entrypoint.…"   2 hours ago   Exited (0) 5 seconds ago             nginx
```

The status of the Nginx container stopped 5 seconds ago. You stopped the Nginx container, but how to restart it again? You replace the word `stop` to `start` in the container stop command.

```shell
docker start nginx
```

----------------------

## **6. Remove a container or containers**

In this section, you learn about how to delete a container or containers. Before deleting, you should check the status of containers on our repository by the following command:

```shell
...:~$ docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                        PORTS                  NAMES
028b4cc4aff5   rabbitmq:management   "docker-entrypoint.s…"   20 minutes ago   Exited (0) 5 minutes ago                             rabbitmq
6bc265b4188a   ubuntu:latest         "/bin/bash"              23 hours ago     Exited (255) 19 minutes ago   0.0.0.0:2222->22/tcp   ubuntu-os
ce8c79ea0122   nginx:latest          "/docker-entrypoint.…"   45 hours ago     Exited (0) 43 hours ago                              nginx
```

You can see that I have three containers RabbitMQ, Nginx, and Ubuntu in our repository. Now, let us assume that I have used RabbitMQ container and I want to delete this container to save memory for the host; you can use the command below:

```shell
docker stop <container_name or container_id>
```

For example:

```shell
docker rm 6bc
```

Note: If the container is still running, then you must stop it before deleting.

After you deleted, you can check the list of containers:

```shell
...:~$ docker rm 6bc
6bc
...:~$ docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                      PORTS     NAMES
028b4cc4aff5   rabbitmq:management   "docker-entrypoint.s…"   49 minutes ago   Exited (0) 47 minutes ago             rabbitmq
ce8c79ea0122   nginx:latest          "/docker-entrypoint.…"   46 hours ago     Exited (0) 44 hours ago               nginx
```

The above result shows that you successfully deleted the RabbitMQ container. To delete multi-containers, you can use again the above command `rm` with multi-parameters

```shell
docker rm 028 ce8
```

```shell
...:~$ docker rm 028 ce8
028
ce8
...:~$ docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

----------------------

## **7. Delete an image or images**

The way is as same as with deleting the containers, but you will use the command `docker rmi`

```shell
docker rmi <image_name or image_id>
```

Note: If you want to use the shorthand for ID images, then you must use the first four characters of ID images.

For example:

```shell
docker rmi nginx:latest
```

```shell
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

```shell
...:~$ docker rmi 124b 7229
Untagged: nginx:latest
Deleted: sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19
Untagged: ubuntu:latest
Deleted: sha256:72297848456d5d37d1262630108ab308d3e9ec7ed1c3286a32fe09856619a782
...:~$ docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

Additionally, Docker has many commands to work with containers and images such as `docker volume`, `docker network`,... which really is challenging to remember. But if you forget any command, you can use the flag `--help` after any Docker command that will show all information about the commands and the parameters to about this command. For example: `docker run --help`.

```shell
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

----------------------

## **8. Containers communicate with each other via Docker Network**

Now that we understand how Docker containers work as independent units to deploy applications, the next important element to explore is how these containers communicate with each other and with the outside world. That’s where the Docker network comes in – a core component that manages and configures networking in a containerized environment. Docker networks not only help containers “see” each other, but also ensure flexibility, security, and performance in internal and external communication.

**Docker Network**: is mechanism in Docker to manage and configure network connection between each container, containers and the host, or containers and external network (Internet). It provides a network abstraction layer, which helps containers to work as independent entities with private IP address, and at the same time controlling the way they communicate. Below subsections are details about aspects of Docker Network.

But if you want to display networks containing on your **Docker Engine**, you can use the following command:

```shell
docker network list
```

For example:

```shell
...:~$ docker network list
NETWORK ID     NAME      DRIVER    SCOPE
02cd4e6f3b24   bridge    bridge    local
1d0e1fa0d1f2   host      host      local
194034d92605   none      null      local
```

### **8.1 Bridge Network**

**Bridge network** is default network when you run a container without specifying network. Containers in bridge network are assigned a private IP address in **a private subnet**.

Docker creates a _"connection bridge"_ on the host, called `docker0`. Containers on the same bridge network can communicate with each other via IP address or container name **(Docker provides private DNS - on the default `bridge` network this doesn't work - you'll have to ping by IP)**. Containers are isolated from external network, unless you map port by `-p` or `--publish`. We often use it for simple applications or when containers on same network cluster need to communicate. For example, a web server container and a database container.

> Note: When you run a container without specifying a network, the container will be assigned the default `bridge` network, and pinging by container name will not work.

Before coming to bridge network examples, you can show the IP address of the default gateway `docker0` on your Docker Engine by below command:

With **Windows**:

```shell
ipconfig
```

With **Ubuntu**:

```shell
ip a
```

For example:

```shell
...:~$ ip a
...
4: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:ca:39:d0:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
```

Now, you will run an Ubuntu container without specifying `bridge` network and an Ubuntu container with specifying network `bridge` as the following command:

```shell
docker run -dit --hostname ubuntu1 --name ubuntu1 ubuntu:latest
docker run -dit --hostname ubuntu2 --name ubuntu2 --network bridge ubuntu:latest
```

After running successfully, you can display in detail any container configuration by following command:

```shell
docker inspect <container_name or container_id>
```

For example:

```shell
...:~$ docker inspect ubuntu1
[
        ...
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "1e8b5d8b787006f76709a5c897e5ed25dec5f662c359e2addc7fbcf80241830f",
            "SandboxKey": "/var/run/docker/netns/1e8b5d8b7870",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "b557314c973bb132f6de5d511bd0a36a0c942ad47bf556e6980586b8b805051a",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "9a:e0:a8:ef:15:28",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "9a:e0:a8:ef:15:28",
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "a3bc18a678322d77f38477e13e35a3e23654cfe51dd17ffe193ac1b2fb600c75",
                    "EndpointID": "b557314c973bb132f6de5d511bd0a36a0c942ad47bf556e6980586b8b805051a",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
        }
    }
]
```

Although `ubuntu1` is run without network configuration, it still has **bridge network** and IP address is private IP address of subnet `docker0`, same and you can also check with `ubuntu2`. As mentioned above, because these containers will be in the same subnet, they can ping each other via private IP address. To do that, you can access any container and try to ping the other container address using the command `ping <ip_address>` to test the connection, to access the Ubuntu container you can use the command below:

```shell
docker exec -it <container_name or container_id> bash
```

The flag `-it` is shorthand for `--interactive` and `--tty`. `--interactive` keeps stdin open, allowing you to enter commands into the container, `--tty` provides a virtual TTY[^1] (like a terminal), giving you the same experience as working on a normal terminal.

After accessing `ubuntu1` container, the first step you need to install library `iputils-ping` to use `ping` command. The second step, you try to ping to `ubuntu2` container as the following commands:

```shell
...:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND       CREATED        STATUS                        PORTS     NAMES
895f23808314   ubuntu:latest   "/bin/bash"   31 hours ago   Exited (255) 38 seconds ago             ubuntu2
6a293f9caec8   ubuntu:latest   "/bin/bash"   31 hours ago   Exited (255) 38 seconds ago             ubuntu1

...:~$ docker container start ubuntu1 ubuntu2
ubuntu1
ubuntu2

...:~$ docker exec -it ubuntu1 bash

root@ubuntu1:/# apt update > /dev/null 2>&1 && apt upgrade -y > /dev/null 2>&1

root@ubuntu1:/# apt install -y iputils-ping > /dev/null 2>&1

root@ubuntu1:/# ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.178 ms
64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.138 ms
64 bytes from 172.17.0.3: icmp_seq=3 ttl=64 time=0.075 ms
64 bytes from 172.17.0.3: icmp_seq=4 ttl=64 time=0.081 ms
64 bytes from 172.17.0.3: icmp_seq=5 ttl=64 time=0.082 ms
64 bytes from 172.17.0.3: icmp_seq=6 ttl=64 time=0.076 ms
64 bytes from 172.17.0.3: icmp_seq=7 ttl=64 time=0.095 ms
64 bytes from 172.17.0.3: icmp_seq=8 ttl=64 time=0.094 ms
^C
--- 172.17.0.3 ping statistics ---
8 packets transmitted, 8 received, 0% packet loss, time 7202ms
rtt min/avg/max/mdev = 0.075/0.102/0.178/0.034 ms
```

As you can see, the ping result returned is successful, which means that containers in the same subnet `docker0` can ping each other. However, you cannot use the default bridge network for all containers, you need to separate them for easy management. Suppose you have a website project that needs to use the database, then determining the IP address of the database to connect to it is not feasible, because the IP address can change every time you make adjustments to the containers, at this time you need to create a separate bridge network and Docker will support you to ping a container by the container name, this will overcome the problem of determining the IP address of a container when using the default bridge network. To create a separate bridge network, you use the following command:

```shell
docker network create --driver bridge <network_name>
```

You may not need to add the `--driver bridge` flag because the default driver assigned will be a bridge network. For example:

```shell
...:~$ docker network create mynetwork
893f0b3813fef02f8d70e935249bd1ed2eddd982a4006cfa03f68a4ea7061a46

...:~$ docker network list
NETWORK ID     NAME        DRIVER    SCOPE
a3bc18a67832   bridge      bridge    local
1d0e1fa0d1f2   host        host      local
893f0b3813fe   mynetwork   bridge    local
194034d92605   none        null      local
```

When you create a bridge network, it will be a separate subnet completely separate from `docker0`, it will have its own subnet and have the same default gateway address as `docker0` which is `172.17.0.1`, and the special thing is that it allows you to ping the container in this network through the container name. Delete the two old containers and recreate them with the network configuration as the network you just created as the example below:

```shell
...:~$ docker container rm ubuntu1 ubuntu2
ubuntu1
ubuntu2

...:~$ docker run -dit --hostname ubuntu1 --name ubuntu1 --network mynetwork ubuntu:latest
9e8230e067d75a7d9f43c5eb50a4094e1e15a9c46546d2116bc07d5929a9569e

...:~$ docker run -dit --hostname ubuntu2 --name ubuntu2 --network mynetwork ubuntu:latest
44270dc256f04fcd1e1f9818ae03e3ad1b0392b1ba65dfe2b885eacd414debb0

...:~$ docker exec -it ubuntu1 bash

root@ubuntu1:/# apt update > /dev/null 2>&1 && apt upgrade -y > /dev/null 2>&1 && apt install -y iputils-ping > /dev/null 2>&1
root@ubuntu1:/# ping ubuntu2
PING ubuntu2 (172.18.0.3) 56(84) bytes of data.
64 bytes from ubuntu2.mynetwork (172.18.0.3): icmp_seq=1 ttl=64 time=0.138 ms
64 bytes from ubuntu2.mynetwork (172.18.0.3): icmp_seq=2 ttl=64 time=0.076 ms
64 bytes from ubuntu2.mynetwork (172.18.0.3): icmp_seq=3 ttl=64 time=0.077 ms
^C
--- ubuntu2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2049ms
rtt min/avg/max/mdev = 0.076/0.097/0.138/0.029 ms
root@ubuntu1:/# 
```

As you can see, the ping returned successfully, which fixes the problem of having to determine the IP address of the container using the default bridge network. You can also delete the created network bridge with the command below, but note that you should make sure you delete the containers using this network, otherwise Docker will not let you delete it:

```shell
docker network remove <network_name>
```

For example:

```shell
...:~$ docker container stop ubuntu1 ubuntu2
ubuntu1
ubuntu2
...:~$ docker container rm ubuntu1 ubuntu2
ubuntu1
ubuntu2
...:~$ docker network remove mynetwork
mynetwork
...:~$ docker network list
NETWORK ID     NAME      DRIVER    SCOPE
d5367fd51d2f   bridge    bridge    local
1d0e1fa0d1f2   host      host      local
194034d92605   none      null      local
...:~$ 
```

### **8.2 Host Network**

**Host Network** is the highest level network in Docker networks. Containers use directly network of the host, there is no network isolation. Containers are not provided private IP of `docker0` but use IP address and network configurations of the host. Especially, you do not need to map port, because the containers work like as progress on the host.

You only use host network when you need to **optimize the network performance** or **containers need to access directly to the host's network**. Because, the host network will give high network performance, without the overhead of a virtual network layer. The downside when you use host network is that **these containers lose isolation**, which can **cause port conflicts with main services on the host or multiple containers using same port**.

> The `host` networking driver **only works on Linux hosts**, and as **an opt-in feature in Docker Desktop version 4.34 and later**. To enable this feature in **Docker Desktop**, navigate to the **Resources** tab in **Settings**, and then under **Network** select **Enable host networking**.

For example:

```shell
...:~$ docker run --rm -d --network host --name nginx-host nginx:latest
a2474d5be8032819878bd270993970a61ee1bd8b1a746c3c47c597a0a6bd4ef9
```

Access Nginx by browsing to <http://localhost:80/>. To verify which process is bound to port `80`, using the `lsof` command. You need to use `sudo` because the process is owned by the Docker daemon user and you otherwise won't be able to see its name or PID

```shell
sudo lsof -i :80
```

You only stop the container, it will be removed automatically as it was started using the `--rm` option.

```shell
docker stop nginx-host
```

### **8.3 Overlay Network**

**Overlay Network** in Docker is a virtual network type that allows containers to run on the multiple Docker hosts (for example, in a **Docker Swarm cluster** or **Kubernetes**) to communicate with each other securely as if they were on the same local LAN. Overlay network use **VXLAN** technology to create a virtual network spreading on multiple hosts. To use overlay network, you need to set up Swarm or manually configure on the hosts, containers on the multiple hosts can communicate via container names or IP addresses. You need to use overlay network in distributed applications like microservices running on multiple nodes.

The first example, you will try with one host, you need to create Swarm cluster by following command:

```shell
docker swarm init --advertise-addr=<manager_ip_address>
```

You can then use `docker network ls` to display the network list, and you will see an overlay network created with the name `ingress` and a bridge network named `docker_gwbridge`. The `docker_gwbridge` connects the `ingress` network to the Docker host's network interface so that traffic can flow to and from swarm managers and workers. If you create swarm services and do not specify a network, they are connected to the `ingress` network. It is recommended that you use separate overlay networks for each application or group of applications which will work together.

To display the nodes in Swarm, you can use the command below:

```shell
docker node ls
```

Now, you will run a service with Swarm:

```shell
docker service create --name nginx --publish target=80,published=80 --replicas=5 nginx:latest
```

After running the Nginx service, you can use `docker service ls` to show information about it and `docker service ps nginx` to show details

For example:

```shell
...:~$ docker swarm init
Swarm initialized: current node (bnao363aorpugn6j3up1vbqlw) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-<token> <ip_address>:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

...:~$ docker node ls
ID                            HOSTNAME         STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
bnao363aorpugn6j3up1vbqlw *   docker-desktop   Ready     Active         Leader           28.1.1

...:~$ docker service create --name nginx --publish target=80,published=80 --replicas=5 nginx:latest
q20sarht7a9pqdcyli747hub2
overall progress: 5 out of 5 tasks 
1/5: running   [==================================================>] 
2/5: running   [==================================================>] 
3/5: running   [==================================================>] 
4/5: running   [==================================================>] 
5/5: running   [==================================================>] 
verify: Service q20sarht7a9pqdcyli747hub2 converged

...:~$ docker service ls
ID             NAME      MODE         REPLICAS   IMAGE          PORTS
q20sarht7a9p   nginx     replicated   5/5        nginx:latest   *:80->80/tcp

...:~$ docker service ps nginx
ID             NAME      IMAGE          NODE             DESIRED STATE   CURRENT STATE            ERROR     PORTS
h6i592pui4ul   nginx.1   nginx:latest   docker-desktop   Running         Running 48 seconds ago             
oeqxmnexh6ls   nginx.2   nginx:latest   docker-desktop   Running         Running 49 seconds ago             
og7zrh3wwvb9   nginx.3   nginx:latest   docker-desktop   Running         Running 48 seconds ago             
0gk0zq0qdoqa   nginx.4   nginx:latest   docker-desktop   Running         Running 48 seconds ago             
rnypz7m7h6jg   nginx.5   nginx:latest   docker-desktop   Running         Running 48 seconds ago
```

If you have a second host, you can join it to the Swarm cluster with the command `docker swarm join --token SWMTKN-<token> <ip_address>:2377`, at this point your first host will have the role of `manager` or `leader`, the second host will have the role of `worker`. After joining, on the manager node you can ping the worker node. Here is an example with more nodes in a Swarm cluster:

On `manager` node, you initialize Swarm cluster and create your overlay network:

```shell
root@manager:/# docker swarm init
Swarm initialized: current node (txiksyw9bvdx2m8wl7eof5bqd) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token <token> <ip_address>:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
root@manager:/# docker network create -d overlay swarm-net
jw7grim7dz5crzjf0a4liixun
root@manager:/# docker network ls
NETWORK ID     NAME              DRIVER    SCOPE
c04a9e8955a0   bridge            bridge    local
330f96647be2   docker_gwbridge   bridge    local
b707ff729fcb   host              host      local
vn9ocpxnvwf7   ingress           overlay   swarm
3d0c1ea0f17d   none              null      local
jw7grim7dz5c   swarm-net         overlay   swarm
```

On the `worker1` host, it cannot be on the same subnet, you can see that when creating swarm on the `manager`, Docker will create a token for us for the `worker` to use it to join the cluster. For example on the `worker` node:

```shell
root@worker1:/# docker swarm join --token <token> <ip_address>:2377
This node joined a swarm as a worker.
```

Back to `manager`, you will see that the worker server has joined the cluster:

```shell
root@manager:/# docker node ls
ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
txiksyw9bvdx2m8wl7eof5bqd *   manager    Ready     Active         Leader           28.1.1
j32ne2quefbooz0xzqwmnmp4p     worker1    Ready     Active                          28.1.1
```

Now let's try to run a service with the parameter `--replicas=5`, and as you can see the service will run on both nodes, which means that even if they are on the same subnet, they are still connected through the overlay network.

```shell
root@manager:/# docker service create --name nginx -p 80:80 --replicas=5 --network swarm-net nginx:latest
pn34v0xufn4nvgiwk2tynlihc
overall progress: 5 out of 5 tasks 
1/5: running   [==================================================>] 
2/5: running   [==================================================>] 
3/5: running   [==================================================>] 
4/5: running   [==================================================>] 
5/5: running   [==================================================>] 
verify: Service pn34v0xufn4nvgiwk2tynlihc converged 
root@manager:/# docker service ls
ID             NAME      MODE         REPLICAS   IMAGE          PORTS
pn34v0xufn4n   nginx     replicated   5/5        nginx:latest   *:80->80/tcp
root@manager:/# docker service ps nginx
ID             NAME      IMAGE          NODE      DESIRED STATE   CURRENT STATE            ERROR     PORTS
oqnq5myooj9z   nginx.1   nginx:latest   worker1   Running         Running 44 seconds ago             
tqnut7zjsrkb   nginx.2   nginx:latest   manager   Running         Running 34 seconds ago             
qigds8xx69qh   nginx.3   nginx:latest   worker1   Running         Running 44 seconds ago             
viy765z3tmit   nginx.4   nginx:latest   manager   Running         Running 34 seconds ago             
fyq59586qns8   nginx.5   nginx:latest   worker1   Running         Running 44 seconds ago             
root@manager:/# 
```

### **8.4 None Network**

As the name suggests, containers are completely isolated from the network. They are not assigned an IP and cannot communicate with other containers or the outside network. They only have a loopback interface (localhost). Used for tasks that do not require a network, such as offline data processing or high security.

```shell
...:~$ docker run -dit --name ubuntu --network none ubuntu:latest
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
0622fac788ed: Pull complete 
Digest: sha256:6015f66923d7afbc53558d7ccffd325d43b4e249f41a6e93eef074c9505d2233
Status: Downloaded newer image for ubuntu:latest
f807ad536ae1410b5f11679e4563a3fb354082eecd9efc5988bf9d00bf614aeb
...:~$ docker ps -a
CONTAINER ID   IMAGE           COMMAND       CREATED          STATUS          PORTS     NAMES
f807ad536ae1   ubuntu:latest   "/bin/bash"   16 seconds ago   Up 15 seconds             ubuntu
...:~$ docker exec -it ubuntu bash
root@f807ad536ae1:/# hostname -I

root@f807ad536ae1:/#  
```

As you can see, Ubuntu containers have no IP addresses at all, and are completely isolated from the outside world. In addition to the above network types, Docker also has another type called **Macvlan Network**, which is a rather complex network and is rarely used in practice. If you want to learn more, you can read it on Docker's page at [this link](https://docs.docker.com/engine/network/tutorials/macvlan/).

----------------------

## **9. How to save data with Docker Volume**

----------------------

## **10. Build and create a container from Dockerfile**

Docker does not just allow us to run existing containers, which helps us to custom and build our images. Especially, we can share our images with other people by **Docker Hub**. To build our image, we need to write a `Dockerfile` without file extension, `Dockerfile` is a simple text file contains commands Docker uses to create a new image. In other words, this is an instruction telling Docker what to do when building a new image. For example:

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

The above example is a simple Dockerfile used to build an image for a Node.js project. To build the Dockerfile to image, you can use the below command:

```shell
docker image build -t myweb:latest .
```

The command includes:

- `docker image`: The Docker command uses to manage the Docker image.
- `build`: The command uses to build an image from a Dockerfile.
- `-t myweb:latest`: The shorthand for `--tag` uses to set name and tag of image. The following parameter includes two parts, the first part (before the `:`) is image name, and the second part is image tag version. The tag we can use as `myweb:v1`, `myweb:1.0.0`,...
- `.`: The dot means the current context containing the Dockerfile. If you place the Dockerfile in another context, then you will replace the dot with `./directoryA/directoryB/`.

Now, I will try to build a web application with Node.js and make sure that it activates well on the host. Now, I will write a Dockerfile as:

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

```shell
docker image build -t myweb:latest .
```

```shell
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

```shell
...:~/Projects/docker-projects/getting-started$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
myweb        latest    d3dccbe289a0   6 minutes ago   249MB
ubuntu       latest    1e622c5f073b   6 days ago      117MB
```

You will see my repository containing the image `myweb` with `latest` tag, I will build it to container:

```shell
...:~/Projects/docker-projects/getting-started$ docker run -d --name myweb -p 3000:3000 myweb
99b748d812a27066c4118a5b032a72675b51943e0f273fbc942ebba2e8e93b36
...:~/Projects/docker-projects/getting-started$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS              PORTS                    NAMES
99b748d812a2   myweb     "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp   myweb
```

Now I will access the [http://localhost:3000](http://localhost:3000) and see my website.

----------------------

## **11. Run multi-containers with Docker Compose**

In previous sections, you learned how to run a container from an existing image and how to build and run a custom image with a Dockerfile. However, that only runs one container; on a real project you need to detach our project to small services such as frontend service (or container), backend service, database service, ... so you have to use the running container command many times. Instead, Docker provides Docker Compose, that is the tools will help us run and manage multi-containers in union

----------------------

## **12. Docker Swarm**

----------------------

[^1]: [What does TTY stand for?](https://askubuntu.com/questions/481906/what-does-tty-stand-for)
