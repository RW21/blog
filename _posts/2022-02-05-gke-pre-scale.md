---
title:  "Desperate GKE Scaling Approaches for Workloads which Need Immediate Resources"
date:   2022-02-04 22:00:00 +1000
categories: devops
tags: gke cloud kubernetes
author: "RW"
excerpt: Pre-scaling and image streaming
---

Traditionally, managed kubernetes auto scaling works by looking at resources of nodes, and introducing new nodes whenever needed. However, this approach does not work well when there is a sudden increase in workloads which needs to run immediately. In this situation, managed kubernetes will just take its time to create new nodes. 

I've been thinking about this problem for a while, and will note down some ways around this. 

Please note that I have only tested on GKE. I am sure there are similar approaches for other managed Kubernetes. Also, technically what I am mentioning is not kubernetes autoscaling, but more like reserving nodes. 

## Approach 1: Pre-scaling (In an ideal world) 

In an ideal world where we know when the loads are coming, we can pre-scale the nodes accordingly. An simple approach would be to create a deployment which reserves the nodes. If we adjust the number of replicas of this deployment, we can scale up and down.  

One thing we need to be cautious of is the priority of scaling, meaning that we don't want this deployment to take priority over any other resources. If this deployment were taking priority over the said "sudden workload", there is a problem. 

In order to circumvent this problem, we can use [priorityclasses](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass). Your managed Kubernetes provider should respect this when creating new nodes. If we set the pre-scaling deployment's priority lower than the "sudden workload", the "sudden workload" will steal nodes from the pre-scaling deployment. 

Below is an example of the priorityclass to use for this pre-scaling deployment. 


```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: scaling
preemptionPolicy: PreemptLowerPriority
value: 10

```

Here is one to use for the "sudden workload". As explained above, since the sudden workload's priority is higher than the pre-scaling deployment, it will steal the nodes from the pre-scaling deployment. 

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: sudden-workload
preemptionPolicy: PreemptLowerPriority
value: 1000
```

Here is the pre scaling deployment. Note that the resources and podAffinity are set. Resources are required to properly reserve the node. The priority class created above is used.  

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pre-scaling
  namespace: pre-scaling
spec:
  replicas: 1
  template:
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                # Your scaling nodepool here
                matchLabels:
              topologyKey: kubernetes.io/hostname
      containers:
        - image: gcr.io/google-containers/pause:latest
          imagePullPolicy: IfNotPresent
          name: pause
          resources:
            requests:
              # Resources to reserve
              cpu: "1"
              memory: 1Gi
      nodeSelector:
        # Your scaling nodepool here
        cloud.google.com/gke-nodepool:
      priorityClassName: scaling

```

The affinity should be set to the node-pool on which the "pre-scaling" run. Make sure the sudden workload run on the same nodepool.
 
Now we want to adjust the replicas in order to do the "scaling". One way to do this in GKE is to use custom metrics. This method is explained well in this post: [Using Custom Metrics to Horizontally Autoscale a Google Kubernetes Engine (GKE) Deployment.](https://medium.com/@dannyzorroa/using-custom-metrics-to-horizontally-autoscale-a-google-kubernetes-engine-gke-deployment-4cea7760bbd9)

By adjusting this metric, the replica can be scaled accordingly. 

A different provider-agnostic way would be to just use kubernetes' deployment scaling feature. 
This can be done through kubectl e.g. `kubectl scale deployment/pre-scaling --replicas=10`
  
## Approach 2: Image streaming 

Image streaming is a relatively new (2021/11) GKE feature which allows for lightning fast image pull speeds. By taking advantage of this, we can reduce the time for new nodes to pull images. 
According to the docs and my actual experience, an image which takes 24 seconds to pull can be reduced to 1.5 seconds.
This is a huge difference.

GCP actually recommends using images streaming to speedup autoscaling.

## Conclusion 

By using combining the approaches above, I was able to prepare resources for sudden workloads in less than 30 seconds, whereas previously it would've taken a couple of minutes.

But still, I believe there should be a better way. Please let me know if there are better ways to approach this problem.

Thanks for reading.