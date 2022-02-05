---
title:  "Desperate GKE Scaling Approaches for Workloads which Need Immediate Resources"
date:   2022-02-05 22:00:00 +1000
categories: devops
tags: gke cloud kubernetes
author: "RW"
excerpt: Long title
---

Traditionally, managed kubernetes auto scaling works by looking at resources of nodes, and introducing new nodes whenever needed. However, this approach does not work well when there is a sudden increase in workload which needs to run immediately. In this situation, managed kubernetes will just take its time to create new nodes. 

I've been thinking about this problem for a while, and will note down some ways around this. 

Please note that I have only tried them out on GKE. I am sure there are similar approaches for other managed Kubernetes. Also, technically what I am mentioning is not kubernetes autoscaling, but more like reserving nodes. 

## Approach 1: Pre-scaling (In an ideal world) 

In an ideal world where we know when the loads are coming, we can pre-scale the nodes accordingly. An simple approach would be to create a deployment which reserves the nodes. If we adjust the number of replicas of this deployment, we can scale up and down.  

One thing we need to be cautious of is the priority of scaling, meaning that we don't want this deployment to take priority over any other resources. If this deployment were taking priority over the said "sudden workload", there is a problem. 

In order to circumvent this problem, we can use priorityclasses. Your managed Kubernetes provider should respect this when creating new nodes. If we set the pre-scaling deployment's priority lower than the "sudden workload", the "sudden workload" will steal nodes from the pre-scaling deployment. 

Below is an example of the priorityclass to use for this pre-scaling deployment. 

Here is one to use for the "sudden workload". As explained above, since the sudden workload's priority is higher than the pre-scaling deployment, it will steal the nodes from the pre-scaling deployment. 

Here is the pre scaling deployment. Note that the resources and podAffinity are set. Resources are required to properly reserve the node. The priority class created above is used.  

The anti-affinity should be set to the node-pool on which the "sudden workload" run. 
 
Now we want to adjust the replicas in order to do the "scaling". One way to do this in GKE is to use custom metrics. This method is explained well in this post: Using Custom Metrics to Horizontally Autoscale a Google Kubernetes Engine (GKE) Deployment. | by Danny Tiesling | Medium  

By adjusting this metric, the replicas can be scaled accordingly. 

A different provider-agnostic way would be to just use kubernetes' deployment scaling feature. This can be done from kubectl e.g. .  

## Approach 2: Image streaming 

Image streaming is a relatively new GKE feature which allows for lightning fast image pull speeds. By taking advantage of this, we can reduce the time for new nodes to pull images. According to the docs and my actual experience, an image which takes 120secs to pull can be reduced to 2.5 seconds. It is a huge change. This ultimately is a desperate approach in wanting to  

## Conclusion 

By using both the approaches above,  

Thanks for reading, 